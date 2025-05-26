export const createTable = `
  CREATE TABLE insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brand INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export type Row = {
  id: number;
  brand: number;
  createdAt: Date;
  text: string;
};

export type Insert = {
  brand: number;
  text: string;
  createdAt?: string,
  id?: number
};

export const deleteStatement = () => `DELETE from insights WHERE id = ?`;

export const insertItemStatement = () =>
  `INSERT INTO insights (brand, createdAt, text) VALUES (?, ?, ?)`;

export const insertStatement = (item: Insert) =>
  `INSERT INTO insights (brand, createdAt, text) VALUES (${item.brand}, '${item.createdAt}', '${item.text}')`;
