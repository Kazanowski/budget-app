import InputField from "./InputField";
import { createElement } from "../../utils/functions";
import { eyeIcon, eyeSlashIcon } from "./../../utils/icons";
import { helperTexts } from "./helperTexts";

export default class InputFieldPassword extends InputField {
  constructor(data) {
    super({ ...data, type: "password" });
    this.isToggle = data.isToggle || false;
    this.isToggle
      ? this.inputFieldElement.addEventListener(
          "click",
          this.handleToggle.bind(this)
        )
      : null;
  }

  handleToggle(e) {
    const btn = e.target.closest(".btn-switch");
    if (!btn) return;
    e.preventDefault();
    if (this.inputElement.type === "text") {
      this.inputElement.type = "password";
      btn.innerHTML = eyeSlashIcon;
    } else {
      this.inputElement.type = "text";
      btn.innerHTML = eyeIcon;
    }
  }

  validation() {
    if (this.regexp) {
      return super.validation(() => {
        if (!this.regexp.test(this.value)) {
          return helperTexts.invalidPasswordFormat;
        }
      });
    } else {
      return super.validation();
    }
  }

  render() {
    if (!this.isToggle) return super.render();

    const htmlLabel = `<label for="${this.id}" class="input-field__label">${this.label}</label>`;
    const htmlToggle = `<button class="btn-icon btn-switch" type="button">${eyeSlashIcon}</button>`;
    const inputWrapperElement = createElement({
      classNames: ["input-field__input-wrapper"],
    });

    this.inputElement.classList.add("input-field__input--trailing-icon");
    inputWrapperElement.insertAdjacentElement("afterbegin", this.inputElement);
    inputWrapperElement.insertAdjacentHTML("beforeend", htmlToggle);

    this.inputFieldElement.insertAdjacentHTML("afterbegin", htmlLabel);
    this.inputFieldElement.insertAdjacentElement(
      "beforeend",
      inputWrapperElement
    );

    return this.inputFieldElement;
  }
}
