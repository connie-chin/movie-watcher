import { Link, Outlet } from 'react-router-dom';

export function NavBar() {
  return (
    <>
      <header>
        <div className="container bg-red-800 py-4">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="text-yellow-400 text-4xl">Movie Watcher</h1>
            </div>
          </div>
          <div className="row columns-2 pt-2 gap-x-2">
            <Link to="/">
              <p className="reviews-link rounded d-flex border-yellow-400 border-4 p-2 text-yellow-400">
                Reviews
              </p>
            </Link>
            <p className="watch-list-link rounded border-4 border-yellow-400 p-2 text-yellow-400">
              Watch List
            </p>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
