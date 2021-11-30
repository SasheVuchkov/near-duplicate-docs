export default class CandidatesBucket {
  protected data: { [hash: string]: string[] } = {};
  protected index: { [doc: string]: string[] } = {};

  public add(hash: string, doc: string): CandidatesBucket {
    if (!this.data[hash]) {
      this.data[hash] = [];
    }

    if (!this.index[doc]) {
      this.index[doc] = [];
    }

    this.data[hash].push(doc);
    this.index[doc].push(hash);

    return this;
  }
  public compress(): string[][] {
    const data: string[][] = [];
    for (const hash in this.data) {
      if (this.data[hash].length < 2) {
        continue;
      }
      const candidates = this.checkIndex([...this.data[hash]]);
      data.push(candidates);
    }
    return data;
  }
  protected checkIndex(data: string[]) {
    for (const docId of data) {
      if (this.index[docId].length > 1) {
        for (const indexedHash of this.index[docId]) {
          if (!this.data[indexedHash]) {
            continue;
          }
          data = [...data, ...this.data[indexedHash]].filter(
            (item, index, arr) => index === arr.indexOf(item)
          );
          delete this.data[indexedHash];
        }
      }
    }
    return data;
  }
  public getData(): { [hash: string]: string[] } {
    return this.data;
  }
}
