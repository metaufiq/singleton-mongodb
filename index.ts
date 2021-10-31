import mongodb, { Db } from 'mongodb';

const MongoClient = mongodb.MongoClient;
const DATABASE_DEFAULT_URL = 'mongodb://localhost:27017/';

interface MongoDBConnectionTypes {
	get: () => Promise<Db>;
}

/**
 * Create singleton mongoDB connection
 * @param { string } databaseName database name
 * @param { string } url database url (use mongodb://localhost:27017/ if not assigned)
 * @return {MongoDBConnectionTypes}  Singleton MongoDB
 */
const MongoDBConnection = (databaseName: string, url: string=DATABASE_DEFAULT_URL): MongoDBConnectionTypes => {
	var db: Db | null = null;

	async function DbConnect(): Promise<Db> {
		try {
			let conn = await MongoClient.connect(url);
			let _db = conn.db(databaseName);
			
			return _db;
		} catch (e: any) {
			return e;
		}
	}

	async function get(): Promise<Db> {
		try {
			if (db != null) {
				return db;
			} else {
				db = await DbConnect();
				return db;
			}
		} catch (e: any) {
			return e;
		}
	}

	return {
		get: get
	};
};

export default MongoDBConnection;
