export interface Track {
  id: string;
  album?: string;
  artist?: string;
  bpm?: number;
  genre?: string;
  key?: string;
  duration: number;
  time: string;
  filepath: string;
  title: string;
  year?: number;
}

export interface ResultTag {
  id: string;
  album?: string;
  artist?: string;
  bpm?: number;
  genre?: string;
  key?: string;
  duration: number;
  title: string;
  year?: string;
  artworkUrl?: string;
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
