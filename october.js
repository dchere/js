/**
 * Spookifies a string by replacing underscores and hyphens with tildes,
 * and alternating uppercase/lowercase for letters.
 * @param {string} boo - The string to spookify.
 * @returns {string} The spookified string.
 */
function spookify(boo) {
  let result = '';
  let letterCount = 0;
  for (let i = 0; i < boo.length; i++) {
    const char = boo[i];
    if (char === '_' || char === '-') {
      result += '~';
    } else {
      if (letterCount % 2 === 0) {
        result += char.toUpperCase();
      } else {
        result += char.toLowerCase();
      }
      letterCount++;
    }
  }
  return result;
}

/**
 * Converts a binary string to its decimal equivalent.
 * @param {string} binary - The binary string to convert.
 * @returns {number} The decimal value.
 */
function toDecimal(binary) {
  let decimal = 0;
  for (let i = 0; i < binary.length; i++) {
    const bit = binary[binary.length - 1 - i];
    if (bit === '1') {
      decimal += Math.pow(2, i);
    }
  }
  return decimal;
}

/**
 * Converts a decimal number to its binary representation.
 * @param {number} decimal - The decimal number to convert.
 * @returns {string} The binary representation.
 */
function toBinary(decimal) {
  if (decimal === 0) {
    return '0';
  }
  let binary = '';
  let num = decimal;
  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }
  return binary;
}

/**
 * Checks the strength of a password based on various criteria.
 * @param {string} password - The password to check.
 * @returns {string} 'weak', 'medium', or 'strong'.
 */
