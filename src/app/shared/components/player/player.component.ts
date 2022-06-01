import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../shared/types/mt';
import { AudioService } from '../../../core/services/audio/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  track: Track;

  constructor(private audioServ: AudioService) {

  }

  ngOnInit(): void {
    this.audioServ.audioTrack.subscribe(track => this.track = track);
  }

  seekTo(position: number): void {
    this.audioServ.seekTo(position);
  }
}
