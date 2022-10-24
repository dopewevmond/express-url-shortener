// creates a random string of numbers and letters of length `length`
const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// returns true is a url is valid, false otherwise
const isValidURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
};

// every shortened link will be created as an object with the following keys ...
// ... id: <randomly generated slug> ...
// ... url: <the url corresponding to the id> ...
const shortenUrl = (long_url) => {
    return {
        id: makeid(8),
        link: long_url
    };
};

module.exports = {isValidURL, shortenUrl};