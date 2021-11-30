import WordShinglingTool from "../ShinglingTool/WordShinglingTool";
import { getCompactHasher } from "./hasherFactory";
import StringShinglingTool from "../ShinglingTool/StringShinglingTool";

export const makeWordShinglingTool = (shingleSize: number) => {
  return new WordShinglingTool(shingleSize, getCompactHasher());
};
export const makeStringShinglingTool = (shingleSize: number) => {
  return new StringShinglingTool(shingleSize, getCompactHasher());
};
