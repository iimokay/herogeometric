"use client"

import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  ImageIcon,
  ImageIcon as ImageLucide,
  RefreshCw,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Video,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={className}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ContentCreatorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useTranslation()
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [fileUrls, setFileUrls] = useState<string[]>([]) // Store URLs for preview
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generatedIntegratedAd, setGeneratedIntegratedAd] = useState("")
  const [generatedDirectAd, setGeneratedDirectAd] = useState("")
  const [shared, setShared] = useState(false)
  const [sharedPlatform, setSharedPlatform] = useState<string>("")
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failed" | null>(null)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [redirectCountdown, setRedirectCountdown] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [imageLabels, setImageLabels] = useState<string[]>([])
  const [featuredAd, setFeaturedAd] = useState({
    id: 0,
    type: "",
    src: "",
    title: "",
    description: ""
  });
  const [recommendedAds, setRecommendedAds] = useState<typeof featuredAd[]>([]);

  // Create object URLs for file previews when files change
  useEffect(() => {
    // Clean up previous URLs to avoid memory leaks
    fileUrls.forEach((url) => URL.revokeObjectURL(url))
    // Create new URLs for each file
    const urls = files.map((file) => URL.createObjectURL(file))
    setFileUrls(urls)
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  // Check for shared status from URL parameters
  useEffect(() => {
    const platform = searchParams.get("platform")
    const status = searchParams.get("status")
    const contentId = searchParams.get("contentId")

    if (platform && status === "shared" && contentId) {
      // Simulate content verification
      setSharedPlatform(platform)
      setVerificationStatus("pending")

      // Simulate verification progress
      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setShared(true)
            return 100
          }
          return prev + 10
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [searchParams])

  // Countdown for automatic redirect to dashboard
  useEffect(() => {
    if (verificationStatus === "success") {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/dashboard/influencer")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [verificationStatus, router])

  // Function to detect language of text

  // Function to generate content based on user input

  // 添加文件转 base64 的函数
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 修改分析内容函数，添加媒体文件
  const analyzeContent = async (content: string, mediaBase64: {
    name: string;
    type: string;
    data: string;
  }[]) => {
    try {
      const response = await fetch('/api/ad/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mediaArray: mediaBase64
        }),
      });

      if (!response.ok) {
        throw new Error('分析请求失败');
      }

      return await response.json();
    } catch (error) {
      console.error('分析内容时出错:', error);
      throw error;
    }
  };

  // 添加广告搜索函数
  const searchAds = async (analysisResult: any) => {
    try {
      const response = await fetch('/api/ad/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisResult),
      });

      if (!response.ok) {
        throw new Error('搜索广告失败');
      }

      return await response.json();
    } catch (error) {
      console.error('搜索广告时出错:', error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setIsAnimating(true);
    setAnimationStep(0);
    setAnimationProgress(0);

    try {
      // 步骤 0: 发出分析请求
      setAnimationStep(0);
      setAnimationProgress(20);
      // 转换所有媒体文件为 base64
      const mediaArray = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await fileToBase64(file)
        }))
      );
      const analysisResult = await analyzeContent(content, mediaArray);
      // 步骤 1: 发出搜索请求
      setAnimationStep(1);
      setAnimationProgress(40);
      setImageLabels(analysisResult.analysisResult.keywords);
      const searchResult = await searchAds(analysisResult);

      // 步骤 2: 发出图片生成请求
      setAnimationStep(2);
      setAnimationProgress(60);
      const runwayResult = await fetch('/api/ad/runway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mediaArray,
          productId: searchResult.relevantProduct.productId
        }),
      }).then(res => res.json());

      // 步骤 3: 检查生成状态
      setAnimationStep(3);
      setAnimationProgress(80);

      // 轮询检查生成状态
      const checkStatus = async (taskId: string) => {
        const statusResult = await fetch(`/api/ad/runway/${taskId}`, {
          method: 'POST',
        }).then(res => res.json());

        if (statusResult.success) {
          // 步骤 4: 图片生成完成
          setAnimationStep(4);
          setAnimationProgress(100);

          // 更新特色广告
          if (statusResult.image) {
            setFeaturedAd({
              id: 0,
              type: "image",
              src: statusResult.image,
              title: analysisResult.theme,
              description: analysisResult.text
            });
          }

          // 更新推荐广告
          if (searchResult?.suggestedAds) {
            setRecommendedAds(searchResult.suggestedAds);
          }
          setGeneratedDirectAd(runwayResult.content);
          setGeneratedIntegratedAd(runwayResult.content);
          // 完成生成
          setTimeout(() => {
            setLoading(false);
            setIsAnimating(false);
            setGenerated(true);
            // setFiles([])
          }, 500);
        } else {
          // 继续轮询
          setTimeout(() => checkStatus(taskId), 3000);
        }
      };

      // 开始轮询检查状态
      if (runwayResult.id) {
        checkStatus(runwayResult.id);
      }

    } catch (error) {
      console.error('生成过程中出错:', error);
      // 发生错误时重置状态
      setLoading(false);
      setIsAnimating(false);
      // 可以在这里添加错误提示
      toast({
        title: language === "en" ? "Generation failed. Please try again." : "生成失败，请重试。",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      });
    }
  };

  // Function to skip the animation

  // Change the handleBack function to have a clearer comment
  const handleBack = () => {
    // If we're in the shared state, go back to the generated content view
    if (shared) {
      setShared(false)
      setVerificationStatus(null)
      setVerificationProgress(0)
    } else {
      // Otherwise, use window.history.back() to ensure we go back to the previous page in history
      window.history.back()
    }
  }

  // Handle sharing content to social media
  const handleShare = (platform: string) => {
    // Generate a unique content ID to track this specific share
    const contentId = Math.random().toString(36).substring(2, 15)

    let shareUrl = ""
    const shareText = encodeURIComponent(
      generatedIntegratedAd || generatedDirectAd || content || "Check out ImmerseAd!"
    )

    switch (platform) {
      case "twitter":
        // 如果是Twitter分享，先下载当前特色广告的图片（如果是图片类型）
        if (featuredAd.type === "image") {
          // 创建一个临时链接元素来下载图片
          const downloadLink = document.createElement('a');
          downloadLink.href = featuredAd.src;
          downloadLink.download = `immerseAd-${featuredAd.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // 延迟打开Twitter分享窗口，给用户时间保存图片
          setTimeout(() => {
            shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
            window.open(shareUrl, "_blank");

            // 显示提示，告诉用户附加刚刚下载的图片
            setTimeout(() => {
              alert(
                language === "en"
                  ? "Please attach the image you just downloaded to your Twitter post for better engagement. After sharing, return to this tab and click 'Verify Post'."
                  : "请将刚刚下载的图片附加到您的Twitter帖子中以获得更好的互动。分享后，返回此标签页并点击'验证帖子'。"
              );
            }, 500);
          }, 1000);
        } else if (featuredAd.type === "video") {
          // 如果是视频，提示用户下载视频
          alert(
            language === "en"
              ? "For best results, please download the video and attach it to your Twitter post. After sharing, return to this tab and click 'Verify Post'."
              : "为获得最佳效果，请下载视频并将其附加到您的Twitter帖子中。分享后，返回此标签页并点击'验证帖子'。"
          );

          // 创建一个临时链接元素来下载视频
          const downloadLink = document.createElement('a');
          downloadLink.href = featuredAd.src;
          downloadLink.download = `immerseAd-${featuredAd.title.toLowerCase().replace(/\s+/g, '-')}.mp4`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // 延迟打开Twitter分享窗口
          setTimeout(() => {
            shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
            window.open(shareUrl, "_blank");
          }, 1000);
        } else {
          // 如果没有媒体，直接分享文本
          shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
          window.open(shareUrl, "_blank");
        }
        break;
      case "youtube":
        shareUrl = "https://studio.youtube.com/channel/UC/videos/upload"
        window.open(shareUrl, "_blank")

        // 显示提示
        setTimeout(() => {
          alert(
            language === "en"
              ? "After uploading your content to YouTube, return to this tab and click 'Verify Post' to continue."
              : "将内容上传到YouTube后，返回此标签页并点击'验证帖子'继续。"
          )
        }, 500)
        break;
      case "instagram":
        // For Instagram, copy to clipboard and then open Instagram
        navigator.clipboard
          .writeText(generatedIntegratedAd || generatedDirectAd || content || "")
          .then(() => {
            // 如果有图片，提示用户下载
            if (featuredAd.type === "image") {
              // 创建一个临时链接元素来下载图片
              const downloadLink = document.createElement('a');
              downloadLink.href = featuredAd.src;
              downloadLink.download = `immerseAd-${featuredAd.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);

              alert(
                language === "en"
                  ? "Content copied to clipboard! Please use the image you just downloaded in your Instagram post. Click 'Verify Post' after sharing."
                  : "内容已复制到剪贴板！请在您的Instagram帖子中使用刚刚下载的图片。分享后点击'验证帖子'。"
              )
            } else {
              alert(
                language === "en"
                  ? "Content copied to clipboard! Paste it in your Instagram post. Click 'Verify Post' after sharing'."
                  : "内容已复制到剪贴板！粘贴到您的Instagram帖子中。分享后点击'验证帖子'。"
              )
            }
            window.open("https://www.instagram.com", "_blank")
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err)
            window.open("https://www.instagram.com", "_blank")
          })
        break;
    }

    // Store the platform for verification
    setSharedPlatform(platform)
  }

  // Add a new function to manually verify posts
  const handleVerifyPost = () => {
    if (!sharedPlatform) return

    setVerificationStatus("pending")

    // Simulate verification progress
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setVerificationStatus("success")
          setShared(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Function to remove a file
  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setFileUrls((prevUrls) => {
      // Revoke the URL to free up memory
      URL.revokeObjectURL(prevUrls[index])
      return prevUrls.filter((_, i) => i !== index)
    })
    setImageLabels((prevLabels) => prevLabels.filter((_, i) => i !== index))
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  // Mock data for available campaigns
  const availableCampaigns = [
    {
      id: 1,
      title: "New Smartphone Launch",
      brand: "TechGadgets Inc.",
      logo: "/abstract-tech-logo.png",
      reward: "$125.00",
      deadline: "May 15, 2025",
      engagement: 1200,
      category: "Technology",
      status: "pending",
    },
    {
      id: 2,
      title: "Sustainable Fashion Promotion",
      brand: "EcoFashion",
      logo: "/elegant-fashion-logo.png",
      reward: "$200.00",
      deadline: "May 30, 2025",
      engagement: 2400,
      category: "Fashion",
      status: "active",
    },
    {
      id: 3,
      title: "Organic Snack Box Review",
      brand: "HealthySnacks",
      logo: "/abstract-leaf-swirl.png",
      reward: "$75.00",
      deadline: "June 10, 2025",
      engagement: 800,
      category: "Food & Beverage",
      status: "active",
    },
  ]

  // Render verification in progress
  const renderVerificationInProgress = () => {
    return (
      <motion.div custom={1} variants={fadeInUpVariants} initial="hidden" animate="visible" className="space-y-6">
        <Card className="bg-white/[0.03] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">
                    {language === "en" ? "Verifying Your Post..." : "正在验证您的帖子..."}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {language === "en"
                      ? `We're checking your post on ${sharedPlatform === "twitter" ? "X" : sharedPlatform === "youtube" ? "YouTube" : "Instagram"}`
                      : `我们正在检查您在${sharedPlatform === "twitter" ? "X" : sharedPlatform === "youtube" ? "YouTube" : "Instagram"}上的帖子`}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">{language === "en" ? "Verification progress" : "验证进度"}</span>
                <span className="text-white/60">{verificationProgress}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2 bg-white/10 [&>div]:bg-purple-500" />

              <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">
                  {language === "en" ? "What we're checking:" : "我们正在检查:"}
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {language === "en" ? "Post exists on platform" : "帖子存在于平台上"}
                  </li>
                  <li className="flex items-center gap-2">
                    {verificationProgress > 40 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    {language === "en" ? "Content matches generated text" : "内容与生成的文本匹配"}
                  </li>
                  <li className="flex items-center gap-2">
                    {verificationProgress > 70 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    {language === "en" ? "Required hashtags included" : "包含所需的标签"}
                  </li>
                </ul>
              </div>

              <p className="text-white/60 text-center text-sm">
                {language === "en"
                  ? "Please wait while we verify your post. This usually takes less than a minute."
                  : "请稍候，我们正在验证您的帖子。这通常不到一分钟。"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Render earnings dashboard after sharing
  const renderEarningsDashboard = () => {
    // Calculate earnings based on platform in USD
    const baseEarnings = sharedPlatform === "twitter" ? 5.50 : sharedPlatform === "youtube" ? 12.75 : 8.25
    const platformName = sharedPlatform === "twitter" ? "X" : sharedPlatform === "youtube" ? "YouTube" : "Instagram"

    return (
      <motion.div custom={1} variants={fadeInUpVariants} initial="hidden" animate="visible" className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">
                    {language === "en" ? "Content Verified Successfully!" : "内容验证成功！"}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {language === "en"
                      ? `Your content has been verified on ${platformName}`
                      : `您的内容已在${platformName}上验证成功`}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-white/60 text-center">
              {language === "en"
                ? `Redirecting to your dashboard in ${redirectCountdown} seconds...`
                : `${redirectCountdown} 秒后重定向到您的仪表板...`}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">{language === "en" ? "Earnings" : "收益"}</CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "From this post" : "来自此帖子"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">${baseEarnings.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {language === "en" ? "Potential Earnings" : "潜在收益"}
              </CardTitle>
              <CardDescription className="text-white/60">
                {language === "en" ? "Based on engagement" : "基于互动"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">${(baseEarnings * 3).toFixed(2)}</p>

                  <p className="text-white/60 text-sm">
                    {language === "en" ? "If post reaches 1000+ engagements" : "如果帖子达到1000+互动"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">{language === "en" ? "Total Earnings" : "总收益"}</CardTitle>
              <CardDescription className="text-white/60">{language === "en" ? "All time" : "所有时间"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-cyan-400 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-white">$1,342.50</p>
                  <p className="text-white/60 text-sm">{language === "en" ? "From 12 posts" : "来自12个帖子"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/[0.03] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{language === "en" ? "Available Campaigns" : "可用活动"}</CardTitle>
            <CardDescription className="text-white/60">
              {language === "en" ? "Earn more by participating in these campaigns" : "通过参与这些活动赚取更多"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-4 bg-white/[0.03] rounded-lg border border-white/10 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={campaign.logo || "/placeholder.svg"}
                        alt={campaign.brand}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-white font-medium">{campaign.title}</h3>
                        <p className="text-white/60 text-sm">{campaign.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-400" />
                        <span className="text-white">{campaign.reward}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-white/60 text-sm">{campaign.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {campaign.status === "pending" ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">
                            {language === "en" ? "Pending" : "待处理"}
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">
                            {language === "en" ? "Active" : "活跃"}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                      >
                        {language === "en" ? "View Details" : "查看详情"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "en" ? "Back to Content" : "返回内容"}
          </Button>

          <Button
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
            onClick={() => router.push("/dashboard/influencer")}
          >
            {language === "en" ? "Go to Dashboard" : "前往仪表板"}
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    )
  }


  const handleAdSwap = (adIndex: number) => {
    // 保存当前特色广告
    const currentFeatured = { ...featuredAd };

    // 保存当前被点击的推荐广告
    const clickedAd = { ...recommendedAds[adIndex] };

    // 更新特色广告为被点击的广告
    setFeaturedAd(clickedAd);

    // 创建新的推荐广告数组，将原特色广告放在被点击的位置
    const newRecommendedAds = [...recommendedAds];
    newRecommendedAds[adIndex] = currentFeatured;

    // 使用 setRecommendedAds 更新推荐广告数组
    setRecommendedAds(newRecommendedAds);

    setGeneratedIntegratedAd(clickedAd.title);
    setGeneratedDirectAd(clickedAd.description);
  };
  // Function to update ad text based on ad title

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hiddenn bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-cyan-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-purple-500/[0.15]"
          className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-cyan-500/[0.15]"
          className="absolute right-[-5%] mdd:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-teal-500/[0.15]"
          className="absolute right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      <div className="absolute top-4 left-4 right-4 z-20 flex items-center">
        <div className="flex items-center">
          <Link href="/" className="text-white font-bold text-xl">
            ImmerseAd
          </Link>

          <nav className="flex items-center ml-6">
            <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors mr-4">
              {language === "en" ? "How It Works" : "工作原理"}
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition-colors mr-4">
              {language === "en" ? "Pricing" : "价格"}
            </Link>
            <Link href="/signup/merchant" className="text-white/70 hover:text-white transition-colors">
              {language === "en" ? "Poping Collaboration" : "Poping合作"}
            </Link>
          </nav>
        </div>

        <div className="ml-auto">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {language === "en" ? "Content Creator" : "内容创作器"}
            </h2>
            <p className="text-white/60">
              {language === "en"
                ? "Generate engaging content for your social media platforms"
                : "为您的社交媒体平台生成吸引人的内容"}
            </p>
          </motion.div>

          {verificationStatus === "pending" ? (
            renderVerificationInProgress()
          ) : shared ? (
            renderEarningsDashboard()
          ) : !generated && !isAnimating ? (
            <motion.div
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <Textarea
                placeholder={
                  language === "en"
                    ? "Fill you post, then get earned. Supporting X, Youtube, Instagram and more to come."
                    : "填写您的帖子，然后获得收益。支持X，Youtube，Instagram以及更多即将推出的平台。"
                }
                className="min-h-[150px] bg-white/[0.03] border-white/10 text-white mb-4 placeholder:text-white/40"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              {/* Preview of uploaded files */}
              {files.length > 0 && (
                <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-white/[0.05] border border-white/10 rounded-md overflow-hidden flex items-center justify-center">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={fileUrls[index] || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Video className="h-10 w-10 text-cyan-400" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <p className="text-white/60 text-xs mt-1 truncate">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {/* Direct file input button that's more reliable */}
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                  onClick={() => {
                    // Create and trigger a file input element programmatically
                    const fileInput = document.createElement("input")
                    fileInput.type = "file"
                    fileInput.accept = "image/*,video/*"
                    fileInput.multiple = true // Allow multiple files

                    // Add the change event listener
                    fileInput.onchange = (e) => {
                      const target = e.target as HTMLInputElement
                      if (target.files && target.files.length > 0) {
                        const newFiles = Array.from(target.files)
                        setFiles((prevFiles) => [...prevFiles, ...newFiles])

                        // Log for debugging
                        console.log("Files selected:", newFiles)
                      }
                    }

                    // Trigger the file dialog
                    fileInput.click()
                  }}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {language === "en" ? "Upload Media" : "上传媒体"}
                </Button>

                <div className="ml-auto">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                    onClick={handleGenerate}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {language === "en" ? "Generating..." : "生成中..."}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {language === "en" ? "Generate" : "生成"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}

          {isAnimating && (
            <motion.div
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <svg
                      className="animate-spin h-32 w-32 text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{`${Math.floor(animationProgress).toString().padStart(2, '0')}%`}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-center text-white">
                    {animationStep === 0 && "Analyzing your input..."}
                    {animationStep === 1 && "Identifying key themes..."}
                    {animationStep === 2 && "Processing uploaded media..."}
                    {animationStep === 3 && "Creating theme..."}
                    {animationStep === 4 && "Finalizing your content..."}
                  </h3>

                  <Progress
                    value={animationProgress}
                    className="h-2 bg-white/10 [&>div]:bg-purple-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div
                      className={`p-4 rounded-lg border ${animationStep >= 0 ? "bg-purple-500/20 border-purple-500/50" : "bg-white/[0.03] border-white/10"}`}
                    >
                      <div className="flex items-center justify-center h-10">
                        {animationStep >= 0 ? (
                          <Brain className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Clock className="h-6 w-6 text-white/40" />
                        )}
                      </div>
                      <p className="text-center text-sm mt-2 text-white/80">Text Analysis</p>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${animationStep >= 1 ? "bg-purple-500/20 border-purple-500/50" : "bg-white/[0.03] border-white/10"}`}
                    >
                      <div className="flex items-center justify-center h-10">
                        {animationStep >= 1 ? (
                          <FileText className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Clock className="h-6 w-6 text-white/40" />
                        )}
                      </div>
                      <p className="text-center text-sm mt-2 text-white/80">Theme Extraction</p>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${animationStep >= 2 ? "bg-purple-500/20 border-purple-500/50" : "bg-white/[0.03] border-white/10"}`}
                    >
                      <div className="flex items-center justify-center h-10">
                        {files.length === 0 ? (
                          <span className="text-white/40 text-xs">No media</span>
                        ) : animationStep >= 2 ? (
                          <ImageLucide className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Clock className="h-6 w-6 text-white/40" />
                        )}
                      </div>
                      <p className="text-center text-sm mt-2 text-white/80">Media Processing</p>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${animationStep >= 3 ? "bg-purple-500/20 border-purple-500/50" : "bg-white/[0.03] border-white/10"}`}
                    >
                      <div className="flex items-center justify-center h-10">
                        {animationStep >= 3 ? (
                          <Sparkles className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Clock className="h-6 w-6 text-white/40" />
                        )}
                      </div>
                      <p className="text-center text-sm mt-2 text-white/80">Content Generation</p>
                    </div>
                  </div>

                  {files.length > 0 && animationStep >= 2 && (
                    <div className="mt-4">
                      <h4 className="text-white/80 text-sm mb-2">Analyzing media content:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {fileUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-white/[0.05] border border-white/10 rounded-md overflow-hidden flex items-center justify-center">
                              {files[index]?.type.startsWith("image/") ? (
                                <>
                                  <img
                                    src={url || "/placeholder.svg"}
                                    alt={files[index]?.name}
                                    className="w-full h-full object-cover opacity-70"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <div className="text-xs text-white/90 text-center p-1">
                                      {imageLabels[index] || "analyzing..."}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Video className="h-10 w-10 text-cyan-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {generated && (
            <motion.div custom={1} variants={fadeInUpVariants} initial="hidden" animate="visible" className="space-y-6">
              <Tabs defaultValue="integrated" className="w-full">
                <TabsList className="bg-white/[0.08] border border-white/20 mb-6 w-full p-1">
                  <TabsTrigger
                    value="integrated"
                    className="flex-1 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
                  >
                    {language === "en" ? "Smooth Integrated Ad" : "平滑集成广告"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="direct"
                    className="flex-1 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 hover:text-white transition-colors"
                  >
                    {language === "en" ? "Direct Ad" : "直接广告"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="integrated">
                  <Card className="bg-white/[0.03] border-white/10">
                    <CardContent className="p-6">
                      <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10 mb-4 select-none">
                        <p className="text-white whitespace-pre-line">{generatedIntegratedAd}</p>
                      </div>

                      {/* Image display section */}
                      {fileUrls.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {fileUrls.map((url, index) => (
                            // 只显示不是 Meme.jpg 的文件
                            files[index]?.name.toLowerCase() !== "meme.jpg" ? (
                              <div key={index} className="flex flex-col items-center">
                                {files[index]?.type.startsWith("image/") ? (
                                  <div className="w-full aspect-video relative rounded-md overflow-hidden">
                                    <img
                                      src={url || "/placeholder.svg"}
                                      alt={`Uploaded content ${index + 1}`}
                                      className="w-full h-full object-contain bg-black/20"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full aspect-video bg-black/20 rounded-md flex items-center justify-center">
                                    <Video className="h-12 w-12 text-cyan-400" />
                                  </div>
                                )}
                                <p className="text-white/60 text-sm mt-2">{files[index]?.name}</p>
                              </div>
                            ) : null
                          ))}
                        </div>
                      )}

                      {/* Featured Ad */}
                      <div className="mt-4 mb-6">
                        <div className="bg-white/[0.03] rounded-lg p-3 border border-white/10 hover:border-purple-500/50 transition-colors">
                          <div className="aspect-video relative rounded-md overflow-hidden mb-2">
                            {featuredAd.type === "image" ? (
                              <img
                                src={featuredAd.src || "/placeholder.svg"}
                                alt={featuredAd.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={featuredAd.src}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              ></video>
                            )}
                          </div>
                          <h4 className="text-white font-medium text-sm">{featuredAd.title}</h4>
                          <p className="text-white/60 text-xs">{featuredAd.description}</p>
                        </div>
                      </div>

                      {/* Regenerate button between featured ad and recommended ads */}
                      <div className="flex justify-between my-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                            onClick={handleGenerate}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {language === "en" ? "Regenerate" : "重新生成"}
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Recommended Ads */}
                      <div className="mt-6">
                        <h3 className="text-white font-medium mb-3">Recommended Ads:</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {recommendedAds.map((ad, index) => (
                            <div
                              key={ad.id}
                              className="bg-white/[0.03] rounded-lg p-3 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer"
                              onClick={() => handleAdSwap(index)}
                            >
                              <div className="aspect-video relative rounded-md overflow-hidden mb-2 bg-black/30">
                                {ad.type === "image" ? (
                                  <img
                                    src={ad.src || "/placeholder.svg"}
                                    alt={ad.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <video
                                    src={ad.src}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                  ></video>
                                )}
                              </div>
                              <h4 className="text-white font-medium text-sm">{ad.title}</h4>
                              <p className="text-white/60 text-xs">{ad.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="direct">
                  <Card className="bg-white/[0.03] border-white/10">
                    <CardContent className="p-6">
                      <div className="bg-white/[0.03] rounded-lg p-4 border border-white/10 mb-4 select-none">
                        <p className="text-white whitespace-pre-line">{generatedDirectAd}</p>
                      </div>

                      {/* Image display section for direct ad tab */}
                      {fileUrls.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {fileUrls.map((url, index) => (
                            // 只显示不是 Meme.jpg 的文件
                            files[index]?.name.toLowerCase() !== "meme.jpg" ? (
                              <div key={index} className="flex flex-col items-center">
                                {files[index]?.type.startsWith("image/") ? (
                                  <div className="w-full aspect-video relative rounded-md overflow-hidden">
                                    <img
                                      src={url || "/placeholder.svg"}
                                      alt={`Uploaded content ${index + 1}`}
                                      className="w-full h-full object-contain bg-black/20"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full aspect-video bg-black/20 rounded-md flex items-center justify-center">
                                    <Video className="h-12 w-12 text-cyan-400" />
                                  </div>
                                )}
                                <p className="text-white/60 text-sm mt-2">{files[index]?.name}</p>
                              </div>
                            ) : null
                          ))}
                        </div>
                      )}

                      {/* Featured Ad */}
                      <div className="mt-4 mb-6">
                        <div className="bg-white/[0.03] rounded-lg p-3 border border-white/10 hover:border-purple-500/50 transition-colors">
                          <div className="aspect-video relative rounded-md overflow-hidden mb-2">
                            {featuredAd.type === "image" ? (
                              <img
                                src={featuredAd.src || "/placeholder.svg"}
                                alt={featuredAd.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={featuredAd.src}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                              ></video>
                            )}
                          </div>
                          <h4 className="text-white font-medium text-sm">{featuredAd.title}</h4>
                          <p className="text-white/60 text-xs">{featuredAd.description}</p>
                        </div>
                      </div>

                      {/* Regenerate button between featured ad and recommended ads */}
                      <div className="flex justify-between my-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                            onClick={handleGenerate}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {language === "en" ? "Regenerate" : "重新生成"}
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05]"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Recommended Ads */}
                      <div className="mt-6">
                        <h3 className="text-white font-medium mb-3">Recommended Ads:</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {recommendedAds.map((ad, index) => (
                            <div
                              key={ad.id}
                              className="bg-white/[0.03] rounded-lg p-3 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer"
                              onClick={() => handleAdSwap(index)}
                            >
                              <div className="aspect-video relative rounded-md overflow-hidden mb-2 bg-black/30">
                                {ad.type === "image" ? (
                                  <img
                                    src={ad.src || "/placeholder.svg"}
                                    alt={ad.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <video
                                    src={ad.src}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                  ></video>
                                )}
                              </div>
                              <h4 className="text-white font-medium text-sm">{ad.title}</h4>
                              <p className="text-white/60 text-xs">{ad.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Social media buttons section */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-white/70 mr-4 font-medium">
                    {language === "en" ? "Pop to earn" : "点击赚取"}
                  </span>
                  <Button
                    variant="outline"
                    className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05] hover:border-cyan-400/50 transition-colors p-3"
                    onClick={() => handleShare("twitter")}
                    title={language === "en" ? "Share to X with image" : "分享到X（包含图片）"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05] hover:border-red-500/50 transition-colors p-3"
                    onClick={() => handleShare("youtube")}
                    title={language === "en" ? "Share to YouTube" : "分享到YouTube"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.05] hover:border-purple-500/50 transition-colors p-3"
                    onClick={() => handleShare("instagram")}
                    title={language === "en" ? "Share to Instagram with image" : "分享到Instagram（包含图片）"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Button>
                </div>

                <p className="text-white/60 text-xs text-center mt-1">
                  {language === "en"
                    ? "Images and videos will be downloaded for you to attach to your posts"
                    : "图片和视频将被下载，供您附加到帖子中"}
                </p>

                {/* Add Verify Post button that appears after sharing */}
                {sharedPlatform && !shared && verificationStatus !== "pending" && (
                  <div className="mt-4">
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                      onClick={handleVerifyPost}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {language === "en" ? "Verify Post" : "验证帖子"}
                    </Button>
                    <p className="text-white/60 text-sm text-center mt-2">
                      {language === "en"
                        ? `Click after sharing to ${sharedPlatform === "twitter" ? "X" : sharedPlatform === "youtube" ? "YouTube" : "Instagram"}`
                        : `分享到${sharedPlatform === "twitter" ? "X" : sharedPlatform === "youtube" ? "YouTube" : "Instagram"}后点击`}
                    </p>
                  </div>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/[0.03]"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {language === "en" ? "Back" : "返回"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {!generated && !shared && !isAnimating && verificationStatus !== "pending" && (
            <motion.div
              custom={3}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 flex justify-center"
            >
              <Button
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/[0.03]"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "en" ? "Back" : "返回"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
