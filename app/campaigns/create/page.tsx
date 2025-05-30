"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, DollarSign, CheckCircle, Wallet } from "lucide-react"

export default function CreateCampaignPage() {
  const router = useRouter()
  const { language } = useTranslation()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      router.push("/dashboard/merchant")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/dashboard/merchant")
    }
  }

  return (
    <DashboardLayout userType="merchant">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            {language === "en" ? "Create New Campaign" : "创建新活动"}
          </h1>
          <p className="text-white/60">
            {language === "en" ? "Set up your influencer marketing campaign" : "设置您的影响者营销活动"}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between relative">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center relative z-10 ${i <= step ? "text-white" : "text-white/40"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      i < step
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                        : i === step
                          ? "bg-white/10 border-2 border-purple-500"
                          : "bg-white/10"
                    }`}
                  >
                    {i < step ? <CheckCircle className="h-5 w-5 text-white" /> : i}
                  </div>
                  <span className="text-sm">
                    {language === "en"
                      ? ["Details", "Budget", "Targeting", "Review"][i - 1]
                      : ["详情", "预算", "定位", "审核"][i - 1]}
                  </span>
                </div>
              ))}
              <div className="absolute top-5 left-0 w-full h-0.5 bg-white/10 -z-10"></div>
              <div
                className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 -z-10 transition-all"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {step === 1 && (
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Campaign Details" : "活动详情"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Provide basic information about your campaign" : "提供有关您活动的基本信息"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    {language === "en" ? "Campaign Name" : "活动名称"}
                  </Label>
                  <Input
                    id="name"
                    placeholder={language === "en" ? "Enter campaign name" : "输入活动名称"}
                    className="bg-white/[0.03] border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    {language === "en" ? "Campaign Description" : "活动描述"}
                  </Label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder={language === "en" ? "Describe your campaign goals" : "描述您的活动目标"}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      {language === "en" ? "Category" : "类别"}
                    </Label>
                    <select
                      id="category"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                    >
                      <option value="tech">Technology</option>
                      <option value="fashion">Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="food">Food & Beverage</option>
                      <option value="health">Health & Fitness</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">{language === "en" ? "Deadline" : "截止日期"}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white/[0.03] border-white/10 text-white"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : language === "en" ? "Pick a date" : "选择日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-white/10">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-[#0a0a0a] text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white">
                    {language === "en" ? "Campaign Requirements" : "活动要求"}
                  </Label>
                  <textarea
                    id="requirements"
                    rows={4}
                    placeholder={language === "en" ? "What do you expect from influencers?" : "您对影响者有什么期望？"}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={handleBack}>
                  {language === "en" ? "Cancel" : "取消"}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  onClick={handleNext}
                >
                  {language === "en" ? "Next" : "下一步"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Campaign Budget" : "活动预算"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Set your budget and payment details" : "设置您的预算和支付详情"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-white/10">
                  <div className="flex items-center mb-4">
                    <Wallet className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="text-lg font-medium text-white">
                      {language === "en" ? "Wallet Balance" : "钱包余额"}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-white">1.25 ETH</p>
                      <p className="text-white/60">≈ $2,500 USD</p>
                    </div>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                      {language === "en" ? "Add Funds" : "添加资金"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-budget" className="text-white">
                      {language === "en" ? "Total Campaign Budget" : "活动总预算"}
                    </Label>
                    <div className="flex">
                      <div className="bg-white/[0.03] border border-white/10 rounded-l-md p-2 text-white flex items-center">
                        <DollarSign className="h-4 w-4 text-white/60" />
                      </div>
                      <Input
                        id="total-budget"
                        type="number"
                        placeholder="0.5"
                        className="flex-1 bg-white/[0.03] border border-white/10 border-l-0 rounded-l-none rounded-r-md p-2 text-white"
                      />
                      <select className="bg-white/[0.03] border border-white/10 border-l-0 rounded-r-md p-2 text-white">
                        <option value="eth">ETH</option>
                        <option value="usdt">USDT</option>
                        <option value="usdc">USDC</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="per-influencer" className="text-white">
                      {language === "en" ? "Budget Per Influencer" : "每个影响者的预算"}
                    </Label>
                    <div className="flex">
                      <div className="bg-white/[0.03] border border-white/10 rounded-l-md p-2 text-white flex items-center">
                        <DollarSign className="h-4 w-4 text-white/60" />
                      </div>
                      <Input
                        id="per-influencer"
                        type="number"
                        placeholder="0.05"
                        className="flex-1 bg-white/[0.03] border border-white/10 border-l-0 rounded-l-none rounded-r-md p-2 text-white"
                      />
                      <select className="bg-white/[0.03] border border-white/10 border-l-0 rounded-r-md p-2 text-white">
                        <option value="eth">ETH</option>
                        <option value="usdt">USDT</option>
                        <option value="usdc">USDC</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="influencer-count" className="text-white">
                      {language === "en" ? "Number of Influencers" : "影响者数量"}
                    </Label>
                    <Input
                      id="influencer-count"
                      type="number"
                      placeholder="10"
                      className="bg-white/[0.03] border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">{language === "en" ? "Payment Structure" : "支付结构"}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="upfront"
                        name="payment"
                        className="h-4 w-4 text-purple-500"
                        defaultChecked
                      />
                      <Label htmlFor="upfront" className="text-white">
                        {language === "en" ? "Pay upfront (100%)" : "预付款 (100%)"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="milestone" name="payment" className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="milestone" className="text-white">
                        {language === "en" ? "Pay on completion" : "完成后支付"}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={handleBack}>
                  {language === "en" ? "Back" : "返回"}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  onClick={handleNext}
                >
                  {language === "en" ? "Next" : "下一步"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  {language === "en" ? "Influencer Targeting" : "影响者定位"}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Define your target influencer criteria" : "定义您的目标影响者标准"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">{language === "en" ? "Influencer Categories" : "影响者类别"}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        "Technology",
                        "Fashion",
                        "Beauty",
                        "Food",
                        "Health",
                        "Travel",
                        "Finance",
                        "Gaming",
                        "Lifestyle",
                      ].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input type="checkbox" id={category.toLowerCase()} className="h-4 w-4 text-purple-500" />
                          <Label htmlFor={category.toLowerCase()} className="text-white">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">{language === "en" ? "Follower Count Range" : "粉丝数量范围"}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="micro" name="followers" className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="micro" className="text-white">
                          {language === "en" ? "Micro (10K-50K)" : "微型 (10K-50K)"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mid"
                          name="followers"
                          className="h-4 w-4 text-purple-500"
                          defaultChecked
                        />
                        <Label htmlFor="mid" className="text-white">
                          {language === "en" ? "Mid-tier (50K-500K)" : "中型 (50K-500K)"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="macro" name="followers" className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="macro" className="text-white">
                          {language === "en" ? "Macro (500K-1M)" : "大型 (500K-1M)"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="mega" name="followers" className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="mega" className="text-white">
                          {language === "en" ? "Mega (1M+)" : "超大型 (1M+)"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">{language === "en" ? "Engagement Rate" : "互动率"}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="any" name="engagement" className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="any" className="text-white">
                          {language === "en" ? "Any" : "任何"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="good"
                          name="engagement"
                          className="h-4 w-4 text-purple-500"
                          defaultChecked
                        />
                        <Label htmlFor="good" className="text-white">
                          {language === "en" ? "Good (2%+)" : "良好 (2%+)"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="high" name="engagement" className="h-4 w-4 text-purple-500" />
                        <Label htmlFor="high" className="text-white">
                          {language === "en" ? "High (4%+)" : "高 (4%+)"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">{language === "en" ? "Languages" : "语言"}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["English", "Chinese", "Spanish", "French", "German", "Japanese", "Korean", "Russian"].map(
                        (lang) => (
                          <div key={lang} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={lang.toLowerCase()}
                              className="h-4 w-4 text-purple-500"
                              defaultChecked={lang === "English" || lang === "Chinese"}
                            />
                            <Label htmlFor={lang.toLowerCase()} className="text-white">
                              {lang}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      {language === "en" ? "Location" : "位置"}
                    </Label>
                    <select
                      id="location"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md p-2 text-white"
                    >
                      <option value="global">{language === "en" ? "Global" : "全球"}</option>
                      <option value="us">United States</option>
                      <option value="china">China</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={handleBack}>
                  {language === "en" ? "Back" : "返回"}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  onClick={handleNext}
                >
                  {language === "en" ? "Next" : "下一步"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card className="bg-white/[0.03] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{language === "en" ? "Review Campaign" : "审核活动"}</CardTitle>
                <CardDescription className="text-white/60">
                  {language === "en" ? "Review your campaign details before launching" : "在启动前审核您的活动详情"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {language === "en" ? "Campaign Details" : "活动详情"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Campaign Name" : "活动名称"}</p>
                        <p className="text-white">New Smartphone Launch</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Category" : "类别"}</p>
                        <p className="text-white">Technology</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Deadline" : "截止日期"}</p>
                        <p className="text-white">May 15, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-2">{language === "en" ? "Budget" : "预算"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Total Budget" : "总预算"}</p>
                        <p className="text-white">0.5 ETH</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Per Influencer" : "每个影响者"}</p>
                        <p className="text-white">0.05 ETH</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Influencers" : "影响者"}</p>
                        <p className="text-white">10</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-2">{language === "en" ? "Targeting" : "定位"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Categories" : "类别"}</p>{" "}
                        <p className="text-white">Technology, Gaming</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Follower Range" : "粉丝范围"}</p>
                        <p className="text-white">Mid-tier (50K-500K)</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Languages" : "语言"}</p>
                        <p className="text-white">English, Chinese</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">{language === "en" ? "Location" : "位置"}</p>
                        <p className="text-white">Global</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-white/10">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="text-lg font-medium text-white">
                      {language === "en" ? "Payment Summary" : "支付摘要"}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">{language === "en" ? "Campaign Budget" : "活动预算"}</span>
                      <span className="text-white">0.5 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">{language === "en" ? "Platform Fee (5%)" : "平台费用 (5%)"}</span>
                      <span className="text-white">0.025 ETH</span>
                    </div>
                    <div className="border-t border-white/10 my-2"></div>
                    <div className="flex justify-between font-medium">
                      <span className="text-white">{language === "en" ? "Total Amount" : "总金额"}</span>
                      <span className="text-white">0.525 ETH</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="h-4 w-4 text-purple-500" />
                  <Label htmlFor="terms" className="text-white">
                    {language === "en" ? "I agree to the Terms and Conditions" : "我同意条款和条件"}
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={handleBack}>
                  {language === "en" ? "Back" : "返回"}
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  onClick={handleNext}
                >
                  {language === "en" ? "Launch Campaign" : "启动活动"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
