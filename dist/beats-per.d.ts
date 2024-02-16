import { LitElement, PropertyValueMap } from 'lit';
/**
 * @tag beats-per
 * @summary Calculate the beats per minute through interaction.
 */
export default class BeatsPer extends LitElement {
    /**
     * Amount of time in milliseconds to wait between taps before restarting the count.
     *
     * @example
     * ```html
     * <beats-per timelimit="3000"></beats-per>
     * ```
     */
    timeLimit: number;
    /** Number of taps in current session. */
    count: number;
    /** MS of the current tap. */
    msCurrent: number;
    /** MS of the previous tap. */
    msPrevious: number;
    /** Average number of beats per minute, not rounded. */
    bpmAvg: number;
    /** Average number of beats rounded to the nearest integer. */
    get bpm(): number;
    /** Slotted button to trigger the counting. */
    get buttonElement(): HTMLButtonElement | null;
    /** Element to keep track of the BPM. */
    get bpmElement(): Element | null;
    /** Element to keep track of the click count. */
    get countElement(): Element | null;
    /** Reset the count when the time limit has been reached. */
    resetCount(): void;
    /** Calculates the BPM on click. */
    handleClick: () => void;
    /** Updates the element that holds the count. */
    updateCount(): void;
    /** Updates the element that holds the BPM count. */
    updateBPM(): void;
    connectedCallback(): void;
    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=beats-per.d.ts.map