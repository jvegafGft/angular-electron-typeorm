import { Track, ResultTag } from "../../shared/types/mt";
import { ParseDuration } from "../../shared/utils";

const parseYear = (yearStr?: string): number | null => {
  if (!yearStr || yearStr.length !== 4) {
    return null;
  }
  return Number(yearStr);
};


const Update = (track: Track, tag: ResultTag): Track => {
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
  };
};

export default Update;

