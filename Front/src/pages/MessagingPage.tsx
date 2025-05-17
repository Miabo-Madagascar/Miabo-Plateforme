import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Send, Paperclip, Phone, Video, MoreHorizontal, 
  ChevronLeft, UserPlus, Smile, Image, Trash2, MessageSquare
} from 'lucide-react';
import { useMessageStore } from '../stores/messageStore';

const MessagingPage: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    conversations,
    currentConversation,
    searchTerm,
    sendMessage,
    setCurrentConversation,
    searchConversations,
    deleteMessage,
    addReaction,
    setTyping,
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  // Handle typing indicator
  useEffect(() => {
    if (messageInput && !isTyping) {
      setIsTyping(true);
      setTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        setTyping(false);
      }
    }, 2000);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [messageInput, isTyping, setTyping]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversation) return;

    try {
      await sendMessage(messageInput);
      setMessageInput('');
      setShowEmojiPicker(false);
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

  // Format timestamp
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(messageDate);
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
      }).format(messageDate);
    } else {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
      }).format(messageDate);
    }
  };

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(p => p.id !== '1');
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Messagerie
        </h1>
        <p className="text-gray-600">
          Communiquez avec vos tuteurs et élèves
        </p>
      </div>

      {/* Messaging interface */}
      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex">
        {/* Conversations sidebar */}
        {(!isMobileView || showConversations) && (
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchTerm}
                  onChange={(e) => searchConversations(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map(conversation => {
                const otherParticipant = conversation.participants.find(p => p.id !== '1');
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                const unreadCount = conversation.messages.filter(m => !m.read && m.senderId !== '1').length;

                return (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setCurrentConversation(conversation.id);
                      if (isMobileView) {
                        toggleMobileView();
                      }
                    }}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                      currentConversation?.id === conversation.id
                        ? 'bg-primary-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={otherParticipant?.avatar}
                          alt={otherParticipant?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {otherParticipant?.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium text-gray-900 truncate">
                            {otherParticipant?.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          {lastMessage.type === 'image' ? (
                            <span className="text-sm text-gray-500 flex items-center">
                              <Image className="h-4 w-4 mr-1" />
                              Photo
                            </span>
                          ) : (
                            <p className="text-sm text-gray-600 truncate">
                              {lastMessage.content}
                            </p>
                          )}
                          
                          {unreadCount > 0 && (
                            <span className="ml-2 bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </div>

                        {conversation.lastTyping && (
                          <p className="text-xs text-primary-600 mt-1">
                            En train d'écrire...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* New conversation button */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <UserPlus className="h-5 w-5 mr-2" />
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
                      className="mr-3 text-gray-500 hover:text-gray-700"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                  )}
                  
                  <div className="relative">
                    <img
                      src={currentConversation.participants.find(p => p.id !== '1')?.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {currentConversation.participants.find(p => p.id !== '1')?.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">
                      {currentConversation.participants.find(p => p.id !== '1')?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {currentConversation.participants.find(p => p.id !== '1')?.online
                        ? 'En ligne'
                        : 'Hors ligne'}
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((message, index) => {
                  const isMe = message.senderId === '1';
                  const showAvatar = index === 0 || 
                    currentConversation.messages[index - 1].senderId !== message.senderId;

                  return (
                    <div
                      key={message.id}
                      className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && showAvatar && (
                        <img
                          src={currentConversation.participants.find(p => p.id === message.senderId)?.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                      )}
                      
                      <div className={`max-w-[70%] ${!isMe && !showAvatar ? 'ml-10' : ''}`}>
                        <div
                          className={`relative group rounded-lg px-4 py-2 ${
                            isMe
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.type === 'image' ? (
                            <img
                              src={message.content}
                              alt="Shared image"
                              className="rounded-lg max-w-sm"
                            />
                          ) : (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          )}

                          {/* Message actions */}
                          <div className={`absolute ${isMe ? 'left-0' : 'right-0'} -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:flex items-center space-x-1`}>
                            <button
                              onClick={() => addReaction(message.id, '👍')}
                              className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50"
                            >
                              👍
                            </button>
                            <button
                              onClick={() => addReaction(message.id, '❤️')}
                              className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50"
                            >
                              ❤️
                            </button>
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="p-1 bg-white rounded-full shadow-lg hover:bg-gray-50 text-error-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex mt-1 space-x-1">
                            {message.reactions.map((reaction, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-full shadow-sm px-2 py-0.5 text-sm flex items-center space-x-1"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-gray-500 text-xs">
                                  {reaction.users.length}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Message info */}
                        <div className={`flex items-center mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(message.timestamp)}
                          </span>
                          {isMe && (
                            <span className="ml-1">
                              {message.status === 'sent' && '✓'}
                              {message.status === 'delivered' && '✓✓'}
                              {message.status === 'read' && (
                                <span className="text-primary-500">✓✓</span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Écrivez votre message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      style={{ maxHeight: '120px' }}
                      rows={1}
                    />
                    
                    <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <Image className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-lg ${
                      messageInput.trim()
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Sélectionnez une conversation
                </h3>
                <p className="mt-1 text-gray-500">
                  Choisissez une conversation dans la liste ou démarrez-en une nouvelle
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