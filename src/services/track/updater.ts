import { Track } from '../../shared/models/Track';
import { ResultTag } from '../../shared/types/music-tagger'

const Update = (track: Track, tag: ResultTag): Track => {

    track.title = tag.title;
    track.album = tag.album;
    track.artist = tag.artist;
    track.bpm = tag.bpm;
    track.genre = tag.genre;
    track.key = tag.key;
    track.duration = tag.duration;
    if (tag.year?.length === 4) {
      track.year = Number(tag.year)
    }

    return track;
};

export default Update;
