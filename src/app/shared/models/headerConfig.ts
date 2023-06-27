import { Injectable } from '@angular/core';

// tslint:disable:variable-name
@Injectable()
export class HeaderConfig {
        size?: number;
        initialsSize?: number;
        src?: string;
        cornerRadius?: number;
        bgColor?: string;
        name?: string;
        round?: boolean
   
}


// const defaultAvatarConfig = {
//     size: 60,
//     initialsSize: 2,
//     src: 'https://cdn2.hubspot.net/hubfs/6171800/assets/images/logos/m-logo-symbol@2x.png',
//     cornerRadius: 5,
//     bgColor: 'black',
//     name: '3rd Degree Screening',
//     round: false
//   }