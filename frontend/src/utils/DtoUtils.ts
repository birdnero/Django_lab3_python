export interface Genre {
  genre_id: number,
  name: string,
  description: string
}

export interface Actor {
  actor_id: number,
  name: string,
  birthdate: string
}

export interface Director {
  director_id: number,
  name: string,
  birthdate: string,
  biography: string,
  awards: string
}

export interface Play {
  play_id: number;
  actor_ids: number[];
  director_ids: number[];
  name: string;
  duration: number;
  description: string;
  author: string;
  genre_id: number;
}

export interface UserLogin {
  email: string,
  password: string
}