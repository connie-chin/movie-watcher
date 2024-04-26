import { Link, Outlet } from 'react-router-dom';

type Props = {
  currentTab: string;
  onClick: (arg1: string) => void;
};

export function NavBar({ currentTab, onClick }: Props) {
  return (
    <>
      <header>
        <div className="bg-red-800 p-4 font-mono">
          <div className="align-center text-center">
            <h1 className="text-yellow-400 text-4xl font-bold">
              Movie Watcher
            </h1>
          </div>
          <div className="columns-2 pt-2 gap-2 px-2 text-center">
            <Link to="/">
              <div
                className={`rounded border-yellow-400 border-4 p-2 text-yellow-400 ${
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
                <p>Watch List</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
