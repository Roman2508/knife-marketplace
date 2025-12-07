"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, PocketKnife as Knife, Watch } from "lucide-react";

import type { Item } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ItemCardProps {
  item: Item;
}

const conditionColors = {
  new: "bg-green-500 text-black",
  "like-new": "bg-cyan-400 text-black",
  good: "bg-yellow-400 text-black",
  fair: "bg-orange-500 text-black",
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/item/${item.id}`}>
      <div className="group relative overflow-hidden border-4 border-foreground bg-background transition-all duration-300 hover:border-primary hover:shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),0.3)]">
        {/* Image section with diagonal clip */}
        <div
          className="relative aspect-[4/3] overflow-hidden bg-muted"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
        >
          <Image
            src={item.images[0] || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          {/* Condition badge with extreme styling */}
          <div className="absolute left-0 top-0">
            <Badge
              className={`${
                conditionColors[item.condition]
              } rounded-none border-4 border-foreground px-4 py-2 text-xs font-black uppercase tracking-widest`}
            >
              {item.condition.replace("-", " ")}
            </Badge>
          </div>

          {/* Category icon with brutalist box */}
          <div className="absolute right-4 top-4">
            {item.category === "knife" ? (
              <div className="border-4 border-foreground bg-primary p-3">
                <Knife className="h-6 w-6 text-background" />
              </div>
            ) : (
              <div className="border-4 border-foreground bg-accent p-3">
                <Watch className="h-6 w-6 text-background" />
              </div>
            )}
          </div>
        </div>

        {/* Content section with experimental layout */}
        <div className="relative border-t-4 border-foreground bg-card p-6">
          {/* Price tag breaking out of container */}
          <div className="absolute -top-6 right-4 rotate-3 border-4 border-foreground bg-primary px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black text-background">
              ${item.price.toLocaleString()}
            </p>
          </div>

          <div className="mb-4 pr-24">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              {item.brand}
            </p>
            <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-foreground">
              {item.title}
            </h3>
          </div>

          {/* Seller info with brutalist avatar */}
          <div className="flex items-center gap-3 border-t-2 border-dashed border-muted-foreground/30 pt-4">
            <Avatar className="h-10 w-10 border-3 border-foreground">
              <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-accent text-lg font-black text-background">
                {item.sellerName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <span className="block text-sm font-bold text-foreground">
                {item.sellerName}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-bold text-muted-foreground">
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 left-0 h-8 w-8 border-r-4 border-t-4 border-accent"></div>
      </div>
    </Link>
  );
}
