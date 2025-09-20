import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ThreadHeader = ({ thread, onUpvote, onBookmark, onFollow, onReport }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(thread?.isFollowing);
  const [isBookmarked, setIsBookmarked] = useState(thread?.isBookmarked);

  const handleUpvote = () => {
    onUpvote(thread?.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(thread?.id);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow(thread?.id);
  };

  const handleReport = () => {
    onReport(thread?.id);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/community-forum')}
          iconName="ArrowLeft"
          iconPosition="left"
          className="text-text-secondary hover:text-text-primary"
        >
          Back to Forum
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={isBookmarked ? 'text-warning' : 'text-text-secondary'}
          >
            <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFollow}
            className={isFollowing ? 'text-primary' : 'text-text-secondary'}
          >
            <Icon name={isFollowing ? 'Bell' : 'BellPlus'} size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReport}
            className="text-text-secondary hover:text-error"
          >
            <Icon name="Flag" size={20} />
          </Button>
        </div>
      </div>
      {/* Thread Title and Tags */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl font-bold text-text-primary leading-tight flex-1 mr-4">
            {thread?.title}
          </h1>
          {thread?.isSolved && (
            <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
              <Icon name="CheckCircle" size={16} />
              <span>Solved</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {thread?.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-text-secondary px-3 py-1 rounded-full text-sm font-medium hover:bg-accent transition-educational cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Author Info and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={thread?.author?.avatar}
              alt={thread?.author?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {thread?.author?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-surface rounded-full"></div>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-text-primary">{thread?.author?.name}</h3>
              {thread?.author?.badges?.map((badge) => (
                <NotificationBadge
                  key={badge?.type}
                  variant={badge?.type === 'expert' ? 'warning' : 'secondary'}
                  size="sm"
                  className="text-xs"
                >
                  {badge?.icon}
                </NotificationBadge>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>{thread?.author?.reputation} reputation</span>
              <span>{formatTimeAgo(thread?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpvote}
              className={`${thread?.isUpvoted ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-primary'} transition-educational`}
            >
              <Icon name="ChevronUp" size={24} />
            </Button>
            <span className="text-lg font-semibold text-text-primary">
              {thread?.upvotes}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-text-primary transition-educational"
            >
              <Icon name="ChevronDown" size={24} />
            </Button>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{thread?.replies?.length}</div>
            <div className="text-sm text-text-secondary">replies</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{thread?.views}</div>
            <div className="text-sm text-text-secondary">views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadHeader;