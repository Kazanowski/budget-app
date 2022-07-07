import View from "../View";

class NoTransactionsView extends View{
    parentSelector = '.dashboard__no-transactions';
    message = {
        all: `You don't have any transactions!`,
        filtered: `You don't have any transactions in selected period!`
    };

    generateMarkup(){
        if(this.data.amountOfTransactions) return null;
        return `<div class="no-transactions">
            <h3>${this.data.message ? this.message[this.data.message] : this.message.filtered}</h3>
            <button class="btn btn--primary btn-add-transaction">Add transaction</div>
        </div>`;    
    }
}

export default new NoTransactionsView();