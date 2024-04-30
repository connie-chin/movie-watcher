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

  if (isLoading) return <div>Loading Reviews...</div>;
  if (error) {
    return (
      <div>
        Error Loading Reviews:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  return (
    <div className="mx-auto bg-amber-300 h-dvh overflow-auto">
      {/* <div className="row-auto"> */}
      <div className="columns-1 mb-4 flex justify-center">
        <Link
          to="/review/new"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
          +
        </Link>
        {/* </div> */}
      </div>
      <div className="flex justify-center">
        <div className="columns-2 py-0 m-4">
          <ul>
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
        <div className="basis-2/3 text-start">
          <div className="font-bold text-2xl">
            <h3 className="capitalize">{review.title}</h3>
          </div>
          <div className="flex">
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
