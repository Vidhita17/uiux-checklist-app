import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Circle, BarChart3, Filter, Download, Moon, Sun } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'ui' | 'ux' | 'accessibility' | 'performance' | 'responsive';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface ChecklistData {
  tasks: Task[];
  lastUpdated: string;
}

const INITIAL_TASKS: Task[] = [
  // UI Tasks
  {
    id: 'ui-1',
    title: 'Consistent Color Scheme',
    description: 'Apply consistent brand colors throughout the application',
    category: 'ui',
    priority: 'high',
    completed: false
  },
  {
    id: 'ui-2',
    title: 'Typography Hierarchy',
    description: 'Establish clear heading hierarchy and readable font sizes',
    category: 'ui',
    priority: 'high',
    completed: false
  },
  {
    id: 'ui-3',
    title: 'Button States',
    description: 'Design hover, active, disabled, and focus states for all buttons',
    category: 'ui',
    priority: 'medium',
    completed: false
  },
  {
    id: 'ui-4',
    title: 'Form Validation',
    description: 'Implement visual feedback for form validation states',
    category: 'ui',
    priority: 'high',
    completed: false
  },
  {
    id: 'ui-5',
    title: 'Loading States',
    description: 'Add loading indicators and skeleton screens',
    category: 'ui',
    priority: 'medium',
    completed: false
  },
  
  // UX Tasks
  {
    id: 'ux-1',
    title: 'User Navigation',
    description: 'Ensure intuitive navigation and clear user flow',
    category: 'ux',
    priority: 'high',
    completed: false
  },
  {
    id: 'ux-2',
    title: 'Error Handling',
    description: 'Provide clear error messages and recovery paths',
    category: 'ux',
    priority: 'high',
    completed: false
  },
  {
    id: 'ux-3',
    title: 'Feedback Mechanisms',
    description: 'Implement success messages and action confirmations',
    category: 'ux',
    priority: 'medium',
    completed: false
  },
  {
    id: 'ux-4',
    title: 'Progressive Disclosure',
    description: 'Show information progressively to avoid overwhelming users',
    category: 'ux',
    priority: 'medium',
    completed: false
  },
  {
    id: 'ux-5',
    title: 'User Onboarding',
    description: 'Create smooth onboarding experience for new users',
    category: 'ux',
    priority: 'low',
    completed: false
  },

  // Accessibility Tasks
  {
    id: 'a11y-1',
    title: 'Keyboard Navigation',
    description: 'Ensure all interactive elements are keyboard accessible',
    category: 'accessibility',
    priority: 'high',
    completed: false
  },
  {
    id: 'a11y-2',
    title: 'ARIA Labels',
    description: 'Add proper ARIA labels and descriptions',
    category: 'accessibility',
    priority: 'high',
    completed: false
  },
  {
    id: 'a11y-3',
    title: 'Color Contrast',
    description: 'Verify WCAG AA color contrast ratios (4.5:1 minimum)',
    category: 'accessibility',
    priority: 'high',
    completed: false
  },
  {
    id: 'a11y-4',
    title: 'Screen Reader Testing',
    description: 'Test application with screen readers',
    category: 'accessibility',
    priority: 'medium',
    completed: false
  },
  {
    id: 'a11y-5',
    title: 'Focus Indicators',
    description: 'Provide clear focus indicators for all interactive elements',
    category: 'accessibility',
    priority: 'medium',
    completed: false
  },

  // Performance Tasks
  {
    id: 'perf-1',
    title: 'Core Web Vitals',
    description: 'Optimize LCP, FID, and CLS metrics',
    category: 'performance',
    priority: 'high',
    completed: false
  },
  {
    id: 'perf-2',
    title: 'Image Optimization',
    description: 'Compress and optimize all images for web',
    category: 'performance',
    priority: 'high',
    completed: false
  },
  {
    id: 'perf-3',
    title: 'Code Splitting',
    description: 'Implement code splitting for better bundle sizes',
    category: 'performance',
    priority: 'medium',
    completed: false
  },
  {
    id: 'perf-4',
    title: 'Caching Strategy',
    description: 'Implement proper caching for static assets',
    category: 'performance',
    priority: 'medium',
    completed: false
  },
  {
    id: 'perf-5',
    title: 'Bundle Analysis',
    description: 'Analyze and optimize JavaScript bundle sizes',
    category: 'performance',
    priority: 'low',
    completed: false
  },

  // Responsive Design Tasks
  {
    id: 'resp-1',
    title: 'Mobile-First Design',
    description: 'Design and develop mobile-first responsive layouts',
    category: 'responsive',
    priority: 'high',
    completed: false
  },
  {
    id: 'resp-2',
    title: 'Breakpoint Testing',
    description: 'Test all major breakpoints (mobile, tablet, desktop)',
    category: 'responsive',
    priority: 'high',
    completed: false
  },
  {
    id: 'resp-3',
    title: 'Touch Interactions',
    description: 'Optimize touch interactions for mobile devices',
    category: 'responsive',
    priority: 'medium',
    completed: false
  },
  {
    id: 'resp-4',
    title: 'Flexible Layouts',
    description: 'Use flexible grid systems and fluid layouts',
    category: 'responsive',
    priority: 'medium',
    completed: false
  },
  {
    id: 'resp-5',
    title: 'Device Testing',
    description: 'Test on actual devices, not just browser tools',
    category: 'responsive',
    priority: 'low',
    completed: false
  }
];

