import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNaviagtion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const UserProfileSettings = () => {
  const fileInputRef = useRef(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate learner exploring new technologies and improving every day.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    avatar: null,
    dateJoined: '2024-01-15'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    learningReminders: true,
    communityUpdates: false,
    profileVisibility: 'public',
    showProgress: true,
    showBadges: true,
    allowMessages: true,
    theme: 'system'
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 3D animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      rotateX: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const avatarVariants = {
    hover: {
      scale: 1.1,
      rotateY: 15,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'User', color: 'text-blue-600' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings', color: 'text-green-600' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield', color: 'text-purple-600' },
    { id: 'security', label: 'Security', icon: 'Lock', color: 'text-red-600' },
    { id: 'account', label: 'Account', icon: 'UserCog', color: 'text-orange-600' }
  ];

  const handleInputChange = (section, field, value) => {
    if (section === 'profile') {
      setProfileData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'preferences') {
      setPreferences(prev => ({ ...prev, [field]: value }));
    } else if (section === 'security') {
      setSecurity(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, avatar: e?.target?.result }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API save
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderProfileSection = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Avatar Section */}
      <motion.div 
        className="flex items-center space-x-6 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl"
        variants={cardVariants}
        whileHover="hover"
      >
        <motion.div 
          className="relative"
          variants={avatarVariants}
          whileHover="hover"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
            {profileData?.avatar ? (
              <img 
                src={profileData?.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} color="white" />
            )}
          </div>
          <motion.button
            onClick={() => fileInputRef?.current?.click()}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="Camera" size={16} />
          </motion.button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary">
            {profileData?.firstName} {profileData?.lastName}
          </h3>
          <p className="text-text-secondary">{profileData?.email}</p>
          <p className="text-sm text-text-secondary mt-1">
            Member since {new Date(profileData?.dateJoined)?.toLocaleDateString()}
          </p>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-text-primary">Personal Information</h4>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Icon name={isEditing ? "X" : "Edit"} size={16} />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={profileData?.firstName}
              onChange={(e) => handleInputChange('profile', 'firstName', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              value={profileData?.lastName}
              onChange={(e) => handleInputChange('profile', 'lastName', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              value={profileData?.email}
              onChange={(e) => handleInputChange('profile', 'email', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Phone"
              value={profileData?.phone}
              onChange={(e) => handleInputChange('profile', 'phone', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Location"
              value={profileData?.location}
              onChange={(e) => handleInputChange('profile', 'location', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Website"
              value={profileData?.website}
              onChange={(e) => handleInputChange('profile', 'website', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
            <textarea
              value={profileData?.bio}
              onChange={(e) => handleInputChange('profile', 'bio', e?.target?.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full p-3 border border-input rounded-lg bg-background text-text-primary disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          {isEditing && (
            <motion.div 
              className="flex justify-end space-x-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={handleSave}
                  loading={isSaving}
                >
                  Save Changes
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderPreferencesSection = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Notifications */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Notifications</h4>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
              { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your learning progress' },
              { key: 'learningReminders', label: 'Learning Reminders', description: 'Daily study reminders' },
              { key: 'communityUpdates', label: 'Community Updates', description: 'Forum and discussion updates' }
            ]?.map((item) => (
              <div key={item?.key} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-text-primary">{item?.label}</label>
                  <p className="text-xs text-text-secondary">{item?.description}</p>
                </div>
                <motion.label 
                  className="relative inline-flex items-center cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="checkbox"
                    checked={preferences?.[item?.key]}
                    onChange={(e) => handleInputChange('preferences', item?.key, e?.target?.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </motion.label>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Learning Preferences */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Learning Preferences</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Theme</label>
              <select
                value={preferences?.theme}
                onChange={(e) => handleInputChange('preferences', 'theme', e?.target?.value)}
                className="w-full p-3 border border-input rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderPrivacySection = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Privacy Settings</h4>
          <div className="space-y-4">
            {[
              { key: 'showProgress', label: 'Show Learning Progress', description: 'Allow others to see your learning progress' },
              { key: 'showBadges', label: 'Show Badges', description: 'Display earned badges on your profile' },
              { key: 'allowMessages', label: 'Allow Direct Messages', description: 'Let other users send you messages' }
            ]?.map((item) => (
              <div key={item?.key} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-text-primary">{item?.label}</label>
                  <p className="text-xs text-text-secondary">{item?.description}</p>
                </div>
                <motion.label 
                  className="relative inline-flex items-center cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="checkbox"
                    checked={preferences?.[item?.key]}
                    onChange={(e) => handleInputChange('preferences', item?.key, e?.target?.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </motion.label>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Profile Visibility</label>
              <select
                value={preferences?.profileVisibility}
                onChange={(e) => handleInputChange('preferences', 'profileVisibility', e?.target?.value)}
                className="w-full p-3 border border-input rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSecuritySection = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Two-Factor Authentication */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Two-Factor Authentication</h4>
          <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary">Enable 2FA</p>
              <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
            </div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant={security?.twoFactorEnabled ? "destructive" : "default"}
                size="sm"
                onClick={() => handleInputChange('security', 'twoFactorEnabled', !security?.twoFactorEnabled)}
              >
                {security?.twoFactorEnabled ? "Disable" : "Enable"}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Change Password</h4>
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={security?.currentPassword}
              onChange={(e) => handleInputChange('security', 'currentPassword', e?.target?.value)}
            />
            <Input
              label="New Password"
              type="password"
              value={security?.newPassword}
              onChange={(e) => handleInputChange('security', 'newPassword', e?.target?.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={security?.confirmPassword}
              onChange={(e) => handleInputChange('security', 'confirmPassword', e?.target?.value)}
            />
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button>Update Password</Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderAccountSection = () => (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Export Data */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Export Data</h4>
          <p className="text-text-secondary mb-4">
            Download a copy of all your account data, including profile information, learning progress, and activity history.
          </p>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button variant="outline">
              <Icon name="Download" size={16} />
              Export My Data
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Delete Account */}
      <motion.div variants={cardVariants} whileHover="hover">
        <div className="bg-surface border border-destructive/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h4>
          <p className="text-text-secondary mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Icon name="Trash2" size={16} />
              Delete Account
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'preferences': return renderPreferencesSection();
      case 'privacy': return renderPrivacySection();
      case 'security': return renderSecuritySection();
      case 'account': return renderAccountSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <main className="pt-32 pb-20 md:pb-8">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page Header */}
          <motion.div className="mb-8" variants={cardVariants}>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Profile Settings</h1>
            <p className="text-text-secondary">
              Manage your account settings, preferences, and privacy controls.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div 
              className="lg:col-span-1"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-surface border border-border rounded-xl p-4 sticky top-36">
                <nav className="space-y-2">
                  {sections?.map((section) => (
                    <motion.button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon name={section?.icon} size={18} className={activeSection === section?.id ? '' : section?.color} />
                      <span className="font-medium">{section?.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
                  <p className="text-text-secondary text-sm">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-text-secondary mb-6">
                Are you sure you want to delete your account? All of your data will be permanently removed.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    // Handle account deletion
                  }}
                  className="flex-1"
                >
                  Delete Account
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileSettings;