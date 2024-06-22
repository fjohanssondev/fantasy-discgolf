'use client'

import { useFormStatus } from "react-dom"
import { Button } from "~/components/ui/button"
import { LoaderCircle } from "lucide-react"

export default function Submit({ children }: { children?: React.ReactNode }) {

  const { pending } = useFormStatus()

  return <Button type="submit" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : children}</Button>
}