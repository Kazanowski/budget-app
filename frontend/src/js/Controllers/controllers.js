import {
  filterDateController,
  filterTypeAndCategoryController,
  displayAddTransactionViewController,
  displayEditTransactionViewController,
  displayDeleteTransactionModalController,
  addTransactionController,
  editTransactionController
} from './transactions';

import {
  renderLoginViewController,
  renderRegisterViewController,
  registerController,
  loginController,
  logoutController
} from './users';

import AddTransactionView from './../Views/Dashboard/AddTransactionView';

import DashboardView from "./../Views/Dashboard/DashboardView";
import DateFilterView from "../Views/Dashboard/DateFilterView";
import BalanceView from "../Views/Dashboard/BalanceView";
import ChartsView from "../Views/Dashboard/ChartsView";
import TransactionsListView from "../Views/Dashboard/TransactionsListView";
import NoTransactionsView from "../Views/Dashboard/NoTransactionsView";

import AuthorizationView from "../Views/Authorization/AuthorizationView";
import LoginView from "./../Views/Authorization/LoginView";
import RegisterView from "./../Views/Authorization/RegiesterView";

import TransactionsModel from "../Models/TransactionsModel";

import { state } from "../Models/state";
import EditTransactionView from '../Views/Dashboard/EditTransactionView';
import Spinner from '../components/Spinner';


const authorizationController = () => {
  AuthorizationView.render();
}
const dashboardController = async () => {
  Spinner.render();
  await TransactionsModel.load(state.getLoggedUserID());
  
  DashboardView.render();

  TransactionsModel.filterByDate();
  DateFilterView.render(state.getDateFilterNames());
  BalanceView.render(TransactionsModel.countSumIncomesAndExpenses(state.getFilteredTransactions()));
  ChartsView.render(TransactionsModel.getSortByTypeAndCategoryValue());
  TransactionsListView.render(TransactionsModel.sortByDate(state.getFilteredTransactions()));
  NoTransactionsView.render({amountOfTransactions: state.getFilteredTransactions().length})
  Spinner.remove();
}

const initAuthorization = () => {
  AuthorizationView.addHandlerRender(authorizationController);
  AuthorizationView.addHandlerLinkToRegister(renderRegisterViewController);
  AuthorizationView.addHandlerLinkToLogin(renderLoginViewController);
  LoginView.addHandlerRender(renderLoginViewController);
  LoginView.addHandlerLogin(loginController);
  RegisterView.addHandlerRegister(registerController);
}
const initDashboard = () => {
  DashboardView.addHandlerRender(dashboardController);
  DashboardView.addHandlerLogout(logoutController);
  DashboardView.addHandlerDisplayAddTransactionView(displayAddTransactionViewController)
  DateFilterView.addHandlerFilterDate(filterDateController);
  ChartsView.addHandlerClickChart(filterTypeAndCategoryController);
  TransactionsListView.addHandlerDisplayEditTransactionView(displayEditTransactionViewController);
  TransactionsListView.addHandlerDeleteTransaction(displayDeleteTransactionModalController);
  AddTransactionView.addHandlerAddTransaction(addTransactionController);
  EditTransactionView.addHandlerEditTransaction(editTransactionController);
}

export const init = () =>{
  state.getLoggedUserID() ? initDashboard() : initAuthorization();
}