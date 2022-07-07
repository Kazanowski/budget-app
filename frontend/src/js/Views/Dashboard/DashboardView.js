import View from "./../View";

class DashboardView extends View {
  parentSelector  = '#app';

  addHandlerDisplayAddTransactionView(handler){
    document.querySelector(this.parentSelector).addEventListener('click', e => {
        if(!e.target.closest('.btn-add-transaction')) return;
        e.preventDefault();
        handler();
    })
  }

  addHandlerRender(handler){
    window.addEventListener('load', handler);
  }

  addHandlerLogout(handler) {
    document.querySelector(this.parentSelector).addEventListener("click", (e) => {
      if(!e.target.closest('.btn-logout')) return;
      e.preventDefault();
      handler();
    });
  }

  generateMarkup(){
    return `
      <header class="header container">
        <h1 class="header__logo">Budget</h1>
        <div class="header__actions">
          <button class="btn btn-add-transaction">Add transaction</button>
          <button class="btn btn--secondary btn-logout">Logout</button>
        </div>
      </header>
      <main class="dashboard container">
        <h2>Summary of transactions</h2>
        <div class="row row--up-lg summary">
          <div class="dashboard__date-range"></div>
          <div class="dashboard__balance"></div>
        </div>
        <div class="dashboard__bar-charts"></div>
        <div class="dashboard__transaction-list"></div> 
        <div class="dashboard__no-transactions"></div>
      </main>
    `;
  }
}

export default new DashboardView();
