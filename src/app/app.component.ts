import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { DefaultConfig } from './shared/constants';
import { HeaderConfig } from './shared/models/headerConfig';

@Component({
  selector: 'm1-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() header_config: HeaderConfig;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (typeof changes?.['header_config']?.currentValue === 'string') {
      this.header_config = JSON.parse(changes?.['header_config']?.currentValue);
    }
    this.header_config = Object.assign(this.header_config, DefaultConfig)
  }

}
