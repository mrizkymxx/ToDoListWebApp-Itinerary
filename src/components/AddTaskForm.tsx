import React, { useState } from 'react';
import { Calendar, Flag, X, Send } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import clsx from 'clsx';

interface AddTaskFormProps {
  defaultProjectId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ 
  defaultProjectId, 
  onCancel, 
  onSuccess 
}) => {
  const { addTask, projects } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(defaultProjectId);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      projectId,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completed: false,
      labels: [],
    });

    onSuccess();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as React.FormEvent);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="p-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Task name"
          className="w-full text-sm font-medium placeholder-gray-500 border-none outline-none bg-transparent mb-2"
          autoFocus
        />

        {/* Description Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Description"
          rows={2}
          className="w-full text-sm text-gray-700 placeholder-gray-500 border-none outline-none bg-transparent resize-none mb-4"
        />

        {/* Options Row */}
        <div className="flex items-center gap-4 mb-4">
          {/* Due Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-gray-400" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
          </div>

          {/* Project */}
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Press Enter to save, Escape to cancel
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className={clsx(
                'p-2 rounded transition-colors',
                title.trim()
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-gray-300 cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
