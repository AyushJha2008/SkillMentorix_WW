import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const QuizHistoryTable = () => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const quizHistory = [
    {
      id: 1,
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      date: '2025-01-18',
      score: 95,
      totalQuestions: 20,
      correctAnswers: 19,
      timeSpent: 25,
      difficulty: 'Medium',
      xpEarned: 150
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      date: '2025-01-17',
      score: 88,
      totalQuestions: 15,
      correctAnswers: 13,
      timeSpent: 18,
      difficulty: 'Hard',
      xpEarned: 180
    },
    {
      id: 3,
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      date: '2025-01-16',
      score: 92,
      totalQuestions: 18,
      correctAnswers: 17,
      timeSpent: 22,
      difficulty: 'Medium',
      xpEarned: 160
    },
    {
      id: 4,
      title: 'Cell Structure',
      subject: 'Biology',
      date: '2025-01-15',
      score: 85,
      totalQuestions: 25,
      correctAnswers: 21,
      timeSpent: 30,
      difficulty: 'Easy',
      xpEarned: 120
    },
    {
      id: 5,
      title: 'Shakespeare\'s Sonnets',
      subject: 'English',
      date: '2025-01-14',
      score: 78,
      totalQuestions: 12,
      correctAnswers: 9,
      timeSpent: 15,
      difficulty: 'Hard',
      xpEarned: 140
    },
    {
      id: 6,
      title: 'World War II',
      subject: 'History',
      date: '2025-01-13',
      score: 90,
      totalQuestions: 20,
      correctAnswers: 18,
      timeSpent: 28,
      difficulty: 'Medium',
      xpEarned: 155
    },
    {
      id: 7,
      title: 'Climate Change',
      subject: 'Geography',
      date: '2025-01-12',
      score: 82,
      totalQuestions: 16,
      correctAnswers: 13,
      timeSpent: 20,
      difficulty: 'Medium',
      xpEarned: 130
    },
    {
      id: 8,
      title: 'Data Structures',
      subject: 'Computer Science',
      date: '2025-01-11',
      score: 96,
      totalQuestions: 22,
      correctAnswers: 21,
      timeSpent: 35,
      difficulty: 'Hard',
      xpEarned: 200
    }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'English', label: 'English' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Computer Science', label: 'Computer Science' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-primary';
    return 'text-error';
  };

  const filteredData = quizHistory?.filter(quiz => {
      const matchesSubject = filterSubject === 'all' || quiz?.subject === filterSubject;
      const matchesSearch = quiz?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           quiz?.subject?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      return matchesSubject && matchesSearch;
    })?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Title', 'Subject', 'Date', 'Score', 'Questions', 'Correct', 'Time (min)', 'Difficulty', 'XP'],
      ...filteredData?.map(quiz => [
        quiz?.title,
        quiz?.subject,
        quiz?.date,
        quiz?.score,
        quiz?.totalQuestions,
        quiz?.correctAnswers,
        quiz?.timeSpent,
        quiz?.difficulty,
        quiz?.xpEarned
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-history.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-educational">
      {/* Header and Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Quiz History</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
          
          <Select
            options={subjectOptions}
            value={filterSubject}
            onChange={setFilterSubject}
            placeholder="Filter by subject"
            className="w-full"
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-educational"
                >
                  <span>Quiz Title</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-educational"
                >
                  <span>Subject</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-educational"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-educational"
                >
                  <span>Score</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Questions</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Time</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Difficulty</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">XP</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((quiz) => (
              <tr key={quiz?.id} className="border-b border-border hover:bg-muted/50 transition-educational">
                <td className="p-4">
                  <div className="font-medium text-text-primary">{quiz?.title}</div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{quiz?.subject}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {new Date(quiz.date)?.toLocaleDateString()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-sm font-medium ${getScoreColor(quiz?.score)}`}>
                    {quiz?.score}%
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {quiz?.correctAnswers}/{quiz?.totalQuestions}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{quiz?.timeSpent}m</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quiz?.difficulty)}`}>
                    {quiz?.difficulty}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{quiz?.xpEarned}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData?.length)} of {filteredData?.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryTable;