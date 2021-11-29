import Hashes from "jshashes";

export const getCompactHasher = (): ((str: string) => number) => {
  const hasher = new Hashes.SHA256().hex;
  return (str: string): number => {
    const hash = hasher(str);
    return parseInt(
      `0x${hash.slice(0, 2)}${hash.slice(
        Math.floor(hash.length / 2),
        Math.floor(hash.length / 2) + 3
      )}${hash.slice(-2)}`,
      16
    );
  };
};

export const getSha256 = () =>
  new Hashes.SHA256().hex as (str: string) => string;
export const getMd5 = () => new Hashes.MD5().hex as (str: string) => string;
