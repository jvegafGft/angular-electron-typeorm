import { Component, OnInit } from '@angular/core';
import { TrackRepositoryService } from './../../../core/services/repository/track-repository.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private repository: TrackRepositoryService) {}

  ngOnInit(): void {}

  onAction(action: string): void {
    switch (action) {
      case 'openFolder':
        this.repository.openFolder();
        break;
      case 'findTagsOnline':
        this.repository.fixAllTags();
        break;
    }
  }
}
