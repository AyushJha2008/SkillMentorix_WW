import React from 'react';
import Icon from '../../../components/AppIcon';


const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })?.format(new Date(date));
  };

  const renderMessageContent = (content) => {
    // Handle code blocks
    if (content?.includes('```')) {
      const parts = content?.split('```');
      return parts?.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <div key={index} className="bg-gray-900 text-green-400 p-3 rounded-lg my-2 font-mono text-sm overflow-x-auto">
              <pre>{part?.trim()}</pre>
            </div>
          );
        }
        return <span key={index}>{part}</span>;
      });
    }

    // Handle mathematical equations (simple LaTeX-like syntax)
    if (content?.includes('$$')) {
      const parts = content?.split('$$');
      return parts?.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <div key={index} className="bg-blue-50 p-2 rounded-lg my-2 text-center font-mono text-blue-800">
              {part?.trim()}
            </div>
          );
        }
        return <span key={index}>{part}</span>;
      });
    }

    // Handle inline code
    return content?.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="bg-muted p-3 rounded-lg max-w-xs">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-secondary' : 'bg-primary'
      }`}>
        {isUser ? (
          <Icon name="User" size={16} color="white" />
        ) : (
          <Icon name="Bot" size={16} color="white" />
        )}
      </div>
      <div className="flex-1 max-w-3xl">
        <div className={`p-3 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto max-w-md' 
            : 'bg-muted text-text-primary'
        }`}>
          <div 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: renderMessageContent(message?.content) 
            }}
          />
          {message?.attachments && message?.attachments?.length > 0 && (
            <div className="mt-2 space-y-2">
              {message?.attachments?.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-accent rounded-lg">
                  <Icon name="Paperclip" size={16} />
                  <span className="text-sm">{attachment?.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`text-xs text-text-secondary mt-1 ${isUser ? 'text-right' : ''}`}>
          {formatTimestamp(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;