import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecommendationsPanel = ({ recommendations }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'weak_area': return 'Target';
      case 'streak_boost': return 'Flame';
      case 'new_topic': return 'BookOpen';
      case 'review': return 'RotateCcw';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'weak_area': return 'border-error/20 bg-error/5';
      case 'streak_boost': return 'border-warning/20 bg-warning/5';
      case 'new_topic': return 'border-primary/20 bg-primary/5';
      case 'review': return 'border-secondary/20 bg-secondary/5';
      default: return 'border-border bg-card';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-educational">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recommended for You</h3>
        <Icon name="Sparkles" size={16} className="text-primary" />
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div
            key={rec?.id}
            className={`border rounded-lg p-4 transition-educational hover:shadow-educational ${getRecommendationColor(rec?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={getRecommendationIcon(rec?.type)} size={20} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {rec?.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(rec?.difficulty)}`}>
                    {rec?.difficulty}
                  </span>
                </div>
                
                <p className="text-xs text-text-secondary mb-3">
                  {rec?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{rec?.estimatedTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Star" size={12} />
                      <span>+{rec?.xpReward} XP</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="FileQuestion" size={12} />
                      <span>{rec?.questionCount} questions</span>
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/quiz-interface', { state: { quizId: rec?.quizId } })}
                    iconName="Play"
                    iconPosition="left"
                  >
                    Start
                  </Button>
                </div>
              </div>
            </div>
            
            {rec?.reason && (
              <div className="mt-3 p-2 bg-muted rounded-md">
                <p className="text-xs text-text-secondary">
                  <Icon name="Info" size={12} className="inline mr-1" />
                  {rec?.reason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {recommendations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Lightbulb" size={48} className="text-text-secondary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No recommendations yet</p>
          <p className="text-xs text-text-secondary mt-1">Complete more quizzes to get personalized suggestions</p>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          fullWidth
          onClick={() => navigate('/quiz-interface')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Browse All Quizzes
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsPanel;