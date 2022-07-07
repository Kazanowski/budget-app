import { createElement } from "../utils/functions";

class Spinner{
    parentElement = document.querySelector('body');
    spinner
    spinnerSVG = `
        <svg viewBox="0 0 50 50">
            <circle
                cx="25"
                cy="25"
                r=20>
            </circle>
        </svg>
    `;
    spinnerWrapper = createElement({
        classNames: ['spinner', 'overlay'],
        properties:[{ name: 'innerHTML', value: this.spinnerSVG}]
    });

    render(){
        this.parentElement.insertAdjacentElement('beforeend', this.spinnerWrapper);
    }
    remove(){
        this.spinnerWrapper.remove();
    }
}

export default new Spinner();