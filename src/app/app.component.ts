import { Track } from '../shared/models/Track';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private els: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (els.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.els.ipcRenderer);
      console.log('NodeJS childProcess', this.els.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  openFolder(): void {
    this.els.ipcRenderer.send('open-folder');
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
    console.log(`remove file: ${t.filename}`);

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
    console.log(`open dialog: ${t.filename}`);
  }
}