function checkStrength(password) {
  let count = 0;
  if (password.length >= 8) count++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) count++;
  if (/\d/.test(password)) count++;
  if (/[!@#$%^&*]/.test(password)) count++;
  if (count < 2) {
    return 'weak';
  } else if (count < 4) {
    return 'medium';
  } else {
    return 'strong';
  }
}

/**
 * Classifies a star by its temperature.
 * @param {number} temp - The star's temperature in Kelvin.
 * @returns {string} The star classification (O, B, A, F, G, K, or M).
 */
function classification(temp) {
  if (temp >= 30000) return 'O';
  if (temp >= 10000) return 'B';
  if (temp >= 7500) return 'A';
  if (temp >= 6000) return 'F';
  if (temp >= 5200) return 'G';
  if (temp >= 3700) return 'K';
  return 'M';
}

/**
 * Formats seconds into a time string (H:MM:SS or M:SS).
 * @param {number} seconds - The number of seconds.
 * @returns {string} The formatted time string.
 */
function format(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formattedSecs = String(secs).padStart(2, '0');
  if (hours > 0) {
    const formattedMins = String(minutes).padStart(2, '0');
    return `${hours}:${formattedMins}:${formattedSecs}`;
  } else {
    return `${minutes}:${formattedSecs}`;
  }
}

/**
 * Generates a sequence string from 1 to n.
 * @param {number} n - The upper limit of the sequence.
 * @returns {string} The concatenated sequence.
 */
function sequence(n) {
  let result = '';
  for (let i = 1; i <= n; i++) result += i;
  return result;
}

/**
 * Simulates browser navigation history.
 * @param {string[]} commands - Array of navigation commands.
 * @returns {string} The current page after executing all commands.
 */
function navigate(commands) {
  const history = ['Home'];
  let currentIndex = 0;
  for (const command of commands) {
    if (command.startsWith('Visit ')) {
      const page = command.substring(6);
      history.splice(currentIndex + 1);
      history.push(page);
      currentIndex++;
    } else if (command === 'Back') {
      if (currentIndex > 0) {
        currentIndex--;
      }
    } else if (command === 'Forward') {
      if (currentIndex < history.length - 1) {
        currentIndex++;
      }
    }
  }
  return history[currentIndex];
}

/**
 * Sorts email addresses by domain then by username.
 * @param {string[]} emails - Array of email addresses.
 * @returns {string[]} Sorted array of email addresses.
 */
function sort(emails) {
  return emails.slice().sort((a, b) => {
    const aParts = a.split('@');
    const bParts = b.split('@');
    const aDomain = aParts[1].toLowerCase();
    const bDomain = bParts[1].toLowerCase();
    const aUser = aParts[0].toLowerCase();
    const bUser = bParts[0].toLowerCase();
    if (aDomain !== bDomain) {
      return aDomain < bDomain ? -1 : 1;
    }
    if (aUser !== bUser) {
      return aUser < bUser ? -1 : 1;
    }
    return 0;
  });
}

/**
 * Finds the nth prime number.
 * @param {number} n - The position of the prime number to find.
 * @returns {number} The nth prime number.
 */
function nthPrime(n) {
  const primes = [];
  let candidate = 2;
  while (primes.length < n) {
    let isPrime = true;
    for (const prime of primes) {
      if (prime * prime > candidate) {
        break;
      }
      if (candidate % prime === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    candidate++;
  }
  return primes[n - 1];
}

/**
 * Determines if sensor readings indicate an exoplanet presence.
 * @param {string} readings - String of hexadecimal readings.
 * @returns {boolean} True if an exoplanet is detected.
 */
function hasExoplanet(readings) {
  const values = [];
  for (const char of readings) {
    if (char >= '0' && char <= '9') {
      values.push(parseInt(char));
    } else {
      values.push(char.charCodeAt(0) - 'A'.charCodeAt(0) + 10);
    }
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  const threshold = average * 0.8;
  for (const value of values) {
    if (value <= threshold) {
      return true;
    }
  }
  return false;
}

/**
 * Calculates message transmission time through satellite network.
 * @param {number[]} route - Array of distances between satellites.
 * @returns {number} Total transmission time.
 */
function sendMessage(route) {
  const speed = 300000;
  let totalTime = 0;
  for (const distance of route) {
    totalTime += distance / speed;
  }
  const satelliteCount = route.length - 1;
  const delay = satelliteCount * 0.5;
  totalTime += delay;
  const rounded = Math.round(totalTime * 10000) / 10000;
  let str = rounded.toFixed(4);
  str = str.replace(/0+$/, '');
  str = str.replace(/\.$/, '');
  return parseFloat(str);
}

/**
 * Finds the safest landing spot in a danger matrix.
 * @param {number[][]} matrix - 2D array representing danger levels.
 * @returns {number[]|null} Coordinates [row, col] of safest spot or null.
 */
function findLandingSpot(matrix) {
  let safestSpot = null;
  let lowestDanger = Infinity;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        let danger = 0;
        if (row > 0) danger += matrix[row - 1][col];
        if (row < matrix.length - 1) danger += matrix[row + 1][col];
        if (col > 0) danger += matrix[row][col - 1];
        if (col < matrix[row].length - 1) danger += matrix[row][col + 1];
        if (danger < lowestDanger) {
          lowestDanger = danger;
          safestSpot = [row, col];
        }
      }
    }
  }
  return safestSpot;
}

/**
 * Calculates the habitable zone range for a star.
 * @param {number} mass - The star's mass relative to the Sun.
 * @returns {number[]} Array with [start, end] distances of habitable zone.
 */
function goldilocksZone(mass) {
  const sqrtLuminosity = Math.sqrt(Math.pow(mass, 3.5));
  const start = +(0.01 * Math.round(0.95 * sqrtLuminosity * 100)).toFixed(2);
  const end =  +(0.01 * Math.round(1.37 * sqrtLuminosity * 100)).toFixed(2);
  return [start, end];
}

/**
 * Determines the moon phase for a given date.
 * @param {string} dateString - Date in string format.
 * @returns {string} 'New', 'Waxing', 'Full', or 'Waning'.
 */
function moonPhase(dateString) {
  const referenceDate = new Date('2000-01-06');
  const inputDate = new Date(dateString);
  const daysDiff = Math.floor((inputDate - referenceDate) / (1000 * 60 * 60 * 24));
  const dayInCycle = (daysDiff % 28) + 1;
  if (dayInCycle >= 1 && dayInCycle <= 7) return 'New';
  if (dayInCycle >= 8 && dayInCycle <= 14) return 'Waxing';
  if (dayInCycle >= 15 && dayInCycle <= 21) return 'Full';
  return 'Waning';
}

/**
 * Calculates total fuel needed for rocket launch including fuel mass.
 * @param {number} payload - Initial payload mass.
 * @returns {number} Total fuel required.
 */
function launchFuel(payload) {
  let totalFuel = 0;
  let currentMass = payload;
  while (currentMass >= 1) {
    const additionalFuel = currentMass / 5;
    totalFuel += additionalFuel;
    currentMass = additionalFuel;
  }
  return Math.round(totalFuel * 10) / 10;
}

/**
 * Converts a hexadecimal string to decimal.
 * @param {string} hex - The hexadecimal string (uppercase).
 * @returns {number} The decimal value.
 */
function hexToDecimal(hex) {
  let result = 0;
  for (let i = 0; i < hex.length; i++) {
    const char = hex[i];
    let value;
    if (char >= '0' && char <= '9') {
      value = parseInt(char);
    } else {
      value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    }
    result = result * 16 + value;
  }
  return result;
}

/**
 * Extracts HTML attributes from an element string.
 * @param {string} element - HTML element string.
 * @returns {string[]} Array of 'name, value' strings.
 */
function extractAttributes(element) {
  const regex = /([\w-]+)=\"([^\"]*)\"/g;
  const attributes = [];
  let match;
  while ((match = regex.exec(element)) !== null) {
    attributes.push(`${match[1]}, ${match[2]}`);
  }
  return attributes;
}

/**
 * Calculates tip amounts at 15%, 20%, and custom percentage.
 * @param {string} mealPrice - Price with $ prefix.
 * @param {string} customTip - Custom tip percentage.
 * @returns {string[]} Array of three tip amounts.
 */
function calculateTips(mealPrice, customTip) {
  const price = parseFloat(mealPrice.substring(1));
  const customPercent = parseInt(customTip);
  const tip15 = price * 0.15;
  const tip20 = price * 0.20;
  const tipCustom = price * (customPercent / 100);
  return [
    `$${tip15.toFixed(2)}`,
    `$${tip20.toFixed(2)}`,
    `$${tipCustom.toFixed(2)}`
  ];
}

/**
 * Calculates thermostat adjustment from current to target temperature.
 * @param {number} currentF - Current temperature in Fahrenheit.
 * @param {number} targetC - Target temperature in Celsius.
 * @returns {string} Adjustment instruction.
 */
function adjustThermostat(currentF, targetC) {
  const targetF = (targetC * 1.8) + 32;
  if (currentF === targetF) {
    return "Hold";
  } else if (currentF < targetF) {
    const diff = targetF - currentF;
    return `Heat: ${diff.toFixed(1)} degrees Fahrenheit`;
  } else {
    const diff = currentF - targetF;
    return `Cool: ${diff.toFixed(1)} degrees Fahrenheit`;
  }
}

/**
 * Transforms a sentence into Yoda-speak style.
 * @param {string} sentence - The sentence to transform.
 * @returns {string} The transformed sentence.
 */
function wiseSpeak(sentence) {
  const keywords = ["have", "must", "are", "will", "can"];
  const words = sentence.slice(0, -1).split(" ");
  const punctuation = sentence.slice(-1);
  let splitIndex = -1;
  for (let i = 0; i < words.length; i++) {
    if (keywords.includes(words[i].toLowerCase())) {
      splitIndex = i;
      break;
    }
  }
  const before = words.slice(0, splitIndex + 1);
  const after = words.slice(splitIndex + 1);
  const beforeLower = before.map(w => w.toLowerCase());
  after[0] = after[0].charAt(0).toUpperCase() + after[0].slice(1);
  return after.join(" ") + ", " + beforeLower.join(" ") + punctuation;
}

/**
 * Returns the top 2 most played songs from a playlist.
 * @param {Object[]} playlist - Array of song objects with title and plays.
 * @returns {string[]} Titles of the top 2 songs.
 */
function favoriteSongs(playlist) {
  const sorted = playlist.slice().sort((a, b) => b.plays - a.plays);
  return [sorted[0].title, sorted[1].title];
}

/**
 * Determines the result of diving at specific coordinates.
 * @param {string[][]} map - 2D array representing the dive map.
 * @param {number[]} coordinates - [row, col] position to dive.
 * @returns {string} 'Empty', 'Found', or 'Recovered'.
 */
function dive(map, coordinates) {
  const [row, col] = coordinates;
  const cell = map[row][col];
  if (cell === "-") return "Empty";
  let unfoundCount = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === "O") unfoundCount++;
    }
  }
  if (cell === "X") {
    return unfoundCount > 0 ? "Found" : "Recovered";
  }
  return unfoundCount === 1 ? "Recovered" : "Found";
}

