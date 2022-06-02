import { Track, ResultTag } from '../../shared/types/mt';
import { ParseDuration } from '../../shared/utils';
import GetArtwork from './artFetcher';

const parseYear = (yearStr?: string): number | null => {
  if (!yearStr || yearStr.length !== 4) {
    return null;
  }
  return Number(yearStr);
};

const Update = async (track: Track, tag: ResultTag): Promise<Track> => {
  console.log('fixed', tag.title);

  return {
    ...track,
    title: tag.title,
    album: tag.album,
    artist: tag.artist,
    bpm: tag.bpm,
    genre: tag.genre,
    key: tag.key,
    duration: tag.duration,
    time: ParseDuration(tag.duration),
    year: parseYear(tag.year),
    artwork: tag.artworkUrl ? await GetArtwork(tag.artworkUrl) : null,
  };
};

export default Update;
