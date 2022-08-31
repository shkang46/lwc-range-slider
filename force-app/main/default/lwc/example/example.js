import { LightningElement } from "lwc";
import LANG from "@salesforce/i18n/lang";

const OPTION_FOR_TIME = {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};

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

    get startTime() {
        return new Date(this.left).toLocaleString(LANG, OPTION_FOR_TIME);
    }

    get endTime() {
        return new Date(this.right).toLocaleString(LANG, OPTION_FOR_TIME);
    }

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
        const slider = this.template.querySelector("c-range-slider");

        slider.setLeft(this.min);
        slider.setRight(this.max);
    }
}
