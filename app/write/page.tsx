import { WriterDashboard } from "@/components/writer/writer-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function WritePage() {
  return (
    <ProtectedRoute requiredRole="writer">
      <WriterDashboard />
    </ProtectedRoute>
  )
}
