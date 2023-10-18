import { LightningElement } from "lwc";

export default class Example extends LightningElement {
    min;
    max;
    left;
    right;
    step = 5 * 60 * 1000; // 5 min

    get props() {
        return {
            min: this.min,
            max: this.max,
            left: this.left,
            right: this.right,
            step: this.step
        };
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
        console.log("%c LEFT ", "background: #943126; color: #fff;", this.left);

        this.right = event.detail.right;
        console.log("%c RIGHT ", "background: #0c598d; color: #fff;", this.right);
    }

    handleReset() {
        this.template.querySelector("c-range-slider")?.reset();
    }
}
