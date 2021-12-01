import { Duplicates } from "./AbstractNearDuplicatesFinder";

export default interface AsyncNearDuplicatesFinder {
  add(docId: string, text: string): Promise<void>;
  search(): Promise<Duplicates>;
}
