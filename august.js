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

function sumOfSquares(n) {
  return n * (n + 1) * (2 * n + 1) / 6;
}

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

function milePace(miles, duration) {

  const [minutes, seconds] = duration.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const paceSeconds = totalSeconds / miles;
  
  const paceMinutes = Math.floor(paceSeconds / 60);
  const paceRemainingSeconds = Math.round(paceSeconds % 60);
  
  return `${String(paceMinutes).padStart(2, '0')}:${String(paceRemainingSeconds).padStart(2, '0')}`;
}

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

function jbelmu(text) {
  return text.split(' ').map(word => {
    if (word.length <= 2) return word;
    const first = word[0];
    const last = word[word.length - 1];
    const middle = word.slice(1, -1).split('').sort().join('');
    return first + middle + last;
  }).join(' ');
}

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

function factorial(n) {

  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

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

function spaceJam(s) {
  return s.replace(/ /g, '').toUpperCase().split('').join('  ');
}

function areAnagrams(str1, str2) {
  const normalize = (s) => s.toLowerCase().replace(/ /g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

function decode(s) {
  while (s.includes('(')) {
    s = s.replace(/\([^()]*\)/g, (match) => {
      return match.slice(1, -1).split('').reverse().join('');
    });
  }
  return s;
}

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