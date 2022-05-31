import { RepositoryModule } from "./../repository/repository.module";
import {
  HeaderComponent,
  TracklistComponent,
  PlayerComponent,
} from "./components";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";
import { DuiButtonModule, DuiInputModule, DuiTableModule, DuiWindowModule } from "@marcj/angular-desktop-ui";
@NgModule({
  declarations: [
    WebviewDirective,
    HeaderComponent,
    TracklistComponent,
    PlayerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RepositoryModule,
    DuiWindowModule.forRoot(),
    DuiButtonModule,
    DuiInputModule,
    DuiTableModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    HeaderComponent,
    TracklistComponent,
    PlayerComponent,
  ],
})
export class SharedModule {}
