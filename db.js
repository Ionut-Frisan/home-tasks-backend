import {LowSync, JSONFileSync} from 'lowdb';

const db = new LowSync(new JSONFileSync('database.json'));
db.read();

db.data ||= {tasks: [], calendar: []};

db.write();

export const initDb = () => {
  db.read();
  if(!db.data['tasks']) db.data['tasks'] = []
  if(!db.data['calendar']) db.data['calendar'] = []
  db.write()
  console.log(db.data);
}

export default db;