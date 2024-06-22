'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ShareLeagueCode({ code }: { code: string }){
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLeagueCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setIsCopied(true)
    toast("Link copied to clipboard", {
      description: "You can now share the link with whoever you want's to join the league",
    })
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false)
    }, 4000)

    return () => clearTimeout(id)
  }, [isCopied])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share code</DialogTitle>
          <DialogDescription>
            Anyone who has this code will be able to join the league.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={code}
              readOnly
            />
          </div>
          <Button onClick={() => handleCopyLeagueCode(code)} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {!isCopied ? <Copy className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}