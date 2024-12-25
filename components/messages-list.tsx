import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  status: 'read' | 'unread';
  createdAt: string;
}

interface MessagesListProps {
  messages: Message[];
}

export function MessagesList({ messages }: MessagesListProps) {
  const handleReply = (messageId: string) => {
    // Implement reply functionality
    console.log(`Replying to message ${messageId}`);
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className={message.status === 'unread' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderName}`} />
                <AvatarFallback>{message.senderName[0]}</AvatarFallback>
              </Avatar>
              <span>{message.senderName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{message.content}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(message.createdAt).toLocaleString()}
            </p>
            <Button onClick={() => handleReply(message.id)} className="mt-4">Reply</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

