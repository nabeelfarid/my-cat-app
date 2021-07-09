export interface CatImage {
  id: string;
  url: string;
}

export interface Favourite {
  id: string;
  image_id: string;
}

export interface Vote {
  id: string;
  image_id: string;
  value: VoteValue;
}

export type VoteValue = 0 | 1;
