import './App.css';
import { NavBar } from './components/NavBar';
import { ReviewEntryForm } from './pages/ReviewEntryForm';
import { ReviewEntryList } from './pages/ReviewEntryList';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<ReviewEntryList />} />
          <Route path="details/:reviewId" element={<ReviewEntryForm />} />
        </Route>
      </Routes>
    </>
  );
}
