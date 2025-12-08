'use client'

import type React from 'react'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface ReviewFormProps {
  itemId: string
  onSuccess?: () => void
}

export function ReviewForm({ itemId, onSuccess }: ReviewFormProps) {
  const { currentUser, addReview, reviews } = useAppStore()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const existingReview = reviews.find((r) => r.itemId === itemId && r.userId === currentUser?.id)

  if (!currentUser) {
    return null
  }

  if (existingReview) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">You have already reviewed this item.</p>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    addReview({
      itemId,
      rating,
      comment,
    })

    setRating(0)
    setComment('')
    setIsSubmitting(false)
    onSuccess?.()
  }
  /*  <h2 className="font-mono text-2xl font-black uppercase tracking-tighter"> */
  return (
    <Card className="border-border border-4 border-foreground rounded-none bg-card">
      <CardHeader>
        <CardTitle className="font-mono text-2xl font-black uppercase tracking-tighter">Написати відгук</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Ваша оцінка</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded p-1 transition-colors hover:bg-secondary"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      (hoverRating || rating) > i ? 'fill-primary text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Поділіться своїм досвідом з цим товаром..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="bg-input border-4 border-foreground rounded-sm"
            />
          </div>

          <Button type="submit" disabled={rating === 0 || isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
