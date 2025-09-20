import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ThreadSearch = ({ onSearch, totalReplies = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock search function
  const performSearch = async (query) => {
    if (!query?.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          type: 'reply',
          author: 'Sarah Chen',
          content: `This is exactly what I was looking for! The **${query}** implementation works perfectly...`,
          timestamp: new Date(Date.now() - 3600000),
          upvotes: 12
        },
        {
          id: 2,
          type: 'reply',
          author: 'Mike Rodriguez',
          content: `I had the same issue with **${query}**. Here's how I solved it using a different approach...`,
          timestamp: new Date(Date.now() - 7200000),
          upvotes: 8
        },
        {
          id: 3,
          type: 'original',author: 'Alex Thompson',
          content: `The main question about **${query}** is still relevant. Has anyone found a better solution?`,
          timestamp: new Date(Date.now() - 86400000),
          upvotes: 15
        }
      ];
      
      setSearchResults(mockResults);
      setShowResults(true);
      setIsSearching(false);
    }, 500);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleResultClick = (result) => {
    onSearch(result);
    setShowResults(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text?.replace(regex, '<mark class="bg-warning/30 text-text-primary">$1</mark>');
  };

  return (
    <div className="relative mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder={`Search in this thread (${totalReplies} replies)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10"
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setShowResults(false);
            }}
            className="text-text-secondary hover:text-text-primary"
          >
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Search Stats */}
        {searchQuery && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>
                {isSearching ? 'Searching...' : `${searchResults?.length} results found`}
              </span>
              <div className="flex items-center space-x-4">
                <span>in {totalReplies} replies</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Filter"
                  className="text-text-secondary"
                >
                  Filter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Search Results Dropdown */}
      {showResults && searchResults?.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowResults(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-educational-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-semibold text-text-secondary px-3 py-2 border-b border-border">
                Search Results
              </div>
              
              {searchResults?.map((result) => (
                <button
                  key={result?.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-accent rounded-lg transition-educational"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary">
                        {result?.author}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        result?.type === 'original' ?'bg-primary/10 text-primary' :'bg-muted text-text-secondary'
                      }`}>
                        {result?.type === 'original' ? 'Original Post' : 'Reply'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="ChevronUp" size={12} />
                      <span>{result?.upvotes}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(result?.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p
                    className="text-sm text-text-secondary line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(result?.content, searchQuery)
                    }}
                  />
                </button>
              ))}
            </div>
            
            <div className="border-t border-border p-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResults(false)}
                iconName="ExternalLink"
                iconPosition="right"
                className="w-full justify-center text-text-secondary"
              >
                View All Results
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThreadSearch;