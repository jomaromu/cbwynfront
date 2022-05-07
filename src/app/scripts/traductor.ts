import { ElementRef, HostListener, Injectable } from '@angular/core';

@Injectable()

export class Traductor {

    constructor() { }

    traducePagina(): void {

        const checkTranslate = setInterval(() => {

            // banner google
            const skiptranslate = document.getElementById(':1.container');
            // select
            const divTraducir = document.getElementById('divTraducir');


            if (skiptranslate !== null) {

                skiptranslate.style.display = 'none';
                // divTraducir.style.display = 'none';
                // clearInterval(checkTranslate);
            }

            if (divTraducir !== null) {
                divTraducir.style.display = 'none';
            }

            // clearInterval(checkTranslate);
        }, 300);
    }
}
