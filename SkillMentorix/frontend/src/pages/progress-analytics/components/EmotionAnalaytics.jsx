import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionAnalytics = () => {
  const [isPrivacyEnabled, setIsPrivacyEnabled] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const emotionData = [
    { name: 'Focused', value: 45, color: '#10B981' },
    { name: 'Confident', value: 25, color: '#2563EB' },
    { name: 'Confused', value: 15, color: '#F59E0B' },
    { name: 'Frustrated', value: 10, color: '#EF4444' },
    { name: 'Excited', value: 5, color: '#8B5CF6' }
  ];

  const engagementData = [
    { session: 'Mon', engagement: 85, duration: 45 },
    { session: 'Tue', engagement: 78, duration: 38 },
    { session: 'Wed', engagement: 92, duration: 52 },
    { session: 'Thu', engagement: 88, duration: 47 },
    { session: 'Fri', engagement: 76, duration: 35 },
    { session: 'Sat', engagement: 94, duration: 58 },
    { session: 'Sun', engagement: 82, duration: 41 }
  ];

  const insights = [
    {
      icon: 'Brain',
      title: 'Peak Focus Time',
      description: 'You show highest concentration between 2-4 PM',
      recommendation: 'Schedule challenging topics during this window'
    },
    {
      icon: 'TrendingUp',
      title: 'Engagement Improvement',
      description: '15% increase in focus levels over the past month',
      recommendation: 'Continue current study patterns'
    },
    {
      icon: 'AlertCircle',
      title: 'Confusion Patterns',
      description: 'Higher confusion rates in Mathematics topics',
      recommendation: 'Consider additional practice or AI tutor sessions'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-educational-lg">
          <p className="text-sm font-medium text-text-primary mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              {entry?.name}: {entry?.value}{entry?.name === 'engagement' ? '%' : ' min'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Privacy Controls */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Emotion Detection Analytics</h3>
            <p className="text-sm text-text-secondary mt-1">
              AI-powered insights from your learning sessions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Privacy Protected</span>
            <Button
              variant={isPrivacyEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPrivacyEnabled(!isPrivacyEnabled)}
            >
              {isPrivacyEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>
        
        {!isPrivacyEnabled && (
          <div className="bg-muted border border-border rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 text-warning mb-2">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">Privacy Mode Disabled</span>
            </div>
            <p className="text-sm text-text-secondary">
              Emotion detection is currently disabled. Enable to view detailed analytics.
            </p>
          </div>
        )}
      </div>
      {isPrivacyEnabled && (
        <>
          {/* Emotion Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
              <h4 className="text-lg font-semibold text-text-primary mb-4">Emotion Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {emotionData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Percentage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {emotionData?.map((emotion, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: emotion?.color }}
                    />
                    <span className="text-sm text-text-secondary">
                      {emotion?.name}: {emotion?.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Trends */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
              <h4 className="text-lg font-semibold text-text-primary mb-4">Weekly Engagement</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="session" 
                      stroke="var(--color-text-secondary)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="var(--color-text-secondary)"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="engagement" 
                      fill="var(--color-primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-educational">
            <h4 className="text-lg font-semibold text-text-primary mb-4">AI-Generated Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights?.map((insight, index) => (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={insight?.icon} size={20} className="text-primary" />
                    </div>
                    <h5 className="font-medium text-text-primary">{insight?.title}</h5>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{insight?.description}</p>
                  <p className="text-sm text-primary font-medium">{insight?.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmotionAnalytics;