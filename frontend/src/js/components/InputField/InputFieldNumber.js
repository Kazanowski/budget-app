import InputField from "./InputField";
import { helperTexts } from "./helperTexts";

export default class InputFieldNumber extends InputField {
  constructor(data) {
    super({
      ...data,
    });
    this.min = data.min || data.min === 0 ? data.min : undefined;
    this.max = data.max || data.max === 0 ? data.max : undefined;
    this.inputElement.addEventListener("input", this.handleInput);
  }

  handleInput(e) {
    e.preventDefault();
    if (
      this.value.length > 0 &&
      isNaN(this.value) &&
      !(this.value.length === 1 && this.value.charAt(0) === "-")
    ) {
      this.value = this.value.substr(0, this.value.length - 1);
    }
  }

  validation() {
    return super.validation(() => {
      let text;
      if (!isNaN(this.value)) {
        if (
          this.min !== undefined &&
          this.max !== undefined &&
          (this.value < this.min || this.value > this.max)
        ) {
          text = helperTexts.valueOutOfTheRange(
            this.label.toLowerCase(),
            this.min,
            this.max
          );
        } else if (this.min !== undefined && this.value < this.min) {
          text = helperTexts.valueLess(this.label.toLowerCase(), this.min);
        } else if (this.max !== undefined && this.value > this.max) {
          text = helperTexts.valueMore(this.label.toLowerCase(), this.max);
        }
      } else {
        text = helperTexts.invalidFormat("The value must be a number!");
      }
      return text;
    });
  }
}
