"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PocketKnife as Knife, Watch, Plus, X, AlertCircle, CheckCircle, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 10

export default function SellPage() {
  const router = useRouter()
  const { currentUser, addItem } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string>("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "" as "knife" | "watch" | "",
    condition: "" as "new" | "like-new" | "good" | "fair" | "",
    brand: "",
  })

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])

  if (!currentUser) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md border-4 border-foreground bg-card p-8 text-center shadow-brutal">
            <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 font-mono text-2xl font-black uppercase tracking-tighter">Sign In Required</h2>
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              List your items
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                asChild
                className="border-4 border-foreground font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-4 border-foreground bg-transparent font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))]"
              >
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadError("")

    if (uploadedImages.length + files.length > MAX_FILES) {
      setUploadError(`Maximum ${MAX_FILES} images allowed`)
      return
    }

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Only image files are allowed")
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`Images must be under 5MB (${file.name} is too large)`)
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImages((prev) => [...prev, event.target?.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }])
  }

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = value
    setSpecs(newSpecs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadedImages.length === 0) {
      setUploadError("Please upload at least one image")
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const specsObject = specs.reduce(
      (acc, { key, value }) => {
        if (key && value) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, string>,
    )

    addItem({
      title: formData.title,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category as "knife" | "watch",
      condition: formData.condition as "new" | "like-new" | "good" | "fair",
      brand: formData.brand,
      images:
        uploadedImages.length > 0
          ? uploadedImages
          : [`/placeholder.svg?height=400&width=400&query=${formData.category} ${formData.brand}`],
      specs: specsObject,
    })

    setSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      router.push("/my-listings")
    }, 2000)
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md border-4 border-foreground bg-card p-8 text-center shadow-brutal">
            <div className="mx-auto flex h-20 w-20 items-center justify-center border-4 border-green-500 bg-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="mt-6 font-mono text-2xl font-black uppercase tracking-tighter">Listing Submitted!</h2>
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Review in progress
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="border-b-4 border-foreground bg-secondary">
          <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-mono text-4xl font-black uppercase tracking-tighter">Sell an Item</h1>
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
              List your knife or watch
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-mono text-xl font-black uppercase tracking-tighter">Category</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, category: "knife" })}
                  className={`group flex items-center gap-4 border-4 border-foreground p-6 shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                    formData.category === "knife" ? "bg-primary text-primary-foreground" : "bg-card"
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-foreground bg-background/20">
                    <Knife className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono font-black uppercase tracking-wider">Knife</p>
                    <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider opacity-70">
                      Tactical / EDC
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, category: "watch" })}
                  className={`group flex items-center gap-4 border-4 border-foreground p-6 shadow-[4px_4px_0_0_rgb(var(--foreground))] transition-all hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                    formData.category === "watch" ? "bg-accent text-background" : "bg-card"
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-foreground bg-background/20">
                    <Watch className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <p className="font-mono font-black uppercase tracking-wider">Watch</p>
                    <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider opacity-70">
                      Luxury / Sport
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4 border-4 border-foreground bg-card p-6 shadow-brutal">
              <h2 className="font-mono text-xl font-black uppercase tracking-tighter">Product Images</h2>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Upload up to {MAX_FILES} images (max 5MB each)
              </p>

              {uploadError && (
                <div className="border-4 border-red-500 bg-red-500/20 p-4">
                  <p className="font-mono text-sm font-bold uppercase text-red-500">{uploadError}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square border-4 border-foreground bg-secondary shadow-[2px_2px_0_0_rgb(var(--foreground))]"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 border-2 border-foreground bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}

                {uploadedImages.length < MAX_FILES && (
                  <label className="group flex aspect-square cursor-pointer flex-col items-center justify-center border-4 border-dashed border-foreground bg-secondary shadow-[2px_2px_0_0_rgb(var(--foreground))] transition-all hover:border-solid hover:bg-card">
                    <Upload className="h-8 w-8 text-muted-foreground group-hover:text-foreground" />
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                      Upload
                    </p>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4 border-4 border-foreground bg-card p-6 shadow-brutal">
              <h2 className="font-mono text-xl font-black uppercase tracking-tighter">Item Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="font-mono text-xs font-black uppercase tracking-wider">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    placeholder="BENCHMADE, ROLEX..."
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                    className="border-4 border-foreground bg-background py-6 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-mono text-xs font-black uppercase tracking-wider">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="PRODUCT NAME..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="border-4 border-foreground bg-background py-6 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-mono text-xs font-black uppercase tracking-wider">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="DESCRIBE YOUR ITEM..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="border-4 border-foreground bg-background font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="font-mono text-xs font-black uppercase tracking-wider">
                      Price (USD)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="1"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="border-4 border-foreground bg-background py-6 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs font-black uppercase tracking-wider">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) =>
                        setFormData({ ...formData, condition: value as typeof formData.condition })
                      }
                      required
                    >
                      <SelectTrigger className="border-4 border-foreground bg-background py-6 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))]">
                        <SelectValue placeholder="SELECT..." />
                      </SelectTrigger>
                      <SelectContent className="border-4 border-foreground font-mono font-black uppercase">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-4 border-foreground bg-card p-6 shadow-brutal">
              <h2 className="font-mono text-xl font-black uppercase tracking-tighter">Specifications</h2>
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      placeholder="SPEC NAME..."
                      value={spec.key}
                      onChange={(e) => updateSpec(index, "key", e.target.value)}
                      className="flex-1 border-4 border-foreground bg-background py-5 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                    />
                    <Input
                      placeholder="VALUE..."
                      value={spec.value}
                      onChange={(e) => updateSpec(index, "value", e.target.value)}
                      className="flex-1 border-4 border-foreground bg-background py-5 font-mono font-bold uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] placeholder:text-muted-foreground/50"
                    />
                    {specs.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpec(index)}
                        className="border-4 border-foreground bg-destructive shadow-[4px_4px_0_0_rgb(var(--foreground))]"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpec}
                  className="w-full border-4 border-foreground bg-transparent font-mono font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Spec
                </Button>
              </div>
            </div>

            <div className="border-4 border-foreground bg-card p-6 shadow-brutal">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 shrink-0 text-primary" />
                <p className="font-mono text-sm font-bold uppercase tracking-wider">
                  All listings reviewed within 24h.{" "}
                  <Link href="#" className="underline">
                    View Guidelines
                  </Link>
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full border-4 border-foreground py-8 font-mono text-lg font-black uppercase shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))]"
              disabled={isSubmitting || !formData.category || !formData.condition || uploadedImages.length === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
