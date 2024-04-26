import { useState } from 'react';
import { WatchListItem, addWatchListItem } from '../data';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function WatchListForm() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const newWatchList = Object.fromEntries(
      formData
    ) as unknown as WatchListItem;
    console.log('title', title);
    addWatchListItem(newWatchList);
    navigate('/watchList');
  }

  return (
    <div className="container bg-yellow-400 h-dvh w-full">
      <div className="row">
        <div className="columns-1 text-start w-full text-2xl">
          <h2>New Watch List</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="columns-1 flex justify-center mt-4 mb-4">
          <img
            src={photoUrl || '/images/missing-image.jpeg'}
            className="h-auto max-w-full rounded"
          />
        </div>
        <div className="columns-1 flex w-full justify-center pb-2">
          <label>
            PhotoUrl
            <input
              name="photoUrl"
              type="text"
              required
              defaultValue={''}
              className="block px-2 py-1 rounded mt-2"
              onChange={(event) => setPhotoUrl(event.target.value)}
            />
          </label>
        </div>
        <div className="columns-1 flex w-full justify-center pb-2">
          <label>
            Title
            <input
              name="title"
              type="text"
              required
              defaultValue={''}
              className="block px-2 py-1 rounded mt-2"
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div className="columns-2 flex w-full justify-end">
          <div className="save-button-watchList">
            <button className="bg-emerald-500 rounded text-white px-2 m-2">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
