import type { Insight } from "../models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "../tables/insights.ts";

type Input = HasDBClient;

export default (input: Input): Insight[] => {
  console.log("Listing insights");

  try {
    const rows = input.db.sql<insightsTable.Row>`SELECT * FROM insights`;
    console.log("Retrieved insights successfully: ", rows);
    return rows;
  } catch (err: any) {
    return err.message;
  }
};
