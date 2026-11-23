import type { Metadata } from "next"
import { BuildsSection } from "@/components/builds-section"

export const metadata: Metadata = {
  title: "Builds - Rushi Chaganti",
  description: "Projects and open source contributions by Rushi Chaganti: GenAI, ML, web, automation and browser extensions.",
}

export default function BuildsPage() {
  return <BuildsSection />
}
