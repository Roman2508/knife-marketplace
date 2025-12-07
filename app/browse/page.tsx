"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ItemCard } from "@/components/item-card";
import { useAppStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  X,
  LayoutGrid,
  Rows3,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

function BrowseContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as
    | "knife"
    | "watch"
    | null;

  const { items, users } = useAppStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(categoryParam || "all");
  const [condition, setCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"cards" | "rows">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const approvedItems = items.filter((item) => item.status === "approved");

  const filteredItems = useMemo(() => {
    let result = approvedItems;

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.brand.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }

    if (condition !== "all") {
      result = result.filter((item) => item.condition === condition);
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [approvedItems, search, category, condition, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useMemo(() => {
    setCurrentPage(1);
  }, [search, category, condition, sortBy]);

  const activeFiltersCount = [category !== "all", condition !== "all"].filter(
    Boolean
  ).length;

  const clearFilters = () => {
    setCategory("all");
    setCondition("all");
    setSearch("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 mt-32 border-t-4 border-foreground">
        <div className="border-b-4 border-foreground bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="font-mono text-4xl font-black uppercase tracking-tighter">
              Browse Listings
            </h1>
            <p className="mt-2 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Discover knives & watches
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="SEARCH BY NAME, BRAND, KEYWORD..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-4 border-foreground bg-background py-6 pl-14 pr-4 font-mono text-base font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50 focus-visible:shadow-[6px_6px_0_0_rgb(var(--foreground))] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[160px] border-4 border-foreground bg-background font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                  <SelectValue placeholder="CATEGORY" />
                </SelectTrigger>
                <SelectContent className="border-4 border-foreground font-mono font-bold uppercase">
                  <SelectItem value="all">ALL ITEMS</SelectItem>
                  <SelectItem value="knife">KNIVES</SelectItem>
                  <SelectItem value="watch">WATCHES</SelectItem>
                </SelectContent>
              </Select>

              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-[160px] border-4 border-foreground bg-background font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                  <SelectValue placeholder="CONDITION" />
                </SelectTrigger>
                <SelectContent className="border-4 border-foreground font-mono font-bold uppercase">
                  <SelectItem value="all">ANY</SelectItem>
                  <SelectItem value="new">NEW</SelectItem>
                  <SelectItem value="like-new">LIKE NEW</SelectItem>
                  <SelectItem value="good">GOOD</SelectItem>
                  <SelectItem value="fair">FAIR</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-4 border-foreground bg-background font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                  <SelectValue placeholder="SORT BY" />
                </SelectTrigger>
                <SelectContent className="border-4 border-foreground font-mono font-bold uppercase">
                  <SelectItem value="newest">NEWEST</SelectItem>
                  <SelectItem value="price-low">PRICE: LOW</SelectItem>
                  <SelectItem value="price-high">PRICE: HIGH</SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-4 border-foreground bg-background font-mono font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:bg-foreground hover:text-background"
                >
                  <X className="mr-2 h-4 w-4" />
                  CLEAR ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="inline-block border-4 border-foreground bg-secondary px-6 py-3 font-mono text-sm font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]">
              {filteredItems.length} RESULTS
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode("cards")}
                variant={viewMode === "cards" ? "default" : "outline"}
                size="icon"
                className={cn(
                  "border-4 border-foreground shadow-[4px_4px_0_0_rgb(var(--foreground))]",
                  viewMode === "cards"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-foreground hover:text-background"
                )}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => setViewMode("rows")}
                variant={viewMode === "rows" ? "default" : "outline"}
                size="icon"
                className={cn(
                  "border-4 border-foreground shadow-[4px_4px_0_0_rgb(var(--foreground))]",
                  viewMode === "rows"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-foreground hover:text-background"
                )}
              >
                <Rows3 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {paginatedItems.length > 0 ? (
            <>
              {viewMode === "cards" ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedItems.map((item) => {
                    const seller = users.find((u) => u.id === item.sellerId);
                    return (
                      <Link
                        key={item.id}
                        href={`/item/${item.id}`}
                        className="flex flex-col gap-4 border-4 border-foreground bg-card p-4 shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] sm:flex-row sm:gap-6 sm:p-6"
                      >
                        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden border-4 border-foreground bg-secondary sm:h-40 sm:w-40">
                          <img
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute right-2 top-2 border-2 border-foreground bg-background px-3 py-1 font-mono text-xs font-black uppercase shadow-[2px_2px_0_0_rgb(var(--foreground))]">
                            {item.category}
                          </div>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate font-mono text-xl font-black uppercase tracking-tighter sm:text-2xl">
                                {item.title}
                              </h3>
                              <p className="mt-1 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                {item.brand}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-left sm:text-right">
                              <p className="font-mono text-2xl font-black uppercase tracking-tighter text-primary sm:text-3xl">
                                ${item.price}
                              </p>
                              <div className="mt-1 inline-block border-2 border-foreground bg-accent px-3 py-1 font-mono text-xs font-black uppercase text-background shadow-[2px_2px_0_0_rgb(var(--foreground))]">
                                {item.condition}
                              </div>
                            </div>
                          </div>

                          <p className="mt-3 line-clamp-2 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                            {item.description}
                          </p>

                          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-foreground">
                                <AvatarImage
                                  src={seller?.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback className="bg-primary font-black text-background">
                                  {seller?.username[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-mono text-sm font-black uppercase tracking-wider">
                                  {seller?.username}
                                </p>
                                {seller && seller.rating > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-primary text-primary" />
                                    <span className="font-mono text-xs font-bold uppercase">
                                      {seller.rating} ({seller.reviewCount})
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {item.createdAt}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          variant={currentPage === page ? "default" : "outline"}
                          className={cn(
                            "border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]",
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "bg-background hover:bg-foreground hover:text-background"
                          )}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="border-4 border-foreground bg-card p-16 text-center shadow-brutal">
              <p className="font-mono text-2xl font-black uppercase tracking-tighter">
                No Items Found
              </p>
              <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Try adjusting your filters
              </p>
              <Button
                onClick={clearFilters}
                className="mt-6 border-4 border-foreground bg-primary font-mono font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
