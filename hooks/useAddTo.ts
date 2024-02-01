export function useAddToWatchList() {
  const filmsStore = useFilmsStore();

  const addToWatchList = (film: any) => {
    const index = filmsStore.films.indexOf(film);
    const isAlreadyAdded = filmsStore.watchlist.some(
      (f) => f.nameRu === film.nameRu
    );

    if (!isAlreadyAdded) {
      filmsStore.addToWatchList(index, film);
    } else {
      const filmIndex = filmsStore.watchlist.findIndex(
        (f) => f.nameRu === film.nameRu
      );
      filmsStore.removeWatchlist(filmIndex);
    }
  };
  return { addToWatchList };
}
