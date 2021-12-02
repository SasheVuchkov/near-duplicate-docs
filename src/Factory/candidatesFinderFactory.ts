import ShinglingTool from "../ShinglingTool/ShinglingTool";
import StringShinglingTool from "../ShinglingTool/StringShinglingTool";
import { getCompactHasher } from "./hasherFactory";
import WordShinglingTool from "../ShinglingTool/WordShinglingTool";
import BaseSparseMatrix from "../ShinglingTool/BaseSparseMatrix";
import BaseSignatureMatrix from "../ShinglingTool/BaseSignatureMatrix";
import saltGenerator from "../Util/SaltGenerator";
import BaseCandidatesFinder from "../BaseCandidatesFinder";
import { makeMergeSortAlgo } from "./sortAlgoFactory";
import { makeCandidatesFinderConfigGuard } from "./guardFactory";

export type Config = {
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
};

export const isConfig = (value: any): value is Config => {
  const guard = makeCandidatesFinderConfigGuard();

  if (!guard.isValid(value)) {
    throw new Error(guard.getMessage());
  }

  return true;
};

export const makeCandidatesFinder = (config: Config) => {
  let shingleTool: ShinglingTool;
  if (config.shinglesType === "char") {
    shingleTool = new StringShinglingTool(
      config.shinglesSize,
      getCompactHasher()
    );
  } else {
    shingleTool = new WordShinglingTool(
      config.shinglesSize,
      getCompactHasher()
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

export const makeCandidatesFinderWithMocks = (config: Config) => {
  let shingleTool: ShinglingTool;
  if (config.shinglesType === "char") {
    shingleTool = new StringShinglingTool(
      config.shinglesSize,
      getCompactHasher()
    );
  } else {
    shingleTool = new WordShinglingTool(
      config.shinglesSize,
      getCompactHasher()
    );
  }

  let count = 0;
  const salts = [
    4234234, 6574568, 537547, 5326326, 632654276, 5363467, 626545235, 58937259,
    248293084293, 2983940283940, 953450948590, 94820938, 29384098, 53485798,
    98768768, 925809283509, 4238503405, 21312098, 21312344589567,
    4323982093752930, 2934219054781, 358237498273, 589903485, 9482093842,
    34908239084, 543057893408590, 29580293580, 293058293057, 29835279,
    293084230984, 903583409875892, 5483402938234, 3435345345809, 87897354423749,
    479857893457,
  ];
  const mockSaltGenerator = (): number => {
    if (count > salts.length - 1) {
      count = 0;
    }
    return salts[count++];
  };

  return new BaseCandidatesFinder(
    { rowsPerBand: config.rowsPerBand },
    new BaseSparseMatrix(),
    new BaseSignatureMatrix(
      { sigLength: config.signatureLength },
      mockSaltGenerator,
      makeMergeSortAlgo()
    ),
    shingleTool
  );
};
