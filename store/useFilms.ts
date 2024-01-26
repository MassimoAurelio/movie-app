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
  }),
  actions: {
    setFilms(films: IFilms[]) {
      this.films = films;
    },
    removeCurrently(index: number) {
      this.currentlyWatching.splice(index, 1);
    },
    addToCurrentlyWatching(index: number, film: IFilms) {
      const filmInStore = this.films.find((f) => f.nameRu === film.nameRu);
      if (filmInStore) {
        filmInStore.isFavorite = true;
      }
      this.currentlyWatching.push(film);
    },
    setSuggested(suggested: IFilms[]) {
      this.watchlist = suggested;
    },
    addToWatchList(index: number, film: IFilms) {
      const filmInStore = this.watchlist.find((f) => f.nameRu === film.nameRu);
      if (filmInStore) {
        filmInStore.isWatchList = true;
      }
      this.watchlist.push(film);
    },
    setDynamic(dynamic: IFilms) {
      this.dynamic = dynamic;
    },
  },
});
