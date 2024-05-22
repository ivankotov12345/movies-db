export type GenreType = {
  id: number,
  name: string,
}

export type MovieType = {
  genre_ids: number[],
  id: number,
  original_title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  my_rating?: number
}

export type MoviesListResponseType = {
  page: number,
  results: MovieType[],
  total_pages: number,
  total_results: number,
}

export type ProductionComaniesType = {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string
}

export type VideoDataType = {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  published_at: string,
  id: string
}

export type MovieResponseType = {
  original_title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  runtime: number,
  budget: number,
  revenue: number,
  genres: GenreType[],
  overview: string,
  production_companies: ProductionComaniesType[],
  videos: {
    results: VideoDataType[],
  }
}