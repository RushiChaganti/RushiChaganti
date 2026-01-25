"use client"

import * as React from "react"
import { Search, X, Briefcase, Code, Terminal, FileText, Command } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"
import { Build, WorkExperience } from "@/lib/types"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onNavigateToSection: (section: "home" | "builds" | "work", id?: number) => void
}

type SearchResult =
    | { type: 'work'; item: WorkExperience }
    | { type: 'build'; category: string; item: Build }

export function SearchDialog({ open, onOpenChange, onNavigateToSection }: SearchDialogProps) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const router = useRouter()

    React.useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
            setQuery("")
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    React.useEffect(() => {
        if (!query) {
            setResults([])
            return
        }

        const lowerQuery = query.toLowerCase()
        const newResults: SearchResult[] = []

        // Search Work
        portfolioData.work.forEach(work => {
            if (
                work.company.toLowerCase().includes(lowerQuery) ||
                work.role.toLowerCase().includes(lowerQuery) ||
                work.description.some(d => d.toLowerCase().includes(lowerQuery))
            ) {
                newResults.push({ type: 'work', item: work })
            }
        })

        // Search Builds
        Object.entries(portfolioData.builds).forEach(([category, builds]) => {
            builds.forEach(build => {
                if (
                    build.title.toLowerCase().includes(lowerQuery) ||
                    build.description.toLowerCase().includes(lowerQuery) ||
                    build.tech.some(t => t.toLowerCase().includes(lowerQuery))
                ) {
                    newResults.push({ type: 'build', category, item: build })
                }
            })
        })

        setResults(newResults)
        setSelectedIndex(0)
    }, [query])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % results.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex])
            }
        } else if (e.key === 'Escape') {
            onOpenChange(false)
        }
    }

    const handleSelect = (result: SearchResult) => {
        onOpenChange(false)
        if (result.type === 'work') {
            onNavigateToSection("work", result.item.id)
        } else {
            const link = result.item.link || result.item.githubLink
            if (link) {
                if (window.confirm(`This will open an external link to ${link}. Do you want to continue?`)) {
                    window.open(link, '_blank')
                }
            }
        }
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center sm:pt-[20vh] p-4">
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-all"
                onClick={() => onOpenChange(false)}
            />
            <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center border-b border-border px-4 py-3">
                    <Search className="w-5 h-5 text-muted-foreground mr-3" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search projects, work, tech..."
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
                    />
                    <div className="flex items-center gap-2">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">ESC</span>
                        </kbd>
                        <button onClick={() => onOpenChange(false)}>
                            <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {results.map((result, index) => (
                            <div
                                key={`${result.type}-${result.type === 'work' ? result.item.id : result.item.id}`}
                                onClick={() => handleSelect(result)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${index === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50 text-foreground'
                                    }`}
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    {result.type === 'work' ? (
                                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                                    ) : result.category === 'Bash' ? (
                                        <Terminal className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                        <Code className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium truncate">
                                            {result.type === 'work' ? result.item.company : result.item.title}
                                        </span>
                                        {result.type === 'build' && (
                                            <span className="text-xs text-muted-foreground ml-2 px-1.5 py-0.5 rounded-full bg-muted">
                                                {result.category}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {result.type === 'work' ? result.item.role : result.item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                        <p>No results found for "{query}"</p>
                    </div>
                )}

                {!query && (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                        <p>Type to search...</p>
                    </div>
                )}
            </div>
        </div>
    )
}
