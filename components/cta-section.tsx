"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"

export default function CTASection() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-t from-[#030303] to-[#050510]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-xl p-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("cta.title")}</h2>
          <p className="text-lg text-white/60 mb-8">{t("cta.description")}</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
            onClick={() => router.push("/signup")}
          >
            {t("cta.button")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
