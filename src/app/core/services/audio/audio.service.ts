import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable, Subject } from 'rxjs';
import { Track } from '../../../../shared/types/mt';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private _audio: Howl;
  private _track: Track;
  private _track$: Subject<Track> = new Subject();
  public readonly audioTrack: Observable<Track> = this._track$.asObservable();
  private _progrNumber = 0;
  private _progress: Subject<number> = new Subject();
  public readonly progress: Observable<number> = this._progress.asObservable();
  private intervalObj;

  constructor() {}

  play(track: Track): void {
    if (track.id === this._track?.id && this._audio?.playing()) {
      this.stop();
      return;
    }
    if (this._audio?.playing()) {
      this.stop();
    }
    this._track = track;
    this._track$.next(this._track);
    this._audio = new Howl({
      src: this._track.filepath,
      autoplay: true,
      html5: true,
      onload: () => {
        this.seekTo(20);
      },
    });

    this.intervalObj = setInterval(() => {
      this.updateProgress();
    }, 1000);
  }

  stop(): void {
    clearInterval(this.intervalObj);
    this._audio.unload();
    this._track = null;
    this._track$.next(null);
  }

  seekTo(position: number): void {
    this._progress.next(position);
    this._progrNumber = position;
    const time = this._audio.duration() * (position / 100);
    this._audio.seek(time);
  }

  updateProgress(): void {
    const seek: number = this._audio.seek();
    this._progrNumber = (seek / this._audio.duration()) * 100;
    this._progress.next(this._progrNumber);
  }

  seekBack(): void {
    if (!this._audio?.playing()) {
      return;
    }
    this.seekTo(this._progrNumber - 10);
  }

  seekAdv(): void {
    if (!this._audio?.playing()) {
      return;
    }
    this.seekTo(this._progrNumber + 10);
  }
}
