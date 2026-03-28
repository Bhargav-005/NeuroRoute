"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  ArrowUpRight,
  Clock,
  PiggyBank,
  History,
  Sparkles
} from "lucide-react"

const INITIAL_TRANSACTIONS = [
  { id: 1, creditsEarned: 320, savings: 0.0032, timestamp: "2m ago" },
  { id: 2, creditsEarned: 150, savings: 0.0015, timestamp: "5m ago" },
  { id: 3, creditsEarned: 480, savings: 0.0048, timestamp: "12m ago" },
]

export default function CreditWalletPanel() {
  const [totalCredits, setTotalCredits] = useState(12450)
  const [totalSavings, setTotalSavings] = useState(12.84)
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)

  useEffect(() => {
    const interval = setInterval(() => {
      const newCredits = Math.floor(Math.random() * 400) + 100
      const newSavings = newCredits / 100000

      const newTransaction = {
        id: Math.random().toString(36).substr(2, 9),
        creditsEarned: newCredits,
        savings: newSavings.toFixed(4),
        timestamp: "just now"
      }

      setTotalCredits(prev => prev + newCredits)
      setTotalSavings(prev => prev + parseFloat(newSavings))
      setTransactions(prev => [newTransaction, ...prev.slice(0, 4)])
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-[1.5rem] border border-[#E3DBBB] p-4 shadow-sm hover:shadow-lg hover:shadow-[#41431B]/5 transition-all flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-[#41431B] rounded-2xl text-white shadow-lg">
              <Wallet size={20} />
           </div>
           <div>
              <h3 className="text-xl font-serif text-[#41431B]">Credit Wallet</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#AEB784]">Token Economy Active</p>
           </div>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-yellow-100">
              <Sparkles size={12} fill="currentColor" /> Earned: +{((totalSavings - 12.84)*10).toFixed(2)}%
           </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="grid grid-cols-2 gap-3">
         <div className="p-4 bg-[#F8F3E1]/40 rounded-2xl border border-[#E3DBBB]/20 space-y-1">
            <div className="flex items-center gap-2 text-[#AEB784]">
               <Coins size={12} />
               <p className="text-[9px] font-bold uppercase tracking-widest">Total Credits</p>
            </div>
            <h4 className="text-xl font-serif text-[#41431B]">
               {totalCredits.toLocaleString()}
            </h4>
         </div>
         <div className="p-4 bg-[#F8F3E1]/40 rounded-2xl border border-[#E3DBBB]/20 space-y-1">
            <div className="flex items-center gap-2 text-[#AEB784]">
               <PiggyBank size={12} />
               <p className="text-[9px] font-bold uppercase tracking-widest">Efficiency Saved</p>
            </div>
            <h4 className="text-xl font-serif text-green-600">
               ${totalSavings.toFixed(2)}
            </h4>
         </div>
      </div>

      {/* Recent Activity */}
      <div className="flex-grow space-y-4">
         <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#AEB784] px-2 flex items-center gap-2">
            <History size={12} /> Recent Rewards
         </h4>
         <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
               {transactions.map((tx) => (
                  <motion.div
                     layout
                     key={tx.id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="p-3.5 bg-[#F8F3E1]/20 rounded-2xl border border-transparent hover:border-[#E3DBBB]/30 hover:bg-white transition-all flex items-center justify-between group cursor-default"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                           <TrendingUp size={16} />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-[#41431B]">+{tx.creditsEarned} Credits</p>
                           <p className="text-[9px] font-bold text-[#AEB784] uppercase tracking-widest">{tx.timestamp}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-green-600 whitespace-nowrap">+ ${tx.savings} Savings</p>
                        <ArrowUpRight size={14} className="text-[#AEB784] ml-auto mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      <div className="pt-3 border-t border-[#E3DBBB]/30">
         <button className="w-full py-3 rounded-xl bg-[#E3DBBB]/20 text-[#41431B] text-[9px] font-bold uppercase tracking-widest hover:bg-[#F8F3E1] border border-[#E3DBBB]/30 transition-all flex items-center justify-center gap-2">
            Review Selection Logic <ArrowUpRight size={12} />
         </button>
      </div>
    </div>
  )
}
