"use client"

import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"

export default function Footer() {
  const { language } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#030303] border-t border-white/10 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white font-bold text-lg">ImmerseAd</p>
            <p className="text-white/40 text-sm">
              {language === "en" ? "The Next Gen AI immersive marketing platform" : "下一代AI沉浸式广告平台"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              {language === "en" ? "Privacy" : "隐私"}
            </Link>
            <Link href="/documents" className="text-white/60 hover:text-white text-sm transition-colors">
              {language === "en" ? "Document" : "文档"}
            </Link>
            <p className="text-white/40 text-sm">
              © {currentYear} {language === "en" ? "All Rights Reserved by ImmerseAd" : "ImmerseAd 版权所有"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
