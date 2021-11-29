import fs from "fs";
import path from "path";
import readline from "readline";
import { makeDuplicatesFinder } from "./src/Factory/duplicatesFinderFactory";

const finder = makeDuplicatesFinder({
  minSimilarity: 0.01,
  shinglesSize: 5,
  shinglesType: "word",
  signatureLength: 100,
  rowsPerBand: 5,
});

finder.on("doc_added", (candidates) => {
  console.log(candidates);
});

finder.on("found_candidates", (candidates) => console.log(candidates));

finder.on("found_duplicates", (duplicates) => console.log(duplicates));

const process = async () => {
  let count = 0;
  try {
    const fileStream = fs.createReadStream(
      path.join(__dirname, "..", "datasets", "reviews.test.txt")
    );

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.

      const ln = line.replace(/__label__[0-9] /gi, "");
      finder.add(`review${count}`, ln);
      count += 1;
    }
  } catch (err) {
    console.error(err);
  }

  const duplicates = finder.search();
  console.log(duplicates);
};

void process();
