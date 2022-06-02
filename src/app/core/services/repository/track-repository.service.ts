import { ElectronService } from './../electron/electron.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Track } from '../../../../shared/types/mt';

@Injectable({
  providedIn: 'root',
})
export class TrackRepositoryService {
  private _tracks: Track[] = [];
  private _tracks$: Subject<Array<Track>> = new Subject();
  public readonly tracks: Observable<Array<Track>> = this._tracks$.asObservable();

  constructor(private els: ElectronService) {
    this.els.ipcRenderer.on('new-tracks', (_, tks: Track[]) => this.addTracks(tks));

    this.els.ipcRenderer.on('update-track', (_, t: Track) => this.updateTrack(t));
  }

  openDevTracks(): void {
    this.els.ipcRenderer.send('open-dev-tracks');
  }

  removeFile(track: Track): void {
    const updated = this._tracks.filter(t => track.id !== t.id);
    this._tracks = updated;
    this._tracks$.next(this._tracks);
  }

  fixAllTags(): void {
    this._tracks.forEach(t => this.els.ipcRenderer.send('fix-tags', t));
  }

  openFolder(): void {
    this.els.ipcRenderer.send('open-folder');
  }

  fixTags(track: Track): void {
    this.els.ipcRenderer.send('fix-tags', track);
  }

  private addTracks(trks: Track[]): void {
    console.log(`total tracks: ${trks.length}`);
    this._tracks = trks;
    this._tracks$.next(this._tracks);
  }

  private updateTrack(track: Track): void {
    console.log(`track updated: ${track.title}`);
    const temp = this._tracks.map(t => {
      if (t.id === track.id) {
        return {
          ...t,
          title: track.title,
          artist: track.artist,
          album: track.album,
          genre: track.genre,
          bpm: track.bpm,
          year: track.year,
          key: track.key,
        };
      }
      return t;
    });
    this._tracks = temp;
    this._tracks$.next(this._tracks);
  }
}
