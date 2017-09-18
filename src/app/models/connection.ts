export class Connection {

  keng__id: string;
  dv__jndiName: string;
  dv__driverName: string;
  keng__properties: Map< string, string >;

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
