/**
 * Returns a random alphanumeric string
 * 
 * @param length - preferred string length 
 * @returns Random alphanumeric string of length `length`
 */
const makeid = (length: number): string => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Checks whether a URL is valid before it is shortened
 * 
 * @param url - URL to check validity
 * @returns `true` if `url` is valid, `false` otherwise
 */
const isValidURL = (url: string): boolean => {
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null);
};


/**
 * Shorten a URL by generating a unique ID that references the URL
 * @param long_url - a long URL to be shortened
 * @returns An object with keys: `id`: unique ID for long url, `link`: contains the `long_url`
 */
const shortenURL = (long_url: string) => {
  return {
      id: makeid(8),
      link: long_url
  };
};

export {isValidURL, shortenURL};