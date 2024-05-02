import { useState } from 'react';
import './App.css';
import { NavBar } from './components/NavBar';
import { ReviewEntryForm } from './pages/ReviewEntryForm';
import { ReviewEntryList } from './pages/ReviewEntryList';
import { WatchListForm } from './pages/WatchListForm';
import { WatchList } from './pages/WatchList';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [activeTab, setActiveTab] = useState('Reviews');

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<NavBar currentTab={activeTab} onClick={setActiveTab} />}>
          <Route index element={<ReviewEntryList />} />
          <Route path="review/:reviewId" element={<ReviewEntryForm />} />
          <Route path="watchList" element={<WatchList />} />
          <Route path="watchList/:watchListId" element={<WatchListForm />} />
        </Route>
      </Routes>
    </>
  );
}
