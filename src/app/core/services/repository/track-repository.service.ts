import { ElectronService } from "./../electron/electron.service";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Track } from "../../../../shared/types/mt";

@Injectable({
  providedIn: "root",
})
export class TrackRepositoryService {
  private _tracks: Track[] = [];
  private _tracks$: Subject<Array<Track>> = new Subject();
  public readonly tracks: Observable<Array<Track>> = this._tracks$.asObservable();

  constructor(private els: ElectronService) {
    this.els.ipcRenderer.on('new-tracks',(_, tks: Track[]) => this.addTracks(tks));

    this.els.ipcRenderer.on('update-track', (_, t: Track) => this.updateTrack(t));
  }

  private addTracks(trks: Track[]): void {
    console.log(`total tracks: ${trks.length}`);
    this._tracks = trks;
    this._tracks$.next(this._tracks);
  }

  private updateTrack(track: Track): void {
    const index = this._tracks.findIndex(t => t.id === track.id);
    this._tracks[index] = Object.assign({}, this._tracks[index], track);
    this._tracks$.next(this._tracks);
  }

  openFolder(): void {
    this.els.ipcRenderer.send('open-folder');
  }

  fixTags(track: Track): void {
    this.els.ipcRenderer.send('fix-tags', track);
  }
}
