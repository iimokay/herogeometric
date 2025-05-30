"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/hooks/use-translation"

export default function TestimonialsSection() {
  const { t } = useTranslation()

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Influencer",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "InfluConnect has transformed how I work with brands. The verification process was smooth, and getting paid in crypto is fast and secure.",
    },
    {
      name: "David Wang",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "As a merchant, finding the right influencers used to be challenging. InfluConnect's platform makes it easy to connect with verified creators and track campaign results.",
    },
    {
      name: "Li Wei",
      role: "Lifestyle Blogger",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "The bilingual support makes it easy to work with both international and local brands. The crypto payment system is revolutionary!",
    },
  ]

  return (
    <section className="py-20 bg-[#050510]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("testimonials.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white/70 italic">&ldquo;{testimonial.content}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
