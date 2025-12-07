export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinedAt: string;
  rating: number;
  reviewCount: number;
  isAdmin: boolean;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "knife" | "watch";
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  condition: "new" | "like-new" | "good" | "fair";
  brand: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  specs: Record<string, string>;
}

export interface Review {
  id: string;
  itemId: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    username: "BladeCollector",
    email: "blade@example.com",
    avatar: "/bearded-man-avatar.png",
    bio: "Passionate knife collector for over 15 years. Specializing in Japanese craftsmanship.",
    location: "Portland, OR",
    joinedAt: "2022-03-15",
    rating: 4.9,
    reviewCount: 47,
    isAdmin: false,
  },
  {
    id: "user-2",
    username: "TimeKeeper",
    email: "time@example.com",
    avatar: "/professional-woman-avatar.png",
    bio: "Watch enthusiast and certified horologist. Quality timepieces only.",
    location: "Geneva, Switzerland",
    joinedAt: "2021-08-22",
    rating: 4.8,
    reviewCount: 89,
    isAdmin: false,
  },
  {
    id: "user-3",
    username: "EdgeMaster",
    email: "edge@example.com",
    avatar: "/man-with-glasses-avatar.png",
    bio: "Custom knife maker and collector. Every blade tells a story.",
    location: "Tokyo, Japan",
    joinedAt: "2020-11-10",
    rating: 5.0,
    reviewCount: 124,
    isAdmin: false,
  },
  {
    id: "admin-1",
    username: "Moderator",
    email: "mod@edge.com",
    avatar: "/admin-avatar-shield.jpg",
    bio: "Platform moderator ensuring quality and compliance.",
    location: "San Francisco, CA",
    joinedAt: "2020-01-01",
    rating: 5.0,
    reviewCount: 0,
    isAdmin: true,
  },
];

