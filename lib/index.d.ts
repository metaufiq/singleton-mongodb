import { Db } from 'mongodb';
interface MongoDBConnectionTypes {
    get: () => Promise<Db>;
}
/**
 * Create singleton mongoDB connection
 * @param { string } databaseName database name
 * @param { string } url database url (use mongodb://localhost:27017/ if not assigned)
 * @return {MongoDBConnectionTypes}  Singleton MongoDB
 */
declare const MongoDBConnection: (databaseName: string, url?: string) => MongoDBConnectionTypes;
export default MongoDBConnection;
