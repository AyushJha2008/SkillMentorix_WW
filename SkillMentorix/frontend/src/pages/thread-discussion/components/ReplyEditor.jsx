import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReplyEditor = ({ onSubmit, placeholder = "Share your thoughts..." }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = async () => {
    if (!content?.trim()) return;
    
    setIsSubmitting(true);
    await onSubmit(content, attachments);
    setContent('');
    setAttachments([]);
    setIsSubmitting(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: (file?.size / 1024)?.toFixed(1) + ' KB',
      type: file?.type?.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setAttachments([...attachments, ...newAttachments]);
    event.target.value = '';
  };

  const removeAttachment = (id) => {
    setAttachments(attachments?.filter(att => att?.id !== id));
  };

  const insertFormatting = (format) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = content?.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      case 'codeblock':
        formattedText = `\`\`\`\n${selectedText || 'code block'}\n\`\`\``;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        break;
      default:
        return;
    }
    
    const newContent = content?.substring(0, start) + formattedText + content?.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea?.focus();
      const newCursorPos = start + formattedText?.length;
      textarea?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderPreview = () => {
    // Simple preview rendering
    const lines = content?.split('\n');
    return lines?.map((line, index) => {
      if (line?.startsWith('```')) return null;
      
      let processedLine = line?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>');
      
      return (
        <p
          key={index}
          className="mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Add Your Reply</h3>
      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('bold')}
          iconName="Bold"
          className="text-text-secondary hover:text-text-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('italic')}
          iconName="Italic"
          className="text-text-secondary hover:text-text-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('code')}
          iconName="Code"
          className="text-text-secondary hover:text-text-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('codeblock')}
          iconName="FileCode"
          className="text-text-secondary hover:text-text-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormatting('link')}
          iconName="Link"
          className="text-text-secondary hover:text-text-primary"
        />
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef?.current?.click()}
          iconName="Paperclip"
          className="text-text-secondary hover:text-text-primary"
        />
        
        <div className="flex-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          iconName={showPreview ? "Edit" : "Eye"}
          className="text-text-secondary hover:text-text-primary"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>
      {/* Content Area */}
      <div className="mb-4">
        {showPreview ? (
          <div className="min-h-32 p-4 border border-border rounded-lg bg-muted/30">
            {content ? (
              <div className="prose max-w-none text-text-primary">
                {renderPreview()}
              </div>
            ) : (
              <p className="text-text-secondary italic">Nothing to preview</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e?.target?.value)}
            placeholder={placeholder}
            className="w-full min-h-32 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={6}
          />
        )}
      </div>
      {/* Attachments */}
      {attachments?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-text-primary mb-2">Attachments</h4>
          <div className="space-y-2">
            {attachments?.map((attachment) => (
              <div
                key={attachment?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={attachment?.type === 'image' ? 'Image' : 'File'}
                    size={20}
                    color="var(--color-text-secondary)"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{attachment?.name}</p>
                    <p className="text-xs text-text-secondary">{attachment?.size}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="text-text-secondary hover:text-error"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
      {/* Submit Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Info" size={12} />
            <span>Use **bold**, *italic*, `code` for formatting</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-xs text-text-secondary">
            {content?.length}/5000 characters
          </span>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!content?.trim() || content?.length > 5000}
            iconName="Send"
            iconPosition="right"
          >
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyEditor;