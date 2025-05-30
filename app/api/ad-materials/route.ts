import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// 验证请求体的 schema
const createMaterialSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  description: z.string().min(1, "描述不能为空"),
  images: z.array(z.string()).max(3, "最多只能上传3张图片"),
})

// 获取所有广告素材
export async function GET() {
  try {
    const materials = await prisma.adMaterial.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(materials)
  } catch (error) {
    console.error("获取广告素材失败:", error)
    return NextResponse.json(
      { error: "获取广告素材失败" },
      { status: 500 }
    )
  }
}

// 创建新的广告素材
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createMaterialSchema.parse(body)

    const material = await prisma.adMaterial.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        images: validatedData.images,
      },
    })

    return NextResponse.json(material)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("创建广告素材失败:", error)
    return NextResponse.json(
      { error: "创建广告素材失败" },
      { status: 500 }
    )
  }
} 