"use client"

import { portfolioData } from "@/lib/portfolio-data"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { getAssetPath } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { useHighlightedWork } from "@/components/site-shell"

// Bullets beyond this are hidden behind "show N more", so long jobs don't flood the page
const VISIBLE_BULLETS = 3

// "Title: details" -> bold title, plain details
function Bullet({ text }: { text: string }) {
    const i = text.indexOf(": ")
    if (i === -1) return <>{text}</>
    return (
        <>
            <span className="font-medium text-foreground">{text.slice(0, i)}</span>
            {text.slice(i)}
        </>
    )
}

function CompanyLogo({ company, logo, small }: { company: string; logo?: string; small?: boolean }) {
    const box = small ? "w-8 h-8" : "w-10 h-10 sm:w-12 sm:h-12"
    const img = small ? "w-5 h-5" : "w-6 h-6 sm:w-8 sm:h-8"
    return (
        <div className={`relative shrink-0 ${box} flex items-center justify-center rounded-lg bg-background border border-border overflow-hidden group-hover:border-primary/50 transition-colors`}>
            {logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized anyway
                <img src={getAssetPath(logo)} alt={`${company} logo`} width={32} height={32} loading="lazy" className={`${img} object-contain rounded`} />
            ) : (
                <span className={`font-bold text-foreground ${small ? "text-sm" : "text-lg"}`}>{company.charAt(0)}</span>
            )}
        </div>
    )
}

// One line per job, for the home page. Details live on /work/.
function CompactWorkList() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Work</h2>
                <Link href="/work/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    details
                </Link>
            </div>
            <ul className="divide-y divide-border/60">
                {portfolioData.work.map((exp) => (
                    <li key={exp.id}>
                        <Link href="/work/" className="group flex items-center gap-3 py-3">
                            <CompanyLogo company={exp.company} logo={exp.logo} small />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                    {exp.company}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground truncate">{exp.role}</p>
                            </div>
                            <p className="shrink-0 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                {exp.period}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function WorkSection({ limit, compact }: { limit?: number; compact?: boolean }) {
    if (compact) return <CompactWorkList />
    return <FullWorkSection limit={limit} />
}

function FullWorkSection({ limit }: { limit?: number }) {
    const workData = limit ? portfolioData.work.slice(0, limit) : portfolioData.work
    const highlightedId = useHighlightedWork()
    const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
    const [expanded, setExpanded] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (highlightedId && itemRefs.current[highlightedId]) {
            itemRefs.current[highlightedId]?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [highlightedId])

    const toggle = (id: number) =>
        setExpanded((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
                {limit ? (
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Work</h2>
                ) : (
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Work</h1>
                )}
                {limit && portfolioData.work.length > limit && (
                    <Link href="/work/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                        view all
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {workData.map((exp) => {
                    const isOpen = expanded.has(exp.id)
                    const hiddenCount = exp.description.length - VISIBLE_BULLETS
                    const bullets = isOpen ? exp.description : exp.description.slice(0, VISIBLE_BULLETS)

                    return (
                        <div
                            key={exp.id}
                            ref={(el) => {
                                if (el) itemRefs.current[exp.id] = el
                            }}
                            className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-500 ${highlightedId === exp.id
                                ? "bg-accent/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] scale-[1.02]"
                                : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex items-center space-x-4 min-w-0">
                                    <CompanyLogo company={exp.company} logo={exp.logo} />
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                                                {exp.company}
                                            </h3>
                                            {exp.link && (
                                                <a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${exp.company} website`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-xs sm:text-sm">{exp.role}</p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col items-end gap-1.5 text-right">
                                    <p className="text-foreground text-[10px] sm:text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                                        {exp.period}
                                    </p>
                                    {exp.type && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground whitespace-nowrap">
                                            {exp.type}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-2 ml-4 sm:ml-16">
                                {bullets.map((item, index) => (
                                    <li key={index} className="text-muted-foreground text-xs sm:text-sm list-disc list-outside leading-relaxed">
                                        <Bullet text={item} />
                                    </li>
                                ))}
                            </ul>
                            {hiddenCount > 0 && (
                                <button
                                    onClick={() => toggle(exp.id)}
                                    aria-expanded={isOpen}
                                    className="self-start mt-3 ml-0 sm:ml-12 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                                >
                                    {isOpen ? "show less" : `show ${hiddenCount} more`}
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
