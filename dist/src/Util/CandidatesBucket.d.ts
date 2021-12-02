export default class CandidatesBucket {
    protected data: {
        [hash: string]: string[];
    };
    add(hash: string, doc: string): CandidatesBucket;
    /**
     * The bucket registers all passed hashes and documents,
     * so if we want only the candidates, we need to filter
     * the rest.
     */
    dump(): string[][];
    getData(): {
        [hash: string]: string[];
    };
}
