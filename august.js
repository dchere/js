/**
 * Generates a random hex color code with the specified dominant color.
 * @param {string} color - The dominant color ('red', 'green', or 'blue').
 * @returns {string} The hex color code or 'Invalid color'.
 */
function generateHex(color) {

    if (color !== "red" && color !== "green" && color !== "blue") {
    return "Invalid color";
  }
  
  const dominant = 128 + Math.floor(Math.random() * 128);
  const other1 = Math.floor(Math.random() * 0.9*dominant);
  const other2 = Math.floor(Math.random() * 0.9*dominant); 
  const toHex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
  if (color === "red") {
    return toHex(dominant) + toHex(other1) + toHex(other2);
  } else if (color === "green") {
    return toHex(other1) + toHex(dominant) + toHex(other2);
  } else {
    return toHex(other1) + toHex(other2) + toHex(dominant);
  } 
}

/**
 * Converts a string to camelCase format.
 * @param {string} s - The string to convert.
 * @returns {string} The camelCase string.
 */
function toCamelCase(s) {

  const words = s.split(/[\s\-_]+/).filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  const camelCased = words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    if (index === 0) return lowerWord;
    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  });
  
  return camelCased.join('');
}

/**
 * Calculates the sum of squares from 1 to n.
 * @param {number} n - The upper limit.
 * @returns {number} The sum of squares.
 */
const sumOfSquares = (n) => n * (n + 1) * (2 * n + 1) / 6;

/**
 * Generates a Fibonacci sequence of specified length.
 * @param {number[]} startSequence - The first two numbers of the sequence.
 * @param {number} length - The desired length of the sequence.
 * @returns {number[]} The Fibonacci sequence.
 */
function fibonacciSequence(startSequence, length) {

  if (length === 0) return [];
  if (length === 1) return [startSequence[0]];
  if (length === 2) return [...startSequence];
  
  const sequence = [...startSequence];
  for (let i = 2; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  
  return sequence;
}

/**
 * Calculates the pace per mile given total miles and duration.
 * @param {number} miles - The number of miles.
 * @param {string} duration - The total duration in 'MM:SS' format.
 * @returns {string} The pace per mile in 'MM:SS' format.
 */
function milePace(miles, duration) {

  const [minutes, seconds] = duration.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const paceSeconds = totalSeconds / miles;
  
  const paceMinutes = Math.floor(paceSeconds / 60);
  const paceRemainingSeconds = Math.round(paceSeconds % 60);
  
  return `${String(paceMinutes).padStart(2, '0')}:${String(paceRemainingSeconds).padStart(2, '0')}`;
}

/**
 * Calculates total candles burned when leftovers can make new candles.
 * @param {number} candles - The initial number of candles.
 * @param {number} leftoversNeeded - The number of leftovers needed to make a new candle.
 * @returns {number} The total number of candles burned.
 */
function burnCandles(candles, leftoversNeeded) {

  let burned = 0;
  let leftovers = 0;
  
  while (candles > 0) {
    burned += candles;
    leftovers += candles;
    candles = Math.floor(leftovers / leftoversNeeded);
    leftovers = leftovers % leftoversNeeded;
  }
  
  return burned;
}

/**
 * Checks if a number (including negative) is an unnatural prime.
 * @param {number} n - The number to check.
 * @returns {boolean} True if the absolute value is prime.
 */
function isUnnaturalPrime(n) {

  if (n === 0 || n === 1 || n === -1) return false;
  
  const absN = Math.abs(n);
  if (absN === 2) return true;
  if (absN % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(absN); i += 2) {
    if (absN % i === 0) return false;
  }
  
  return true;
}

/**
 * Scrambles the middle letters of each word alphabetically.
 * @param {string} text - The text to scramble.
 * @returns {string} The scrambled text.
 */
function jbelmu(text) {
  return text.split(' ').map(word => {
    if (word.length <= 2) return word;
    const first = word[0];
    const last = word[word.length - 1];
    const middle = word.slice(1, -1).split('').sort().join('');
    return first + middle + last;
  }).join(' ');
}

/**
 * Evaluates a sequence of numbers with cycling operators.
 * @param {number[]} numbers - The array of numbers.
 * @param {string[]} operators - The array of operators ('+', '-', '*', '/', '%').
 * @returns {number} The result of the evaluation.
 */
function evaluate(numbers, operators) {

  let result = numbers[0];
  let opIndex = 0;
  
  for (let i = 1; i < numbers.length; i++) {
    const op = operators[opIndex % operators.length];
    if (op === '+') result += numbers[i];
    else if (op === '-') result -= numbers[i];
    else if (op === '*') result *= numbers[i];
    else if (op === '/') result = Math.floor(result / numbers[i]);
    else if (op === '%') result %= numbers[i];
    opIndex++;
  }
  
  return result;
}

/**
 * Checks if a string has equal vowel counts in both halves.
 * @param {string} s - The string to check.
 * @returns {boolean} True if the string is balanced.
 */
function isBalanced(s) {

  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const mid = Math.floor(s.length / 2);
  const firstHalf = s.slice(0, mid);
  const secondHalf = s.slice(s.length % 2 === 0 ? mid : mid + 1);
  
  const countVowels = (str) => {
    return str.split('').filter(char => vowels.has(char)).length;
  };
  
  return countVowels(firstHalf) === countVowels(secondHalf);
}

/**
 * Finds two indices in an array that sum to the target value.
 * @param {number[]} arr - The array of numbers.
 * @param {number} target - The target sum.
 * @returns {number[]|string} Array of two indices or 'Target not found'.
 */
function findTarget(arr, target) {

  const seen = new Map();
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(arr[i], i);
  }
  
  return "Target not found";
}

