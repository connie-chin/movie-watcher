import { Link } from 'react-router-dom';
import { WatchListItem, readWatchListItems } from '../data';
import { useState, useEffect } from 'react';

export function WatchList() {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const items = await readWatchListItems();
        setWatchList(items);
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
        Loading Watch List...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading watch list:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <div className="mx-auto bg-[rgb(36,85,103)] min-h-screen p-6">
      <div className="text-center mb-6">
        <Link
          to="/watchList/new"
          className="bg-white text-black font-bold py-2 px-6 rounded shadow hover:scale-105 transition">
          Add To Watch List
        </Link>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchList.map((item) => (
          <WatchListCard key={item.watchListId} item={item} />
        ))}
      </ul>
    </div>
  );
}

type WatchListProps = {
  item: WatchListItem;
};

function WatchListCard({ item }: WatchListProps) {
  return (
    <li className="transition transform hover:scale-105">
      <Link to={`/watchList/${item.watchListId}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={item.photoUrl}
            alt={item.title}
            className="h-72 w-full object-cover"
          />
          <div className="p-2 text-center">
            <p className="text-sm font-medium text-gray-800 capitalize truncate">
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
