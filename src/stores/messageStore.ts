import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  last_message?: Message;
  unread_count: number;
}

interface MessageState {
  messages: Message[];
  conversations: Conversation[];
  currentConversation: string | null;
  isLoading: boolean;
  error: string | null;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, receiverId: string) => Promise<void>;
  markAsRead: (messageId: string) => Promise<void>;
  setCurrentConversation: (conversationId: string) => void;
  subscribeToMessages: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  conversations: [],
  currentConversation: null,
  isLoading: false,
  error: null,

  fetchMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ messages: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  sendMessage: async (content: string, receiverId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: userData.user.id,
            receiver_id: receiverId,
            content,
            conversation_id: get().currentConversation,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      const messages = get().messages;
      set({ messages: [...messages, data] });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  markAsRead: async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;

      const messages = get().messages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      );
      set({ messages });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setCurrentConversation: (conversationId: string) => {
    set({ currentConversation: conversationId });
  },

  subscribeToMessages: () => {
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, async (payload) => {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;

        const newMessage = payload.new as Message;
        if (
          newMessage.conversation_id === get().currentConversation ||
          newMessage.sender_id === userData.user.id ||
          newMessage.receiver_id === userData.user.id
        ) {
          const messages = get().messages;
          set({ messages: [...messages, newMessage] });
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },
}));