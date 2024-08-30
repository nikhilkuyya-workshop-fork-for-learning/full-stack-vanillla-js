import sqlite3 from 'sqlite3';

export const generateDBInstance = (filePath) => {
  return new sqlite3.Database(filePath);
}
