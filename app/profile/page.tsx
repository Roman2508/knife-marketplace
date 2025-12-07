"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAppStore } from "@/lib/store";
import { ItemCard } from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  MapPin,
  Calendar,
  Edit,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, updateProfile, items, reviews } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
    location: currentUser?.location || "",
  });
  const [isSaving, setIsSaving] = useState(false);

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
              You need to be signed in
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                asChild
                className="border-4 border-foreground font-mono font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-4 border-foreground font-mono font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] bg-transparent"
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

  const userItems = items.filter((item) => item.sellerId === currentUser.id);
  const approvedItems = userItems.filter((item) => item.status === "approved");
  const userReviews = reviews.filter((r) =>
    userItems.some((item) => item.id === r.itemId)
  );

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateProfile(editForm);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 mt-32 border-t-4 border-foreground">
        {/* Profile Header */}
        <div className="border-b-4 border-foreground bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-foreground shadow-[6px_6px_0_0_rgb(var(--foreground))]">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-3xl font-black text-background">
                    {currentUser.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center border-4 border-foreground bg-green-500 shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                  <CheckCircle className="h-6 w-6 text-background" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-mono text-3xl font-black uppercase tracking-tighter">
                    {currentUser.username}
                  </h1>
                  {currentUser.isAdmin && (
                    <div className="border-4 border-primary bg-primary/20 px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-primary shadow-[2px_2px_0_0_rgb(var(--primary))]">
                      MODERATOR
                    </div>
                  )}
                </div>

                {currentUser.bio && (
                  <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {currentUser.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {currentUser.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {currentUser.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {currentUser.joinedAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {currentUser.rating} ({currentUser.reviewCount})
                  </div>
                </div>
              </div>

              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button className="border-4 border-foreground bg-primary font-mono font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-4 border-foreground shadow-brutal">
                  <DialogHeader>
                    <DialogTitle className="font-mono text-2xl font-black uppercase tracking-tighter">
                      Edit Profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="font-mono text-sm font-bold uppercase tracking-wider"
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={editForm.username}
                        onChange={(e) =>
                          setEditForm({ ...editForm, username: e.target.value })
                        }
                        className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="font-mono text-sm font-bold uppercase tracking-wider"
                      >
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={editForm.location}
                        onChange={(e) =>
                          setEditForm({ ...editForm, location: e.target.value })
                        }
                        className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="font-mono text-sm font-bold uppercase tracking-wider"
                      >
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell others about yourself..."
                        value={editForm.bio}
                        onChange={(e) =>
                          setEditForm({ ...editForm, bio: e.target.value })
                        }
                        rows={4}
                        className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Sidebar Stats */}
            <div className="space-y-6 lg:col-span-1">
              <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
                <div className="mb-6 flex items-center gap-3">
                  <Package className="h-6 w-6" />
                  <h3 className="font-mono text-xl font-black uppercase tracking-tighter">
                    Stats
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Total Listings", value: userItems.length },
                    { label: "Active", value: approvedItems.length },
                    { label: "Reviews", value: userReviews.length },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="border-b-4 border-foreground pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          {stat.label}
                        </span>
                        <span className="font-mono text-2xl font-black">
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="listings" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2 border-4 border-foreground bg-secondary p-0 shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                  <TabsTrigger
                    value="listings"
                    className="font-mono font-black uppercase tracking-wider data-[state=active]:border-4 data-[state=active]:border-foreground data-[state=active]:bg-background data-[state=active]:shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                  >
                    Listings ({approvedItems.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="font-mono font-black uppercase tracking-wider data-[state=active]:border-4 data-[state=active]:border-foreground data-[state=active]:bg-background data-[state=active]:shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                  >
                    Reviews ({userReviews.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="listings">
                  {approvedItems.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2">
                      {approvedItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <div className="border-4 border-foreground bg-card p-16 text-center shadow-brutal">
                      <Package className="mx-auto h-16 w-16 text-muted-foreground" />
                      <h3 className="mt-6 font-mono text-xl font-black uppercase tracking-tighter">
                        No Listings
                      </h3>
                      <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Create your first listing
                      </p>
                      <Button
                        asChild
                        className="mt-6 border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                      >
                        <Link href="/sell">Create Listing</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews">
                  {userReviews.length > 0 ? (
                    <div className="space-y-4">
                      {userReviews.map((review) => {
                        const item = items.find((i) => i.id === review.itemId);
                        return (
                          <div
                            key={review.id}
                            className="border-4 border-foreground bg-card p-6 shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                          >
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-4 border-foreground">
                                <AvatarImage
                                  src={review.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-primary font-black text-background">
                                  {review.username[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-mono font-black uppercase tracking-wider">
                                    {review.username}
                                  </p>
                                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {review.createdAt}
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "fill-primary text-primary"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="mt-3 font-mono text-sm">
                                  {review.comment}
                                </p>
                                {item && (
                                  <Link
                                    href={`/item/${item.id}`}
                                    className="mt-3 inline-block font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                                  >
                                    View Item: {item.title}
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="border-4 border-foreground bg-card p-16 text-center shadow-brutal">
                      <Star className="mx-auto h-16 w-16 text-muted-foreground" />
                      <h3 className="mt-6 font-mono text-xl font-black uppercase tracking-tighter">
                        No Reviews
                      </h3>
                      <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Reviews will appear here
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
