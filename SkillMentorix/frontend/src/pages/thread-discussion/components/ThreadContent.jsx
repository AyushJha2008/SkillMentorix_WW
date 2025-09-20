import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
// import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ThreadContent = ({ content, attachments = [] }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderFormattedContent = (text) => {
    // Simple formatting for demonstration
    const lines = text?.split('\n');
    return lines?.map((line, index) => {
      // Code blocks
      if (line?.startsWith('```')) {
        return null; // Handle in separate code block logic
      }
      
      // Headers
      if (line?.startsWith('# ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-text-primary mt-4 mb-2">
            {line?.substring(2)}
          </h3>
        );
      }
      
      // Bold text
      const boldText = line?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Italic text
      const italicText = boldText?.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return (
        <p
          key={index}
          className="text-text-primary mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: italicText }}
        />
      );
    });
  };

  const renderCodeBlock = (code, language = 'javascript') => {
    return (
      <div className="bg-muted border border-border rounded-lg p-4 my-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard?.writeText(code)}
            iconName="Copy"
            iconPosition="left"
          >
            Copy
          </Button>
        </div>
        <pre className="text-sm text-text-primary overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  const renderAttachments = () => {
    if (!attachments?.length) return null;

    return (
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Paperclip" size={16} className="mr-2" />
          Attachments ({attachments?.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attachments?.map((attachment) => (
            <div
              key={attachment?.id}
              className="border border-border rounded-lg p-3 hover:bg-accent transition-educational cursor-pointer"
              onClick={() => attachment?.type === 'image' && setSelectedImage(attachment)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {attachment?.type === 'image' ? (
                    <Image
                      src={attachment?.url}
                      alt={attachment?.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                      <Icon name="File" size={20} color="var(--color-text-secondary)" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {attachment?.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {attachment?.size} • {attachment?.type}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const contentPreview = content?.length > 500 ? content?.substring(0, 500) + '...' : content;
  const shouldShowToggle = content?.length > 500;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="prose max-w-none">
        {renderFormattedContent(showFullContent ? content : contentPreview)}
        
        {/* Code example */}
        {content?.includes('```') && renderCodeBlock(`function calculateGrade(score, total) {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}`)}
        
        {shouldShowToggle && (
          <Button
            variant="ghost"
            onClick={() => setShowFullContent(!showFullContent)}
            className="mt-4"
            iconName={showFullContent ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showFullContent ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </div>
      {renderAttachments()}
      {/* Image Modal */}
      {selectedImage && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={selectedImage?.url}
                alt={selectedImage?.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/20 text-white hover:bg-black/40"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThreadContent;