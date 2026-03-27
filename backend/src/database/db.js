const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const adapter = new JSONFile("db.json");

const defaultData = { appointments: [] };

const db = new Low(adapter, defaultData);

async function initDB() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
}

initDB();

module.exports = db;