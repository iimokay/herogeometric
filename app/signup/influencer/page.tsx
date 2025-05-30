"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { Twitter, Wallet } from "lucide-react"

export default function InfluencerSignupPage() {
  const router = useRouter()
  const { t, language } = useTranslation()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard/influencer")
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            {language === "en" ? "Influencer Sign Up" : "影响者注册"}
          </CardTitle>
          <CardDescription className="text-white/60">
            {language === "en" ? `Step ${step} of 3` : `第 ${step} 步，共 3 步`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  {language === "en" ? "Full Name" : "全名"}
                </Label>
                <Input
                  id="name"
                  placeholder={language === "en" ? "Enter your name" : "输入您的姓名"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {language === "en" ? "Email" : "电子邮件"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === "en" ? "Enter your email" : "输入您的电子邮件"}
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
                <Twitter className="h-12 w-12 text-cyan-400" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  {language === "en" ? "Connect Your X.com Account" : "连接您的X.com账户"}
                </h3>
                <p className="text-white/60">
                  {language === "en"
                    ? "We need to verify your X.com account to ensure authenticity"
                    : "我们需要验证您的X.com账户以确保真实性"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-white">
                  {language === "en" ? "X.com Username" : "X.com用户名"}
                </Label>
                <Input id="twitter" placeholder="@username" className="bg-white/[0.03] border-white/10 text-white" />
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" onClick={() => {}}>
                {language === "en" ? "Verify with X.com" : "使用X.com验证"}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex justify-center mb-4">
                <Wallet className="h-12 w-12 text-purple-400" />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-white mb-2">
                  {language === "en" ? "Connect Crypto Wallet" : "连接加密货币钱包"}
                </h3>
                <p className="text-white/60">
                  {language === "en"
                    ? "Connect your wallet to receive payments from merchants"
                    : "连接您的钱包以接收来自商家的付款"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet" className="text-white">
                  {language === "en" ? "Wallet Address (EVM)" : "钱包地址 (EVM)"}
                </Label>
                <Input
                  id="wallet"
                  placeholder={language === "en" ? "Enter your EVM wallet address" : "输入您的EVM钱包地址"}
                  className="bg-white/[0.03] border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white">
                  {language === "en" ? "Preferred Currency" : "首选货币"}
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
