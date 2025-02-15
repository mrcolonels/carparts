"use client"

import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const FadeIn = ({ children, className = '', delay = 0 }: FadeInProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              entry.target.classList.remove('opacity-0', 'translate-y-10')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`opacity-0 translate-y-10 transition-all duration-1000 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

export default FadeIn 