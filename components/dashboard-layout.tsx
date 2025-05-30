"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { LayoutDashboard, Users, BarChart3, Wallet, Settings, Menu, X, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
// Remove Footer import
// import Footer from "@/components/footer"

export default function DashboardLayout({
  children,
  userType = "influencer",
}: {
  children: React.ReactNode
  userType?: "influencer" | "merchant"
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { language } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const influencerNavItems = [
    {
      name: language === "en" ? "Dashboard" : "仪表板",
      href: "/dashboard/influencer",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Campaigns" : "活动",
      href: "/dashboard/campaigns",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Wallet" : "钱包",
      href: "/dashboard/influencer/wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Settings" : "设置",
      href: "/dashboard/influencer/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const merchantNavItems = [
    {
      name: language === "en" ? "Dashboard" : "仪表板",
      href: "/dashboard/merchant",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Campaigns" : "活动",
      href: "/dashboard/merchant/campaigns",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Influencers" : "影响者",
      href: "/dashboard/merchant/influencers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Wallet" : "钱包",
      href: "/dashboard/merchant/wallet",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      name: language === "en" ? "Settings" : "设置",
      href: "/dashboard/merchant/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const navItems = userType === "influencer" ? influencerNavItems : merchantNavItems

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      <div className="flex flex-1">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#050510]">
          <Link href="/" className="text-white font-bold text-lg">
            ACF Engine
          </Link>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-[#050510] border-r border-white/10 flex-shrink-0`}
        >
          <div className="p-6">
            <Link href="/" className="block text-white font-bold text-xl mb-8">
              ImmerseAd
            </Link>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg">
                {userType === "influencer" ? (
                  <User className="h-8 w-8 text-purple-400 p-1.5 bg-purple-500/10 rounded-full" />
                ) : (
                  <Building className="h-8 w-8 text-cyan-400 p-1.5 bg-cyan-500/10 rounded-full" />
                )}
                <div>
                  <p className="text-white font-medium">
                    {userType === "influencer" ? "Jims Young" : "TechGadgets Inc."}
                  </p>
                  <p className="text-white/60 text-sm">
                    {userType === "influencer"
                      ? language === "en"
                        ? "Influencer"
                        : "影响者"
                      : language === "en"
                        ? "Merchant"
                        : "商家"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-8 left-0 w-64 px-6">{/* Bottom sidebar area - buttons removed */}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1">{children}</div>
          {/* Remove the Footer component */}
        </div>
      </div>
    </div>
  )
}
