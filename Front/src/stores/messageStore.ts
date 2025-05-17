import { create } from 'zustand';

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'tutor' | 'parent';
  online?: boolean;
  lastSeen?: Date;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'emoji' | 'image';
  reactions?: {
    emoji: string;
    users: string[];
  }[];
}

interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastTyping?: {
    userId: string;
    timestamp: Date;
  };
}

interface MessageState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setCurrentConversation: (conversationId: string) => void;
  sendMessage: (content: string, type?: 'text' | 'emoji' | 'image') => Promise<void>;
  markAsRead: (messageIds: string[]) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  addReaction: (messageId: string, emoji: string) => Promise<void>;
  setTyping: (isTyping: boolean) => void;
  searchConversations: (term: string) => void;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Mathieu Randria',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'tutor',
    online: true,
  },
  {
    id: '2',
    name: 'Clara Rabe',
    avatar: 'https://i.pravatar.cc/150?img=25',
    role: 'tutor',
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '3',
    name: 'Thomas Razafindrakoto',
    avatar: 'https://i.pravatar.cc/150?img=18',
    role: 'tutor',
    online: true,
  },
  {
    id: '4',
    name: 'Soa Andriamahefa',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'student',
    online: true,
  },
  {
    id: '5',
    name: 'Faniry Andria',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'student',
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
];

// Generate mock messages for a conversation
const generateMockMessages = (participants: User[], daysAgo: number = 7): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < 10 + Math.random() * 20; i++) {
    const sender = participants[Math.floor(Math.random() * participants.length)];
    const timestamp = new Date(startDate.getTime() + Math.random() * (now.getTime() - startDate.getTime()));
    
    messages.push({
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      conversationId: `conv_${participants.map(p => p.id).join('_')}`,
      senderId: sender.id,
      content: i === 0 ? 'Bonjour! 👋' : generateMockContent(),
      timestamp,
      read: timestamp < new Date(Date.now() - 1000 * 60 * 60), // Read if older than 1 hour
      status: timestamp < new Date(Date.now() - 1000 * 60 * 60) ? 'read' : 'delivered',
      type: Math.random() > 0.9 ? 'emoji' : Math.random() > 0.8 ? 'image' : 'text',
      reactions: Math.random() > 0.7 ? [
        {
          emoji: ['👍', '❤️', '😊', '👏', '🎉'][Math.floor(Math.random() * 5)],
          users: [participants[Math.floor(Math.random() * participants.length)].id],
        },
      ] : undefined,
    });
  }

  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Generate mock content
const generateMockContent = (): string => {
  const contents = [
    "D'accord, on se retrouve à la prochaine session! 📚",
    "Merci pour ton aide, j'ai beaucoup mieux compris maintenant.",
    "Est-ce qu'on peut revoir ce concept la prochaine fois ?",
    "Voici les exercices que tu m'as demandés 📝",
    "Super progrès! Continue comme ça! 🌟",
    "J'ai une question sur le devoir...",
    "https://images.pexels.com/photos/4492160/pexels-photo-4492160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Parfait! À demain alors! 👋",
    "Je serai un peu en retard, désolé(e) 🙏",
    "On peut décaler la session à 15h ?",
    "Excellent travail sur les exercices! 👏",
    "N'oublie pas de réviser pour le test de demain 📖",
    "Voici un résumé de ce qu'on a vu aujourd'hui...",
    "Je comprends mieux maintenant, merci! 🙂",
  ];
  return contents[Math.floor(Math.random() * contents.length)];
};

// Generate mock conversations
const mockConversations: Conversation[] = mockUsers.slice(0, 5).map((user, index) => ({
  id: `conv_${index + 1}`,
  participants: [mockUsers[0], user],
  messages: generateMockMessages([mockUsers[0], user], 7 - index),
  lastTyping: Math.random() > 0.8 ? {
    userId: user.id,
    timestamp: new Date(),
  } : undefined,
}));

// Create the store
export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: mockConversations,
  currentConversation: null,
  searchTerm: '',
  isLoading: false,
  error: null,

  setCurrentConversation: (conversationId: string) => {
    const conversation = get().conversations.find(c => c.id === conversationId);
    if (conversation) {
      // Mark all unread messages as read
      const unreadMessages = conversation.messages
        .filter(m => !m.read && m.senderId !== mockUsers[0].id)
        .map(m => m.id);
      if (unreadMessages.length > 0) {
        get().markAsRead(unreadMessages);
      }
      set({ currentConversation: conversation });
    }
  },

  sendMessage: async (content: string, type: 'text' | 'emoji' | 'image' = 'text') => {
    const { currentConversation, conversations } = get();
    if (!currentConversation) return;

    const newMessage: Message = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      conversationId: currentConversation.id,
      senderId: mockUsers[0].id,
      content,
      timestamp: new Date(),
      read: false,
      status: 'sent',
      type,
    };

    // Update conversations
    const updatedConversations = conversations.map(conv =>
      conv.id === currentConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMessage],
          }
        : conv
    );

    set({ conversations: updatedConversations });

    // Simulate message being delivered
    setTimeout(() => {
      const { conversations } = get();
      const updatedConversations = conversations.map(conv =>
        conv.id === currentConversation.id
          ? {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === newMessage.id
                  ? { ...msg, status: 'delivered' }
                  : msg
              ),
            }
          : conv
      );
      set({ conversations: updatedConversations });
    }, 1000);

    // Simulate message being read
    setTimeout(() => {
      const { conversations } = get();
      const updatedConversations = conversations.map(conv =>
        conv.id === currentConversation.id
          ? {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === newMessage.id
                  ? { ...msg, status: 'read', read: true }
                  : msg
              ),
            }
          : conv
      );
      set({ conversations: updatedConversations });
    }, 3000);
  },

  markAsRead: async (messageIds: string[]) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => ({
      ...conv,
      messages: conv.messages.map(msg =>
        messageIds.includes(msg.id)
          ? { ...msg, read: true, status: 'read' }
          : msg
      ),
    }));
    set({ conversations: updatedConversations });
  },

  deleteMessage: async (messageId: string) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => ({
      ...conv,
      messages: conv.messages.filter(msg => msg.id !== messageId),
    }));
    set({ conversations: updatedConversations });
  },

  addReaction: async (messageId: string, emoji: string) => {
    const { conversations } = get();
    const updatedConversations = conversations.map(conv => ({
      ...conv,
      messages: conv.messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { emoji, users: [mockUsers[0].id] },
              ],
            }
          : msg
      ),
    }));
    set({ conversations: updatedConversations });
  },

  setTyping: (isTyping: boolean) => {
    const { currentConversation, conversations } = get();
    if (!currentConversation) return;

    const updatedConversations = conversations.map(conv =>
      conv.id === currentConversation.id
        ? {
            ...conv,
            lastTyping: isTyping
              ? { userId: mockUsers[0].id, timestamp: new Date() }
              : undefined,
          }
        : conv
    );
    set({ conversations: updatedConversations });
  },

  searchConversations: (term: string) => {
    set({ searchTerm: term });
  },
}));