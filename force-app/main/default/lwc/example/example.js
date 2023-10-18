import { LightningElement } from "lwc";

export default class Example extends LightningElement {
    min;
    max;
    left;
    right;

    get props() {
        return {
            min: this.min,
            max: this.max,
            step: 60 * 60 * 1000, // 5 min
            allowZeroRange: false
        };
    }

    connectedCallback() {
        this.setDefault();
    }

    setDefault() {
        const today = new Date();

        this.min = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).valueOf();
        this.max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0).valueOf();

        [this.left, this.right] = [this.min, this.max];
    }

    handleInput(event) {
        this.left = event.detail.left;
        this.right = event.detail.right;
    }

    handleReset() {
        this.refs.slider?.reset();
    }
}
