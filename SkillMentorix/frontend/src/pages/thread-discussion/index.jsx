import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import SubNavigationPanel from '../../components/ui/SubNavigationPanel';
import ThreadHeader from './components/ThreadHeader';
import ThreadContent from './components/ThreadContent';
import ThreadSearch from './components/ThreadSearch';
import ReplyCard from './components/ReplyCard';
import ReplyEditor from './components/ReplyEditor';

const ThreadDiscussion = () => {
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock thread data
  useEffect(() => {
    const mockThread = {
      id: 1,
      title: "How to implement efficient sorting algorithms in JavaScript?",
      content: `I'm working on a project where I need to sort large datasets efficiently. I've been using the built-in Array.sort() method, but I'm curious about implementing custom sorting algorithms for better performance.\n\n**My current approach:**\n\`\`\`javascript\nconst data = [64, 34, 25, 12, 22, 11, 90];\ndata.sort((a, b) => a - b);\nconsole.log(data);\n\`\`\`\n\n**Questions:**\n1. Which sorting algorithm would be best for datasets with 10,000+ items?\n2. How does JavaScript's built-in sort compare to custom implementations?\n3. Are there any specific use cases where custom sorting is significantly better?\n\nI've heard about QuickSort, MergeSort, and HeapSort, but I'm not sure which one to choose for my specific use case. Any insights would be greatly appreciated!\n\n**Additional Context:**\n- Working with numerical data primarily\n- Performance is critical\n- Memory usage should be optimized\n- Need to maintain stability in some cases`,
      author: {
        id: 1,
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reputation: 2847,
        isOnline: true,
        badges: [
          { type: 'expert', icon: '⭐' },
          { type: 'contributor', icon: '🏆' }
        ]
      },
      tags: ["javascript", "algorithms", "sorting", "performance", "data-structures"],
      createdAt: new Date(Date.now() - 86400000),
      upvotes: 24,
      views: 156,
      isUpvoted: false,
      isBookmarked: false,
      isFollowing: true,
      isSolved: false,
      attachments: [
        {
          id: 1,
          name: "sorting_benchmark.js",
          size: "2.3 KB",
          type: "file",
          url: "#"
        },
        {
          id: 2,
          name: "performance_chart.png",
          size: "45.7 KB",
          type: "image",
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        }
      ],
      replies: [
        {
          id: 1,
          content: `Great question! For datasets with 10,000+ items, I'd recommend **MergeSort** for most cases. Here's why:\n\n**MergeSort advantages:**\n- Guaranteed O(n log n) time complexity\n- Stable sorting (maintains relative order of equal elements)\n- Predictable performance\n\n**Implementation example:**\n\`\`\`javascript\nfunction mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  \n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  \n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) {\n      result.push(left[i++]);\n    } else {\n      result.push(right[j++]);\n    }\n  }\n  \n  return result.concat(left.slice(i)).concat(right.slice(j));\n}\n\`\`\`\n\nRegarding JavaScript's built-in sort: it's actually quite optimized (uses TimSort in V8), but custom implementations can be better for specific use cases.`,
          author: {
            id: 2,
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            reputation: 4521,
            isOnline: true,
            badges: [
              { type: 'expert', icon: '⭐' },
              { type: 'moderator', icon: '🛡️' }
            ]
          },
          createdAt: new Date(Date.now() - 3600000),
          upvotes: 18,
          isUpvoted: true,
          isSolution: true,
          isEdited: false,
          hasCode: true,
          replies: [
            {
              id: 4,
              content: "Thanks for the detailed explanation! The MergeSort implementation looks clean. Have you benchmarked this against the native sort() method?",
              author: {
                id: 1,
                name: "Alex Thompson",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                reputation: 2847,
                isOnline: true,
                badges: [
                  { type: 'expert', icon: '⭐' }
                ]
              },
              createdAt: new Date(Date.now() - 1800000),
              upvotes: 3,
              isUpvoted: false,
              isSolution: false,
              isEdited: false,
              hasCode: false,
              replies: []
            }
          ]
        },
        {
          id: 2,
          content: `I'd like to add that **QuickSort** can be faster in practice for random data, but it has worst-case O(n²) complexity. Here's a hybrid approach I use:\n\n\`\`\`javascript\nfunction hybridSort(arr, threshold = 10) {\n  if (arr.length <= threshold) {\n    return insertionSort(arr); // Better for small arrays\n  }\n  return quickSort(arr);\n}\n\`\`\`\n\nFor your specific use case with numerical data, you might also consider **Radix Sort** if you're dealing with integers - it can achieve O(n) time complexity!`,
          author: {
            id: 3,
            name: "Mike Rodriguez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            reputation: 1923,
            isOnline: false,
            badges: [
              { type: 'contributor', icon: '🏆' }
            ]
          },
          createdAt: new Date(Date.now() - 7200000),
          upvotes: 12,
          isUpvoted: false,
          isSolution: false,
          isEdited: true,
          hasCode: true,
          replies: []
        },
        {
          id: 3,
          content: `Don't forget about **HeapSort**! It's often overlooked but has some great properties:\n\n- O(n log n) guaranteed (like MergeSort)\n- In-place sorting (O(1) space complexity)\n- Not stable, but that might not matter for your use case\n\nIt's particularly good when memory is a constraint. The built-in JavaScript sort is actually very well optimized - it uses different algorithms based on array size and data patterns.`,
          author: {
            id: 4,
            name: "Emma Wilson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            reputation: 3156,
            isOnline: true,
            badges: [
              { type: 'expert', icon: '⭐' }
            ]
          },
          createdAt: new Date(Date.now() - 10800000),
          upvotes: 8,
          isUpvoted: false,
          isSolution: false,
          isEdited: false,
          hasCode: false,
          replies: []
        }
      ]
    };

    setTimeout(() => {
      setThread(mockThread);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpvote = (id) => {
    if (id === thread?.id) {
      setThread(prev => ({
        ...prev,
        upvotes: prev?.isUpvoted ? prev?.upvotes - 1 : prev?.upvotes + 1,
        isUpvoted: !prev?.isUpvoted
      }));
    } else {
      // Handle reply upvote
      const updateReplies = (replies) => {
        return replies?.map(reply => {
          if (reply?.id === id) {
            return {
              ...reply,
              upvotes: reply?.isUpvoted ? reply?.upvotes - 1 : reply?.upvotes + 1,
              isUpvoted: !reply?.isUpvoted
            };
          }
          if (reply?.replies) {
            return { ...reply, replies: updateReplies(reply?.replies) };
          }
          return reply;
        });
      };
      
      setThread(prev => ({
        ...prev,
        replies: updateReplies(prev?.replies)
      }));
    }
  };

  const handleBookmark = (id) => {
    setThread(prev => ({
      ...prev,
      isBookmarked: !prev?.isBookmarked
    }));
  };

  const handleFollow = (id) => {
    setThread(prev => ({
      ...prev,
      isFollowing: !prev?.isFollowing
    }));
  };

  const handleReport = (id) => {
    alert('Report functionality would be implemented here');
  };

  const handleReply = async (parentId, content) => {
    const newReply = {
      id: Date.now(),
      content: content,
      author: {
        id: 999,
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        reputation: 156,
        isOnline: true,
        badges: []
      },
      createdAt: new Date(),
      upvotes: 0,
      isUpvoted: false,
      isSolution: false,
      isEdited: false,
      hasCode: content?.includes('```'),
      replies: []
    };

    if (parentId === 0) {
      // Top-level reply
      setThread(prev => ({
        ...prev,
        replies: [...prev?.replies, newReply]
      }));
    } else {
      // Nested reply
      const updateReplies = (replies) => {
        return replies?.map(reply => {
          if (reply?.id === parentId) {
            return {
              ...reply,
              replies: [...reply?.replies, newReply]
            };
          }
          if (reply?.replies) {
            return { ...reply, replies: updateReplies(reply?.replies) };
          }
          return reply;
        });
      };
      
      setThread(prev => ({
        ...prev,
        replies: updateReplies(prev?.replies)
      }));
    }
  };

  const handleMarkSolution = (replyId) => {
    const updateReplies = (replies) => {
      return replies?.map(reply => {
        const isSolution = reply?.id === replyId;
        const updatedReply = { ...reply, isSolution };
        
        if (reply?.replies) {
          updatedReply.replies = updateReplies(reply?.replies);
        }
        
        return updatedReply;
      });
    };
    
    setThread(prev => ({
      ...prev,
      isSolved: true,
      replies: updateReplies(prev?.replies)
    }));
  };

  const handleSearch = (result) => {
    // Scroll to search result
    console.log('Navigating to search result:', result);
  };

  const handleNewReply = async (content, attachments) => {
    await handleReply(0, content);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <SubNavigationPanel />
        
        <div className="pt-32 md:pt-24 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
              <span className="ml-3 text-text-secondary">Loading discussion...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TabNavigation />
        <SubNavigationPanel />
        
        <div className="pt-32 md:pt-24 pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Thread Not Found</h2>
              <p className="text-text-secondary">The discussion thread you're looking for doesn't exist.</p>
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
      <div className="pt-32 md:pt-24 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Thread Header */}
          <ThreadHeader
            thread={thread}
            onUpvote={handleUpvote}
            onBookmark={handleBookmark}
            onFollow={handleFollow}
            onReport={handleReport}
          />

          {/* Thread Content */}
          <ThreadContent
            content={thread?.content}
            attachments={thread?.attachments}
          />

          {/* Search in Thread */}
          <ThreadSearch
            onSearch={handleSearch}
            totalReplies={thread?.replies?.length}
          />

          {/* Replies Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {thread?.replies?.length} {thread?.replies?.length === 1 ? 'Reply' : 'Replies'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span>Sort by:</span>
                <select className="bg-surface border border-border rounded px-2 py-1 text-text-primary">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="most-upvoted">Most Upvoted</option>
                </select>
              </div>
            </div>

            {/* Reply Cards */}
            <div className="space-y-4">
              {thread?.replies?.map((reply) => (
                <ReplyCard
                  key={reply?.id}
                  reply={reply}
                  level={0}
                  onUpvote={handleUpvote}
                  onReply={handleReply}
                  onMarkSolution={handleMarkSolution}
                  canMarkSolution={thread?.author?.id === 999 && !thread?.isSolved}
                />
              ))}
            </div>
          </div>

          {/* Reply Editor */}
          <ReplyEditor
            onSubmit={handleNewReply}
            placeholder="Share your knowledge and help the community..."
          />
        </div>
      </div>
    </div>
  );
};

export default ThreadDiscussion;