export default class CandidatesBucket {
    protected data: {
        [hash: string]: string[];
    };
    add(hash: string, doc: string): CandidatesBucket;
    compress(): string[][];
    getData(): {
        [hash: string]: string[];
    };
}
