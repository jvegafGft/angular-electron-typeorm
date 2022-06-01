import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable, Subject } from 'rxjs';
import { Track } from '../../../../shared/types/mt';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: Howl;
  private track$;
  track: Track;
  progress: number;
  private intervalObj;

  constructor() {
    this.track$ = new Subject<Track>();
  }

  play(track: Track): void {
    if (track.id === this.track?.id && this.audio?.playing()) { this.stop(); return; }
    if (this.audio?.playing()) { this.stop(); }
    this.track = track;
    this.track$.next(this.track);
    this.audio = new Howl({
      src: this.track.filepath,
      autoplay: true,
      html5: true,
      onload: () => {
        this.seekTo(20);
      }
    });

    this.intervalObj = setInterval(() => {
      this.updateProgress();
    }, 1000);
  }

  stop(): void {
    clearInterval(this.intervalObj);
    this.audio.unload();
    this.track = null;
    this.track$.next(this.track);
  }


  getTrack$(): Observable<Track> {
    return this.track$.asObservable();
  }

  seekTo(position: number): void {
    this.progress = position;
    const time = this.audio.duration() * (position / 100);
    this.audio.seek(time);
  }

  updateProgress(): void {
    const seek = this.audio.seek();
    this.progress = ( seek as number / this.audio.duration() ) * 100;
  }

  seekBack(): void {
    if (!this.audio?.playing()) { return; }
    this.seekTo(this.progress - 10);
  }

  seekAdv(): void {
    if (!this.audio?.playing()) { return; }
    this.seekTo(this.progress + 10);
  }
}
