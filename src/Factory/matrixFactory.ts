import BaseSparseMatrix from "../ShinglingTool/BaseSparseMatrix";
import BaseSignatureMatrix from "../ShinglingTool/BaseSignatureMatrix";
import { makeMergeSortAlgo } from "./sortAlgoFactory";
import saltGenerator from "../Util/SaltGenerator";

export const makeBaseSparseMatrix = () => {
  return new BaseSparseMatrix();
};

export const makeSignatureMatrix = (sigLength: number) => {
  new BaseSignatureMatrix({ sigLength }, saltGenerator, makeMergeSortAlgo());
};
