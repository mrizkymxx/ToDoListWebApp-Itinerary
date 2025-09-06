import React, { useState } from 'react';
import { Plus, Calendar, Inbox, Filter, CalendarDays } from 'lucide-react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const TaskList: React.FC = () => {
  const { 
    selectedView, 
    selectedProjectId, 
    projects,
    getFilteredTasks 
  } = useApp();
  
  const [showAddTask, setShowAddTask] = useState(false);
  
  const tasks = getFilteredTasks();
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  
  const getViewTitle = () => {
    switch (selectedView) {
      case 'today':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      case 'project':
        const project = projects.find(p => p.id === selectedProjectId);
        return project?.name || 'Unknown Project';
      default:
        return 'Tasks';
    }
  };

  const getViewIcon = () => {
    switch (selectedView) {
      case 'today':
        return <Calendar className="w-5 h-5" />;
      case 'upcoming':
        return <CalendarDays className="w-5 h-5" />;
      case 'project':
        const project = projects.find(p => p.id === selectedProjectId);
        if (project?.id === 'inbox') {
          return <Inbox className="w-5 h-5" />;
        }
        return (
          <div 
            className="w-5 h-5 rounded-full" 
            style={{ backgroundColor: project?.color || '#3b82f6' }}
          />
        );
      default:
        return <Filter className="w-5 h-5" />;
    }
  };

  const getViewDescription = () => {
    switch (selectedView) {
      case 'today':
        return format(new Date(), 'EEEE, MMMM d');
      case 'upcoming':
        return 'Next 7 days';
      case 'project':
        return `${tasks.length} tasks`;
      default:
        return '';
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getViewIcon()}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {getViewTitle()}
              </h1>
              {getViewDescription() && (
                <p className="text-sm text-gray-600 mt-1">
                  {getViewDescription()}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowAddTask(true)}
            className="btn btn-primary px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add task
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Add Task Form */}
          {showAddTask && (
            <div className="mb-6">
              <AddTaskForm
                defaultProjectId={selectedProjectId || 'inbox'}
                onCancel={() => setShowAddTask(false)}
                onSuccess={() => setShowAddTask(false)}
              />
            </div>
          )}

          {/* Quick Add Task Button */}
          {!showAddTask && (
            <button
              onClick={() => setShowAddTask(true)}
              className="w-full flex items-center gap-3 p-3 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors mb-6"
            >
              <Plus className="w-5 h-5 text-red-500" />
              <span>Add task</span>
            </button>
          )}

          {/* Incomplete Tasks */}
          {incompleteTasks.length > 0 && (
            <div className="space-y-2 mb-8">
              {incompleteTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {getViewIcon()}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add a task to get started with your {getViewTitle().toLowerCase()}.
              </p>
              <button
                onClick={() => setShowAddTask(true)}
                className="btn btn-primary px-4 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add your first task
              </button>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-sm font-medium text-gray-500 mb-4">
                Completed ({completedTasks.length})
              </h2>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskList;
