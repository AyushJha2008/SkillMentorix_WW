import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import StatsCard from './components/StatsCard';
import ProgressChart from './components/ProgressChart';
import StreakCounter from './components/StreakCounter';
import BadgeShowcase from './components/BadgeShowcase';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import RecommendationsPanel from './components/RecommendationsPanel';

const UserDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    level: 15,
    xpPoints: 2847,
    currentStreak: 12,
    longestStreak: 28,
    lastActivity: "Today",
    completedQuizzes: 47,
    earnedBadges: 12,
    totalBadges: 25,
    averageScore: 87
  };

  // Mock progress data for charts
  const weeklyProgressData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 92 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 95 },
    { name: 'Fri', value: 88 },
    { name: 'Sat', value: 91 },
    { name: 'Sun', value: 87 }
  ];

  const subjectProgressData = [
    { name: 'Math', value: 92 },
    { name: 'Science', value: 85 },
    { name: 'History', value: 78 },
    { name: 'English', value: 89 },
    { name: 'Geography', value: 82 }
  ];

  // Mock badges data
  const badges = [
    { id: 1, name: "First Quiz", type: "milestone", rarity: "common", earned: true, earnedDate: "2025-01-15" },
    { id: 2, name: "Week Warrior", type: "streak", rarity: "rare", earned: true, earnedDate: "2025-01-18" },
    { id: 3, name: "Math Master", type: "quiz", rarity: "epic", earned: true, earnedDate: "2025-01-20" },
    { id: 4, name: "Community Helper", type: "community", rarity: "rare", earned: true, earnedDate: "2025-01-22" },
    { id: 5, name: "Perfect Score", type: "achievement", rarity: "legendary", earned: false },
    { id: 6, name: "Quiz Streak", type: "streak", rarity: "epic", earned: false },
    { id: 7, name: "Knowledge Seeker", type: "quiz", rarity: "common", earned: true, earnedDate: "2025-01-10" },
    { id: 8, name: "Discussion Leader", type: "community", rarity: "rare", earned: false }
  ];

  const recentBadges = badges?.filter(badge => badge?.earned && badge?.earnedDate >= "2025-01-18");

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "quiz",
      title: "Completed Advanced Mathematics Quiz",
      description: "Algebra and Calculus fundamentals",
      score: 94,
      xpGained: 150,
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      type: "badge",
      title: "Earned \'Math Master\' Badge",
      description: "Completed 10 mathematics quizzes with 90%+ score",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      type: "forum",
      title: "Posted in Physics Discussion",
      description: "Helped explain quantum mechanics concepts",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 4,
      type: "ai_chat",
      title: "AI Tutor Session",
      description: "Discussed calculus problem-solving strategies",
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      id: 5,
      type: "streak",
      title: "12-Day Learning Streak!",
      description: "Maintained consistent daily learning",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];

  // Mock recommendations
  const recommendations = [
    {
      id: 1,
      type: "weak_area",
      title: "Trigonometry Basics",
      description: "Strengthen your understanding of sine, cosine, and tangent functions",
      difficulty: "medium",
      estimatedTime: "15 min",
      xpReward: 120,
      questionCount: 10,
      quizId: "trig-basics-001",
      reason: "Based on your recent quiz performance, this topic needs attention"
    },
    {
      id: 2,
      type: "streak_boost",
      title: "Daily Science Facts",
      description: "Quick science quiz to maintain your learning streak",
      difficulty: "easy",
      estimatedTime: "5 min",
      xpReward: 50,
      questionCount: 5,
      quizId: "science-facts-daily",
      reason: "Perfect for maintaining your 12-day streak!"
    },
    {
      id: 3,
      type: "new_topic",
      title: "Introduction to Chemistry",
      description: "Explore the periodic table and chemical reactions",
      difficulty: "easy",
      estimatedTime: "20 min",
      xpReward: 180,
      questionCount: 15,
      quizId: "chemistry-intro-001",
      reason: "Ready to explore a new subject area"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <main className="pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, {userData?.name}! 👋
            </h1>
            <p className="text-text-secondary">
              Ready to continue your learning journey? You're doing great!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="XP Points"
              value={userData?.xpPoints?.toLocaleString()}
              subtitle={`Level ${userData?.level}`}
              icon="Star"
              trend="up"
              trendValue="+12%"
              color="primary"
            />
            <StatsCard
              title="Quizzes Completed"
              value={userData?.completedQuizzes}
              subtitle="This month"
              icon="FileQuestion"
              trend="up"
              trendValue="+5"
              color="success"
            />
            <StatsCard
              title="Average Score"
              value={`${userData?.averageScore}%`}
              subtitle="All time"
              icon="TrendingUp"
              trend="up"
              trendValue="+3%"
              color="warning"
            />
            <StatsCard
              title="Badges Earned"
              value={`${userData?.earnedBadges}/${userData?.totalBadges}`}
              subtitle="Achievements"
              icon="Award"
              color="secondary"
              trend="neutral"
              trendValue=""
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressChart
                  type="line"
                  data={weeklyProgressData}
                  title="Weekly Progress"
                  height={250}
                />
                <ProgressChart
                  type="bar"
                  data={subjectProgressData}
                  title="Subject Performance"
                  height={250}
                />
              </div>

              {/* Quick Actions */}
              <QuickActions
                offlineQuizCount={8}
                unreadMessages={3}
              />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Streak Counter */}
              <StreakCounter
                currentStreak={userData?.currentStreak}
                longestStreak={userData?.longestStreak}
                lastActivity={userData?.lastActivity}
              />

              {/* Badge Showcase */}
              <BadgeShowcase
                badges={badges}
                recentBadges={recentBadges}
              />

              {/* Recommendations */}
              <RecommendationsPanel recommendations={recommendations} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;