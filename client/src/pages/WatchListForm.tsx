import { useState } from 'react';
import {
  WatchListItem,
  addWatchListItem,
  updateWatchListItem,
  readWatchListItem,
} from '../data';
import { FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function WatchListForm() {
  const { watchListId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [title, setTitle] = useState<string>();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [watchListItem, setWatchListItem] = useState<WatchListItem>();
  const isEditing = watchListId && watchListId !== 'new';

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
    console.log('title', title);
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
    <div className="bg-yellow-400 h-dvh flex w-full justify-center">
      <div className="w-5/6">
        <div className="columns-1 text-start text-2xl">
          <h2>{isEditing ? 'Edit Watch List' : 'New Watch List'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:columns-2">
            <div className="columns-1 flex justify-center">
              <div className="justify-center mt-4 mb-4 flex justify-center items-center">
                <img
                  src={photoUrl || '/images/missing-image.jpeg'}
                  className="h-60 w-auto rounded"
                  alt="watch list image"
                />
              </div>
            </div>
            <div className="columns-1 h-52 content-center">
              <div className="pb-2 flex justify-center">
                <label>
                  PhotoUrl:
                  <input
                    name="photoUrl"
                    type="text"
                    required
                    defaultValue={watchListItem?.photoUrl ?? ''}
                    className="block px-2 py-1 rounded "
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </label>
              </div>
              <div className="columns-1 flex justify-center pb-2">
                <label>
                  Title:
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={watchListItem?.title ?? ''}
                    className="block px-2 py-1 rounded mt-2"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <div className="save-button-watchList">
              <button className="bg-emerald-500 rounded text-white px-2 m-2 md:mt-20">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
