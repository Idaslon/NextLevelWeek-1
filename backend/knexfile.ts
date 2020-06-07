import path from 'path';

const databaseUrl = path.resolve(__dirname, 'src', 'database')

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(databaseUrl, 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(databaseUrl, 'migrations')
  },
  seeds: {
    directory: path.resolve(databaseUrl, 'seeds')
  },
  useNullAsDefault: true,
}
