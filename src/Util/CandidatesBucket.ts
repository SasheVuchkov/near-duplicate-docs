export default class CandidatesBucket {
  protected data: { [hash: string]: string[] } = {};

  public add(hash: string, doc: string): CandidatesBucket {
    if (!this.data[hash]) {
      this.data[hash] = [];
    }

    this.data[hash].push(doc);
    return this;
  }

  /**
   * The bucket registers all passed hashes and documents,
   * so if we want only the candidates, we need to filter
   * the rest.
   */
  public dump(): string[][] {
    const index: { [doc: string]: string } = {};
    const bucket: { [hash: string]: string[] } = {};

    for (const hash in this.data) {
      if (this.data[hash].length < 2) {
        continue;
      }

      let hashAppended = false;
      for (const docId of this.data[hash]) {
        if (!index[docId]) {
          index[docId] = hash;
        }

        if (hashAppended) {
          continue;
        }

        if (!bucket[index[docId]]) {
          bucket[index[docId]] = [];
        }

        bucket[index[docId]] = bucket[index[docId]]
          .concat(this.data[hash])
          .filter((item, index, arr) => index === arr.indexOf(item));
        hashAppended = true;
      }
    }
    return Object.values(bucket);
  }

  public getData(): { [hash: string]: string[] } {
    return this.data;
  }
}
