/**
 * Formats a 10-digit phone number string into international format.
 * @param {string} number - The 10-digit phone number string.
 * @returns {string} The formatted phone number.
 */
const formatNumber = (number) => `+${number[0]} (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(7)}`;

/**
 * Generates a Tribonacci sequence of specified length.
 * @param {number[]} startSequence - The first three numbers of the sequence.
 * @param {number} length - The desired length of the sequence.
 * @returns {number[]} The Tribonacci sequence.
 */
function tribonacciSequence(startSequence, length) {
  if (length === 0) return [];
  if (length === 1) return [startSequence[0]];
  if (length === 2) return [startSequence[0], startSequence[1]];
  if (length === 3) return startSequence;

  const sequence = [...startSequence];
  for (let i = 3; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2] + sequence[i - 3]);
  }
  return sequence;
}

/**
 * Returns the longest word in a sentence.
 * @param {string} sentence - The sentence to analyze.
 * @returns {string} The longest word.
 */
function getLongestWord(sentence) {
  const words = sentence.split(' ').map(word => word.replace(/\./g, ''));
  let longest = words[0];
  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  return longest;
}

/**
 * Extracts and trims headings from a CSV string.
 * @param {string} csv - The CSV string with headings.
 * @returns {string[]} Array of trimmed headings.
 */
const getHeadings = (csv) => csv.split(',').map(heading => heading.trim());

/**
 * Converts RGB color string to hexadecimal format.
 * @param {string} rgb - The RGB color string (e.g., 'rgb(255, 0, 0)').
 * @returns {string} The hexadecimal color code.
 */
