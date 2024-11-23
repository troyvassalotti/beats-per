import { LitElement, type PropertyValueMap } from 'lit';
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
    private count;
    /** MS of the current tap. */
    private msCurrent;
    /** MS of the previous tap. */
    private msPrevious;
    /** Average number of beats per minute, not rounded. */
    private bpmAvg;
    /** Average number of beats rounded to the nearest integer. */
    private get bpm();
    /** Slotted button to trigger the counting. */
    private get buttonElement();
    /** Element to keep track of the BPM. */
    private get bpmElement();
    /** Element to keep track of the click count. */
    private get countElement();
    /** Reset the count when the time limit has been reached. */
    private resetCount;
    /** Calculates the BPM on click. */
    private handleClick;
    /** Updates the element that holds the count. */
    private updateCount;
    /** Updates the element that holds the BPM count. */
    private updateBPM;
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=beats-per.d.ts.map