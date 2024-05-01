import { useState } from 'react';
import {
  WatchListItem,
  addWatchListItem,
  updateWatchListItem,
  readWatchListItem,
  deleteWatchListItem,
} from '../data';
import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function WatchListForm() {
  const { watchListId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [watchListItem, setWatchListItem] = useState<WatchListItem>();
  const isEditing = watchListId && watchListId !== 'new';
  const [isDeleting, setIsDeleting] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    async function load(id: number) {
      setIsLoading(true);
      try {
        const watchListItem = await readWatchListItem(id);
        if (!watchListItem)
          throw new Error(`Item with ID ${watchListId} not found`);
        setWatchListItem(watchListItem);
        setPhotoUrl(watchListItem.photoUrl);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) load(Number(watchListId));
  }, [watchListId, isEditing]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const newWatchList = Object.fromEntries(
      formData
    ) as unknown as WatchListItem;
    if (isEditing) {
      updateWatchListItem({ ...watchListItem, ...newWatchList });
    } else {
      addWatchListItem(newWatchList);
    }
    navigate('/watchList');
    // console.log('title', title);
  }

  function handleDelete() {
    if (!watchListItem?.watchListId) throw new Error('Should never happen');
    deleteWatchListItem(watchListItem.watchListId);
    navigate('/watchList');
  }

  if (isLoading) return <div>Loading Watch List...</div>;
  if (error) {
    return (
      <div>
        Error Loading Watch List item with ID {watchListId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="bg-amber-300 h-dvh flex w-full justify-center">
      <div className="w-5/6">
        <div className="columns-1 flex justify-between w-full text-2xl mt-8">
          <h2>{isEditing ? 'Edit Watch List Item' : 'New Watch List Item'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:columns-2">
            <div className="columns-1 flex justify-center mb-4 mt-4">
              <img
                src={photoUrl || '/images/missing-image.jpeg'}
                className="h-60 w-auto rounded md:h-80"
                alt="movie image"
              />
            </div>
            <div className="flex-column md:pt-4">
              <div className="columns-1 flex w-full justify-center pb-2">
                <label className="w-5/6 md:w-full">
                  PhotoUrl:
                  <input
                    name="photoUrl"
                    type="text"
                    required
                    defaultValue={watchListItem?.photoUrl ?? ''}
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
                    defaultValue={watchListItem?.title ?? ''}
                    className="border-red-900 block px-2 py-1 rounded mt-2 w-full"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="columns-2 flex w-full block justify-between mt-72">
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
                <div className="columns-1 flex justify-start font-bold text-xl pl-2 hover:scale-110">
                  <p>Delete</p>
                </div>
                <div className="columns-1 flex justify-center w-full bg-white rounded p-2">
                  <p>Are you sure you want to delete this watch list item?</p>
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
