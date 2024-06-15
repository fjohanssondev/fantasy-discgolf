'use client'

import { AlertCircle, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { formatTimeLeft } from "~/lib/utils"

export default function Deadline({ date }: { date: Date }){

  const [timeLeft, setTimeLeft] = useState(0)

  const isClosed = new Date(date) < new Date ? true : false

  useEffect(() => {
    const targetDate = new Date(date)

    const id = setInterval(() => {
      setTimeLeft(targetDate.getTime() - new Date().getTime())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <Alert variant={isClosed ? 'destructive' : 'default'}>
      {isClosed ? <AlertCircle className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
      {!isClosed ? (
        <>
        <AlertTitle>Spelarvalet stänger om!</AlertTitle>
        <AlertDescription>
          {formatTimeLeft(timeLeft)}
        </AlertDescription>
        </>
      ) : <AlertTitle>Spelarvalet är stängt!</AlertTitle>}
    </Alert>
  )
}