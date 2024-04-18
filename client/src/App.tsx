import './App.css';
import { NavBar } from './components/NavBar';
import { MovieReviewEntryForm } from './pages/MovieReviewEntryForm';

export default function App() {
  return (
    <>
      {/* <header className="bg-red-800">
        <div className="container">
          <div className="row">
            <div className="column-full d-flex align-center">
              <h1 className="text-yellow-400">Movie Watcher</h1>
            </div>
          </div>
        </div>
      </header> */}
      <NavBar />
      <MovieReviewEntryForm />
    </>
  );
}
