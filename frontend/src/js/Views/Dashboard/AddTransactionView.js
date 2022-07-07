import View from "../View";
import InputField from "../../components/InputField/InputField";
import InputFieldNumber from "../../components/InputField/InputFieldNumber";
import InputFieldDate from "../../components/InputField/InputFieldDate";
import CustomRadioFieldList from "../../components/CustomRadioFieldList";
import {
  transactionCategoryNames,
  transactionCategoryIcons,
  transactionTypes,
  transactionTypeIcons,
} from "../../constants";
import { createElement, formatDateForInputField } from "../../utils/functions";

class AddTransactionView extends View {
  addTransactionForm = createElement({
    tagName: "form",
    attributes: [
      { name: "id", value: "add-transaction-form" },
      { name: "novalidate", value: true },
    ],
  });
  typeList;
  categoryList;
  inputDescription;
  inputDate;
  inputAmount;

  handlerClickButtonSubmit() {
    this.addTransactionForm.querySelector("button").click();
  }

  addHandlerAddTransaction(handler) {
    this.addTransactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.formValidation()) {
        const newTransaction = {
          type: this.typeList.getValue(),
          category: this.categoryList.getValue(),
          description: this.inputDescription.value,
          date: this.inputDate.value,
          amount: +this.inputAmount.value,
        };
        handler(newTransaction);
      }
    });
  }

  formValidation() {
    if (
      this.typeList.validation() &&
      this.categoryList.validation() &&
      this.inputDescription.validation() &&
      this.inputDate.validation() &&
      this.inputAmount.validation()
    )
      return true;

    this.typeList.validation();
    this.categoryList.validation();
    this.inputDescription.validation();
    this.inputDate.validation();
    this.inputAmount.validation();

    return false;
  }

  generateDetailFieldsMarkup() {
    const fieldsetElement = createElement({
      tagName: "fieldset",
      classNames: ["detail-list"],
    });
    const wrapperElement = createElement({ classNames: ["wrapper"] });
    fieldsetElement.insertAdjacentHTML(
      "afterbegin",
      "<legend>Details</legend>"
    );

    this.inputDescription = new InputField({
      label: "Description",
      id: "add-transaction-description",
      isRequired: true,
    });

    this.inputDate = new InputFieldDate({
      id: "add-transaction-date",
      defaultValue: formatDateForInputField(new Date()),
      min: "2020-01-01",
      max: "2025-12-31",
      isRequired: true,
    });
    this.inputAmount = new InputFieldNumber({
      label: "Amount",
      id: "add-transaction-amount",
      min: 0,
      max: 1000000,
      isRequired: true,
    });

    wrapperElement.append(
      this.inputDescription.render(),
      this.inputDate.render(),
      this.inputAmount.render()
    );
    fieldsetElement.insertAdjacentElement("beforeend", wrapperElement);

    return fieldsetElement;
  }

  generateMarkup() {
    this.addTransactionForm.innerHTML = "";

    this.typeList = new CustomRadioFieldList({
      title: "Select type",
      name: "transaction-type",
      values: transactionTypes,
      icons: transactionTypeIcons,
      className: "type-list",
    });
    this.categoryList = new CustomRadioFieldList({
      title: "Select category",
      name: "transaction-caegory",
      values: transactionCategoryNames,
      icons: transactionCategoryIcons,
      className: "category-list",
    });

    this.addTransactionForm.append(
      this.typeList.render(),
      this.categoryList.render(),
      this.generateDetailFieldsMarkup()
    );

    const html = `<button class="btn" type="submit">New transaction</button>`;
    this.addTransactionForm.insertAdjacentHTML("beforeend", html);

    return this.addTransactionForm;
  }
}

export default new AddTransactionView();
