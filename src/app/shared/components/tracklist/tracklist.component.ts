import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import Mousetrap from 'mousetrap';
import { Track } from '../../../../shared/types/mt';
import { AudioService } from '../../../core/services/index';
import { TrackRepositoryService } from './../../../core/services/repository/track-repository.service';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
})
export class TracklistComponent implements AfterViewInit {
  @Output() showDetail = new EventEmitter<Track>();

  items: Track[] = [];
  selectedItems = [];
  selectedIndex: number;
  sortedItems: number[];

  constructor(private audioServ: AudioService, private repository: TrackRepositoryService) {
    this.repository.tracks.subscribe(tracks => (this.items = tracks));
  }

  ngAfterViewInit(): void {
    this.initShortcuts();
    this.repository.openDevTracks();
  }

  selectPrev(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
    const index = this.sortedItems[this.selectedIndex];
    this.selectedItems = [this.items[index]];
  }

  selectNext(): void {
    if (this.selectedIndex < this.sortedItems.length) {
      this.selectedIndex++;
    }
    const index = this.sortedItems[this.selectedIndex];
    this.selectedItems = [this.items[index]];
  }

  itemClicked(track: Track): void {
    this.showDetail.emit(track);
  }

  actionTrigged(action: string): void {
    switch (action) {
      case 'findTags':
        this.selectedItems.forEach(t => this.repository.fixTags(t));
        break;
      case 'removeFile':
        this.selectedItems.forEach(t => this.repository.removeFile(t));
        break;
    }
  }

  private initShortcuts(): void {
    Mousetrap.bind('space', () => this.playTrack());
    Mousetrap.bind('left', () => this.backSeekTrack());
    Mousetrap.bind('right', () => this.advanceSeekTrack());
    Mousetrap.bind('esc', () => this.unselect());
    Mousetrap.bind('control+a', () => this.selectAll());
  }

  playTrack(): void {
    if (this.selectedItems.length < 1) {
      return;
    }
    this.audioServ.play(this.selectedItems[0]);
  }

  private backSeekTrack() {
    this.audioServ.seekBack();
  }

  private advanceSeekTrack() {
    this.audioServ.seekAdv();
  }

  private selectAll() {
    this.selectedItems = this.sortedItems;
  }

  private unselect() {
    this.audioServ.stop();
    this.selectedItems = [];
  }
}
