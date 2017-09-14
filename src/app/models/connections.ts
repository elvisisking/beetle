import { Connection } from './connection';

export class Connections {

    private items: Array< Connection >;

    add( connToAdd: Connection ): boolean {
        const index = this.items.findIndex( conn => conn.keng__id === connToAdd.keng__id );

        if ( index !== -1 ) {
            return false;
        }

        this.items.push( connToAdd );
        return true;
    }

    get(): IterableIterator< Connection > {
        return this.items.values();
    }

    remove( connectionName: string ): boolean {
        let found: boolean;

        this.items = this.items.filter( ( conn ) => {
            // already found
            if ( found ) {
                return true; // keep current connection
            }

            // found
            if ( conn.keng__id === connectionName ) {
                found = true;
                return false; // remove connection
            }

            return true; // keep current connection
        });

        return found;
    }

    sorted(): Array< Connection > {
        return this.items.sort( ( thisConn, thatConn ): number => {
            return thisConn.keng__id.localeCompare( thatConn.keng__id );
        });
    }

}
