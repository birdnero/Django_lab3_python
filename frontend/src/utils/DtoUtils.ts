export interface Genre {
  genre_id: number,
  name: string,
  description: string
}

export interface Play {
    play_id: number;
    actors: string[];
    directors: string[];
    name: string;
    duration: number;
    description: string;
    author: string;
    genre: number | Genre;
  }