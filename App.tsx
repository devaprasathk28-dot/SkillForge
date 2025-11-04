import { useState, useEffect } from 'react';
import { Team, Task, ChatMessage } from './types';
import { storage } from './utils/storage';
import { TeamSetup } from './components/TeamSetup';
import { SkillMapping } from './components/SkillMapping';
import { AutoFlow } from './components/AutoFlow';
import { SmartAssist } from './components/SmartAssist';
import { PitchMode } from './components/PitchMode';
import { Users, TrendingUp, Zap, Bot, Presentation, Menu, X } from 'lucide-react';

type View = 'setup' | 'skills' | 'autoflow' | 'assist' | 'pitch';

function App() {
  const [team, setTeam] = useState<Team | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentView, setCurrentView] = useState<View>('setup');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTeam = storage.getTeam();
    const savedTasks = storage.getTasks();
    const savedMessages = storage.getMessages();

    if (savedTeam) setTeam(savedTeam);
    if (savedTasks) setTasks(savedTasks);
    if (savedMessages) setMessages(savedMessages);
  }, []);

  const handleTeamCreated = (newTeam: Team) => {
    setTeam(newTeam);
    storage.saveTeam(newTeam);
    setCurrentView('skills');
  };

  const handleTasksUpdate = (newTasks: Task[]) => {
    setTasks(newTasks);
    storage.saveTasks(newTasks);
  };

  const handleMessagesUpdate = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    storage.saveMessages(newMessages);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? All data will be lost.')) {
      storage.clearAll();
      setTeam(null);
      setTasks([]);
      setMessages([]);
      setCurrentView('setup');
    }
  };

  const navItems = [
    { id: 'setup' as View, label: 'Team Setup', icon: Users, disabled: false },
    { id: 'skills' as View, label: 'Skill Mapping', icon: TrendingUp, disabled: !team },
    { id: 'autoflow' as View, label: 'AutoFlow', icon: Zap, disabled: !team },
    { id: 'assist' as View, label: 'Smart Assist', icon: Bot, disabled: !team },
    { id: 'pitch' as View, label: 'Pitch Mode', icon: Presentation, disabled: !team }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">SkillForge</h1>
                <p className="text-xs text-gray-400">AI-Powered Hackathon Teammate</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => !item.disabled && setCurrentView(item.id)}
                  disabled={item.disabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : item.disabled
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
              {team && (
                <button
                  onClick={handleReset}
                  className="ml-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.disabled) {
                      setCurrentView(item.id);
                      setMenuOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-600 text-white'
                      : item.disabled
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
              {team && (
                <button
                  onClick={() => {
                    handleReset();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!team && currentView !== 'setup' && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-yellow-900 mb-2">Setup Required</h3>
            <p className="text-yellow-800">
              Please complete the team setup before accessing other features.
            </p>
          </div>
        )}

        {currentView === 'setup' && (
          <TeamSetup onTeamCreated={handleTeamCreated} existingTeam={team || undefined} />
        )}

        {currentView === 'skills' && team && (
          <SkillMapping team={team} />
        )}

        {currentView === 'autoflow' && team && (
          <AutoFlow team={team} tasks={tasks} onTasksUpdate={handleTasksUpdate} />
        )}

        {currentView === 'assist' && team && (
          <SmartAssist messages={messages} onMessagesUpdate={handleMessagesUpdate} />
        )}

        {currentView === 'pitch' && team && (
          <PitchMode team={team} tasks={tasks} />
        )}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>SkillForge - Your AI-Powered Hackathon Teammate</p>
            <p className="mt-1">Built for the Developer Tools & AI Stream</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
