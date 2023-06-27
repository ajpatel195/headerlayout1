import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { HeaderConfig } from './shared/models/headerConfig';
// import * as lodash from 'lodash';


@Component({
  selector: 'm1-link',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() header_config: HeaderConfig;

   defaultAvatarConfig = {
    size: 40,
    initialsSize: 2,
    src: 'https://cdn2.hubspot.net/hubfs/6171800/assets/images/logos/m-logo-symbol@2x.png',
    cornerRadius: 5,
    bgColor: 'black',
    name: '3rd Degree Screening',
    round: false
  }

  currentHeight: any;
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("control in ng changes",changes);
    
    if (typeof changes?.['header_config']?.currentValue === 'string') {
      this.header_config = JSON.parse(changes?.['header_config']?.currentValue);
    }
    this.header_config = Object.assign(this.header_config,this.defaultAvatarConfig)
    console.log(this.header_config);
  }

}
