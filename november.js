/**
 * Counts the number of character differences between two strings.
 * @param {string} textA - First string to compare.
 * @param {string} textB - Second string to compare.
 * @returns {number} Number of differing characters at same positions.
 */
function countDifferences(textA, textB) {
    let differences = 0;
    for (let i = 0; i < textA.length; i++) {
        if (textA[i] !== textB[i]) {
            differences++;
        }
    }
    return differences;
}

/**
 * Determines if two fingerprints match based on difference threshold.
 * @param {string} fingerprintA - First fingerprint to compare.
 * @param {string} fingerprintB - Second fingerprint to compare.
 * @returns {boolean} True if fingerprints match within threshold.
 */
function isMatch(fingerprintA, fingerprintB) {
    if (fingerprintA.length !== fingerprintB.length) return false;
    
    const differences = 10*countDifferences(fingerprintA, fingerprintB);
    return differences <= fingerprintA.length;
}

/**
 * Repeats a string to create exactly 100 characters.
 * @param {string} chars - The string to repeat.
 * @returns {string} A 100-character string.
 */
const oneHundred = (chars) => chars.repeat(Math.ceil(100/chars.length)).substring(0,100);

/**
 * Calculates the total number of rectangles in a grid.
 * @param {number} width - Width of the grid.
 * @param {number} height - Height of the grid.
 * @returns {number} Total number of possible rectangles.
 */
const countRectangles = (width, height) => 0.25 * width * (width + 1) * height * (height + 1);

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

/**
 * Determines the post type based on message length.
 * @param {string} message - The message to check.
 * @returns {string} 'short post', 'long post', or 'invalid post'.
 */
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

/**
 * Converts a Markdown heading to HTML heading tag.
 * Valid format: optional spaces + 1-6 hashes + at least one space + text
 */
function convert(heading) {
  const match = heading.match(/^( *)#{1,6} .+$/);
  if (!match) return "Invalid format";
  
  const trimmed = heading.trim();
  const hashCount = trimmed.indexOf(' ');
  const headingText = trimmed.substring(hashCount).trim();
  
  return `<h${hashCount}>${headingText}</h${hashCount}>`;
}

/**
 * Calculates the number of infected computers after given days.
 * Day 0: 1 computer infected
 * Each day: infected doubles
 * Every 3rd day: patch reduces infected by 20% (rounded up)
 */
function infected(days) {

  let infectedCount = 1;
  for (let day = 1; day <= days; day++) {
    infectedCount *= 2;   
    if (day % 3 === 0) infectedCount -= Math.ceil(infectedCount * 0.2);
  }
  
  return infectedCount;
}

/**
 * Returns the file extension from a filename.
 * Returns "none" if no extension or filename ends with period.
 */
function getExtension(filename) {

  const lastDotIndex = filename.lastIndexOf('.'); 
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return "none";
  }
  
  return filename.substring(lastDotIndex + 1);
}

/**
 * Searches for images matching a search term (case-insensitive).
 * Returns matching images in the same order as the input array.
 */
const imageSearch = (images, term) => images.filter(image => image.toLowerCase().includes(term.toLowerCase()));

/**
 * Generates an email signature with prefix based on first letter of name.
 * A-I: >>, J-R: --, S-Z: ::
 */
function generateSignature(name, title, company) {

  let prefix;
  if (name[0] >= 'A' && name[0] <= 'I') {
    prefix = '>>';
  } else if (name[0] >= 'J' && name[0] <= 'R') {
    prefix = '--';
  } else {
    prefix = '::';
  }
  
  return `${prefix}${name}, ${title} at ${company}`;
}

/**
 * Returns the day of the week for a given date in YYYY-MM-DD format.
 * Ignores time zones by using UTC.
 */
function getWeekday(dateString) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString + 'T00:00:00Z');
  return days[date.getUTCDay()];
}

/**
 * Returns days until weekend or weekend message.
 * Weekend is Saturday (6) and Sunday (0).
 * Ignores time zones by using UTC.
 */
function daysUntilWeekend(dateString) {
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(getWeekday(dateString));
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return "It's the weekend!";
  }
  
  const daysUntil = 6 - dayOfWeek;
  const dayWord = daysUntil === 1 ? "day" : "days";
  return `${daysUntil} ${dayWord} until the weekend.`;
}

/**
 * Shifts an array by n positions.
 * Positive n: shift left, Negative n: shift right.
 * Wraps around the array.
 */
function shiftArray(arr, n) {
  if (arr.length === 0) return arr;
  
  const shift = ((n % arr.length) + arr.length) % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}

