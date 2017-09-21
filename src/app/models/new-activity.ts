import { NewConnection } from './new-connection';

export class NewActivity {

  name: string;
  sourceConnection: NewConnection = new NewConnection();
  targetConnection: NewConnection = new NewConnection();

  /**
   * Constructor
   */
  constructor() {
  }

  setSourceConnection( srcConn: NewConnection ): boolean {
    this.sourceConnection = srcConn;
    return true;
  }

  setTargetConnection( tgtConn: NewConnection ): boolean {
    this.targetConnection = tgtConn;
    return true;
  }

  // overrides toJSON - we do not want the name supplied in the json body.
  public toJSON() {
    return {
      sourceConnection: this.sourceConnection,
      targetConnection: this.targetConnection
    };
  }
}
