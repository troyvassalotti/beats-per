import { LitElement, type PropertyValueMap, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

/**
 * @tag beats-per
 * @summary Calculate the beats per minute through interaction.
 */
@customElement('beats-per')
export default class BeatsPer extends LitElement {
	/**
	 * Amount of time in milliseconds to wait between taps before restarting the count.
	 *
	 * @example
	 * ```html
	 * <beats-per timelimit="3000"></beats-per>
	 * ```
	 */
	@property({ type: Number })
	public timeLimit: number = 2000

	/** Number of taps in current session. */
	@state()
	private count: number = 0

	/** MS of the current tap. */
	@state()
	private msCurrent: number = 0

	/** MS of the previous tap. */
	@state()
	private msPrevious: number = 0

	/** Average number of beats per minute, not rounded. */
	@state()
	private bpmAvg: number = 0

	/** Average number of beats rounded to the nearest integer. */
	private get bpm(): number {
		return Math.round(this.bpmAvg)
	}

	/** Slotted button to trigger the counting. */
	private get buttonElement(): HTMLButtonElement | null {
		return this.querySelector('[data-bp-button]')
	}

	/** Element to keep track of the BPM. */
	private get bpmElement(): Element | null {
		return this.querySelector('[data-bp-bpm]')
	}

	/** Element to keep track of the click count. */
	private get countElement(): Element | null {
		return this.querySelector('[data-bp-count]')
	}

	/** Reset the count when the time limit has been reached. */
	private resetCount(): void {
		this.count = 0
	}

	/** Calculates the BPM on click. */
	private handleClick: () => void = (): void => {
		const ms = new Date().getTime()

		if (ms - this.msPrevious > this.timeLimit) this.resetCount()

		if (this.count === 0) {
			this.bpmAvg = 0
			this.msCurrent = ms
			this.count++
		} else {
			this.bpmAvg = (60000 * this.count) / (ms - this.msCurrent)
			this.count++
		}

		this.msPrevious = ms
	}

	/** Updates the element that holds the count. */
	private updateCount(): void {
		if (this.countElement) {
			this.countElement.textContent = this.count.toString()
		}
	}

	/** Updates the element that holds the BPM count. */
	private updateBPM(): void {
		if (this.bpmElement) {
			this.bpmElement.textContent = this.bpm.toString()
		}
	}

	override connectedCallback(): void {
		super.connectedCallback()

		this.buttonElement?.addEventListener('click', this.handleClick)
	}

	// Uses updated since these methods update external elements
	protected override updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		if (changedProperties.has('count')) {
			this.updateCount()
		}

		if (changedProperties.has('bpmAvg')) {
			this.updateBPM()
		}
	}

	protected render() {
		return html`<slot></slot>`
	}
}
