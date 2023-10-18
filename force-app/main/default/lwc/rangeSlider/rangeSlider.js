import { LightningElement, api } from "lwc";

export default class RangeSlider extends LightningElement {
    /**
     * @type {number}
     * @default 0
     */
    @api min = 0;

    /**
     * @type {number}
     * @default 100
     */
    @api max = 100;

    /**
     * @type {number}
     * @default 0
     */
    @api step = 0;

    /**
     * @type {number}
     * @default 0
     */
    @api set left(value) {
        if (!value) return;
        this._left = Number(value);
    }

    get left() {
        return this._left;
    }

    _left = 0;

    /**
     * @type {number}
     * @default 100
     */
    @api set right(value) {
        if (!value) return;
        this._right = Number(value);
    }

    get right() {
        return this._right;
    }

    _right = 100;

    /**
     * @type {boolean} false as default
     * @deafult false
     */
    @api set allowZeroRange(value) {
        this._allowZeroRange = value === true || value === "true";
    }

    get allowZeroRange() {
        return this._allowZeroRange;
    }

    _allowZeroRange = false;

    /**
     * @param {number} value
     */
    @api setLeft(value) {
        const valToNum = Number(value);

        this._left = valToNum;
        this.moveLeftThumb(valToNum);

        this.dispatchInput();
    }

    /**
     * @param {number} value
     */
    @api setRight(value) {
        const valToNum = Number(value);

        this._right = valToNum;
        this.moveRightThumb(valToNum);

        this.dispatchInput();
    }

    /**
     * Reset values as default min, max
     */
    @api reset() {
        this.setLeft(this.min);
        this.setRight(this.max);
    }

    handleInputLeft(event) {
        const leftVal = parseInt(event.target.value, 10);
        const maxVal = parseInt(this.allowZeroRange ? this.right : this.right - Number(this.step), 10);

        this.setLeft(Math.min(leftVal, maxVal));
    }

    handleInputRight(event) {
        const rightVal = parseInt(event.target.value, 10);
        const minVal = parseInt(this.allowZeroRange ? this.left : this.left + Number(this.step), 10);

        this.setRight(Math.max(rightVal, minVal));
    }

    /**
     * @param {number} value
     */
    moveLeftThumb(value) {
        const percent = ((value - this.min) / (this.max - this.min)) * 100;
        this.refs.thumbLeft.style.left = percent + "%";
        this.refs.range.style.left = percent + "%";
    }

    /**
     * @param {number} value
     */
    moveRightThumb(value) {
        const percent = ((value - this.min) / (this.max - this.min)) * 100;
        this.refs.thumbRight.style.right = 100 - percent + "%";
        this.refs.range.style.right = 100 - percent + "%";
    }

    dispatchInput() {
        this.dispatchEvent(
            new CustomEvent("sliderinput", {
                detail: { left: this.left, right: this.right }
            })
        );
    }
}
