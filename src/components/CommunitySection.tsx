import { useState } from "react";
import { Heart, MessageCircle, Share2, Plus, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EcoRating } from "./EcoRating";
import { cn } from "@/lib/utils";

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  image: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  ecoRating: number;
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  timeAgo: string;
}

const mockPosts: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b601?w=40&h=40&fit=crop&crop=face",
      isVerified: true
    },
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    title: "Amazing organic cotton dress from FabIndia",
    description: "Found this beautiful handloom dress at FabIndia Mumbai. Perfect for office wear and so comfortable!",
    brand: "FabIndia",
    price: 2499,
    ecoRating: 4.5,
    tags: ["Organic", "Handloom", "Local"],
    likes: 34,
    comments: 8,
    isLiked: false,
    timeAgo: "2h ago"
  },
  {
    id: "2",
    user: {
      name: "Rahul Gupta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=300&fit=crop",
    title: "Thrifted this vintage jacket for ₹500!",
    description: "Check out this amazing find from Sarojini Nagar market. Vintage leather jacket in perfect condition.",
    brand: "Vintage Find",
    price: 500,
    ecoRating: 5,
    tags: ["Thrift", "Vintage", "Delhi"],
    likes: 67,
    comments: 15,
    isLiked: true,
    timeAgo: "1d ago"
  }
];

interface CommunitySectionProps {
  className?: string;
}

export const CommunitySection = ({ className }: CommunitySectionProps) => {
  const [posts, setPosts] = useState(mockPosts);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-eco/20">
            <MessageCircle className="w-5 h-5 text-eco" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Community Finds</h2>
            <p className="text-sm text-muted-foreground">
              Discover and share sustainable fashion finds from the community
            </p>
          </div>
        </div>
        
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-eco hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4 mr-2" />
              Share Find
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-eco" />
                Share Your Sustainable Find
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Item name..." />
              <Input placeholder="Brand..." />
              <Input placeholder="Price (₹)..." type="number" />
              <Input placeholder="Where did you find it?" />
              <Textarea placeholder="Tell us about this find..." rows={3} />
              <Button className="w-full bg-gradient-eco hover:opacity-90">
                Share with Community
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-border/50 hover:border-eco/50 transition-all duration-300">
            <div className="relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-eco/90 text-white backdrop-blur-sm">
                  ₹{post.price.toLocaleString()}
                </Badge>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <img src={post.user.avatar} alt={post.user.name} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{post.user.name}</span>
                    {post.user.isVerified && (
                      <div className="w-4 h-4 rounded-full bg-eco flex items-center justify-center">
                        <Leaf className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {post.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <EcoRating rating={post.ecoRating} size="sm" showLabel={false} />
                <span className="text-sm font-medium text-eco">{post.brand}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-sm hover:text-eco transition-colors"
                  >
                    <Heart className={cn(
                      "w-4 h-4",
                      post.isLiked ? "fill-eco text-eco" : "text-muted-foreground"
                    )} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-eco transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>
                <button className="text-sm text-muted-foreground hover:text-eco transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};