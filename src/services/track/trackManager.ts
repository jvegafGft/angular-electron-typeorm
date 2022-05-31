import { Track } from '../../shared/models/Track';
import LoadTagsFromFile from '../tag/loader';


const CreateTrack = async (file: string): Promise<Track | null> => {
  const tags = await LoadTagsFromFile(file);
  if (!tags) {
    return null;
  }

  return Track.createTrack(
    file,
    tags.duration,
    tags.title,
    tags.artist,
    tags.album,
    tags.genre?.join(', '),
    tags.year,
    tags.bpm,
    tags.key
  )

};

export const GetTracks = async (files: string[]) => {
  const tracks = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const track = await CreateTrack(file);
    tracks.push(track);
  }

  return tracks;
};
