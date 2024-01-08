export class Notification {
    constructor({ textNotification }) {
        this.text = textNotification;
        this.container = this.getTemplateContainer();
        this.addToDOMAfterDelay();
        this.addCloseButtonHandler()
    }
    getTemplateContainer() {
        const template = document.createElement("div");
        template.classList.add("notification");
        template.innerHTML = `
           <span class="notification-title">${this.text}</span>
           <button class="notification-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 5.875L14.125 5L10 9.125L5.875 5L5 5.875L9.125 10L5 14.125L5.875 15L10 10.875L14.125 15L15 14.125L10.875 10L15 5.875Z" fill="white"/>
            </svg>
          </button>
        `;

        return template;
    }
    /**
     * Добавляет уведомление в DOM с небольшой задержкой.
     */
    addToDOMAfterDelay() {
        // Замедление в 0.5 секунды перед добавлением в DOM
        setTimeout(() => {
            document.body.appendChild(this.container);

            // Автоматическое закрытие через 2 секунды
            setTimeout(() => {
                this.closeNotification();
            }, 2000);
        }, 1000);
    }

    /**
     * Добавляет обработчик на кнопку закрытия уведомления.
     */
    addCloseButtonHandler() {
        const closeButton = this.container.querySelector(
            ".notification-button",
        );
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                this.closeNotification();
            });
        }
    }

    /**
     * Закрывает уведомление и удаляет его из DOM.
     */
    closeNotification() {
        if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}