/**
 * Returns the complementary DNA strand.
 * @param {string} strand - DNA strand (A, T, C, G).
 * @returns {string} Complementary DNA strand.
 */
function complementaryDNA(strand) {
  const complements = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'};
  let result = '';
  for (let i = 0; i < strand.length; i++) result += complements[strand[i]];
  return result;
}

/**
 * Calculates remaining sock pairs after wash cycles.
 * @param {number} pairs - Initial number of sock pairs.
 * @param {number} cycles - Number of wash cycles.
 * @returns {number} Number of complete pairs remaining.
 */
function sockPairs(pairs, cycles) {
  let totalSocks = pairs * 2;
  for (let i = 1; i <= cycles; i++) {
    if (i % 2 === 0) totalSocks--;
    if (i % 3 === 0) totalSocks++;
    if (i % 5 === 0) totalSocks--;
    if (i % 10 === 0) totalSocks += 2;
    if (totalSocks < 0) totalSocks = 0;
  }
  return Math.floor(totalSocks / 2);
}

/**
 * Masks a credit card number, showing only the last 4 digits.
 * @param {string} card - Credit card number with separators.
 * @returns {string} Masked card number.
 */
function mask(card) {
  let result = '';
  let digitCount = 0;
  for (let i = 0; i < card.length; i++) {
    const char = card[i];
    if (char >= '0' && char <= '9') digitCount++;
  }
  let digitsSeen = 0;
  for (let i = 0; i < card.length; i++) {
    const char = card[i];
    if (char >= '0' && char <= '9') {
      digitsSeen++;
      if (digitsSeen <= digitCount - 4) result += '*';
      else result += char;
    } else result += char;
  }
  return result;
}

