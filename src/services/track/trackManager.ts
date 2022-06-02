import { FileTags } from './../tag/loader';
import path from 'path';
import { Artwork, Track } from '../../shared/types/mt';
import LoadTagsFromFile from '../tag/loader';
import { v4 as uuid } from 'uuid';

const CreateTrack = async (file: string): Promise<Track | null> => {
  const tags = await LoadTagsFromFile(file);
  if (!tags) {
    return null;
  }

  const track: Track = {
    id: uuid(),
    album: tags.album,
    artist: tags.artist,
    bpm: tags.bpm,
    genre: tags.genre?.join(', '),
    key: tags.key,
    duration: tags.duration,
    time: ParseDuration(tags.duration),
    filepath: file,
    title: trackTitle(tags.title, file),
    year: tags.year,
    artwork: GetArtwork(tags),
  };
  return track;
};

export const GetTracks = async (files: string[]): Promise<Track[]> => {
  const tracks = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const track = await CreateTrack(file);
    if (track !== null) {
      tracks.push(track);
    }
  }

  return tracks;
};

const getFilename = (filepath: string) => {
  return path.basename(filepath, '.mp3');
};

const sanitizeFilename = (filename: string) => {
  return filename.replace('-', ' ').split('_').join(' ').trim();
};

const trackTitle = (title: string | undefined, filepath: string) => {
  if (title && title.length) {
    return title;
  }
  const filename = getFilename(filepath);
  return sanitizeFilename(filename);
};

const ParseDuration = (duration: number | null): string => {
  if (duration !== null) {
    const hours = Math.trunc(duration / 3600);
    const minutes = Math.trunc(duration / 60) % 60;
    const seconds = Math.trunc(duration) % 60;

    const hoursStringified = hours < 10 ? `0${hours}` : hours;
    const minutesStringified = minutes < 10 ? `0${minutes}` : minutes;
    const secondsStringified = seconds < 10 ? `0${seconds}` : seconds;

    let result = hoursStringified > 0 ? `${hoursStringified}:` : '';
    result += `${minutesStringified}:${secondsStringified}`;

    return result;
  }

  return '00:00';
};

const GetArtwork = (tags: FileTags): Artwork | null => {
  if (!tags.picture || tags.picture.length === 0) return null;
  const pic = tags.picture[0];
  return {
    mime: pic.format,
    type: { id: 3, name: pic.type },
    description: pic.description,
    imageBuffer: pic.data,
  } as Artwork;
};
