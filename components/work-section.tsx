"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function WorkSection({ highlightedId }: { highlightedId?: number | null }) {
    // Latest role starts open
    const [openIds, setOpenIds] = useState<Set<number>>(() => new Set([portfolioData.work[0]?.id]))

    useEffect(() => {
        if (highlightedId) {
            setOpenIds(prev => new Set(prev).add(highlightedId))
            document.getElementById(`work-${highlightedId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [highlightedId])

    const toggle = (id: number) =>
        setOpenIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })

    return (
        <ol className="divide-y divide-border">
            {portfolioData.work.map((exp) => {
                const isOpen = openIds.has(exp.id)
                return (
                    <li
                        key={exp.id}
                        id={`work-${exp.id}`}
                        className={`py-4 transition-colors duration-700 ${highlightedId === exp.id ? "bg-accent/60" : ""}`}
                    >
                        <button
                            onClick={() => toggle(exp.id)}
                            aria-expanded={isOpen}
                            className="group flex w-full items-baseline gap-3 text-left"
                        >
                            <span className="flex-1">
                                <span className="font-medium text-foreground">{exp.company}</span>
                                <span className="text-muted-foreground"> · {exp.role}</span>
                            </span>
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">{exp.period}</span>
                            <ChevronDown
                                className={`h-3.5 w-3.5 shrink-0 self-center text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isOpen && (
                            <div className="fade-up mt-3 space-y-3">
                                <ul className="space-y-2">
                                    {exp.description.map((item, index) => {
                                        const [head, ...rest] = item.split(": ")
                                        return (
                                            <li key={index} className="text-sm leading-relaxed text-muted-foreground">
                                                {rest.length ? (
                                                    <>
                                                        <span className="text-foreground">{head}</span>: {rest.join(": ")}
                                                    </>
                                                ) : (
                                                    item
                                                )}
                                            </li>
                                        )
                                    })}
                                </ul>
                                {exp.link && (
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                                    >
                                        {exp.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                                        <ArrowUpRight className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        )}
                    </li>
                )
            })}
        </ol>
    )
}
