import { createElement } from "../../utils/functions";
import { helperTexts } from "./helperTexts";

export default class InputField {
  constructor(data) {
    this.type = data.type || "text";
    this.label = data.label || "";
    this.id = data.id;
    this.isRequired = data.isRequired || false;
    this.regexp = data.regexp || "";
    this.inputAttributes = data.inputAttributes
      ? data.inputAttributes.concat([
          { name: "value", value: data.defaultValue || "" },
        ])
      : [{ name: "value", value: data.defaultValue || "" }];
    this.inputFieldElement = createElement({ classNames: ["input-field"] });
    this.inputElement = this.generateInput();
    this.inputElement.addEventListener(
      "focusout",
      this.handleFocusout.bind(this)
    );
  }

  get value() {
    return this.inputElement.value;
  }
  set value(value) {
    this.inputElement.value = value;
  }

  handleFocusout(e) {
    e.preventDefault();
    this.validation();
  }

  generateInput() {
    return createElement({
      tagName: "input",
      classNames: ["input-field__input"],
      attributes: [
        { name: "id", value: this.id },
        { name: "type", value: this.type },
        { name: "required", value: this.isRequired },
        ...this.inputAttributes,
      ],
    });
  }

  render() {
    const html = `<label for="${this.id}" class="input-field__label">${this.label}</label>`;
    this.inputFieldElement.insertAdjacentHTML("afterbegin", html);
    this.inputFieldElement.insertAdjacentElement(
      "beforeend",
      this.inputElement
    );
    return this.inputFieldElement;
  }

  validation(customValidation = undefined) {
    let text;

    if (this.isRequired && !this.value) {
      text = helperTexts.isRequired;
    }

    if (this.value) {
      if (customValidation) {
        text = customValidation();
      } else if (this.regexp && !this.regexp.test(this.value)) {
        text = helperTexts.invalidFormat();
      }
    }

    if (text) {
      this.setHelperText(text);
      return false;
    }

    this.removeHelperText();
    return true;
  }

  setHelperText(text = "", type = "error") {
    const className = `input-field__helper-text`;

    if (this.inputFieldElement.querySelector(`.${className}`)) {
      this.inputFieldElement.classList.remove(
        "input-field--error",
        "input-field--success"
      );
      this.inputFieldElement.querySelector(`.${className}`).textContent = text;
    } else {
      this.inputFieldElement.insertAdjacentHTML(
        "beforeend",
        `<span class="${className}">${text}</span>`
      );
    }
    this.inputFieldElement.classList.add(`input-field--${type}`);
  }

  removeHelperText() {
    const className = `input-field__helper-text`;
    if (this.inputFieldElement.querySelector(`.${className}`)) {
      this.inputFieldElement.querySelector(`.${className}`).remove();
      this.inputFieldElement.classList.remove(
        "input-field--error",
        "input-field--success"
      );
    }
  }
}
