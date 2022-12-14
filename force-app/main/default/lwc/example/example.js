import { LightningElement } from "lwc";

export default class Example extends LightningElement {
    /**
     * @type {number}
     */
    min;

    /**
     * @type {number}
     */
    max;

    /**
     * @type {number}
     */
    left;

    /**
     * @type {number}
     */
    right;

    /**
     * @type {number}
     */
    step = 5 * 60 * 1000; // 5 min

    connectedCallback() {
        this.setDefault();
    }

    setDefault() {
        const today = new Date();

        const min = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).valueOf();
        const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0).valueOf();

        [this.min, this.max] = [min, max];
        [this.left, this.right] = [min, max];
    }

    handleInput(event) {
        this.left = event.detail.left;
        this.right = event.detail.right;
    }

    handleReset() {
        this.template.querySelector("c-range-slider")?.reset();
    }
}
