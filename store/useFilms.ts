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
  },
});
