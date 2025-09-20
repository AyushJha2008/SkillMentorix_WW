import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false, isTyping = false }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setMessage(prev => prev + transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition?.start();
    }
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file?.name);
    }
  };

  return (
    <div className="bg-surface border-t border-border p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={isTyping ? "AI is typing..." : "Ask me anything about your studies..."}
            disabled={disabled || isTyping}
            className="w-full p-3 pr-20 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text-primary placeholder-text-secondary min-h-12 max-h-32"
            rows={1}
          />
          
          {/* Voice and File Upload Buttons */}
          <div className="absolute right-2 bottom-2 flex space-x-1">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={disabled}
              className="h-8 w-8"
            >
              <Icon name="Paperclip" size={16} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              disabled={disabled}
              className={`h-8 w-8 ${isRecording ? 'text-error' : ''}`}
            >
              <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
            </Button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={!message?.trim() || disabled || isTyping}
          iconName="Send"
          iconSize={16}
          className="h-12 px-4"
        >
          Send
        </Button>
      </form>
      {/* Character count and tips */}
      <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {isRecording && (
            <span className="flex items-center text-error">
              <Icon name="Mic" size={12} className="mr-1 animate-pulse" />
              Recording...
            </span>
          )}
        </div>
        <span className={message?.length > 500 ? 'text-warning' : ''}>
          {message?.length}/1000
        </span>
      </div>
    </div>
  );
};

export default ChatInput;