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
    loading: false,
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
      this.saveCurrentlyWatching();
    },
    removeCurrently(index: number) {
      this.currentlyWatching.splice(index, 1);
      this.saveCurrentlyWatching();
    },
    saveCurrentlyWatching() {
      const serializableCurrentlyWatching = this.currentlyWatching.map(
        (film) => {
          return {
            nameOriginal: film.nameOriginal,
            nameRu: film.nameRu,
            posterUrl: film.posterUrl,
            posterUrlPreview: film.posterUrlPreview,
            ratingImdb: film.ratingImdb,
            year: film.year,
            isFavorite: film.isFavorite,
            isWatchList: film.isWatchList,
            kinopoiskId: film.kinopoiskId,
            description: film.description,
            genres: film.genres,
          };
        }
      );
      localStorage.setItem(
        "currentlyWatching",
        JSON.stringify(serializableCurrentlyWatching)
      );
    },

    loadCurrentlyWatching() {
      const data = localStorage.getItem("currentlyWatching");
      if (data) {
        this.currentlyWatching = JSON.parse(data);
      }
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
      this.saveWatchlist();
    },
    removeWatchlist(index: number) {
      this.watchlist.splice(index, 1);
      this.saveWatchlist();
    },
    saveWatchlist() {
      const serializableWatchlist = this.watchlist.map((film) => {
        return {
          nameOriginal: film.nameOriginal,
          nameRu: film.nameRu,
          posterUrl: film.posterUrl,
          posterUrlPreview: film.posterUrlPreview,
          ratingImdb: film.ratingImdb,
          year: film.year,
          isFavorite: film.isFavorite,
          isWatchList: film.isWatchList,
          kinopoiskId: film.kinopoiskId,
          description: film.description,
          genres: film.genres,
        };
      });
      localStorage.setItem("watchlist", JSON.stringify(serializableWatchlist));
    },

    loadWatchlist() {
      const data = localStorage.getItem("watchlist");
      if (data) {
        this.watchlist = JSON.parse(data);
      }
    },

    //dynamic
    setDynamic(dynamic: IFilms) {
      this.dynamic = dynamic;
    },

    //search
    setQuery(newQuery: string) {
      this.query = newQuery;
    },
    setLoading(status: boolean) {
      this.loading = status;
    },
    getSearchResults() {
      if (!this.query) {
        return [];
      }
      return this.films.filter(
        (film) =>
          (film &&
            film.nameRu &&
            film.nameRu.toLowerCase().startsWith(this.query.toLowerCase())) ||
          (film &&
            film.nameOriginal &&
            film.nameOriginal
              .toLowerCase()
              .startsWith(this.query.toLowerCase()))
      );
    },
    removeFromCurrentlyWatching(index: number) {
      const filmToRemove = this.currentlyWatching[index];
      const filmInStore = this.films.find(
        (f) => f.nameRu === filmToRemove.nameRu
      );
      if (filmInStore) {
        filmInStore.isFavorite = false;
      }
      this.removeCurrently(index);
    },
    heartFilled(film: IFilms) {
      computed(() =>
        this.currentlyWatching.some((f) => f.nameRu === film.nameRu)
      );
    },
  },
});
