import CandidatesBucket from "../../../src/Util/CandidatesBucket";

describe("Testing Utils/CandidatesBucket class", () => {
  test("Test case: Checking is the collected data correct", () => {
    const bucket = new CandidatesBucket();

    bucket.add("1", "doc1");
    bucket.add("1", "doc2");
    bucket.add("1.5", "doc5");
    bucket.add("1.5", "doc6");
    bucket.add("2", "doc1");
    bucket.add("2", "doc3");
    bucket.add("3", "doc4");

    const expectedPairs = [
      ["doc1", "doc2", "doc3"],
      ["doc5", "doc6"],
    ];
    const uniquePairs = bucket.dump();
    expect(uniquePairs).toEqual(expectedPairs);

    const rawData = bucket.getData();
    const expectedData = {
      "1": ["doc1", "doc2"],
      "1.5": ["doc5", "doc6"],
      "2": ["doc1", "doc3"],
      "3": ["doc4"],
    };
    expect(rawData).toEqual(expectedData);
  });
});
