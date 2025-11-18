function countDifferences(textA, textB) {
    let differences = 0;
    for (let i = 0; i < textA.length; i++) {
        if (textA[i] !== textB[i]) {
            differences++;
        }
    }
    return differences;
}

function isMatch(fingerprintA, fingerprintB) {
    if (fingerprintA.length !== fingerprintB.length) return false;
    
    const differences = 10*countDifferences(fingerprintA, fingerprintB);
    return differences <= fingerprintA.length;
}

function oneHundred(chars) {
  return chars.repeat(Math.ceil(100/chars.length)).substring(0,100);
}

function countRectangles(width, height) {

  return 0.25 * width * (width + 1) * height * (height + 1);
}

/**
 * Calculates the sum of character values in a message.
 */
function messageValue(message) {
  let value = 0;
  for (let char of message) {
    const code = char.charCodeAt(0);
    // a-z: codes 97-122 -> values 1-26
    if (code >= 97 && code <= 122) {
      value += code - 96;
    }
    // A-Z: codes 65-90 -> values 27-52
    else if (code >= 65 && code <= 90) {
      value += code - 38;
    }
    // All other characters contribute 0
  }
  return value;
}

/**
 * Verifies if a signature is valid for a given message and secret key.
 * 
 * The signature is computed using the following encoding method:
 * - Letters a-z have values 1-26 respectively
 * - Letters A-Z have values 27-52 respectively
 * - All other characters have no value (0)
 * - Signature = sum of message character values + sum of key character values
 * 
 * Example:
 * Message "foo": f(6) + o(15) + o(15) = 36
 * Key "bar": b(2) + a(1) + r(18) = 21
 * Signature: 36 + 21 = 57
 * 
 * @param {string} message - The message to verify
 * @param {string} key - The secret key used for verification
 * @param {number} signature - The signature to validate against
 * @returns {boolean} True if the computed signature matches the provided signature, false otherwise
 */
function verify(message, key, signature) {

  return signature === (messageValue(message) + messageValue(key));
}

function canPost(message) {
    if (message.length <= 40) return "short post";
    if (message.length <= 80) return "long post";
    return "invalid post";
}

/**
 * Returns the greatest common divisor (GCD) of two positive integers.
 * Uses the Euclidean algorithm.
 */
function gcd(x, y) {
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

module.exports = { countDifferences, isMatch, oneHundred, countRectangles, verify, canPost, gcd };