function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  const r = parseInt(match[0]).toString(16).padStart(2, '0');
  const g = parseInt(match[1]).toString(16).padStart(2, '0');
  const b = parseInt(match[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

/**
 * Checks if a sentence is a pangram containing exactly the specified letters.
 * @param {string} sentence - The sentence to check.
 * @param {string} letters - The letters that should appear in the sentence.
 * @returns {boolean} True if the sentence is a pangram with the specified letters.
 */
function isPangram(sentence, letters) {
  const sentenceLetters = sentence.toLowerCase().replace(/[^a-z]/g, '');
  const uniqueSentenceLetters = new Set(sentenceLetters);
  const requiredLetters = new Set(letters);
  
  if (uniqueSentenceLetters.size !== requiredLetters.size) return false;
  
  for (const letter of requiredLetters) {
    if (!uniqueSentenceLetters.has(letter)) return false;
  }
  
  for (const letter of uniqueSentenceLetters) {
    if (!requiredLetters.has(letter)) return false;
  }
  
  return true;
}

/**
 * Repeats vowels in a string based on their occurrence count.
 * @param {string} str - The input string.
 * @returns {string} The string with vowels repeated.
 */
function repeatVowels(str) {
  let vowelCount = 0;
  let result = '';
  const vowels = 'aeiouAEIOU';
  
  for (let char of str) {
    if (vowels.includes(char)) {
      vowelCount++;
      result += char;
      result += char.toLowerCase().repeat(vowelCount - 1);
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Validates if a string is a valid IPv4 address.
 * @param {string} ipv4 - The IPv4 address string to validate.
 * @returns {boolean} True if the IPv4 address is valid.
 */
function isValidIPv4(ipv4) {
  const parts = ipv4.split('.');
  if (parts.length !== 4) return false;
  
  for (const part of parts) {
    if (part === '') return false;
    if (!/^\d+$/.test(part)) return false;
    if (part.length > 1 && part[0] === '0') return false;
    const num = parseInt(part, 10);
    if (num < 0 || num > 255) return false;
  }
  
  return true;
}

/**
 * Rotates a square matrix 90 degrees clockwise.
 * @param {number[][]} matrix - The square matrix to rotate.
 * @returns {number[][]} The rotated matrix.
 */
function rotate(matrix) {
  const n = matrix.length;
  const result = [];
  
  for (let col = 0; col < n; col++) {
    const newRow = [];
    for (let row = n - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }
    result.push(newRow);
  }
  
  return result;
}

/**
 * Calculates how many videos can fit on a drive.
 * @param {number} videoSize - The size of each video.
 * @param {string} videoUnit - The unit of video size (B, KB, MB, GB).
 * @param {number} driveSize - The size of the drive.
 * @param {string} driveUnit - The unit of drive size (GB, TB).
 * @returns {number|string} The number of videos that fit, or an error message.
 */
// eslint-disable-next-line max-params
function numberOfVideos(videoSize, videoUnit, driveSize, driveUnit) {
  const validVideoUnits = ['B', 'KB', 'MB', 'GB'];
  const validDriveUnits = ['GB', 'TB'];

  if (!validVideoUnits.includes(videoUnit)) return 'Invalid video unit';
  if (!validDriveUnits.includes(driveUnit)) return 'Invalid drive unit';

  const toBytes = {
    'B': 1,
    'KB': 1000,
    'MB': 1000000,
    'GB': 1000000000,
    'TB': 1000000000000,
  };

  const videoBytes = videoSize * toBytes[videoUnit];
  const driveBytes = driveSize * toBytes[driveUnit];

  return Math.floor(driveBytes / videoBytes);
}

/**
 * Determines if a string contains more digits, letters, or a tie.
 * @param {string} str - The string to analyze.
 * @returns {string} 'digits', 'letters', or 'tie'.
 */
function digitsOrLetters(str) {
  let digits = 0;
  let letters = 0;

  for (const char of str) {
    if (char >= '0' && char <= '9') {
      digits++;
    } else if ((char >= 'a' && char <= 'z') ||
               (char >= 'A' && char <= 'Z')) {
      letters++;
    }
  }

  if (digits > letters) return 'digits';
  if (letters > digits) return 'letters';
  return 'tie';
}

/**
 * Checks if two strings are mirrors of each other (ignoring non-letters).
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {boolean} True if the strings are mirrors.
 */
function isMirror(str1, str2) {
  const letters1 = str1.split('').filter((c) =>
    (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')).join('');
  const letters2 = str2.split('').filter((c) =>
    (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')).join('');

  return letters1 === letters2.split('').reverse().join('');
}

/**
 * Checks if a number is a perfect square.
 * @param {number} n - The number to check.
 * @returns {boolean} True if the number is a perfect square.
 */
function isPerfectSquare(n) {
  if (n < 0) {
    return false;
  }
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}

/**
 * Returns the second largest number in an array.
 * @param {number[]} arr - The array of numbers.
 * @returns {number} The second largest number.
 */
function secondLargest(arr) {
  const unique = [...new Set(arr)];
  unique.sort((a, b) => b - a);
  return unique[1];
}

/**
 * Analyzes speeding violations and calculates statistics.
 * @param {number[]} speeds - Array of vehicle speeds.
 * @param {number} limit - The speed limit.
 * @returns {number[]} Array with count of speeders and average excess speed.
 */
function speeding(speeds, limit) {
  const speeders = speeds.filter((speed) => speed > limit);
  if (speeders.length === 0) {
    return [0, 0];
  }
  const totalExcess = speeders.reduce((sum, s) => sum + (s - limit), 0);
  const avgExcess = totalExcess / speeders.length;
  return [speeders.length, avgExcess];
}

/**
 * Checks if a phone number is spam based on various criteria.
 * @param {string} number - The formatted phone number string.
 * @returns {boolean} True if the number is spam.
 */
function isSpam(number) {
  const match = number.match(/^\+(\d+) \((\d{3})\) (\d{3})-(\d{4})$/);
  const countryCode = match[1];
  const areaCode = parseInt(match[2], 10);
  const local1 = match[3];
  const local2 = match[4];

  // Criterion 1 or 2
  if (countryCode.length > 2 || countryCode[0] !== '0' ||
      areaCode > 900 || areaCode < 200) {
    return true;
  }

  // Criterion 3: sum of first 3 digits appears in last 4
  const sum = parseInt(local1[0], 10) + parseInt(local1[1], 10) +
    parseInt(local1[2], 10);

  // Criterion 3 or 4
  return local2.includes(sum.toString()) ||
    /(\d)\1{3,}/.test(number.replace(/[^0-9]/g, ''));
}

/**
 * Calculates how many files can fit on a drive.
 * @param {number} fileSize - The size of each file.
 * @param {string} fileUnit - The unit of file size (B, KB, MB).
 * @param {number} driveSizeGb - The drive size in gigabytes.
 * @returns {number} The number of files that fit.
 */
function numberOfFiles(fileSize, fileUnit, driveSizeGb) {
  let fileSizeBytes = fileSize;
  if (fileUnit === 'KB') {
    fileSizeBytes *= 1000;
  } else if (fileUnit === 'MB') {
    fileSizeBytes *= 1000 * 1000;
  }

  return Math.floor(driveSizeGb * 1000 * 1000 * 1000 / fileSizeBytes);
}

/**
 * Calculates how many photos can fit on a hard drive.
 * @param {number} photoSizeMb - The size of each photo in megabytes.
 * @param {number} hardDriveSizeGb - The hard drive size in gigabytes.
 * @returns {number} The number of photos that fit.
 */
const numberOfPhotos = (photoSizeMb, hardDriveSizeGb) => Math.floor(hardDriveSizeGb * 1000 / photoSizeMb);

/**
 * Calculates the cost to fill a fuel tank.
 * @param {number} tankSize - The total tank size in gallons.
 * @param {number} fuelLevel - The current fuel level in gallons.
 * @param {number} pricePerGallon - The price per gallon.
 * @returns {string} The cost formatted as a dollar amount.
 */
function costToFill(tankSize, fuelLevel, pricePerGallon) {
  const cost = (tankSize - fuelLevel) * pricePerGallon;
  return '$' + cost.toFixed(2);
}

/**
 * Generates a URL slug from a string.
 * @param {string} str - The string to convert to a slug.
 * @returns {string} The URL slug.
 */
function generateSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '%20');
}

/**
 * Capitalizes the first letter of each sentence in a paragraph.
 * @param {string} paragraph - The paragraph to capitalize.
 * @returns {string} The paragraph with capitalized sentences.
 */
function capitalize(paragraph) {
  let result = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
  result = result.replace(/([.!?]+\s*)([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
  return result;
}

/**
 * Determines thermostat action based on current and target temperatures.
 * @param {number} temp - The current temperature.
 * @param {number} target - The target temperature.
 * @returns {string} 'heat', 'cool', or 'hold'.
 */
function adjustThermostat(temp, target) {
  if (temp < target) return 'heat';
  if (temp > target) return 'cool';
  return 'hold';
}

/**
 * Returns the top 3 most frequent words in a paragraph.
 * @param {string} paragraph - The paragraph to analyze.
 * @returns {string[]} Array of the top 3 most frequent words.
 */
function getWords(paragraph) {
  const cleaned = paragraph.toLowerCase().replace(/[.,!]/g, '');
  const words = cleaned.split(/\s+/).filter(word => word.length > 0);
  const freq = {};
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 3).map(entry => entry[0]);
}

/**
 * Parses a Roman numeral string and returns its integer value.
 * @param {string} numeral - The Roman numeral to parse.
 * @returns {number} The integer value of the Roman numeral.
 */
function parseRomanNumeral(numeral) {
  const values = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000};
  let total = 0;
  for (let i = 0; i < numeral.length; i++) {
    const current = values[numeral[i]];
    const next = values[numeral[i + 1]];
    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }
  return total;
}

/**
 * Builds an acronym from a string, skipping common words.
 * @param {string} str - The string to convert to an acronym.
 * @returns {string} The acronym.
 */
function buildAcronym(str) {
  const skipWords = ['a', 'for', 'an', 'and', 'by', 'of'];
  const words = str.split(' ');
  let acronym = '';
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (i === 0 || !skipWords.includes(word.toLowerCase())) {
      acronym += word[0].toUpperCase();
    }
  }
  return acronym;
}

/**
 * Checks if all characters in a string are unique.
 * @param {string} str - The string to check.
 * @returns {boolean} True if all characters are unique.
 */
function allUnique(str) {
  const seen = new Set();
  for (const char of str) {
    if (seen.has(char)) {
      return false;
    }
    seen.add(char);
  }
  return true;
}

/**
 * Returns the symmetric difference between two arrays.
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {Array} The sorted symmetric difference.
 */
function arrayDiff(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const diff = [];
  for (const item of set1) {
    if (!set2.has(item)) {
      diff.push(item);
    }
  }
  for (const item of set2) {
    if (!set1.has(item)) {
      diff.push(item);
    }
  }
  return diff.sort();
}

/**
 * Reverses the order of words in a sentence.
 * @param {string} sentence - The sentence to reverse.
 * @returns {string} The sentence with words in reverse order.
 */
const reverseSentence = sentence => sentence.split(/\s+/).reverse().join(' ');

/**
 * Checks if screen time exceeds healthy limits.
 * @param {number[]} hours - Array of daily screen time hours.
 * @returns {boolean} True if screen time is excessive.
 */
function tooMuchScreenTime(hours) {
  for (const day of hours) {
    if (day >= 10) return true;
  }
  for (let i = 0; i < hours.length - 2; i++) {
    if ((hours[i] + hours[i + 1] + hours[i + 2]) / 3 >= 8) return true;
  }
  const avg = hours.reduce((sum, h) => sum + h, 0) / hours.length;
  return avg >= 6;
}

/**
 * Finds all missing numbers in a sequence from 1 to max.
 * @param {number[]} arr - The array of numbers.
 * @returns {number[]} Array of missing numbers.
 */
function findMissingNumbers(arr) {
  if (arr.length === 0) return [];
  const max = Math.max(...arr);
  const present = new Set(arr);
  const missing = [];
  for (let i = 1; i <= max; i++) {
    if (!present.has(i)) {
      missing.push(i);
    }
  }
  return missing;
}

module.exports = { formatNumber, tribonacciSequence, getLongestWord, getHeadings, rgbToHex, isPangram, repeatVowels, isValidIPv4, rotate, numberOfVideos, digitsOrLetters, isMirror, isPerfectSquare, secondLargest, speeding, isSpam, numberOfFiles, numberOfPhotos, costToFill, generateSlug, capitalize, adjustThermostat, getWords, parseRomanNumeral, buildAcronym, allUnique, arrayDiff, reverseSentence, tooMuchScreenTime, findMissingNumbers };