import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ThreadCard = ({ thread, onUpvote, onBookmark }) => {
  const navigate = useNavigate();

  const handleThreadClick = () => {
    navigate('/thread-discussion', { state: { threadId: thread?.id } });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'question':
        return 'HelpCircle';
      case 'discussion':
        return 'MessageSquare';
      case 'announcement':
        return 'Megaphone';
      default:
        return 'MessageCircle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'question':
        return 'text-blue-600';
      case 'discussion':
        return 'text-green-600';
      case 'announcement':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-educational-lg transition-educational cursor-pointer">
      <div onClick={handleThreadClick}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getTypeIcon(thread?.type)} 
              size={16} 
              className={getTypeColor(thread?.type)}
            />
            <span className={`text-xs font-medium uppercase tracking-wide ${getTypeColor(thread?.type)}`}>
              {thread?.type}
            </span>
            {thread?.isSolved && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
                <Icon name="CheckCircle" size={12} />
                <span className="text-xs font-medium">Solved</span>
              </div>
            )}
          </div>
          <span className="text-xs text-text-secondary">
            {formatTimeAgo(thread?.lastActivity)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 hover:text-primary transition-educational">
          {thread?.title}
        </h3>

        {/* Preview */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {thread?.preview}
        </p>

        {/* Tags */}
        {thread?.tags && thread?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {thread?.tags?.slice(0, 3)?.map((tag, index) => (
              <span 
                key={index}
                className="bg-muted text-text-secondary px-2 py-1 rounded-md text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
            {thread?.tags?.length > 3 && (
              <span className="text-xs text-text-secondary">
                +{thread?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Image 
            src={thread?.author?.avatar}
            alt={thread?.author?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-primary">
                {thread?.author?.name}
              </span>
              {thread?.author?.badges && thread?.author?.badges?.length > 0 && (
                <div className="flex items-center space-x-1">
                  {thread?.author?.badges?.slice(0, 2)?.map((badge, index) => (
                    <div 
                      key={index}
                      className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                      title={badge?.name}
                    >
                      <Icon name={badge?.icon} size={10} color="white" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <span>{thread?.author?.reputation} reputation</span>
              <span>•</span>
              <span>{thread?.author?.level}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onUpvote(thread?.id);
            }}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-educational hover:bg-accent ${
              thread?.isUpvoted ? 'text-primary bg-primary/10' : 'text-text-secondary'
            }`}
          >
            <Icon name="ArrowUp" size={16} />
            <span className="text-sm font-medium">{thread?.upvotes}</span>
          </button>
          
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="MessageSquare" size={16} />
            <span className="text-sm">{thread?.replies}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Eye" size={16} />
            <span className="text-sm">{thread?.views}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={thread?.isBookmarked ? "Bookmark" : "BookmarkPlus"}
            onClick={(e) => {
              e?.stopPropagation();
              onBookmark(thread?.id);
            }}
            className={thread?.isBookmarked ? 'text-primary' : ''}
          >
            {thread?.isBookmarked ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;