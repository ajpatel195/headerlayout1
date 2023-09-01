import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Branding } from './shared/models/branding';
import { HeaderConfig } from './shared/models/headerConfig';

@Component({
  selector: 'm1-header',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,

})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() header_config: HeaderConfig;
  @ViewChild('temp_image') tempImage: ElementRef;
  @ViewChild('original_image') originalImage: ElementRef;
  public styles: any;
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

    Object.entries(this.header_config?.branding as Branding).forEach(([key, value]) => {
      this.updateBranding(key, value);
    });

    this.styles = `height:${this.header_config.height}px; width:${this.header_config.width}px`;

  }

  loadMainImage() {
    this.tempImage.nativeElement.hidden = true;
    this.originalImage.nativeElement.style = { display: 'block' };
  }
  
  private updateBranding(name: any, value: any): void {
    this.host.nativeElement.style.setProperty(`--${name}`, value);

  }

}
