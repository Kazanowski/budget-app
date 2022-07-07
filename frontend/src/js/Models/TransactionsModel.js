import { async } from 'regenerator-runtime';
import { transactionTypes, URL_SERVER} from "./../constants";
import { getDaysInMonth } from "../utils/functions";
import { state } from "./state";


class TransactionModel{
  load = async (userID) => {
    try{
      const result = await fetch(`${URL_SERVER}transactions/${userID}`,{
        headers: {'Content-Type': 'application/json'}
      });
      const data = await result.json();

      state.setAllTransactions(data);

    }catch(error){
      console.log(error);
    }
  }

  add = async (transaction) => {
    try{
      const result = await fetch(`${URL_SERVER}transactions/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...transaction})
      });
      
      const data = await result.json();
      
      if(result.status === 200){
        state.setAllTransactions(
          [...state.getAllTransactions(),
          {
            id: data.id,
            ...transaction
          }]
        );
      }
      return {
        status: result.ok,
        ...(data.message && { message: data.message })
      }
    }catch(error){
      console.log(error);
    }
  }

  edit = async (transaction) => {
    try{
      const result = await fetch(`${URL_SERVER}transactions/${transaction.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...transaction})
      });

      if(result.status === 200){
        state.setAllTransactions(
          [...state.getAllTransactions().filter(el => el.id !== transaction.id), transaction]
        );
      }
      return {
        status: result.ok,
      }

    }catch(error){
      console.log(error);
    }
  }

  delete = async (id) => {
    try{
      const result = await fetch(`${URL_SERVER}transactions/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      });

      if(result.status === 200){
        state.setAllTransactions(
          [...state.getAllTransactions().filter(transaction => transaction.id !== id)]
        );
      }
      return {
        status: result.ok
      }

    }catch(error){
      console.log(error);
    }
  }

  getSortByTypeAndCategoryValue(){
    const data = {
      [transactionTypes.EXPENSE]:{ 
        maxValue: null,
        categories: new Map()
      },
      [transactionTypes.INCOME]:{
        maxValue: null,
        categories: new Map()
      }
    }

    state.getFilteredTransactions().forEach(({type, amount, category}) => {
      const map = data[type].categories;
      map.has(category) 
        ? map.set(category, map.get(category) + amount)
        : map.set(category, amount)
    });

    data[transactionTypes.EXPENSE].categories = new Map([...data[transactionTypes.EXPENSE].categories.entries()].sort((a,b) => b[1] - a[1]));
    data[transactionTypes.INCOME].categories = new Map([...data[transactionTypes.INCOME].categories.entries()].sort((a,b) => b[1] - a[1]));
    
    data[transactionTypes.EXPENSE].maxValue = Math.max(...data[transactionTypes.EXPENSE].categories.values());
    data[transactionTypes.INCOME].maxValue = Math.max(...data[transactionTypes.INCOME].categories.values());

    return data;
  }

  sortByDate(transactions){
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }


  countSumIncomesAndExpenses(transactions = []){
    const sum = {incomes: 0, expenses: 0};
    transactions.forEach(({type, amount}) => {
      type === transactionTypes.EXPENSE ? sum.expenses += amount : sum.incomes += amount;
    })

    return sum;
  }

  filterByTypeAndCategory(transactions = [], filter = state.getFilterTypeAndCategory()){
    if(!filter) return transactions;
    return transactions.filter(({type, category}) => {
      return filter.type === type && filter.category === category;
    });
  }

  createDateFilter(filterName){
    const filter = {from: null, to: null};
    const indexOfFirstMonth = 0;
    const indexOfLastMonth = 11;
    const indexOfFirstDay = 1; 
    const today = new Date();

    if(/[0-9]{4}/.test(filterName)){
      const year = +filterName;
      filter.from = new Date(year, indexOfFirstMonth, indexOfFirstDay);  
      filter.to = new Date(year, indexOfLastMonth, getDaysInMonth(year, indexOfLastMonth), 23,59,59);
      return filter;
    }

    switch (filterName) {
      case 'previous-month': {
        filter.from = new Date(today.getFullYear(), today.getMonth() - 1, indexOfFirstDay);  
        filter.to = new Date(filter.from.getFullYear(), filter.from.getMonth(), getDaysInMonth(filter.from.getFullYear(), filter.from.getMonth()), 23,59,59);
        break;
      }
      case 'last-3-months':
      case 'last-6-months':
      case 'last-12-months': {
        const numberOfMonths = +filterName.match(/[0-9]{1,2}/);
        filter.from = new Date(today.getFullYear(), today.getMonth() - numberOfMonths, today.getDate());  
        filter.to = today;
        break;
      }
      case 'all': {
        filter.from = null;
        filter.to = null;
        break;
      }
      case 'this-month':
      default:{
        filter.from = new Date(today.getFullYear(), today.getMonth(), indexOfFirstDay);
        filter.to = new Date(today.getFullYear(), today.getMonth(), getDaysInMonth(filter.from.getFullYear(), filter.from.getMonth()), 23,59,59);
        break;
      }
    }
    return filter;
  }

  filterByDate(){
    const filter = this.createDateFilter(state.getDateFilterName());
    if(!filter.from && !filter.to){
      state.setFilteredTransactions(state.getAllTransactions());
      return;
    }
    state.setFilteredTransactions(
      state.getAllTransactions()
      .filter((transaction) =>{
        const date = new Date(transaction.date);
        return filter.from <= date && date <= filter.to
      })
    );
  }
}

export default new TransactionModel();
