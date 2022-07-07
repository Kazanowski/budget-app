import View from "./../View";
import InputField from "../../components/InputField/InputField";
import InputFieldPassword from "../../components/InputField/InputFieldPassword";
import { createElement } from "../../utils/functions";
import { regexp } from "./../../config";

class RegisterView extends View {
  parentSelector = `.authorization`;
  registerForm = createElement({
    tagName: "form",
    attributes: [
      { name: "id", value: "register-form" },
      { name: "novalidate", value: true },
    ],
  });
  inputFirstName;
  inputLastName;
  inputEmail;
  inputPassword;

  addHandlerRegister(handler) {
    this.registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        this.inputFirstName.validation() &&
        this.inputLastName.validation() &&
        this.inputEmail.validation() &&
        this.inputPassword.validation()
      ) {
        handler({
          firstName: this.inputFirstName.value,
          lastName: this.inputLastName.value,
          email: this.inputEmail.value,
          password: this.inputPassword.value,
        });
        this.clearForm();
      } else {
        this.inputFirstName.validation();
        this.inputLastName.validation();
        this.inputEmail.validation();
        this.inputPassword.validation();
      }
    });
  }
  clearForm() {
    this.inputFirstName.value = "";
    this.inputLastName.value = "";
    this.inputEmail.value = "";
    this.inputPassword.value = "";
  }

  generateRegisterFormMarkup() {
    this.registerForm.innerHTML = "";
    this.inputFirstName = new InputField({
      label: "First name",
      id: "regirste-first-name",
      isRequired: true,
      regexp: regexp.name,
    });
    this.inputLastName = new InputField({
      label: "Last name",
      id: "regirste-last-name",
      isRequired: true,
      regexp: regexp.name,
    });
    this.inputEmail = new InputField({
      type: "email",
      label: "E-mail",
      id: "register-email",
      isRequired: true,
      regexp: regexp.email,
    });
    this.inputPassword = new InputFieldPassword({
      label: "Password",
      id: "register-password",
      isRequired: true,
      isToggle: true,
      regexp: regexp.password,
    });

    const html = `<button type="submit" class="btn btn-register">Register</button>`;

    this.registerForm.append(
      this.inputFirstName.render(),
      this.inputLastName.render(),
      this.inputEmail.render(),
      this.inputPassword.render()
    );
    this.registerForm.insertAdjacentHTML("beforeend", html);

    return this.registerForm;
  }

  generateMarkup() {
    const registerElement = createElement({ classNames: ["register"] });
    const headingsHTML = `
      <h2>Register</h2>
      <p class="p--large">Create your new account</p>
    `;
    const linkHTML = `
      <p class="p--small">
        Already have any account?
        <a href="#" class="link link-to-login">Login</a>
      </p>
    `;
    registerElement.insertAdjacentHTML("afterbegin", headingsHTML);
    registerElement.insertAdjacentElement(
      "beforeend",
      this.generateRegisterFormMarkup()
    );
    registerElement.insertAdjacentHTML("beforeend", linkHTML);

    return registerElement;
  }
}

export default new RegisterView();
