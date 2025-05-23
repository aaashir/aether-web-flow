
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Send, Loader2, X } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface Message {
  id: string;
  message: string;
  response?: string;
  is_generating_block: boolean;
}

interface AIChatProps {
  onClose: () => void;
  onBlockCreated: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ onClose, onBlockCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!prompt.trim() || !user) return;

    try {
      setIsLoading(true);
      
      // Insert user message
      const { data: messageData, error: messageError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: prompt,
          is_generating_block: false
        })
        .select()
        .single();

      if (messageError) throw messageError;

      // Clear input
      setPrompt('');

      // Add message to UI
      setMessages(prev => [...prev, messageData as Message]);

      // Call AI endpoint to get response
      const response = await fetch('/api/ai-generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.auth.getSession()}`
        },
        body: JSON.stringify({
          message: messageData.message,
          messageId: messageData.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const responseData = await response.json();

      // Update message with AI response
      const { error: updateError } = await supabase
        .from('chat_messages')
        .update({
          response: responseData.response,
          is_generating_block: responseData.isGeneratingBlock,
          block_id: responseData.blockId
        })
        .eq('id', messageData.id);

      if (updateError) throw updateError;

      // Refresh messages to show response
      fetchMessages();

      // Notify if block was created
      if (responseData.isGeneratingBlock && responseData.blockId) {
        toast({
          title: 'Block Created!',
          description: 'A new custom block has been added to your library.',
          duration: 5000,
        });
        onBlockCreated();
      }

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className="flex flex-col h-[500px] w-full max-w-md shadow-xl dark:bg-gray-800">
      <CardHeader className="border-b flex-shrink-0 flex items-center justify-between">
        <CardTitle className="text-lg">AI Assistant</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 my-8">
              <p>Ask the AI to create a custom block for your website.</p>
              <p className="text-sm mt-2">Example: "Create a pricing table with 3 tiers"</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <p className="text-sm font-medium">You</p>
                  <p>{msg.message}</p>
                </div>

                {msg.response && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm font-medium">AI Assistant</p>
                    <p>{msg.response}</p>
                    {msg.is_generating_block && (
                      <div className="mt-2">
                        <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded-full">
                          Block created
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask the AI to create a block..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 resize-none"
              rows={2}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !prompt.trim()}
              className="self-end"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
