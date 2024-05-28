import { FaStar } from 'react-icons/fa';
import {
  MovieReview,
  addReview,
  updateReview,
  readReview,
  deleteReview,
} from '../data';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEvent, useState, useEffect, useRef } from 'react';

export function ReviewEntryForm() {
  const { reviewId } = useParams();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [starIndex, setStarIndex] = useState(0);
  const navigate = useNavigate();
  const [review, setReview] = useState<MovieReview>();
  const isEditing = reviewId && reviewId !== 'new';
  const [isDeleting, setIsDeleting] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function load(id: number) {
      setIsLoading(true);
      try {
        const review = await readReview(id);
        if (!review) throw new Error(`Entry with ID ${id} not found`);
        setReview(review);
        setPhotoUrl(review.photoUrl);
        setStarIndex(Number(review.rating));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) load(Number(reviewId));
  }, [reviewId, isEditing]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReview = Object.fromEntries(formData) as unknown as MovieReview;
    try {
      if (isEditing) {
        await updateReview({ ...review, ...newReview });
      } else {
        await addReview(newReview);
      }
    } catch (err) {
      setError(err);
    }
    navigate('/');
  }

  function handleStarClick(currentRating: number) {
    setStarIndex(currentRating);
  }

  function handleDelete() {
    if (!review?.reviewId) throw new Error('Should never happen');
    deleteReview(review.reviewId);
    navigate('/');
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
    <div className="bg-amber-300 h-full w-full flex justify-center">
      <div className="w-5/6">
        <div className="columns-1 flex justify-between w-full text-2xl mt-8">
          <h2>{isEditing ? 'Edit Review' : 'New Review'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:columns-2 md:flex-col md:content-center">
            <div className="columns-1 flex justify-center mb-4 mt-4">
              <img
                src={photoUrl || '/images/missing-image.jpeg'}
                className="h-60 w-auto rounded md:h-80"
                alt="movie image"
              />
            </div>
            <div>
              <div className="columns-1 flex w-full justify-center pb-2 md:pt-4">
                <label className="w-5/6 md:w-full">
                  Movie Image Address:
                  <input
                    name="photoUrl"
                    type="text"
                    required
                    defaultValue={review?.photoUrl ?? ''}
                    className="block px-2 py-1 rounded mt-2 w-full"
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </label>
              </div>
              <div className="columns-1 flex w-full block justify-center pb-2">
                <label className="justify-items-start w-5/6 md:w-full">
                  Title:
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={review?.title ?? ''}
                    className="border-red-900 block px-2 py-1 rounded mt-2 w-full"
                  />
                </label>
              </div>
              <div className="columns-1 flex w-full justify-center">
                <label className="w-5/6 md:w-full">
                  Rating:
                  <div className="columns-1 flex justify-center w-full text-4xl text-white my-4 w-full">
                    {[1, 2, 3, 4, 5].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <label key={star} className="hover:scale-110">
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
                </label>
              </div>
            </div>
          </div>
          <div className="columns-1 flex w-full justify-center pb-7 md:mt-10">
            <label className="w-5/6 md:w-full">
              Add review...
              <textarea
                name="review"
                required
                defaultValue={review?.review ?? ''}
                className="border-red-900 block px-2 py-1 rounded mt-2 w-full"
                rows={8}
              />
            </label>
          </div>
          <div className="columns-2 flex w-full block justify-between">
            <div className="delete-button-container">
              {isEditing && (
                <button
                  className="bg-red-600 rounded text-white px-2 m-2 hover:scale-110"
                  type="button"
                  onClick={() => setIsDeleting(true)}>
                  Delete
                </button>
              )}
            </div>
            <div className="bg-amber-300">
              <button className="bg-emerald-500 rounded text-white px-2 m-2 hover:scale-110">
                Save
              </button>
            </div>
          </div>
        </form>
        {isDeleting && (
          <div className="w-100vw h-100vh fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)]">
            <dialog
              ref={modal}
              className="modal-container flex justify-center fixed left-0 right-0 top-0 bottom-0 items-center border-2 border-black">
              <div className="row">
                <div className="columns-1 flex justify-start font-bold text-xl pl-2">
                  <p>Delete</p>
                </div>
                <div className="columns-1 flex justify-center w-full bg-white rounded p-2">
                  <p>Are you sure you want to delete this review?</p>
                </div>
                <div className="columns-1 flex justify-between w-full px-3">
                  <button
                    className="modal-button-cancel bg-gray-400 rounded text-white px-2 m-2 hover:scale-110"
                    onClick={() => setIsDeleting(false)}>
                    Cancel
                  </button>
                  <button
                    className="modal-button-confirm-delete bg-red-600 rounded text-white px-2 m-2 hover:scale-110"
                    onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
}
