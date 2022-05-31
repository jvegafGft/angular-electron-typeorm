import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onHeaderAction = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onAction(name: string): void {
    this.onHeaderAction.emit(name);
  }
}
