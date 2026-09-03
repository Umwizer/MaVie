import  { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RichCard } from '../components/RichCards';
import type { ChatMessage } from '../types/chat';
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: "Good morning! Here's a quick look at your activity from yesterday.",
    timestamp: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'm2',
    sender: 'assistant',
    card: {
      type: 'activity',
      title: 'Evening Walk',
      durationMin: 32,
      calories: 180,
      distanceKm: 2.4,
      icon: 'activity',
    },
    timestamp: Date.now() - 1000 * 60 * 29,
  },
  {
    id: 'm3',
    sender: 'user',
    text: 'Nice! What did I eat for dinner?',
    timestamp: Date.now() - 1000 * 60 * 20,
  },
  {
    id: 'm4',
    sender: 'assistant',
    text: 'You logged this meal at 7:40 PM:',
    card: {
      type: 'meal',
      title: 'Grilled Chicken Salad',
      calories: 420,
      protein: 38,
      carbs: 22,
      fat: 16,
    },
    timestamp: Date.now() - 1000 * 60 * 19,
  },
  {
    id: 'm5',
    sender: 'assistant',
    text: "Here's how your sleep looked this week:",
    card: {
      type: 'chart',
      title: 'Sleep This Week',
      unit: 'hrs',
      values: [6.5, 7, 5.8, 8, 7.2, 6.9, 7.5],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      average: 7.0,
    },
    timestamp: Date.now() - 1000 * 60 * 18,
  },
];

function TextBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user';
  if (!message.text) return null;

  return (
    <View
      className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
        isUser
          ? 'bg-blue-600 self-end rounded-br-sm'
          : 'bg-gray-100 dark:bg-gray-800 self-start rounded-bl-sm'
      }`}
    >
      <Text className={isUser ? 'text-white text-sm' : 'text-gray-900 dark:text-gray-100 text-sm'}>
        {message.text}
      </Text>
    </View>
  );
}
function MessageRow({ message }: { message: ChatMessage }) {
  const isUser = message.sender === 'user';
  return (
    <View className={`px-4 mb-3 ${isUser ? 'items-end' : 'items-start'}`}>
      <TextBubble message={message} />
      {message.card && <RichCard data={message.card} />}
    </View>
  );
}

function TypingIndicator() {
  return (
    <View className="px-4 mb-3 items-start">
      <View className="rounded-2xl rounded-bl-sm px-4 py-3 bg-gray-100 dark:bg-gray-800 flex-row gap-1">
        <View className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
        <View className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
        <View className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<FlatList>(null);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: "Got it I'm still a placeholder response. Wire me up to your AI backend!",
          timestamp: Date.now(),
        },
      ]);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }, 900);

    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, [input]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-gray-950"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 pt-3 pb-3 border-b border-gray-100 dark:border-gray-800">
        <View className="w-9 h-9 rounded-full bg-blue-500/20 items-center justify-center">
          <Feather name="heart" size={18} color="#3B82F6" />
        </View>
        <View>
          <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base">
            AI Wellness Companion
          </Text>
          <Text className="text-green-500 text-xs">Online</Text>
        </View>
      </View>

      {/* Message list */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MessageRow message={item} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input bar */}
      <View className="flex-row items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          className="flex-1 rounded-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Pressable
          onPress={handleSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center"
        >
          <Feather name="arrow-up" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}