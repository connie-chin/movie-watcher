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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReview = Object.fromEntries(formData) as unknown as MovieReview;
    if (isEditing) {
      updateReview({ ...review, ...newReview });
    } else {
      addReview(newReview);
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
    <div className="bg-yellow-400 h-dvh w-full flex justify-center">
      <div className="w-5/6">
        <div className="columns-1 flex justify-between w-full text-2xl">
          <h2>{isEditing ? 'Edit Review' : 'New Review'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:columns-2 md:flex-col md:content-center">
            <div className="columns-1 flex justify-center mb-4 mt-4">
              <img
                src={photoUrl || '/images/missing-image.jpeg'}
                className="h-60 w-auto rounded"
                alt="movie image"
              />
            </div>
            <div>
              <div className="columns-1 flex w-full justify-center pb-2">
                <label>
                  PhotoUrl:
                  <input
                    name="photoUrl"
                    type="text"
                    required
                    defaultValue={review?.photoUrl ?? ''}
                    className="border-red-900 block px-2 py-1 rounded mt-2"
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </label>
              </div>
              <div className="columns-1 flex w-full block justify-center pb-2">
                <label className="justify-items-start">
                  Title:
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={review?.title ?? ''}
                    className="border-red-900 block px-2 py-1 rounded mt-2"
                  />
                </label>
              </div>
              <div className="columns-1 flex w-full justify-center">
                <label>
                  Rating:
                  <div className="columns-1 flex justify-center w-full text-4xl text-white my-4">
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
                </label>
              </div>
            </div>
          </div>
          <div className="columns-1 flex w-full block justify-center pb-7">
            <label>
              Add review...
              <textarea
                name="review"
                required
                defaultValue={review?.review ?? ''}
                className="border-red-900 block px-2 py-1 rounded mt-2"
                cols={30}
                rows={9}
              />
            </label>
          </div>
          <div className="columns-2 flex w-full block justify-between">
            <div className="delete-button-container">
              {isEditing && (
                <button
                  className="bg-red-600 rounded text-white px-2 m-2"
                  type="button"
                  onClick={() => setIsDeleting(true)}>
                  Delete
                </button>
              )}
            </div>
            <div className="bg-yellow-400">
              <button className="bg-emerald-500 rounded text-white px-2 m-2">
                Save
              </button>
            </div>
          </div>
        </form>
        {isDeleting && (
          <div className="w-100vw h-100vh fixed left-0 right-0 top-0 bottom-0 bg-transparent">
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
                    className="modal-button-cancel bg-gray-400 rounded text-white px-2 m-2"
                    onClick={() => setIsDeleting(false)}>
                    Cancel
                  </button>
                  <button
                    className="modal-button-confirm-delete bg-red-600 rounded text-white px-2 m-2"
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
