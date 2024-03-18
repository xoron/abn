import { defineStore } from 'pinia';

export const useShowsStore = defineStore('shows', {
  state: () => ({
    cache: [],
    pageNumber: 1,
  }),
  getters: {
    genres: (state) => {
      return state.cache
        .map((show) => show.genres)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    },
  },
  actions: {
    async fetchShows() {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows?page=${this.pageNumber}`);
        const newData = await response.json();
        const uncachedShows = newData.filter((show) => !this.cache.find((s) => s.id === show.id));
        this.cache = [...this.cache, ...uncachedShows];
      } catch (error) {
        console.warn("Error fetching shows", error);
      }
    },
    addToStore(shows) {
        const uncachedShows = shows.filter((show) => !this.cache.find((s) => s.id === show.id));
        this.cache = [...this.cache, ...uncachedShows];
    },
  },
});