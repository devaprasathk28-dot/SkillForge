import { useEffect, useState } from 'react';
import { Team } from '../types';
import { analyzeSkills, suggestRoles, getSkillCategories } from '../utils/skillMapping';
import { TrendingUp, Target, Award } from 'lucide-react';

interface Props {
  team: Team;
}

export const SkillMapping = ({ team }: Props) => {
  const [skills, setSkills] = useState<ReturnType<typeof analyzeSkills>>([]);
  const [roles, setRoles] = useState<ReturnType<typeof suggestRoles>>([]);
  const [categories, setCategories] = useState<Record<string, number>>({});

  useEffect(() => {
    const analyzedSkills = analyzeSkills(team.members);
    const suggestedRoles = suggestRoles(team.members);
    const skillCategories = getSkillCategories(analyzedSkills);

    setSkills(analyzedSkills);
    setRoles(suggestedRoles);
    setCategories(skillCategories);
  }, [team.members]);

  const maxCount = Math.max(...Object.values(categories));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Skill Distribution</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">{category}</span>
                <span className="text-sm text-gray-500">{count} skills</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Recommended Role Assignments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((assignment) => (
            <div
              key={assignment.member.id}
              className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{assignment.member.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{assignment.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    {assignment.confidence}%
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {assignment.member.skillset.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Skills in Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {skills.slice(0, 8).map((skill) => (
            <div
              key={skill.skill}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center"
            >
              <p className="font-bold text-blue-900 capitalize">{skill.skill}</p>
              <p className="text-sm text-blue-600">{skill.count} member{skill.count > 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
