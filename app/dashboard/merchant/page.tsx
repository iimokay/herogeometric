"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Wallet, Users, DollarSign, PlusCircle, CheckCircle, Clock, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"

export default function MerchantDashboardPage() {
  const { t, language } = useTranslation()
  const [walletConnected, setWalletConnected] = useState(true)

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      title: "New Smartphone Launch",
      status: "active",
      budget: "0.5 ETH",
      spent: "0.13 ETH",
      influencers: 3,
      engagement: 1240,
      deadline: "May 15, 2025",
    },
    {
      id: 2,
      title: "Summer Collection Promotion",
      status: "pending",
      budget: "0.3 ETH",
      spent: "0.0 ETH",
      influencers: 0,
      engagement: 0,
      deadline: "June 1, 2025",
    },
    {
      id: 3,
      title: "App Download Campaign",
      status: "completed",
      budget: "0.4 ETH",
      spent: "0.4 ETH",
      influencers: 5,
      engagement: 3200,
      deadline: "April 10, 2025",
    },
  ]

  // Mock data for influencers
  const influencers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Tech",
      followers: "120K",
      engagement: "4.5%",
      status: "active",
    },
    {
      id: 2,
      name: "Li Wei",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Lifestyle",
      followers: "85K",
      engagement: "3.8%",
      status: "active",
    },
    {
      id: 3,
      name: "David Wang",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Fashion",
      followers: "210K",
      engagement: "5.2%",
      status: "pending",
    },
  ]

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
    <DashboardLayout userType="merchant">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {language === "en" ? "Merchant Dashboard" : "商家仪表板"}
            </h1>
            <p className="text-white/60">
              {language === "en" ? "Manage your campaigns and influencers" : "管理您的活动和影响者"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
              onClick={() => {}}
            >
              {language === "en" ? "Create New Campaign" : "创建新活动"}
            </Button>
          </div>
        </div>

        {!walletConnected && (
          <Card className="mb-8 bg-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Wallet className="h-8 w-8 text-purple-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {language === "en" ? "Connect Your Wallet" : "连接您的钱包"}
                    </h3>
                    <p className="text-white/60">
                      {language === "en" ? "Connect your wallet to fund campaigns" : "连接您的钱包为活动提供资金"}
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => setWalletConnected(true)}
                >
                  {language === "en" ? "Connect Wallet" : "连接钱包"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">{language === "en" ? "Total Spent" : "总支出"}</CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "All time campaign spending" : "所有时间的活动支出"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">0.53 ETH</p>
                  <p className="text-white/60 text-sm">≈ $1,060 USD</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {language === "en" ? "Active Campaigns" : "活跃活动"}
              </CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "Currently running" : "当前正在进行"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-cyan-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">2</p>
                  <p className="text-white/60 text-sm">{language === "en" ? "1 pending approval" : "1个待批准"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {language === "en" ? "Total Influencers" : "影响者总数"}
              </CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "Working with you" : "与您合作"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-emerald-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">8</p>
                  <p className="text-white/60 text-sm">{language === "en" ? "Across all campaigns" : "所有活动中"}</p>
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
            <TabsTrigger value="influencers" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Influencers" : "影响者"}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10">
              {language === "en" ? "Analytics" : "分析"}
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
                      <div>
                        <h3 className="text-lg font-medium text-white">{campaign.title}</h3>
                        <p className="text-white/60">
                          {language === "en" ? "Deadline" : "截止日期"}: {campaign.deadline}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">{getStatusBadge(campaign.status)}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Budget" : "预算"}</p>
                        <p className="text-white">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Spent" : "已花费"}</p>
                        <p className="text-white">{campaign.spent}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Influencers" : "影响者"}</p>
                        <p className="text-white">{campaign.influencers}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Engagement" : "互动"}</p>
                        <p className="text-white">{campaign.engagement}</p>
                      </div>
                    </div>
                    {campaign.status === "active" && (
                      <div className="mt-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-white/60 text-sm">
                            {language === "en" ? "Budget Usage" : "预算使用情况"}
                          </span>
                          <span className="text-white/60 text-sm">
                            {Math.round((Number.parseFloat(campaign.spent) / Number.parseFloat(campaign.budget)) * 100)}
                            %
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (Number.parseFloat(campaign.spent) / Number.parseFloat(campaign.budget)) * 100,
                          )}
                          className="h-2 bg-white/10"/>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                      >
                        {language === "en" ? "View Details" : "查看详情"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="influencers">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-white">
                {language === "en" ? "Your Influencers" : "您的影响者"}
              </h3>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                {language === "en" ? "Find Influencers" : "查找影响者"}
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {influencers.map((influencer) => (
                <Card key={influencer.id} className="bg-white/[0.03] border-white/10">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <Image
                          src={influencer.avatar || "/placeholder.svg"}
                          alt={influencer.name}
                          width={50}
                          height={50}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-white">{influencer.name}</h3>
                          <div className="flex items-center text-white/60">
                            <span className="mr-2">{influencer.category}</span>
                            <Badge variant="outline" className="bg-white/[0.03] text-white/60 border-white/10">
                              {influencer.followers} {language === "en" ? "followers" : "粉丝"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <p className="text-white/60 text-sm">{language === "en" ? "Engagement" : "互动率"}</p>
                          <p className="text-white">{influencer.engagement}</p>
                        </div>
                        {influencer.status === "active" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            {language === "en" ? "Active" : "活跃"}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            {language === "en" ? "Pending" : "待定"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05] mr-2"
                      >
                        {language === "en" ? "View Profile" : "查看资料"}
                      </Button>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                        {language === "en" ? "Invite to Campaign" : "邀请参加活动"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Campaign Performance" : "活动表现"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Overview of your campaign metrics" : "您的活动指标概览"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 relative">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex items-end justify-between h-64">
                      <div className="flex flex-col items-center w-1/4">
                        <div
                          className="w-12 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-md"
                          style={{ height: "60%" }}
                        ></div>
                        <div className="mt-2 text-white/60">Q1</div>
                        <div className="text-white font-medium">1,200</div>
                      </div>
                      <div className="flex flex-col items-center w-1/4">
                        <div
                          className="w-12 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-md"
                          style={{ height: "80%" }}
                        ></div>
                        <div className="mt-2 text-white/60">Q2</div>
                        <div className="text-white font-medium">2,400</div>
                      </div>
                      <div className="flex flex-col items-center w-1/4">
                        <div
                          className="w-12 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-md"
                          style={{ height: "40%" }}
                        ></div>
                        <div className="mt-2 text-white/60">Q3</div>
                        <div className="text-white font-medium">1,800</div>
                      </div>
                      <div className="flex flex-col items-center w-1/4">
                        <div
                          className="w-12 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-md"
                          style={{ height: "90%" }}
                        ></div>
                        <div className="mt-2 text-white/60">Q4</div>
                        <div className="text-white font-medium">3,200</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="bg-white/[0.03] border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/60 text-sm">{language === "en" ? "Total Engagement" : "总互动"}</p>
                          <p className="text-2xl font-bold text-white">8,600</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/[0.03] border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/60 text-sm">
                            {language === "en" ? "Avg. Cost per Engagement" : "平均每次互动成本"}
                          </p>
                          <p className="text-2xl font-bold text-white">0.00006 ETH</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-cyan-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/[0.03] border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/60 text-sm">{language === "en" ? "Conversion Rate" : "转化率"}</p>
                          <p className="text-2xl font-bold text-white">3.2%</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet">
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Wallet Settings" : "钱包设置"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Manage your crypto wallet" : "管理您的加密货币钱包"}
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
                        <span className="text-white/60">
                          {language === "en" ? "Wallet Address (EVM)" : "钱包地址 (EVM)"}
                        </span>
                        <span className="text-white font-mono">0x83B...A7F1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{language === "en" ? "Wallet Type" : "钱包类型"}</span>
                        <span className="text-white">MetaMask</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">{language === "en" ? "Balance" : "余额"}</span>
                        <span className="text-white">1.25 ETH</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      {language === "en" ? "Fund Your Account" : "为您的账户充值"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-sm mb-1 block">
                          {language === "en" ? "Amount" : "金额"}
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            placeholder="0.5"
                            className="flex-1 bg-white/[0.03] border border-white/10 rounded-l-md p-2 text-white"
                          />
                          <select className="bg-white/[0.03] border border-white/10 border-l-0 rounded-r-md p-2 text-white">
                            <option value="eth">ETH</option>
                            <option value="usdt">USDT</option>
                            <option value="usdc">USDC</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                          {language === "en" ? "Add Funds" : "添加资金"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      {language === "en" ? "Transaction History" : "交易历史"}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                        <div>
                          <p className="text-white">{language === "en" ? "Added Funds" : "添加资金"}</p>
                          <p className="text-white/60 text-sm">April 25, 2025</p>
                        </div>
                        <div className="text-green-400">+0.5 ETH</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                        <div>
                          <p className="text-white">{language === "en" ? "Campaign Payment" : "活动支付"}</p>
                          <p className="text-white/60 text-sm">April 20, 2025</p>
                        </div>
                        <div className="text-red-400">-0.08 ETH</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/[0.03] rounded-md">
                        <div>
                          <p className="text-white">{language === "en" ? "Campaign Payment" : "活动支付"}</p>
                          <p className="text-white/60 text-sm">April 15, 2025</p>
                        </div>
                        <div className="text-red-400">-0.05 ETH</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
