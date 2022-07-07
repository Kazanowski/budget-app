import BalanceView from "../Views/Dashboard/BalanceView";
import DateFilterView from "../Views/Dashboard/DateFilterView";
import ChartsView from "../Views/Dashboard/ChartsView";
import NoTransactionsView from "../Views/Dashboard/NoTransactionsView";
import TransactionsListView from "../Views/Dashboard/TransactionsListView";
import AddTransactionView from "../Views/Dashboard/AddTransactionView";
import EditTransactionView from "../Views/Dashboard/EditTransactionView";

import Notification from "../components/Notification";
import { message } from "../constants";

import Modal from "../components/Modal";

import TransactionsModel from "../Models/TransactionsModel";

import { state } from "../Models/state";
import Spinner from "../components/Spinner";


const filterDateController = (filterName) => {
    state.setDateFilterName(filterName);
    TransactionsModel.filterByDate();
    
    BalanceView.render(TransactionsModel.countSumIncomesAndExpenses(state.getFilteredTransactions()));
    ChartsView.render(TransactionsModel.getSortByTypeAndCategoryValue());
    TransactionsListView.render(TransactionsModel.sortByDate(state.getFilteredTransactions()));
    NoTransactionsView.render({amountOfTransactions: state.getFilteredTransactions().length, message: 'filtered'})
}

const filterTypeAndCategoryController = (filter) => {
    state.setFilterTypeAndCategory(filter);
    TransactionsListView.render(TransactionsModel.sortByDate(TransactionsModel.filterByTypeAndCategory(state.getFilteredTransactions())));
}

const deleteTransactionController = async (id) =>{
    const result = await TransactionsModel.delete(id);
    if(result.status){
        reloadTransactionData();
        Notification.add({title: 'Transaction', message: message.deleteTransaction, type: 'success'});
    }
    Modal.closeModal();
}

const editTransactionController = async (transaction) => {
    Spinner.render();
    const result = await TransactionsModel.edit(transaction);
    if(result.status){
        Modal.closeModal();
        reloadTransactionData();
        Notification.add({title: 'Transaction', message: message.editTransaction, type: 'success'});
    };
    Spinner.remove();
}
const addTransactionController = async (transaction) => {
    Spinner.render();
    const result = await TransactionsModel.add({userID: state.getLoggedUserID(), ...transaction});
    if(result.status){
        Modal.closeModal();
        reloadTransactionData();
        Notification.add({title: 'Transaction', message: message.addTrasaction, type: 'success'});
    }
    Spinner.remove();
}

const displayDeleteTransactionModalController = (id) => {
    Modal.add({
        title: 'Delete transaction', 
        content: `<p>Are you sure?</p>`,
        btnAccept: {
            value: 'Yes',
            handler: () => deleteTransactionController(id)
        },
        btnClose: {
            value: 'No',
            handler: undefined
        }
    });
}

const displayEditTransactionViewController = (id) => {
    const transaction = state.getTransaction(id);
    Modal.add({
        title: 'Edit transaction', 
        content: EditTransactionView.render(...transaction, false),
        btnAccept: {
            value: 'Save',
            handler: () => EditTransactionView.handlerClickButtonSubmit()
        }
    });
}
const displayAddTransactionViewController  = () => {
    Modal.add({
        title: 'Add transaction', 
        content: AddTransactionView.render(null, false),
        btnAccept: {
            value: 'New transaction',
            handler: () => AddTransactionView.handlerClickButtonSubmit()
        }
    });
}

const reloadTransactionData = async () => {
    TransactionsModel.filterByDate();
    DateFilterView.render(state.getDateFilterNames());
    BalanceView.render(TransactionsModel.countSumIncomesAndExpenses(state.getFilteredTransactions()));
    ChartsView.render(TransactionsModel.getSortByTypeAndCategoryValue());
    TransactionsListView.render(TransactionsModel.sortByDate(state.getFilteredTransactions()));
    NoTransactionsView.render({amountOfTransactions: state.getFilteredTransactions().length})
}


export {
    filterDateController,
    filterTypeAndCategoryController,
    displayAddTransactionViewController,
    displayEditTransactionViewController,
    displayDeleteTransactionModalController,
    addTransactionController,
    editTransactionController,
    deleteTransactionController
};