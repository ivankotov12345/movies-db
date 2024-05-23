export type SearchParamsType = {
    language: 'en-US',
    with_genres?: string,
    primary_release_year?: string,
    'vote_average.lte'?: string | number,
    'vote_average.gte'?: string | number,
    sort_by: string | null,
    page: number,
}