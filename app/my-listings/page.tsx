"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAppStore } from "@/lib/store"
import { ItemCard } from "@/components/item-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"

const statusConfig = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-500/20 text-yellow-400",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "bg-green-500/20 text-green-400",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/20 text-red-400",
    icon: XCircle,
  },
}

export default function MyListingsPage() {
  const { currentUser, items } = useAppStore()

  if (!currentUser) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <Card className="w-full max-w-md border-border bg-card text-center">
            <CardContent className="p-8">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">Sign In Required</h2>
              <p className="mt-2 text-muted-foreground">You need to be signed in to view your listings.</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const myItems = items.filter((item) => item.sellerId === currentUser.id)
  const pendingItems = myItems.filter((item) => item.status === "pending")
  const approvedItems = myItems.filter((item) => item.status === "approved")
  const rejectedItems = myItems.filter((item) => item.status === "rejected")

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8">
            <div>
              <h1 className="text-3xl font-bold">My Listings</h1>
              <p className="mt-2 text-muted-foreground">Manage your items for sale</p>
            </div>
            <Button asChild>
              <Link href="/sell">
                <Plus className="mr-2 h-4 w-4" />
                New Listing
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-secondary">
              <TabsTrigger value="all">All ({myItems.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingItems.length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedItems.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedItems.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {myItems.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {myItems.map((item) => (
                    <div key={item.id} className="relative">
                      <Badge className={`absolute right-3 top-3 z-10 ${statusConfig[item.status].color}`}>
                        {statusConfig[item.status].label}
                      </Badge>
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="pending">
              {pendingItems.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pendingItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No pending listings" />
              )}
            </TabsContent>

            <TabsContent value="approved">
              {approvedItems.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {approvedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No approved listings" />
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {rejectedItems.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rejectedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState message="No rejected listings" />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function EmptyState({ message = "You haven't listed any items yet" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-12 text-center">
      <p className="text-lg font-medium">{message}</p>
      <p className="mt-2 text-muted-foreground">Start selling by creating your first listing.</p>
      <Button asChild className="mt-4">
        <Link href="/sell">
          <Plus className="mr-2 h-4 w-4" />
          Create Listing
        </Link>
      </Button>
    </div>
  )
}
