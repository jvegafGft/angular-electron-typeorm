export interface ResultTag {
  id: string;
  album: string | undefined;
  artist: string | undefined;
  bpm: number | undefined;
  genre: string | undefined;
  key: string | undefined;
  duration: number;
  title: string;
  year: string | undefined;
  artworkUrl: string | undefined;
  tokens: string[];
}

export interface Artwork {
  mime: string;
  type: { id: number; name: string };
  description: string;
  imageBuffer: Buffer;
}

export interface MatchResult {
  tag: ResultTag;
  trackTokens: string[];
  matches: number;
  of: number;
}
