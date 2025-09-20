import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionDetectionPanel = ({ 
  isEnabled, 
  onToggle, 
  onEmotionDetected,
  className = '' 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock emotion detection data
  const mockEmotions = [
    { emotion: 'focused', confidence: 0.85, color: 'text-primary' },
    { emotion: 'confused', confidence: 0.72, color: 'text-warning' },
    { emotion: 'confident', confidence: 0.91, color: 'text-success' },
    { emotion: 'stressed', confidence: 0.68, color: 'text-error' },
    { emotion: 'neutral', confidence: 0.76, color: 'text-text-secondary' }
  ];

  useEffect(() => {
    if (isEnabled && isActive) {
      startCamera();
      // Mock emotion detection every 3 seconds
      const interval = setInterval(() => {
        const randomEmotion = mockEmotions?.[Math.floor(Math.random() * mockEmotions?.length)];
        setCurrentEmotion(randomEmotion);
        onEmotionDetected?.(randomEmotion);
      }, 3000);

      return () => {
        clearInterval(interval);
        stopCamera();
      };
    } else {
      stopCamera();
    }
  }, [isEnabled, isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ 
        video: { width: 320, height: 240 } 
      });
      streamRef.current = stream;
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionStatus('granted');
    } catch (error) {
      console.error('Camera access denied:', error);
      setPermissionStatus('denied');
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    if (videoRef?.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleToggleCamera = () => {
    setIsActive(!isActive);
  };

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'focused': return 'Target';
      case 'confused': return 'HelpCircle';
      case 'confident': return 'Smile';
      case 'stressed': return 'Frown';
      default: return 'Minus';
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className={`bg-surface border border-border rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Camera" size={18} color="var(--color-primary)" />
          <h3 className="text-sm font-medium text-text-primary">Emotion Detection</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName="X"
          iconSize={14}
        >
          Hide
        </Button>
      </div>
      {/* Camera Feed */}
      <div className="relative mb-4">
        <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
          {isActive && permissionStatus === 'granted' ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Icon 
                  name={permissionStatus === 'denied' ? 'CameraOff' : 'Camera'} 
                  size={24} 
                  color="var(--color-text-secondary)" 
                />
                <p className="text-xs text-text-secondary mt-1">
                  {permissionStatus === 'denied' ? 'Camera access denied' : 'Camera off'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recording Indicator */}
        {isActive && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-error px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs text-white font-medium">REC</span>
          </div>
        )}
      </div>
      {/* Current Emotion Display */}
      {currentEmotion && isActive && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getEmotionIcon(currentEmotion?.emotion)} 
                size={16} 
                color="currentColor"
                className={currentEmotion?.color}
              />
              <span className={`text-sm font-medium capitalize ${currentEmotion?.color}`}>
                {currentEmotion?.emotion}
              </span>
            </div>
            <span className="text-xs text-text-secondary">
              {Math.round(currentEmotion?.confidence * 100)}%
            </span>
          </div>
        </div>
      )}
      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant={isActive ? "destructive" : "default"}
          size="sm"
          onClick={handleToggleCamera}
          iconName={isActive ? "CameraOff" : "Camera"}
          iconPosition="left"
          iconSize={14}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>

        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} color="var(--color-success)" />
          <span className="text-xs text-text-secondary">Privacy Protected</span>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="mt-3 p-2 bg-accent rounded-md">
        <p className="text-xs text-text-secondary leading-relaxed">
          Emotion data is processed locally and not stored permanently. Used only for adaptive learning.
        </p>
      </div>
    </div>
  );
};

export default EmotionDetectionPanel;