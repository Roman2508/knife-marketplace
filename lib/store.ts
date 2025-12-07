"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Item, Review, Message, Conversation } from "./mock-data"
import { mockUsers, mockItems, mockReviews, mockMessages, mockConversations } from "./mock-data"

interface AppState {
  currentUser: User | null
  users: User[]
  items: Item[]
  reviews: Review[]
  messages: Message[]
  conversations: Conversation[]

  // Auth
  login: (email: string, password: string) => boolean
  register: (username: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<User>) => void

  // Items
  addItem: (item: Omit<Item, "id" | "createdAt" | "status" | "sellerId" | "sellerName" | "sellerAvatar">) => void
  updateItemStatus: (itemId: string, status: Item["status"]) => void

  // Reviews
  addReview: (review: Omit<Review, "id" | "createdAt" | "userId" | "username" | "avatar">) => void

  // Messages
  sendMessage: (receiverId: string, content: string) => void
  markMessagesRead: (conversationId: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: mockUsers,
      items: mockItems,
      reviews: mockReviews,
      messages: mockMessages,
      conversations: mockConversations,

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email)
        if (user) {
          set({ currentUser: user })
          return true
        }
        return false
      },

      register: (username, email, password) => {
        const exists = get().users.find((u) => u.email === email)
        if (exists) return false

        const newUser: User = {
          id: `user-${Date.now()}`,
          username,
          email,
          avatar: `/placeholder.svg?height=100&width=100&query=${username} avatar`,
          bio: "",
          location: "",
          joinedAt: new Date().toISOString().split("T")[0],
          rating: 0,
          reviewCount: 0,
          isAdmin: false,
        }

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }))
        return true
      },

      logout: () => set({ currentUser: null }),

      updateProfile: (updates) =>
        set((state) => ({
          currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
          users: state.users.map((u) => (u.id === state.currentUser?.id ? { ...u, ...updates } : u)),
        })),

      addItem: (itemData) =>
        set((state) => {
          const user = state.currentUser
          if (!user) return state

          const newItem: Item = {
            ...itemData,
            id: `item-${Date.now()}`,
            createdAt: new Date().toISOString().split("T")[0],
            status: "pending",
            sellerId: user.id,
            sellerName: user.username,
            sellerAvatar: user.avatar,
          }

          return { items: [...state.items, newItem] }
        }),

      updateItemStatus: (itemId, status) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, status } : item)),
        })),

      addReview: (reviewData) =>
        set((state) => {
          const user = state.currentUser
          if (!user) return state

          const newReview: Review = {
            ...reviewData,
            id: `review-${Date.now()}`,
            createdAt: new Date().toISOString().split("T")[0],
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
          }

          return { reviews: [...state.reviews, newReview] }
        }),

      sendMessage: (receiverId, content) =>
        set((state) => {
          const user = state.currentUser
          if (!user) return state

          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            receiverId,
            content,
            createdAt: new Date().toISOString(),
            read: false,
          }

          // Update or create conversation
          const existingConv = state.conversations.find(
            (c) => c.participants.includes(user.id) && c.participants.includes(receiverId),
          )

          let updatedConversations: Conversation[]
          if (existingConv) {
            updatedConversations = state.conversations.map((c) =>
              c.id === existingConv.id
                ? {
                    ...c,
                    lastMessage: content,
                    lastMessageAt: newMessage.createdAt,
                  }
                : c,
            )
          } else {
            updatedConversations = [
              ...state.conversations,
              {
                id: `conv-${Date.now()}`,
                participants: [user.id, receiverId],
                lastMessage: content,
                lastMessageAt: newMessage.createdAt,
                unreadCount: 0,
              },
            ]
          }

          return {
            messages: [...state.messages, newMessage],
            conversations: updatedConversations,
          }
        }),

      markMessagesRead: (conversationId) =>
        set((state) => ({
          conversations: state.conversations.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)),
        })),
    }),
    {
      name: "edge-marketplace",
    },
  ),
)
