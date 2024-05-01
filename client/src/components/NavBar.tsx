import { Link, Outlet } from 'react-router-dom';

type Props = {
  currentTab: string;
  onClick: (arg1: string) => void;
};

export function NavBar({ currentTab, onClick }: Props) {
  return (
    <>
      <header>
        <div className="bg-[rgb(226,24,72)] p-4 font-mono">
          <div className="align-center text-center">
            <h1 className="text-yellow-400 text-4xl font-bold underline decoration-dotted decoration-4 decoration-white mt-6 mb-4 underline-offset-8">
              Movie Watcher
            </h1>
          </div>
          <div className="columns-2 pt-2 gap-6 px-2 text-center mt-2">
            <Link to="/">
              <div
                className={`hover:scale-105 rounded border-yellow-400 border-4 p-2 text-yellow-400 ${
                  currentTab === 'Reviews' ? 'bg-blue-500' : ''
                }`}
                onClick={() => onClick('Reviews')}>
                <p>Reviews</p>
              </div>
            </Link>
            <Link to="/watchList">
              <div
                className={`hover:scale-105 rounded border-4 border-yellow-400 p-2 text-yellow-400 ${
                  currentTab === 'Watch list' ? 'bg-blue-500' : ''
                }`}
                onClick={() => onClick('Watch list')}>
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
