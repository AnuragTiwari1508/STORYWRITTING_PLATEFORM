import { SignupForm } from "@/components/auth/signup-form"
import { Header } from "@/components/layout/header"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Join StoryVerse</h1>
            <p className="text-muted-foreground mt-2">Create your account and start your storytelling journey</p>
          </div>
          <SignupForm />
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
