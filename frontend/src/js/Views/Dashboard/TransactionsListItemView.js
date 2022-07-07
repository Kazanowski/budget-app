import { amountFormat, dateFormat } from "../../utils/functions";
import View from "../View";

import { transactionCategoryIcons } from "./../../constants";

import { trashIcon, editIcon } from "./../../utils/icons";

class TransactionsListItemView extends View {
  generateMarkup(){
    return `
      <li class="list__item" data-id="${this.data.id}" data-type="${this.data.type}" data-category="${this.data.category}"> 
        <div class="list__item-date">${dateFormat(new Date(this.data.date))}</div>
        <div class="list__item-category">
            <div class="list__item-category-icon icon">${transactionCategoryIcons[this.data.category]}</div>
            <span class="list__item-category-name">${this.data.category}</span>
        </div>
        <div class="list__item-description">${this.data.description}</div>
        <div class="list__item-amount">${amountFormat.format(this.data.amount)}</div>
        <div class="list__item-actions">
          <button class="btn-icon btn-icon--small btn-edit-transaction">${editIcon}</button>
          <button class="btn-icon btn-icon--small btn-delete-transaction">${trashIcon}</button>
        </div>
      </li>
    `;
  }
}

export default new TransactionsListItemView();
