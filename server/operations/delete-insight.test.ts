import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import createInsight from "./create-insights.ts";
import deleteInsight from "./delete-insight.ts";
import lookupInsight from "./lookup-insight.ts";

describe("delete an insight from the database", () => {
  withDB((fixture) => {
    const input = {
      item: {
        brand: 3,
        text: "insight to delete"
      },
      ...fixture
    };

    let createdId: number;

    beforeAll(async () => {
      const created = await createInsight(input);
      createdId = created[0]?.id;
    });

    it("successfully deletes an insight by id", async () => {
      const result = deleteInsight({ ...fixture, id: createdId });
      expect(result).toEqual(1);

      const retrieved = await lookupInsight({ ...fixture, id: createdId });
      expect(retrieved).toBeUndefined();
    });

    it("returns error message when deleting insight nt eixits n db", () => {
      const result = deleteInsight({ ...fixture, id: -1 });
      expect(result).toEqual(0);
    });
  });
});