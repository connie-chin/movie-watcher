export type MovieReview = {
  reviewId?: number;
  title: string;
  rating?: string;
  review: string;
  photoUrl: string;
};

export type WatchListItem = {
  watchListId?: number;
  title: string;
  photoUrl: string;
};

export async function readReviews() {
  //reading all review entries
  const response = await fetch('/api/reviews');
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
  const reviews = await response.json();
  return reviews;
}

export async function readReview(reviewId: number) {
  //reading single review entry
  const response = await fetch(`/api/reviews/${reviewId}`);
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
  const review = await response.json();
  return review;
}

export async function addReview(review: MovieReview): Promise<MovieReview> {
  //creating a new review
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  };
  const response = await fetch('/api/reviews', req);
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
  const newReview = await response.json();
  return newReview;
}

export async function updateReview(review: MovieReview) {
  //updating review
  const req = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  };
  const response = await fetch(`/api/reviews/${review.reviewId}`, req);
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
  const updatedReview = await response.json();
  return updatedReview;
}

export async function deleteReview(reviewId: number): Promise<void> {
  const req = {
    method: 'DELETE',
  };
  const response = await fetch(`/api/reviews/${reviewId}`, req);
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
}

//watchList section

export async function addWatchListItem(
  item: WatchListItem
): Promise<WatchListItem> {
  //creating watchlist item
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  };
  const response = await fetch('/api/watchLists', req);
  if (!response.ok) {
    throw new Error(`fetch error ${response.status}`);
  }
  const newWatchListItem = await response.json();
  return newWatchListItem;
}
