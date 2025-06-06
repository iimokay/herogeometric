import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // 创建示例广告素材
    const materials = [
      {
        title: "Fashion Sunglasses",
        description: "Express your unique style with our trendy accessories",
        images: [
          "https://cdn.pixabay.com/photo/2016/11/21/17/21/eyeglasses-1846595_960_720.jpg"
        ],
        theme: "fashion",
        textMatchDescription: "Stylish sunglasses that express individuality",
        imageMatchDescription: "A pair of elegant sunglasses showcasing fashion taste",
        textInjectionPrompt: "Showcase the fashionable design and quality of our sunglasses",
        imageInjectionPrompt: "A stylish scene featuring sunglasses"
      },
      {
        title: "Elegant Women's Hat",
        description: "Add sophistication to your look",
        images: [
          "https://cdn.pixabay.com/photo/2018/06/26/13/07/hat-womens-3499381_960_720.jpg"
        ],
        theme: "fashion",
        textMatchDescription: "An elegant women's hat that enhances your overall style",
        imageMatchDescription: "A refined women's hat exuding elegance",
        textInjectionPrompt: "Showcase the elegant design and styling possibilities",
        imageInjectionPrompt: "An elegant scene featuring the hat"
      }
    ]

    console.log('Starting database initialization...')

    // 清空现有数据
    await prisma.adMaterial.deleteMany()
    console.log('Existing data cleared')

    // 创建新数据
    for (const material of materials) {
      await prisma.adMaterial.create({
        data: material
      })
    }
    console.log('Sample data created')

    console.log('Database initialization completed!')
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 