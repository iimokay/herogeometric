"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  User,
  Twitter,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  Star,
  Instagram,
  Youtube,
  Music,
} from "lucide-react"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { SocialVerificationDialog } from "@/components/social-verification-dialog"

export default function InfluencerDashboardPage() {
  const { t, language } = useTranslation()
  const [isTwitterVerified, setIsTwitterVerified] = useState(false)
  const [isInstagramVerified, setIsInstagramVerified] = useState(false)
  const [isYoutubeVerified, setIsYoutubeVerified] = useState(false)
  const [isTiktokVerified, setIsTiktokVerified] = useState(false)

  const [twitterDialogOpen, setTwitterDialogOpen] = useState(false)
  const [instagramDialogOpen, setInstagramDialogOpen] = useState(false)
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false)
  const [tiktokDialogOpen, setTiktokDialogOpen] = useState(false)

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      merchant: "TechGadgets Inc.",
      logo: "/placeholder.svg?height=40&width=40",
      title: "New Smartphone Launch",
      status: "pending",
      payment: "$100",
      deadline: "May 15, 2025",
      requirements: "1 post on X.com highlighting key features",
    },
    {
      id: 2,
      merchant: "EcoFashion",
      logo: "/placeholder.svg?height=40&width=40",
      title: "Sustainable Clothing Line",
      status: "active",
      payment: "$160",
      deadline: "May 30, 2025",
      requirements: "2 posts on X.com with product photos",
    },
    {
      id: 3,
      merchant: "HealthySnacks",
      logo: "/placeholder.svg?height=40&width=40",
      title: "Organic Snack Box Promotion",
      status: "completed",
      payment: "$60",
      deadline: "April 10, 2025",
      requirements: "1 review post with unboxing",
    },
  ]

  // Mock data for earnings
  const earnings = [
    { month: "Jan", amount: 240 },
    { month: "Feb", amount: 360 },
    { month: "Mar", amount: 300 },
    { month: "Apr", amount: 440 },
  ]

  // Profile metrics
  const profileMetrics = {
    averageScore: 4.8,
    averageEarnings: 135,
    totalEarnings: 1340,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" />
            {language === "en" ? "Pending" : "待处理"}
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            {language === "en" ? "Active" : "进行中"}
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <CheckCircle className="mr-1 h-3 w-3" />
            {language === "en" ? "Completed" : "已完成"}
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <DashboardLayout userType="influencer">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {language === "en" ? "Influencer Dashboard" : "影响者仪表板"}
            </h1>
            <p className="text-white/60">
              {language === "en" ? "Manage your campaigns and earnings" : "管理您的活动和收入"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
              onClick={() => {}}
            >
              {language === "en" ? "Find New Pop" : "查找新Pop"}
            </Button>
          </div>
        </div>

        {/* Profile Overview Section */}
        <Card className="mb-8 bg-white/[0.03] border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Info */}
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="h-12 w-12 text-white/60" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Jims Young</h2>
                  <p className="text-white/60">@jimsyoung</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white">{profileMetrics.averageScore}</span>
                    <span className="text-white/60 mx-2">•</span>
                    <span className="text-white/60">{language === "en" ? "Tech Influencer" : "科技影响者"}</span>
                  </div>
                </div>
              </div>

              {/* Profile Metrics */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/40 rounded-lg p-4 flex flex-col">
                  <p className="text-white/60 text-sm mb-2 text-center">
                    {language === "en" ? "Avg. Earnings/Post" : "平均单条盈利"}
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-3xl font-bold text-white">${profileMetrics.averageEarnings}</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 flex flex-col">
                  <p className="text-white/60 text-sm mb-2 text-center">
                    {language === "en" ? "Avg. Score" : "平均得分"}
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-3xl font-bold text-white">{profileMetrics.averageScore}/5.0</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 flex flex-col">
                  <p className="text-white/60 text-sm mb-2 text-center">
                    {language === "en" ? "Total Earnings" : "总收入"}
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-3xl font-bold text-white">${profileMetrics.totalEarnings}</p>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 flex flex-col">
                  <p className="text-white/60 text-sm mb-2 text-center">
                    {language === "en" ? "Active Campaigns" : "活跃活动"}
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-3xl font-bold text-white">2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Verification */}
            <div className="mt-6">
              <h3 className="text-white font-medium mb-3">{language === "en" ? "Verified Accounts" : "已验证账户"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* X.com Card */}
                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Twitter className={`h-5 w-5 mr-3 ${isTwitterVerified ? "text-white" : "text-white/40"}`} />
                    <span className="text-white">X.com</span>
                  </div>
                  {isTwitterVerified ? (
                    <Button variant="ghost" size="sm" className="text-white/50 cursor-not-allowed" disabled>
                      {language === "en" ? "Verified" : "已验证"}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-400 hover:text-cyan-300"
                      onClick={() => setTwitterDialogOpen(true)}
                    >
                      {language === "en" ? "Verify" : "验证"}
                    </Button>
                  )}
                </div>

                {/* Instagram Card */}
                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Instagram className={`h-5 w-5 mr-3 ${isInstagramVerified ? "text-white" : "text-white/40"}`} />
                    <span className="text-white">Instagram</span>
                  </div>
                  {isInstagramVerified ? (
                    <Button variant="ghost" size="sm" className="text-white/50 cursor-not-allowed" disabled>
                      {language === "en" ? "Verified" : "已验证"}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-pink-400 hover:text-pink-300"
                      onClick={() => setInstagramDialogOpen(true)}
                    >
                      {language === "en" ? "Verify" : "验证"}
                    </Button>
                  )}
                </div>

                {/* YouTube Card */}
                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Youtube className={`h-5 w-5 mr-3 ${isYoutubeVerified ? "text-white" : "text-white/40"}`} />
                    <span className="text-white">YouTube</span>
                  </div>
                  {isYoutubeVerified ? (
                    <Button variant="ghost" size="sm" className="text-white/50 cursor-not-allowed" disabled>
                      {language === "en" ? "Verified" : "已验证"}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => setYoutubeDialogOpen(true)}
                    >
                      {language === "en" ? "Verify" : "验证"}
                    </Button>
                  )}
                </div>

                {/* TikTok Card */}
                <div className="bg-black/40 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Music className={`h-5 w-5 mr-3 ${isTiktokVerified ? "text-white" : "text-white/40"}`} />
                    <span className="text-white">TikTok</span>
                  </div>
                  {isTiktokVerified ? (
                    <Button variant="ghost" size="sm" className="text-white/50 cursor-not-allowed" disabled>
                      {language === "en" ? "Verified" : "已验证"}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300"
                      onClick={() => setTiktokDialogOpen(true)}
                    >
                      {language === "en" ? "Verify" : "验证"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">{language === "en" ? "Recent Earnings" : "近期收入"}</CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "Last 30 days" : "最近30天"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">$440</p>
                  <p className="text-white/60 text-sm">+22% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {language === "en" ? "Campaign Opportunities" : "活动机会"}
              </CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "Available for you" : "适合您的"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">8</p>
                  <p className="text-white/60 text-sm">{language === "en" ? "3 new this week" : "本周新增3个"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="bg-white/[0.03] border-white/10 mb-6">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Campaigns" : "活动"}
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Earnings" : "收入"}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Profile" : "个人资料"}
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Wallet" : "钱包"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <div className="grid grid-cols-1 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="bg-white/[0.03] border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Image
                          src={campaign.logo || "/placeholder.svg"}
                          alt={campaign.merchant}
                          width={40}
                          height={40}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-white">{campaign.title}</h3>
                          <p className="text-white/60">{campaign.merchant}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusBadge(campaign.status)}
                        <div className="ml-4 flex items-center">
                          <DollarSign className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-white">{campaign.payment}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Requirements" : "要求"}</p>
                        <p className="text-white">{campaign.requirements}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Deadline" : "截止日期"}</p>
                        <p className="text-white">{campaign.deadline}</p>
                      </div>
                    </div>
                    {campaign.status === "active" && (
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-white/60 text-sm">{language === "en" ? "Progress" : "进度"}</span>
                          <span className="text-white/60 text-sm">50%</span>
                        </div>
                        <Progress value={50} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
                      </div>
                    )}
                    {campaign.status === "pending" && (
                      <div className="mt-4">
                        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                          {language === "en" ? "Accept Campaign" : "接受活动"}
                        </Button>
                      </div>
                    )}
                    {campaign.status === "active" && (
                      <div className="mt-4">
                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                          {language === "en" ? "Submit Proof" : "提交证明"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Earnings History" : "收入历史"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Your earnings over time" : "您随时间的收入"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex items-end justify-between h-64">
                      {earnings.map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-1/4">
                          <div
                            className="w-12 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-md"
                            style={{ height: `${(item.amount / 500) * 100}%` }}
                          ></div>
                          <div className="mt-2 text-white/60">{item.month}</div>
                          <div className="text-white font-medium">${item.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    {language === "en" ? "Recent Transactions" : "最近交易"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                      <div>
                        <p className="text-white">EcoFashion</p>
                        <p className="text-white/60 text-sm">April 25, 2025</p>
                      </div>
                      <div className="text-green-400">+$160</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                      <div>
                        <p className="text-white">HealthySnacks</p>
                        <p className="text-white/60 text-sm">April 10, 2025</p>
                      </div>
                      <div className="text-green-400">+$60</div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                      <div>
                        <p className="text-white">TravelApp</p>
                        <p className="text-white/60 text-sm">March 15, 2025</p>
                      </div>
                      <div className="text-green-400">+$240</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  {language === "en" ? "Profile Information" : "个人资料信息"}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Manage your public profile" : "管理您的公开资料"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden">
                      <User className="h-16 w-16 text-white/40" />
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 bg-purple-500 hover:bg-purple-600 text-white h-8 w-8 p-0 rounded-full"
                      >
                        <span className="sr-only">{language === "en" ? "Upload Image" : "上传图片"}</span>+
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Display Name" : "显示名称"}
                        </label>
                        <input
                          type="text"
                          defaultValue="Jims Young"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "X.com Username" : "X.com用户名"}
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            defaultValue="@jimsyoung"
                            className="flex-1 bg-white/[0.03] border border-white/10 rounded-l-md p-2 text-white"
                            readOnly={isTwitterVerified}
                          />
                          <Button
                            className={`rounded-l-none ${
                              isTwitterVerified ? "bg-green-500 hover:bg-green-600" : "bg-cyan-500 hover:bg-cyan-600"
                            } text-white`}
                            onClick={() => setIsTwitterVerified(true)}
                          >
                            {isTwitterVerified ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : language === "en" ? (
                              "Verify"
                            ) : (
                              "验证"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">{language === "en" ? "Bio" : "简介"}</label>
                      <textarea
                        rows={4}
                        defaultValue="Tech influencer passionate about the latest gadgets and innovations. I share reviews, tips, and insights about technology that makes our lives better."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Categories" : "类别"}
                        </label>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white">
                          <option value="tech">Technology</option>
                          <option value="fashion">Fashion</option>
                          <option value="beauty">Beauty</option>
                          <option value="food">Food</option>
                          <option value="travel">Travel</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Languages" : "语言"}
                        </label>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white">
                          <option value="en">English</option>
                          <option value="zh">Chinese</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                        {language === "en" ? "Save Changes" : "保存更改"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Wallet Settings" : "钱包设置"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Manage your payment methods" : "管理您的支付方式"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">
                        {language === "en" ? "Connected Wallet" : "已连接钱包"}
                      </h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {language === "en" ? "Active" : "活跃"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">{language === "en" ? "Wallet Address" : "钱包地址"}</span>
                        <span className="text-white font-mono">0x71C...F3E2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{language === "en" ? "Wallet Type" : "钱包类型"}</span>
                        <span className="text-white">MetaMask</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{language === "en" ? "Connected On" : "连接时间"}</span>
                        <span className="text-white">April 15, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      {language === "en" ? "Payment Preferences" : "支付偏好"}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Preferred Currency" : "首选货币"}
                        </label>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white">
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="jpy">JPY (¥)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Minimum Payment Threshold" : "最低支付阈值"}
                        </label>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white">
                          <option value="20">$20</option>
                          <option value="50">$50</option>
                          <option value="100">$100</option>
                          <option value="200">$200</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="auto-withdraw"
                          className="mr-2 h-4 w-4 rounded border-white/10 bg-white/[0.03]"
                        />
                        <label htmlFor="auto-withdraw" className="text-white">
                          {language === "en"
                            ? "Automatically withdraw when threshold is reached"
                            : "达到阈值时自动提款"}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      {language === "en" ? "Connect a Different Wallet" : "连接不同的钱包"}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
                      >
                        <Image src="/placeholder.svg?height=24&width=24" alt="MetaMask" width={24} height={24} />
                        <span>MetaMask</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
                      >
                        <Image src="/placeholder.svg?height=24&width=24" alt="Coinbase" width={24} height={24} />
                        <span>Coinbase</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
                      >
                        <Image src="/placeholder.svg?height=24&width=24" alt="Trust Wallet" width={24} height={24} />
                        <span>Trust</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
                      >
                        <Image src="/placeholder.svg?height=24&width=24" alt="WalletConnect" width={24} height={24} />
                        <span>WalletConnect</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Verification Dialogs */}
      <SocialVerificationDialog
        platform="twitter"
        open={twitterDialogOpen}
        onOpenChange={setTwitterDialogOpen}
        onVerified={() => setIsTwitterVerified(true)}
        language={language}
      />

      <SocialVerificationDialog
        platform="instagram"
        open={instagramDialogOpen}
        onOpenChange={setInstagramDialogOpen}
        onVerified={() => setIsInstagramVerified(true)}
        language={language}
      />

      <SocialVerificationDialog
        platform="youtube"
        open={youtubeDialogOpen}
        onOpenChange={setYoutubeDialogOpen}
        onVerified={() => setIsYoutubeVerified(true)}
        language={language}
      />

      <SocialVerificationDialog
        platform="tiktok"
        open={tiktokDialogOpen}
        onOpenChange={setTiktokDialogOpen}
        onVerified={() => setIsTiktokVerified(true)}
        language={language}
      />
    </DashboardLayout>
  )
}
