import Hashes from 'jshashes';

export const getCompactHasher = (): (str: string) => number => {
    const hasher = (new Hashes.SHA256).hex;
    return (str: string): number => {
        const hash = hasher(str);
        return parseInt(`0x${hash.slice(0, 3)}${hash.slice(hash.length, 3)}${hash.slice(-3)}`, 16);
    }
}

export const getSha256 = () => (new Hashes.SHA256).hex;
export const getMd5 = () => (new Hashes.MD5).hex;


