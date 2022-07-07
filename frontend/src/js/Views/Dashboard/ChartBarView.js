import View from "../View";
import { amountFormat } from "../../utils/functions";
import { transactionCategoryIcons } from "./../../constants";

class ChartBarView extends View {
  generateMarkup(){
    return `
      <div class="bar" data-type="${this.data.transactionType}" data-category="${this.data.label}">
        <div class="bar__icon icon">${transactionCategoryIcons[this.data.label]}</div>
        <div class="bar__label">${this.data.label.split("-").join(" ")}</div>
        <div class="bar__amount">${amountFormat.format(this.data.amount)}</div>
        <div class="bar__range">
          <div class="bar__range-fill" style="width: ${this.data.fill}%"></div>
        </div>
      </div>
    `;
  }
}

export default new ChartBarView();
