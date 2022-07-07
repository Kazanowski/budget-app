import { createElement } from "./../utils/functions";
import { closeIcon } from "./../utils/icons";

class Notification {
  parentElement = document.querySelector('body');
  TIME_OUT_MS = 5000;


  handlerClose(notificationItem){
    setTimeout(() => {
      if (notificationItem) this.delete(notificationItem);
    }, this.TIME_OUT_MS);

    document.querySelector('.notification-list').addEventListener('click', e => {
      e.preventDefault();
      const btnClose = e.target.closest('.btn-close-notification');
      if(!btnClose) return;
      this.delete(btnClose.closest('.notification-list__item'));
    })
  }

  add(data){
    const notificationList = document.querySelector('.notification-list') 
      || createElement({tagName: 'ul', classNames: ['notification-list']});
    const notificationItem = this.generateNotificationItemMarkup(data);

    notificationList.insertAdjacentElement('beforeend', notificationItem);
    this.parentElement.insertAdjacentElement('afterbegin', notificationList);

    this.handlerClose(notificationItem);
  }

  generateNotificationItemMarkup(data){
    const {type, title, message} = data;
    const notificationItem = createElement({tagName: 'li', classNames: ['notification-list__item']});
    if(type) notificationItem.classList.add(`notification-list__item--${type}`);
    
    const html = `
      <div class="notification-list__content">
        <h4>${title}</h4>
        <p class="p--small">${message}</p>        
      </div>
      <button class="btn-icon btn-close-notification">${closeIcon}</button>
    `;
    notificationItem.insertAdjacentHTML('beforeend', html);

    return notificationItem;
  }

  delete(notificationItem) {
    if(!document.querySelector('.notification-list')) return;
    const notificationList = document.querySelector('.notification-list'); 
    notificationItem.remove();
    if(!notificationList.childElementCount) notificationList.remove();
  }
}

export default new Notification();
