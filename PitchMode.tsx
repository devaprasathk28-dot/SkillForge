import { useState } from 'react';
import { Team, Task } from '../types';
import { Presentation, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { calculateProgress } from '../utils/autoflow';

interface Props {
  team: Team;
  tasks: Task[];
}

export const PitchMode = ({ team, tasks }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [problemStatement, setProblemStatement] = useState(team.problemStatement || '');
  const [solutionOverview, setSolutionOverview] = useState(team.solutionOverview || '');
  const [isEditing, setIsEditing] = useState(false);

  const progress = calculateProgress(tasks);
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const slides = [
    {
      title: team.projectName,
      content: (
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{team.projectName}</h1>
          <p className="text-2xl text-gray-600">{team.stream}</p>
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Team: {team.name}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {team.members.map((member) => (
                <div key={member.id} className="bg-blue-100 px-4 py-2 rounded-full">
                  <span className="font-medium text-blue-900">{member.name}</span>
                  <span className="text-blue-600 text-sm ml-2">• {member.role || 'Developer'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Problem Statement',
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problem</h2>
          {isEditing ? (
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full h-48 p-4 border-2 border-blue-300 rounded-lg text-lg"
              placeholder="Describe the problem your project solves..."
            />
          ) : (
            <p className="text-xl text-gray-700 leading-relaxed">
              {problemStatement || 'Hackathon teams often struggle with coordination, task management, and time constraints, leading to incomplete projects and poor presentations.'}
            </p>
          )}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      )
    },
    {
      title: 'Our Solution',
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The Solution</h2>
          {isEditing ? (
            <textarea
              value={solutionOverview}
              onChange={(e) => setSolutionOverview(e.target.value)}
              className="w-full h-48 p-4 border-2 border-blue-300 rounded-lg text-lg"
              placeholder="Describe your solution..."
            />
          ) : (
            <p className="text-xl text-gray-700 leading-relaxed">
              {solutionOverview || 'SkillForge is an AI-powered teammate that automates team coordination, generates project roadmaps, provides coding assistance, and creates presentation materials automatically.'}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-2">Smart Task Management</h3>
              <p className="text-sm text-green-800">Automated roadmap generation and tracking</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">AI Assistance</h3>
              <p className="text-sm text-blue-800">Real-time coding help and suggestions</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-2">Skill Mapping</h3>
              <p className="text-sm text-yellow-800">Intelligent role assignment</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
              <h3 className="font-bold text-pink-900 mb-2">Auto Presentations</h3>
              <p className="text-sm text-pink-800">Generated pitch decks instantly</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Workflow & Architecture',
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900">Team Setup</h3>
                <p className="text-sm text-gray-600">Create team and add members with skills</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900">Skill Analysis</h3>
                <p className="text-sm text-gray-600">AI analyzes skills and assigns optimal roles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900">AutoFlow Generation</h3>
                <p className="text-sm text-gray-600">Automated roadmap with task assignments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900">Smart Assist</h3>
                <p className="text-sm text-gray-600">AI provides real-time coding help</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900">Pitch Ready</h3>
                <p className="text-sm text-gray-600">Auto-generated presentation materials</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Results & Impact',
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Project Status</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center">
              <div className="text-5xl font-bold mb-2">{progress}%</div>
              <div className="text-blue-100">Completion Rate</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
              <div className="text-5xl font-bold mb-2">{completedTasks}</div>
              <div className="text-green-100">Tasks Completed</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl text-center">
              <div className="text-5xl font-bold mb-2">{team.members.length}</div>
              <div className="text-yellow-100">Team Members</div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Reduces hackathon setup time by 70%</span>
              </li>
              <li className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Improves team coordination and productivity</span>
              </li>
              <li className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Generates professional presentations automatically</span>
              </li>
              <li className="flex items-center gap-3 text-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span>Provides real-time AI assistance during development</span>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Presentation className="w-6 h-6" />
            <h2 className="text-xl font-bold">Pitch Mode</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white p-12" style={{ minHeight: '500px' }}>
          <div className="max-w-4xl mx-auto">
            {slides[currentSlide].content}
          </div>
        </div>

        <div className="bg-gray-100 p-4 flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={currentSlide === slides.length - 1}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
