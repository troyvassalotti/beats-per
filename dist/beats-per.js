var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
/**
 * @tag beats-per
 * @summary Calculate the beats per minute through interaction.
 */
let BeatsPer = class BeatsPer extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Amount of time in milliseconds to wait between taps before restarting the count.
         *
         * @example
         * ```html
         * <beats-per timelimit="3000"></beats-per>
         * ```
         */
        this.timeLimit = 2000;
        /** Number of taps in current session. */
        this.count = 0;
        /** MS of the current tap. */
        this.msCurrent = 0;
        /** MS of the previous tap. */
        this.msPrevious = 0;
        /** Average number of beats per minute, not rounded. */
        this.bpmAvg = 0;
        /** Calculates the BPM on click. */
        this.handleClick = () => {
            const ms = new Date().getTime();
            if (ms - this.msPrevious > this.timeLimit)
                this.resetCount();
            if (this.count === 0) {
                this.bpmAvg = 0;
                this.msCurrent = ms;
                this.count++;
            }
            else {
                this.bpmAvg = (60000 * this.count) / (ms - this.msCurrent);
                this.count++;
            }
            this.msPrevious = ms;
        };
    }
    /** Average number of beats rounded to the nearest integer. */
    get bpm() {
        return Math.round(this.bpmAvg);
    }
    /** Slotted button to trigger the counting. */
    get buttonElement() {
        return this.querySelector('[data-bp-button]');
    }
    /** Element to keep track of the BPM. */
    get bpmElement() {
        return this.querySelector('[data-bp-bpm]');
    }
    /** Element to keep track of the click count. */
    get countElement() {
        return this.querySelector('[data-bp-count]');
    }
    /** Reset the count when the time limit has been reached. */
    resetCount() {
        this.count = 0;
    }
    /** Updates the element that holds the count. */
    updateCount() {
        if (this.countElement) {
            this.countElement.textContent = this.count.toString();
        }
    }
    /** Updates the element that holds the BPM count. */
    updateBPM() {
        if (this.bpmElement) {
            this.bpmElement.textContent = this.bpm.toString();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.buttonElement?.addEventListener('click', this.handleClick);
    }
    // Uses updated since these methods update external elements
    updated(changedProperties) {
        if (changedProperties.has('count')) {
            this.updateCount();
        }
        if (changedProperties.has('bpmAvg')) {
            this.updateBPM();
        }
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    property({ type: Number })
], BeatsPer.prototype, "timeLimit", void 0);
__decorate([
    state()
], BeatsPer.prototype, "count", void 0);
__decorate([
    state()
], BeatsPer.prototype, "msCurrent", void 0);
__decorate([
    state()
], BeatsPer.prototype, "msPrevious", void 0);
__decorate([
    state()
], BeatsPer.prototype, "bpmAvg", void 0);
BeatsPer = __decorate([
    customElement('beats-per')
], BeatsPer);
export default BeatsPer;
//# sourceMappingURL=beats-per.js.map