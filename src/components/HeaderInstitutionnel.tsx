
import { ShieldCheck } from "lucide-react";

export default function HeaderInstitutionnel() {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-2 md:gap-0">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-institutional-blue" size={28} aria-hidden />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-primary-text">OSS117 Fact Checking Agent</h1>
            <div className="text-institutional-blue text-xs font-medium tracking-wide leading-tight">Professional Political Information Verification</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-institutional-blue-light text-institutional-blue font-medium text-xs px-2.5 py-1 rounded-lg">Powered by Specialized AI</span>
        </div>
      </div>
    </header>
  )
}
