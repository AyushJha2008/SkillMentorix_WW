import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConversationHeader = ({ 
  conversation, 
  onBookmark, 
  onShare, 
  onClearChat, 
  onExportChat,
  isBookmarked = false 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: conversation?.title || 'AI Tutor Conversation',
        text: 'Check out this helpful AI tutor conversation',
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
    setShowActions(false);
  };

  const handleExport = () => {
    onExportChat();
    setShowActions(false);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
      onClearChat();
    }
    setShowActions(false);
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">
              {conversation?.title || 'AI Tutor'}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Online</span>
              </div>
              {conversation?.subjects && conversation?.subjects?.length > 0 && (
                <>
                  <span>•</span>
                  <span>{conversation?.subjects?.join(', ')}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmark}
            title={isBookmarked ? "Remove bookmark" : "Bookmark conversation"}
          >
            <Icon 
              name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
              size={20} 
              color={isBookmarked ? "var(--color-warning)" : "currentColor"}
            />
          </Button>

          {/* Actions Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowActions(!showActions)}
              title="More actions"
            >
              <Icon name="MoreVertical" size={20} />
            </Button>

            {showActions && (
              <>
                <div
                  className="fixed inset-0 z-999"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-educational-lg z-1000">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent transition-educational first:rounded-t-lg"
                  >
                    <Icon name="Share2" size={16} />
                    <span>Share Conversation</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent transition-educational"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export Chat</span>
                  </button>
                  <div className="border-t border-border"></div>
                  <button
                    onClick={handleClear}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent transition-educational text-error last:rounded-b-lg"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Clear Chat</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Learning Context Banner */}
      {conversation?.context && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <span className="font-medium">Learning Context: </span>
              {conversation?.context}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHeader;