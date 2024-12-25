"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Creator {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface CreatorCarouselProps {
  creators: Creator[];
}

export function CreatorCarousel({ creators }: CreatorCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % creators.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + creators.length) % creators.length)
  }

  return (
    <div className="relative w-full h-64 mt-8 overflow-hidden rounded-lg">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 1000 : -1000,
              opacity: 0,
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => ({
              zIndex: 0,
              x: direction < 0 ? 1000 : -1000,
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <img
            src={creators[currentIndex].image}
            alt={creators[currentIndex].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white text-xl font-bold">{creators[currentIndex].name}</h3>
            <p className="text-gray-200">{creators[currentIndex].specialty}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <Button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 transition-all duration-200"
        size="icon"
        variant="ghost"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 transition-all duration-200"
        size="icon"
        variant="ghost"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

