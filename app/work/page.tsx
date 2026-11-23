import type { Metadata } from "next"
import { WorkSection } from "@/components/work-section"

export const metadata: Metadata = {
  title: "Work - Rushi Chaganti",
  description: "Work experience of Rushi Chaganti: AI engineering, NLP, RAG and automation.",
}

export default function WorkPage() {
  return <WorkSection />
}
