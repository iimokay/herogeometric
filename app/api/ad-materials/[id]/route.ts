import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.adMaterial.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("删除广告素材失败:", error)
    return NextResponse.json(
      { error: "删除广告素材失败" },
      { status: 500 }
    )
  }
} 