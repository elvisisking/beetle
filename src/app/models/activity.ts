export class Activity {

  keng__id: string;
  dv__sourceConnection: string;
  dv__targetConnection: string;

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Set all object values using the supplied Connection json
   * @param {Object} values
   */
  public setValues(values: Object = {}) {
    Object.assign(this, values);
  }
}
