import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionButtons = ({ onQuickAction, disabled = false }) => {
  const quickActions = [
    {
      id: 'explain',
      label: 'Explain Concept',
      icon: 'BookOpen',
      prompt: "Can you explain this concept in simple terms?"
    },
    {
      id: 'practice',
      label: 'Practice Problems',
      icon: 'Target',
      prompt: "Can you provide some practice problems for this topic?"
    },
    {
      id: 'examples',
      label: 'Show Examples',
      icon: 'Lightbulb',
      prompt: "Can you show me some real-world examples of this concept?"
    },
    {
      id: 'summary',
      label: 'Summarize',
      icon: 'FileText',
      prompt: "Can you provide a summary of the key points?"
    },
    {
      id: 'tips',
      label: 'Study Tips',
      icon: 'Star',
      prompt: "What are some effective study tips for this topic?"
    },
    {
      id: 'quiz',
      label: 'Quick Quiz',
      icon: 'HelpCircle',
      prompt: "Can you create a quick quiz to test my understanding?"
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4">
      <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center">
        <Icon name="Zap" size={16} className="mr-2" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onQuickAction(action?.prompt)}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={14}
            className="justify-start text-xs"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionButtons;