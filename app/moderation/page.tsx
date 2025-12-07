"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Shield, CheckCircle, XCircle, Clock, Eye, AlertCircle, PocketKnife as Knife, Watch } from "lucide-react"
import type { Item } from "@/lib/mock-data"

const conditionColors = {
  new: "bg-green-500/20 text-green-400",
  "like-new": "bg-blue-500/20 text-blue-400",
  good: "bg-yellow-500/20 text-yellow-400",
  fair: "bg-orange-500/20 text-orange-400",
}

export default function ModerationPage() {
  const { currentUser, items, updateItemStatus } = useAppStore()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  if (!currentUser?.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <Card className="w-full max-w-md border-border bg-card text-center">
            <CardContent className="p-8">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold">Access Restricted</h2>
              <p className="mt-2 text-muted-foreground">You need moderator privileges to access this page.</p>
              <Button asChild className="mt-6">
                <Link href="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  const pendingItems = items.filter((item) => item.status === "pending")
  const approvedItems = items.filter((item) => item.status === "approved")
  const rejectedItems = items.filter((item) => item.status === "rejected")

  const handleApprove = (item: Item) => {
    updateItemStatus(item.id, "approved")
    setSelectedItem(null)
  }

  const handleReject = () => {
    if (selectedItem) {
      updateItemStatus(selectedItem.id, "rejected")
      setSelectedItem(null)
      setShowRejectDialog(false)
      setRejectReason("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Moderation Dashboard</h1>
                <p className="text-muted-foreground">Review and approve listings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingItems.length}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedItems.length}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rejectedItems.length}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingItems.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved ({approvedItems.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                <XCircle className="h-4 w-4" />
                Rejected ({rejectedItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingItems.length > 0 ? (
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <ModerationCard key={item.id} item={item} onReview={() => setSelectedItem(item)} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CheckCircle}
                  title="All caught up!"
                  description="No items pending review at the moment."
                />
              )}
            </TabsContent>

            <TabsContent value="approved">
              {approvedItems.length > 0 ? (
                <div className="space-y-4">
                  {approvedItems.map((item) => (
                    <ModerationCard
                      key={item.id}
                      item={item}
                      onReview={() => setSelectedItem(item)}
                      showActions={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={AlertCircle}
                  title="No approved items"
                  description="Approved listings will appear here."
                />
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {rejectedItems.length > 0 ? (
                <div className="space-y-4">
                  {rejectedItems.map((item) => (
                    <ModerationCard
                      key={item.id}
                      item={item}
                      onReview={() => setSelectedItem(item)}
                      showActions={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={AlertCircle}
                  title="No rejected items"
                  description="Rejected listings will appear here."
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* Review Dialog */}
      <Dialog open={!!selectedItem && !showRejectDialog} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>Review Listing</DialogTitle>
                <DialogDescription>Review this item before approving or rejecting it.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={selectedItem.images[0] || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className={conditionColors[selectedItem.condition]}>{selectedItem.condition}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {selectedItem.brand}
                    </p>
                    <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                    <p className="mt-1 text-2xl font-bold text-primary">${selectedItem.price.toLocaleString()}</p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">Description</h4>
                    <p className="text-sm">{selectedItem.description}</p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedItem.specs).map(([key, value]) => (
                        <div key={key} className="rounded-lg bg-secondary p-2 text-xs">
                          <p className="text-muted-foreground">{key}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedItem.sellerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedItem.sellerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{selectedItem.sellerName}</p>
                      <p className="text-xs text-muted-foreground">Submitted {selectedItem.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedItem.status === "pending" && (
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="destructive" onClick={() => setShowRejectDialog(true)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(selectedItem)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Reason Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this listing.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ModerationCard({
  item,
  onReview,
  showActions = true,
}: {
  item: Item
  onReview: () => void
  showActions?: boolean
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
          <Image src={item.images[0] || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          <div className="absolute left-1 top-1">
            {item.category === "knife" ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                <Knife className="h-3 w-3 text-primary" />
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                <Watch className="h-3 w-3 text-accent" />
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Badge className={conditionColors[item.condition]}>{item.condition}</Badge>
          </div>
          <h3 className="mt-1 truncate font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">
            {item.brand} • ${item.price.toLocaleString()}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>by {item.sellerName}</span>
            <span>•</span>
            <span>{item.createdAt}</span>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={onReview}>
            <Eye className="mr-2 h-4 w-4" />
            Review
          </Button>
          {showActions && item.status === "pending" && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onReview()
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  // Direct approve from list
                }}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-12 text-center">
      <Icon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}
