import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Portfolio } from "@/components/portfolio"
import { Reviews } from "@/components/reviews"
import { Availability } from "@/components/availability"

export default function CreatorProfile({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the creator data based on the ID
  const creator = {
    id: params.id,
    name: "John Doe",
    specialty: "Wedding Photographer",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Passionate wedding photographer with 10 years of experience capturing beautiful moments.",
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          <img
            src={creator.image}
            alt={creator.name}
            className="w-48 h-48 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{creator.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{creator.specialty}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-200">{creator.bio}</p>
          </div>
        </div>

        <Tabs defaultValue="portfolio" className="mt-8">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>
          <TabsContent value="portfolio">
            <Portfolio creatorId={creator.id} />
          </TabsContent>
          <TabsContent value="reviews">
            <Reviews creatorId={creator.id} />
          </TabsContent>
          <TabsContent value="availability">
            <Availability creatorId={creator.id} />
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}

