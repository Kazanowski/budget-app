import View from "../View";
import CustomSelectField from './../../components/CustomSelectField';
import { createElement } from "../../utils/functions";


class DateFilterView extends View{
    parentSelector = '.dashboard__date-range';
    eventFilterDate = new Event('filter-date');
    wrapper = createElement({classNames:['date-filter']});
    filter = "";

    addHandlerFilterDate(handler){
        this.wrapper.addEventListener('filter-date', e => {
            e.preventDefault();
            handler(this.filter);
        })
    }
    handlerChange(value){
        this.filter = value;
        this.wrapper.dispatchEvent(this.eventFilterDate);
    }
    generateMarkup(){
        this.wrapper.innerHTML = "";
        const selectDate = new CustomSelectField({...this.data}, this.handlerChange.bind(this));
        this.wrapper.insertAdjacentHTML('afterbegin', `<h4>Date range</h4>`)
        this.wrapper.insertAdjacentElement('beforeend', selectDate.render());
        return this.wrapper;
    }
}

export default new DateFilterView();