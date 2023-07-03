import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { HeaderConfig } from './shared/models/headerConfig';

@Component({
  selector: 'm1-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() header_config: HeaderConfig;

  configOptions: any;
  defaultConfig = {
    header: {
      path: 'http://192.168.1.2:8081/output/m1-header.js',
      options: {
        image_url: 'http://192.168.1.2:8081/src/assets/motus-logo-gray-blue.svg',
        height: 30,
        width: 100
      }
    }
  };

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
    this.header_config = Object.assign(this.header_config, this.defaultConfig)
    this.configOptions = this.header_config?.header?.options;
  }

}
