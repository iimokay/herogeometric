"use client"

import { useState } from "react"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface SocialVerificationDialogProps {
  platform: "twitter" | "instagram" | "youtube" | "tiktok"
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerified: () => void
  language: string
}

export function SocialVerificationDialog({
  platform,
  open,
  onOpenChange,
  onVerified,
  language,
}: SocialVerificationDialogProps) {
  const [step, setStep] = useState<"initial" | "connecting" | "authorizing" | "success">("initial")
  const [username, setUsername] = useState("")

  const handleVerify = () => {
    if (!username) return

    setStep("connecting")
    // Simulate connection process
    setTimeout(() => {
      setStep("authorizing")
      // Simulate authorization process
      setTimeout(() => {
        setStep("success")
        // Simulate completion
        setTimeout(() => {
          onVerified()
          onOpenChange(false)
          // Reset for next time
          setTimeout(() => setStep("initial"), 500)
        }, 1500)
      }, 2000)
    }, 1500)
  }

  const getPlatformDetails = () => {
    switch (platform) {
      case "twitter":
        return {
          name: "X.com",
          logo: "/placeholder-9ck2j.png",
          color: "text-cyan-400",
          bgColor: "bg-cyan-500/10",
          borderColor: "border-cyan-500/20",
        }
      case "instagram":
        return {
          name: "Instagram",
          logo: "/instagram-logo.png",
          color: "text-pink-400",
          bgColor: "bg-pink-500/10",
          borderColor: "border-pink-500/20",
        }
      case "youtube":
        return {
          name: "YouTube",
          logo: "/youtube-logo.png",
          color: "text-red-400",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20",
        }
      case "tiktok":
        return {
          name: "TikTok",
          logo: "/social/tiktok.png",
          color: "text-purple-400",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/20",
        }
    }
  }

  const details = getPlatformDetails()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {language === "en" ? `Connect ${details.name}` : `连接 ${details.name}`}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {language === "en"
              ? `Verify your ${details.name} account to unlock platform-specific campaigns`
              : `验证您的${details.name}账户以解锁特定平台的活动`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-4 ${details.bgColor}`}>
            <Image
              src={details.logo || "/placeholder.svg"}
              alt={details.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>

          {step === "initial" && (
            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm text-white/70">
                  {language === "en" ? `${details.name} Username` : `${details.name}用户名`}
                </label>
                <Input
                  id="username"
                  placeholder={`@username`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="text-white/60 text-sm">
                {language === "en"
                  ? "You'll be redirected to authorize access to your account"
                  : "您将被重定向以授权访问您的帐户"}
              </div>
            </div>
          )}

          {step === "connecting" && (
            <div className="space-y-4 w-full text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-white/70" />
              <p className="text-white/70">
                {language === "en" ? `Connecting to ${details.name}...` : `正在连接到${details.name}...`}
              </p>
            </div>
          )}

          {step === "authorizing" && (
            <div className="space-y-4 w-full text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-white/70" />
              <p className="text-white/70">{language === "en" ? "Waiting for authorization..." : "等待授权..."}</p>
              <div className={`p-3 rounded-lg ${details.bgColor} ${details.borderColor} border text-sm`}>
                <p className={details.color}>
                  {language === "en" ? "Please complete authorization in the popup window" : "请在弹出窗口中完成授权"}
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="space-y-4 w-full text-center">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <p className="text-white">
                {language === "en" ? `Successfully connected to ${details.name}` : `成功连接到${details.name}`}
              </p>
              <p className="text-white/60 text-sm">
                {language === "en" ? "Your account has been verified" : "您的账户已验证"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {step === "initial" && (
            <Button
              type="submit"
              className={`w-full ${
                platform === "twitter"
                  ? "bg-cyan-500 hover:bg-cyan-600"
                  : platform === "instagram"
                    ? "bg-pink-500 hover:bg-pink-600"
                    : platform === "youtube"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-purple-500 hover:bg-purple-600"
              }`}
              onClick={handleVerify}
              disabled={!username}
            >
              {language === "en" ? "Connect Account" : "连接账户"}
            </Button>
          )}

          {(step === "connecting" || step === "authorizing") && (
            <Button disabled className="w-full bg-gray-500 cursor-not-allowed">
              {language === "en" ? "Connecting..." : "连接中..."}
            </Button>
          )}

          {step === "success" && (
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => {
                onVerified()
                onOpenChange(false)
                // Reset for next time
                setTimeout(() => setStep("initial"), 500)
              }}
            >
              {language === "en" ? "Done" : "完成"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
