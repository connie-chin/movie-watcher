import { Link, Outlet } from 'react-router-dom';

type Props = {
  currentTab: string;
  onClick: (arg1: string) => void;
};

export function NavBar({ currentTab, onClick }: Props) {
  return (
    <>
      <header>
        <div className="bg-[rgb(27,34,41)] p-4 font-mono">
          <div className="align-center text-center">
            <h1 className="text-white text-4xl font-bold underline decoration-dotted decoration-4 decoration-white mt-6 mb-4 underline-offset-8">
              Movie Watcher
            </h1>
          </div>
          <div className="columns-2 pt-2 gap-6 px-2 text-center mt-2">
            <Link to="/">
              <div
                className={`hover:scale-105 rounded border-white border-2 p-2 text-white ${
                  currentTab === 'Reviews' ? 'bg-[rgb(42,197,218)]' : ''
                }`}
                onClick={() => onClick('Reviews')}>
                <p>Reviews</p>
              </div>
            </Link>
            <Link to="/watchList">
              <div
                className={`hover:scale-105 rounded border-2 border-white p-2 text-white ${
                  currentTab === 'Watch list' ? 'bg-[rgb(42,197,218)]' : ''
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
