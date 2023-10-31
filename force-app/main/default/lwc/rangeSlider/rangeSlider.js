/**
 * @module RangeSlider
 * @extends LightningElement
 * @description Range Slider
 * @author shkang <shkang7291@naver.com>
 *
 * @example
 <c-range-slider
	lwc:ref="slider"
	min="0"
	max="100"
	step="1"
	allow-zero-range
	onsliderinput={handleSliderInputChange}
></c-range-slider>
 */
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
        this._allowZeroRange = v === true || v === "true";
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

        this.left = valToNum;
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
        this.isRendered ||= (this.initSliders(), true);
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

    /**
     * @fires module:RangeSlider~sliderinput
     */
    dispatchInput() {
        /**
         * @event module:RangeSlider~sliderinput
         * @type {Object}
         * @property {Object} detail
         * @property {number} detail.left
         * @property {number} detail.right
         */
        this.dispatchEvent(
            new CustomEvent("sliderinput", {
                detail: { left: this.left, right: this.right }
            })
        );
    }
}
