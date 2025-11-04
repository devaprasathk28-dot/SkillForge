import { useState } from 'react';
import { Team, TeamMember } from '../types';
import { Users, Plus, Trash2, Save } from 'lucide-react';

interface Props {
  onTeamCreated: (team: Team) => void;
  existingTeam?: Team;
}

export const TeamSetup = ({ onTeamCreated, existingTeam }: Props) => {
  const [teamName, setTeamName] = useState(existingTeam?.name || '');
  const [projectName, setProjectName] = useState(existingTeam?.projectName || '');
  const [stream, setStream] = useState(existingTeam?.stream || '');
  const [members, setMembers] = useState<TeamMember[]>(existingTeam?.members || []);
  const [currentMember, setCurrentMember] = useState({
    name: '',
    skillset: '',
    experienceLevel: 'intermediate'
  });

  const addMember = () => {
    if (!currentMember.name || !currentMember.skillset) return;

    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: currentMember.name,
      skillset: currentMember.skillset.split(',').map(s => s.trim()).filter(Boolean),
      role: '',
      experienceLevel: currentMember.experienceLevel
    };

    setMembers([...members, newMember]);
    setCurrentMember({ name: '', skillset: '', experienceLevel: 'intermediate' });
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleSubmit = () => {
    if (!teamName || !projectName || !stream || members.length === 0) {
      alert('Please fill all fields and add at least one team member');
      return;
    }

    const team: Team = {
      id: existingTeam?.id || `team-${Date.now()}`,
      name: teamName,
      projectName,
      stream,
      problemStatement: existingTeam?.problemStatement || '',
      solutionOverview: existingTeam?.solutionOverview || '',
      members,
      createdAt: existingTeam?.createdAt || new Date().toISOString()
    };

    onTeamCreated(team);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Team Setup</h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Code Warriors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., SkillForge"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream / Category
            </label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a stream</option>
              <option value="Developer Tools & AI">Developer Tools & AI</option>
              <option value="HealthTech">HealthTech</option>
              <option value="EdTech">EdTech</option>
              <option value="FinTech">FinTech</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Social Impact">Social Impact</option>
            </select>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Team Members</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                value={currentMember.name}
                onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Name"
              />

              <input
                type="text"
                value={currentMember.skillset}
                onChange={(e) => setCurrentMember({ ...currentMember, skillset: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Skills (comma-separated)"
              />

              <select
                value={currentMember.experienceLevel}
                onChange={(e) => setCurrentMember({ ...currentMember, experienceLevel: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <button
              onClick={addMember}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>

          {members.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members ({members.length})</h3>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{member.name}</h4>
                      <p className="text-sm text-gray-600">
                        {member.skillset.join(', ')} • {member.experienceLevel}
                      </p>
                    </div>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Save className="w-5 h-5" />
              {existingTeam ? 'Update Team' : 'Create Team'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
