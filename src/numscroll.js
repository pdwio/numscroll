/**
 * @author Pim de Wit <https://pdw.io>
 * @license {@link https://github.com/pimdewit/pdw.numscroll/blob/master/LICENSE|MIT License}
 *
 * @class NumScroll
 * @classdesc A small utility class for animating through numbers.
 */
class NumScroll {
  /**
   * Constants related to this class in order to prevent magic
   *
   * @memberOf {NumScroll}
   * @since 0.0.1
   * @public
   * @static
   * @readonly
   *
   * @returns {object}
   */
  static CONSTANTS() {
    return {
      CSS_CLASS: {
        GROUP: 'numscroll__number-group',
        NUMBER: 'numscroll__number',
        ACTIVE: 'numscroll__number--next',
        PREVIOUS: 'numscroll__number--previous',
        NEXT: 'numscroll__number--next',
      },
    }
  }

  /**
   * Transform (CSS) an element.
   *
   * @memberOf NumScroll
   * @since 0.0.1
   * @static
   * @public
   *
   * @param {HTMLElement} element The element to transform.
   * @param {string} value CSS Transform property value.
   */
  static transform(element, value) {
    if (element) element.style.transform = value;
  }

  /**
   * Create DOM elements containing the number 0 to 9.
   *
   * @memberOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @returns {HTMLDivElement}
   */
  static createNumberGroupDOM() {
    const element = document.createElement('div');
    element.classList.add(NumScroll.CONSTANTS().CSS_CLASS.GROUP);

    let numberIterator = 0;
    for (numberIterator; numberIterator <= 9; numberIterator += 1) {
      const numberElement = document.createElement('div');
      numberElement.classList.add(NumScroll.CONSTANTS().CSS_CLASS.NUMBER);
      numberElement.textContent = numberIterator.toString();

      element.appendChild(numberElement);
    }

    return element;
  }

  /**
   * Create DOM elements containing the number 0 to 9.
   *
   * @memberOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @param {number} height The height of a single number. This should always be the same.
   * @param {number} multiplier The transform multiplier
   * @returns {number}
   */
  static _getNumberOffset(height, multiplier) {
    return height * multiplier;
  }

  /**
   * Create DOM elements containing the number 0 to 9.
   *
   * @memberOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @param {number} from The number to interpolate from.
   * @param {number} to The number to interpolate to.
   * @param {number} amount The speed inb which the number is interpolating towards the new number.
   * @returns {number}
   */
  static mix(from, to, amount) {
    return from + (to - from) * amount;
  }

  /**
   * @constructs NumScroll
   * @since 0.0.1
   * @constructor
   *
   * @param {HTMLElement} container The containing element.
   */
  constructor(container, opt_initialValue = 1000) {
    /**
     * Collection of DOM elements related to this instance.
     *
     * @since 0.0.1
     * @type {object}
     * @property {HTMLElement} container The containing element.
     * @property {array<HTMLDivElement>} groups The graphical element to sequence.
     */
    this.elements = {
      container: container,
      groups: []
    };

    /**
     * The value to display.
     *
     * @since 0.0.1
     * @type {number}
     * @private
     */
    this._value = opt_initialValue;

    /**
     * The length of the number.
     *
     * @since 0.0.1
     * @type {number}
     * @private
     */
    this._range = opt_initialValue.toString().length;

    /**
     * The height of a number.
     *
     * @since 0.0.1
     * @type {number}
     * @private
     * @default 0
     */
    this._numberHeight = 0;

    this._createDOM(container);

    this.numberHeight = this.elements.groups[0].children[0].offsetHeight;

    this.elements.container.style.height = `${this.numberHeight}px`;

    NumScroll.transform(this.elements.groups[0], `translateY(-15px)`);
  }

  /**
   * Set the value of the numscroll.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @param {number} number
   */
  set value(number) {
    this._value = number;
  }

  /**
   * Get the height of a single number of one of the groups.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @returns {number} number
   */
  get numberHeight() {
    return this._numberHeight;
  }

  set numberHeight(height) {
    this._numberHeight = `${height}`;
  }

  /**
   * The height of a single number of one of the groups.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @returns {array}
   */
  _getNumberArray() {
    return `${this._value}`.split('');
  }

  /**
   * Create the dom needed for this instance.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @private
   *
   * @param {HTMLDivElement} parent
   */
  _createDOM(parent) {
    let groupIterator = 0;

    for (groupIterator; groupIterator < this._range; groupIterator += 1) {
      const group = NumScroll.createNumberGroupDOM();

      this.elements.groups.push(group);

      parent.appendChild(group);
    }
  }

  /**
   * Calculate the transform value based on the index of the current number.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @private
   *
   * @returns {number} number
   */
  _applyTransforms(number) {
    number.forEach((n, index) => {
      const element = this.elements.groups[index];
      const offset = NumScroll._getNumberOffset(this._numberHeight, n);

      NumScroll.transform(element, `translateY(-${offset}px)`);
    });
  }

  /**
   * Interpolate a number to a specific value.
   *
   * @methodOf NumScroll
   * @since 0.0.1
   * @public
   *
   * @returns {number} number
   */
  lerpTo(number) {
    this._value = number;
    const val = this._getNumberArray();


    this._applyTransforms(val);
  }
}

