import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, ElementRef } from '@angular/core';

@Injectable()

export class NavbarResponsivo {

    public flag = false;

    constructor(
        private breakPointObserver: BreakpointObserver
    ) { }

    manejaNavbar(): void {


        const row = document.getElementById('row');
        const navPrincipal = document.getElementById('navPrincipal');
        const imgLogo = document.getElementById('imgLogo');

        const bars = document.getElementById('bars');

        const alto = navPrincipal.clientHeight;

        const body = document.body;
        body.style.marginTop = `${alto}px`;

        const ulNavbar = document.getElementsByClassName('ulNavbar');
        const arrayulNavbar = Array.from(ulNavbar);

        // const rowResp = document.createElement('div');

        this.breakPointObserver
            .observe(['(max-width: 1400px)'])
            .subscribe((state: BreakpointState) => {

                if (state.matches) {
                    row.style.width = `80%`;
                } else {
                    // row.style.width = `60%`;
                }
            });

        this.breakPointObserver
            .observe(['(max-width: 992px)'])
            .subscribe((state: BreakpointState) => {

                if (state.matches) {
                    row.style.width = `90%`;
                } else {
                    // row.style.width = `60%`;
                }
            });

        this.breakPointObserver
            .observe(['(max-width: 768px)'])
            .subscribe((state: BreakpointState) => {

                if (state.matches) {
                    arrayulNavbar.forEach((item: any) => {
                        item.style.display = 'none';
                    });

                    imgLogo.style.width = '50px';
                    this.eventoBtnResp(bars);
                } else {
                    arrayulNavbar.forEach((item: any) => {
                        item.style.display = 'flex';
                    });
                    bars.style.display = 'none';
                    imgLogo.style.width = '60px';
                }

            });
    }

    eventoBtnResp(bars: HTMLElement): void {

        bars.classList.add('fas', 'fa-bars');
        bars.setAttribute('id', 'menuResp');
        bars.style.fontSize = '1.7rem';
        bars.style.color = 'rgb(72, 79, 86)';
        bars.style.display = 'flex';

        const rowResp = document.createElement('div');
        const navPrincipal = document.getElementById('navPrincipal');
        const cerrar = document.createElement('i');
        const ulItems = document.getElementById('ulItems');
        const ulEntrar = document.getElementById('ulEntrar');

        bars.addEventListener('click', (e) => {

            if (this.flag === false) {

                // desplegar menu
                // navPrincipal.style.padding = `0px`;
                navPrincipal.style.flexDirection = `column`;

                // rowResp.style.border = `1px solid red`;
                rowResp.style.position = `fixed`;
                rowResp.style.top = `0px`;
                rowResp.style.left = '0px';
                rowResp.style.width = `100vw`;
                rowResp.style.height = `100vh`;
                rowResp.style.display = `flex`;
                rowResp.style.flexDirection = `column`;
                rowResp.style.justifyContent = `center`;
                rowResp.style.alignItems = `center`;
                rowResp.style.backgroundColor = `white`;
                rowResp.style.zIndex = '9999';

                ulItems.style.display = `flex`;
                ulItems.style.flexDirection = `column`;
                ulItems.style.justifyContent = `center`;
                ulItems.style.alignItems = `center`;
                ulItems.style.width = `90%`;
                // ulItems.style.backgroundColor = `red`;

                ulEntrar.style.display = `flex`;
                ulEntrar.style.flexDirection = `column`;
                ulEntrar.style.justifyContent = `center`;
                ulEntrar.style.alignItems = `center`;
                ulEntrar.style.width = `90%`;
                // ulEntrar.style.backgroundColor = `blue`;

                cerrar.classList.add('fas', 'fa-times');
                cerrar.setAttribute('id', 'cerrarResp');
                cerrar.style.position = `fixed`;
                cerrar.style.top = `40px`;
                cerrar.style.right = `40px`;
                cerrar.style.fontSize = `1.7rem`;

                rowResp.append(cerrar, ulItems, ulEntrar);

                navPrincipal.append(rowResp);

                console.log(this.flag);
                this.flag = true;
            } else {

                // recoger menu
                rowResp.style.display = `none`;

                console.log(this.flag);
                this.flag = false;
            }
        });

        cerrar.addEventListener('click', (e) => {

            console.log(this.flag);

            if (this.flag === true) {
                rowResp.style.display = 'none';

                navPrincipal.style.flexDirection = `row`;

                ulItems.style.display = `none`;
                ulItems.style.flexDirection = 'row';
                ulItems.style.alignItems = 'center';
                ulItems.style.width = 'auto';


                ulEntrar.style.display = `none`;
                ulEntrar.style.flexDirection = 'row';
                ulEntrar.style.alignItems = 'center';
                ulEntrar.style.width = 'auto';

                bars.style.display = 'flex';
                navPrincipal.append(ulItems, ulEntrar);

                this.flag = false;
            }
        });

    }

}
