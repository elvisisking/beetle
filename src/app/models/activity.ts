export class Activity {

  private keng__id: string;
  private dv__sourceConnection: string;
  private dv__targetConnection: string;

  /**
   * @param {Object} json the JSON representation of a Activity
   * @returns {Activity} the new Activity (never null)
   */
  public static create( json: Object = {} ) {
    const conn = new Activity();
    conn.setValues( json );
    return conn;
  }

  constructor() {
    // nothing to do
  }

  /**
   * @returns {string} the activity identifier (can be null)
   */
  public getId(): string {
    return this.keng__id;
  }

  /**
   * @returns {string} the source connection name (can be null)
   */
  public getSourceConnection(): string {
    return this.dv__sourceConnection;
  }

  /**
   * @returns {string} the target connection name (can be null)
   */
  public getTargetConnection(): string {
    return this.dv__targetConnection;
  }

  /**
   * @param {string} id the activity identifier (optional)
   */
  public setId( id?: string ): void {
    this.keng__id = id ? id : null;
  }

  /**
   * @param {string} sourceConnection the source connection (optional)
   */
  public setSourceConnection( sourceConnection?: string ): void {
    this.dv__sourceConnection = sourceConnection ? sourceConnection : null;
  }

  /**
   * @param {string} targetConnection the target connection (optional)
   */
  public setTargetConnection( targetConnection?: string ): void {
    this.dv__targetConnection = targetConnection ? targetConnection : null;
  }

  /**
   * Set all object values using the supplied Activity json
   * @param {Object} values
   */
  public setValues(values: Object = {}) {
    Object.assign(this, values);
  }
}