/**
 * Counts vowels and consonants in a string.
 * @param {string} str - The string to analyze.
 * @returns {number[]} Array with [vowel count, consonant count].
 */
function count(str) {

  const vowelSet = new Set(['a', 'e', 'i', 'o', 'u']);
  let vowels = 0;
  let consonants = 0;
  for (const char of str.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
    if (vowelSet.has(char)) {
      vowels++;
    } else {
      consonants++;
    }
    }
  }

  return [vowels, consonants];
}

/**
 * Searches for a word horizontally in a character matrix.
 * @param {string[][]} matrix - 2D array of characters.
 * @param {string} word - Word to search for.
 * @returns {number[][]|null} Start and end coordinates or null.
 */
function searchHorizontal(matrix, word) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - word.length; c++) {
      let match = true;
      let revmatch = true;
      const rightCol = cols - 1 - c;
      for (let i = 0; i < word.length; i++) {
        if (matrix[r][c + i] !== word[i]) match = false;
        if (matrix[r][rightCol - i] !== word[i]) revmatch = false;
        if (!(match || revmatch)) break;
      }
      if (match) return [[r, c], [r, c + word.length - 1]];
      if (revmatch) return [[r, rightCol], [r, rightCol - word.length + 1]];
    }
  }
  return null;
}

/**
 * Searches for a word vertically in a character matrix.
 * @param {string[][]} matrix - 2D array of characters.
 * @param {string} word - Word to search for.
 * @returns {number[][]|null} Start and end coordinates or null.
 */
function searchVertical(matrix, word) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r <= rows - word.length; r++) {
      let match = true;
      let revmatch = true;
      const bottomRow = rows - 1 - r;
      for (let i = 0; i < word.length; i++) {
        if (matrix[r + i][c] !== word[i]) match = false;
        if (matrix[bottomRow - i][c] !== word[i]) revmatch = false;
        if (!(match || revmatch)) break;
      }
      if (match) return [[r, c], [r + word.length - 1, c]];
      if (revmatch) return [[bottomRow, c], [bottomRow - word.length + 1, c]];
    }
  }
  return null;
}

/**
 * Finds a word in a matrix horizontally or vertically.
 * @param {string[][]} matrix - 2D array of characters.
 * @param {string} word - Word to search for.
 * @returns {number[][]|null} Start and end coordinates or null.
 */
const findWord = (matrix, word) => searchHorizontal(matrix, word) || searchVertical(matrix, word);

/**
 * Counts the number of words in a sentence.
 * @param {string} sentence - The sentence to count words in.
 * @returns {number} Number of words.
 */
const countWords = (sentence) => {
  if (sentence.length === 0) return 0;
  return sentence.split(' ').length;
}

/**
 * Calculates combinations of selecting cards from a 52-card deck.
 * @param {number} cards - Number of cards to select.
 * @returns {number} Number of possible combinations.
 */
function combinations(cards) {
  const n = 52; 
  // Use symmetry: C(n, k) = C(n, n-k)
  const k = cards > n - cards ? n - cards : cards;
  
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  
  return Math.round(result); // Round to insure integer result
}

/**
 * Creates a 2D matrix filled with zeros.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {number[][]} Matrix filled with zeros.
 */
function buildMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(new Array(cols).fill(0));
  }
  return matrix;
}

/**
 * Finds the longest word in a sentence (letters only).
 * @param {string} sentence - The sentence to analyze.
 * @returns {string} The longest word without punctuation.
 */
function longestWord(sentence) {

  let longest = '';

  const words = sentence.split(' '); 
  for (const word of words) {
    const lettersOnly = word.replace(/[^a-zA-Z]/g, '');
    if (lettersOnly.length > longest.length) longest = lettersOnly;
  }
  
  return longest;
}

/**
 * Calculates the least common multiple of two numbers.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} The least common multiple.
 */
const lcm = (a, b) => a * b / gcd(a, b);

/**
 * Scales recipe ingredient quantities by a multiplier.
 * @param {string[]} ingredients - Array of ingredient strings with quantities.
 * @param {number} scale - Scale factor to multiply quantities.
 * @returns {string[]} Scaled ingredient strings.
 */
const scaleRecipe = (ingredients, scale) => ingredients.map((item) => {
    const i0 = item.indexOf(' ');
    const scaledQuantity = parseFloat(item.slice(0, i0)) * scale;
    return scaledQuantity.toString() + ' ' + item.slice(i0 + 1);
  });

/**
 * Counts occurrences of each letter in a sentence.
 * @param {string} sentence - The sentence to analyze.
 * @returns {string[]} Sorted array of 'letter count' strings.
 */
