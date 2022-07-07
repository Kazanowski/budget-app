class View {
  render(data = {}, render = true) {
    this.data = data;
    this.parentElement = document.querySelector(this.parentSelector);

    const markup = this.generateMarkup();
    if (!render) return markup;

    this.clear();

    if (markup === null) return;

    typeof markup === "string"
      ? (this.parentElement.innerHTML = markup)
      : this.parentElement.appendChild(markup);
  }
  clear() {
    this.parentElement.innerHTML = "";
  }
}

export default View;
