import { LitElement, html, TemplateResult } from 'lit'
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
	 * <beats-per timelimit="3000" buttontext="Press"></beats-per>
	 * ```
	 */
	@property()
	timeLimit = 2000

	/** Text to use for the button. */
	@property()
	buttonText = 'Tap'

	/** Number of taps in current session. */
	@state()
	count = 0

	/** MS of the current tap. */
	@state()
	msCurrent = 0

	/** MS of the previous tap. */
	@state()
	msPrevious = 0

	/** Average number of beats per minute, not rounded. */
	@state()
	bpmAvg = 0

	/** Average number of beats rounded to the nearest integer. */
	get bpm() {
		return Math.round(this.bpmAvg)
	}

	// Don't create a shadow root
	protected createRenderRoot(): Element | ShadowRoot {
		return this
	}

	/** Reset the count when the time limit has been reached. */
	resetCount() {
		this.count = 0
	}

	/** Calculates the BPM on click. */
	handleClick() {
		const ms = new Date().getTime()
		if (ms - this.msPrevious > this.timeLimit) this.resetCount()
		if (this.count === 0) {
			this.msCurrent = ms
			this.count++
		} else {
			this.bpmAvg = (60000 * this.count) / (ms - this.msCurrent)
			this.count++
		}

		this.msPrevious = ms
	}

	render(): TemplateResult {
		return html`
			<p>BPM: <output>${this.bpm}</output></p>
			<p>Count: <output>${this.count}</output></p>
			<button @click=${this.handleClick}>${this.buttonText}</button>
		`
	}
}