const CATEGORY_CONFIG = {
  ui: { name: 'UI Design', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '🎨' },
  ux: { name: 'User Experience', color: 'bg-green-100 text-green-800 border-green-200', icon: '👤' },
  accessibility: { name: 'Accessibility', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '♿' },
  performance: { name: 'Performance', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '⚡' },
  responsive: { name: 'Responsive', color: 'bg-pink-100 text-pink-800 border-pink-200', icon: '📱' }
};

const PRIORITY_CONFIG = {
  high: { name: 'High', color: 'bg-red-100 text-red-800' },
  medium: { name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  low: { name: 'Low', color: 'bg-gray-100 text-gray-800' }
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [darkMode, setDarkMode] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('uiux-checklist-data');
    if (savedData) {
      try {
        const parsedData: ChecklistData = JSON.parse(savedData);
        setTasks(parsedData.tasks);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever tasks change
  useEffect(() => {
    const dataToSave: ChecklistData = {
      tasks,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('uiux-checklist-data', JSON.stringify(dataToSave));
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getProgressByCategory = (category: string) => {
    const categoryTasks = tasks.filter(task => task.category === category);
    const completedTasks = categoryTasks.filter(task => task.completed).length;
    return {
      completed: completedTasks,
      total: categoryTasks.length,
      percentage: categoryTasks.length > 0 ? Math.round((completedTasks / categoryTasks.length) * 100) : 0
    };
  };

  const getOverallProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    return {
      completed: completedTasks,
      total: tasks.length,
      percentage: Math.round((completedTasks / tasks.length) * 100)
    };
  };

  const exportProgress = () => {
    const progressData = {
      overall: getOverallProgress(),
      byCategory: Object.keys(CATEGORY_CONFIG).reduce((acc, category) => {
        acc[category] = getProgressByCategory(category);
        return acc;
      }, {} as Record<string, any>),
      tasks: tasks.map(task => ({
        title: task.title,
        category: task.category,
        priority: task.priority,
        completed: task.completed
      })),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uiux-checklist-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      setTasks(INITIAL_TASKS);
    }
  };

  const overallProgress = getOverallProgress();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">UI/UX Checklist</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Essential tasks for frontend development teams
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={exportProgress}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{overallProgress.completed}/{overallProgress.total} tasks</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress.percentage}%` }}
              />
            </div>
            <div className="text-right mt-1">
              <span className="text-2xl font-bold text-blue-600">{overallProgress.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`pl-10 pr-8 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={`pl-10 pr-8 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Priorities</option>
                {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tasks by Category */}
        <div className="space-y-6">
          {Object.entries(CATEGORY_CONFIG).map(([categoryKey, categoryConfig]) => {
            const categoryTasks = filteredTasks.filter(task => task.category === categoryKey);
            const progress = getProgressByCategory(categoryKey);
            const isCollapsed = collapsedCategories.has(categoryKey);

            if (categoryTasks.length === 0 && selectedCategory === 'all') {
              return null;
            }

            return (
              <div key={categoryKey} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                <div 
                  className={`p-4 cursor-pointer transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleCategory(categoryKey)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryConfig.icon}</span>
                      <h2 className="text-xl font-semibold">{categoryConfig.name}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryConfig.color}`}>
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{progress.percentage}%</span>
                      <div className={`w-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="p-4 pt-0">
                    <div className="space-y-3">
                      {categoryTasks.map((task) => (
                        <div 
                          key={task.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                            task.completed
                              ? darkMode 
                                ? 'bg-gray-700 border-green-500 opacity-75' 
                                : 'bg-green-50 border-green-200 opacity-75'
                              : darkMode
                                ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`mt-1 transition-colors ${
                              task.completed ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-400'
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                                {task.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_CONFIG[task.priority].color}`}>
                                {PRIORITY_CONFIG[task.priority].name}
                              </span>
                            </div>
                            <p className={`text-sm ${
                              task.completed 
                                ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                                : darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={resetProgress}
            className={`px-6 py-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;