import AbstractNearDuplicatesFinder, { Duplicates } from "./AbstractNearDuplicatesFinder";
import NearDuplicatesFinder from "./NearDuplicatesFinder";
export default class BaseNearDuplicatesFinder extends AbstractNearDuplicatesFinder implements NearDuplicatesFinder {
    add(docId: string, text: string): void;
    search(): Duplicates;
}
