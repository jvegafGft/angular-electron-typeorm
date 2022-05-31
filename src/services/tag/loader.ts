import * as mm from 'music-metadata';

export interface FileTags extends mm.ICommonTagsResult {
  duration: number;
}

const LoadTagsFromFile = async (file: string): Promise<FileTags | null> => {
  try {
    const metadata = await mm.parseFile(file);
    return { ...metadata.common, duration: metadata.format.duration };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default LoadTagsFromFile;
