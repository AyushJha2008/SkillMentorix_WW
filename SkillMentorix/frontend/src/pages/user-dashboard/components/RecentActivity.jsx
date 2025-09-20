import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz': return 'FileQuestion';
      case 'badge': return 'Award';
      case 'forum': return 'MessageSquare';
      case 'streak': return 'Flame';
      case 'ai_chat': return 'Bot';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'quiz': return 'text-primary';
      case 'badge': return 'text-warning';
      case 'forum': return 'text-success';
      case 'streak': return 'text-error';
      case 'ai_chat': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-educational">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Clock" size={16} className="text-text-secondary" />
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-educational">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">
                {activity?.title}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {activity?.description}
              </p>
              {activity?.score && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Score: {activity?.score}%
                  </span>
                  {activity?.xpGained && (
                    <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                      +{activity?.xpGained} XP
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="text-xs text-text-secondary">
              {formatTimeAgo(activity?.timestamp)}
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No recent activity</p>
          <p className="text-xs text-text-secondary mt-1">Start learning to see your progress here</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;