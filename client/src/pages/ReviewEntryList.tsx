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
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:scale-110">
          +
        </Link>
        {/* </div> */}
      </div>
      <div className="flex justify-center">
        <div className="columns-2 gap-x-6 py-0 m-8">
          <ul className="w-full flex-col">
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
    <li className="justify-between hover:scale-105">
      <Link
        to={`review/${review.reviewId}`}
        className="columns-2 mb-4 flex flex-row rounded p-2 bg-[rgb(176,212,192)] h-24 sm:h-40 max-h-60">
        <div className="basis-1/3">
          <img
            className="rounded w-auto object-contain block ml-auto mr-auto aspect-auto h-20 sm:h-36 max-h-48"
            src={review.photoUrl}
            alt=""
          />
        </div>
        <div className="basis-2/3 text-start sm:pl-2">
          <div className="font-bold text-xl h-7 overflow-y-scroll">
            <h3 className="capitalize">{review.title}</h3>
          </div>
          <div className="flex">
            {stars.map((index) => (
              <FaStar
                key={index}
                className="text-sky-500 text-lg sm:text-xl my-1"
              />
            ))}
          </div>
          <div className="hidden sm:block overflow-y-scroll h-[60%]">
            <p className="text-sm">{review.review}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
