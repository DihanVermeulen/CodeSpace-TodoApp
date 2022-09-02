export class BaseComponent extends HTMLElement {
    LIST_OF_COMMON_ATTR_CLASHES = ["class", "id", "title"];
    constructor(attrHandlers = {}, eventHandlers = {}) {
        super();

        eventHandlers.forEach(eventName => {
            if (!this.handler) throw new Error('"handler" method is required');
            this.addEventListener(eventName, this.handler);
        });

        this.data = {};
        const keyList = Object.keys(attrHandlers);

        keyList.forEach(key => {
            if (LIST_OF_COMMON_ATTR_CLASHES.includes(key)) {
                throw new Error(
                    `"${key}" clashes with existing HTML element attibute`
                );
            }

            const attrValue = this.getAttribute(key);
            const value = attrHandlers[key](attrValue);

            this.data = {
                ...this.data,
                [key] : value
            };
        });
    };
};

export default BaseComponent;
