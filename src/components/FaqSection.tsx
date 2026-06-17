import { useState } from "react";
import { faqData } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4" id="faq-accordion-root">
      {faqData.map((faq) => {
        const isOpen = openId === faq.id;
        
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "bg-white border-brand-blue-200 shadow-lg shadow-brand-blue-500/5 ring-1 ring-brand-blue-100"
                : "bg-white/60 border-slate-100/80 hover:bg-white hover:border-slate-300 shadow-sm"
            } overflow-hidden`}
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-brand-blue-500 bg-brand-blue-50 p-1.5 rounded-lg">
                  <HelpCircle className="w-4.5 h-4.5" />
                </span>
                <span className="text-base md:text-lg font-display font-semibold text-slate-900 tracking-tight leading-snug">
                  {faq.question}
                </span>
              </div>
              <span
                className={`mt-1.5 shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-brand-blue-50 border-brand-blue-200 text-brand-blue-600" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm md:text-base text-slate-600 leading-relaxed pl-13 border-t border-slate-50">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
