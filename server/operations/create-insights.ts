import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "../tables/insights.ts";
type Input = HasDBClient & {
  item: { brand: number; text: string };
};

export default (input: Input): Number | any => {
  console.log("Create an insight");

  const { item, db } = input;
  try {
    const result = db.run(insightsTable.insertItemStatement(), [
      item.brand,
      new Date(),
      item.text,
    ]);
    if (result === 1) {
      const row = input.db
        .sql<insightsTable.Row>`SELECT * FROM insights WHERE id = last_insert_rowid()`;
      console.log(row);
      return row;
    }
    return result;
  } catch (err: any) {
    return err.message;
  }
};
