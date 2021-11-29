import ShinglingTool from "../ShinglingTool/ShinglingTool";
import StringShinglingTool from "../ShinglingTool/StringShinglingTool";
import { getCompactHasher } from "./hasherFactory";
import { baseFilterFactory } from "./filterFactory";
import WordShinglingTool from "../ShinglingTool/WordShinglingTool";
import SparseMatrix from "../ShinglingTool/SparseMatrix";
import SignatureMatrix from "../ShinglingTool/SignatureMatrix";
import saltGenerator from "../Util/SaltGenerator";
import CandidateDuplicatesFinder from "../CandidateDuplicatesFinder";

export const makeCandidatesFinder = (config: {
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
}) => {
  let shingleTool: ShinglingTool;
  if (config.shinglesType === "char") {
    shingleTool = new StringShinglingTool(
      config.shinglesSize,
      getCompactHasher(),
      baseFilterFactory()
    );
  } else {
    shingleTool = new WordShinglingTool(
      config.shinglesSize,
      getCompactHasher(),
      baseFilterFactory()
    );
  }

  return new CandidateDuplicatesFinder(
    { rowsPerBand: config.rowsPerBand },
    new SparseMatrix(),
    new SignatureMatrix(config.signatureLength, saltGenerator),
    shingleTool
  );
};
