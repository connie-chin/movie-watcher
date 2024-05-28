import { Link } from 'react-router-dom';
import { WatchListItem, readWatchListItems } from '../data';
import { useState, useEffect } from 'react';

export function WatchList() {
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const watchListList = await readWatchListItems();
        setWatchList(watchListList);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) return <div>Loading Watch List...</div>;
  if (error) {
    return (
      <div>
        Error Loading Watch List:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center bg-amber-300 h-dvh overflow-auto">
      <div className="">
        <div className="columns-1 flex justify-center mb-4">
          <Link
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:scale-110"
            to="/watchList/new">
            +
          </Link>
        </div>
        <div className="w-screen p-6 flex">
          <ul className=" flex flex-wrap w-full gap-4">
            {watchList.map((item) => (
              <WatchListCard key={item.watchListId} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type watchListProps = {
  item: WatchListItem;
};

function WatchListCard({ item }: watchListProps) {
  return (
    <li>
      <Link to={`/watchList/${item.watchListId}`}>
        <div className="flex-row w-32 h-[230px] bg-[rgb(176,212,192)] p-1.5 rounded hover:scale-110 border-4 border-[rgb(254,182,166)]">
          <div className="columns-1">
            <img
              className="h-44 object-contain rounded"
              src={item.photoUrl}
            />
          </div>
          <div className="text-center h-11 block w-28 overflow-y-scroll">
            <p className="capitalize text-sm">{item.title}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
