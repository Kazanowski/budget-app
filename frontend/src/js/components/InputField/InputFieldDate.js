import InputField from "./InputField";
import { regexp } from "../../config";
import { helperTexts } from "./helperTexts";

export default class InputFieldDate extends InputField {
  constructor(data) {
    super({
      type: "date",
      label: data.label || "Date",
      inputAttributes: [
        { name: "min", value: data.min || "" },
        { name: "max", value: data.max || "" },
      ],
      ...data,
    });
    this.min = data.min || "";
    this.max = data.max || "";
  }

  validation() {
    return super.validation(() => {
      let text;
      if (regexp.date.test(this.value)) {
        const date = new Date(this.value);
        if (
          this.min &&
          this.max &&
          (date < new Date(this.value) || date > new Date(this.max))
        ) {
          text = helperTexts.valueOutOfTheRange(
            this.label.toLowerCase(),
            this.min,
            this.max
          );
        } else if (this.min && date < new Date(this.min)) {
          text = helperTexts.valueLess(this.label.toLowerCase(), this.min);
        } else if (this.max && date > new Date(this.max)) {
          text = helperTexts.valueMore(this.label.toLowerCase(), this.max);
        }
      } else {
        text = helperTexts.invalidFormat("(YYYY-MM-DD)");
      }
      return text;
    });
  }
}
