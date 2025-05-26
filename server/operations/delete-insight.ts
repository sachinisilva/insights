import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "../tables/insights.ts";
type Input = HasDBClient & {
  id: number;
};

export default (input: Input): Number => {
  console.log("Delete an insight");

  const { id, db } = input;
  try {
    const result = db.run(insightsTable.deleteStatement(), [id]);
    return result;
  } catch (err: any) {
    return err.message;
  }
};
