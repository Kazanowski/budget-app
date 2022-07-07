import { createElement } from "../utils/functions";
import {arrowDownIcon} from './../utils/icons';

class CustomSelectField {
    constructor(data, handlerChange){
        this.data = data,
        this.handlerChange = handlerChange;
        this.wrapper = createElement({classNames: ['custom-select-field']})
        
        this.addHandlerDropdown();
        this.addHandlerChange(handlerChange);
    };

    addHandlerDropdown(){
        this.wrapper.addEventListener('click', e => {
            e.preventDefault();
            const selectElement = e.target.closest('.custom-select-field__select');
            if(!selectElement) return;
            this.wrapper.classList.toggle('dropdown-open');
        })
    }
    addHandlerChange(handler){
        this.wrapper.addEventListener('click', e => {
            e.preventDefault();
            const dropdownItem = e.target.closest('.custom-select-field__dropdown-item');
            if(!dropdownItem) return;

            const value = dropdownItem.dataset.value;

            this.wrapper.querySelector('.custom-select-field__select-value').textContent = value.split("-").join(" ");
            this.wrapper.querySelector('.custom-select-field__select-value').dataset.value = value;

            this.wrapper.querySelectorAll('.custom-select-field__dropdown-item').forEach(item => {
                item.classList.remove('custom-select-field__dropdown-item--selected');
            })
            dropdownItem.classList.add('custom-select-field__dropdown-item--selected');
            this.wrapper.classList.remove('dropdown-open');

            handler(value);
        })
    }

    render(){
        const html = `
            ${this.data.label ? `<span class="custom-select-field__label">${this.data.label}</span>` : ""}
            <div class="custom-select-field__select">
                <span class="custom-select-field__select-value" data-current-value="${this.data.default}">${this.data.default.split("-").join(" ")}</span>
                <div class="custom-select-field__select-arrow">${arrowDownIcon}</div>
            </div>
            <div class="custom-select-field__dropdown">
                ${(this.data.options.map(option => {
                    const selectedItemClass = option === this.data.default ? `custom-select-field__dropdown-item--selected` : ``;
                    return `<span class="custom-select-field__dropdown-item ${selectedItemClass}"  data-value="${option}">${option.split("-").join(" ")}</span>`;
                })).join("")}
            </div>
        `;
        this.wrapper.insertAdjacentHTML('afterbegin', html);
        return this.wrapper;
    }
}

export default CustomSelectField;