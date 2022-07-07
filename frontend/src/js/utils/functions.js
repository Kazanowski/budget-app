export const createElement = ({
  tagName = "div",
  classNames = [],
  attributes = [],
  properties = [],
}) => {
  const element = document.createElement(tagName);

  if (classNames.length > 0) element.classList.add(...classNames);

  if (attributes.length > 0) {
    attributes.forEach(({ name, value }) => {
      element.setAttribute(name, value);
    });
  }

  if (properties.length > 0) {
    properties.forEach(({ name, value }) => {
      element[name] = value;
    });
  }

  return element;
};

export const amountFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatDateForInputField = (date) => {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", {
    month: "2-digit",
  });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  return `${year}-${month}-${day}`;
};

export const dateFormat = (date) => {
  const weekday = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${weekday} ${day} ${month} ${year}`;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month - 1, 0).getDate();
};
