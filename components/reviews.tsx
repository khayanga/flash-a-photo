import { Star } from 'lucide-react'

// Mock data for reviews
const reviews = [
  { id: 1, author: "Alice", rating: 5, comment: "Absolutely amazing work! John captured our wedding beautifully." },
  { id: 2, author: "Bob", rating: 4, comment: "Great photographer, very professional and easy to work with." },
  { id: 3, author: "Carol", rating: 5, comment: "Exceeded our expectations. The photos are stunning!" },
]

export function Reviews({ creatorId }: { creatorId: string }) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-white mr-2">{review.author}</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

