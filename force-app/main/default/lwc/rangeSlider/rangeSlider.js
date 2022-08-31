import { LightningElement, api } from "lwc";

export default class RangeSlider extends LightningElement {
    /**
     * @type {number} 0 as default
     */
    @api min = 0;

    /**
     * @type {number} 100 as default
     */
    @api max = 100;

    /**
     * @type {number} 0 as default
     */
    @api left = 0;

    /**
     * @type {number} 100 as default
     */
    @api right = 100;

    /**
     * @type {number} 0 as default
     */
    @api step = 0;

    /**
     * @type {boolean} false as default
     */
    @api allowZeroRange = false;

    /**
     * @type {number}
     */
    _left;

    /**
     * @type {number}
     */
    _right;

    get inputLeft() {
        return this.template.querySelector(".input-left");
    }
    get inputRight() {
        return this.template.querySelector(".input-right");
    }
    get thumbLeft() {
        return this.template.querySelector(".thumb.left");
    }
    get thumbRight() {
        return this.template.querySelector(".thumb.right");
    }
    get range() {
        return this.template.querySelector(".range");
    }

    connectedCallback() {
        [this._left, this._right] = [Number(this.left), Number(this.right)];
    }

    handleInputLeft(event) {
        const leftVal = parseInt(event.target.value, 10);
        const maxVal = parseInt(this.allowZeroRange ? this._right : this._right - Number(this.step), 10);

        this.setLeft(Math.min(leftVal, maxVal));
    }

    handleInputRight(event) {
        const rightVal = parseInt(event.target.value, 10);
        const minVal = parseInt(this.allowZeroRange ? this._left : this._left + Number(this.step), 10);

        this.setRight(Math.max(rightVal, minVal));
    }

    /**
     * @param {number} value
     */
    @api setLeft(value) {
        const valToNum = Number(value);

        this._left = valToNum;
        this.moveLeftThumb(valToNum, parseInt(this.min, 10), parseInt(this.max, 10));

        this.dispatchInput();
    }

    /**
     * @param {number} value
     */
    @api setRight(value) {
        const valToNum = Number(value);

        this._right = valToNum;
        this.moveRightThumb(valToNum, parseInt(this.min, 10), parseInt(this.max, 10));

        this.dispatchInput();
    }

    /**
     * @param {number} value
     * @param {number} min
     * @param {number} max
     */
    moveLeftThumb(value, min, max) {
        const percent = ((value - min) / (max - min)) * 100;
        this.thumbLeft.style.left = percent + "%";
        this.range.style.left = percent + "%";
    }

    /**
     * @param {number} value
     * @param {number} min
     * @param {number} max
     */
    moveRightThumb(value, min, max) {
        const percent = ((value - min) / (max - min)) * 100;
        this.thumbRight.style.right = 100 - percent + "%";
        this.range.style.right = 100 - percent + "%";
    }

    dispatchInput() {
        this.dispatchEvent(
            new CustomEvent("sliderinput", {
                detail: { left: this._left, right: this._right }
            })
        );
    }
}
