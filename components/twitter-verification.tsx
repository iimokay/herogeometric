"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTranslation } from "@/hooks/use-translation"
import { Twitter, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function TwitterVerification({
  onVerify,
  buttonText,
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName,
}: {
  onVerify: () => void
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  buttonClassName?: string
}) {
  const { language } = useTranslation()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [verificationCode] = useState("INFL-" + Math.random().toString(36).substring(2, 8).toUpperCase())

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode)
  }

  const handleVerify = () => {
    setStep(3)

    // Simulate verification process
    setTimeout(() => {
      setOpen(false)
      setStep(1)
      onVerify()
    }, 2000)
  }

  return (
    <>
      <Button variant={buttonVariant} size={buttonSize} className={buttonClassName} onClick={() => setOpen(true)}>
        {buttonText || (language === "en" ? "Verify X.com Account" : "验证X.com账户")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {language === "en" ? "Verify Your X.com Account" : "验证您的X.com账户"}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {language === "en" ? "Follow these steps to verify your X.com account" : "按照以下步骤验证您的X.com账户"}
            </DialogDescription>
          </DialogHeader>

          {step === 1 && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-center mb-4">
                <Twitter className="h-12 w-12 text-cyan-400" />
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm">
                  {language === "en" ? "Your X.com Username" : "您的X.com用户名"}
                </label>
                <Input placeholder="@username" className="bg-white/[0.03] border-white/10 text-white" />
              </div>

              <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">
                  {language === "en" ? "Verification Process" : "验证过程"}
                </h3>
                <ol className="space-y-2 text-white/80 list-decimal pl-4">
                  <li>{language === "en" ? "Enter your X.com username" : "输入您的X.com用户名"}</li>
                  <li>
                    {language === "en"
                      ? "Post a tweet with the verification code we provide"
                      : "使用我们提供的验证码发布推文"}
                  </li>
                  <li>{language === "en" ? "Click verify to complete the process" : "点击验证完成流程"}</li>
                </ol>
              </div>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" onClick={() => setStep(2)}>
                {language === "en" ? "Continue" : "继续"}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 mt-4">
              <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">
                  {language === "en" ? "Post this verification code on X.com" : "在X.com上发布此验证码"}
                </h3>
                <p className="text-white/80 mb-4">
                  {language === "en"
                    ? "Create a new post on X.com with the following verification code:"
                    : "在X.com上创建一个包含以下验证码的新帖子："}
                </p>

                <div className="flex items-center bg-white/[0.05] p-3 rounded-md">
                  <code className="text-cyan-400 font-mono flex-1">{verificationCode}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/60 hover:text-white"
                    onClick={handleCopyCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-white/[0.03] border-white/10 text-white flex items-center justify-center gap-2"
                    onClick={() => window.open("https://x.com/compose/tweet", "_blank")}
                  >
                    <Twitter className="h-4 w-4" />
                    <span>{language === "en" ? "Open X.com to Post" : "打开X.com发布"}</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" className="flex-1 text-white/60 hover:text-white" onClick={() => setStep(1)}>
                  {language === "en" ? "Back" : "返回"}
                </Button>
                <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white" onClick={handleVerify}>
                  {language === "en" ? "Verify" : "验证"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-white text-lg">{language === "en" ? "Verification Successful!" : "验证成功！"}</p>
              <p className="text-white/60 text-center mt-2">
                {language === "en" ? "Your X.com account has been verified" : "您的X.com账户已验证"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
