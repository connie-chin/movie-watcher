import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieReview, readReviews } from '../data';
import { FaStar } from 'react-icons/fa';

export function ReviewEntryList() {
  const [reviewsList, setReviewsList] = useState<MovieReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const reviews = await readReviews();
        setReviewsList(reviews);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        Loading Reviews...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading reviews:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <div className="mx-auto bg-[rgb(36,85,103)] min-h-screen p-6">
      <div className="text-center mb-6">
        <Link
          to="/review/new"
          className="bg-white text-black font-bold py-2 px-6 rounded shadow hover:scale-105 transition">
          Add A Review
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviewsList.map((review) => (
          <ReviewCard key={review.reviewId} review={review} />
        ))}
      </ul>
    </div>
  );
}

type ReviewProps = {
  review: MovieReview;
};

function ReviewCard({ review }: ReviewProps) {
  const stars = Array.from({ length: Number(review.rating) }, (_, index) => (
    <FaStar key={index} className="text-yellow-500 text-lg sm:text-xl" />
  ));

  return (
    <li className="transition transform hover:scale-105">
      <Link to={`/review/${review.reviewId}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
          <div className="min-h-[196px] h-full w-1/3 flex items-center justify-center overflow-hidden">
            <img
              src={review.photoUrl}
              alt={review.title}
              className="h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col justify-between w-2/3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 capitalize truncate">
                {review.title}
              </h3>
              <div className="flex items-center mt-2">{stars}</div>
              <p className="text-sm text-gray-600 mt-2 sm:block overflow-hidden border-2 h-32 rounded p-1">
                {review.review}
              </p>
            </div>
            <Link
              to={`/review/${review.reviewId}`}
              className="text-indigo-600 hover:underline text-sm mt-2">
              Read Full Review →
            </Link>
          </div>
        </div>
      </Link>
    </li>
  );
}