export const mockItems: Item[] = [
  {
    id: "item-1",
    title: "Benchmade Bugout 535BK-2",
    description:
      "Lightweight everyday carry knife with CPM-S30V blade steel. Perfect for outdoor enthusiasts. Minimal signs of use, blade is factory sharp.",
    price: 145,
    category: "knife",
    images: [
      "/benchmade-bugout-folding-knife-black.jpg",
      "/folding-knife-blade-detail.jpg",
    ],
    sellerId: "user-1",
    sellerName: "BladeCollector",
    sellerAvatar: "/bearded-man-avatar.png",
    condition: "like-new",
    brand: "Benchmade",
    status: "approved",
    createdAt: "2024-01-15",
    specs: {
      "Blade Length": "3.24 inches",
      "Blade Steel": "CPM-S30V",
      "Handle Material": "CF-Elite",
      Weight: "1.85 oz",
      "Lock Type": "AXIS Lock",
    },
  },
  {
    id: "item-2",
    title: "Omega Seamaster Planet Ocean 600M",
    description:
      "Professional dive watch in excellent condition. Full box and papers included. Recently serviced by Omega certified technician.",
    price: 4850,
    category: "watch",
    images: [
      "/omega-seamaster-planet-ocean-dive-watch.jpg",
      "/luxury-watch-caseback-omega.jpg",
    ],
    sellerId: "user-2",
    sellerName: "TimeKeeper",
    sellerAvatar: "/professional-woman-avatar.png",
    condition: "like-new",
    brand: "Omega",
    status: "approved",
    createdAt: "2024-01-10",
    specs: {
      "Case Diameter": "43.5mm",
      Movement: "Co-Axial 8900",
      "Water Resistance": "600m",
      Crystal: "Sapphire",
      "Power Reserve": "60 hours",
    },
  },
  {
    id: "item-3",
    title: "Chris Reeve Sebenza 31 Large",
    description:
      "The legendary Sebenza 31. This is the large version with S45VN blade. Pristine condition, carried a handful of times.",
    price: 425,
    category: "knife",
    images: [
      "/chris-reeve-sebenza-folding-knife-titanium.jpg",
      "/premium-folding-knife-open-blade.jpg",
    ],
    sellerId: "user-3",
    sellerName: "EdgeMaster",
    sellerAvatar: "/man-with-glasses-avatar.png",
    condition: "like-new",
    brand: "Chris Reeve Knives",
    status: "approved",
    createdAt: "2024-01-08",
    specs: {
      "Blade Length": "3.625 inches",
      "Blade Steel": "S45VN",
      "Handle Material": "Titanium",
      Weight: "4.7 oz",
      "Lock Type": "Frame Lock",
    },
  },
  {
    id: "item-4",
    title: "Rolex Submariner Date 126610LN",
    description:
      "2023 model with remaining warranty. Worn sparingly, in mint condition. All original links, box, and papers.",
    price: 12500,
    category: "watch",
    images: [
      "/rolex-submariner-black-dial-steel-watch.jpg",
      "/rolex-watch-bracelet-clasp-detail.jpg",
    ],
    sellerId: "user-2",
    sellerName: "TimeKeeper",
    sellerAvatar: "/professional-woman-avatar.png",
    condition: "like-new",
    brand: "Rolex",
    status: "approved",
    createdAt: "2024-01-05",
    specs: {
      "Case Diameter": "41mm",
      Movement: "Caliber 3235",
      "Water Resistance": "300m",
      Crystal: "Sapphire",
      "Power Reserve": "70 hours",
    },
  },
  {
    id: "item-5",
    title: "Spyderco Para Military 2",
    description:
      "Classic EDC knife in S45VN. Well broken in action, smooth as butter. Some light scratches on the clip.",
    price: 125,
    category: "knife",
    images: [
      "/spyderco-paramilitary-2-folding-knife.jpg",
      "/tactical-folding-knife-blade.jpg",
    ],
    sellerId: "user-1",
    sellerName: "BladeCollector",
    sellerAvatar: "/bearded-man-avatar.png",
    condition: "good",
    brand: "Spyderco",
    status: "approved",
    createdAt: "2024-01-03",
    specs: {
      "Blade Length": "3.42 inches",
      "Blade Steel": "S45VN",
      "Handle Material": "G-10",
      Weight: "3.75 oz",
      "Lock Type": "Compression Lock",
    },
  },
  {
    id: "item-6",
    title: "Tudor Black Bay 58",
    description:
      "Beautiful vintage-inspired diver. Blue dial version. Excellent condition with Tudor fabric strap.",
    price: 3200,
    category: "watch",
    images: [
      "/tudor-black-bay-58-blue-dial-watch.jpg",
      "/dive-watch-nato-strap-detail.jpg",
    ],
    sellerId: "user-3",
    sellerName: "EdgeMaster",
    sellerAvatar: "/man-with-glasses-avatar.png",
    condition: "like-new",
    brand: "Tudor",
    status: "approved",
    createdAt: "2024-01-01",
    specs: {
      "Case Diameter": "39mm",
      Movement: "MT5402",
      "Water Resistance": "200m",
      Crystal: "Sapphire",
      "Power Reserve": "70 hours",
    },
  },
  {
    id: "item-7",
    title: "Microtech Ultratech",
    description:
      "OTF automatic knife. Like new in box. Fires hard with no blade play.",
    price: 280,
    category: "knife",
    images: ["/microtech-ultratech-otf-automatic-knife.jpg"],
    sellerId: "user-1",
    sellerName: "BladeCollector",
    sellerAvatar: "/bearded-man-avatar.png",
    condition: "like-new",
    brand: "Microtech",
    status: "pending",
    createdAt: "2024-01-20",
    specs: {
      "Blade Length": "3.35 inches",
      "Blade Steel": "M390",
      "Handle Material": "Aluminum",
      Weight: "3.4 oz",
      "Lock Type": "OTF Slide Lock",
    },
  },
  {
    id: "item-8",
    title: "Grand Seiko SBGA413 Spring Drive",
    description:
      "Stunning snowflake dial. Full kit with warranty card dated 2023.",
    price: 5800,
    category: "watch",
    images: ["/grand-seiko-spring-drive-snowflake-dial-watch.jpg"],
    sellerId: "user-2",
    sellerName: "TimeKeeper",
    sellerAvatar: "/professional-woman-avatar.png",
    condition: "like-new",
    brand: "Grand Seiko",
    status: "pending",
    createdAt: "2024-01-18",
    specs: {
      "Case Diameter": "40mm",
      Movement: "9R65 Spring Drive",
      "Water Resistance": "100m",
      Crystal: "Sapphire",
      "Power Reserve": "72 hours",
    },
  },
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    itemId: "item-1",
    userId: "user-2",
    username: "TimeKeeper",
    avatar: "/professional-woman-avatar.png",
    rating: 5,
    comment:
      "Knife arrived exactly as described. Great seller with fast shipping!",
    createdAt: "2024-01-18",
  },
  {
    id: "review-2",
    itemId: "item-2",
    userId: "user-1",
    username: "BladeCollector",
    avatar: "/bearded-man-avatar.png",
    rating: 5,
    comment: "Absolutely stunning timepiece. Perfect condition and authentic.",
    createdAt: "2024-01-14",
  },
  {
    id: "review-3",
    itemId: "item-3",
    userId: "user-2",
    username: "TimeKeeper",
    avatar: "/professional-woman-avatar.png",
    rating: 4,
    comment: "Beautiful Sebenza. Minor delay in shipping but item was perfect.",
    createdAt: "2024-01-12",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-1",
    receiverId: "user-2",
    content: "Hi! Is the Omega still available?",
    createdAt: "2024-01-20T10:30:00",
    read: true,
  },
  {
    id: "msg-2",
    senderId: "user-2",
    receiverId: "user-1",
    content: "Yes it is! Would you like more photos?",
    createdAt: "2024-01-20T10:35:00",
    read: true,
  },
  {
    id: "msg-3",
    senderId: "user-1",
    receiverId: "user-2",
    content: "That would be great, especially of the caseback and clasp.",
    createdAt: "2024-01-20T10:40:00",
    read: true,
  },
  {
    id: "msg-4",
    senderId: "user-2",
    receiverId: "user-1",
    content:
      "I'll send those over shortly. The watch has been serviced recently.",
    createdAt: "2024-01-20T10:45:00",
    read: true,
  },
  {
    id: "msg-5",
    senderId: "user-1",
    receiverId: "user-2",
    content: "Perfect! Does it come with box and papers?",
    createdAt: "2024-01-20T11:00:00",
    read: true,
  },
  {
    id: "msg-6",
    senderId: "user-2",
    receiverId: "user-1",
    content:
      "Yes, full set! Original box, warranty card, service papers, and all original links.",
    createdAt: "2024-01-20T11:05:00",
    read: true,
  },
  {
    id: "msg-7",
    senderId: "user-1",
    receiverId: "user-2",
    content:
      "Excellent! I'm very interested. Can we discuss payment and shipping?",
    createdAt: "2024-01-20T11:15:00",
    read: false,
  },
  {
    id: "msg-8",
    senderId: "user-3",
    receiverId: "user-1",
    content: "Hey, saw your Benchmade listing. Still available?",
    createdAt: "2024-01-21T09:00:00",
    read: true,
  },
  {
    id: "msg-9",
    senderId: "user-1",
    receiverId: "user-3",
    content: "Hi! Yes, it's still available. Interested?",
    createdAt: "2024-01-21T09:15:00",
    read: true,
  },
  {
    id: "msg-10",
    senderId: "user-3",
    receiverId: "user-1",
    content:
      "Definitely! Can you tell me more about the condition? Any blade play or lock stick?",
    createdAt: "2024-01-21T09:20:00",
    read: true,
  },
  {
    id: "msg-11",
    senderId: "user-1",
    receiverId: "user-3",
    content:
      "No blade play at all, locks up solid. Action is smooth and drop-shut. Factory edge, never sharpened.",
    createdAt: "2024-01-21T09:25:00",
    read: true,
  },
  {
    id: "msg-12",
    senderId: "user-3",
    receiverId: "user-1",
    content: "Sounds perfect! Would you consider $130?",
    createdAt: "2024-01-21T09:30:00",
    read: false,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: ["user-1", "user-2"],
    lastMessage:
      "Excellent! I'm very interested. Can we discuss payment and shipping?",
    lastMessageAt: "2024-01-20T11:15:00",
    unreadCount: 1,
  },
  {
    id: "conv-2",
    participants: ["user-1", "user-3"],
    lastMessage: "Sounds perfect! Would you consider $130?",
    lastMessageAt: "2024-01-21T09:30:00",
    unreadCount: 1,
  },
];
