export interface IFilms {
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  year: number;
  addToCurrentlyWatching: any;
  isFavorite: boolean;
}

export const useFilmsStore = defineStore({
  id: "film",
  state: () => ({
    films: [] as IFilms[],
    currentlyWatching: [] as IFilms[],
  }),
  actions: {
    setFilms(films: IFilms[]) {
      this.films = films;
    },
    setCurrently(current: IFilms[]) {
      this.currentlyWatching = current;
    },
    removeCurrently(index: number) {
      this.currentlyWatching.splice(index, 1);
    },
    addFilms(film: IFilms) {
      this.films.push(film);
    },
    addToCurrentlyWatching(index: number, film: IFilms) {
      film.isFavorite = true;
      this.currentlyWatching.splice(index, 0, film);
    },
  },
});
