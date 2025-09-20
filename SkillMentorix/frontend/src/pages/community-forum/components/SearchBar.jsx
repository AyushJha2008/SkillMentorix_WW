import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, suggestions = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setLocalQuery(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef?.current && !containerRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    setShowSuggestions(value?.length > 0 && suggestions?.length > 0);
    
    // Debounced search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(localQuery);
    setShowSuggestions(false);
    inputRef?.current?.blur();
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (localQuery?.length > 0 && suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
    setShowSuggestions(false);
    inputRef?.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-200 ${isExpanded ? 'scale-105' : ''}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={20} className="text-text-secondary" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder="Search discussions, questions, and topics..."
            className="w-full pl-10 pr-20 py-3 bg-input border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-educational"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
            {localQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={handleClear}
                className="h-8 w-8 p-0"
              />
            )}
            <Button
              type="submit"
              variant="default"
              size="sm"
              iconName="Search"
              className="h-8"
            />
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-educational-lg z-50 max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-text-secondary mb-2 px-2">
              Suggestions
            </div>
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-educational flex items-center space-x-2"
              >
                <Icon name="Search" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-primary">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Popular Searches */}
      {isExpanded && !showSuggestions && localQuery?.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-educational-lg z-50">
          <div className="p-4">
            <div className="text-xs font-medium text-text-secondary mb-3">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'calculus help',
                'physics problems',
                'programming basics',
                'study tips',
                'exam preparation',
                'chemistry equations'
              ]?.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(term)}
                  className="px-3 py-1 bg-muted text-text-secondary rounded-full text-sm hover:bg-accent hover:text-text-primary transition-educational"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;