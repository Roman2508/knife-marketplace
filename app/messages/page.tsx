"use client";

import type React from "react";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  Search,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

function MessagesContent() {
  const searchParams = useSearchParams();
  const userParam = searchParams.get("user");

  const {
    currentUser,
    users,
    messages,
    conversations,
    sendMessage,
    markMessagesRead,
  } = useAppStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    userParam
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatUsers = users.filter((u) => {
    if (u.id === currentUser?.id) return false;
    return (
      conversations.some(
        (c) =>
          c.participants.includes(u.id) &&
          c.participants.includes(currentUser?.id || "")
      ) || u.id === userParam
    );
  });

  const filteredChatUsers = chatUsers.filter((u) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const conversationMessages = messages
    .filter(
      (m) =>
        (m.senderId === currentUser?.id && m.receiverId === selectedUserId) ||
        (m.senderId === selectedUserId && m.receiverId === currentUser?.id)
    )
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  useEffect(() => {
    if (selectedUserId && currentUser) {
      const conv = conversations.find(
        (c) =>
          c.participants.includes(selectedUserId) &&
          c.participants.includes(currentUser.id)
      );
      if (conv) {
        markMessagesRead(conv.id);
      }
    }
  }, [selectedUserId, currentUser, conversations, markMessagesRead]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    sendMessage(selectedUserId, newMessage.trim());
    setNewMessage("");
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md border-4 border-foreground bg-card p-8 text-center shadow-brutal">
            <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 font-mono text-2xl font-black uppercase tracking-tighter">
              Sign In Required
            </h2>
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Access messages
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                asChild
                className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] bg-transparent"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 overflow-hidden mt-32 border-t-4 border-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-1">
          <div
            className={cn(
              "w-full border-r-4 border-foreground bg-card md:w-96",
              selectedUserId && "hidden md:block"
            )}
          >
            <div className="flex h-full flex-col">
              <div className="border-b-4 border-foreground bg-secondary p-6">
                <h1 className="font-mono text-2xl font-black uppercase tracking-tighter">
                  Messages
                </h1>
                <div className="relative mt-4">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="SEARCH..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-4 border-foreground bg-background py-5 pl-12 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                {filteredChatUsers.length > 0 ? (
                  <div className="p-3">
                    {filteredChatUsers.map((user) => {
                      const conv = conversations.find(
                        (c) =>
                          c.participants.includes(user.id) &&
                          c.participants.includes(currentUser.id)
                      );
                      const isSelected = selectedUserId === user.id;

                      return (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUserId(user.id)}
                          className={cn(
                            "mb-3 flex w-full items-center gap-4 border-4 border-foreground bg-background p-4 text-left shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px]",
                            isSelected && "bg-primary text-primary-foreground"
                          )}
                        >
                          <Avatar className="h-14 w-14 border-4 border-foreground">
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-primary font-black text-background">
                              {user.username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-mono font-black uppercase tracking-wider">
                                {user.username}
                              </p>
                              {conv?.unreadCount ? (
                                <span className="flex h-6 w-6 items-center justify-center border-2 border-foreground bg-accent font-mono text-xs font-black text-background">
                                  {conv.unreadCount}
                                </span>
                              ) : null}
                            </div>
                            {conv && (
                              <p className="mt-1 truncate font-mono text-xs font-bold uppercase tracking-wider opacity-70">
                                {conv.lastMessage}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-6 font-mono font-black uppercase tracking-tighter">
                      No Chats
                    </p>
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Start a conversation
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-1 flex-col",
              !selectedUserId && "hidden md:flex"
            )}
          >
            {selectedUser ? (
              <>
                <div className="flex items-center gap-4 border-b-4 border-foreground bg-secondary p-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border-4 border-foreground shadow-[4px_4px_0_0_rgb(var(--foreground))] md:hidden"
                    onClick={() => setSelectedUserId(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-14 w-14 border-4 border-foreground">
                    <AvatarImage
                      src={selectedUser.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-primary font-black text-background">
                      {selectedUser.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-mono font-black uppercase tracking-wider">
                      {selectedUser.username}
                    </p>
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {selectedUser.location || "No location"}
                    </p>
                  </div>
                </div>

                <ScrollArea className="flex-1 bg-background p-6">
                  <div className="space-y-4">
                    {conversationMessages.length > 0 ? (
                      conversationMessages.map((message) => {
                        const isMine = message.senderId === currentUser.id;
                        return (
                          <div
                            key={message.id}
                            className={cn(
                              "flex",
                              isMine ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[80%] border-4 border-foreground p-4 font-mono shadow-[4px_4px_0_0_rgb(var(--foreground))]",
                                isMine
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card text-foreground"
                              )}
                            >
                              <p className="font-bold">{message.content}</p>
                              <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-70">
                                {new Date(message.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <MessageSquare className="h-16 w-16 text-muted-foreground" />
                        <p className="mt-6 font-mono text-xl font-black uppercase tracking-tighter">
                          Start Chatting
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t-4 border-foreground bg-secondary p-6">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <Input
                      placeholder="TYPE MESSAGE..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border-4 border-foreground bg-background py-6 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                    />
                    <Button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="border-4 border-foreground bg-primary px-8 font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center bg-background text-center">
                <div className="flex h-24 w-24 items-center justify-center border-4 border-foreground bg-secondary shadow-brutal">
                  <MessageSquare className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mt-8 font-mono text-2xl font-black uppercase tracking-tighter">
                  Your Messages
                </h2>
                <p className="mt-3 max-w-sm font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Select a chat to start
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
