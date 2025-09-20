import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import SubNavigationPanel from '../../components/ui/SubNavigationPanel';
import ChatMessage from './components/ChatMessage';
import QuickActionButtons from './components/QuickActionButtons';
import ChatInput from './components/ChatInput';
import ChatHistory from './components/ChatHistory';
import ConversationHeader from './components/ConversationHeader';
import WelcomeScreen from './components/WelcomeScreen';
import Icon from '../../components/AppIcon';

const AITutorChat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [bookmarkedConversations, setBookmarkedConversations] = useState(new Set());
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 'conv-1',
      title: 'Calculus Integration Help',
      lastMessage: 'Thanks for explaining the substitution method!',
      updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      subjects: ['Mathematics', 'Calculus'],
      context: 'Working on integration problems from Chapter 7'
    },
    {
      id: 'conv-2',
      title: 'Chemistry Molecular Bonds',
      lastMessage: 'Can you explain ionic vs covalent bonds?',
      updatedAt: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 1,
      subjects: ['Chemistry'],
      context: 'Preparing for chemistry midterm exam'
    },
    {
      id: 'conv-3',
      title: 'World War II History',
      lastMessage: 'What were the main causes of WWII?',
      updatedAt: new Date(Date.now() - 86400000), // 1 day ago
      unreadCount: 0,
      subjects: ['History'],
      context: 'Research project on 20th century conflicts'
    }
  ];

  // Mock messages for different conversations
  const mockMessages = {
    'conv-1': [
      {
        id: 'msg-1',
        content: "Hi! I\'m struggling with integration by substitution. Can you help me understand when to use it?",
        isUser: true,
        timestamp: new Date(Date.now() - 3600000),
        attachments: []
      },
      {
        id: 'msg-2',
        content: `I'd be happy to help you with integration by substitution! This is a powerful technique used when you have a composite function.\n\n**When to use substitution:**\n1. When you see a function and its derivative (or a constant multiple)\n2. When you have nested functions like sin(2x), e^(3x+1), etc.\n3. When direct integration seems difficult\n\n**Basic steps:**\n1. Choose u = inner function\n2. Find du = derivative of u\n3. Substitute and integrate\n4. Substitute back\n\n**Example:**\n$$∫ 2x(x² + 1)³ dx$$\n\nLet u = x² + 1, then du = 2x dx\n\nThe integral becomes: $$∫ u³ du = \\frac{u⁴}{4} + C = \\frac{(x² + 1)⁴}{4} + C$$\n\nWould you like me to work through another example?`,
        isUser: false,
        timestamp: new Date(Date.now() - 3580000),
        attachments: []
      },
      {
        id: 'msg-3',
        content: "That's really helpful! Can you show me how to handle ∫ sin(3x) dx?",
        isUser: true,
        timestamp: new Date(Date.now() - 3560000),
        attachments: []
      },
      {
        id: 'msg-4',
        content: `Great question! Let's solve ∫ sin(3x) dx using substitution.\n\n**Step-by-step solution:**\n\n1. **Identify the substitution:** u = 3x\n2. **Find du:** du = 3 dx, so dx = du/3\n3. **Substitute:** ∫ sin(3x) dx = ∫ sin(u) · (du/3) = (1/3) ∫ sin(u) du\n4. **Integrate:** (1/3) ∫ sin(u) du = (1/3)(-cos(u)) + C = -(1/3)cos(u) + C\n5. **Substitute back:** -(1/3)cos(3x) + C\n\n**Final answer:** ∫ sin(3x) dx = -(1/3)cos(3x) + C\n\n**Key insight:** When you have sin(ax) or cos(ax), the antiderivative will have a factor of 1/a.\n\nTry this pattern with ∫ cos(5x) dx - what do you think the answer would be?`,
        isUser: false,
        timestamp: new Date(Date.now() - 3540000),
        attachments: []
      }
    ],
    'conv-2': [
      {
        id: 'msg-5',
        content: "Can you explain the difference between ionic and covalent bonds?",
        isUser: true,
        timestamp: new Date(Date.now() - 7200000),
        attachments: []
      },
      {
        id: 'msg-6',
        content: `Excellent question! Let me break down the key differences between ionic and covalent bonds:\n\n**IONIC BONDS:**\n• Form between metals and non-metals\n• Complete transfer of electrons\n• Creates charged ions (cations + anions)\n• Strong electrostatic attraction\n• Examples: NaCl, MgO, CaF₂\n\n**COVALENT BONDS:**\n• Form between non-metals\n• Sharing of electron pairs\n• No charged ions formed\n• Directional bonds\n• Examples: H₂O, CO₂, CH₄\n\n**Key Properties Comparison:**\n\n| Property | Ionic | Covalent |\n|----------|-------|----------|\n| Conductivity | Conducts when dissolved | Usually doesn't conduct |\n| Melting Point | Generally high | Variable (usually lower) |\n| Solubility | Often water-soluble | Often insoluble in water |\n| State at room temp | Usually solid | Can be gas, liquid, or solid |\n\nWould you like me to explain how to predict which type of bond will form between specific elements?`,
        isUser: false,
        timestamp: new Date(Date.now() - 7180000),
        attachments: []
      }
    ]
  };

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    if (currentConversationId && mockMessages?.[currentConversationId]) {
      setMessages(mockMessages?.[currentConversationId]);
    } else {
      setMessages([]);
    }
  }, [currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageContent) => {
    if (!messageContent?.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
      attachments: []
    };

    // If no conversation is active, create a new one
    if (!currentConversationId) {
      const newConversationId = `conv-${Date.now()}`;
      const newConversation = {
        id: newConversationId,
        title: messageContent?.length > 50 ? messageContent?.substring(0, 50) + '...' : messageContent,
        lastMessage: messageContent,
        updatedAt: new Date(),
        unreadCount: 0,
        subjects: ['General'],
        context: 'New conversation started'
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(newConversationId);
      setMessages([userMessage]);
    } else {
      setMessages(prev => [...prev, userMessage]);
    }

    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageContent);
      const aiMessage = {
        id: `msg-${Date.now()}-ai`,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        attachments: []
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Update conversation last message
      setConversations(prev => 
        prev?.map(conv => 
          conv?.id === currentConversationId 
            ? { ...conv, lastMessage: aiResponse?.substring(0, 100) + '...', updatedAt: new Date() }
            : conv
        )
      );
    }, 1500 + Math.random() * 2000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = [
      `I understand you're asking about "${userMessage?.substring(0, 50)}...". Let me help you with that!\n\nThis is a great question that many students struggle with. Let me break it down step by step:\n\n1. **First, let's understand the basics**\n2. **Then we'll look at some examples**\n3. **Finally, I'll give you some practice problems**\n\nWould you like me to elaborate on any of these points?`,
      
      `That's an excellent question! Let me provide you with a comprehensive explanation.\n\n**Key Concepts:**\n• Understanding the fundamental principles\n• Applying the concepts to real-world scenarios\n• Common mistakes to avoid\n\n**Example:**\nLet me show you how this works with a practical example...\n\n\`\`\`\n// Here's a simple code example\nfunction example() {\n  return "This demonstrates the concept";\n}\n\`\`\`\n\nDoes this help clarify things? Feel free to ask follow-up questions!`,
      
      `Great question! This topic is fundamental to understanding the broader subject.\n\n**Let me explain this concept:**\n\nThe main idea here is that we need to approach this systematically. Think of it like building blocks - each concept builds on the previous one.\n\n**Mathematical representation:**\n$$f(x) = ax^2 + bx + c$$\n\nThis formula shows the relationship between the variables.\n\n**Practical applications:**\n1. Real-world problem solving\n2. Academic applications\n3. Future learning connections\n\nWould you like me to create some practice problems for you?`
    ];
    
    return responses?.[Math.floor(Math.random() * responses?.length)];
  };

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
  };

  const handleBookmark = () => {
    if (currentConversationId) {
      setBookmarkedConversations(prev => {
        const newSet = new Set(prev);
        if (newSet?.has(currentConversationId)) {
          newSet?.delete(currentConversationId);
        } else {
          newSet?.add(currentConversationId);
        }
        return newSet;
      });
    }
  };

  const handleShare = () => {
    // Share functionality handled in ConversationHeader
  };

  const handleClearChat = () => {
    setMessages([]);
    if (currentConversationId) {
      setConversations(prev => prev?.filter(conv => conv?.id !== currentConversationId));
      setCurrentConversationId(null);
    }
  };

  const handleExportChat = () => {
    if (messages?.length === 0) return;
    
    const chatContent = messages?.map(msg => 
      `${msg?.isUser ? 'You' : 'AI Tutor'} (${new Date(msg.timestamp)?.toLocaleString()}):\n${msg?.content}\n\n`
    )?.join('');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-tutor-chat-${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentConversation = conversations?.find(conv => conv?.id === currentConversationId);
  const isBookmarked = bookmarkedConversations?.has(currentConversationId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <SubNavigationPanel />
      <div className="pt-32 md:pt-36 pb-20 md:pb-4">
        <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)]">
          {/* Chat History Sidebar */}
          <ChatHistory
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            currentConversationId={currentConversationId}
          />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversationId ? (
              <>
                {/* Conversation Header */}
                <ConversationHeader
                  conversation={currentConversation}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  onClearChat={handleClearChat}
                  onExportChat={handleExportChat}
                  isBookmarked={isBookmarked}
                />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      isUser={message?.isUser}
                      timestamp={message?.timestamp}
                    />
                  ))}
                  
                  {isTyping && (
                    <ChatMessage 
                      message={{ content: '', id: 'typing' }}
                      isUser={false}
                      timestamp={new Date()}
                      isTyping={true} 
                    />
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages?.length > 0 && (
                  <div className="px-4">
                    <QuickActionButtons
                      onQuickAction={handleQuickAction}
                      disabled={isTyping}
                    />
                  </div>
                )}

                {/* Chat Input */}
                <ChatInput
                  onSendMessage={handleSendMessage}
                 
                  isTyping={isTyping}
                />
              </>
            ) : (
              /* Welcome Screen */
              (<WelcomeScreen
                onStartChat={handleNewChat}
                onQuickAction={handleQuickAction}
              />)
            )}
          </div>
        </div>
      </div>
      {/* Mobile Chat History Button */}
      <div className="lg:hidden fixed bottom-24 right-4 z-50">
        <button
          onClick={() => {
            // Toggle mobile chat history modal
            // This would open a modal with chat history on mobile
          }}
          className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-educational-lg flex items-center justify-center"
        >
          <Icon name="MessageSquare" size={20} />
        </button>
      </div>
    </div>
  );
};

export default AITutorChat;