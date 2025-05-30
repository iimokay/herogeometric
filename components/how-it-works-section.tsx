"use client"

import { motion } from "framer-motion"
import { UserCheck, Building } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HowItWorksSection() {
  const { t } = useTranslation()

  const influencerSteps = [
    t("howItWorks.influencer.step1"),
    t("howItWorks.influencer.step2"),
    t("howItWorks.influencer.step3"),
    t("howItWorks.influencer.step4"),
  ]

  const merchantSteps = [
    t("howItWorks.merchant.step1"),
    t("howItWorks.merchant.step2"),
    t("howItWorks.merchant.step3"),
    t("howItWorks.merchant.step4"),
  ]

  return (
    <section className="py-20 bg-[#050510]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("howItWorks.title")}</h2>
        </div>

        <Tabs defaultValue="influencer" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-10 bg-white/[0.03]">
            <TabsTrigger value="influencer" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              {t("howItWorks.influencer.title")}
            </TabsTrigger>
            <TabsTrigger value="merchant" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t("howItWorks.merchant.title")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="influencer">
            <div className="space-y-8">
              {influencerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex-1">
                    <p className="text-white/80">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="merchant">
            <div className="space-y-8">
              {merchantSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 flex-1">
                    <p className="text-white/80">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
