import View from "../View";
import { amountFormat } from "../../utils/functions";
import {pieChart} from './../../components/pieChart';

class BalanceView extends View{
    parentSelector = '.dashboard__balance';

    generateMarkup(){
        if(!this.data.incomes && !this.data.expenses){
            document.querySelector(this.parentSelector).style.order = "-1";
            return null;
        } 
        let labelClass = "";
        if((this.data.incomes - this.data.expenses) < 0) labelClass = "balance__chart-label--negative";
        else if((this.data.incomes - this.data.expenses) > 0) labelClass = "balance__chart-label--positive";
        document.querySelector(this.parentSelector).style.order = "0";
        return `
            <div class="balance">
                <h4>Balance</h4>
                <div class="balance__wrapper">
                    <div class="balance__chart">
                        ${pieChart({rail: this.data.incomes , fill: this.data.expenses})}
                        <span class="balance__chart-label ${labelClass}">
                            ${amountFormat.format(this.data.incomes - this.data.expenses)}
                        </span>
                    </div>
                    <ul class="balance__summary">
                        <li>Incomes<span> ${amountFormat.format(this.data.incomes)}</span></li>
                        <li>Expenses<span> ${amountFormat.format(this.data.expenses)}</span></li>
                    </ul>
                </div>
            </div>
        `;
    }
}

export default new BalanceView();