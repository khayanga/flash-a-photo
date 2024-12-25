import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>{review.authorName}</span>
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{review.comment}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

