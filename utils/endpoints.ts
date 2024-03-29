export const KINOPOISK_API_BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2';

export const FILM_BY_ID_URL = (kinopoiskId: number) => `${KINOPOISK_API_BASE_URL}/films/${kinopoiskId}`;

export const TOP_POPULAR_FILMS_URL = `${KINOPOISK_API_BASE_URL}/films/collections?type=TOP_POPULAR_ALL&page=1`;