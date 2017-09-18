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

  // hijack the toJSON method and overwrite the
  // data that is sent back to the server
  public toJSON() {
    return {
      jndiName: this.jndiName,
      driverName: this.driverName,
      jdbc: this.jdbc,
      parameters: this.parameters
    };
  }
}
