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
    const copy = { ...this.data };
    for (const hash in copy) {
      if (copy[hash].length < 2) {
        continue;
      }
      const candidates = this.checkIndex([...this.data[hash]], copy);
      data.push(candidates);
    }
    return data;
  }
  protected checkIndex(data: string[], copy: { [hash: string]: string[] }) {
    for (const docId of data) {
      if (this.index[docId].length < 2) {
        continue;
      }
      for (const indexedHash of this.index[docId]) {
        if (!copy[indexedHash]) {
          continue;
        }
        data = [...data, ...copy[indexedHash]].filter(
          (item, index, arr) => index === arr.indexOf(item)
        );
        delete copy[indexedHash];
      }
    }
    return data;
  }
  public getData(): { [hash: string]: string[] } {
    return this.data;
  }
}
