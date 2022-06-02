import { Track } from './../shared/types/mt';
import { TrackRepositoryService } from './core/services';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private repository: TrackRepositoryService, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
  }

  openFolder(): void {
    this.repository.openFolder();
  }

  removeFile(t: Track): void {
    console.log(`remove file: ${t.title}`);

    // this.els.ipcRenderer.send('remove-file', t);
    // this.trackItems = this.tagsService.removeItem(this.tracklistComponent.selectedItems[0], this.trackItems);
  }

  openDetailDialog(t: Track): void {
    console.log(`open dialog: ${t.title}`);
  }
}
