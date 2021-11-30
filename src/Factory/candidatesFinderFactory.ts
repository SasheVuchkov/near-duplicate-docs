import ShinglingTool from "../ShinglingTool/ShinglingTool";
import StringShinglingTool from "../ShinglingTool/StringShinglingTool";
import { getCompactHasher } from "./hasherFactory";
import { baseFilterFactory } from "./filterFactory";
import WordShinglingTool from "../ShinglingTool/WordShinglingTool";
import BaseSparseMatrix from "../ShinglingTool/BaseSparseMatrix";
import BaseSignatureMatrix from "../ShinglingTool/BaseSignatureMatrix";
import saltGenerator from "../Util/SaltGenerator";
import BaseCandidatesFinder from "../BaseCandidatesFinder";
import { makeMergeSortAlgo } from "./sortAlgoFactory";

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

  return new BaseCandidatesFinder(
    { rowsPerBand: config.rowsPerBand },
    new BaseSparseMatrix(),
    new BaseSignatureMatrix(
      { sigLength: config.signatureLength },
      saltGenerator,
      makeMergeSortAlgo()
    ),
    shingleTool
  );
};