function countCharacters(sentence) {
  const counts = {};
  for (const char of sentence.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      counts[char] = (counts[char] || 0) + 1;
    }
  }
  return Object.keys(counts).sort().map((char) => {
    return char + ' ' + counts[char];
  });
}

/**
 * Validates if a message matches a validator pattern.
 * @param {string} message - The message to validate.
 * @param {string} validator - String where each char matches word's first letter.
 * @returns {boolean} True if message matches validator pattern.
 */
function isValidMessage(message, validator) {
  if (message === '' && validator === '') {
    return true;
  }
  const words = message.split(' ');
  if (words.length !== validator.length) {
    return false;
  }
  for (let i = 0; i < words.length; i++) {
    if (words[i][0].toLowerCase() !== validator[i].toLowerCase()) {
      return false;
    }
  }
  return true;
}

/**
 * Generates FizzBuzz sequence up to n.
 * @param {number} n - The upper limit.
 * @returns {Array} Array with numbers and Fizz/Buzz/FizzBuzz strings.
 */
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(i);
    }
  }
  return result;
}

/**
 * Validates if a sequence is a correct FizzBuzz sequence.
 * @param {Array} sequence - The sequence to validate.
 * @returns {boolean} True if valid FizzBuzz sequence.
 */
function isFizzBuzz(sequence) {
  if (!sequence || sequence.length === 0) {
    return false;
  }
  for (let i = 0; i < sequence.length; i++) {
    const num = i + 1;
    const expected = num % 15 === 0 ? 'FizzBuzz' :
                     num % 3 === 0 ? 'Fizz' :
                     num % 5 === 0 ? 'Buzz' : num;
    if (sequence[i] !== expected) {
      return false;
    }
  }
  return true;
}

/**
 * Calculates age based on birthday and current date.
 * @param {string} birthday - Birthday in YYYY-MM-DD format.
 * @returns {number} Age in years.
 */
function calculateAge(birthday) {
  const [year, month, day] = birthday.split('-').map(Number);
  let age = 2025 - year;
  if (month > 11 || (month === 11 && day > 27)) {
    age--;
  }
  return age;
}

/**
 * Compares a guess to a word and returns match pattern.
 * @param {string} word - The target word.
 * @param {string} guess - The guessed word.
 * @returns {string} String of '0', '1', '2' indicating match quality.
 */
function compare(word, guess) {
  const result = new Array(guess.length).fill('0');
  const usedIndices = new Set();

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = '2';
      usedIndices.add(i);
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === '2') continue;

    for (let j = 0; j < word.length; j++) {
      if (!usedIndices.has(j) && guess[i] === word[j]) {
        result[i] = '1';
        usedIndices.add(j);
        break;
      }
    }
  }

  return result.join('');
}

/**
 * Predicts next location based on movement pattern in matrix.
 * @param {number[][]} matrix - 2D array with 1 (previous) and 2 (current).
 * @returns {number[]} Coordinates [row, col] of next location.
 */
function getNextLocation(matrix) {
  let prev = null;
  let curr = null;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) prev = [r, c];
      if (matrix[r][c] === 2) curr = [r, c];
    }
  }

  let dr = curr[0] - prev[0];
  let dc = curr[1] - prev[1];
  const maxR = matrix.length - 1;
  const maxC = matrix[0].length - 1;

  let nextR = curr[0] + dr;
  let nextC = curr[1] + dc;

  if (nextR < 0 || nextR > maxR) nextR = curr[0] - dr;
  if (nextC < 0 || nextC > maxC) nextC = curr[1] - dc;

  return [nextR, nextC];
}

/**
 * Detects if text is likely AI-generated based on patterns.
 * @param {string} text - The text to analyze.
 * @returns {string} 'AI' or 'Human'.
 */
function detectAI(text) {
  const dashCount = (text.match(/-/g) || []).length;
  if (dashCount >= 2) return 'AI';
  const parenCount = (text.match(/\([^)]*\)/g) || []).length;
  if (parenCount >= 2) return 'AI';
  const words = text.match(/[A-Za-z]+/g) || [];
  const longWords = words.filter(word => word.length >= 7).length;
  if (longWords >= 3) return 'AI';
  return 'Human';
}

module.exports = { countDifferences, isMatch, oneHundred, countRectangles, verify, canPost, gcd, convert, infected, getExtension, imageSearch, generateSignature, getWeekday, daysUntilWeekend, shiftArray, count, findWord, countWords, combinations, buildMatrix, longestWord, lcm, scaleRecipe, countCharacters, isValidMessage, fizzBuzz, isFizzBuzz, calculateAge, compare, getNextLocation, detectAI };