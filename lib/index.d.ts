import { Db } from 'mongodb';
interface databaseData {
    url: string;
    name: string;
}
interface MongoDBConnectionTypes {
    get: () => Promise<Db>;
}
/**
 * Create singleton mongoDB connection
 * @param { databaseData } data database data
 * @return {MongoDBConnectionTypes}  Singleton MongoDB
 */
declare const MongoDBConnection: (data: databaseData) => MongoDBConnectionTypes;
export default MongoDBConnection;
