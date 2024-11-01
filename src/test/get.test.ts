import { get } from "@/utils/math";
import { expect, test } from "@jest/globals";

test("test get", () => {
  expect(
    get(
      {
        id: 101,
        email: "jack@dev.com",
        personalInfo: {
          name: "Jack",
          address: {
            line1: "westwish st",
            line2: "washmasher",
            city: "wallas",
            state: "WX",
          },
        },
      },
      ["personalInfo", "address", "state"]
    )
  ).toBe("WX");
});
