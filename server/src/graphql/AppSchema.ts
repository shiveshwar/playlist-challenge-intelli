import { GraphQLSchema } from 'graphql';

import RootQuery from './RootQuery';
import MutationQuery from './MutationQuery';
import QueryMaps from './QueryMaps';


import ObjectFactory from '../util/ObjectFactory';

class AppSchema {

    private queryMaps;
    private schema;

    constructor(objectFactory: ObjectFactory){
        this.queryMaps = new QueryMaps(objectFactory);
        this.schema = new GraphQLSchema({
            query: new RootQuery( this.queryMaps, objectFactory).getRootQuery(),
            mutation: new MutationQuery( objectFactory, this.queryMaps ).getMutationQuery()
        })
    }

    public getSchema(){
        return this.schema;
    }
}


export default AppSchema;