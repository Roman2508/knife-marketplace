"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewForm } from "@/components/review-form";
import {
  Star,
  MessageSquare,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";

const conditionColors = {
  new: "border-green-500 bg-green-500/20 text-green-500",
  "like-new": "border-blue-500 bg-blue-500/20 text-blue-500",
  good: "border-yellow-500 bg-yellow-500/20 text-yellow-500",
  fair: "border-orange-500 bg-orange-500/20 text-orange-500",
};

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { items, users, reviews, currentUser } = useAppStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewKey, setReviewKey] = useState(0);

  const item = items.find((i) => i.id === id);
  const seller = users.find((u) => u.id === item?.sellerId);
  const itemReviews = reviews.filter((r) => r.itemId === id);

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="border-4 border-foreground bg-card p-12 text-center shadow-brutal">
            <h1 className="font-mono text-3xl font-black uppercase tracking-tighter">
              Item Not Found
            </h1>
            <p className="mt-4 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Removed or doesn&apos;t exist
            </p>
            <Button
              asChild
              className="mt-6 border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
            >
              <Link href="/browse">Browse Listings</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + item.images.length) % item.images.length
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 mt-32 border-t-4 border-foreground">
        <div className="border-b-4 border-foreground bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="border-4 border-foreground bg-background font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            <div className="space-y-4 w-full max-w-xl mx-auto">
              <div className="relative aspect-square overflow-hidden border-4 border-foreground bg-secondary shadow-brutal">
                <Image
                  fill
                  alt={item.title}
                  className="object-cover"
                  src={item.images[currentImageIndex] || "/placeholder.svg"}
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 border-4 border-foreground bg-background p-2 shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 border-4 border-foreground bg-background p-2 shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {item.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-3 w-3 border-2 border-foreground transition-colors ${
                            index === currentImageIndex
                              ? "bg-primary"
                              : "bg-background"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-24 w-24 shrink-0 overflow-hidden border-4 border-foreground bg-secondary shadow-[2px_2px_0_0_rgb(var(--foreground))] ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${item.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div
                    className={`border-4 px-4 py-2 font-mono text-xs font-black uppercase ${
                      conditionColors[item.condition]
                    }`}
                  >
                    {item.condition.replace("-", " ")}
                  </div>
                  <div className="border-4 border-foreground bg-accent px-4 py-2 font-mono text-xs font-black uppercase text-background">
                    {item.category}
                  </div>
                </div>
                <p className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {item.brand}
                </p>
                <h1 className="mt-2 font-mono text-3xl font-black uppercase tracking-tighter lg:text-4xl">
                  {item.title}
                </h1>
                <p className="mt-6 font-mono text-5xl font-black uppercase tracking-tighter text-primary">
                  {/* <span className="text-4xl">₴ </span> */}
                  {item.price.toLocaleString()}
                  <span className="text-4xl"> ГРН</span>
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-16 border-4 border-foreground bg-primary px-10 text-base font-black uppercase tracking-wider text-primary-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
                >
                  <Link href="/browse">Купити зараз</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 border-4 !border-foreground bg-background px-10 text-base font-black uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:text-foreground hover:-translate-x-1 hover:-translate-y-1 hover:bg-accent hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
                >
                  <div className="">
                    <span>Додати до кошика</span>
                    <ShoppingCart className="ml-2 h-10 w-10" />
                  </div>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-16 border-4 !border-foreground bg-background px-10 text-base font-black uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:text-foreground hover:-translate-x-1 hover:-translate-y-1 hover:bg-accent hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
                >
                  <Link href="/register">Зробити пропозицію</Link>
                </Button>
              </div>

              <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
                <h2 className="mb-3 font-mono text-lg font-black uppercase tracking-tighter">
                  Description
                </h2>
                <p className="font-mono text-sm font-bold leading-relaxed tracking-wider text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
                <h2 className="mb-4 font-mono text-lg font-black uppercase tracking-tighter">
                  Specifications
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="border-4 border-foreground bg-secondary p-3"
                    >
                      <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {key}
                      </p>

                      <p className="mt-1 font-mono text-sm font-black uppercase tracking-wider">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-4 border-foreground">
                      <AvatarImage src={seller?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary font-mono font-black text-background">
                        {seller?.username[0] || "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-black uppercase tracking-wider">
                          {seller?.username}
                        </span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>{seller?.rating || 0}</span>
                        <span>•</span>
                        <span>{seller?.reviewCount || 0} reviews</span>
                      </div>
                    </div>
                  </div>
                  {currentUser && currentUser.id !== item.sellerId && (
                    <Button
                      asChild
                      className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
                    >
                      <Link href={`/messages?user=${item.sellerId}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {seller?.location || "Location not specified"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Listed {item.createdAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-4 border-primary bg-primary/10 p-6 shadow-brutal">
                <Shield className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-mono text-base font-black uppercase tracking-tighter">
                    Buyer Protection
                  </p>
                  <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    All transactions protected
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <section className="mt-12">
            <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
              <h2 className="mb-4 font-mono text-lg font-black uppercase tracking-tighter">Specifications</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(item.specs).map(([key, value]) => (
                  <div key={key} className="border-4 border-foreground bg-secondary p-3">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">{key}</p>
                    <p className="mt-1 font-mono text-sm font-black uppercase tracking-wider">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          <section className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {currentUser && currentUser.id !== item.sellerId && (
                <div className="lg:col-span-1">
                  <ReviewForm
                    itemId={id}
                    onSuccess={() => setReviewKey((k) => k + 1)}
                  />
                </div>
              )}

              <div
                className={
                  currentUser && currentUser.id !== item.sellerId
                    ? "lg:col-span-2"
                    : "lg:col-span-3"
                }
              >
                <div
                  className="border-4 border-foreground bg-card shadow-brutal"
                  key={reviewKey}
                >
                  <div className="border-b-4 border-foreground bg-secondary p-6">
                    <h2 className="font-mono text-2xl font-black uppercase tracking-tighter">
                      Відгуки ({itemReviews.length})
                    </h2>
                  </div>
                  <div className="p-6">
                    {itemReviews.length > 0 ? (
                      <div className="space-y-4">
                        {itemReviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-4 border-foreground bg-secondary p-4 shadow-[2px_2px_0_0_rgb(var(--foreground))]"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border-4 border-foreground">
                                <AvatarImage
                                  src={review.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-primary font-mono font-black text-background">
                                  {review.username[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-mono text-base font-black uppercase tracking-wider">
                                  {review.username}
                                </p>
                                <div className="flex items-center gap-1">
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
                                  <span className="ml-2 font-mono text-xs font-bold uppercase text-muted-foreground">
                                    {review.createdAt}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-3 font-mono text-sm font-bold leading-relaxed tracking-wider text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="py-8 text-center font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Ще немає відгуків
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
