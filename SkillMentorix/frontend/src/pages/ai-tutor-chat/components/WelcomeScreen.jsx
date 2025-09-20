import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const WelcomeScreen = ({ onStartChat, onQuickAction }) => {
  const features = [
    {
      icon: 'MessageSquare',
      title: 'Interactive Learning',
      description: 'Ask questions and get personalized explanations tailored to your learning style.'
    },
    {
      icon: 'BookOpen',
      title: 'Subject Expertise',
      description: 'Get help with Math, Science, History, Literature, and more academic subjects.'
    },
    {
      icon: 'Target',
      title: 'Practice Problems',
      description: 'Request custom practice problems to reinforce your understanding.'
    },
    {
      icon: 'Lightbulb',
      title: 'Concept Clarification',
      description: 'Break down complex topics into simple, easy-to-understand explanations.'
    }
  ];

  const quickStartOptions = [
    {
      title: 'Help with Homework',
      description: 'Get assistance with your current assignments',
      icon: 'FileText',
      prompt: "I need help with my homework. Can you assist me?"
    },
    {
      title: 'Explain a Concept',
      description: 'Understand difficult topics better',
      icon: 'BookOpen',
      prompt: "Can you explain a concept I\'m struggling with?"
    },
    {
      title: 'Practice Questions',
      description: 'Get practice problems for better understanding',
      icon: 'HelpCircle',
      prompt: "Can you create some practice questions for me?"
    },
    {
      title: 'Study Tips',
      description: 'Learn effective study strategies',
      icon: 'Star',
      prompt: "What are some effective study tips for my subjects?"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bot" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome to AI Tutor
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your personal learning assistant is here to help you understand concepts, 
            solve problems, and excel in your studies. Ask me anything!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-6 text-center hover:shadow-educational-lg transition-educational">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{feature?.title}</h3>
              <p className="text-sm text-text-secondary">{feature?.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Start Options */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4 text-center">
            Quick Start Options
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {quickStartOptions?.map((option, index) => (
              <button
                key={index}
                onClick={() => onQuickAction(option?.prompt)}
                className="text-left p-4 border border-border rounded-lg hover:bg-accent transition-educational group"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-educational">
                    <Icon name={option?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-1">{option?.title}</h3>
                    <p className="text-sm text-text-secondary">{option?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary transition-educational" />
                </div>
              </button>
            ))}
          </div>

          {/* Start Chat Button */}
          <div className="text-center">
            <Button
              onClick={onStartChat}
              size="lg"
              iconName="MessageSquare"
              iconPosition="left"
              className="px-8"
            >
              Start New Conversation
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Tips for Better Learning</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about what you're struggling with</li>
                <li>• Ask for examples when learning new concepts</li>
                <li>• Request practice problems to test your understanding</li>
                <li>• Don't hesitate to ask follow-up questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;