/**
 * Simulates a battle between two armies based on character strength.
 * @param {string} myArmy - Your army string.
 * @param {string} opposingArmy - The opposing army string.
 * @returns {string} The battle result.
 */
function battle(myArmy, opposingArmy) {

  if (myArmy.length > opposingArmy.length) return "Opponent retreated";
  if (myArmy.length < opposingArmy.length) return "We retreated";
  
  const getStrength = (char) => {
    if (char >= 'a' && char <= 'z') return char.charCodeAt(0) - 96;
    if (char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 38;
    if (char >= '0' && char <= '9') return parseInt(char);
    return 0;
  };
  
  let myWins = 0;
  let opponentWins = 0;
  
  for (let i = 0; i < myArmy.length; i++) {
    const myStr = getStrength(myArmy[i]);
    const oppStr = getStrength(opposingArmy[i]);
    if (myStr > oppStr) myWins++;
    else if (oppStr > myStr) opponentWins++;
  }
  
  if (myWins > opponentWins) return "We won";
  if (opponentWins > myWins) return "We lost";
  return "It was a tie";
}

/**
 * Calculates the factorial of a number.
 * @param {number} n - The number to calculate factorial for.
 * @returns {number} The factorial of n.
 */
function factorial(n) {

  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Checks if a number string is valid for a given base.
 * @param {string} n - The number string to validate.
 * @param {number} base - The base (2-36).
 * @returns {boolean} True if the number is valid for the base.
 */
function isValidNumber(n, base) {

  const upperN = n.toUpperCase();
  
  for (let i = 0; i < upperN.length; i++) {
    const char = upperN[i];
    let digitValue;
    
    if (char >= '0' && char <= '9') {
      digitValue = char.charCodeAt(0) - 48;
    } else if (char >= 'A' && char <= 'Z') {
      digitValue = char.charCodeAt(0) - 55;
    } else {
      return false;
    }
    
    if (digitValue >= base) return false;
  }
  
  return true;
}

/**
 * Counts how many perfect squares contain the digit 3.
 * @param {number} n - The upper limit to check.
 * @returns {number} The count of squares containing 3.
 */
function squaresWithThree(n) {
  
  let count = 0; 
  for (let i = 1; i <= n; i++) {
    const square = i * i;
    if (square.toString().includes('3')) {
      count++;
    }
  }
  
  return count;
}

/**
 * Removes spaces, converts to uppercase, and adds double spaces between characters.
 * @param {string} s - The input string.
 * @returns {string} The transformed string.
 */
const spaceJam = (s) => s.replace(/ /g, '').toUpperCase().split('').join('  ');

/**
 * Checks if two strings are anagrams of each other.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {boolean} True if the strings are anagrams.
 */
const areAnagrams = (str1, str2) => {
  const normalize = (s) => s.toLowerCase().replace(/ /g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

/**
 * Decodes a string by reversing text within parentheses.
 * @param {string} s - The string to decode.
 * @returns {string} The decoded string.
 */
function decode(s) {
  while (s.includes('(')) {
    s = s.replace(/\([^()]*\)/g, (match) => {
      return match.slice(1, -1).split('').reverse().join('');
    });
  }
  return s;
}

/**
 * Finds the best laptop price within budget (prefers second most expensive).
 * @param {number[]} laptops - Array of laptop prices.
 * @param {number} budget - The budget limit.
 * @returns {number} The best laptop price or 0 if none available.
 */
function getLaptopCost(laptops, budget) {
  const unique = [...new Set(laptops)].sort((a, b) => b - a);
  
  if (unique.length >= 2 && unique[1] <= budget) {
    return unique[1];
  }
  
  for (const price of unique) {
    if (price <= budget) return price;
  }
  
  return 0;
}

/**
 * Decodes a Caesar cipher message with the given shift.
 * @param {string} message - The encoded message.
 * @param {number} shift - The shift amount to decode.
 * @returns {string} The decoded message.
 */
function decodeMessage(message, shift) {

  let decoded = '';
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shifted = ((code - 65 - shift + 26 * 100) % 26) + 65;
      decoded += String.fromCharCode(shifted);
    } else if (code >= 97 && code <= 122) {
      const shifted = ((code - 97 - shift + 26 * 100) % 26) + 97;
      decoded += String.fromCharCode(shifted);
    } else {
      decoded += char;
    }
  }
  return decoded;
}

/**
 * Finds all duplicate numbers in an array.
 * @param {number[]} arr - The array to check.
 * @returns {number[]} Sorted array of duplicate numbers.
 */
function findDuplicates(arr) {

  const counts = {};
  const duplicates = [];
  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;
  }
  for (const num in counts) {
    if (counts[num] > 1) {
      duplicates.push(Number(num));
    }
  }
  return duplicates.sort((a, b) => a - b);
}

module.exports = { generateHex, toCamelCase, sumOfSquares, fibonacciSequence, milePace, burnCandles, isUnnaturalPrime, jbelmu, evaluate, isBalanced, findTarget, battle, factorial, isValidNumber, squaresWithThree, spaceJam, areAnagrams, decode, getLaptopCost, decodeMessage, findDuplicates };