import React from 'react';
import { 
  Calendar, 
  CalendarDays, 
  Inbox, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const { 
    projects, 
    selectedView, 
    selectedProjectId, 
    selectedFilterId,
    setSelectedView,
    tasks 
  } = useApp();

  const todayTasksCount = tasks.filter(task => 
    !task.completed && 
    task.dueDate && 
    new Date(task.dueDate).toDateString() === new Date().toDateString()
  ).length;

  const upcomingTasksCount = tasks.filter(task => 
    !task.completed && 
    task.dueDate && 
    new Date(task.dueDate) > new Date()
  ).length;

  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Itinerary</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {/* Quick Filters */}
          <div className="space-y-1">
            <button
              onClick={() => setSelectedView('today', undefined, 'today')}
              className={clsx(
                'sidebar-item w-full',
                selectedView === 'today' && selectedFilterId === 'today' && 'active'
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>Today</span>
              {todayTasksCount > 0 && (
                <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {todayTasksCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedView('upcoming', undefined, 'upcoming')}
              className={clsx(
                'sidebar-item w-full',
                selectedView === 'upcoming' && selectedFilterId === 'upcoming' && 'active'
              )}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Upcoming</span>
              {upcomingTasksCount > 0 && (
                <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                  {upcomingTasksCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setSelectedView('filter')}
              className={clsx(
                'sidebar-item w-full',
                selectedView === 'filter' && 'active'
              )}
            >
              <Filter className="w-4 h-4" />
              <span>Filters & Labels</span>
            </button>
          </div>

          {/* Projects Section */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Projects
              </h2>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-1">
              {projects.map((project) => {
                const projectTasksCount = tasks.filter(task => 
                  task.projectId === project.id && !task.completed
                ).length;
                
                return (
                  <button
                    key={project.id}
                    onClick={() => setSelectedView('project', project.id)}
                    className={clsx(
                      'sidebar-item w-full',
                      selectedView === 'project' && selectedProjectId === project.id && 'active'
                    )}
                  >
                    {project.id === 'inbox' ? (
                      <Inbox className="w-4 h-4" />
                    ) : (
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: project.color }}
                      />
                    )}
                    <span>{project.name}</span>
                    {projectTasksCount > 0 && (
                      <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {projectTasksCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add project</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
