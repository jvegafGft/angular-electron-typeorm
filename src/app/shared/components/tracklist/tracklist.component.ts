import { Track } from '../../../../shared/models/Track';
import { AudioService } from '../../../core/services/index';
import Mousetrap from 'mousetrap';
import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss']
})
export class TracklistComponent implements AfterViewInit {
  @Input() items: Track[];

  @Output() showDetail = new EventEmitter<Track>();
  @Output() menuActions = new EventEmitter<string>();

  selectedItems = [];
  selectedIndex: number;
  sortedItems: number[];

  constructor(private audioServ: AudioService) {}

  ngAfterViewInit(): void {
    this.initShortcuts();
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

  itemClicked(): void {
    this.showDetail.emit();
  }

  actionTrigged(selected: string): void {
    this.menuActions.emit(selected);
  }

  private initShortcuts(): void {
    Mousetrap.bind('space', () => this.playTrack());
    Mousetrap.bind('left', () => this.backSeekTrack());
    Mousetrap.bind('right', () => this.advanceSeekTrack());
    Mousetrap.bind('esc', () => this.unselect());
  }

  playTrack(): void {
    if (this.selectedItems.length < 1) { return; }
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
