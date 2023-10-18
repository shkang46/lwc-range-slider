/* --------------------------------------------------------------------------------------------------------
* Import
-------------------------------------------------------------------------------------------------------- */
import { LightningElement, api } from "lwc";

export default class RangeSlider extends LightningElement {
    /* --------------------------------------------------------------------------------------------------------
	* Public Property
	-------------------------------------------------------------------------------------------------------- */
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
     * @type {number} 1 as default
     */
    @api step = 1;

    /**
     * @type {boolean} false as default
     * @deafult false
     */
    @api set allowZeroRange(v) {
        this._allowZeroRange = this.allowZeroRange === true || this.allowZeroRange === "true";
    }
    get allowZeroRange() {
        return this._allowZeroRange;
    }
    _allowZeroRange = false;

    /**
     * @param {number} value
     */
    @api setLeft(left) {
        const valToNum = Number(left);

        this._left = valToNum;
        this.refs.inputLeft.left = valToNum;

        this.moveLeftThumb(valToNum);

        this.dispatchInput();
    }

    /**
     * @param {number} value
     */
    @api setRight(right) {
        const valToNum = Number(right);

        this.right = valToNum;
        this.refs.inputRight.right = valToNum;

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

    /* --------------------------------------------------------------------------------------------------------
	* Private Property
	-------------------------------------------------------------------------------------------------------- */
    /**
     * @type {number} min as default
     */
    set left(v) {
        this._left = Number(v);
    }
    get left() {
        return this._left || this.min;
    }
    _left;

    /**
     * @type {number} max as default
     */
    set right(v) {
        this._right = Number(v);
    }
    get right() {
        return this._right || this.max;
    }
    _right;

    /* --------------------------------------------------------------------------------------------------------
	* Flag
	-------------------------------------------------------------------------------------------------------- */
    isRendered = false;

    /* --------------------------------------------------------------------------------------------------------
	* Lifecycle Hook
	-------------------------------------------------------------------------------------------------------- */
    renderedCallback() {
        if (this.isRendered) return;
        this.isRendered = true;

        this.initSliders();
    }

    /* --------------------------------------------------------------------------------------------------------
	* Event Handler
	-------------------------------------------------------------------------------------------------------- */
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

    /* --------------------------------------------------------------------------------------------------------
	* Logic Method
	-------------------------------------------------------------------------------------------------------- */
    initSliders() {
        this.refs.inputLeft.value = this.left;
        this.refs.inputRight.value = this.right;
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
