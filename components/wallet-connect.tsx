"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function WalletConnect({
  onConnect,
  buttonText,
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName,
}: {
  onConnect: (wallet: string) => void
  buttonText?: string
  buttonVariant?: "default" | "outline" | "ghost"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  buttonClassName?: string
}) {
  const { language } = useTranslation()
  const [open, setOpen] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState("")

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "trust",
      name: "Trust Wallet",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId)
    setConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)

      // Simulate successful connection
      setTimeout(() => {
        setOpen(false)
        setConnected(false)
        onConnect(walletId)
      }, 1000)
    }, 2000)
  }

  return (
    <>
      <Button variant={buttonVariant} size={buttonSize} className={buttonClassName} onClick={() => setOpen(true)}>
        {buttonText || (language === "en" ? "Connect Wallet" : "连接钱包")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {language === "en" ? "Connect Your EVM Wallet" : "连接您的EVM钱包"}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {language === "en" ? "Choose an EVM-compatible wallet to connect" : "选择要连接的EVM兼容钱包"}
            </DialogDescription>
          </DialogHeader>

          {!connecting && !connected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
                  onClick={() => handleConnect(wallet.id)}
                >
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={40} height={40} />
                  <span>{wallet.name}</span>
                </Button>
              ))}
            </div>
          ) : connecting ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-white text-lg">{language === "en" ? "Connecting..." : "连接中..."}</p>
              <p className="text-white/60 text-center mt-2">
                {language === "en" ? "Please confirm the connection in your wallet" : "请在您的钱包中确认连接"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-white text-lg">{language === "en" ? "Connected Successfully!" : "连接成功！"}</p>
              <p className="text-white/60 text-center mt-2">
                {language === "en" ? "Your wallet has been connected" : "您的钱包已连接"}
              </p>
            </div>
          )}

          <div className="mt-4 text-center text-white/60 text-sm">
            {language === "en"
              ? "By connecting your wallet, you agree to our Terms of Service and Privacy Policy"
              : "连接钱包即表示您同意我们的服务条款和隐私政策"}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
