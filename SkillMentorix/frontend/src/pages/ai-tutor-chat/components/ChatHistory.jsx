import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHistory = ({ conversations, onSelectConversation, onNewChat, currentConversationId }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7 days
      return messageDate?.toLocaleDateString('en-US', { 
        weekday: 'short' 
      });
    } else {
      return messageDate?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateTitle = (title, maxLength = 30) => {
    return title?.length > maxLength ? title?.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    } hidden lg:flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-text-primary">Chat History</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
        </div>
        {!isCollapsed && (
          <Button
            variant="outline"
            onClick={onNewChat}
            iconName="Plus"
            iconPosition="left"
            className="w-full mt-3"
          >
            New Chat
          </Button>
        )}
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="p-2">
            {conversations?.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat to begin learning!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {conversations?.map((conversation) => (
                  <button
                    key={conversation?.id}
                    onClick={() => onSelectConversation(conversation?.id)}
                    className={`w-full text-left p-3 rounded-lg transition-educational hover:bg-accent ${
                      currentConversationId === conversation?.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-text-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {truncateTitle(conversation?.title)}
                        </h3>
                        <p className="text-xs opacity-75 mt-1 truncate">
                          {conversation?.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <span className="text-xs opacity-60">
                          {formatDate(conversation?.updatedAt)}
                        </span>
                        {conversation?.unreadCount > 0 && (
                          <span className="bg-error text-error-foreground text-xs rounded-full px-2 py-0.5 mt-1">
                            {conversation?.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Subject tags */}
                    {conversation?.subjects && conversation?.subjects?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conversation?.subjects?.slice(0, 2)?.map((subject, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 bg-accent rounded-full opacity-75"
                          >
                            {subject}
                          </span>
                        ))}
                        {conversation?.subjects?.length > 2 && (
                          <span className="text-xs opacity-60">
                            +{conversation?.subjects?.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Collapsed state quick actions */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            title="New Chat"
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;