import { ElectronService } from './../../core/services/electron/electron.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackRepositoryService {

  constructor(private els: ElectronService) { }
}
