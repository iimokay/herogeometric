"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, User } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useRouter } from "next/navigation"

export default function LanguageSwitcher() {
  const { setLanguage, language } = useTranslation()
  const router = useRouter()

  const handleProfileClick = () => {
    try {
      // Navigate to the influencer's profile page
      router.push("/dashboard/influencer")
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return (
    <div className="flex items-center gap-1 justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Globe className="h-5 w-5" />
            <span className="sr-only">Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-purple-500/10" : ""}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("zh")} className={language === "zh" ? "bg-purple-500/10" : ""}>
            中文
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon" className="text-white hover:text-white" onClick={handleProfileClick}>
        <User className="h-5 w-5" />
        <span className="sr-only">Profile</span>
      </Button>
    </div>
  )
}
