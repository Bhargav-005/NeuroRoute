"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  Product: ["Routing", "Pricing", "SDKs", "Changelog"],
  Resources: ["Documentation", "API Reference", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
}

export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-serif text-[#222831]">NeuroRoute</span>
            </a>
            <p className="text-sm text-[#393E46] opacity-60 leading-relaxed max-w-xs">
              Intelligent AI infrastructure for engineering teams that value 
              performance and efficiency.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#222831] mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#393E46] hover:text-[#222831] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#EAEAEA] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#393E46] opacity-50 font-medium">
            &copy; {new Date().getFullYear()} NeuroRoute. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[#D0D0D0] hover:text-[#222831] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-[#D0D0D0] hover:text-[#222831] transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="text-[#D0D0D0] hover:text-[#222831] transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
