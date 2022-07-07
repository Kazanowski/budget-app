import { createElement } from '../../utils/functions';
import View from './../View';

class AuthorizationView extends View {
    parentSelector  = '#app';
    authorizationElement = createElement({classNames: ["authorization", "container"]});

    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }
    addHandlerLinkToLogin(handler){
        document.querySelector(this.parentSelector).addEventListener('click', e => {
            if(!e.target.closest('.link-to-login')) return;
            e.preventDefault();
            handler();
        });
    }
    
    addHandlerLinkToRegister(handler){
        document.querySelector(this.parentSelector).addEventListener('click', e => {
            if(!e.target.closest('.link-to-register')) return;
            e.preventDefault();
            handler();
        });
    }

    generateMarkup(){
        return this.authorizationElement;
    }
}

export default new AuthorizationView();