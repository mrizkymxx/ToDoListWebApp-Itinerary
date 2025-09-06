import React from 'react';
import { Check, Calendar, Flag, MoreHorizontal } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';
import clsx from 'clsx';
import type { Task } from '../types';
import { useApp } from '../hooks/useApp';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, projects } = useApp();
  
  const project = projects.find(p => p.id === task.projectId);
  
  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const isDueSoon = task.dueDate && isToday(task.dueDate);
  const isOverdue = task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <div className={clsx(
      'group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors',
      task.completed && 'opacity-60'
    )}>
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5',
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        {task.completed && <Check className="w-3 h-3" />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={clsx(
              'text-sm font-medium text-gray-900',
              task.completed && 'line-through text-gray-500'
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          
          {/* Actions */}
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Task Metadata */}
        <div className="flex items-center gap-3 mt-2">
          {/* Due Date */}
          {task.dueDate && (
            <div className={clsx(
              'flex items-center gap-1 text-xs px-2 py-1 rounded',
              isDueSoon ? 'text-red-600 bg-red-50' :
              isOverdue ? 'text-red-700 bg-red-100' :
              'text-gray-600 bg-gray-100'
            )}>
              <Calendar className="w-3 h-3" />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}

          {/* Priority */}
          {task.priority !== 'low' && (
            <div className="flex items-center gap-1">
              <Flag className={clsx('w-3 h-3', getPriorityColor(task.priority))} />
              <span className={clsx('text-xs capitalize', getPriorityColor(task.priority))}>
                {task.priority}
              </span>
            </div>
          )}

          {/* Project */}
          {project && project.id !== 'inbox' && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: project.color }}
              />
              <span>{project.name}</span>
            </div>
          )}

          {/* Labels */}
          {task.labels.length > 0 && (
            <div className="flex gap-1">
              {task.labels.map((label) => (
                <span
                  key={label}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
