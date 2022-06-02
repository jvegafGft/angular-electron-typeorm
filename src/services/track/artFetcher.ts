import { Artwork } from '../../shared/types/mt';
import axios from 'axios';

const GetArtwork = async (url: string): Promise<Artwork> => {
  const clean = url.replace(/[0-9]{3,}x[0-9]{3,}/, '500x500');

  const response = await axios.get(clean, { responseType: 'arraybuffer' });
  console.log('response: ', response.headers['content-type']);

  const buffer = response.data as Buffer;
  return {
    mime: response.headers['content-type'],
    type: { id: 3, name: 'front cover' },
    description: '',
    imageBuffer: buffer,
  } as Artwork;
};

export default GetArtwork;
