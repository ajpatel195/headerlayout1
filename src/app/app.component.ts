import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { DefaultBranding, DefaultConfig } from './shared/constants';
import { HeaderConfig } from './shared/models/headerConfig';

@Component({
  selector: 'm1-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() header_config: HeaderConfig;
  branding: any;

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (typeof changes?.['header_config']?.currentValue === 'string') {
      this.header_config = JSON.parse(changes?.['header_config']?.currentValue);
    }
    this.header_config = Object.assign(DefaultConfig, this.header_config);

    this.branding = this.header_config?.branding || DefaultBranding;
    this.updateBranding('subtitle_color', this.branding?.subtitle_color);
    this.updateBranding('font_family', this.branding?.font_family);
    this.updateBranding('font_size', this.branding?.font_size);
  }

  private updateBranding(name: any, value: string): void {
    this.host.nativeElement.style.setProperty(`--${name}`, value);

  }

}
