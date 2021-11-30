export default class CandidatesBucket {
    protected data: {
        [hash: string]: string[];
    };
    protected index: {
        [doc: string]: string[];
    };
    add(hash: string, doc: string): CandidatesBucket;
    compress(): string[][];
    protected checkIndex(data: string[], copy: {
        [hash: string]: string[];
    }): string[];
    getData(): {
        [hash: string]: string[];
    };
}
