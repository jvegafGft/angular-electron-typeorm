import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../shared/types/mt';
import { AudioService } from '../../../core/services';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  track: Track;
  progress: number;

  constructor(private audioServ: AudioService) {
  }


  ngOnInit(): void {
    this.audioServ.audioTrack.subscribe(track => this.track = track);
    this.audioServ.progress.subscribe(value => this.progress = value);
  }

  seekTo(position: number): void {
    this.audioServ.seekTo(position);
  }
}
