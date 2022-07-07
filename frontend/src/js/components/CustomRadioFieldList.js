import { createElement } from "../utils/functions";

class CustomRadioFieldList {
  constructor({
    title = "",
    name = "",
    values = {},
    icons = {},
    className = "",
  }) {
    this.fieldsetElement = createElement({
      tagName: "fieldset",
      classNames: [className],
    });
    this.title = title;
    this.name = name;
    this.values = values;
    this.icons = icons;
  }

  handlerClick() {
    this.fieldsetElement
      .querySelector(".wrapper")
      .addEventListener("click", (e) => {
        if (!this.getValue()) return;
        this.removeError();
      });
  }

  getValue() {
    const checkedInput = this.fieldsetElement.querySelector(
      ".custom-radio input:checked"
    );
    if (!checkedInput) return null;
    return checkedInput.value;
  }
  setValue(value) {
    this.fieldsetElement
      .querySelectorAll(".custom-radio input")
      .forEach((input) => {
        if (input.value === value) input.checked = true;
      });
  }

  validation() {
    if (!this.getValue()) {
      this.setError();
      return false;
    }
    return true;
  }

  setError() {
    this.removeError();
    const html = `<span class="helper-text helper-text--error">This field is required!</span>`;
    this.fieldsetElement.insertAdjacentHTML("beforeend", html);
  }
  removeError() {
    if (this.fieldsetElement.querySelector(".helper-text--error")) {
      this.fieldsetElement.querySelector(".helper-text--error").remove();
    }
  }

  generateRadioFieldList() {
    return `
            <div class="wrapper">
                ${Object.entries(this.values)
                  .map(([_, value]) => {
                    return `
                        <div class="custom-radio">
                            <input type="radio" name="${
                              this.name
                            }" id="${value}" value="${value}">
                            <label for="${value}" data-value="${value}">
                                <div class="custom-radio__icon">${
                                  this.icons[value]
                                }</div>
                                <span class="custom-radio__label">${value
                                  .split("-")
                                  .join(" ")}</span>
                            </label>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        `;
  }

  render() {
    this.fieldsetElement.insertAdjacentHTML(
      "afterbegin",
      `<legend>${this.title}</legend>`
    );
    this.fieldsetElement.insertAdjacentHTML(
      "beforeend",
      this.generateRadioFieldList()
    );

    this.handlerClick();
    return this.fieldsetElement;
  }
}

export default CustomRadioFieldList;
