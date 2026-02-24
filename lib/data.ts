export type Idea = {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  status: "Published" | "Draft"
  upvotes: number
  comments: number
  author: string
  authorAvatar?: string
  timeAgo: string
}

export type Category = {
  name: string
  description: string
  ideaCount: number
  color: string
}

export type Comment = {
  id: string
  author: string
  avatar?: string
  initials?: string
  timeAgo: string
  content: string
}

export const categories: Category[] = [
  {
    name: "Developer Tools",
    description: "Tools and platforms for developers",
    ideaCount: 156,
    color: "text-primary",
  },
  {
    name: "E-commerce",
    description: "Online shopping and retail solutions",
    ideaCount: 89,
    color: "text-primary",
  },
  {
    name: "Health & Wellness",
    description: "Healthcare and fitness innovations",
    ideaCount: 124,
    color: "text-orange-500",
  },
  {
    name: "Smart Home",
    description: "IoT and home automation",
    ideaCount: 67,
    color: "text-emerald-500",
  },
  {
    name: "Food & Beverage",
    description: "Culinary and dining experiences",
    ideaCount: 93,
    color: "text-red-500",
  },
  {
    name: "Finance",
    description: "Financial services and fintech",
    ideaCount: 112,
    color: "text-emerald-600",
  },
  {
    name: "Education",
    description: "Learning platforms and edtech",
    ideaCount: 145,
    color: "text-primary",
  },
  {
    name: "Productivity",
    description: "Tools to boost efficiency",
    ideaCount: 178,
    color: "text-pink-500",
  },
  {
    name: "Entertainment",
    description: "Media, gaming, and content",
    ideaCount: 71,
    color: "text-amber-500",
  },
  {
    name: "Social Network",
    description: "Community and communication",
    ideaCount: 84,
    color: "text-primary",
  },
  {
    name: "Travel & Tourism",
    description: "Travel experiences and booking",
    ideaCount: 56,
    color: "text-teal-500",
  },
  {
    name: "Sustainability",
    description: "Environmental and eco solutions",
    ideaCount: 102,
    color: "text-lime-600",
  },
]

export const allIdeas: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    shortDescription:
      "An intelligent tool that automatically reviews pull requests, identifies potential bugs, suggests improvements, and ensures code quality standards are met across the entire codebase.",
    fullDescription: `An intelligent tool that automatically reviews pull requests, identifies potential bugs, suggests improvements, and ensures code quality standards are met across the entire codebase.

The platform would use machine learning models trained on millions of code reviews to understand best practices, common pitfalls, and language-specific patterns. It integrates seamlessly with GitHub, GitLab, and Bitbucket.

Key features include:

- Automated bug detection with severity ratings
- Code style and consistency checks
- Security vulnerability scanning
- Performance optimization suggestions
- Learning from team-specific coding patterns
- Detailed explanations for each recommendation

This would save development teams countless hours while improving overall code quality and reducing technical debt.`,
    category: "Developer Tools",
    status: "Published",
    upvotes: 234,
    comments: 45,
    author: "Sarah Chen",
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    title: "Sustainable Fashion Marketplace",
    shortDescription:
      "A platform connecting eco-conscious consumers with verified sustainable fashion brands. Features carbon footprint tracking, material transparency, and ethical manufacturing verification.",
    fullDescription:
      "A platform connecting eco-conscious consumers with verified sustainable fashion brands. Features carbon footprint tracking, material transparency, and ethical manufacturing verification.",
    category: "E-commerce",
    status: "Published",
    upvotes: 189,
    comments: 32,
    author: "Marcus Johnson",
    timeAgo: "5 hours ago",
  },
  {
    id: "3",
    title: "Remote Team Wellness Platform",
    shortDescription:
      "Comprehensive wellness solution for remote teams including virtual fitness classes, mental health resources, team challenges, and personalized health tracking.",
    fullDescription:
      "Comprehensive wellness solution for remote teams including virtual fitness classes, mental health resources, team challenges, and personalized health tracking.",
    category: "Health & Wellness",
    status: "Published",
    upvotes: 156,
    comments: 28,
    author: "Emily Rodriguez",
    timeAgo: "8 hours ago",
  },
  {
    id: "4",
    title: "Smart Home Energy Optimizer",
    shortDescription:
      "IoT solution that learns your energy usage patterns and automatically adjusts smart home devices to minimize electricity costs while maintaining comfort.",
    fullDescription:
      "IoT solution that learns your energy usage patterns and automatically adjusts smart home devices to minimize electricity costs while maintaining comfort.",
    category: "Smart Home",
    status: "Published",
    upvotes: 142,
    comments: 19,
    author: "David Kim",
    timeAgo: "12 hours ago",
  },
  {
    id: "5",
    title: "Local Food Network App",
    shortDescription:
      "Connect home cooks with neighbors to share homemade meals, reduce food waste, and build community. Features dietary filters, rating system, and secure payments.",
    fullDescription:
      "Connect home cooks with neighbors to share homemade meals, reduce food waste, and build community. Features dietary filters, rating system, and secure payments.",
    category: "Food & Beverage",
    status: "Published",
    upvotes: 127,
    comments: 41,
    author: "Priya Patel",
    timeAgo: "1 day ago",
  },
  {
    id: "6",
    title: "Freelancer Financial Dashboard",
    shortDescription:
      "All-in-one financial management for freelancers with invoice tracking, expense categorization, tax estimation, and automated bookkeeping.",
    fullDescription:
      "All-in-one financial management for freelancers with invoice tracking, expense categorization, tax estimation, and automated bookkeeping.",
    category: "Finance",
    status: "Published",
    upvotes: 98,
    comments: 15,
    author: "Alex Turner",
    timeAgo: "1 day ago",
  },
]

