import { TrackRepositoryService } from './repository/services/track-repository.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {
  DuiButtonModule,
  DuiCheckboxModule,
  DuiFormComponent,
  DuiInputModule,
  DuiRadioboxModule,
  DuiSelectModule,
  DuiWindowModule,
  DuiIconModule,
  DuiListModule,
  DuiTableModule,
  DuiAppModule,
  DuiDialogModule,
  DuiSliderModule,
  DuiEmojiModule,
} from '@marcj/angular-desktop-ui';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DuiAppModule.forRoot(), //<--- important#
    DuiWindowModule.forRoot(),

    DuiCheckboxModule,
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
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [TrackRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
