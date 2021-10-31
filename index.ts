import mongodb, { Db } from 'mongodb';

const MongoClient = mongodb.MongoClient;
const DATABASE_DEFAULT_URL = 'mongodb://localhost:27017/';

interface databaseData{
	url: string,
	name: string
};

interface MongoDBConnectionTypes {
	get: () => Promise<Db>;
}

/**
 * Create singleton mongoDB connection
 * @param { databaseData } data database data
 * @return {MongoDBConnectionTypes}  Singleton MongoDB
 */
const MongoDBConnection = (data: databaseData): MongoDBConnectionTypes => {
	var db: Db | null = null;
	const {name, url} = data;
	const databaseUrl = url ?? DATABASE_DEFAULT_URL;

	async function DbConnect(): Promise<Db> {
		try {
			let conn = await MongoClient.connect(databaseUrl);
			let _db = conn.db(name);
			
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
