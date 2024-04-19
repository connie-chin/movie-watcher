import { FaStar } from 'react-icons/fa';
import { MovieReview, addReview } from '../data';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';

export function ReviewEntryForm() {
  const { reviewId } = useParams();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [starIndex, setStarIndex] = useState(0);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReview = Object.fromEntries(formData) as unknown as MovieReview;
    console.log('saved new entry');
    addReview(newReview);
    navigate('/');
    setIsLoading(false);
    setError(false);
  }

  function handleStarClick(currentRating: number) {
    setStarIndex(currentRating);
    console.log(currentRating);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Review with ID {reviewId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="container bg-yellow-400">
      <div className="row">
        <div className="columns-1 flex justify-between w-full text-2xl">
          <h2>New Review</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="columns-1 flex justify-center w-full mb-2">
          <img
            src={photoUrl || '/images/Movies-icon.png'}
            className="h-auto max-w-full"
          />
        </div>
        <div className="columns-1 flex w-full block justify-center pb-2">
          <label>
            PhotoUrl
            <input
              name="photoUrl"
              type="text"
              required
              className="border-red-900 block px-2 rounded"
              onChange={(event) => setPhotoUrl(event.target.value)}
            />
          </label>
        </div>
        <div className="columns-1 flex w-full block justify-center pb-2">
          <label className="justify-items-start">
            Title
            <input
              name="title"
              type="text"
              required
              className="border-red-900 block px-2 rounded"
            />
          </label>
        </div>
        <div className="columns-1 flex justify-center w-full text-4xl text-white pb-2 stars">
          {[1, 2, 3, 4, 5].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={star}>
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  onClick={() => handleStarClick(currentRating)}
                  value={currentRating}
                />
                {starIndex < currentRating ? (
                  <FaStar />
                ) : (
                  <FaStar className="text-sky-500" />
                )}
              </label>
            );
          })}
        </div>

        <div className="columns-1 flex w-full block justify-center pb-7">
          <label>
            Add review...
            <textarea
              name="review"
              required
              className="border-red-900 block px-2 rounded"
              cols={30}
              rows={10}
            />
          </label>
        </div>
        <div className="columns-1 flex w-full block justify-end">
          <button className="bg-red-900 rounded text-yellow-400 px-2 m-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
