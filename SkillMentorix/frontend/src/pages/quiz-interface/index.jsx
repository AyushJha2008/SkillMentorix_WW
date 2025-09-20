import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import SubNavigationPanel from '../../components/ui/SubNavigationPanel';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import EmotionDetectionPanel from './components/EmotionDetectionPanel';
import QuizNavigation from './components/QuizNavigation';
import XPAnimation from './components/XPAnimation';
import QuizPauseModal from './components/QuizPauseModal';

const QuizInterface = () => {
  const navigate = useNavigate();
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [xpPoints, setXpPoints] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [isPaused, setIsPaused] = useState(false);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [xpAnimationPosition, setXpAnimationPosition] = useState({ x: 0, y: 0 });
  const [earnedXP, setEarnedXP] = useState(0);
  const [emotionDetectionEnabled, setEmotionDetectionEnabled] = useState(true);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  // Mock quiz data
  const quizData = {
    id: "react-fundamentals-001",
    title: "React Fundamentals Quiz",
    subject: "Web Development",
    totalQuestions: 15,
    timeLimit: 1800,
    questions: [
      {
        id: 1,
        text: "What is the primary purpose of React\'s Virtual DOM?",
        options: [
          "To replace the real DOM entirely",
          "To optimize rendering performance by minimizing direct DOM manipulation",
          "To store component state permanently",
          "To handle server-side rendering exclusively"
        ],
        correctAnswer: 1,
        explanation: "The Virtual DOM is a JavaScript representation of the real DOM that allows React to optimize updates by calculating the minimum changes needed before applying them to the actual DOM.",
        difficulty: "medium",
        points: 10
      },
      {
        id: 2,
        text: "Which hook is used to manage component state in functional components?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 1,
        explanation: "useState is the primary hook for managing local component state in functional components, returning the current state value and a setter function.",
        difficulty: "easy",
        points: 8
      },
      {
        id: 3,
        text: "What is the correct way to pass data from a parent component to a child component?",
        options: [
          "Using state variables",
          "Through props",
          "Using local storage",
          "Through context only"
        ],
        correctAnswer: 1,
        explanation: "Props (properties) are the standard way to pass data from parent to child components in React, creating a unidirectional data flow.",
        difficulty: "easy",
        points: 8
      },
      {
        id: 4,
        text: "When does the useEffect hook run by default?",
        options: [
          "Only on component mount",
          "Only on component unmount",
          "After every render (mount and update)",
          "Only when state changes"
        ],
        correctAnswer: 2,
        explanation: "By default, useEffect runs after every completed render, both after the initial mount and after every update, unless a dependency array is provided.",
        difficulty: "medium",
        points: 10
      },
      {
        id: 5,
        text: "What is the purpose of the key prop in React lists?",
        options: [
          "To style list items",
          "To help React identify which items have changed, been added, or removed",
          "To sort the list automatically",
          "To make list items clickable"
        ],
        correctAnswer: 1,
        explanation: "The key prop helps React identify which list items have changed, been added, or removed, enabling efficient re-rendering of lists.",
        difficulty: "medium",
        points: 10
      }
    ]
  };

  const currentQuestion = quizData?.questions?.[currentQuestionIndex];
  const selectedAnswer = selectedAnswers?.[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, timeRemaining]);

  // Adaptive difficulty adjustment based on performance
  useEffect(() => {
    const answeredQuestions = Object.keys(selectedAnswers)?.length;
    if (answeredQuestions >= 3) {
      const correctAnswers = Object.entries(selectedAnswers)?.filter(([index, answer]) => {
        const question = quizData?.questions?.[parseInt(index)];
        return question && answer === question?.correctAnswer;
      })?.length;
      
      const accuracy = correctAnswers / answeredQuestions;
      
      if (accuracy >= 0.8) {
        setDifficulty('hard');
      } else if (accuracy >= 0.6) {
        setDifficulty('medium');
      } else {
        setDifficulty('easy');
      }
    }
  }, [selectedAnswers]);

  const handleAnswerSelect = useCallback((answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));

    // Award XP for correct answers
    if (answerIndex === currentQuestion?.correctAnswer) {
      const points = currentQuestion?.points || 10;
      setEarnedXP(points);
      setXpPoints(prev => prev + points);
      
      // Trigger XP animation
      setXpAnimationPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setShowXPAnimation(true);
    }
  }, [currentQuestionIndex, currentQuestion]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizData?.questions?.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleExit = useCallback(() => {
    // Save progress to localStorage
    const progress = {
      quizId: quizData?.id,
      currentQuestion: currentQuestionIndex,
      answers: selectedAnswers,
      xpPoints,
      timeRemaining,
      timestamp: new Date()?.toISOString()
    };
    localStorage.setItem('quiz_progress', JSON.stringify(progress));
    navigate('/user-dashboard');
  }, [currentQuestionIndex, selectedAnswers, xpPoints, timeRemaining, navigate]);

  const handleSubmitQuiz = useCallback(() => {
    // Calculate final score
    const correctAnswers = Object.entries(selectedAnswers)?.filter(([index, answer]) => {
      const question = quizData?.questions?.[parseInt(index)];
      return question && answer === question?.correctAnswer;
    })?.length;

    const results = {
      quizId: quizData?.id,
      score: correctAnswers,
      totalQuestions: quizData?.questions?.length,
      xpEarned: xpPoints,
      timeSpent: quizData?.timeLimit - timeRemaining,
      answers: selectedAnswers,
      timestamp: new Date()?.toISOString()
    };

    // Save results to localStorage
    const existingResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    existingResults?.push(results);
    localStorage.setItem('quiz_results', JSON.stringify(existingResults));

    // Clear progress
    localStorage.removeItem('quiz_progress');

    // Navigate to results or dashboard
    navigate('/progress-analytics', { state: { quizResults: results } });
  }, [selectedAnswers, xpPoints, timeRemaining, navigate]);

  const handleEmotionDetected = useCallback((emotion) => {
    setCurrentEmotion(emotion);
    
    // Adjust difficulty based on emotion (mock implementation)
    if (emotion?.emotion === 'stressed' && emotion?.confidence > 0.7) {
      setDifficulty('easy');
    } else if (emotion?.emotion === 'confident' && emotion?.confidence > 0.8) {
      setDifficulty('hard');
    }
  }, []);

  const handleXPAnimationComplete = useCallback(() => {
    setShowXPAnimation(false);
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('quiz_progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress?.quizId === quizData?.id) {
        setCurrentQuestionIndex(progress?.currentQuestion);
        setSelectedAnswers(progress?.answers);
        setXpPoints(progress?.xpPoints);
        setTimeRemaining(progress?.timeRemaining);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation className="mt-16" />
      <SubNavigationPanel />
      <div className="pt-4 pb-20 md:pb-4">
        {/* Quiz Header */}
        <QuizHeader
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizData?.questions?.length}
          timeRemaining={timeRemaining}
          xpPoints={xpPoints}
          difficulty={difficulty}
          onPause={handlePause}
          onExit={handleExit}
        />

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3">
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Emotion Detection Panel */}
              <EmotionDetectionPanel
                isEnabled={emotionDetectionEnabled}
                onToggle={() => setEmotionDetectionEnabled(!emotionDetectionEnabled)}
                onEmotionDetected={handleEmotionDetected}
              />

              {/* Quiz Stats */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <h3 className="text-sm font-medium text-text-primary mb-3">Quiz Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Completed</span>
                    <span className="text-sm font-medium text-text-primary">
                      {Object.keys(selectedAnswers)?.length}/{quizData?.questions?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">XP Earned</span>
                    <span className="text-sm font-medium text-success">{xpPoints}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Difficulty</span>
                    <span className={`text-sm font-medium capitalize ${
                      difficulty === 'easy' ? 'text-success' :
                      difficulty === 'medium' ? 'text-warning' : 'text-error'
                    }`}>
                      {difficulty}
                    </span>
                  </div>
                  {currentEmotion && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">Emotion</span>
                      <span className="text-sm font-medium text-primary capitalize">
                        {currentEmotion?.emotion}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-surface border border-border rounded-xl p-4">
                <h3 className="text-sm font-medium text-text-primary mb-3">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Read questions carefully</li>
                  <li>• Take your time to think</li>
                  <li>• Use process of elimination</li>
                  <li>• Stay calm and focused</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Navigation */}
        <QuizNavigation
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizData?.questions?.length}
          selectedAnswer={selectedAnswer}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmitQuiz}
          isLastQuestion={currentQuestionIndex === quizData?.questions?.length - 1}
          disabled={isPaused}
        />
      </div>
      {/* XP Animation */}
      <XPAnimation
        show={showXPAnimation}
        points={earnedXP}
        position={xpAnimationPosition}
        onComplete={handleXPAnimationComplete}
      />
      {/* Pause Modal */}
      <QuizPauseModal
        isOpen={isPaused}
        onResume={handleResume}
        onExit={handleExit}
        timeRemaining={timeRemaining}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData?.questions?.length}
      />
    </div>
  );
};

export default QuizInterface;