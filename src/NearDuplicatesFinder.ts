import { Duplicates } from "./BaseNearDuplicatesFinder";

export default interface NearDuplicatesFinder {
  add(docId: string, text: string): void | Promise<void>;
  search(): Duplicates | Promise<Duplicates>;
}
