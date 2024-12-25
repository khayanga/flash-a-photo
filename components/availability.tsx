"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

export function Availability({ creatorId }: { creatorId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Mock available time slots
  const availableTimeSlots = [
    "09:00 AM",
    "11:00 AM",
    "02:00 PM",
    "04:00 PM",
  ]

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
        <div className="grid grid-cols-2 gap-4">
          {availableTimeSlots.map((slot) => (
            <Button key={slot} variant="outline">
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

