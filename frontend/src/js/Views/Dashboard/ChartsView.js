import View from "./../View";
import ChartBarView from "./ChartBarView";
import { transactionTypes } from "./../../constants";
import { createElement } from "../../utils/functions";

class ChartsView extends View {
  parentSelector = '.dashboard__bar-charts';
  chartsElement = createElement({classNames: ['charts']});

  addHandlerClickChart(handler){
    this.chartsElement.addEventListener('click', (e) => {
      e.preventDefault();
      const barElement = e.target.closest('.bar');
      if(!barElement) return;

      let filter = null;

      if(barElement.classList.contains('active')){
        barElement.classList.remove('active');
        this.chartsElement.style.setProperty('--bar-opacity', 1);
      }else{
        this.chartsElement.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
        barElement.classList.add('active');
        this.chartsElement.style.setProperty('--bar-opacity', 0.3);
        filter = {
          type: barElement.dataset.type,
          category: barElement.dataset.category
        }
      }
      handler(filter);
    })
  }

  generateMarkup(){
    this.chartsElement.style.setProperty('--bar-opacity', 1);
    this.chartsElement.innerHTML = "";
    let htmlExpensesChartBars = "";
    let htmlIncomesChartBars = "";
    this.data[transactionTypes.EXPENSE].categories.forEach((value, key) => {
      htmlExpensesChartBars += ChartBarView.render({
          fill: value/this.data[transactionTypes.EXPENSE].maxValue*100,
          amount: value,
          label: key,
          transactionType: transactionTypes.EXPENSE,
        },false
      )
    });
    this.data[transactionTypes.INCOME].categories.forEach((value, key) => {
      htmlIncomesChartBars += ChartBarView.render({
          fill: value/this.data[transactionTypes.INCOME].maxValue*100,
          amount: value,
          label: key,
          transactionType: transactionTypes.INCOME,
        },false
      )
    });

    let html = "";
    if(htmlExpensesChartBars.length){
      html += 
      `<div class="chart">
        <h4>Expenses</h4>
        <div class="chart__bars">
        ${htmlExpensesChartBars}
        </div>
      </div>`; 
    }
    if(htmlIncomesChartBars.length){
      html += 
      `<div class="chart">
        <h4>Incomes</h4>
        <div class="chart__bars">
        ${htmlIncomesChartBars}
        </div>
      </div>`; 
    }

    if(html === "") return null;
    this.chartsElement.insertAdjacentHTML('afterbegin', `<h3>Details</h3>`)
    this.chartsElement.insertAdjacentHTML('beforeend', `<div class="row row--up-lg">${html}</div>`);
    return this.chartsElement;
  }
}

export default new ChartsView();
