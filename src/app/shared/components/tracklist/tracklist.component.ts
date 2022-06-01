import { AfterViewInit, Component, EventEmitter, Output } from "@angular/core";
import Mousetrap from "mousetrap";
import { Observable } from "rxjs";
import { Track } from "../../../../shared/types/mt";
import { AudioService } from "../../../core/services/index";
import { TrackRepositoryService } from "./../../../core/services/repository/track-repository.service";

@Component({
  selector: "app-tracklist",
  templateUrl: "./tracklist.component.html",
  styleUrls: ["./tracklist.component.scss"],
})
export class TracklistComponent implements AfterViewInit {
  @Output() showDetail = new EventEmitter<Track>();
  @Output() menuActions = new EventEmitter<string>();

  items: Track[] = [];
  selectedItems = [];
  selectedIndex: number;
  sortedItems: number[];

  constructor(
    private audioServ: AudioService,
    private repository: TrackRepositoryService
  ) {
    this.repository.tracks.subscribe(tracks => this.items = tracks);
  }

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
    Mousetrap.bind("space", () => this.playTrack());
    Mousetrap.bind("left", () => this.backSeekTrack());
    Mousetrap.bind("right", () => this.advanceSeekTrack());
    Mousetrap.bind("esc", () => this.unselect());
    Mousetrap.bind("control+a", () => this.selectAll());

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
