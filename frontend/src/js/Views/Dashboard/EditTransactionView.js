import View from "../View";
import InputField from "../../components/InputField/InputField";
import InputFieldNumber from "../../components/InputField/InputFieldNumber";
import CustomRadioFieldList from "../../components/CustomRadioFieldList";
import {
  transactionCategoryNames,
  transactionCategoryIcons,
  transactionTypes,
  transactionTypeIcons,
} from "../../constants";
import { createElement } from "../../utils/functions";

class EditTransactionView extends View {
  editTransactionForm = createElement({
    tagName: "form",
    attributes: [
      { name: "id", value: "edit-transaction-form" },
      { name: "novalidate", value: true },
    ],
  });
  typeList;
  categoryList;
  inputDescription;
  inputDate;
  inputAmount;
  oldTransactionData;

  handlerClickButtonSubmit() {
    this.editTransactionForm.querySelector("button").click();
  }

  addHandlerEditTransaction(handler) {
    this.editTransactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.formValidation()) {
        const newTransactionData = {
          type: this.typeList.getValue(),
          category: this.categoryList.getValue(),
          description: this.inputDescription.value,
          date: this.inputDate.value,
          amount: +this.inputAmount.value,
        };
        handler({ ...this.oldTransactionData, ...newTransactionData });
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

  generateFormMarkup() {
    this.editTransactionForm.innerHTML = "";
    const fieldsetElement = createElement({
      tagName: "fieldset",
      classNames: ["detail-list"],
    });
    const wrapperElement = createElement({ classNames: ["wrapper"] });
    fieldsetElement.insertAdjacentHTML(
      "afterbegin",
      "<legend>Details</legend>"
    );
    const html = `<button type="submit" class="btn">Save</button>`;

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
    this.inputDescription = new InputField({
      type: "text",
      label: "Description",
      id: "edit-transaction-description",
      validationData: {
        isRequired: true,
      },
    });
    this.inputDate = new InputField({
      type: "date",
      label: "Date",
      id: "edit-transaction-date",
      validationData: {
        isRequired: true,
      },
    });
    this.inputAmount = new InputFieldNumber({
      label: "Amount",
      id: "edit-transaction-amount",
      min: 0,
      max: 1000000,
      numberType: "FLOAT",
      validationData: {
        isRequired: true,
      },
    });
    wrapperElement.append(
      this.inputDescription.render(),
      this.inputDate.render(),
      this.inputAmount.render()
    );
    fieldsetElement.insertAdjacentElement("beforeend", wrapperElement);
    this.editTransactionForm.append(
      this.typeList.render(),
      this.categoryList.render(),
      fieldsetElement
    );
    this.editTransactionForm.insertAdjacentHTML("beforeend", html);
  }
  generateMarkup() {
    this.generateFormMarkup();
    this.oldTransactionData = this.data;
    this.inputDescription.value = this.data.description;
    this.inputDate.value = this.data.date;
    this.inputAmount.value = this.data.amount;
    this.typeList.setValue(this.data.type);
    this.categoryList.setValue(this.data.category);

    return this.editTransactionForm;
  }
}

export default new EditTransactionView();
