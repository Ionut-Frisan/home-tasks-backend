import {LowSync, JSONFileSync} from 'lowdb';

const db = new LowSync(new JSONFileSync('database.json'));
db.read();

db.data ||= {task: [], calendar: []};

db.write();

export default db;