import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { on } from 'process';
import { Track } from '../../../../../shared/types/mt';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  @Input() item: Track;
  @Output() onClickCover = new EventEmitter();
  @Output() onSaveChanges = new EventEmitter();
  @Output() onDetailFixTags = new EventEmitter();
  @Output() onCloseDetail = new EventEmitter();

  visible = false;

  ngOnInit(): void {
    this.visible = this.item !== null;
  }

  coverArt(): unknown {
    if (this.item.artwork?.imageBuffer) {
      const blob = new Blob([this.item.artwork.imageBuffer], { type: `image/${this.item.artwork.mime}` });
      const artUrl = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(artUrl);
    }
    return 'assets/album-art-placeholder.png';
  }

  artClicked(): void {
    this.onClickCover.emit();
  }

  saveChanges(): void {
    this.onSaveChanges.emit();
  }

  findTagsOnline(): void {
    this.onDetailFixTags.emit();
  }

  onCloseAction(): void {
    this.onCloseDetail.emit();
  }
}
