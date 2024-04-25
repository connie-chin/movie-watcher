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
    <div className="container bg-amber-300 h-dvh">
      <div className="row">
        <div className="columns-1 d-flex mb-4">
          <Link
            to="/review/new"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded review-link">
            <button className="mt-4">+</button>
          </Link>
        </div>
      </div>
      <div className="row flex justify-center">
        <div className="w-5/6 md:w-4/5 lg:w-3/4px-3 py-0">
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
      <Link
        to={`review/${review.reviewId}`}
        className="columns-2 gap-4 mb-4 flex flex-row rounded p-2 bg-white max-h-80">
        <div className="basis-1/3">
          <img
            className="rounded object-contain block ml-auto mr-auto aspect-auto "
            src={review.photoUrl}
            alt=""
          />
        </div>
        <div className="basis-2/3 flex-row text-start">
          <div className="font-bold text-2xl">
            <h3>{review.title}</h3>
          </div>
          <div className="flex flex-row">
            {stars.map((index) => (
              <FaStar key={index} className="text-sky-500 text-2xl my-1" />
            ))}
          </div>
          <div className="hidden sm:block overflow-clip max-h-48">
            <p>{review.review}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
