import { AppShell, FloatingActionButton } from "@/components/app-shell"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <FloatingActionButton />
    </AppShell>
  )
}
