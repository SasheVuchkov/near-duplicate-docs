import AbstractNearDuplicatesFinder, {
  Duplicates,
} from "./AbstractNearDuplicatesFinder";
import NearDuplicatesFinder from "./NearDuplicatesFinder";

export default class BaseNearDuplicatesFinder
  extends AbstractNearDuplicatesFinder
  implements NearDuplicatesFinder
{
  public add(docId: string, text: string): void {
    this.candidatesFinder.add(docId.toString(), text.toString());
    this.emit("doc_added", docId);
  }

  public search(): Duplicates {
    this.emit("search");

    const candidates = this.candidatesFinder.search();
    const duplicates = this.process(candidates);

    this.emit("finish", duplicates);
    return duplicates;
  }
}
