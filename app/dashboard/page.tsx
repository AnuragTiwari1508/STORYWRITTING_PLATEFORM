"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { WriterDashboard } from "@/components/writer/writer-dashboard"
import { ReaderDashboard } from "@/components/reader/reader-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  const { user } = useAuth()

  return <ProtectedRoute>{user?.role === "writer" ? <WriterDashboard /> : <ReaderDashboard />}</ProtectedRoute>
}