export const trendingIdeas = [
  { ...allIdeas[0], rank: 1, trendScore: 98 },
  { ...allIdeas[1], rank: 2, trendScore: 94 },
  {
    id: "7",
    title: "Decentralized Content Creator Platform",
    shortDescription:
      "Web3 platform empowering creators with NFT-based content ownership, direct fan monetization, and transparent revenue sharing without platform fees.",
    fullDescription:
      "Web3 platform empowering creators with NFT-based content ownership, direct fan monetization, and transparent revenue sharing without platform fees.",
    category: "Social Network",
    status: "Published" as const,
    upvotes: 312,
    comments: 67,
    author: "Alex Rivera",
    timeAgo: "4 hours ago",
    rank: 3,
    trendScore: 91,
  },
  { ...allIdeas[2], rank: 4, trendScore: 87 },
  {
    id: "8",
    title: "Carbon Offset Tracking App",
    shortDescription:
      "Personal carbon footprint tracker that connects daily activities to environmental impact and suggests actionable ways to reduce emissions with automated offset purchasing.",
    fullDescription:
      "Personal carbon footprint tracker that connects daily activities to environmental impact and suggests actionable ways to reduce emissions with automated offset purchasing.",
    category: "Sustainability",
    status: "Published" as const,
    upvotes: 278,
    comments: 53,
    author: "Jordan Lee",
    timeAgo: "6 hours ago",
    rank: 5,
    trendScore: 85,
  },
  { ...allIdeas[3], rank: 6, trendScore: 82 },
]

export const myIdeas: Idea[] = [
  allIdeas[0],
  allIdeas[5],
  {
    id: "9",
    title: "Virtual Reality Meeting Rooms",
    shortDescription:
      "Immersive VR workspace for remote teams with spatial audio, interactive whiteboards, and realistic avatar interactions.",
    fullDescription:
      "Immersive VR workspace for remote teams with spatial audio, interactive whiteboards, and realistic avatar interactions.",
    category: "Productivity",
    status: "Draft",
    upvotes: 12,
    comments: 3,
    author: "You",
    timeAgo: "3 days ago",
  },
]

export const ideaComments: Comment[] = [
  {
    id: "c1",
    author: "Michael Torres",
    avatar: "/avatars/michael.jpg",
    timeAgo: "1 hour ago",
    content:
      "This is exactly what our team needs! We spend so much time on code reviews. Have you thought about integrating with VS Code as well?",
  },
  {
    id: "c2",
    author: "Jessica Wu",
    avatar: "/avatars/jessica.jpg",
    timeAgo: "45 minutes ago",
    content:
      "Love the idea! How would you handle false positives? That's been a challenge with other automated review tools.",
  },
  {
    id: "c3",
    author: "Ryan O'Connor",
    initials: "RO",
    timeAgo: "30 minutes ago",
    content:
      "Great concept. I'd be interested in seeing how it compares to existing solutions like SonarQube and CodeClimate. What would make this stand out?",
  },
]
