"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react'

// Mock data for the portfolio
const portfolioItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Wedding Ceremony" },
  { id: 2, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Engagement Shoot" },
  { id: 3, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Family Portrait" },
  { id: 4, image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Corporate Event" },
  { id: 5, image: "https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Product Photography" },
  { id: 6, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", title: "Fashion Shoot" },
]

export function Portfolio({ creatorId }: { creatorId: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {portfolioItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={portfolioItems.find((item) => item.id === selectedImage)?.image}
                alt={portfolioItems.find((item) => item.id === selectedImage)?.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

