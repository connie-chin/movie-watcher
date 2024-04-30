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
    <div className="flex flex-wrap justify-center bg-yellow-500 h-dvh overflow-auto">
      <div className="">
        {/* <div className="row"> */}
        <div className="columns-1 flex justify-center mb-4">
          <Link
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
            to="/watchList/new">
            +
          </Link>
        </div>
        {/* </div> */}
        <div className="w-screen">
          <ul className="flex flex-wrap w-full gap-4 justify-center">
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
        <div className="flex-row w-32 bg-white p-1 rounded">
          <div className="columns-1">
            <img
              className="object-contain rounded"
              src={item.photoUrl}
              alt=""
            />
          </div>
          <div className="columns-1 text-center">
            <p className="capitalize">{item.title}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
