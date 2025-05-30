import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// 验证请求体
const bodySchema = z.object({
  type: z.enum(['view', 'like', 'share'])
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { type } = bodySchema.parse(body)

    const field = `${type}Count` as const
    await prisma.adMaterial.update({
      where: { id },
      data: {
        [field]: { increment: 1 }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('更新统计数据失败:', error)
    return NextResponse.json(
      { error: '更新统计数据失败' },
      { status: 500 }
    )
  }
} 