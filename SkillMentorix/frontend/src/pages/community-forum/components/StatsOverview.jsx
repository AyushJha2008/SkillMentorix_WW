import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Threads',
      value: stats?.totalThreads,
      icon: 'MessageSquare',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Active Today',
      value: stats?.activeToday,
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Questions Solved',
      value: stats?.questionsSolved,
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Community Members',
      value: stats?.totalMembers,
      icon: 'Users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-educational transition-educational">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-text-primary">
                {formatNumber(item?.value)}
              </p>
              <p className="text-sm text-text-secondary truncate">
                {item?.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;