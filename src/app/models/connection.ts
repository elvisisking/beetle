export class Connection {

    keng__id: string;
    dv__jndiName: string;
    dv__driverName: string;
    props: Map< string, string >;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
