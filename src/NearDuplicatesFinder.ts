import { Duplicates } from "./AbstractNearDuplicatesFinder";

export default interface NearDuplicatesFinder {
  add(docId: string, text: string): void;
  search(): Duplicates;
}
