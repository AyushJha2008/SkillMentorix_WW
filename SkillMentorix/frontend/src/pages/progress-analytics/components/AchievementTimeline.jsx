import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementTimeline = () => {
  const achievements = [
    {
      id: 1,
      type: 'badge',
      title: 'Mathematics Master',
      description: 'Completed 50 mathematics quizzes with 90%+ accuracy',
      date: '2025-01-15',
      icon: 'Award',
      color: 'text-warning bg-warning/10',
      xp: 500
    },
    {
      id: 2,
      type: 'milestone',
      title: '30-Day Learning Streak',
      description: 'Maintained consistent daily learning for 30 days',
      date: '2025-01-10',
      icon: 'Flame',
      color: 'text-error bg-error/10',
      xp: 300
    },
    {
      id: 3,
      type: 'skill',
      title: 'Physics Fundamentals',
      description: 'Achieved Level 3 proficiency in Physics',
      date: '2025-01-08',
      icon: 'Zap',
      color: 'text-primary bg-primary/10',
      xp: 250
    },
    {
      id: 4,
      type: 'badge',
      title: 'Quiz Champion',
      description: 'Scored perfect 100% on 10 consecutive quizzes',
      date: '2025-01-05',
      icon: 'Trophy',
      color: 'text-success bg-success/10',
      xp: 400
    },
    {
      id: 5,
      type: 'milestone',
      title: 'First AI Tutor Session',
      description: 'Completed your first AI tutoring session',
      date: '2025-01-03',
      icon: 'Bot',
      color: 'text-secondary bg-secondary/10',
      xp: 100
    },
    {
      id: 6,
      type: 'skill',
      title: 'Chemistry Basics',
      description: 'Unlocked Chemistry fundamentals',
      date: '2025-01-01',
      icon: 'Beaker',
      color: 'text-primary bg-primary/10',
      xp: 200
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'badge': return 'Badge Earned';
      case 'milestone': return 'Milestone';
      case 'skill': return 'Skill Level';
      default: return 'Achievement';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Achievement Timeline</h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} />
          <span>Last 30 days</span>
        </div>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-6">
          {achievements?.map((achievement, index) => (
            <div key={achievement?.id} className="relative flex items-start space-x-4">
              {/* Timeline dot */}
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${achievement?.color} border-4 border-surface`}>
                <Icon name={achievement?.icon} size={24} />
              </div>
              
              {/* Achievement content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-text-secondary bg-muted px-2 py-1 rounded-full">
                      {getTypeLabel(achievement?.type)}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatDate(achievement?.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <Icon name="Zap" size={14} />
                    <span className="text-sm font-medium">+{achievement?.xp} XP</span>
                  </div>
                </div>
                
                <h4 className="text-base font-semibold text-text-primary mb-1">
                  {achievement?.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {achievement?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {achievements?.filter(a => a?.type === 'badge')?.length}
            </p>
            <p className="text-sm text-text-secondary">Badges Earned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {achievements?.filter(a => a?.type === 'milestone')?.length}
            </p>
            <p className="text-sm text-text-secondary">Milestones</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {achievements?.reduce((sum, a) => sum + a?.xp, 0)}
            </p>
            <p className="text-sm text-text-secondary">Total XP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementTimeline;