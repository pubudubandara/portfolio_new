'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Award, Calendar, X } from 'lucide-react'

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Certificate {
  _id: string
  name: string
  organization: string
  imageUrl: string
  cloudinaryId: string
  date: string // Format: "MM/YYYY"
  order: number
}

export const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCertificate, setHoveredCertificate] = useState<string | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const certificatesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  useEffect(() => {
    if (!loading && certificates.length > 0) {
      const section = sectionRef.current
      const title = titleRef.current
      const certificatesContainer = certificatesRef.current

      if (!section || !title || !certificatesContainer) return

      // Set initial states
      gsap.set([title], { opacity: 0, y: 50 })
      gsap.set(certificatesContainer.children, { opacity: 0, y: 80, scale: 0.9 })

      // Create scroll-triggered animations
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      timeline
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(certificatesContainer.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.4")

      return () => {
        timeline.kill()
      }
    }
  }, [loading, certificates])

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates')
      const data = await response.json()

      if (data.success && Array.isArray(data.data)) {
        setCertificates(data.data)
      } else {
        setCertificates([])
      }
    } catch (error) {
      console.error('Failed to fetch certificates:', error)
      setCertificates([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const [month, year] = dateString.split('/')
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return `${monthNames[parseInt(month) - 1]} ${year}`
    } catch (error) {
      return dateString
    }
  }

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="py-24 px-4 sm:px-6 lg:px-8 relative min-h-screen"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4 pb-2">
            Certificates & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-32">
            <Award className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
              No certificates available at the moment.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Check back soon for new achievements!
            </p>
          </div>
        ) : (
          <div ref={certificatesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {certificates.map((certificate, index) => (
              <Card
                key={certificate._id}
                className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
                onMouseEnter={() => setHoveredCertificate(certificate._id)}
                onMouseLeave={() => setHoveredCertificate(null)}
                onClick={() => handleCertificateClick(certificate)}
              >
                {/* Gradient border effect - only visible on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 transition-opacity duration-300 ${
                    hoveredCertificate === certificate._id ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Award icon overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2">
                      <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  </div>

                  <CardHeader className="pb-4 pt-4">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {certificate.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {certificate.organization}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Date Badge */}
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-sm font-semibold px-3 py-1"
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(certificate.date)}
                      </Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-6xl w-[95vw] h-auto max-h-[95vh] p-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50">
            {selectedCertificate && (
              <>
                <DialogHeader className="p-6 pb-4">
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                    {selectedCertificate.name}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-gray-700 dark:text-gray-300">
                    {selectedCertificate.organization}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="px-6 pb-6">
                  {/* Certificate Image */}
                  <div className="relative w-full h-[70vh] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={selectedCertificate.imageUrl}
                      alt={selectedCertificate.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1536px) 100vw, 1536px"
                    />
                  </div>
                  
                  {/* Certificate Details */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 text-sm font-semibold px-4 py-2"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(selectedCertificate.date)}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Certificate
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
