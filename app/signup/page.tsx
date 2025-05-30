"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { UserCheck, Building } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Choose Account Type</CardTitle>
          <CardDescription className="text-white/60">Select the type of account you want to create</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
            onClick={() => router.push("/signup/influencer")}
          >
            <UserCheck className="h-6 w-6" />
            <span>Influencer Account</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white"
            onClick={() => router.push("/signup/merchant")}
          >
            <Building className="h-6 w-6" />
            <span>Merchant Account</span>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
