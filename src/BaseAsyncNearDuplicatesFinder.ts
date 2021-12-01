import AbstractNearDuplicatesFinder, {
  Duplicates,
} from "./AbstractNearDuplicatesFinder";
import AsyncNearDuplicatesFinder from "./AsyncNearDuplicatesFinder";

export default class BaseAsyncNearDuplicatesFinder
  extends AbstractNearDuplicatesFinder
  implements AsyncNearDuplicatesFinder
{
  public add(docId: string, text: string): Promise<void> {
    return new Promise((resolve) => {
      this.candidatesFinder.add(docId, text);
      this.emit("doc_added", docId);
      resolve();
    });
  }

  public search(): Promise<Duplicates> {
    return new Promise((resolve) => {
      this.emit("search");

      const candidates = this.candidatesFinder.search();
      const duplicates = this.process(candidates);

      this.emit("finish", duplicates);
      resolve(duplicates);
    });
  }
}
