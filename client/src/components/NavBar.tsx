import { Link, Outlet } from 'react-router-dom';

type Props = {
  currentTab: string;
  onClick: (arg1: string) => void;
};

export function NavBar({ currentTab, onClick }: Props) {
  return (
    <>
      <header>
        <div className="container bg-red-800 py-2 font-mono">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="text-yellow-400 text-4xl font-bold">
                Movie Watcher
              </h1>
            </div>
          </div>
          <div className="columns-2 pt-2 gap-2 px-2">
            <Link to="/">
              <div
                className={`reviews-link rounded d-flex border-yellow-400 border-4 p-2 text-yellow-400 ${
                  currentTab === 'Reviews' ? 'bg-blue-500' : ''
                }`}
                onClick={() => onClick('Reviews')}>
                <p>Reviews</p>
              </div>
            </Link>
            <Link to="/watchList">
              <div
                className={`rounded border-4 border-yellow-400 p-2 text-yellow-400 ${
                  currentTab === 'Watchlist' ? 'bg-blue-500' : ''
                }`}
                onClick={() => onClick('Watchlist')}>
                <p className="watch-list-link">Watch List</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
