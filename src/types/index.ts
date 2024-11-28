export type FetchState<T> = {
  data?: T;
  loading: boolean;
  error?: string;
}

export type FetchResponse = {
  Search: Movie[];
  totalResults: string;
}

export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  Plot: string;
  Genre: string;
  Director: string;
}