import { Injectable } from '@angular/core';
import { Branding } from './branding';

@Injectable()
export class HeaderConfig {
        logo_url?: string;
        height?: any;
        width?: any;
        subtitle?: string;
        branding?: Branding;
}