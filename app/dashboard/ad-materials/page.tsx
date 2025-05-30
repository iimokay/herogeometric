"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/hooks/use-translation"
import { ImageIcon, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
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

interface AdMaterial {
  id: string
  title: string
  description: string
  images: string[]
  createdAt: string
}

export default function AdMaterialsPage() {
  const { language } = useTranslation()
  const { toast } = useToast()
  const [materials, setMaterials] = useState<AdMaterial[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [materialToDelete, setMaterialToDelete] = useState<AdMaterial | null>(null)

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
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    const promises: Promise<void>[] = []

    for (let i = 0; i < files.length; i++) {
      if (i >= 3) break // 最多3张图片

      const file = files[i]
      const promise = new Promise<void>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target?.result as string
          newImages.push(base64)
          resolve()
        }
        reader.readAsDataURL(file)
      })
      promises.push(promise)
    }

    Promise.all(promises).then(() => {
      setImages((prev) => [...prev, ...newImages].slice(0, 3))
    })
  }

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // 创建广告素材
  const handleCreate = async () => {
    if (!title || !description) {
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
        body: JSON.stringify({
          title,
          description,
          images,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "创建失败")
      }

      // 重置表单
      setTitle("")
      setDescription("")
      setImages([])

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

  // 删除广告素材
  const handleDelete = async () => {
    if (!materialToDelete) return

    try {
      const response = await fetch(`/api/ad-materials/${materialToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("删除失败")
      }

      // 刷新列表
      await fetchMaterials()

      toast({
        title: language === "en" ? "Success" : "成功",
        description: language === "en" ? "Ad material deleted successfully" : "广告素材删除成功",
      })
    } catch (error) {
      console.error("删除广告素材失败:", error)
      toast({
        title: language === "en" ? "Error" : "错误",
        description: error instanceof Error ? error.message : "删除广告素材失败",
        variant: "destructive",
      })
    } finally {
      setMaterialToDelete(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 创建表单 */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Create Ad Material" : "创建广告素材"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "Add a new ad material with title, description and up to 3 images"
                : "添加新的广告素材，包含标题、描述和最多3张图片"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === "en" ? "Title" : "标题"}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === "en" ? "Enter title" : "输入标题"}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === "en" ? "Description" : "描述"}
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={language === "en" ? "Enter description" : "输入描述"}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  {language === "en" ? "Images (Max 3)" : "图片（最多3张）"}
                </label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 3 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        multiple
                      />
                      <Plus className="h-6 w-6 text-gray-400" />
                    </label>
                  )}
                </div>
              </div>

              <Button
                onClick={handleCreate}
                disabled={loading}
                className="w-full"
              >
                {loading
                  ? language === "en"
                    ? "Creating..."
                    : "创建中..."
                  : language === "en"
                  ? "Create"
                  : "创建"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 素材列表 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            {language === "en" ? "Ad Materials" : "广告素材"}
          </h2>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : materials.length === 0 ? (
            <div className="text-gray-500">
              {language === "en" ? "No ad materials yet" : "暂无广告素材"}
            </div>
          ) : (
            materials.map((material) => (
              <Card key={material.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {material.images[0] && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={material.images[0]}
                          alt={material.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{material.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {material.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(material.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMaterialToDelete(material)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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
              onClick={handleDelete}
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