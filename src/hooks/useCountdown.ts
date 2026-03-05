import { useState, useEffect } from 'react'
import { getTimeRemaining } from '@/lib/utils'

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function useCountdown(targetDate: string): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(() => {
    const remaining = getTimeRemaining(targetDate)
    return {
      days: remaining.days,
      hours: remaining.hours,
      minutes: remaining.minutes,
      seconds: remaining.seconds,
      isExpired: remaining.total <= 0,
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetDate)
      setTime({
        days: remaining.days,
        hours: remaining.hours,
        minutes: remaining.minutes,
        seconds: remaining.seconds,
        isExpired: remaining.total <= 0,
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return time
}
