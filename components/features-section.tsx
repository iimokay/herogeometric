"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, BarChart3, Globe } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "Identity Verification",
      description: "Secure verification process for all content creators to ensure authenticity and trust.",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-cyan-400" />,
      title: "Crypto Payments",
      description: "Seamless cryptocurrency transactions for secure and transparent campaign payments.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-400" />,
      title: "Performance Analytics",
      description: "Comprehensive analytics dashboard to track campaign performance and ROI in real-time.",
    },
    {
      icon: <Globe className="h-10 w-10 text-violet-400" />,
      title: "Global Reach",
      description: "Connect with influencers and brands worldwide to expand your marketing potential.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-[#030303] to-[#050510]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Platform Features</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Our platform offers cutting-edge tools to connect brands with authentic influencers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
