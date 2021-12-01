import AbstractNearDuplicatesFinder, { Duplicates } from "./AbstractNearDuplicatesFinder";
import AsyncNearDuplicatesFinder from "./AsyncNearDuplicatesFinder";
export default class BaseAsyncNearDuplicatesFinder extends AbstractNearDuplicatesFinder implements AsyncNearDuplicatesFinder {
    add(docId: string, text: string): Promise<void>;
    search(): Promise<Duplicates>;
}
