export class Connection {

    name: string;
    jndiName: string;
    driverName: string;
    props: Map< string, string >;

    constructor( name: string,
                 jndiName: string,
                 driverName: string,
                 props = new Map< string, string >() ) {
        this.name = name;
        this.jndiName = jndiName;
        this.driverName = driverName;
        this.props = props;
    }

}
