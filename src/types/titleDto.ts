export interface TranslationData {
  id: number;
  title: string;
  type: string;
}
export interface MaterialData {
  aired_at: string;
  all_genres: string[];
  all_status: string;
  anime_description: string;
  anime_genres: string[];
  anime_kind: string;
  anime_license_name: string;
  anime_licensed_by: string[];
  anime_status: string;
  anime_studios: string[];
  anime_title: string;
  description: string;
  duration: number;
  episodes_aired: number;
  episodes_total: number;
  other_titles: string[];
  other_titles_jp: string[];
  poster_url: string;
  rating_mpaa: string;
  released_at: string;
  screenshots: string[];
  shikimori_rating: number;
  shikimori_votes: number;
  title: string;
  title_en: string;
}
export interface TitleDto {
  blocked_countries: string[];
  blocked_seasons: string;
  camrip: boolean;
  created_at: string;
  episodes_count: number;
  id: string;
  imdb_id: string;
  last_episode: number;
  last_season: number;
  lgbt: false;
  link: string;
  material_data?: MaterialData;
  other_title: string;
  quality: string;
  screenshots: string[];
  shikimori_id: string;
  title: string;
  title_orig: string;
  translation: TranslationData;
  type: string;
  updated_at: string;
  worldart_link: string;
  year: 2022;
  allTranslations: string[];
}
export interface TitlesStateDto {
  titlesArray: TitleDto[] | [];
  title: TitleDto | [];
}
