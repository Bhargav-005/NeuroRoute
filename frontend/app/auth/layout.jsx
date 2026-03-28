"use client"

import VisualPanel from "@/components/auth/visual-panel"

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#F8F3E1]">
      {/* Forms Section */}
      <section className="flex items-center justify-center px-6 py-12 lg:px-16 lg:py-20 relative order-2 lg:order-1">
        {/* Decorative corner element */}
        <div className="absolute top-8 left-8">
           <a href="/" className="text-xl font-serif text-[#41431B] hover:opacity-70 transition-opacity">NeuroRoute</a>
        </div>
        
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>

      {/* Branding Section (Visual Panel) */}
      <section className="hidden lg:block order-1 lg:order-2 overflow-hidden h-screen sticky top-0">
        <VisualPanel />
      </section>

      {/* Mobile Visual (Stacked) */}
      <section className="lg:hidden h-40 w-full overflow-hidden order-1">
        <VisualPanel />
      </section>
    </main>
  )
}
