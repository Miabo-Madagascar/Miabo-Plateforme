import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Users, Phone, Video, MoreHorizontal, ChevronLeft, UserPlus } from 'lucide-react';
import { useUser } from '../context/UserContext';
import MessagePreview from '../components/dashboard/MessagePreview';
import { useMessageStore } from '../stores/messageStore';
import { supabase } from '../lib/supabase';

const MessagingPage: React.FC = () => {
  const { user } = useUser();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

  const {
    messages,
    conversations,
    currentConversation,
    isLoading,
    error,
    fetchMessages,
    sendMessage,
    markAsRead,
    setCurrentConversation,
    subscribeToMessages
  } = useMessageStore();

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Subscribe to messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation);
    }
  }, [currentConversation]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversation) return;

    try {
      await sendMessage(messageInput, currentConversation);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle between conversations list and active conversation on mobile
  const toggleMobileView = () => {
    setShowConversations(!showConversations);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error-600">
        Une erreur est survenue : {error}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Messagerie
        </h1>
        <p className="text-gray-600">
          Communiquez avec vos tuteurs et élèves.
        </p>
      </div>

      {/* Messaging app */}
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Conversations sidebar */}
        {(!isMobileView || showConversations) && (
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conversation => {
                const otherParticipant = conversation.participants.find(p => p.id !== user?.id) || conversation.participants[0];
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                const unreadMessages = conversation.messages.filter(
                  m => m.senderId !== user?.id && !m.read
                ).length;
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setCurrentConversation(conversation.id);
                      if (isMobileView) {
                        toggleMobileView();
                      }
                    }}
                  >
                    <MessagePreview
                      message={{
                        id: lastMessage.id,
                        sender: otherParticipant,
                        content: lastMessage.content,
                        timestamp: lastMessage.timestamp,
                        read: lastMessage.read || lastMessage.senderId === user?.id,
                      }}
                      onClick={() => {
                        setCurrentConversation(conversation.id);
                        if (isMobileView) {
                          toggleMobileView();
                        }
                      }}
                      isActive={conversation.id === currentConversation?.id}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button className="btn btn-primary w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Nouvelle conversation
              </button>
            </div>
          </div>
        )}
        
        {/* Chat area */}
        {(!isMobileView || !showConversations) && (
          currentConversation ? (
            <div className="flex-1 flex flex-col h-full">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  {isMobileView && (
                    <button 
                      onClick={toggleMobileView}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  )}
                  <img 
                    src={currentConversation.participants.find(p => p.id !== user?.id)?.avatar} 
                    alt={currentConversation.participants.find(p => p.id !== user?.id)?.name}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium">
                      {currentConversation.participants.find(p => p.id !== user?.id)?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation.participants.find(p => p.id !== user?.id)?.role === 'tutor' ? 'Tuteur' : 
                       currentConversation.participants.find(p => p.id !== user?.id)?.role === 'student' ? 'Élève' : 'Parent'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    const isMe = message.senderId === user?.id;
                    return (
                      <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end max-w-3/4">
                          {!isMe && (
                            <img 
                              src={currentConversation.participants.find(p => p.id === message.senderId)?.avatar}
                              alt={currentConversation.participants.find(p => p.id === message.senderId)?.name}
                              className="h-8 w-8 rounded-full object-cover mr-2 mb-1"
                            />
                          )}
                          <div 
                            className={`px-4 py-3 rounded-lg ${
                              isMe 
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <div className={`text-xs mt-1 ${isMe ? 'text-primary-100' : 'text-gray-500'}`}>
                              {new Intl.DateTimeFormat('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              }).format(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Écrivez votre message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none h-10 min-h-10 max-h-32"
                      style={{ lineHeight: '1.5', paddingTop: '0.375rem' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-full ${
                      messageInput.trim()
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune conversation sélectionnée</h3>
                <p className="mt-1 text-gray-500">
                  Sélectionnez une conversation ou démarrez-en une nouvelle.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MessagingPage;