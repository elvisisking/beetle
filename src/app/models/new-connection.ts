export class NewConnection {

  name: string;
  jndiName: string;
  driverName: string;
  jdbc: boolean;
  parameters: Map< string, string >;

  /**
   * Constructor
   */
  constructor() {
  }

  // overrides toJSON - we do not want the name supplied in the json body.
  public toJSON() {
    return {
      jndiName: this.jndiName,
      driverName: this.driverName,
      jdbc: this.jdbc,
      parameters: this.parameters
    };
  }
}
