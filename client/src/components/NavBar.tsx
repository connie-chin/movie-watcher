// import { Link} from 'react-router-dom';

export function NavBar() {
  return (
    <>
      <header className="bg-red-800 py-8">
        <div className="container">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="text-yellow-400 text-4xl">Movie Watcher</h1>
            </div>
          </div>
          <div className="row">
            <p className="reviews-link">Reviews</p>
          </div>
        </div>
      </header>
    </>
  );
}
