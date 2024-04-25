import { Link } from 'react-router-dom';
// import { WatchListItem,  } from '../data';

export function WatchList() {
  return (
    <div className="container bg-yellow-500 h-dvh">
      <div className="row-auto">
        <div className="columns-1 d-flex mb-4">
          <Link to="/watchList/new">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
              +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// type watchListProps = {
//   item: WatchListItem;
// }
