const formatNumber = (number) => `+${number[0]} (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(7)}`;

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

const getHeadings = (csv) => csv.split(',').map(heading => heading.trim());

function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  const r = parseInt(match[0]).toString(16).padStart(2, '0');
  const g = parseInt(match[1]).toString(16).padStart(2, '0');
  const b = parseInt(match[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

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

function isMirror(str1, str2) {
  const letters1 = str1.split('').filter((c) =>
    (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')).join('');
  const letters2 = str2.split('').filter((c) =>
    (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')).join('');

  return letters1 === letters2.split('').reverse().join('');
}

function isPerfectSquare(n) {
  if (n < 0) {
    return false;
  }
  const sqrt = Math.sqrt(n);
  return sqrt === Math.floor(sqrt);
}


function secondLargest(arr) {
  const unique = [...new Set(arr)];
  unique.sort((a, b) => b - a);
  return unique[1];
}

function speeding(speeds, limit) {
  const speeders = speeds.filter((speed) => speed > limit);
  if (speeders.length === 0) {
    return [0, 0];
  }
  const totalExcess = speeders.reduce((sum, s) => sum + (s - limit), 0);
  const avgExcess = totalExcess / speeders.length;
  return [speeders.length, avgExcess];
}

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

function numberOfFiles(fileSize, fileUnit, driveSizeGb) {
  let fileSizeBytes = fileSize;
  if (fileUnit === 'KB') {
    fileSizeBytes *= 1000;
  } else if (fileUnit === 'MB') {
    fileSizeBytes *= 1000 * 1000;
  }

  return Math.floor(driveSizeGb * 1000 * 1000 * 1000 / fileSizeBytes);
}

const numberOfPhotos = (photoSizeMb, hardDriveSizeGb) => Math.floor(hardDriveSizeGb * 1000 / photoSizeMb);

function costToFill(tankSize, fuelLevel, pricePerGallon) {
  const cost = (tankSize - fuelLevel) * pricePerGallon;
  return '$' + cost.toFixed(2);
}

function generateSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '%20');
}

function capitalize(paragraph) {
  let result = paragraph.charAt(0).toUpperCase() + paragraph.slice(1);
  result = result.replace(/([.!?]+\s*)([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
  return result;
}

function adjustThermostat(temp, target) {
  if (temp < target) return 'heat';
  if (temp > target) return 'cool';
  return 'hold';
}

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

const reverseSentence = sentence => sentence.split(/\s+/).reverse().join(' ');

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