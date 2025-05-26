import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import createInsight from "./create-insights.ts";
import lookupInsight from "./lookup-insight.ts";

describe("create an insight in the database", () => {
  withDB((fixture) => {
 const input = {
      item: {
        brand: 2,
        text: "test insight"
      },
      ...fixture
    };

    let created: any;

    beforeAll(async () => {
        created = await createInsight(input);
    });

    it("returns the created insight with generated id and datetime", () => {
      expect(created[0].brand).toEqual(input.item.brand);
      expect(typeof created[0]?.id).toBe("number");
      expect(new Date(created[0]?.createdAt).toString()).not.toBe("Invalid Date");
    });

    it("inserts the insight into the database", () => {
      const retrieved = lookupInsight({ ...fixture, id: created[0].id});
      expect(retrieved?.id).toEqual(created[0]?.id);
    });
  });
});
