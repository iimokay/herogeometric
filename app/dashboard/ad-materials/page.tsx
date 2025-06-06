"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface AdMaterial {
  id: string
  title: string
  description: string
  images: string[]
  theme: string
  textMatchDescription: string
  imageMatchDescription: string
  textInjectionPrompt: string
  imageInjectionPrompt: string
  createdAt: string
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  theme: z.string().min(1, "Theme is required"),
  textMatchDescription: z.string().min(1, "Text match description is required"),
  imageMatchDescription: z.string().min(1, "Image match description is required"),
  textInjectionPrompt: z.string().min(1, "Text injection prompt is required"),
  imageInjectionPrompt: z.string().min(1, "Image injection prompt is required"),
})

export default function AdMaterialsPage() {
  const { language } = useTranslation()
  const { toast } = useToast()
  const [materials, setMaterials] = useState<AdMaterial[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [materialToDelete, setMaterialToDelete] = useState<AdMaterial | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      theme: "",
      textMatchDescription: "",
      imageMatchDescription: "",
      textInjectionPrompt: "",
      imageInjectionPrompt: "",
    },
  })

  // 加载广告素材列表
  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      setError(null)
      const response = await fetch("/api/ad-materials")
      if (!response.ok) {
        throw new Error("获取广告素材失败")
      }
      const data = await response.json()
      setMaterials(data)
    } catch (error) {
      console.error("获取广告素材失败:", error)
      setError(error instanceof Error ? error.message : "获取广告素材失败")
      toast({
        title: language === "en" ? "Error" : "错误",
        description: language === "en" ? "Failed to fetch ad materials" : "获取广告素材失败",
        variant: "destructive",
      })
    }
  }

  // 处理图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    const promises: Promise<void>[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        if (i >= 3) {
          toast({
            title: language === "en" ? "Warning" : "警告",
            description: language === "en" ? "Maximum 3 images allowed" : "最多只能上传3张图片",
            variant: "destructive",
          })
          break
        }

        const file = files[i]

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          toast({
            title: language === "en" ? "Error" : "错误",
            description: language === "en" ? "Only image files are allowed" : "只允许上传图片文件",
            variant: "destructive",
          })
          continue
        }

        // 验证文件大小（最大5MB）
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: language === "en" ? "Error" : "错误",
            description: language === "en" ? "Image size should be less than 5MB" : "图片大小不能超过5MB",
            variant: "destructive",
          })
          continue
        }

        const promise = new Promise<void>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const base64 = e.target?.result as string
            newImages.push(base64)
            resolve()
          }
          reader.onerror = () => {
            reject(new Error("Failed to read file"))
          }
          reader.readAsDataURL(file)
        })
        promises.push(promise)
      }

      await Promise.all(promises)
      form.setValue("images", newImages)

      if (newImages.length > 0) {
        toast({
          title: language === "en" ? "Success" : "成功",
          description: language === "en" ? "Images uploaded successfully" : "图片上传成功",
        })
      }
    } catch (error) {
      console.error("图片上传失败:", error)
      toast({
        title: language === "en" ? "Error" : "错误",
        description: language === "en" ? "Failed to upload images" : "图片上传失败",
        variant: "destructive",
      })
    }
  }

  // 删除图片
  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues("images")
    form.setValue("images", currentImages.filter((_, i) => i !== index))
  }

  // 创建广告素材
  const handleCreate = async () => {
    if (!form.getValues("title") || !form.getValues("description")) {
      toast({
        title: language === "en" ? "Error" : "错误",
        description: language === "en" ? "Please fill in all required fields" : "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/ad-materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "创建失败")
      }

      // 重置表单
      form.reset()

      // 刷新列表
      await fetchMaterials()

      toast({
        title: language === "en" ? "Success" : "成功",
        description: language === "en" ? "Ad material created successfully" : "广告素材创建成功",
      })
    } catch (error) {
      console.error("创建广告素材失败:", error)
      toast({
        title: language === "en" ? "Error" : "错误",
        description: error instanceof Error ? error.message : "创建广告素材失败",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (material: AdMaterial) => {
    form.reset({
      title: material.title,
      description: material.description,
      images: material.images,
      theme: material.theme,
      textMatchDescription: material.textMatchDescription,
      imageMatchDescription: material.imageMatchDescription,
      textInjectionPrompt: material.textInjectionPrompt,
      imageInjectionPrompt: material.imageInjectionPrompt,
    })
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ad-materials/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete material")
      }
      setMaterials(materials.filter((m) => m.id !== id))
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete material")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Ad Materials</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 创建表单卡片 */}
          <Card className="bg-white/5 border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Create New Material</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter description" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel className="text-white">Images (Max 3)</FormLabel>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      {form.getValues("images").map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`Uploaded ${index + 1}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {form.getValues("images").length < 3 && (
                        <label className="aspect-square border-2 border-dashed border-white/20 rounded-md flex items-center justify-center cursor-pointer hover:border-white/30 bg-white/5">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            multiple
                          />
                          <Plus className="h-6 w-6 text-white/60" />
                        </label>
                      )}
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Theme</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ad theme" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="textMatchDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Text Match Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter text match description" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageMatchDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Image Match Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter image match description" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="textInjectionPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Text Injection Prompt</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter text injection prompt" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageInjectionPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Image Injection Prompt</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter image injection prompt" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                    Create Material
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* 素材列表卡片 */}
          <Card className="bg-white/5 border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Materials List</CardTitle>
            </CardHeader>
            <CardContent>
              {materials.length === 0 ? (
                <p className="text-center text-white/60">No materials found</p>
              ) : (
                <div className="space-y-4">
                  {materials.map((material) => (
                    <Card key={material.id} className="bg-white/5 border border-white/10 p-4">
                      <div className="space-y-2">
                        <div className="flex gap-4">
                          {/* 图片缩略图 */}
                          <div className="relative w-24 h-24 flex-shrink-0">
                            {material.images[0] ? (
                              <Image
                                src={material.images[0]}
                                alt={material.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-full h-full bg-white/10 rounded-md flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-white/40" />
                              </div>
                            )}
                          </div>
                          {/* 内容区域 */}
                          <div className="flex-1">
                            <h3 className="font-medium text-white">{material.title}</h3>
                            <p className="text-sm text-white/60">{material.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                              <div>
                                <span className="font-medium text-white">Theme:</span>
                                <p className="text-white/60">{material.theme}</p>
                              </div>
                              <div>
                                <span className="font-medium text-white">Text Match:</span>
                                <p className="text-white/60">{material.textMatchDescription}</p>
                              </div>
                              <div>
                                <span className="font-medium text-white">Image Match:</span>
                                <p className="text-white/60">{material.imageMatchDescription}</p>
                              </div>
                              <div>
                                <span className="font-medium text-white">Text Injection:</span>
                                <p className="text-white/60">{material.textInjectionPrompt}</p>
                              </div>
                              <div>
                                <span className="font-medium text-white">Image Injection:</span>
                                <p className="text-white/60">{material.imageInjectionPrompt}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(material)} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(material.id)} className="bg-red-500 hover:bg-red-600 text-white">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 删除确认对话框 */}
      <AlertDialog open={!!materialToDelete} onOpenChange={() => setMaterialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "en" ? "Delete Ad Material" : "删除广告素材"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en"
                ? "Are you sure you want to delete this ad material? This action cannot be undone."
                : "您确定要删除这个广告素材吗？此操作无法撤销。"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === "en" ? "Cancel" : "取消"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(materialToDelete?.id || "")}
              className="bg-red-500 hover:bg-red-600"
            >
              {language === "en" ? "Delete" : "删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 