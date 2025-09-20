import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateThreadModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'question',
    subject: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectOptions = [
    { value: '', label: 'Select Subject' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' }
  ];

  const typeOptions = [
    { value: 'question', label: 'Question' },
    { value: 'discussion', label: 'Discussion' },
    { value: 'announcement', label: 'Announcement' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      const threadData = {
        ...formData,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
        createdAt: new Date()?.toISOString(),
        author: {
          id: 'current-user',
          name: 'Current User',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          reputation: 1250,
          level: 'Advanced',
          badges: [
            { name: 'Helper', icon: 'Heart' },
            { name: 'Scholar', icon: 'GraduationCap' }
          ]
        }
      };
      
      await onSubmit(threadData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        type: 'question',
        subject: '',
        tags: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-lg shadow-educational-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Plus" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">
              Create New Thread
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thread Type and Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Thread Type"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                required
              />
              
              <Select
                label="Subject"
                options={subjectOptions}
                value={formData?.subject}
                onChange={(value) => handleInputChange('subject', value)}
                required
              />
            </div>

            {/* Title */}
            <Input
              label="Title"
              type="text"
              placeholder="Enter a clear, descriptive title..."
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
              maxLength={200}
              description="Be specific and descriptive to get better responses"
            />

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Content <span className="text-destructive">*</span>
              </label>
              <textarea
                placeholder={`Describe your ${formData?.type} in detail...\n\nFor questions:\n• What have you tried?\n• What specific help do you need?\n• Include relevant context\n\nFor discussions:\n• Share your thoughts or insights\n• Ask for opinions or experiences\n• Provide background information`}
                value={formData?.content}
                onChange={(e) => handleInputChange('content', e?.target?.value)}
                required
                rows={8}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-educational resize-vertical"
              />
              <p className="text-xs text-text-secondary">
                Supports basic formatting. Be detailed and specific for better responses.
              </p>
            </div>

            {/* Tags */}
            <Input
              label="Tags"
              type="text"
              placeholder="calculus, derivatives, homework (separate with commas)"
              value={formData?.tags}
              onChange={(e) => handleInputChange('tags', e?.target?.value)}
              description="Add relevant tags to help others find your thread"
            />

            {/* Guidelines */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm text-text-secondary">
                  <p className="font-medium text-text-primary mb-1">Community Guidelines:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Be respectful and constructive in your communication</li>
                    <li>• Search existing threads before creating new ones</li>
                    <li>• Provide context and show your work for questions</li>
                    <li>• Use appropriate tags and categories</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/50">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Users" size={16} />
            <span>Your thread will be visible to all community members</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isSubmitting}
              iconName="Send"
              disabled={!formData?.title?.trim() || !formData?.content?.trim() || !formData?.subject}
            >
              Create Thread
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadModal;