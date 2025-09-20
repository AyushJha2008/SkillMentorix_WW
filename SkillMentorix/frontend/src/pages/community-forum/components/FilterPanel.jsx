import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onSortChange, 
  onClearFilters,
  isExpanded,
  onToggleExpanded 
}) => {
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'question', label: 'Questions' },
    { value: 'discussion', label: 'Discussions' },
    { value: 'announcement', label: 'Announcements' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'solved', label: 'Solved' },
    { value: 'unsolved', label: 'Unsolved' },
    { value: 'active', label: 'Active' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'unanswered', label: 'Unanswered' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-replies', label: 'Most Replies' }
  ];

  const hasActiveFilters = filters?.subject !== 'all' || 
                          filters?.type !== 'all' || 
                          filters?.status !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Mobile Toggle Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} />
          <span className="font-medium text-text-primary">Filters</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={onToggleExpanded}
        />
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block p-4 space-y-4`}>
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <span className="font-medium text-text-primary">Filters</span>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Subject"
            options={subjectOptions}
            value={filters?.subject}
            onChange={(value) => onFilterChange('subject', value)}
          />

          <Select
            label="Type"
            options={typeOptions}
            value={filters?.type}
            onChange={(value) => onFilterChange('type', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />

          <Select
            label="Sort by"
            options={sortOptions}
            value={filters?.sort}
            onChange={onSortChange}
          />
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button
            variant={filters?.type === 'question' ? 'default' : 'outline'}
            size="sm"
            iconName="HelpCircle"
            onClick={() => onFilterChange('type', filters?.type === 'question' ? 'all' : 'question')}
          >
            Questions
          </Button>
          <Button
            variant={filters?.status === 'unsolved' ? 'default' : 'outline'}
            size="sm"
            iconName="AlertCircle"
            onClick={() => onFilterChange('status', filters?.status === 'unsolved' ? 'all' : 'unsolved')}
          >
            Unanswered
          </Button>
          <Button
            variant={filters?.status === 'solved' ? 'default' : 'outline'}
            size="sm"
            iconName="CheckCircle"
            onClick={() => onFilterChange('status', filters?.status === 'solved' ? 'all' : 'solved')}
          >
            Solved
          </Button>
        </div>

        {/* Mobile Clear Button */}
        {hasActiveFilters && (
          <div className="md:hidden pt-2 border-t border-border">
            <Button
              variant="outline"
              fullWidth
              iconName="X"
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;