/**
 * Validates an email address format.
 * @param {string} email - Email address to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validate(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  const dotError = local.includes('..') || domain.includes('..') ||
                   local.startsWith('.') || local.endsWith('.');
  if (!local || !domain || dotError) return false;
  const validChars = /^[a-zA-Z0-9._-]+$/.test(local);
  const hasDot = domain.includes('.');
  if (!validChars || !hasDot) return false;
  const tld = domain.slice(domain.lastIndexOf('.') + 1);
  return /^[a-zA-Z]{2,}$/.test(tld);
}

/**
 * Removes HTML tags from a string.
 * @param {string} html - HTML string.
 * @returns {string} Plain text content.
 */
function stripTags(html) {
  let result = '';
  let insideTag = false;
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === '<') {
      insideTag = true;
    } else if (char === '>') {
      insideTag = false;
    } else if (!insideTag) {
      result += char;
    }
  }
  return result;
}

/**
 * Counts overlapping occurrences of a pattern in text.
 * @param {string} text - The text to search in.
 * @param {string} pattern - The pattern to search for.
 * @returns {number} Number of occurrences.
 */
function count(text, pattern) {
  if (pattern.length === 0) return 0;
  let occurrences = 0;
  for (let i = 0; i <= text.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) occurrences++;
  }
  return occurrences;
}

/**
 * Converts 24-hour time format to 12-hour format.
 * @param {string} time - Time in HHMM format.
 * @returns {string} Time in 'H:MM AM/PM' format.
 */
function to12(time) {
  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2, 4);
  const period = hours >= 12 ? 'PM' : 'AM';
  let hour12 = hours % 12;
  if (hour12 === 0) hour12 = 12;
  return `${hour12}:${minutes} ${period}`;
}

/**
 * Battles two teams word by word based on letter values.
 * @param {string} ourTeam - Our team's sentence.
 * @param {string} opponent - Opponent's sentence.
 * @returns {string} 'We win', 'We lose', or 'Draw'.
 */
function battle(ourTeam, opponent) {
  const ourWords = ourTeam.split(' ');
  const oppWords = opponent.split(' ');
  let ourWins = 0;
  let oppWins = 0;
  for (let i = 0; i < ourWords.length; i++) {
    const ourValue = wordValue(ourWords[i]);
    const oppValue = wordValue(oppWords[i]);
    if (ourValue > oppValue) ourWins++;
    else if (oppValue > ourValue) oppWins++;
  }
  if (ourWins > oppWins) return 'We win';
  if (oppWins > ourWins) return 'We lose';
  return 'Draw';
}

/**
 * Calculates the value of a word based on letter values.
 * @param {string} word - The word to calculate.
 * @returns {number} The total value of the word.
 */
function wordValue(word) {
  let value = 0;
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (char >= 'a' && char <= 'z') {
      value += char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else if (char >= 'A' && char <= 'Z') {
      value += (char.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 2;
    }
  }
  return value;
}

module.exports = { spookify, toDecimal, toBinary, checkStrength, classification, format, sequence, navigate, sort, nthPrime, hasExoplanet, sendMessage, findLandingSpot, goldilocksZone, moonPhase, launchFuel, hexToDecimal, extractAttributes, calculateTips, adjustThermostat, wiseSpeak, favoriteSongs, dive, complementaryDNA, sockPairs, mask, validate, stripTags, count, to12, battle };