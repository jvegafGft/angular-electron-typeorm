import { Track } from './../shared/types/mt';
import { TrackRepositoryService } from './core/services';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private repository: TrackRepositoryService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
  }

  openFolder(): void {
    this.repository.openFolder();
  }

  fixTags(trks: Track[]): void {
    console.log(`fixing ${trks.length}`);
    // if (this.tracklistComponent.selectedItems.length < 1) {
    //   return;
    // }
    // this.itemsToProcess = this.tracklistComponent.selectedItems.length;
    // this.tracklistComponent.selectedItems.forEach(item => {
    //   const track = this.checkTitleTag(item);
    //   this.els.ipcRenderer.send('find-tags', item);
    // });
  }

  removeFile(t: Track): void {
    console.log(`remove file: ${t.title}`);

    // this.els.ipcRenderer.send('remove-file', t);
    // this.trackItems = this.tagsService.removeItem(this.tracklistComponent.selectedItems[0], this.trackItems);
  }

  onHeaderAction(value: string): void {
    switch (value) {
      case 'openFolder':
        this.openFolder();
        break;
      case 'findTagsOnline':
        console.log("find tags");
        break;
    }
  }

  trackItemsAction(action: string, tracks?: Track[], t?:Track): void {
    switch (action) {
      case 'findTags':
        this.fixTags(tracks);
        break;
      case 'removeFile':
        this.removeFile(t);
        break;
    }
  }

  openDetailDialog(t: Track): void {
    console.log(`open dialog: ${t.title}`);
  }
}
