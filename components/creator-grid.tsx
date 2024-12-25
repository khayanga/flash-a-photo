"use client"

import { motion } from "framer-motion"
import { Star } from 'lucide-react'
import Link from "next/link"

interface Creator {
  id: string;
  name: string;
  specialty: string;
  rate: number;
  rating: number;
  image: string;
}

interface CreatorGridProps {
  creators: Creator[];
}

export function CreatorGrid({ creators }: CreatorGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {creators.map((creator) => (
        <motion.div
          key={creator.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
        >
          <Link href={`/creator/${creator.id}`}>
            <img src={creator.image} alt={creator.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{creator.name}</h3>
              <p className="text-sm text-muted-foreground">{creator.specialty}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-primary font-bold">KES {creator.rate.toLocaleString()}/hr</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-muted-foreground">{creator.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

