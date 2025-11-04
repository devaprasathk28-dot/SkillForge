import { useState, useEffect } from 'react';
import { Team, Task, Stage } from '../types';
import { generateRoadmap, calculateProgress, getTasksByStage, getStageProgress } from '../utils/autoflow';
import { Zap, CheckCircle, Circle, Clock } from 'lucide-react';

interface Props {
  team: Team;
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

const stages: Stage[] = ['Ideation', 'Design', 'Build', 'Test', 'Pitch'];

export const AutoFlow = ({ team, tasks, onTasksUpdate }: Props) => {
  const [selectedStage, setSelectedStage] = useState<Stage>('Ideation');

  useEffect(() => {
    if (tasks.length === 0 && team.members.length > 0) {
      const roadmap = generateRoadmap(team.members);
      onTasksUpdate(roadmap);
    }
  }, [team.members, tasks.length, onTasksUpdate]);

  const toggleTaskStatus = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const statusOrder: Task['status'][] = ['pending', 'in_progress', 'completed'];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...task, status: nextStatus };
      }
      return task;
    });
    onTasksUpdate(updatedTasks);
  };

  const overallProgress = calculateProgress(tasks);
  const stageTasks = getTasksByStage(tasks, selectedStage);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getMemberName = (memberId: string) => {
    const member = team.members.find(m => m.id === memberId);
    return member?.name || 'Unassigned';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-800">Project Roadmap</h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {stages.map((stage) => {
            const stageProgress = getStageProgress(tasks, stage);
            return (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStage === stage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage}
                <span className="ml-2 text-xs opacity-75">({stageProgress}%)</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {stageTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks for this stage yet
            </div>
          ) : (
            stageTasks.map((task) => (
              <div
                key={task.id}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                  task.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : task.status === 'in_progress'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
                onClick={() => toggleTaskStatus(task.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getStatusIcon(task.status)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {getMemberName(task.assignedTo)}
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : task.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Tip</h3>
        <p className="text-sm text-blue-800">
          Click on any task to cycle through statuses: Pending → In Progress → Completed
        </p>
      </div>
    </div>
  );
};
