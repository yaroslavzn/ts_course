class KVDatabase {
	private db: Map<string, string> = new Map();

	public save(key: string, value: string): void {
		this.db.set(key, value);
	}
}

class PersistentDB {
	public savePersistant(obj: Object): void {
		console.log(obj);
	}
}

class PersisentDBAdapter extends KVDatabase {
	constructor(
		private persistentDb: PersistentDB
	) {
		super();
	}

	public override save(key: string, value: string): void {
		this.persistentDb.savePersistant({ key: value });
	}
}

function run(db: KVDatabase) {
	db.save('hello', 'world!');
}

run(new PersisentDBAdapter(new PersistentDB()));