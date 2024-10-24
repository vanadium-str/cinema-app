export type FetchState = {
  data?: FetchResponse;
  loading: boolean;
  error: boolean | string;
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
}