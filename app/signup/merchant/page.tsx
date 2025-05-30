"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Building, Wallet, BarChart3 } from "lucide-react"

export default function MerchantSignupPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard/merchant")
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">{language === "en" ? "Merchant Sign Up" : "商家注册"}</CardTitle>
          <CardDescription className="text-white/60">
            {language === "en" ? `Step ${step} of 3` : `第 ${step} 步，共 3 步`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="flex justify-center mb-4">
                <Building className="h-12 w-12 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  {language === "en" ? "Company Name" : "公司名称"}
                </Label>
                <Input
                  id="company"
                  placeholder={language === "en" ? "Enter company name" : "输入公司名称"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {language === "en" ? "Business Email" : "商务电子邮件"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === "en" ? "Enter business email" : "输入商务电子邮件"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  {language === "en" ? "Password" : "密码"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={language === "en" ? "Create a password" : "创建密码"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex justify-center mb-4">
                <Wallet className="h-12 w-12 text-purple-400" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  {language === "en" ? "Set Up Payment Method" : "设置支付方式"}
                </h3>
                <p className="text-white/60">
                  {language === "en"
                    ? "Add funds to your account to pay influencers"
                    : "向您的账户添加资金以支付影响者"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-white">
                  {language === "en" ? "Your Wallet Address (EVM)" : "您的钱包地址 (EVM)"}
                </Label>
                <Input
                  id="wallet"
                  placeholder={language === "en" ? "Enter your EVM wallet address" : "输入您的EVM钱包地址"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white">
                  {language === "en" ? "Payment Currency" : "支付货币"}
                </Label>
                <select
                  id="currency"
                  className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/10 text-white"
                >
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="usdt">Tether (USDT)</option>
                  <option value="usdc">USD Coin (USDC)</option>
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex justify-center mb-4">
                <BarChart3 className="h-12 w-12 text-emerald-400" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  {language === "en" ? "Business Details" : "业务详情"}
                </h3>
                <p className="text-white/60">
                  {language === "en"
                    ? "Tell us more about your business to help match with the right influencers"
                    : "告诉我们更多关于您的业务，以帮助匹配合适的影响者"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-white">
                  {language === "en" ? "Industry" : "行业"}
                </Label>
                <select
                  id="industry"
                  className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/10 text-white"
                >
                  <option value="tech">Technology</option>
                  <option value="fashion">Fashion</option>
                  <option value="beauty">Beauty</option>
                  <option value="food">Food & Beverage</option>
                  <option value="health">Health & Fitness</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-white">
                  {language === "en" ? "Website" : "网站"}
                </Label>
                <Input
                  id="website"
                  placeholder={language === "en" ? "https://your-company.com" : "https://您的公司.com"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white">
                  {language === "en" ? "Monthly Budget (USD)" : "月度预算（美元）"}
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white"
            onClick={() => (step > 1 ? setStep(step - 1) : router.push("/signup"))}
          >
            {language === "en" ? "Back" : "返回"}
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
            onClick={handleNext}
          >
            {step < 3 ? (language === "en" ? "Next" : "下一步") : language === "en" ? "Complete" : "完成"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
