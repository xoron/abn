import { setActivePinia, createPinia } from 'pinia';
import { useShowsStore } from './store'; // Adjust the import path as necessary

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, genres: ['Comedy'], name: 'Show Name' }]),
  })
);

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
  });

  it('fetchShows populates cache with new shows', async () => {
    const store = useShowsStore();
    await store.fetchShows();

    expect(store.cache.length).toBe(1);
    expect(store.cache[0].genres).toContain('Comedy');
  });

  it('addToStore adds new shows to cache', () => {
    const store = useShowsStore();
    expect(store.cache.length).toBe(0);

    const newShows = [{ id: 2, genres: ['Drama'], name: 'Another Show' }];
    store.addToStore(newShows);

    expect(store.cache.length).toBe(1);
    expect(store.cache.find(show => show.id === 2)).toBeTruthy();
  });

  it('genres getter returns unique sorted genres', async () => {
    const store = useShowsStore();
    await store.addToStore([
      { id: 1, genres: ['Comedy'], name: 'Show 1' },
      { id: 2, genres: ['Action', 'Comedy'], name: 'Show 2' },
      { id: 3, genres: ['Action'], name: 'Show 3' },
    ]);

    expect(store.genres).toEqual(['Action', 'Comedy']); // Sorted and unique
  });
});