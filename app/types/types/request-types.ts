export type SearchParamsType = {
    language: 'en-US',
    with_genres?: string,
    primary_release_year?: string,
    'vote_average.lte'?: string,
    'vote_average.gte'?: string,
    sort_by: string,
    page: number,
}