import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import SubNavigationPanel from '../../components/ui/SubNavigationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ThreadCard from './components/ThreadCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import CreateThreadModal from './components/CreateThreadModal';
import StatsOverview from './components/StatsOverview';
import TrendingTopics from './components/TrendingTopics';

const CommunityForum = () => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    subject: 'all',
    type: 'all',
    status: 'all',
    sort: 'recent'
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockThreads = [
    {
      id: 1,
      title: "How to solve quadratic equations using the quadratic formula?",
      preview: "I\'m struggling with understanding when and how to use the quadratic formula. Can someone explain the step-by-step process with examples?",
      type: "question",
      subject: "mathematics",
      tags: ["quadratic", "algebra", "formulas", "homework"],
      author: {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        reputation: 1250,
        level: "Advanced",
        badges: [
          { name: "Helper", icon: "Heart" },
          { name: "Scholar", icon: "GraduationCap" }
        ]
      },
      upvotes: 24,
      replies: 8,
      views: 156,
      isUpvoted: false,
      isBookmarked: true,
      isSolved: false,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "Understanding Newton\'s Laws of Motion - Discussion",
      preview: "Let's discuss practical applications of Newton's three laws of motion in everyday life. Share examples and interesting scenarios where these laws apply.",
      type: "discussion",
      subject: "physics",
      tags: ["newton", "motion", "physics", "mechanics"],
      author: {
        id: 2,
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        reputation: 2100,
        level: "Expert",
        badges: [
          { name: "Mentor", icon: "Award" },
          { name: "Physics Master", icon: "Zap" }
        ]
      },
      upvotes: 42,
      replies: 15,
      views: 289,
      isUpvoted: true,
      isBookmarked: false,
      isSolved: false,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: "Organic Chemistry Reaction Mechanisms - Need Help!",
      preview: "I'm having trouble understanding SN1 and SN2 reaction mechanisms. The difference between them is confusing me. Any tips for memorizing and understanding these?",
      type: "question",
      subject: "chemistry",
      tags: ["organic", "reactions", "mechanisms", "sn1", "sn2"],
      author: {
        id: 3,
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        reputation: 850,
        level: "Intermediate",
        badges: [
          { name: "Curious", icon: "Search" }
        ]
      },
      upvotes: 18,
      replies: 12,
      views: 203,
      isUpvoted: false,
      isBookmarked: false,
      isSolved: true,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: "JavaScript Array Methods - Complete Guide",
      preview: "A comprehensive discussion about JavaScript array methods like map, filter, reduce, forEach. Let's share best practices and common use cases.",
      type: "discussion",
      subject: "computer-science",
      tags: ["javascript", "arrays", "programming", "methods"],
      author: {
        id: 4,
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        reputation: 3200,
        level: "Expert",
        badges: [
          { name: "Code Master", icon: "Code" },
          { name: "Helper", icon: "Heart" },
          { name: "Mentor", icon: "Award" }
        ]
      },
      upvotes: 67,
      replies: 23,
      views: 445,
      isUpvoted: false,
      isBookmarked: true,
      isSolved: false,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      title: "Study Tips for Final Exams - Share Your Strategies",
      preview: "Final exam season is approaching! Let's share effective study techniques, time management tips, and stress management strategies that have worked for you.",
      type: "discussion",
      subject: "general",
      tags: ["study-tips", "exams", "time-management", "stress"],
      author: {
        id: 5,
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        reputation: 1650,
        level: "Advanced",
        badges: [
          { name: "Study Buddy", icon: "BookOpen" },
          { name: "Helper", icon: "Heart" }
        ]
      },
      upvotes: 89,
      replies: 34,
      views: 567,
      isUpvoted: true,
      isBookmarked: true,
      isSolved: false,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      title: "Cell Division: Mitosis vs Meiosis Explained",
      preview: "Can someone help me understand the key differences between mitosis and meiosis? I keep getting confused about the phases and outcomes.",
      type: "question",
      subject: "biology",
      tags: ["cell-division", "mitosis", "meiosis", "biology"],
      author: {
        id: 6,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        reputation: 720,
        level: "Beginner",
        badges: [
          { name: "New Member", icon: "Star" }
        ]
      },
      upvotes: 15,
      replies: 9,
      views: 134,
      isUpvoted: false,
      isBookmarked: false,
      isSolved: true,
      lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
    }
  ];

  const mockStats = {
    totalThreads: 12847,
    activeToday: 234,
    questionsSolved: 8956,
    totalMembers: 45623
  };

  const mockTrendingTopics = [
    { tag: "calculus", count: 156, trend: 12 },
    { tag: "programming", count: 234, trend: 8 },
    { tag: "chemistry", count: 89, trend: -3 },
    { tag: "physics", count: 167, trend: 15 },
    { tag: "study-tips", count: 203, trend: 22 }
  ];

  const searchSuggestions = [
    "calculus derivatives",
    "physics momentum",
    "organic chemistry",
    "javascript functions",
    "study techniques",
    "exam preparation"
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setThreads(mockThreads);
      setFilteredThreads(mockThreads);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortThreads();
  }, [threads, filters, searchQuery]);

  const filterAndSortThreads = () => {
    let filtered = [...threads];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(thread =>
        thread?.title?.toLowerCase()?.includes(query) ||
        thread?.preview?.toLowerCase()?.includes(query) ||
        thread?.tags?.some(tag => tag?.toLowerCase()?.includes(query)) ||
        thread?.author?.name?.toLowerCase()?.includes(query)
      );
    }

    // Apply subject filter
    if (filters?.subject !== 'all') {
      filtered = filtered?.filter(thread => thread?.subject === filters?.subject);
    }

    // Apply type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(thread => thread?.type === filters?.type);
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      if (filters?.status === 'solved') {
        filtered = filtered?.filter(thread => thread?.isSolved);
      } else if (filters?.status === 'unsolved') {
        filtered = filtered?.filter(thread => !thread?.isSolved && thread?.type === 'question');
      } else if (filters?.status === 'active') {
        filtered = filtered?.filter(thread => 
          new Date() - new Date(thread.lastActivity) < 24 * 60 * 60 * 1000
        );
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'popular':
          return b?.upvotes - a?.upvotes;
        case 'unanswered':
          return a?.replies - b?.replies;
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-replies':
          return b?.replies - a?.replies;
        case 'recent':
        default:
          return new Date(b.lastActivity) - new Date(a.lastActivity);
      }
    });

    setFilteredThreads(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sort: sortValue
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      subject: 'all',
      type: 'all',
      status: 'all',
      sort: 'recent'
    });
    setSearchQuery('');
  };

  const handleUpvote = (threadId) => {
    setThreads(prev => prev?.map(thread => {
      if (thread?.id === threadId) {
        return {
          ...thread,
          isUpvoted: !thread?.isUpvoted,
          upvotes: thread?.isUpvoted ? thread?.upvotes - 1 : thread?.upvotes + 1
        };
      }
      return thread;
    }));
  };

  const handleBookmark = (threadId) => {
    setThreads(prev => prev?.map(thread => {
      if (thread?.id === threadId) {
        return {
          ...thread,
          isBookmarked: !thread?.isBookmarked
        };
      }
      return thread;
    }));
  };

  const handleCreateThread = async (threadData) => {
    const newThread = {
      ...threadData,
      id: threads?.length + 1,
      upvotes: 0,
      replies: 0,
      views: 1,
      isUpvoted: false,
      isBookmarked: false,
      isSolved: false,
      lastActivity: new Date(),
      preview: threadData?.content?.substring(0, 150) + (threadData?.content?.length > 150 ? '...' : '')
    };

    setThreads(prev => [newThread, ...prev]);
  };

  const handleTopicClick = (topic) => {
    if (topic === 'all') {
      setSearchQuery('');
      setFilters(prev => ({ ...prev, subject: 'all' }));
    } else {
      setSearchQuery(topic);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <SubNavigationPanel />
        <div className="pt-32 md:pt-40 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading community forum...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <SubNavigationPanel />
      <main className="pt-32 md:pt-40 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Community Forum
              </h1>
              <p className="text-text-secondary">
                Connect, learn, and grow with fellow students worldwide
              </p>
            </div>
            <Button
              variant="default"
              iconName="Plus"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full lg:w-auto"
            >
              Create Thread
            </Button>
          </div>

          {/* Stats Overview */}
          <StatsOverview stats={mockStats} />

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              suggestions={searchSuggestions}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
                isExpanded={isFilterExpanded}
                onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'All Discussions'}
                  </h2>
                  <span className="text-sm text-text-secondary bg-muted px-2 py-1 rounded-full">
                    {filteredThreads?.length} threads
                  </span>
                </div>
              </div>

              {/* Thread List */}
              <div className="space-y-4">
                {filteredThreads?.length > 0 ? (
                  filteredThreads?.map(thread => (
                    <ThreadCard
                      key={thread?.id}
                      thread={thread}
                      onUpvote={handleUpvote}
                      onBookmark={handleBookmark}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      No threads found
                    </h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your search terms or filters
                    </p>
                    <Button
                      variant="outline"
                      iconName="RotateCcw"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <TrendingTopics
                topics={mockTrendingTopics}
                onTopicClick={handleTopicClick}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BookOpen"
                    onClick={() => navigate('/quiz-interface')}
                  >
                    Take a Quiz
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Bot"
                    onClick={() => navigate('/ai-tutor-chat')}
                  >
                    Ask AI Tutor
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BarChart3"
                    onClick={() => navigate('/progress-analytics')}
                  >
                    View Progress
                  </Button>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Community Guidelines
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Be respectful and constructive</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Search before posting duplicates</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Provide context and show your work</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Use appropriate tags and categories</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Create Thread Modal */}
      <CreateThreadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateThread}
      />
    </div>
  );
};

export default CommunityForum;