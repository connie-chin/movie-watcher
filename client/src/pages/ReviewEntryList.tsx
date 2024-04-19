import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieReview, readReviews } from '../data';
import { FaStar } from 'react-icons/fa';

export function ReviewEntryList() {
  const [reviewsList, setReviewsList] = useState<MovieReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const reviewsList = await readReviews();
        setReviewsList(reviewsList);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Reviews:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  return (
    <div className="container bg-amber-300 min-h-full">
      <div className="row">
        <div className="columns-1 d-flex mb-6">
          <h2 className="text-left text-2xl">Reviews</h2>
          <h3>
            <Link
              to="/review"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded review-link">
              +
            </Link>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="columns-1 w-full px-3 py-0">
          <ul className="review-entry-ul">
            {reviewsList.map((review) => (
              <ReviewCard key={review.reviewId} review={review} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type ReviewProps = {
  review: MovieReview;
};

function ReviewCard({ review }: ReviewProps) {
  const stars: number[] = [];
  const numberOfStars = Number(review.rating);
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(i);
  }
  return (
    <li>
      <div className="columns-2 gap-8 mb-4 flex flex-row">
        <div className="basis-1/2">
          <img
            className="rounded object-contain block ml-auto mr-auto aspect-auto"
            src={review.photoUrl}
            alt=""
          />
        </div>
        <div className="basis-1/2 flex-row text-start">
          <div className="font-bold text-2xl">
            <h3>{review.title}</h3>
          </div>
          <div className="flex flex-row">
            {stars.map((index) => (
              <FaStar key={index} className="text-sky-500 text-2xl my-1" />
            ))}
          </div>
          <div>
            <p>{review.review}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
