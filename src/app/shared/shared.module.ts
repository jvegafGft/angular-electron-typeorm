import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DuiButtonModule,
  DuiDialogModule,
  DuiEmojiModule,
  DuiFormComponent,
  DuiIconModule,
  DuiInputModule,
  DuiListModule,
  DuiRadioboxModule,
  DuiSelectModule,
  DuiSliderModule,
  DuiTableModule,
  DuiWindowModule,
} from '@marcj/angular-desktop-ui';
import { TranslateModule } from '@ngx-translate/core';
import { AudioService, ElectronService, TrackRepositoryService } from '../core/services';
import { HeaderComponent, PlayerComponent, TracklistComponent, DetailDialogComponent } from './components';
import { WebviewDirective } from './directives/';

@NgModule({
  declarations: [WebviewDirective, HeaderComponent, TracklistComponent, PlayerComponent, DetailDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    DuiWindowModule.forRoot(),
    DuiButtonModule,
    DuiInputModule,
    DuiFormComponent,
    DuiRadioboxModule,
    DuiSelectModule,
    DuiIconModule,
    DuiListModule,
    DuiTableModule,
    DuiButtonModule,
    DuiDialogModule,
    DuiEmojiModule,
    DuiSliderModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    HeaderComponent,
    TracklistComponent,
    PlayerComponent,
    DetailDialogComponent,
  ],
  providers: [TrackRepositoryService, ElectronService, AudioService],
})
export class SharedModule {}
