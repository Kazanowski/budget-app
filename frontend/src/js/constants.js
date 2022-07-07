import {
  categoryEducationIcon,
  categoryInvestmentsIcon,
  categoryClothesIcon,
  categoryEntertainmentIcon,
  categoryBillIcon,
  categoryHealthAndBeautyIcon,
  categoryFoodIcon,
  categoryOtherIcon,
  categoryWorkIcon,
  typeIcomeIcon,
  typeExpenseIcon,
} from "./utils/icons";

export const transactionCategoryNames = {
  BILL: "bill",
  CLOTHES: "clothes",
  EDUCATION: "education",
  ENTERTAINMENT: "entertainment",
  HEALTH_AND_BEAUTY: "health-and-beauty",
  FOOD: "food",
  INVESTMENTS: "investments",
  WORK: "work",
  OTHER: "other",
};

export const transactionTypes = {
  INCOME: "income",
  EXPENSE: "expense",
};

export const transactionTypeIcons = {
  [transactionTypes.INCOME]: typeIcomeIcon,
  [transactionTypes.EXPENSE]: typeExpenseIcon,
};

export const transactionCategoryIcons = {
  [transactionCategoryNames.BILL]: categoryBillIcon,
  [transactionCategoryNames.CLOTHES]: categoryClothesIcon,
  [transactionCategoryNames.EDUCATION]: categoryEducationIcon,
  [transactionCategoryNames.ENTERTAINMENT]: categoryEntertainmentIcon,
  [transactionCategoryNames.HEALTH_AND_BEAUTY]: categoryHealthAndBeautyIcon,
  [transactionCategoryNames.FOOD]: categoryFoodIcon,
  [transactionCategoryNames.INVESTMENTS]: categoryInvestmentsIcon,
  [transactionCategoryNames.OTHER]: categoryOtherIcon,
  [transactionCategoryNames.WORK]: categoryWorkIcon,
};

export const dateFilterNames = {
  default: "this-month",
  options: [
    "this-month",
    "previous-month",
    "last-3-months",
    "last-6-months",
    "last-12-months",
    "all",
  ],
};

export const URL_SERVER = `http://localhost:3000/`;

export const message = {
  loginFail: "Incorrect email or password. Try again!",
  createAccountSuccess: "Your account was created!",
  addTrasaction: "Transaction was added",
  editTransaction: "Transaction was edited",
  deleteTransaction: "Transaction was deleted",
};
