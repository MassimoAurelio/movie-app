export interface IFilms {
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  year: number;
  addToCurrentlyWatching: any;
  isFavorite: boolean;
  isWatchList: boolean;
  kinopoiskId: number;
  description: string;
  genres: { genre: string }[];
}

export const useFilmsStore = defineStore({
  id: "film",
  state: () => ({
    films: [] as IFilms[],
    currentlyWatching: [] as IFilms[],
    watchlist: [] as IFilms[],
    dynamic: {} as IFilms,
    query: "",
  }),
  actions: {
    //films
    setFilms(films: IFilms[]) {
      this.films = films;
    },

    //currentlyWatching
    addToCurrentlyWatching(index: number, film: IFilms) {
      const filmInStore = this.films.find((f) => f.nameRu === film.nameRu);
      if (filmInStore) {
        filmInStore.isFavorite = true;
      }
      this.currentlyWatching.push(film);
    },
    removeCurrently(index: number) {
      this.currentlyWatching.splice(index, 1);
    },

    //watchlist
    setWatchList(watchlist: IFilms[]) {
      this.watchlist = watchlist;
    },
    addToWatchList(index: number, film: IFilms) {
      const filmInStore = this.watchlist.find((f) => f.nameRu === film.nameRu);
      if (filmInStore) {
        filmInStore.isWatchList = true;
      }
      this.watchlist.push(film);
    },
    removeWatchlist(index: number) {
      this.watchlist.splice(index, 1);
    },

    //dynamic
    setDynamic(dynamic: IFilms) {
      this.dynamic = dynamic;
    },

    //search
    setQuery(newQuery: string) {
      this.query = newQuery;
    },

    getSearchResults() {
      if (!this.query) {
        return [];
      }
      return this.films.filter(
        (film) =>
          film.nameRu.toLowerCase().startsWith(this.query.toLowerCase()) ||
          film.nameOriginal.toLowerCase().startsWith(this.query.toLowerCase())
      );
    },
  },
});
