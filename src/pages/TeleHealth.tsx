import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Video,
  Send,
  Phone,
  Paperclip,
  Image,
  MessageCircle,
  Clock,
  PawPrint,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "vet" | "owner";
  content: string;
  timestamp: string;
  type: "text" | "image";
}

const mockChats = [
  {
    id: "1",
    petName: "Max",
    ownerName: "Sarah Johnson",
    lastMessage: "Thank you, Doctor! I'll monitor him closely.",
    time: "10 min ago",
    unread: 2,
  },
  {
    id: "2",
    petName: "Luna",
    ownerName: "Michael Chen",
    lastMessage: "Is it normal for her to be less active?",
    time: "1 hour ago",
    unread: 0,
  },
  {
    id: "3",
    petName: "Buddy",
    ownerName: "Emily Davis",
    lastMessage: "I've attached the lab results.",
    time: "2 hours ago",
    unread: 1,
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "owner",
    content: "Hi Dr. Foster, Max has been scratching his ear a lot today. Should I be worried?",
    timestamp: "9:30 AM",
    type: "text",
  },
  {
    id: "2",
    sender: "vet",
    content: "Hello Sarah! Excessive ear scratching could indicate an ear infection or allergies. Can you check if there's any redness or discharge in his ear?",
    timestamp: "9:35 AM",
    type: "text",
  },
  {
    id: "3",
    sender: "owner",
    content: "I checked and there's some redness but no discharge. He also shakes his head sometimes.",
    timestamp: "9:40 AM",
    type: "text",
  },
  {
    id: "4",
    sender: "vet",
    content: "Based on what you're describing, it sounds like it could be early signs of otitis. I recommend bringing Max in for a quick examination tomorrow. In the meantime, don't try to clean the ear - this could make it worse.",
    timestamp: "9:45 AM",
    type: "text",
  },
  {
    id: "5",
    sender: "owner",
    content: "Thank you, Doctor! I'll monitor him closely.",
    timestamp: "9:50 AM",
    type: "text",
  },
];

export default function TeleHealth() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState("");

  return (
    <DashboardLayout title="TeleHealth" subtitle="Chat and video consultations">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Chat List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Consultations
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-4">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedChat.id === chat.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {chat.ownerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{chat.ownerName}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <PawPrint className="h-3 w-3" />
                          <span>{chat.petName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="ml-auto">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedChat.ownerName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedChat.ownerName}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <PawPrint className="h-3 w-3" />
                    {selectedChat.petName}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "vet" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender === "vet"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-secondary rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "vet" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              TeleHealth is intended for follow-ups and minor consultations. For emergencies, advise pet owners to visit the clinic.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
