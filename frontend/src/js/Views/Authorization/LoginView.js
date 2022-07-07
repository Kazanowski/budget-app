import View from "./../View";
import InputField from "../../components/InputField/InputField";
import InputFieldPassword from "../../components/InputField/InputFieldPassword";
import { createElement } from "../../utils/functions";
import { regexp } from "./../../config";

class LoginView extends View {
  parentSelector = `.authorization`;
  loginForm = createElement({
    tagName: "form",
    attributes: [
      { name: "id", value: "login-form" },
      { name: "novalidate", value: true },
    ],
  });
  inputEmail;
  inputPassword;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerLogin(handler) {
    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(
        this.inputEmail.validation(),
        this.inputPassword.validation()
      );
      if (this.inputEmail.validation() && this.inputPassword.validation()) {
        handler(this.inputEmail.value, this.inputPassword.value);
        this.clearForm();
      } else {
        this.inputEmail.validation();
        this.inputPassword.validation();
      }
    });
  }

  clearForm() {
    this.inputEmail.value = "";
    this.inputPassword.value = "";
  }

  generateLoginFormMarkup() {
    this.loginForm.innerHTML = "";
    this.inputEmail = new InputField({
      type: "email",
      label: "E-mail",
      id: "login-email",
      isRequired: true,
      regexp: regexp.email,
    });
    this.inputPassword = new InputFieldPassword({
      label: "Password",
      id: "login-password",
      isRequired: true,
      isToggle: true,
    });
    const html = `<button type="submit" class="btn btn-login">Login</button>`;
    this.loginForm.append(
      this.inputEmail.render(),
      this.inputPassword.render()
    );
    this.loginForm.insertAdjacentHTML("beforeend", html);

    return this.loginForm;
  }

  generateMarkup() {
    const loginElement = createElement({ classNames: ["login"] });
    const headingsHTML = `
      <h2>Welcome back</h2>
      <p class="p--large">Login to your account</p>
    `;
    const linkHTML = `
      <p class="p--small">
        Don't have an account?
        <a href="#" class="link link-to-register">Register</a>
      </p>
    `;

    loginElement.insertAdjacentHTML("afterbegin", headingsHTML);
    loginElement.insertAdjacentElement(
      "beforeend",
      this.generateLoginFormMarkup()
    );
    loginElement.insertAdjacentHTML("beforeend", linkHTML);

    return loginElement;
  }
}

export default new LoginView();
