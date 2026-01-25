"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { getAssetPath } from "@/lib/utils"
import Image from "next/image"
import { Briefcase } from "lucide-react"

import { useEffect, useRef } from "react"

export function WorkSection({ onViewAll, limit, highlightedId }: { onViewAll?: () => void; limit?: number; highlightedId?: number | null }) {
    const workData = limit ? portfolioData.work.slice(0, limit) : portfolioData.work;
    const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

    useEffect(() => {
        if (highlightedId && itemRefs.current[highlightedId]) {
            itemRefs.current[highlightedId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [highlightedId])

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">work</h2>
                <button
                    onClick={onViewAll}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                    view all
                </button>
            </div>

            <div className="space-y-4">
                {workData.map((exp) => (
                    <div
                        key={exp.id}
                        ref={el => {
                            if (el) itemRefs.current[exp.id] = el
                        }}
                        className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-500 ${highlightedId === exp.id
                                ? "bg-accent/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-[1.02]"
                                : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-background border border-border group-hover:border-primary/50 transition-colors">
                                    {exp.logo ? (
                                        <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                                            <div className="absolute inset-0 flex items-center justify-center text-foreground">
                                                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 opacity-20" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                                                {exp.company.charAt(0)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center font-bold text-lg text-foreground">
                                            {exp.company.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                                        {exp.company}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-muted-foreground text-xs sm:text-sm">
                                            {exp.role}
                                        </p>
                                        {exp.type && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                                                {exp.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-foreground text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                                    {exp.period}
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-2 ml-4 sm:ml-16">
                            {exp.description.map((item, index) => (
                                <li key={index} className="text-muted-foreground text-xs sm:text-sm list-disc list-outside leading-relaxed">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
