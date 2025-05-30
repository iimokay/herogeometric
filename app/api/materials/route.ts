import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// 验证查询参数
const querySchema = z.object({
  page: z.string().optional().transform(val => parseInt(val || '1')),
  limit: z.string().optional().transform(val => parseInt(val || '10')),
  search: z.string().optional(),
})

// 验证删除请求
const deleteSchema = z.object({
  id: z.number()
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, search } = querySchema.parse(Object.fromEntries(searchParams))

    // 构建查询条件
    const where = {
      isDeleted: false,
      ...(search ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      } : {})
    }

    // 获取总数
    const total = await prisma.adMaterial.count({ where })

    // 获取分页数据
    const materials = await prisma.adMaterial.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      data: materials,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('获取材料列表失败:', error)
    return NextResponse.json(
      { error: '获取材料列表失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { id } = deleteSchema.parse(body)

    // 软删除
    await prisma.adMaterial.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除材料失败:', error)
    return NextResponse.json(
      { error: '删除材料失败' },
      { status: 500 }
    )
  }
}

// 更新统计数据的辅助函数
export async function updateStats(id: number, type: 'view' | 'like' | 'share') {
  try {
    const field = `${type}Count` as const
    await prisma.adMaterial.update({
      where: { id },
      data: {
        [field]: { increment: 1 }
      }
    })
  } catch (error) {
    console.error(`更新${type}统计失败:`, error)
  }
} 