import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

type UserKey = 'Anas' | 'Meesum' | 'Musab' | 'Saad' | 'Everyone';

// UserAvatar component
const UserAvatar: React.FC<{ 
  user: { name: string; color: string; initials: string; avatar?: string }; 
  size?: 'sm' | 'md' | 'lg'
}> = ({ user, size = 'sm' }) => {
  const [imageError, setImageError] = useState(false);
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12';
  const textSize = size === 'sm' ? 'text-xs' : 'text-xs';
  
  if (user.avatar && !imageError) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses} rounded-full border-2 border-white object-cover`}
        title={user.name}
        onError={() => setImageError(true)}
      />
    );
  }
  
  // Fallback to initials
  return (
    <div
      className={`${sizeClasses} rounded-full ${user.color} border-2 border-white flex items-center justify-center ${textSize} font-bold`}
      title={user.name}
    >
      {user.initials}
    </div>
  );
};

// TeamAvatars component - shows all team members when "Everyone" is specified
const TeamAvatars: React.FC<{ 
  leads: UserKey[];
  users: Record<UserKey, { name: string; color: string; initials: string; avatar?: string }>;
  size?: 'sm' | 'md' | 'lg';
}> = ({ leads, users, size = 'sm' }) => {
  // If "Everyone" is in the leads, show all team members except "Everyone"
  if (leads.includes('Everyone')) {
    const teamMembers: UserKey[] = ['Anas', 'Meesum', 'Musab', 'Saad'];
    return (
      <div className="flex -space-x-1 mr-2">
        {teamMembers.map((memberName, idx) => {
          const user = users[memberName];
          return (
            <UserAvatar
              key={idx}
              user={user}
              size={size}
            />
          );
        })}
      </div>
    );
  }
  
  // Otherwise, show the specific leads
  return (
    <div className="flex -space-x-1 mr-2">
      {leads.map((leadName, idx) => {
        const user = users[leadName];
        return (
          <UserAvatar
            key={idx}
            user={user}
            size={size}
          />
        );
      })}
    </div>
  );
};

const GanttChart = () => {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  
  // User profiles with colors and avatars  
  const users: Record<UserKey, { name: string; color: string; initials: string; avatar?: string }> = {
    'Anas': { 
      name: 'Anas', 
      color: 'bg-orange-500', 
      initials: 'A',
      avatar: '/avatars/anas.png'
    },
    'Meesum': { 
      name: 'Meesum', 
      color: 'bg-green-500', 
      initials: 'M',
      avatar: '/avatars/meesum.png'
    },
    'Musab': { 
      name: 'Musab', 
      color: 'bg-blue-500', 
      initials: 'Mu',
      avatar: '/avatars/musab.png'
    },
    'Saad': { 
      name: 'Saad', 
      color: 'bg-purple-500', 
      initials: 'S',
      avatar: '/avatars/saad.png'
    },
    'Everyone': { name: 'Everyone', color: 'bg-gray-500', initials: 'E' }
  };

  type Task = {
    id: number;
    name: string;
    stream: string;
    start: number;
    duration: number;
    color: string;
    leads: UserKey[];
  };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Lit Review (Math & Design)',
      stream: 'Simulator',
      start: 0,
      duration: 0.5,
      color: 'bg-blue-400',
      leads: ['Musab', 'Saad']
    },
    {
      id: 2,
      name: 'Eulerian Grid',
      stream: 'Simulator',
      start: 0.5,
      duration: 0.5,
      color: 'bg-blue-500',
      leads: ['Musab', 'Saad']
    },
    {
      id: 3,
      name: 'Solid SDF (Fluid-Solid Interaction)',
      stream: 'Simulator',
      start: 1,
      duration: 0.75,
      color: 'bg-blue-600',
      leads: ['Musab', 'Saad']
    },
    {
      id: 4,
      name: 'Differentiability',
      stream: 'Simulator',
      start: 1.75,
      duration: 0.75,
      color: 'bg-blue-700',
      leads: ['Musab', 'Saad']
    },
    {
      id: 5,
      name: 'Lit Review (Existing Simulators)',
      stream: 'Optimization',
      start: 0,
      duration: 0.5,
      color: 'bg-purple-400',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 6,
      name: 'Setup & Run Existing Libraries (XLB or others)',
      stream: 'Optimization',
      start: 0.25,
      duration: 0.5,
      color: 'bg-purple-500',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 7,
      name: 'Parametrise Turbine Wing',
      stream: 'Optimization',
      start: 0.75,
      duration: 0.5,
      color: 'bg-purple-600',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 8,
      name: 'ASO on Existing (one wing) + XLB',
      stream: 'Optimization',
      start: 1.25,
      duration: 0.5,
      color: 'bg-purple-700',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 9,
      name: 'Parametrize Whole Shape',
      stream: 'Optimization',
      start: 1.75,
      duration: 0.5,
      color: 'bg-purple-800',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 10,
      name: 'Test Drag',
      stream: 'Optimization',
      start: 2.0,
      duration: 0.5,
      color: 'bg-purple-900',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 11,
      name: 'RANS w/ Differentiability',
      stream: 'Simulator',
      start: 3.5,
      duration: 1,
      color: 'bg-blue-800',
      leads: ['Musab', 'Saad']
    },
    {
      id: 12,
      name: 'Integration (ASO & Simulator)',
      stream: 'Evaluation',
      start: 3.5,
      duration: 0.75,
      color: 'bg-green-500',
      leads: ['Meesum', 'Anas', 'Saad']
    },
    {
      id: 13,
      name: 'Run ASO on Our Own Simulator',
      stream: 'Optimization',
      start: 4.25,
      duration: 0.5,
      color: 'bg-amber-500',
      leads: ['Anas', 'Meesum']
    },
    {
      id: 14,
      name: 'Testing on Other Power Variances',
      stream: 'Optimization',
      start: 4.75,
      duration: 1,
      color: 'bg-amber-600',
      leads: ['Everyone']
    },
    {
      id: 15,
      name: 'Validate on Other Sims',
      stream: 'Evaluation',
      start: 5.75,
      duration: 1,
      color: 'bg-red-500',
      leads: ['Everyone']
    },
    {
      id: 16,
      name: 'Final Documentation & Deliverables',
      stream: 'Evaluation',
      start: 6,
      duration: 1,
      color: 'bg-red-600',
      leads: ['Everyone']
    }
  ]);

  type DragInfo = { taskId: number; side: 'left' | 'right'; startX: number } | null;
  const [dragInfo, setDragInfo] = useState<DragInfo>(null);

  const handleMouseDown = (e: React.MouseEvent, taskId: number, side: 'left' | 'right') => {
    e.preventDefault();
    setDragInfo({
      taskId,
      side,
      startX: e.clientX
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo) return;

    const deltaX = e.clientX - dragInfo.startX;
    const deltaMonths = deltaX / 100;

    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id !== dragInfo.taskId) return task;

        if (dragInfo.side === 'left') {
          const newStart = Math.max(0, task.start + deltaMonths);
          const newDuration = task.duration - (newStart - task.start);
          if (newDuration > 0.25) {
            return { ...task, start: newStart, duration: newDuration };
          }
        } else {
          const newDuration = Math.max(0.25, task.duration + deltaMonths);
          return { ...task, duration: newDuration };
        }
        return task;
      })
    );

    setDragInfo({ ...dragInfo, startX: e.clientX });
  };

  const handleMouseUp = () => {
    setDragInfo(null);
  };

  React.useEffect(() => {
    if (dragInfo) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragInfo]);

  const streams = ['Simulator', 'Optimization', 'Evaluation'];

  // Calculate position for Kaavish I end marker (after December = after index 2)
  const kaavishIEndPosition = ((2.5 / months.length) * 100);

  // Calculate position for Kaavish II start marker (after January = after index 5)
  const kaavishIIStartPosition = ((3.5 / months.length) * 100);

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Differentiable Fluid Simulation for Wind Turbine Airfoil Shape Optimization</h1>
        <p className="text-gray-400">Kaavish I & II - Planning</p>
      </div>

      <div className="relative">
        {/* Header with months */}
        <div className="flex mb-4">
          <div className="w-64 font-semibold text-lg">Task</div>
          <div className="flex-1 flex relative">
            {months.map((month, idx) => (
              <div key={idx} className="flex-1 text-center border-l border-gray-700 px-2 font-semibold">
                {month}
              </div>
            ))}
            
            {/* Kaavish I End Marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-yellow-500 z-10"
              style={{ left: `${kaavishIEndPosition}%` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500 font-semibold whitespace-nowrap">
                Kaavish I End
              </div>
            </div>

            {/* Kaavish II Start Marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-500 z-10"
              style={{ left: `${kaavishIIStartPosition}%` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-cyan-500 font-semibold whitespace-nowrap">
                Kaavish II Start
              </div>
            </div> 
          </div>
        </div>

        {/* Stream sections */}
        {streams.map((stream, streamIdx) => (
          <div key={streamIdx} className="mb-8">
            <div className="mb-2 px-2 py-1 bg-gray-800 rounded font-semibold text-sm">
              {stream}
            </div>
            
            {tasks
              .filter(task => task.stream === stream)
              .map((task) => (
                <div key={task.id} className="flex items-center mb-3 group">
                  <div className="w-64 pr-4 text-sm">{task.name}</div>
                  
                  <div className="flex-1 relative h-12">
                    {/* Timeline grid */}
                    <div className="absolute inset-0 flex">
                      {months.map((_, idx) => (
                        <div key={idx} className="flex-1 border-l border-gray-700" />
                      ))}
                    </div>

                    {/* Kaavish I End Marker - extends through all rows */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-yellow-500/30 z-0"
                      style={{ left: `${kaavishIEndPosition}%` }}
                    />

                    {/* Kaavish II Start Marker - extends through all rows */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-cyan-500/30 z-0"
                      style={{ left: `${kaavishIIStartPosition}%` }}
                    />
                    {/* Task bar */}
                    <div
                      className={`absolute h-10 ${task.color} rounded flex items-center px-1 cursor-move transition-opacity hover:opacity-90 z-10`}
                      style={{
                        left: `${(task.start / months.length) * 100}%`,
                        width: `${(task.duration / months.length) * 100}%`
                      }}
                    >
                      {/* User avatars on left */}
                      <TeamAvatars 
                        leads={task.leads}
                        users={users}
                        size="sm"
                      />

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Left handle */}
                      <div
                        className="w-6 h-full flex items-center justify-center cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-black/20 rounded-l absolute left-0"
                        onMouseDown={(e) => handleMouseDown(e, task.id, 'left')}
                      >
                        <GripVertical size={16} />
                      </div>

                      {/* Right handle */}
                      <div
                        className="w-6 h-full flex items-center justify-center cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-black/20 rounded-r absolute right-0"
                        onMouseDown={(e) => handleMouseDown(e, task.id, 'right')}
                      >
                        <GripVertical size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <div className="gap-4">
          <span className="font-semibold">Team Members:</span>
          <div className='flex flex-wrap gap-6 mt-2'>
            {Object.values(users)
            .filter(user => user.name !== 'Everyone') // Don't show "Everyone" in legend
            .map(user => (
              <div key={user.name} className="justify-items-center gap-1">
                <UserAvatar user={user} size="lg" />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;