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

module.exports = { formatNumber, tribonacciSequence, getLongestWord, getHeadings, rgbToHex, isPangram, repeatVowels, isValidIPv4, rotate };

