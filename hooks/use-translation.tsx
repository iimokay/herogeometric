"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "zh"

type TranslationContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.pricing": "Pricing",
    "nav.materials": "Materials",
    "hero.title1": "Monitized Your",
    "hero.title2": "With ACF",
    "hero.description": "The Next Gen AI influener platform",
    "hero.influencerButton": "I'm an Influencer",
    "hero.merchantButton": "I'm a Merchant",
    "features.title": "Platform Features",
    "features.subtitle": "Everything you need to succeed",
    "features.verification.title": "X.com Verification",
    "features.verification.description": "Verify your X.com account to build trust with merchants",
    "features.crypto.title": "Crypto Payments",
    "features.crypto.description": "Secure and fast payments with multiple cryptocurrency options",
    "features.analytics.title": "Campaign Analytics",
    "features.analytics.description": "Track performance metrics and ROI in real-time",
    "features.multilingual.title": "Multilingual Support",
    "features.multilingual.description": "Full platform support in English and Chinese",
    "howItWorks.title": "How It Works",
    "howItWorks.influencer.title": "For Influencers",
    "howItWorks.influencer.step1": "Create your profile and connect your X.com account",
    "howItWorks.influencer.step2": "Complete the verification process",
    "howItWorks.influencer.step3": "Browse and accept campaign offers",
    "howItWorks.influencer.step4": "Get paid directly to your crypto wallet",
    "howItWorks.merchant.title": "For Merchants",
    "howItWorks.merchant.step1": "Create your business account",
    "howItWorks.merchant.step2": "Fund your campaign with cryptocurrency",
    "howItWorks.merchant.step3": "Set campaign goals and select influencers",
    "howItWorks.merchant.step4": "Track results and measure ROI",
    "testimonials.title": "Success Stories",
    "cta.title": "Ready to Get Started?",
    "cta.description": "Join thousands of influencers and merchants already using ACF Engine",
    "cta.button": "Sign Up Now",
  },
  zh: {
    "nav.features": "功能",
    "nav.howItWorks": "工作原理",
    "nav.pricing": "价格",
    "nav.materials": "广告素材",
    "hero.title1": "将您的",
    "hero.title2": "通过ACF",
    "hero.description": "下一代AI影响者平台",
    "hero.influencerButton": "我是影响者",
    "hero.merchantButton": "我是商家",
    "features.title": "平台功能",
    "features.subtitle": "成功所需的一切",
    "features.verification.title": "X.com验证",
    "features.verification.description": "验证您的X.com账户，与商家建立信任",
    "features.crypto.title": "加密货币支付",
    "features.crypto.description": "安全快速的多种加密货币支付选项",
    "features.analytics.title": "活动分析",
    "features.analytics.description": "实时跟踪性能指标和投资回报率",
    "features.multilingual.title": "多语言支持",
    "features.multilingual.description": "平台完全支持英文和中文",
    "howItWorks.title": "工作原理",
    "howItWorks.influencer.title": "对于影响者",
    "howItWorks.influencer.step1": "创建您的个人资料并连接您的X.com账户",
    "howItWorks.influencer.step2": "完成验证过程",
    "howItWorks.influencer.step3": "浏览并接受活动邀请",
    "howItWorks.influencer.step4": "直接获得加密货币钱包支付",
    "howItWorks.merchant.title": "对于商家",
    "howItWorks.merchant.step1": "创建您的商业账户",
    "howItWorks.merchant.step2": "用加密货币为您的活动提供资金",
    "howItWorks.merchant.step3": "设置活动目标并选择影响者",
    "howItWorks.merchant.step4": "跟踪结果并衡量投资回报率",
    "testimonials.title": "成功案例",
    "cta.title": "准备开始了吗？",
    "cta.description": "加入已经使用ACF Engine的数千名影响者和商家",
    "cta.button": "立即注册",
  },
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "zh") {
        setLanguage("zh")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
