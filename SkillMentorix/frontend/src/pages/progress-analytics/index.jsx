import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import PerformanceChart from './components/PerformanceChart';
import SubjectRadarChart from './components/SubjectRadarChart';
import KPICard from './components/KPICard';
import FilterControls from './components/FilterControls';
import EmotionAnalytics from './components/EmotionAnalaytics';
import AchievementTimeline from './components/AchievementTimeline';
import QuizHistoryTable from './components/QuizHistoryTable';
import Icon from '../../components/AppIcon';

const ProgressAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedSubjects, setSelectedSubjects] = useState(['mathematics', 'physics']);
  const [performanceMetric, setPerformanceMetric] = useState('accuracy');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock performance data
  const performanceData = [
    { date: 'Jan 1', value: 75, accuracy: 75, xp: 120, score: 78 },
    { date: 'Jan 5', value: 82, accuracy: 82, xp: 150, score: 85 },
    { date: 'Jan 10', value: 78, accuracy: 78, xp: 135, score: 80 },
    { date: 'Jan 15', value: 88, accuracy: 88, xp: 180, score: 90 },
    { date: 'Jan 20', value: 92, accuracy: 92, xp: 200, score: 95 },
    { date: 'Jan 25', value: 85, accuracy: 85, xp: 165, score: 88 },
    { date: 'Jan 30', value: 94, accuracy: 94, xp: 220, score: 96 }
  ];

  const xpData = [
    { date: 'Week 1', value: 450 },
    { date: 'Week 2', value: 620 },
    { date: 'Week 3', value: 580 },
    { date: 'Week 4', value: 750 }
  ];

  const subjectCompetencyData = [
    { subject: 'Mathematics', value: 92 },
    { subject: 'Physics', value: 88 },
    { subject: 'Chemistry', value: 85 },
    { subject: 'Biology', value: 78 },
    { subject: 'English', value: 82 },
    { subject: 'History', value: 75 }
  ];

  const kpiData = [
    {
      title: 'Total XP Earned',
      value: '12,450',
      subtitle: 'Experience Points',
      icon: 'Zap',
      trend: 'up',
      trendValue: '+15%',
      color: 'primary'
    },
    {
      title: 'Quiz Completion Rate',
      value: '94%',
      subtitle: 'This month',
      icon: 'CheckCircle',
      trend: 'up',
      trendValue: '+8%',
      color: 'success'
    },
    {
      title: 'Learning Streak',
      value: '23',
      subtitle: 'Days in a row',
      icon: 'Flame',
      trend: 'up',
      trendValue: '+5 days',
      color: 'warning'
    },
    {
      title: 'Average Score',
      value: '87%',
      subtitle: 'Across all subjects',
      icon: 'Target',
      trend: 'up',
      trendValue: '+3%',
      color: 'secondary'
    }
  ];

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing analytics data...');
  };

  const handleExport = () => {
    // Simulate data export
    console.log('Exporting analytics data...');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'emotions', label: 'Emotions', icon: 'Brain' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <div className="pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="BarChart3" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Progress Analytics</h1>
                <p className="text-text-secondary">
                  Comprehensive insights into your learning journey and performance trends
                </p>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedSubjects={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
            performanceMetric={performanceMetric}
            setPerformanceMetric={setPerformanceMetric}
            onRefresh={handleRefresh}
            onExport={handleExport}
          />

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-educational whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-surface text-text-primary shadow-educational'
                      : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData?.map((kpi, index) => (
                  <KPICard key={index} {...kpi} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart
                  data={performanceData}
                  title="Performance Trends"
                  type="line"
                  color="var(--color-primary)"
                />
                <SubjectRadarChart
                  data={subjectCompetencyData}
                  title="Subject Competency"
                />
              </div>

              {/* XP Progress */}
              <PerformanceChart
                data={xpData}
                title="XP Earned Over Time"
                type="area"
                color="var(--color-success)"
              />
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart
                  data={performanceData}
                  title="Quiz Accuracy Trends"
                  type="line"
                  color="var(--color-primary)"
                />
                <PerformanceChart
                  data={performanceData}
                  title="Score Distribution"
                  type="area"
                  color="var(--color-secondary)"
                />
              </div>
              <SubjectRadarChart
                data={subjectCompetencyData}
                title="Detailed Subject Analysis"
              />
            </div>
          )}

          {activeTab === 'emotions' && (
            <EmotionAnalytics />
          )}

          {activeTab === 'achievements' && (
            <AchievementTimeline />
          )}

          {activeTab === 'history' && (
            <QuizHistoryTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;