import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({ 
  dateRange, 
  setDateRange, 
  selectedSubjects, 
  setSelectedSubjects,
  performanceMetric,
  setPerformanceMetric,
  onRefresh,
  onExport 
}) => {
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'computer-science', label: 'Computer Science' }
  ];

  const metricOptions = [
    { value: 'accuracy', label: 'Quiz Accuracy' },
    { value: 'xp', label: 'XP Earned' },
    { value: 'completion', label: 'Completion Rate' },
    { value: 'streak', label: 'Learning Streak' },
    { value: 'engagement', label: 'Engagement Score' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-educational mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Analytics Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
          className="w-full"
        />
        
        <Select
          label="Subjects"
          options={subjectOptions}
          value={selectedSubjects}
          onChange={setSelectedSubjects}
          multiple
          searchable
          placeholder="Select subjects..."
          className="w-full"
        />
        
        <Select
          label="Performance Metric"
          options={metricOptions}
          value={performanceMetric}
          onChange={setPerformanceMetric}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>Last updated: {new Date()?.toLocaleString()}</span>
          <span>•</span>
          <span>Auto-refresh: Every 5 minutes</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          className="text-text-secondary"
        >
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;