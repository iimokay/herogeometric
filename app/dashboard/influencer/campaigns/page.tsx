"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, ArrowUpRight, CheckCircle, Clock, XCircle, Wallet, Calendar, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function InfluencerCampaignsPage() {
  const { language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for campaigns
  const allCampaigns = [
    {
      id: 1,
      merchant: "TechGadgets Inc.",
      logo: "/abstract-tech-logo.png",
      title: "New Smartphone Launch",
      status: "pending",
      payment: "0.05 ETH",
      deadline: "May 15, 2025",
      requirements: "1 post on X.com highlighting key features",
      description:
        "Create engaging content showcasing our new smartphone's innovative features. Focus on camera quality, battery life, and design.",
      category: "Technology",
      createdAt: "April 5, 2025",
    },
    {
      id: 2,
      merchant: "EcoFashion",
      logo: "/abstract-fashion-logo.png",
      title: "Sustainable Clothing Line",
      status: "active",
      payment: "0.08 ETH",
      deadline: "May 30, 2025",
      requirements: "2 posts on X.com with product photos",
      description:
        "Promote our eco-friendly clothing line. Emphasize sustainable materials and ethical manufacturing process.",
      category: "Fashion",
      progress: 50,
      createdAt: "April 10, 2025",
    },
    {
      id: 3,
      merchant: "HealthySnacks",
      logo: "/abstract-leaf-swirl.png",
      title: "Organic Snack Box Promotion",
      status: "completed",
      payment: "0.03 ETH",
      deadline: "April 10, 2025",
      requirements: "1 review post with unboxing",
      description: "Share your honest review of our organic snack subscription box. Include unboxing experience.",
      category: "Food & Beverage",
      createdAt: "March 15, 2025",
      completedAt: "April 8, 2025",
    },
    {
      id: 4,
      merchant: "FitLife App",
      logo: "/dynamic-fitness-icon.png",
      title: "Fitness App Promotion",
      status: "active",
      payment: "0.06 ETH",
      deadline: "June 5, 2025",
      requirements: "3 posts showing app usage over 2 weeks",
      description:
        "Document your fitness journey using our app. Showcase different features and your progress over time.",
      category: "Health & Fitness",
      progress: 30,
      createdAt: "April 15, 2025",
    },
    {
      id: 5,
      merchant: "TravelEscape",
      logo: "/abstract-travel-logo.png",
      title: "Travel Booking Platform",
      status: "pending",
      payment: "0.1 ETH",
      deadline: "July 10, 2025",
      requirements: "1 detailed review post with screenshots",
      description:
        "Share your experience using our travel booking platform. Highlight ease of use and exclusive deals.",
      category: "Travel",
      createdAt: "April 20, 2025",
    },
    {
      id: 6,
      merchant: "CryptoWallet",
      logo: "/abstract-crypto-logo.png",
      title: "Crypto Wallet Features",
      status: "rejected",
      payment: "0.07 ETH",
      deadline: "May 5, 2025",
      requirements: "Tutorial on wallet setup and usage",
      description: "Create a beginner-friendly tutorial on setting up and using our crypto wallet.",
      category: "Finance",
      createdAt: "March 25, 2025",
      rejectedAt: "April 2, 2025",
      rejectionReason: "Campaign requirements not aligned with content focus",
    },
    {
      id: 7,
      merchant: "GameStream",
      logo: "/abstract-gaming-symbol.png",
      title: "Gaming Platform Review",
      status: "completed",
      payment: "0.04 ETH",
      deadline: "April 15, 2025",
      requirements: "Livestream gameplay and platform review",
      description: "Stream gameplay on our platform and share your thoughts on user experience and game selection.",
      category: "Gaming",
      createdAt: "March 10, 2025",
      completedAt: "April 12, 2025",
    },
    {
      id: 8,
      merchant: "BeautyEssentials",
      logo: "/elegant-botanical-logo.png",
      title: "Skincare Line Launch",
      status: "active",
      payment: "0.06 ETH",
      deadline: "June 1, 2025",
      requirements: "Before/after content showing product results",
      description: "Document your skincare journey using our new product line over a 3-week period.",
      category: "Beauty",
      progress: 70,
      createdAt: "April 8, 2025",
    },
  ]

  // Filter campaigns based on search query
  const filteredCampaigns = allCampaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get campaigns by status
  const pendingCampaigns = filteredCampaigns.filter((campaign) => campaign.status === "pending")
  const activeCampaigns = filteredCampaigns.filter((campaign) => campaign.status === "active")
  const completedCampaigns = filteredCampaigns.filter((campaign) => campaign.status === "completed")
  const rejectedCampaigns = filteredCampaigns.filter((campaign) => campaign.status === "rejected")

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
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="mr-1 h-3 w-3" />
            {language === "en" ? "Rejected" : "已拒绝"}
          </Badge>
        )
      default:
        return null
    }
  }

  const renderCampaignCard = (campaign: any) => (
    <Card key={campaign.id} className="bg-white/[0.03] border-white/10 mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src={campaign.logo || "/placeholder.svg"}
              alt={campaign.merchant}
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-medium text-white">{campaign.title}</h3>
              <p className="text-white/60">{campaign.merchant}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-white/[0.03] text-white/60 border-white/10">
              {campaign.category}
            </Badge>
            {getStatusBadge(campaign.status)}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-white/80">{campaign.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-purple-400 mr-2" />
            <div>
              <p className="text-white/60 text-sm">{language === "en" ? "Payment" : "支付"}</p>
              <p className="text-white">{campaign.payment}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-cyan-400 mr-2" />
            <div>
              <p className="text-white/60 text-sm">{language === "en" ? "Deadline" : "截止日期"}</p>
              <p className="text-white">{campaign.deadline}</p>
            </div>
          </div>
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-emerald-400 mr-2" />
            <div>
              <p className="text-white/60 text-sm">{language === "en" ? "Created" : "创建日期"}</p>
              <p className="text-white">{campaign.createdAt}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="mb-2">
            <p className="text-white/60 text-sm mb-1">{language === "en" ? "Requirements" : "要求"}</p>
            <p className="text-white">{campaign.requirements}</p>
          </div>

          {campaign.status === "active" && campaign.progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-white/60 text-sm">{language === "en" ? "Progress" : "进度"}</span>
                <span className="text-white/60 text-sm">{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2 bg-white/10 [&>div]:bg-purple-500" />
            </div>
          )}

          {campaign.status === "rejected" && campaign.rejectionReason && (
            <div className="mt-4 p-3 bg-red-500/10 rounded-md">
              <p className="text-white/60 text-sm mb-1">{language === "en" ? "Rejection Reason" : "拒绝原因"}</p>
              <p className="text-white">{campaign.rejectionReason}</p>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            {campaign.status === "pending" && (
              <>
                <Button variant="outline" className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]">
                  {language === "en" ? "Decline" : "拒绝"}
                </Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  {language === "en" ? "Accept Campaign" : "接受活动"}
                </Button>
              </>
            )}

            {campaign.status === "active" && (
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                {language === "en" ? "Submit Proof" : "提交证明"}
              </Button>
            )}

            {campaign.status === "completed" && (
              <Button variant="outline" className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]">
                {language === "en" ? "View Details" : "查看详情"}
              </Button>
            )}

            {campaign.status === "rejected" && (
              <Button variant="outline" className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]">
                {language === "en" ? "View Similar Campaigns" : "查看类似活动"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout userType="influencer">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{language === "en" ? "My Campaigns" : "我的活动"}</h1>
            <p className="text-white/60">
              {language === "en" ? "Manage and track all your campaigns" : "管理和跟踪您的所有活动"}
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

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder={language === "en" ? "Search campaigns..." : "搜索活动..."}
                className="pl-10 bg-white/[0.03] border-white/10 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]">
              <Filter className="h-4 w-4 mr-2" />
              {language === "en" ? "Filter" : "筛选"}
            </Button>
          </div>
        </div>

        <Card className="bg-white/[0.03] border-white/10 mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">{language === "en" ? "Campaign Statistics" : "活动统计"}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/[0.03] rounded-lg p-4">
                <p className="text-white/60 text-sm">{language === "en" ? "Total Campaigns" : "活动总数"}</p>
                <p className="text-2xl font-bold text-white">{allCampaigns.length}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-4">
                <p className="text-white/60 text-sm">{language === "en" ? "Active" : "进行中"}</p>
                <p className="text-2xl font-bold text-green-400">{activeCampaigns.length}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-4">
                <p className="text-white/60 text-sm">{language === "en" ? "Pending" : "待处理"}</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingCampaigns.length}</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-4">
                <p className="text-white/60 text-sm">{language === "en" ? "Completed" : "已完成"}</p>
                <p className="text-2xl font-bold text-blue-400">{completedCampaigns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/[0.03] border-white/10 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/10">
              {language === "en" ? "All" : "全部"} ({filteredCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Active" : "进行中"} ({activeCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Pending" : "待处理"} ({pendingCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Completed" : "已完成"} ({completedCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Rejected" : "已拒绝"} ({rejectedCampaigns.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map(renderCampaignCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  {language === "en" ? "No campaigns found matching your search." : "未找到匹配您搜索的活动。"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active">
            {activeCampaigns.length > 0 ? (
              activeCampaigns.map(renderCampaignCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  {language === "en" ? "No active campaigns at the moment." : "目前没有进行中的活动。"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingCampaigns.length > 0 ? (
              pendingCampaigns.map(renderCampaignCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  {language === "en" ? "No pending campaigns at the moment." : "目前没有待处理的活动。"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedCampaigns.length > 0 ? (
              completedCampaigns.map(renderCampaignCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  {language === "en" ? "No completed campaigns yet." : "尚未完成任何活动。"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedCampaigns.length > 0 ? (
              rejectedCampaigns.map(renderCampaignCard)
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">{language === "en" ? "No rejected campaigns." : "没有被拒绝的活动。"}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
