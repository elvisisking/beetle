export class NewConnection {

  name: string;
  jndiName: string;
  driverName: string;
  jdbc: boolean;
  properties: Map< string, string > = new Map< string, string >();

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * @returns {string} the connection name (can be null)
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns {string} the connection jndi name (can be null)
   */
  public getJndiName(): string {
    return this.jndiName;
  }

  /**
   * @returns {string} the connection driver name (can be null)
   */
  public getDriverName(): string {
    return this.driverName;
  }

  /**
   * @returns {boolean} the jdbc status
   */
  public isJdbc(): boolean {
    return this.jdbc;
  }

  /**
   * @returns {Map<string, string>} the connection properties (never null)
   */
  public getProperties(): Map< string, string > {
    return this.properties;
  }

  /**
   * @param {string} name the connection name (optional)
   */
  public setName( name?: string ): void {
    this.name = name ? name : null;
  }

  /**
   * @param {string} jndiName the connection JNDI name (optional)
   */
  public setJndiName( jndiName?: string ): void {
    this.jndiName = jndiName ? jndiName : null;
  }

  /**
   * @param {string} driverName the connection driver name (optional)
   */
  public setDriverName( driverName?: string ): void {
    this.driverName = driverName ? driverName : null;
  }

  /**
   * @param {boolean} jdbc the jdbc status (optional)
   */
  public setJdbc( isJdbc?: boolean ): void {
    this.jdbc = isJdbc ? isJdbc : true;
  }

  /**
   * @param {Map<string, string>} props the connection properties (optional)
   */
  public setProperties( props?: Map< string, string > ): void {
    this.properties = props ? props : new Map< string, string >();
  }


  // overrides toJSON - we do not want the name supplied in the json body.
  public toJSON() {
    return {
      jndiName: this.jndiName,
      driverName: this.driverName,
      jdbc: this.jdbc,
      parameters: this.properties
    };
  }
}
