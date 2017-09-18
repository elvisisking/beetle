export class Connection {

  id = '1';
  tags = ['aTag', 'bTag'];
  description = 'a description';
    keng__id: string;
    dv__jndiName: string;
    dv__driverName: string;
    props: Map< string, string >;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
