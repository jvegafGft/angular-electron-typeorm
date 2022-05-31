import * as Path from "path";
import { v4 } from "uuid";

export class Track {
  private _id: string;
  private _filepath: string;
  private _filename: string;
  private _duration: number;
  private _time: string;
  private _title: string;
  private _artist: string | null = null;
  private _album: string | null = null;
  private _genre: string | null = null;
  private _year: number | null = null;
  private _bpm: number | null = null;
  private _key: string | null = null;

  constructor(
    id: string,
    filepath: string,
    duration: number,
    title: string,
    artist?: string,
    album?: string,
    genre?: string,
    year?: number,
    bpm?: number,
    key?: string
  ) {
    this.id = id;
    this.filepath = filepath;
    this.filename = this.extractFilename(filepath);
    this.duration = duration;
    this.time = this.parseDuration(this.duration);
    this.title = title ?? this.createTitleFromFilename(this.filename);
    this.artist = artist;
    this.album = album;
    this.genre = genre;
    this.year = year;
    this.bpm = bpm;
    this.key = key;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get filepath(): string {
    return this._filepath;
  }

  public set filepath(value: string) {
    this._filepath = value;
  }

  public get filename(): string {
    return this._filename;
  }

  public set filename(value: string) {
    this._filename = value;
  }

  public get duration(): number {
    return this._duration;
  }

  public set duration(value: number) {
    this._duration = value;
  }

  public get time(): string {
    return this._time;
  }

  public set time(value: string) {
    this._time = value;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get artist(): string | null {
    return this._artist;
  }

  public set artist(value: string | null) {
    this._artist = value;
  }

  public get album(): string | null {
    return this._album;
  }
  public set album(value: string | null) {
    this._album = value;
  }
  public get genre(): string | null {
    return this._genre;
  }
  public set genre(value: string | null) {
    this._genre = value;
  }
  public get year(): number | null {
    return this._year;
  }
  public set year(value: number | null) {
    this._year = value;
  }
  public get bpm(): number | null {
    return this._bpm;
  }
  public set bpm(value: number | null) {
    this._bpm = value;
  }
  public get key(): string | null {
    return this._key;
  }
  public set key(value: string | null) {
    this._key = value;
  }

  private extractFilename = (filepath: string): string => {
    return Path.basename(filepath, ".mp3");
  };

  private createTitleFromFilename = (fname: string): string => {
    return fname.replace("-", " ").split("_").join(" ").trim();
  };

  private parseDuration = (duration: number | null): string => {
    if (duration !== null) {
      const hours = Math.trunc(duration / 3600);
      const minutes = Math.trunc(duration / 60) % 60;
      const seconds = Math.trunc(duration) % 60;

      const hoursStringified = hours < 10 ? `0${hours}` : hours;
      const minutesStringified = minutes < 10 ? `0${minutes}` : minutes;
      const secondsStringified = seconds < 10 ? `0${seconds}` : seconds;

      let result = hoursStringified > 0 ? `${hoursStringified}:` : "";
      result += `${minutesStringified}:${secondsStringified}`;

      return result;
    }

    return "00:00";
  };

  public static createTrack = (
    filepath: string,
    duration: number,
    title?: string,
    artist?: string,
    album?: string,
    genre?: string,
    year?: number,
    bpm?: number,
    key?: string
  ): Track => {
    return new Track(
      v4(),
      filepath,
      duration,
      title,
      artist,
      album,
      genre,
      year,
      bpm,
      key
    );
  };
}
