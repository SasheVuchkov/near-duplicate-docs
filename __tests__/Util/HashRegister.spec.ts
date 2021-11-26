import HashRegister, { makeHashRegister } from "../../src/Util/HashRegister";
describe("Testing Utils/HashRegister class", () => {
  test("Test case: The register is empty", () => {
    const register = new HashRegister("md5");

    expect(register.count()).toEqual(0);
  });

  const data1: [string, boolean, boolean][] = [
    ["Some cache that is registered", true, true],
    ["Other cache that is not registered", false, false],
  ];

  test.each(data1)(
    "Test case: The methods isRegistered & check works properly",
    (str, shouldRegister, expected) => {
      const register = new HashRegister("md5");

      if (shouldRegister) {
        register.check(str);
      }

      expect(register.isRegistered(str)).toEqual(expected);
      expect(register.check(str)).toEqual(expected);
    }
  );

  const data2: ["md5" | "sha256", string, number, string][] = [
    [
      "md5",
      "Some string",
      32,
      "80F855E731CC0C9AA336CA4D25F990BE".toLowerCase(),
    ],
    [
      "sha256",
      "Some string",
      64,
      "2BEAF0548E770C4C392196E0EC8E7D6D81CC9280AC9C7F3323E4C6ABC231E95A".toLowerCase(),
    ],
  ];

  test.each(data2)(
    "Test case: The register uses the chosen algorithm (%s)",
    (algo, str, hashLength, expected) => {
      const register = makeHashRegister(algo);
      register.check(str);
      expect(register.getHash("str")?.length).toEqual(hashLength);
      expect(register.getHash("str")).toEqual(expected);
      expect(register.count()).toEqual(1);
    }
  );
});
