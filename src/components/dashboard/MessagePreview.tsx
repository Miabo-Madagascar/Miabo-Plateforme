import React from 'react';
import { motion } from 'framer-motion';
import { useMessageStore } from '../../stores/messageStore';

interface MessagePreviewProps {
  conversationId: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    senderId: string;
    read: boolean;
  };
  participant: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'tutor' | 'parent';
  };
  isActive: boolean;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({
  conversationId,
  lastMessage,
  participant,
  isActive,
}) => {
  const { setCurrentConversation } = useMessageStore();

  const formattedTime = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(lastMessage.timestamp);

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    month: 'short',
    day: 'numeric',
  }).format(lastMessage.timestamp);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const displayTime = isToday(lastMessage.timestamp) ? formattedTime : formattedDate;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setCurrentConversation(conversationId)}
      className={`flex items-start p-3 cursor-pointer transition-colors ${
        isActive ? 'bg-primary-50' : lastMessage.read ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
      } ${!lastMessage.read && !isActive ? 'border-l-4 border-primary-500' : ''}`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={participant.avatar}
          alt={participant.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        {participant.role === 'tutor' && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-secondary-500 border-2 border-white" />
        )}
        {participant.role === 'student' && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary-500 border-2 border-white" />
        )}
        {participant.role === 'parent' && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-accent-500 border-2 border-white" />
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h4 className="text-sm font-medium text-gray-900 truncate">{participant.name}</h4>
          <span className="text-xs text-gray-500">{displayTime}</span>
        </div>
        <p className={`text-sm line-clamp-2 ${lastMessage.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
          {lastMessage.content}
        </p>
      </div>

      {!lastMessage.read && !isActive && (
        <span className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
      )}
    </motion.div>
  );
};

export default MessagePreview;