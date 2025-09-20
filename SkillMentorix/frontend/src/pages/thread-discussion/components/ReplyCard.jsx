import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ReplyCard = ({ reply, level = 0, onUpvote, onReply, onMarkSolution, canMarkSolution = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleUpvote = () => {
    onUpvote(reply?.id);
  };

  const handleReplySubmit = async () => {
    if (!replyText?.trim()) return;
    
    setIsSubmitting(true);
    await onReply(reply?.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
    setIsSubmitting(false);
  };

  const handleMarkSolution = () => {
    onMarkSolution(reply?.id);
  };

  const indentClass = level > 0 ? `ml-${Math.min(level * 8, 32)}` : '';
  const maxLevel = 3;

  return (
    <div className={`${indentClass} ${level > 0 ? 'border-l-2 border-muted pl-4' : ''}`}>
      <div className={`bg-card border border-border rounded-lg p-4 mb-4 ${reply?.isSolution ? 'ring-2 ring-success/20 bg-success/5' : ''}`}>
        {/* Solution Badge */}
        {reply?.isSolution && (
          <div className="flex items-center space-x-2 mb-3 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-semibold">Accepted Solution</span>
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={reply?.author?.avatar}
                alt={reply?.author?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {reply?.author?.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-surface rounded-full"></div>
              )}
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-text-primary">{reply?.author?.name}</h4>
                {reply?.author?.badges?.map((badge) => (
                  <NotificationBadge
                    key={badge?.type}
                    variant={badge?.type === 'expert' ? 'warning' : 'secondary'}
                    size="sm"
                  >
                    {badge?.icon}
                  </NotificationBadge>
                ))}
              </div>
              <div className="flex items-center space-x-3 text-xs text-text-secondary">
                <span>{reply?.author?.reputation} rep</span>
                <span>{formatTimeAgo(reply?.createdAt)}</span>
                {reply?.isEdited && <span>edited</span>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {canMarkSolution && !reply?.isSolution && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkSolution}
                iconName="CheckCircle"
                iconPosition="left"
                className="text-success hover:bg-success/10"
              >
                Mark Solution
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>

        {/* Reply Content */}
        <div className="mb-4">
          <p className="text-text-primary leading-relaxed whitespace-pre-wrap">
            {reply?.content}
          </p>
          
          {/* Code block example */}
          {reply?.hasCode && (
            <div className="bg-muted border border-border rounded-lg p-3 mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-text-secondary">JavaScript</span>
                <Button variant="ghost" size="sm" iconName="Copy">
                  Copy
                </Button>
              </div>
              <pre className="text-sm text-text-primary overflow-x-auto">
                <code>{`const result = numbers.reduce((sum, num) => sum + num, 0);
console.log('Total:', result);`}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Reply Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUpvote}
                iconName="ChevronUp"
                iconPosition="left"
                className={reply?.isUpvoted ? 'text-primary bg-primary/10' : 'text-text-secondary'}
              >
                {reply?.upvotes}
              </Button>
            </div>
            
            {level < maxLevel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                iconName="MessageSquare"
                iconPosition="left"
                className="text-text-secondary"
              >
                Reply
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              className="text-text-secondary"
            >
              Share
            </Button>
          </div>

          <div className="text-xs text-text-secondary">
            #{reply?.id}
          </div>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e?.target?.value)}
                placeholder="Write your reply..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <Icon name="Info" size={12} />
                  <span>Use **bold** and *italic* for formatting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleReplySubmit}
                    loading={isSubmitting}
                    disabled={!replyText?.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Nested Replies */}
      {reply?.replies && reply?.replies?.map((nestedReply) => (
        <ReplyCard
          key={nestedReply?.id}
          reply={nestedReply}
          level={level + 1}
          onUpvote={onUpvote}
          onReply={onReply}
          onMarkSolution={onMarkSolution}
          canMarkSolution={canMarkSolution}
        />
      ))}
    </div>
  );
};

export default ReplyCard;