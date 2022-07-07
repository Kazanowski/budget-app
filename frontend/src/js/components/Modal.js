import { createElement } from "../utils/functions";

class Modal {
  parentElement = document.querySelector("body");
  handlerAccept;
  handlerExit;

  constructor() {
    this.parentElement.addEventListener("click", (e) => {
      const btnAccept = e.target.closest(".btn-accept-modal");
      const btnClose = e.target.closest(".btn-close-modal");

      if (!btnAccept && !btnClose) return;
      e.preventDefault();

      if (btnAccept && this.handlerAccept) {
        this.handlerAccept();
      } else if (btnClose) {
        if (this.handlerExit) this.handlerExit();
        this.closeModal();
      }
    });
  }
  closeModal() {
    const modal = this.parentElement.querySelector(".modal");
    if (modal) modal.remove();
    this.parentElement.style.overflow = "";
  }

  generateHeader(title) {
    return `
            <div class="modal__header">
                <h3 class="modal__title">${title}</h3>
            </div>
        `;
  }

  generateBody(content) {
    const modalBodyEl = createElement({ classNames: ["modal__body"] });
    if (typeof content === "string") {
      modalBodyEl.insertAdjacentHTML("afterbegin", content);
    } else {
      modalBodyEl.insertAdjacentElement("afterbegin", content);
    }
    return modalBodyEl;
  }

  generateFooter(
    btnAccept = { value: "Accept", handler: undefined },
    btnClose = { value: "Close", handler: undefined }
  ) {
    this.handlerAccept = btnAccept.handler || null;
    this.handlerExit = btnClose.handler || null;
    return `
            <div class="modal__footer">
                <button class="btn btn--secondary btn-close-modal">${
                  btnClose.value
                }</button>
                ${
                  btnAccept.handler
                    ? `<button class="btn btn-accept-modal">${btnAccept.value}</button>`
                    : ""
                }
            </div>
        `;
  }

  generateModal(data) {
    const { title, content, btnAccept, btnClose } = data;
    const modalEl = createElement({ classNames: ["modal", "overlay"] });
    const modalContentEl = createElement({ classNames: ["modal__content"] });

    modalEl.addEventListener("click", (e) => {
      const overlay = e.target.classList.contains("overlay");
      if (overlay) {
        e.preventDefault();
        this.closeModal();
      }
    });

    modalContentEl.insertAdjacentHTML("beforeend", this.generateHeader(title));
    modalContentEl.insertAdjacentElement(
      "beforeend",
      this.generateBody(content)
    );

    modalContentEl.insertAdjacentHTML(
      "beforeend",
      this.generateFooter(btnAccept, btnClose)
    );

    modalEl.insertAdjacentElement("afterbegin", modalContentEl);

    return modalEl;
  }

  add(data) {
    this.parentElement.insertAdjacentElement(
      "afterbegin",
      this.generateModal(data)
    );
    this.parentElement.style.overflow = "hidden";
  }
}

export default new Modal();
