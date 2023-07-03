import { Injectable } from '@angular/core';

@Injectable()
export class HeaderConfig {
        header?: {
                path?: string;
                options: {
                        image_url?: string;
                        height?: number;
                        width?: number;
                }
        }
}