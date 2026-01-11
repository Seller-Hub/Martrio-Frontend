// src/app/(dashboard)/products/add/page.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";

const FIELD = "h-11 rounded-xl";

export default function AddProductPage() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const list = Array.from(e.dataTransfer.files || []);
    if (list.length) setFiles(list.slice(0, 8));
  }, []);

  const onBrowse = () => fileInputRef.current?.click();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#F5F7FB] px-4 pb-10 pt-6 md:px-6">
      {/* Top row: title + actions */}
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Products</h1>
          <div className="mt-1 text-sm text-muted-foreground">
            <Link href="/products" className="hover:underline">Products</Link>
            <span className="px-1">/</span>
            <span className="text-foreground">Add Product</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-xl">Save as Draft</Button>
          <Button className="rounded-xl bg-[#206cec] hover:bg-[#206cec]/90 text-white">Publish</Button>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-6 grid w-full max-w-[1200px] gap-6 lg:grid-cols-3">
        {/* LEFT column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* General information */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="sr-only">Product Name</Label>
                <Input id="name" placeholder="Product Name" className={`${FIELD} placeholder:text-muted-foreground/60`} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="sr-only">Product Description</Label>
                <Textarea
                  id="desc"
                  rows={5}
                  placeholder="Product Description"
                  className="rounded-xl placeholder:text-muted-foreground/60"
                />
                <div className="text-right text-xs text-muted-foreground">0/100</div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Select>
                  <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                    <SelectValue placeholder="Colors" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Product Settings */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Product Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select>
                <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="bottoms">Bottoms</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Tags" className={`${FIELD} placeholder:text-muted-foreground/60`} />

              <Select>
                <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT column (1/3) */}
        <div className="space-y-6">
          {/* Upload image */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 border-dashed",
                  "border-muted-foreground/30 p-8 text-center"
                )}
              >
                <CloudUpload className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">Drag and drop a file to upload</p>
                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                <div className="my-4 text-xs text-muted-foreground">OR</div>
                <Button type="button" onClick={onBrowse} className="rounded-xl">
                  Browse Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                {files.length > 0 && (
                  <ul className="mt-4 w-full list-disc text-left text-xs text-muted-foreground">
                    {files.map((f) => (
                      <li key={f.name} className="truncate">{f.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Pricing and Stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input type="number" placeholder="Base Pricing" className={`${FIELD} placeholder:text-muted-foreground/60`} />
                <Input type="number" placeholder="Stock Amount" className={`${FIELD} placeholder:text-muted-foreground/60`} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Select>
                  <SelectTrigger className={`w-full ${FIELD} px-3 [&_[data-placeholder]]:text-muted-foreground/60`}>
                    <SelectValue placeholder="Discount Type" />
                  </SelectTrigger>
                  <SelectContent className="w-[--radix-select-trigger-width]">
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="percent">Percent</SelectItem>
                    <SelectItem value="amount">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="Discount Amount" className={`${FIELD} placeholder:text-muted-foreground/60`} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
