import { createElement } from "../../utils/functions";
import View from "../View";
import TransactionsListItemView from "./TransactionsListItemView";

class TransactionsListView extends View {
  parentSelector = '.dashboard__transaction-list';
  transactionsElement = createElement({classNames: ['transactions']});

  addHandlerDisplayEditTransactionView(handler){
    this.transactionsElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn-edit-transaction');
      if(!btn) return;
      e.preventDefault();
      handler(btn.closest('.list__item').dataset.id);
    })
  }
  addHandlerDeleteTransaction(handler){
    this.transactionsElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn-delete-transaction');
      if(!btn) return;
      e.preventDefault();
      handler(btn.closest('.list__item').dataset.id);
    })
  }

  generateMarkup() {
    if(!this.data.length) return null;
    this.transactionsElement.innerHTML = "";
    const html = `
      <h3>List of transaction</h3>
      <ul class="list">
        <li class="list__item list__item--head">
          <div class="list__item-date">Date</div>
          <div class="list__item-category">Category</div>
          <div class="list__item-description">Description</div>
          <div class="list__item-amount">Amount</div>
          <div class="list__item-actions">Actions</div>
        </li>
        ${this.data.map(transaction => {
          return TransactionsListItemView.render(transaction, false)  
        }).join("")}
      </ul>
    `
    this.transactionsElement.insertAdjacentHTML('afterbegin', html);
    return this.transactionsElement;
  }
}

export default new TransactionsListView();
