import {
  makeDuplicatesFinderWithMocks,
  makeAsyncDuplicatesFinderWithMocks,
} from "../../src/Factory/duplicatesFinderFactory";
import fs from "fs";
import path from "path";
import readline from "readline";

describe("Testing NearDuplicateFinder class", () => {
  test("Test case: It found near duplicate docs using word shingles", async () => {
    const expected = {
      review5: [
        [1, "review6"],
        [0.926829268292683, "review136"],
      ],
      review6: [[0.926829268292683, "review136"]],
      review81: [[0.8582677165354331, "review9"]],
    };

    const finder = makeDuplicatesFinderWithMocks({
      minSimilarity: 0.01,
      shinglesSize: 5,
      shinglesType: "word",
      signatureLength: 100,
      rowsPerBand: 5,
    });

    const fileStream = fs.createReadStream(
      path.join(__dirname, "..", "..", "datasets", "reviews.test.txt")
    );

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let count = 0;

    for await (const line of rl) {
      finder.add(`review${count}`, line);
      count += 1;
      if (count > 200) {
        break;
      }
    }

    const duplicates = finder.search();
    expect(duplicates).toEqual(expected);
  });

  test("Test case: It found all near duplicate docs using string shingles", async () => {
    const expected = {
      review5: [
        [1, "review6"],
        [0.9430284857571214, "review136"],
      ],
      review6: [[0.9430284857571214, "review136"]],
      review9: [[0.8916129032258064, "review81"]],
    };

    const finder = makeDuplicatesFinderWithMocks({
      minSimilarity: 0.01,
      shinglesSize: 5,
      shinglesType: "char",
      signatureLength: 100,
      rowsPerBand: 5,
    });

    const fileStream = fs.createReadStream(
      path.join(__dirname, "..", "..", "datasets", "reviews.test.txt")
    );

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let count = 0;

    for await (const line of rl) {
      finder.add(`review${count}`, line);
      count += 1;
      if (count > 200) {
        break;
      }
    }

    const duplicates = finder.search();
    expect(duplicates).toEqual(expected);
  });

  test("Test case: It found near duplicate docs using word shingles (Async)", async () => {
    const expected = {
      review5: [
        [1, "review6"],
        [0.926829268292683, "review136"],
      ],
      review6: [[0.926829268292683, "review136"]],
      review81: [[0.8582677165354331, "review9"]],
    };

    const finder = makeAsyncDuplicatesFinderWithMocks({
      minSimilarity: 0.01,
      shinglesSize: 5,
      shinglesType: "word",
      signatureLength: 100,
      rowsPerBand: 5,
    });

    const fileStream = fs.createReadStream(
      path.join(__dirname, "..", "..", "datasets", "reviews.test.txt")
    );

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let count = 0;

    for await (const line of rl) {
      await finder.add(`review${count}`, line);
      count += 1;
      if (count > 200) {
        break;
      }
    }

    const duplicates = await finder.search();
    expect(duplicates).toEqual(expected);
  });
});
