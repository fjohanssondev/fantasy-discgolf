'use client'

import { useFormStatus } from "react-dom"
import { Button } from "~/components/ui/button"
import { LoaderCircle } from "lucide-react"

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode
}


export default function Submit({ children, ...props }: SubmitProps) {

  const { pending } = useFormStatus()

  return <Button {...props} type="submit" disabled={pending}>{pending ? <LoaderCircle className="animate-spin" /> : children}</Button>
}