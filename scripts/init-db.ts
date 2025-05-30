import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // 创建示例广告素材
    const materials = [
      {
        title: "Luxury Cat Bed",
        description: "Ultra-soft comfort for your feline friend",
        type: "image",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mat.jpg-3mkKl51FqLq9H7NDGQVmXGomVKG8Z7.jpeg"
        ]
      },
      {
        title: "Stylish Pet Sunglasses",
        description: "UV protection with maximum cuteness",
        type: "video",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sunglasses-lps8GxDOJM1wapurHWJ4WGepYlGYE1.mp4"
        ]
      },
      {
        title: "Premium Cat Food",
        description: "Nutritious meals for your beloved pet",
        type: "image",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/food.jpg-x9KxqYvHq9B7wGrVX0Mzc7Cl9Cvhzu.jpeg"
        ]
      }
    ]

    console.log('开始初始化数据库...')

    // 清空现有数据
    await prisma.adMaterial.deleteMany()
    console.log('已清空现有数据')

    // 创建新数据
    for (const material of materials) {
      await prisma.adMaterial.create({
        data: material
      })
    }
    console.log('已创建示例数据')

    console.log('数据库初始化完成！')
  } catch (error) {
    console.error('数据库初始化失败:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 