const { generateHex, toCamelCase, sumOfSquares, fibonacciSequence, milePace, burnCandles, isUnnaturalPrime, jbelmu, evaluate, isBalanced, findTarget, battle, factorial, isValidNumber, squaresWithThree, spaceJam, areAnagrams, decode, getLaptopCost, decodeMessage, findDuplicates } = require('./august');

describe('generateHex - basic tests', () => {
    test('invalid color input', () => {
        expect(generateHex("yellow")).toBe("Invalid color");
        expect(generateHex("purple")).toBe("Invalid color");
        expect(generateHex("orange")).toBe("Invalid color");
        expect(generateHex("")).toBe("Invalid color");
    });

    test('returns six-character string for red', () => {
        const result = generateHex("red");
        expect(result).toHaveLength(6);
    });

    test('returns six-character string for green', () => {
        const result = generateHex("green");
        expect(result).toHaveLength(6);
    });

    test('returns six-character string for blue', () => {
        const result = generateHex("blue");
        expect(result).toHaveLength(6);
    });

    test('returns valid hex color code', () => {
        const redHex = generateHex("red");
        const greenHex = generateHex("green");
        const blueHex = generateHex("blue");
        
        expect(redHex).toMatch(/^[0-9A-F]{6}$/);
        expect(greenHex).toMatch(/^[0-9A-F]{6}$/);
        expect(blueHex).toMatch(/^[0-9A-F]{6}$/);
    });
});

describe('generateHex - dominant color validation', () => {
    test('red should be dominant in red hex', () => {
        for (let i = 0; i < 10; i++) {
            const hex = generateHex("red");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            expect(r).toBeGreaterThan(g);
            expect(r).toBeGreaterThan(b);
        }
    });

    test('green should be dominant in green hex', () => {
        for (let i = 0; i < 10; i++) {
            const hex = generateHex("green");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            expect(g).toBeGreaterThan(r);
            expect(g).toBeGreaterThan(b);
        }
    });

    test('blue should be dominant in blue hex', () => {
        for (let i = 0; i < 10; i++) {
            const hex = generateHex("blue");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            expect(b).toBeGreaterThan(r);
            expect(b).toBeGreaterThan(g);
        }
    });
});

describe('generateHex - randomness tests', () => {
    test('calling generateHex("red") twice returns different values', () => {
        const results = new Set();
        for (let i = 0; i < 20; i++) {
            results.add(generateHex("red"));
        }
        expect(results.size).toBeGreaterThan(1);
    });

    test('calling generateHex("green") twice returns different values', () => {
        const results = new Set();
        for (let i = 0; i < 20; i++) {
            results.add(generateHex("green"));
        }
        expect(results.size).toBeGreaterThan(1);
    });

    test('calling generateHex("blue") twice returns different values', () => {
        const results = new Set();
        for (let i = 0; i < 20; i++) {
            results.add(generateHex("blue"));
        }
        expect(results.size).toBeGreaterThan(1);
    });
});

describe('generateHex - edge cases', () => {
    test('values are in valid hex range (00-FF)', () => {
        for (let i = 0; i < 10; i++) {
            const hex = generateHex("red");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            expect(r).toBeGreaterThanOrEqual(0);
            expect(r).toBeLessThanOrEqual(255);
            expect(g).toBeGreaterThanOrEqual(0);
            expect(g).toBeLessThanOrEqual(255);
            expect(b).toBeGreaterThanOrEqual(0);
            expect(b).toBeLessThanOrEqual(255);
        }
    });

    test('hex values are properly zero-padded', () => {
        // Run multiple times to increase chance of getting small values
        for (let i = 0; i < 20; i++) {
            const hex = generateHex("red");
            expect(hex).toHaveLength(6);
            expect(hex).toMatch(/^[0-9A-F]{6}$/);
        }
    });
});

describe('toCamelCase - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(toCamelCase("hello world")).toBe("helloWorld");
        expect(toCamelCase("HELLO WORLD")).toBe("helloWorld");
        expect(toCamelCase("secret agent-X")).toBe("secretAgentX");
        expect(toCamelCase("FREE cODE cAMP")).toBe("freeCodeCamp");
        expect(toCamelCase("ye old-_-sea  faring_buccaneer_-_with a - peg__leg----and a_parrot_ _named- _squawk")).toBe("yeOldSeaFaringBuccaneerWithAPegLegAndAParrotNamedSquawk");
    });

    test('simple space-separated words', () => {
        expect(toCamelCase("foo bar")).toBe("fooBar");
        expect(toCamelCase("one two three")).toBe("oneTwoThree");
    });

    test('dash-separated words', () => {
        expect(toCamelCase("foo-bar")).toBe("fooBar");
        expect(toCamelCase("one-two-three")).toBe("oneTwoThree");
    });

    test('underscore-separated words', () => {
        expect(toCamelCase("foo_bar")).toBe("fooBar");
        expect(toCamelCase("one_two_three")).toBe("oneTwoThree");
    });
});

describe('toCamelCase - mixed separators', () => {
    test('mixed separators', () => {
        expect(toCamelCase("foo-bar_baz qux")).toBe("fooBarBazQux");
        expect(toCamelCase("hello-world_test case")).toBe("helloWorldTestCase");
    });

    test('multiple consecutive separators', () => {
        expect(toCamelCase("hello---world")).toBe("helloWorld");
        expect(toCamelCase("foo___bar")).toBe("fooBar");
        expect(toCamelCase("test   case")).toBe("testCase");
    });

    test('mixed consecutive separators', () => {
        expect(toCamelCase("foo-_-bar")).toBe("fooBar");
        expect(toCamelCase("one _-_ two")).toBe("oneTwo");
    });
});

describe('toCamelCase - edge cases', () => {
    test('single word', () => {
        expect(toCamelCase("hello")).toBe("hello");
        expect(toCamelCase("WORLD")).toBe("world");
    });

    test('empty string', () => {
        expect(toCamelCase("")).toBe("");
    });

    test('only separators', () => {
        expect(toCamelCase("---")).toBe("");
        expect(toCamelCase("___")).toBe("");
        expect(toCamelCase("   ")).toBe("");
        expect(toCamelCase("-_ -_")).toBe("");
    });

    test('leading and trailing separators', () => {
        expect(toCamelCase("-hello-world-")).toBe("helloWorld");
        expect(toCamelCase("_foo_bar_")).toBe("fooBar");
        expect(toCamelCase(" test case ")).toBe("testCase");
    });

    test('preserves case in first word', () => {
        expect(toCamelCase("HELLO world")).toBe("helloWorld");
        expect(toCamelCase("HeLLo WoRLd")).toBe("helloWorld");
    });
});

describe('sumOfSquares - basic tests', () => {
  test('freecodecamp.org test cases', () => {
    expect(sumOfSquares(5)).toBe(55);
    expect(sumOfSquares(10)).toBe(385);
    expect(sumOfSquares(25)).toBe(5525);
    expect(sumOfSquares(500)).toBe(41791750);
    expect(sumOfSquares(1000)).toBe(333833500);
  });

  test('small numbers', () => {
    expect(sumOfSquares(1)).toBe(1);
    expect(sumOfSquares(2)).toBe(5);
    expect(sumOfSquares(3)).toBe(14);
    expect(sumOfSquares(4)).toBe(30);
  });

  test('verify calculation manually', () => {
    // 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14
    expect(sumOfSquares(3)).toBe(14);
    // 1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 1 + 4 + 9 + 16 + 25 = 55
    expect(sumOfSquares(5)).toBe(55);
  });
});

describe('sumOfSquares - edge cases', () => {
  test('powers of 10', () => {
    expect(sumOfSquares(10)).toBe(385);
    expect(sumOfSquares(100)).toBe(338350);
  });

  test('medium range numbers', () => {
    expect(sumOfSquares(50)).toBe(42925);
    expect(sumOfSquares(75)).toBe(143450);
    expect(sumOfSquares(150)).toBe(1136275);
  });

  test('larger numbers', () => {
    expect(sumOfSquares(200)).toBe(2686700);
    expect(sumOfSquares(750)).toBe(140906375);
  });

  test('mathematical property verification', () => {
    // Sum of squares from 1 to n = n(n+1)(2n+1)/6
    const n = 20;
    const expected = n * (n + 1) * (2 * n + 1) / 6;
    expect(sumOfSquares(n)).toBe(expected);
  });
});

describe('fibonacciSequence - basic tests', () => {
  test('freecodecamp.org test cases', () => {
    expect(fibonacciSequence([0, 1], 20)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]);
    expect(fibonacciSequence([21, 32], 1)).toEqual([21]);
    expect(fibonacciSequence([0, 1], 0)).toEqual([]);
    expect(fibonacciSequence([10, 20], 2)).toEqual([10, 20]);
    expect(fibonacciSequence([123456789, 987654321], 5)).toEqual([123456789, 987654321, 1111111110, 2098765431, 3209876541]);
  });

  test('standard fibonacci starting with 0, 1', () => {
    expect(fibonacciSequence([0, 1], 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(fibonacciSequence([0, 1], 5)).toEqual([0, 1, 1, 2, 3]);
  });

  test('fibonacci starting with 1, 1', () => {
    expect(fibonacciSequence([1, 1], 10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    expect(fibonacciSequence([1, 1], 5)).toEqual([1, 1, 2, 3, 5]);
  });

  test('length of 1', () => {
    expect(fibonacciSequence([0, 1], 1)).toEqual([0]);
    expect(fibonacciSequence([5, 10], 1)).toEqual([5]);
    expect(fibonacciSequence([100, 200], 1)).toEqual([100]);
  });

  test('length of 2', () => {
    expect(fibonacciSequence([0, 1], 2)).toEqual([0, 1]);
    expect(fibonacciSequence([5, 10], 2)).toEqual([5, 10]);
    expect(fibonacciSequence([100, 200], 2)).toEqual([100, 200]);
  });
});

describe('fibonacciSequence - edge cases', () => {
  test('empty sequence (length 0)', () => {
    expect(fibonacciSequence([0, 1], 0)).toEqual([]);
    expect(fibonacciSequence([100, 200], 0)).toEqual([]);
  });

  test('different starting values', () => {
    expect(fibonacciSequence([2, 3], 8)).toEqual([2, 3, 5, 8, 13, 21, 34, 55]);
    expect(fibonacciSequence([5, 5], 6)).toEqual([5, 5, 10, 15, 25, 40]);
    expect(fibonacciSequence([10, 15], 7)).toEqual([10, 15, 25, 40, 65, 105, 170]);
  });

  test('negative starting values', () => {
    expect(fibonacciSequence([-1, 1], 10)).toEqual([-1, 1, 0, 1, 1, 2, 3, 5, 8, 13]);
    expect(fibonacciSequence([-5, -3], 6)).toEqual([-5, -3, -8, -11, -19, -30]);
  });

  test('large numbers', () => {
    const result = fibonacciSequence([1000000, 2000000], 10);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe(1000000);
    expect(result[1]).toBe(2000000);
    expect(result[2]).toBe(3000000);
    expect(result[9]).toBe(89000000);
  });

  test('longer sequences', () => {
    const result = fibonacciSequence([0, 1], 30);
    expect(result).toHaveLength(30);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[29]).toBe(514229);
  });
});

describe('milePace - basic tests', () => {
  test('freecodecamp.org test cases', () => {
    expect(milePace(3, "24:00")).toBe("08:00");
    expect(milePace(1, "06:45")).toBe("06:45");
    expect(milePace(2, "07:00")).toBe("03:30");
    expect(milePace(26.2, "120:35")).toBe("04:36");
  });

  test('whole number miles with even division', () => {
    expect(milePace(5, "50:00")).toBe("10:00");
    expect(milePace(4, "40:00")).toBe("10:00");
    expect(milePace(10, "100:00")).toBe("10:00");
  });

  test('single mile', () => {
    expect(milePace(1, "08:00")).toBe("08:00");
    expect(milePace(1, "07:30")).toBe("07:30");
    expect(milePace(1, "05:45")).toBe("05:45");
  });

  test('fractional miles', () => {
    expect(milePace(0.5, "04:00")).toBe("08:00");
    expect(milePace(1.5, "12:00")).toBe("08:00");
    expect(milePace(2.5, "20:00")).toBe("08:00");
  });
});

describe('milePace - edge cases', () => {
  test('fast pace (under 5 minutes per mile)', () => {
    expect(milePace(5, "24:00")).toBe("04:48");
    expect(milePace(3, "14:00")).toBe("04:40");
  });

  test('slow pace (over 15 minutes per mile)', () => {
    expect(milePace(1, "18:30")).toBe("18:30");
    expect(milePace(2, "40:00")).toBe("20:00");
  });

  test('leading zeros in output', () => {
    expect(milePace(5, "42:30")).toBe("08:30");
    expect(milePace(10, "85:00")).toBe("08:30");
    expect(milePace(3, "28:00")).toBe("09:20");
  });

  test('seconds that need rounding', () => {
    expect(milePace(3, "25:00")).toBe("08:20");
    expect(milePace(7, "60:00")).toBe("08:34");
  });

  test('marathon distance (26.2 miles)', () => {
    expect(milePace(26.2, "180:00")).toBe("06:52");
    expect(milePace(26.2, "240:00")).toBe("09:10");
  });

  test('half marathon distance (13.1 miles)', () => {
    expect(milePace(13.1, "90:00")).toBe("06:52");
    expect(milePace(13.1, "120:00")).toBe("09:10");
  });

  test('very long durations', () => {
    expect(milePace(10, "200:00")).toBe("20:00");
    expect(milePace(5, "150:00")).toBe("30:00");
  });
});

describe('burnCandles - basic tests', () => {
  test('freecodecamp.org test cases', () => {
    expect(burnCandles(7, 2)).toBe(13);
    expect(burnCandles(10, 5)).toBe(12);
    expect(burnCandles(20, 3)).toBe(29);
    expect(burnCandles(17, 4)).toBe(22);
    expect(burnCandles(2345, 3)).toBe(3517);
  });

  test('example walkthrough (7, 2)', () => {
    // Start: 7 candles
    // Burn 7 → 7 leftovers
    // Make 3 new (6 leftovers used, 1 remains)
    // Burn 3 → 3 more leftovers (4 total)
    // Make 2 new (4 leftovers used)
    // Burn 2 → 2 leftovers
    // Make 1 new (2 leftovers used)
    // Burn 1
    // Total: 7 + 3 + 2 + 1 = 13
    expect(burnCandles(7, 2)).toBe(13);
  });

  test('small numbers', () => {
    expect(burnCandles(1, 2)).toBe(1); // Can't make any new candles
    expect(burnCandles(2, 2)).toBe(3); // 2 + 1 = 3
    expect(burnCandles(3, 2)).toBe(5); // 3 + 1 + 1 = 5
    expect(burnCandles(4, 2)).toBe(7); // 4 + 2 + 1 = 7
  });

  test('leftoversNeeded equals starting candles', () => {
    expect(burnCandles(5, 5)).toBe(6); // 5 + 1 = 6
    expect(burnCandles(10, 10)).toBe(11); // 10 + 1 = 11
  });
});

describe('burnCandles - edge cases', () => {
  test('leftoversNeeded of 3', () => {
    expect(burnCandles(9, 3)).toBe(13); // 9 + 3 + 1 = 13
    expect(burnCandles(15, 3)).toBe(22); // 15 + 5 + 2 = 22
    expect(burnCandles(30, 3)).toBe(44); // 30 + 10 + 3 + 1 = 44
  });

  test('leftoversNeeded of 4', () => {
    expect(burnCandles(8, 4)).toBe(10); // 8 + 2 = 10
    expect(burnCandles(12, 4)).toBe(15); // 12 + 3 = 15
    expect(burnCandles(16, 4)).toBe(21); // 16 + 4 + 1 = 21
  });

  test('not enough leftovers to make more', () => {
    expect(burnCandles(1, 2)).toBe(1);
    expect(burnCandles(2, 3)).toBe(2);
    expect(burnCandles(3, 4)).toBe(3);
  });

  test('larger numbers', () => {
    expect(burnCandles(100, 2)).toBe(199);
    expect(burnCandles(100, 3)).toBe(149);
    expect(burnCandles(100, 5)).toBe(124);
  });

  test('very large numbers', () => {
    expect(burnCandles(1000, 2)).toBe(1999);
    expect(burnCandles(1000, 3)).toBe(1499);
    expect(burnCandles(1000, 5)).toBe(1249);
  });

  test('mathematical pattern verification', () => {
    // With leftoversNeeded = 2, you basically double minus 1
    // 10 candles → 10 + 5 + 2 + 1 = 18 (not quite double)
    expect(burnCandles(10, 2)).toBe(19);
    
    // Verify the pattern holds
    expect(burnCandles(5, 2)).toBe(9);
    expect(burnCandles(6, 2)).toBe(11);
  });
});

describe('isUnnaturalPrime - freeCodeCamp tests', () => {
  test('should return false for 1', () => {
    expect(isUnnaturalPrime(1)).toBe(false);
  });

  test('should return false for -1', () => {
    expect(isUnnaturalPrime(-1)).toBe(false);
  });

  test('should return true for 19', () => {
    expect(isUnnaturalPrime(19)).toBe(true);
  });

  test('should return true for -23', () => {
    expect(isUnnaturalPrime(-23)).toBe(true);
  });

  test('should return false for 0', () => {
    expect(isUnnaturalPrime(0)).toBe(false);
  });

  test('should return true for 97', () => {
    expect(isUnnaturalPrime(97)).toBe(true);
  });

  test('should return true for -61', () => {
    expect(isUnnaturalPrime(-61)).toBe(true);
  });

  test('should return false for 99', () => {
    expect(isUnnaturalPrime(99)).toBe(false);
  });

  test('should return false for -44', () => {
    expect(isUnnaturalPrime(-44)).toBe(false);
  });
});

describe('isUnnaturalPrime - small primes and composites', () => {
  test('positive prime numbers', () => {
    expect(isUnnaturalPrime(2)).toBe(true);
    expect(isUnnaturalPrime(3)).toBe(true);
    expect(isUnnaturalPrime(5)).toBe(true);
    expect(isUnnaturalPrime(7)).toBe(true);
    expect(isUnnaturalPrime(11)).toBe(true);
    expect(isUnnaturalPrime(13)).toBe(true);
    expect(isUnnaturalPrime(17)).toBe(true);
  });

  test('negative prime numbers', () => {
    expect(isUnnaturalPrime(-2)).toBe(true);
    expect(isUnnaturalPrime(-3)).toBe(true);
    expect(isUnnaturalPrime(-5)).toBe(true);
    expect(isUnnaturalPrime(-7)).toBe(true);
    expect(isUnnaturalPrime(-11)).toBe(true);
    expect(isUnnaturalPrime(-13)).toBe(true);
    expect(isUnnaturalPrime(-17)).toBe(true);
  });

  test('positive composite numbers', () => {
    expect(isUnnaturalPrime(4)).toBe(false);
    expect(isUnnaturalPrime(6)).toBe(false);
    expect(isUnnaturalPrime(8)).toBe(false);
    expect(isUnnaturalPrime(9)).toBe(false);
    expect(isUnnaturalPrime(10)).toBe(false);
    expect(isUnnaturalPrime(12)).toBe(false);
    expect(isUnnaturalPrime(15)).toBe(false);
  });

  test('negative composite numbers', () => {
    expect(isUnnaturalPrime(-4)).toBe(false);
    expect(isUnnaturalPrime(-6)).toBe(false);
    expect(isUnnaturalPrime(-8)).toBe(false);
    expect(isUnnaturalPrime(-9)).toBe(false);
    expect(isUnnaturalPrime(-10)).toBe(false);
    expect(isUnnaturalPrime(-12)).toBe(false);
    expect(isUnnaturalPrime(-15)).toBe(false);
  });
});

describe('isUnnaturalPrime - larger numbers', () => {
  test('larger prime numbers', () => {
    expect(isUnnaturalPrime(29)).toBe(true);
    expect(isUnnaturalPrime(31)).toBe(true);
    expect(isUnnaturalPrime(37)).toBe(true);
    expect(isUnnaturalPrime(41)).toBe(true);
    expect(isUnnaturalPrime(43)).toBe(true);
    expect(isUnnaturalPrime(47)).toBe(true);
    expect(isUnnaturalPrime(53)).toBe(true);
  });

  test('larger negative prime numbers', () => {
    expect(isUnnaturalPrime(-29)).toBe(true);
    expect(isUnnaturalPrime(-31)).toBe(true);
    expect(isUnnaturalPrime(-37)).toBe(true);
    expect(isUnnaturalPrime(-41)).toBe(true);
    expect(isUnnaturalPrime(-43)).toBe(true);
    expect(isUnnaturalPrime(-47)).toBe(true);
    expect(isUnnaturalPrime(-53)).toBe(true);
  });

  test('larger composite numbers', () => {
    expect(isUnnaturalPrime(49)).toBe(false);
    expect(isUnnaturalPrime(51)).toBe(false);
    expect(isUnnaturalPrime(55)).toBe(false);
    expect(isUnnaturalPrime(57)).toBe(false);
    expect(isUnnaturalPrime(63)).toBe(false);
    expect(isUnnaturalPrime(65)).toBe(false);
    expect(isUnnaturalPrime(91)).toBe(false);
  });

  test('larger negative composite numbers', () => {
    expect(isUnnaturalPrime(-49)).toBe(false);
    expect(isUnnaturalPrime(-51)).toBe(false);
    expect(isUnnaturalPrime(-55)).toBe(false);
    expect(isUnnaturalPrime(-57)).toBe(false);
    expect(isUnnaturalPrime(-63)).toBe(false);
    expect(isUnnaturalPrime(-65)).toBe(false);
    expect(isUnnaturalPrime(-91)).toBe(false);
  });
});

describe('isUnnaturalPrime - edge cases', () => {
  test('even numbers greater than 2', () => {
    expect(isUnnaturalPrime(14)).toBe(false);
    expect(isUnnaturalPrime(16)).toBe(false);
    expect(isUnnaturalPrime(18)).toBe(false);
    expect(isUnnaturalPrime(20)).toBe(false);
    expect(isUnnaturalPrime(-14)).toBe(false);
    expect(isUnnaturalPrime(-16)).toBe(false);
    expect(isUnnaturalPrime(-18)).toBe(false);
    expect(isUnnaturalPrime(-20)).toBe(false);
  });

  test('three-digit primes', () => {
    expect(isUnnaturalPrime(101)).toBe(true);
    expect(isUnnaturalPrime(103)).toBe(true);
    expect(isUnnaturalPrime(107)).toBe(true);
    expect(isUnnaturalPrime(-101)).toBe(true);
    expect(isUnnaturalPrime(-103)).toBe(true);
    expect(isUnnaturalPrime(-107)).toBe(true);
  });
});

describe('jbelmu - freeCodeCamp tests', () => {
  test('should return "hello wlord" for "hello world"', () => {
    expect(jbelmu("hello world")).toBe("hello wlord");
  });

  test('should return "i love jbelmud text" for "i love jumbled text"', () => {
    expect(jbelmu("i love jumbled text")).toBe("i love jbelmud text");
  });

  test('long sentence test', () => {
    expect(jbelmu("freecodecamp is my favorite place to learn to code"))
      .toBe("faccdeeemorp is my faiortve pacle to laern to cdoe");
  });

  test('the quick brown fox sentence', () => {
    expect(jbelmu("the quick brown fox jumps over the lazy dog"))
      .toBe("the qciuk borwn fox jmpus oevr the lazy dog");
  });
});

describe('jbelmu - single word tests', () => {
  test('single letter word', () => {
    expect(jbelmu("a")).toBe("a");
    expect(jbelmu("i")).toBe("i");
  });

  test('two letter words', () => {
    expect(jbelmu("is")).toBe("is");
    expect(jbelmu("my")).toBe("my");
    expect(jbelmu("to")).toBe("to");
  });

  test('three letter words', () => {
    expect(jbelmu("the")).toBe("the");
    expect(jbelmu("fox")).toBe("fox");
    expect(jbelmu("dog")).toBe("dog");
  });

  test('words with sorted middle', () => {
    expect(jbelmu("abc")).toBe("abc");
    expect(jbelmu("abcd")).toBe("abcd");
    expect(jbelmu("abcde")).toBe("abcde");
  });
});

describe('jbelmu - word transformation tests', () => {
  test('words needing sorting', () => {
    expect(jbelmu("jumbled")).toBe("jbelmud");
    expect(jbelmu("world")).toBe("wlord");
    expect(jbelmu("quick")).toBe("qciuk");
    expect(jbelmu("brown")).toBe("borwn");
  });

  test('words with repeated letters', () => {
    expect(jbelmu("hello")).toBe("hello");
    expect(jbelmu("letter")).toBe("leettr");
    expect(jbelmu("better")).toBe("beettr");
  });

  test('longer words', () => {
    expect(jbelmu("freecodecamp")).toBe("faccdeeemorp");
    expect(jbelmu("favorite")).toBe("faiortve");
    expect(jbelmu("place")).toBe("pacle");
  });
});

describe('evaluate - freeCodeCamp tests', () => {
  test('[5, 6, 7, 8, 9] with ["+", "-"] should return 3', () => {
    expect(evaluate([5, 6, 7, 8, 9], ['+', '-'])).toBe(3);
  });

  test('[17, 61, 40, 24, 38, 14] with ["+", "%"] should return 38', () => {
    expect(evaluate([17, 61, 40, 24, 38, 14], ['+', '%'])).toBe(38);
  });

  test('[20, 2, 4, 24, 12, 3] with ["*", "/"] should return 60', () => {
    expect(evaluate([20, 2, 4, 24, 12, 3], ['*', '/'])).toBe(60);
  });

  test('[11, 4, 10, 17, 2] with ["*", "*", "%"] should return 30', () => {
    expect(evaluate([11, 4, 10, 17, 2], ['*', '*', '%'])).toBe(30);
  });

  test('[33, 11, 29, 13] with ["/", "-"] should return -2', () => {
    expect(evaluate([33, 11, 29, 13], ['/', '-'])).toBe(-2);
  });
});

describe('evaluate - single operator tests', () => {
  test('addition only', () => {
    expect(evaluate([1, 2, 3, 4], ['+'])).toBe(10);
    expect(evaluate([5, 10, 15], ['+'])).toBe(30);
  });

  test('subtraction only', () => {
    expect(evaluate([10, 2, 3], ['-'])).toBe(5);
    expect(evaluate([100, 25, 25, 25], ['-'])).toBe(25);
  });

  test('multiplication only', () => {
    expect(evaluate([2, 3, 4], ['*'])).toBe(24);
    expect(evaluate([5, 2, 2], ['*'])).toBe(20);
  });

  test('division only', () => {
    expect(evaluate([100, 2, 5], ['/'])).toBe(10);
    expect(evaluate([50, 5, 2], ['/'])).toBe(5);
  });

  test('modulo only', () => {
    expect(evaluate([10, 3, 2], ['%'])).toBe(1);
    expect(evaluate([20, 7, 3], ['%'])).toBe(0);
  });
});

describe('evaluate - mixed operator tests', () => {
  test('two different operators alternating', () => {
    expect(evaluate([1, 2, 3, 4, 5], ['+', '*'])).toBe(65);
    expect(evaluate([10, 5, 2, 3], ['-', '*'])).toBe(7);
  });

  test('three different operators cycling', () => {
    expect(evaluate([10, 2, 3, 4, 5], ['+', '-', '*'])).toBe(41);
    expect(evaluate([20, 4, 2, 3, 1], ['/', '+', '*'])).toBe(21);
  });

  test('operators cycle through array', () => {
    expect(evaluate([2, 3, 4, 5, 6, 7], ['+', '*'])).toBe(157);
    expect(evaluate([100, 10, 5, 2], ['/', '-'])).toBe(2);
  });
});

describe('evaluate - edge cases', () => {
  test('single number', () => {
    expect(evaluate([42], ['+'])).toBe(42);
    expect(evaluate([7], ['*'])).toBe(7);
  });

  test('two numbers', () => {
    expect(evaluate([5, 3], ['+'])).toBe(8);
    expect(evaluate([10, 2], ['-'])).toBe(8);
    expect(evaluate([4, 5], ['*'])).toBe(20);
    expect(evaluate([20, 4], ['/'])).toBe(5);
  });

  test('operations resulting in zero', () => {
    expect(evaluate([5, 5], ['-'])).toBe(0);
    expect(evaluate([10, 5, 2], ['-', '-'])).toBe(3);
  });

  test('operations with negative results', () => {
    expect(evaluate([5, 10], ['-'])).toBe(-5);
    expect(evaluate([1, 10, 20], ['-', '-'])).toBe(-29);
  });
});

describe('isBalanced - freeCodeCamp tests', () => {
  test('should return true for "racecar"', () => {
    expect(isBalanced("racecar")).toBe(true);
  });

  test('should return true for "Lorem Ipsum"', () => {
    expect(isBalanced("Lorem Ipsum")).toBe(true);
  });

  test('should return false for "Kitty Ipsum"', () => {
    expect(isBalanced("Kitty Ipsum")).toBe(false);
  });

  test('should return false for "string"', () => {
    expect(isBalanced("string")).toBe(false);
  });

  test('should return true for " "', () => {
    expect(isBalanced(" ")).toBe(true);
  });

  test('should return false for "abcdefghijklmnopqrstuvwxyz"', () => {
    expect(isBalanced("abcdefghijklmnopqrstuvwxyz")).toBe(false);
  });

  test('should return true for "123A#b!E&*456-o.U"', () => {
    expect(isBalanced("123A#b!E&*456-o.U")).toBe(true);
  });
});

describe('isBalanced - even length strings', () => {
  test('empty string', () => {
    expect(isBalanced("")).toBe(true);
  });

  test('two characters - balanced', () => {
    expect(isBalanced("ae")).toBe(true);
    expect(isBalanced("bc")).toBe(true);
  });

  test('two characters - unbalanced', () => {
    expect(isBalanced("ab")).toBe(false);
    expect(isBalanced("ba")).toBe(false);
  });

  test('four characters - balanced', () => {
    expect(isBalanced("aeio")).toBe(true);
    expect(isBalanced("bcdf")).toBe(true);
    expect(isBalanced("abed")).toBe(true);
  });

  test('four characters - unbalanced', () => {
    expect(isBalanced("aabc")).toBe(false);
    expect(isBalanced("bcae")).toBe(false);
  });
});

describe('isBalanced - odd length strings', () => {
  test('single character', () => {
    expect(isBalanced("a")).toBe(true);
    expect(isBalanced("b")).toBe(true);
  });

  test('three characters - balanced', () => {
    expect(isBalanced("axe")).toBe(true);
    expect(isBalanced("bcd")).toBe(true);
  });

  test('three characters - unbalanced', () => {
    expect(isBalanced("aeb")).toBe(false);
    expect(isBalanced("bea")).toBe(false);
  });

  test('five characters - balanced', () => {
    expect(isBalanced("axbxe")).toBe(true);
    expect(isBalanced("obxce")).toBe(true);
  });

  test('five characters - unbalanced', () => {
    expect(isBalanced("aaexb")).toBe(false);
    expect(isBalanced("bxaae")).toBe(false);
  });
});

describe('isBalanced - mixed case and special characters', () => {
  test('uppercase vowels', () => {
    expect(isBalanced("AEIO")).toBe(true);
    expect(isBalanced("AABB")).toBe(false);
  });

  test('mixed case', () => {
    expect(isBalanced("AaBbEe")).toBe(true);
    expect(isBalanced("AaaBbE")).toBe(false);
  });

  test('with spaces', () => {
    expect(isBalanced("a bc e")).toBe(true);
    expect(isBalanced("ae bc")).toBe(false);
  });

  test('with numbers', () => {
    expect(isBalanced("a1b2c3e4")).toBe(true);
    expect(isBalanced("a1b2e3f4")).toBe(true);
  });

  test('with special characters', () => {
    expect(isBalanced("a!@#$e%^&*i+o")).toBe(true);
    expect(isBalanced("a!@#e$%^")).toBe(true);
  });
});

describe('isBalanced - no vowels', () => {
  test('consonants only', () => {
    expect(isBalanced("bcdf")).toBe(true);
    expect(isBalanced("xyz")).toBe(true);
    expect(isBalanced("bcdfgh")).toBe(true);
  });

  test('numbers and special characters only', () => {
    expect(isBalanced("1234")).toBe(true);
    expect(isBalanced("!@#$%")).toBe(true);
  });
});

describe('isBalanced - all vowels', () => {
  test('even count of vowels', () => {
    expect(isBalanced("aeio")).toBe(true);
    expect(isBalanced("aeiou")).toBe(true);
  });

  test('odd count of vowels', () => {
    expect(isBalanced("aei")).toBe(true);
    expect(isBalanced("ae")).toBe(true);
  });
});

describe('findTarget - freeCodeCamp tests', () => {
  test('[2, 7, 11, 15], 9 should return [0, 1]', () => {
    expect(findTarget([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test('[3, 2, 4, 5], 6 should return [1, 2]', () => {
    expect(findTarget([3, 2, 4, 5], 6)).toEqual([1, 2]);
  });

  test('[1, 3, 5, 6, 7, 8], 15 should return [4, 5]', () => {
    expect(findTarget([1, 3, 5, 6, 7, 8], 15)).toEqual([4, 5]);
  });

  test('[1, 3, 5, 7], 14 should return "Target not found"', () => {
    expect(findTarget([1, 3, 5, 7], 14)).toBe("Target not found");
  });
});

describe('findTarget - basic cases', () => {
  test('two numbers at start', () => {
    expect(findTarget([1, 2, 3, 4], 3)).toEqual([0, 1]);
    expect(findTarget([5, 10, 15, 20], 15)).toEqual([0, 1]);
  });

  test('two numbers at end', () => {
    expect(findTarget([1, 2, 3, 4], 7)).toEqual([2, 3]);
    expect(findTarget([5, 10, 15, 20], 35)).toEqual([2, 3]);
  });

  test('first and last numbers', () => {
    expect(findTarget([1, 2, 3, 9], 10)).toEqual([0, 3]);
    expect(findTarget([5, 10, 15, 25], 30)).toEqual([0, 3]);
  });

  test('middle numbers', () => {
    expect(findTarget([1, 5, 10, 15, 20], 25)).toEqual([2, 3]);
    expect(findTarget([2, 4, 6, 8, 10], 14)).toEqual([2, 3]);
  });
});

describe('findTarget - negative numbers', () => {
  test('with negative numbers', () => {
    expect(findTarget([-1, 2, 3, 4], 1)).toEqual([0, 1]);
    expect(findTarget([-5, -2, 0, 3, 5], -7)).toEqual([0, 1]);
  });

  test('negative target', () => {
    expect(findTarget([-3, -1, 2, 4], -4)).toEqual([0, 1]);
    expect(findTarget([1, -5, -3, 2], -8)).toEqual([1, 2]);
  });

  test('all negative numbers', () => {
    expect(findTarget([-5, -4, -3, -2], -9)).toEqual([0, 1]);
    expect(findTarget([-10, -5, -3, -1], -4)).toEqual([2, 3]);
  });
});

describe('findTarget - edge cases', () => {
  test('target with zero', () => {
    expect(findTarget([0, 5, 10], 5)).toEqual([0, 1]);
    expect(findTarget([-5, 0, 5], 0)).toEqual([0, 2]);
  });

  test('duplicate values in array', () => {
    expect(findTarget([1, 2, 2, 3], 4)).toEqual([1, 2]);
    expect(findTarget([5, 5, 10], 10)).toEqual([0, 1]);
  });

  test('target is double of a value', () => {
    expect(findTarget([1, 2, 3, 4], 4)).toEqual([0, 2]);
    expect(findTarget([3, 5, 7, 10], 10)).toEqual([0, 2]);
  });

  test('large numbers', () => {
    expect(findTarget([100, 200, 300, 400], 500)).toEqual([1, 2]);
    expect(findTarget([1000, 2000, 3000], 5000)).toEqual([1, 2]);
  });
});

describe('findTarget - not found cases', () => {
  test('no valid pair exists', () => {
    expect(findTarget([1, 2, 3], 10)).toBe("Target not found");
    expect(findTarget([5, 10, 15], 30)).toBe("Target not found");
  });

  test('single element array', () => {
    expect(findTarget([5], 10)).toBe("Target not found");
    expect(findTarget([0], 0)).toBe("Target not found");
  });

  test('empty array', () => {
    expect(findTarget([], 10)).toBe("Target not found");
  });

  test('all same numbers but wrong target', () => {
    expect(findTarget([3, 3, 3, 3], 5)).toBe("Target not found");
  });
});

describe('battle - freeCodeCamp tests', () => {
  test('"Hello" vs "World" should return "We lost"', () => {
    expect(battle("Hello", "World")).toBe("We lost");
  });

  test('"pizza" vs "salad" should return "We won"', () => {
    expect(battle("pizza", "salad")).toBe("We won");
  });

  test('"C@T5" vs "D0G$" should return "We won"', () => {
    expect(battle("C@T5", "D0G$")).toBe("We won");
  });

  test('"kn!ght" vs "orc" should return "Opponent retreated"', () => {
    expect(battle("kn!ght", "orc")).toBe("Opponent retreated");
  });

  test('"PC" vs "Mac" should return "We retreated"', () => {
    expect(battle("PC", "Mac")).toBe("We retreated");
  });

  test('"Wizards" vs "Dragons" should return "It was a tie"', () => {
    expect(battle("Wizards", "Dragons")).toBe("It was a tie");
  });

  test('"Mr. Smith" vs "Dr. Jones" should return "It was a tie"', () => {
    expect(battle("Mr. Smith", "Dr. Jones")).toBe("It was a tie");
  });
});

describe('battle - retreat scenarios', () => {
  test('opponent retreated - my army larger', () => {
    expect(battle("abcd", "abc")).toBe("Opponent retreated");
    expect(battle("12345", "123")).toBe("Opponent retreated");
  });

  test('we retreated - opposing army larger', () => {
    expect(battle("abc", "abcd")).toBe("We retreated");
    expect(battle("123", "12345")).toBe("We retreated");
  });
});

describe('battle - lowercase letters', () => {
  test('we win with lowercase', () => {
    expect(battle("xyz", "abc")).toBe("We won");
    expect(battle("zzz", "aaa")).toBe("We won");
  });

  test('we lose with lowercase', () => {
    expect(battle("abc", "xyz")).toBe("We lost");
    expect(battle("aaa", "zzz")).toBe("We lost");
  });

  test('tie with lowercase', () => {
    expect(battle("abc", "abc")).toBe("It was a tie");
    expect(battle("xyz", "xyz")).toBe("It was a tie");
  });
});

describe('battle - uppercase letters', () => {
  test('we win with uppercase', () => {
    expect(battle("XYZ", "ABC")).toBe("We won");
    expect(battle("ZZZ", "AAA")).toBe("We won");
  });

  test('we lose with uppercase', () => {
    expect(battle("ABC", "XYZ")).toBe("We lost");
    expect(battle("AAA", "ZZZ")).toBe("We lost");
  });

  test('tie with uppercase', () => {
    expect(battle("ABC", "ABC")).toBe("It was a tie");
    expect(battle("XYZ", "XYZ")).toBe("It was a tie");
  });
});

describe('battle - mixed case', () => {
  test('uppercase beats lowercase', () => {
    expect(battle("Aa", "aa")).toBe("We won");
    expect(battle("Z", "z")).toBe("We won");
  });

  test('mixed case battles', () => {
    expect(battle("AaBb", "aAbB")).toBe("It was a tie");
    expect(battle("Hello", "World")).toBe("We lost");
  });
});

describe('battle - digits', () => {
  test('with digits', () => {
    expect(battle("999", "000")).toBe("We won");
    expect(battle("123", "456")).toBe("We lost");
  });

  test('digits vs letters', () => {
    expect(battle("9", "a")).toBe("We won");
    expect(battle("5", "z")).toBe("We lost");
  });

  test('mixed digits and letters', () => {
    expect(battle("a1b2", "z9y8")).toBe("We lost");
    expect(battle("z9z9", "a1a1")).toBe("We won");
  });
});

describe('battle - special characters', () => {
  test('special characters have zero strength', () => {
    expect(battle("a@b", "a!b")).toBe("It was a tie");
    expect(battle("@@@", "$$$")).toBe("It was a tie");
  });

  test('letters beat special characters', () => {
    expect(battle("abc", "@#$")).toBe("We won");
    expect(battle("@#$", "abc")).toBe("We lost");
  });

  test('digits beat special characters', () => {
    expect(battle("123", "!@#")).toBe("We won");
    expect(battle("!@#", "123")).toBe("We lost");
  });
});

describe('battle - edge cases', () => {
  test('empty strings', () => {
    expect(battle("", "")).toBe("It was a tie");
  });

  test('single character battles', () => {
    expect(battle("a", "b")).toBe("We lost");
    expect(battle("z", "a")).toBe("We won");
    expect(battle("x", "x")).toBe("It was a tie");
  });

  test('mixed wins and losses', () => {
    expect(battle("azaz", "zaaz")).toBe("It was a tie");
    expect(battle("abcd", "dcba")).toBe("It was a tie");
  });
});

describe('factorial - freeCodeCamp tests', () => {
  test('factorial(0) should return 1', () => {
    expect(factorial(0)).toBe(1);
  });

  test('factorial(5) should return 120', () => {
    expect(factorial(5)).toBe(120);
  });

  test('factorial(20) should return 2432902008176640000', () => {
    expect(factorial(20)).toBe(2432902008176640000);
  });
});

describe('factorial - small numbers', () => {
  test('factorial of 1', () => {
    expect(factorial(1)).toBe(1);
  });

  test('factorial of 2', () => {
    expect(factorial(2)).toBe(2);
  });

  test('factorial of 3', () => {
    expect(factorial(3)).toBe(6);
  });

  test('factorial of 4', () => {
    expect(factorial(4)).toBe(24);
  });
});

describe('factorial - medium numbers', () => {
  test('factorial of 6', () => {
    expect(factorial(6)).toBe(720);
  });

  test('factorial of 7', () => {
    expect(factorial(7)).toBe(5040);
  });

  test('factorial of 8', () => {
    expect(factorial(8)).toBe(40320);
  });

  test('factorial of 9', () => {
    expect(factorial(9)).toBe(362880);
  });

  test('factorial of 10', () => {
    expect(factorial(10)).toBe(3628800);
  });
});

describe('factorial - larger numbers', () => {
  test('factorial of 11', () => {
    expect(factorial(11)).toBe(39916800);
  });

  test('factorial of 12', () => {
    expect(factorial(12)).toBe(479001600);
  });

  test('factorial of 13', () => {
    expect(factorial(13)).toBe(6227020800);
  });

  test('factorial of 14', () => {
    expect(factorial(14)).toBe(87178291200);
  });

  test('factorial of 15', () => {
    expect(factorial(15)).toBe(1307674368000);
  });
});

describe('factorial - maximum range', () => {
  test('factorial of 16', () => {
    expect(factorial(16)).toBe(20922789888000);
  });

  test('factorial of 17', () => {
    expect(factorial(17)).toBe(355687428096000);
  });

  test('factorial of 18', () => {
    expect(factorial(18)).toBe(6402373705728000);
  });

  test('factorial of 19', () => {
    expect(factorial(19)).toBe(121645100408832000);
  });
});

describe('isValidNumber - base 2 tests', () => {
  test('"10101" in base 2 should return true', () => {
    expect(isValidNumber("10101", 2)).toBe(true);
  });

  test('"10201" in base 2 should return false', () => {
    expect(isValidNumber("10201", 2)).toBe(false);
  });

  test('valid binary numbers', () => {
    expect(isValidNumber("0", 2)).toBe(true);
    expect(isValidNumber("1", 2)).toBe(true);
    expect(isValidNumber("1111", 2)).toBe(true);
  });

  test('invalid binary numbers', () => {
    expect(isValidNumber("2", 2)).toBe(false);
    expect(isValidNumber("102", 2)).toBe(false);
  });
});

describe('isValidNumber - base 8 tests', () => {
  test('"76543210" in base 8 should return true', () => {
    expect(isValidNumber("76543210", 8)).toBe(true);
  });

  test('"9876543210" in base 8 should return false', () => {
    expect(isValidNumber("9876543210", 8)).toBe(false);
  });

  test('valid octal numbers', () => {
    expect(isValidNumber("0", 8)).toBe(true);
    expect(isValidNumber("7", 8)).toBe(true);
    expect(isValidNumber("777", 8)).toBe(true);
  });

  test('invalid octal numbers', () => {
    expect(isValidNumber("8", 8)).toBe(false);
    expect(isValidNumber("89", 8)).toBe(false);
  });
});

describe('isValidNumber - base 10 tests', () => {
  test('"9876543210" in base 10 should return true', () => {
    expect(isValidNumber("9876543210", 10)).toBe(true);
  });

  test('"ABC" in base 10 should return false', () => {
    expect(isValidNumber("ABC", 10)).toBe(false);
  });

  test('"abc" in base 10 should return false', () => {
    expect(isValidNumber("abc", 10)).toBe(false);
  });

  test('valid decimal numbers', () => {
    expect(isValidNumber("0", 10)).toBe(true);
    expect(isValidNumber("9", 10)).toBe(true);
    expect(isValidNumber("123456789", 10)).toBe(true);
  });

  test('invalid decimal numbers', () => {
    expect(isValidNumber("A", 10)).toBe(false);
    expect(isValidNumber("12A", 10)).toBe(false);
  });
});

describe('isValidNumber - base 16 tests', () => {
  test('"ABC" in base 16 should return true', () => {
    expect(isValidNumber("ABC", 16)).toBe(true);
  });

  test('"4B4BA9" in base 16 should return true', () => {
    expect(isValidNumber("4B4BA9", 16)).toBe(true);
  });

  test('"5G3F8F" in base 16 should return false', () => {
    expect(isValidNumber("5G3F8F", 16)).toBe(false);
  });

  test('"abc" in base 16 should return true', () => {
    expect(isValidNumber("abc", 16)).toBe(true);
  });

  test('"AbC" in base 16 should return true', () => {
    expect(isValidNumber("AbC", 16)).toBe(true);
  });

  test('valid hexadecimal numbers', () => {
    expect(isValidNumber("0", 16)).toBe(true);
    expect(isValidNumber("F", 16)).toBe(true);
    expect(isValidNumber("DEADBEEF", 16)).toBe(true);
    expect(isValidNumber("deadbeef", 16)).toBe(true);
  });

  test('invalid hexadecimal numbers', () => {
    expect(isValidNumber("G", 16)).toBe(false);
    expect(isValidNumber("XYZ", 16)).toBe(false);
  });
});

describe('isValidNumber - other bases', () => {
  test('"5G3F8F" in base 17 should return true', () => {
    expect(isValidNumber("5G3F8F", 17)).toBe(true);
  });

  test('"ABC" in base 20 should return true', () => {
    expect(isValidNumber("ABC", 20)).toBe(true);
  });

  test('"Z" in base 36 should return true', () => {
    expect(isValidNumber("Z", 36)).toBe(true);
  });

  test('"z" in base 36 should return true', () => {
    expect(isValidNumber("z", 36)).toBe(true);
  });

  test('base 36 - all letters valid', () => {
    expect(isValidNumber("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 36)).toBe(true);
    expect(isValidNumber("abcdefghijklmnopqrstuvwxyz", 36)).toBe(true);
  });

  test('base 20 - K is invalid', () => {
    expect(isValidNumber("J", 20)).toBe(true);
    expect(isValidNumber("K", 20)).toBe(false);
  });
});

describe('squaresWithThree - freeCodeCamp tests', () => {
  test('squaresWithThree(1) should return 0', () => {
    expect(squaresWithThree(1)).toBe(0);
  });

  test('squaresWithThree(10) should return 1', () => {
    expect(squaresWithThree(10)).toBe(1);
  });

  test('squaresWithThree(100) should return 19', () => {
    expect(squaresWithThree(100)).toBe(19);
  });

  test('squaresWithThree(1000) should return 326', () => {
    expect(squaresWithThree(1000)).toBe(326);
  });

  test('squaresWithThree(10000) should return 4531', () => {
    expect(squaresWithThree(10000)).toBe(4531);
  });
});

describe('squaresWithThree - small ranges', () => {
  test('numbers 1-5', () => {
    expect(squaresWithThree(2)).toBe(0);
    expect(squaresWithThree(3)).toBe(0);
    expect(squaresWithThree(4)).toBe(0);
    expect(squaresWithThree(5)).toBe(0);
  });

  test('includes 6 (6² = 36)', () => {
    expect(squaresWithThree(6)).toBe(1);
    expect(squaresWithThree(7)).toBe(1);
    expect(squaresWithThree(8)).toBe(1);
    expect(squaresWithThree(9)).toBe(1);
  });
});

describe('squaresWithThree - specific numbers', () => {
  test('numbers whose squares contain 3', () => {
    expect(squaresWithThree(20)).toBe(3);
    expect(squaresWithThree(30)).toBe(3);
    expect(squaresWithThree(50)).toBe(6);
  });

  test('larger ranges', () => {
    expect(squaresWithThree(200)).toBe(60);
    expect(squaresWithThree(500)).toBe(136);
  });
});

describe('squaresWithThree - edge cases', () => {
  test('boundary values', () => {
    expect(squaresWithThree(5)).toBe(0);
    expect(squaresWithThree(18)).toBe(2);
    expect(squaresWithThree(19)).toBe(3);
  });

  test('powers of 10', () => {
    expect(squaresWithThree(10)).toBe(1);
    expect(squaresWithThree(100)).toBe(19);
    expect(squaresWithThree(1000)).toBe(326);
  });
});

describe('spaceJam - freeCodeCamp tests', () => {
  test('"freeCodeCamp" should return "F  R  E  E  C  O  D  E  C  A  M  P"', () => {
    expect(spaceJam("freeCodeCamp")).toBe("F  R  E  E  C  O  D  E  C  A  M  P");
  });

  test('"   free   Code   Camp   " should return "F  R  E  E  C  O  D  E  C  A  M  P"', () => {
    expect(spaceJam("   free   Code   Camp   ")).toBe("F  R  E  E  C  O  D  E  C  A  M  P");
  });

  test('"Hello World?!" should return "H  E  L  L  O  W  O  R  L  D  ?  !"', () => {
    expect(spaceJam("Hello World?!")).toBe("H  E  L  L  O  W  O  R  L  D  ?  !");
  });

  test('"C@t$ & D0g$" should return "C  @  T  $  &  D  0  G  $"', () => {
    expect(spaceJam("C@t$ & D0g$")).toBe("C  @  T  $  &  D  0  G  $");
  });

  test('"allyourbase" should return "A  L  L  Y  O  U  R  B  A  S  E"', () => {
    expect(spaceJam("allyourbase")).toBe("A  L  L  Y  O  U  R  B  A  S  E");
  });
});

describe('spaceJam - simple strings', () => {
  test('single character', () => {
    expect(spaceJam("a")).toBe("A");
    expect(spaceJam("Z")).toBe("Z");
  });

  test('two characters', () => {
    expect(spaceJam("ab")).toBe("A  B");
    expect(spaceJam("XY")).toBe("X  Y");
  });

  test('lowercase to uppercase', () => {
    expect(spaceJam("abc")).toBe("A  B  C");
    expect(spaceJam("xyz")).toBe("X  Y  Z");
  });

  test('already uppercase', () => {
    expect(spaceJam("ABC")).toBe("A  B  C");
    expect(spaceJam("XYZ")).toBe("X  Y  Z");
  });
});

describe('spaceJam - spaces handling', () => {
  test('single spaces removed', () => {
    expect(spaceJam("a b c")).toBe("A  B  C");
    expect(spaceJam("hello world")).toBe("H  E  L  L  O  W  O  R  L  D");
  });

  test('multiple spaces removed', () => {
    expect(spaceJam("a  b  c")).toBe("A  B  C");
    expect(spaceJam("hello   world")).toBe("H  E  L  L  O  W  O  R  L  D");
  });

  test('leading and trailing spaces removed', () => {
    expect(spaceJam("  abc  ")).toBe("A  B  C");
    expect(spaceJam("   hello   ")).toBe("H  E  L  L  O");
  });
});

describe('spaceJam - special characters', () => {
  test('with numbers', () => {
    expect(spaceJam("a1b2c3")).toBe("A  1  B  2  C  3");
    expect(spaceJam("Test123")).toBe("T  E  S  T  1  2  3");
  });

  test('with punctuation', () => {
    expect(spaceJam("hello!")).toBe("H  E  L  L  O  !");
    expect(spaceJam("what?")).toBe("W  H  A  T  ?");
    expect(spaceJam("wow...")).toBe("W  O  W  .  .  .");
  });

  test('with symbols', () => {
    expect(spaceJam("a@b#c")).toBe("A  @  B  #  C");
    expect(spaceJam("$100")).toBe("$  1  0  0");
  });
});

describe('areAnagrams - freeCodeCamp tests', () => {
  test('"listen" and "silent" should return true', () => {
    expect(areAnagrams("listen", "silent")).toBe(true);
  });

  test('"School master" and "The classroom" should return true', () => {
    expect(areAnagrams("School master", "The classroom")).toBe(true);
  });

  test('"A gentleman" and "Elegant man" should return true', () => {
    expect(areAnagrams("A gentleman", "Elegant man")).toBe(true);
  });

  test('"Hello" and "World" should return false', () => {
    expect(areAnagrams("Hello", "World")).toBe(false);
  });

  test('"apple" and "banana" should return false', () => {
    expect(areAnagrams("apple", "banana")).toBe(false);
  });

  test('"cat" and "dog" should return false', () => {
    expect(areAnagrams("cat", "dog")).toBe(false);
  });
});

describe('areAnagrams - simple cases', () => {
  test('identical strings', () => {
    expect(areAnagrams("abc", "abc")).toBe(true);
    expect(areAnagrams("test", "test")).toBe(true);
  });

  test('simple anagrams', () => {
    expect(areAnagrams("abc", "bca")).toBe(true);
    expect(areAnagrams("abc", "cab")).toBe(true);
    expect(areAnagrams("dog", "god")).toBe(true);
  });

  test('not anagrams - different letters', () => {
    expect(areAnagrams("abc", "xyz")).toBe(false);
    expect(areAnagrams("hello", "world")).toBe(false);
  });

  test('not anagrams - different lengths', () => {
    expect(areAnagrams("abc", "abcd")).toBe(false);
    expect(areAnagrams("test", "testing")).toBe(false);
  });
});

describe('areAnagrams - case insensitive', () => {
  test('different cases', () => {
    expect(areAnagrams("ABC", "abc")).toBe(true);
    expect(areAnagrams("Listen", "Silent")).toBe(true);
    expect(areAnagrams("HELLO", "hello")).toBe(true);
  });

  test('mixed case anagrams', () => {
    expect(areAnagrams("AbC", "BcA")).toBe(true);
    expect(areAnagrams("TeSt", "StEt")).toBe(true);
  });
});

describe('areAnagrams - with spaces', () => {
  test('spaces ignored', () => {
    expect(areAnagrams("a b c", "abc")).toBe(true);
    expect(areAnagrams("hello world", "worldhello")).toBe(true);
  });

  test('multiple spaces', () => {
    expect(areAnagrams("a  b  c", "c b a")).toBe(true);
    expect(areAnagrams("test  string", "stringtest")).toBe(true);
  });

  test('leading and trailing spaces', () => {
    expect(areAnagrams("  abc  ", "cba")).toBe(true);
    expect(areAnagrams("test", "  test  ")).toBe(true);
  });
});

describe('areAnagrams - edge cases', () => {
  test('empty strings', () => {
    expect(areAnagrams("", "")).toBe(true);
  });

  test('single character', () => {
    expect(areAnagrams("a", "a")).toBe(true);
    expect(areAnagrams("a", "b")).toBe(false);
  });

  test('repeated characters', () => {
    expect(areAnagrams("aaa", "aaa")).toBe(true);
    expect(areAnagrams("aaa", "aab")).toBe(false);
  });
});

describe('decode - freeCodeCamp tests', () => {
  test('"(f(b(dc)e)a)" should return "abcdef"', () => {
    expect(decode("(f(b(dc)e)a)")).toBe("abcdef");
  });

  test('"((is?)(a(t d)h)e(n y( uo)r)aC)" should return "Can you read this?"', () => {
    expect(decode("((is?)(a(t d)h)e(n y( uo)r)aC)")).toBe("Can you read this?");
  });

  test('"f(Ce(re))o((e(aC)m)d)p" should return "freeCodeCamp"', () => {
    expect(decode("f(Ce(re))o((e(aC)m)d)p")).toBe("freeCodeCamp");
  });
});

describe('decode - simple cases', () => {
  test('no parentheses', () => {
    expect(decode("abc")).toBe("abc");
    expect(decode("hello")).toBe("hello");
  });

  test('single pair of parentheses', () => {
    expect(decode("(abc)")).toBe("cba");
    expect(decode("(hello)")).toBe("olleh");
  });

  test('parentheses at start', () => {
    expect(decode("(ab)cd")).toBe("bacd");
    expect(decode("(hello)world")).toBe("ollehworld");
  });

  test('parentheses at end', () => {
    expect(decode("ab(cd)")).toBe("abdc");
    expect(decode("hello(world)")).toBe("hellodlrow");
  });

  test('parentheses in middle', () => {
    expect(decode("a(bc)d")).toBe("acbd");
    expect(decode("hello(123)world")).toBe("hello321world");
  });
});

describe('decode - nested parentheses', () => {
  test('one level nesting', () => {
    expect(decode("(a(bc))")).toBe("bca");
    expect(decode("((ab)c)")).toBe("cab");
  });

  test('two level nesting', () => {
    expect(decode("(a(b(c)))")).toBe("bca");
    expect(decode("(((a)b)c)")).toBe("cab");
  });

  test('multiple nested groups', () => {
    expect(decode("(a(b)c(d))")).toBe("dcba");
    expect(decode("((ab)(cd))")).toBe("cdab");
  });
});

describe('decode - multiple parentheses groups', () => {
  test('two separate groups', () => {
    expect(decode("(ab)(cd)")).toBe("badc");
    expect(decode("(hello)(world)")).toBe("ollehdlrow");
  });

  test('three separate groups', () => {
    expect(decode("(a)(b)(c)")).toBe("abc");
    expect(decode("(ab)(cd)(ef)")).toBe("badcfe");
  });

  test('groups with text between', () => {
    expect(decode("(ab)x(cd)")).toBe("baxdc");
    expect(decode("a(bc)d(ef)g")).toBe("acbdfeg");
  });
});

describe('decode - edge cases', () => {
  test('empty string', () => {
    expect(decode("")).toBe("");
  });

  test('empty parentheses', () => {
    expect(decode("()")).toBe("");
    expect(decode("a()b")).toBe("ab");
  });

  test('single character in parentheses', () => {
    expect(decode("(a)")).toBe("a");
    expect(decode("x(y)z")).toBe("xyz");
  });

  test('with spaces', () => {
    expect(decode("(hello world)")).toBe("dlrow olleh");
    expect(decode("a (b c) d")).toBe("a c b d");
  });
});

describe('getLaptopCost - freeCodeCamp tests', () => {
  test('[1500, 2000, 1800, 1400], budget 1900 should return 1800', () => {
    expect(getLaptopCost([1500, 2000, 1800, 1400], 1900)).toBe(1800);
  });

  test('[1500, 2000, 2000, 1800, 1400], budget 1900 should return 1800', () => {
    expect(getLaptopCost([1500, 2000, 2000, 1800, 1400], 1900)).toBe(1800);
  });

  test('[2099, 1599, 1899, 1499], budget 2200 should return 1899', () => {
    expect(getLaptopCost([2099, 1599, 1899, 1499], 2200)).toBe(1899);
  });

  test('[2099, 1599, 1899, 1499], budget 1000 should return 0', () => {
    expect(getLaptopCost([2099, 1599, 1899, 1499], 1000)).toBe(0);
  });

  test('[1200, 1500, 1600, 1800, 1400, 2000], budget 1450 should return 1400', () => {
    expect(getLaptopCost([1200, 1500, 1600, 1800, 1400, 2000], 1450)).toBe(1400);
  });
});

describe('getLaptopCost - second most expensive within budget', () => {
  test('multiple laptops within budget', () => {
    expect(getLaptopCost([1000, 2000, 3000], 2500)).toBe(2000);
    expect(getLaptopCost([500, 1000, 1500, 2000], 1800)).toBe(1500);
  });

  test('all laptops within budget', () => {
    expect(getLaptopCost([100, 200, 300], 500)).toBe(200);
    expect(getLaptopCost([1000, 2000, 3000, 4000], 5000)).toBe(3000);
  });
});

describe('getLaptopCost - most expensive when only one within budget', () => {
  test('only one laptop within budget', () => {
    expect(getLaptopCost([1000, 2000, 3000], 1500)).toBe(1000);
    expect(getLaptopCost([500, 1500, 2000], 800)).toBe(500);
  });

  test('exactly at budget', () => {
    expect(getLaptopCost([1000, 2000, 3000], 1000)).toBe(1000);
    expect(getLaptopCost([500, 1000], 1000)).toBe(500);
  });
});

describe('getLaptopCost - no laptops within budget', () => {
  test('all laptops too expensive', () => {
    expect(getLaptopCost([2000, 3000, 4000], 1000)).toBe(0);
    expect(getLaptopCost([5000, 6000], 4000)).toBe(0);
  });

  test('budget is zero', () => {
    expect(getLaptopCost([1000, 2000], 0)).toBe(0);
  });
});

describe('getLaptopCost - duplicate handling', () => {
  test('duplicates ignored - returns second unique', () => {
    expect(getLaptopCost([1000, 1000, 2000], 2500)).toBe(1000);
    expect(getLaptopCost([1000, 2000, 2000, 3000], 3500)).toBe(2000);
  });

  test('all duplicates', () => {
    expect(getLaptopCost([1000, 1000, 1000], 1500)).toBe(1000);
    expect(getLaptopCost([2000, 2000], 2500)).toBe(2000);
  });

  test('multiple duplicates', () => {
    expect(getLaptopCost([1000, 1000, 2000, 2000, 3000, 3000], 3500)).toBe(2000);
  });
});

describe('getLaptopCost - edge cases', () => {
  test('single laptop within budget', () => {
    expect(getLaptopCost([1000], 1500)).toBe(1000);
    expect(getLaptopCost([500], 1000)).toBe(500);
  });

  test('single laptop outside budget', () => {
    expect(getLaptopCost([2000], 1000)).toBe(0);
  });

  test('two laptops - both within budget', () => {
    expect(getLaptopCost([1000, 2000], 2500)).toBe(1000);
  });

  test('two laptops - one within budget', () => {
    expect(getLaptopCost([1000, 2000], 1500)).toBe(1000);
  });

  test('unsorted prices', () => {
    expect(getLaptopCost([3000, 1000, 2000], 3500)).toBe(2000);
    expect(getLaptopCost([2000, 500, 1500, 1000], 1800)).toBe(1500);
  });
});

describe('decodeMessage - basic tests', () => {
  test('freeCodeCamp test cases', () => {
    expect(decodeMessage("Xlmw mw e wigvix qiwweki.", 4))
      .toBe("This is a secret message.");
    expect(decodeMessage("Byffi Qilfx!", 20))
      .toBe("Hello World!");
    expect(decodeMessage("Zqd xnt njzx?", -1))
      .toBe("Are you okay?");
    expect(decodeMessage("oannLxmnLjvy", 9))
      .toBe("freeCodeCamp");
  });

  test('single character shifts', () => {
    expect(decodeMessage("B", 1)).toBe("A");
    expect(decodeMessage("A", -1)).toBe("B");
    expect(decodeMessage("Z", 1)).toBe("Y");
    expect(decodeMessage("a", 1)).toBe("z");
    expect(decodeMessage("z", -1)).toBe("a");
  });
});

describe('decodeMessage - case sensitivity', () => {
  test('uppercase letters', () => {
    expect(decodeMessage("ABC", 1)).toBe("ZAB");
    expect(decodeMessage("XYZ", 3)).toBe("UVW");
    expect(decodeMessage("DEF", -1)).toBe("EFG");
  });

  test('lowercase letters', () => {
    expect(decodeMessage("abc", 1)).toBe("zab");
    expect(decodeMessage("xyz", 3)).toBe("uvw");
    expect(decodeMessage("def", -1)).toBe("efg");
  });

  test('mixed case preservation', () => {
    expect(decodeMessage("AbC", 1)).toBe("ZaB");
    expect(decodeMessage("XyZ", 2)).toBe("VwX");
  });
});

describe('decodeMessage - non-alphabetical characters', () => {
  test('numbers preserved', () => {
    expect(decodeMessage("123", 5)).toBe("123");
    expect(decodeMessage("Abc123", 1)).toBe("Zab123");
    expect(decodeMessage("0x9z8", 2)).toBe("0v9x8");
  });

  test('punctuation preserved', () => {
    expect(decodeMessage("Hello!", 1)).toBe("Gdkkn!");
    expect(decodeMessage("Yes?", 2)).toBe("Wcq?");
    expect(decodeMessage("A.B,C;D", 1)).toBe("Z.A,B;C");
  });

  test('spaces preserved', () => {
    expect(decodeMessage("A B C", 1)).toBe("Z A B");
    expect(decodeMessage("   ", 5)).toBe("   ");
  });

  test('special characters preserved', () => {
    expect(decodeMessage("@#$%", 10)).toBe("@#$%");
    expect(decodeMessage("A@B#C", 1)).toBe("Z@A#B");
  });
});

describe('decodeMessage - shift values', () => {
  test('zero shift', () => {
    expect(decodeMessage("Hello World", 0)).toBe("Hello World");
    expect(decodeMessage("ABC xyz 123", 0)).toBe("ABC xyz 123");
  });

  test('positive shift (forward decoding)', () => {
    expect(decodeMessage("CDE", 2)).toBe("ABC");
    expect(decodeMessage("BCD", 1)).toBe("ABC");
    expect(decodeMessage("FGH", 5)).toBe("ABC");
  });

  test('negative shift (backward decoding)', () => {
    expect(decodeMessage("ABC", -2)).toBe("CDE");
    expect(decodeMessage("ABC", -1)).toBe("BCD");
    expect(decodeMessage("ABC", -5)).toBe("FGH");
  });

  test('large positive shifts', () => {
    expect(decodeMessage("ABC", 26)).toBe("ABC");
    expect(decodeMessage("ABC", 27)).toBe("ZAB");
    expect(decodeMessage("ABC", 52)).toBe("ABC");
  });

  test('large negative shifts', () => {
    expect(decodeMessage("ABC", -26)).toBe("ABC");
    expect(decodeMessage("ABC", -27)).toBe("BCD");
    expect(decodeMessage("ABC", -52)).toBe("ABC");
  });
});

describe('decodeMessage - wrap around', () => {
  test('wrap around at alphabet boundaries', () => {
    expect(decodeMessage("ABC", 3)).toBe("XYZ");
    expect(decodeMessage("XYZ", -3)).toBe("ABC");
    expect(decodeMessage("ZZZ", 1)).toBe("YYY");
    expect(decodeMessage("AAA", -1)).toBe("BBB");
  });

  test('lowercase wrap around', () => {
    expect(decodeMessage("abc", 3)).toBe("xyz");
    expect(decodeMessage("xyz", -3)).toBe("abc");
    expect(decodeMessage("zzz", 1)).toBe("yyy");
    expect(decodeMessage("aaa", -1)).toBe("bbb");
  });
});

describe('decodeMessage - edge cases', () => {
  test('empty string', () => {
    expect(decodeMessage("", 5)).toBe("");
    expect(decodeMessage("", -5)).toBe("");
    expect(decodeMessage("", 0)).toBe("");
  });

  test('only non-alphabetical', () => {
    expect(decodeMessage("123!@#", 5)).toBe("123!@#");
    expect(decodeMessage("   ", 10)).toBe("   ");
  });

  test('complex messages', () => {
    expect(decodeMessage("Uryyb, Jbeyq!", 13))
      .toBe("Hello, World!");
    expect(decodeMessage("Gur dhvpx oebja sbk", 13))
      .toBe("The quick brown fox");
  });
});

describe('findDuplicates - basic tests', () => {
  test('freeCodeCamp test cases', () => {
    expect(findDuplicates([1, 2, 3, 4, 5])).toEqual([]);
    expect(findDuplicates([1, 2, 3, 4, 1, 2])).toEqual([1, 2]);
    expect(findDuplicates([2, 34, 0, 1, -6, 23, 5, 3, 2, 5, 67, -6,
      23, 2, 43, 2, 12, 0, 2, 4, 4])).toEqual([-6, 0, 2, 4, 5, 23]);
  });

  test('empty array', () => {
    expect(findDuplicates([])).toEqual([]);
  });

  test('single element', () => {
    expect(findDuplicates([1])).toEqual([]);
    expect(findDuplicates([5])).toEqual([]);
  });

  test('no duplicates', () => {
    expect(findDuplicates([1, 2, 3])).toEqual([]);
    expect(findDuplicates([10, 20, 30, 40])).toEqual([]);
    expect(findDuplicates([-1, -2, -3])).toEqual([]);
  });
});

describe('findDuplicates - duplicate patterns', () => {
  test('single duplicate', () => {
    expect(findDuplicates([1, 1])).toEqual([1]);
    expect(findDuplicates([5, 5])).toEqual([5]);
    expect(findDuplicates([1, 2, 3, 2])).toEqual([2]);
  });

  test('multiple duplicates', () => {
    expect(findDuplicates([1, 1, 2, 2])).toEqual([1, 2]);
    expect(findDuplicates([3, 1, 2, 3, 1])).toEqual([1, 3]);
    expect(findDuplicates([5, 4, 3, 2, 1, 5, 4, 3])).toEqual([3, 4, 5]);
  });

  test('all same values', () => {
    expect(findDuplicates([1, 1, 1])).toEqual([1]);
    expect(findDuplicates([7, 7, 7, 7, 7])).toEqual([7]);
  });

  test('multiple occurrences', () => {
    expect(findDuplicates([1, 1, 1, 1])).toEqual([1]);
    expect(findDuplicates([2, 2, 2, 3, 3, 3])).toEqual([2, 3]);
    expect(findDuplicates([5, 5, 5, 5, 5, 5])).toEqual([5]);
  });
});

describe('findDuplicates - negative numbers', () => {
  test('negative duplicates', () => {
    expect(findDuplicates([-1, -1])).toEqual([-1]);
    expect(findDuplicates([-5, -5, -3, -3])).toEqual([-5, -3]);
    expect(findDuplicates([-10, -20, -10])).toEqual([-10]);
  });

  test('mixed positive and negative', () => {
    expect(findDuplicates([1, -1, 1, -1])).toEqual([-1, 1]);
    expect(findDuplicates([5, -5, 5])).toEqual([5]);
    expect(findDuplicates([-3, 3, -3, 3])).toEqual([-3, 3]);
  });

  test('negative with zero', () => {
    expect(findDuplicates([0, 0, -1, -1])).toEqual([-1, 0]);
    expect(findDuplicates([-5, 0, -5, 0, 5])).toEqual([-5, 0]);
  });
});

describe('findDuplicates - sorting', () => {
  test('unsorted duplicates get sorted ascending', () => {
    expect(findDuplicates([5, 3, 5, 1, 3, 1])).toEqual([1, 3, 5]);
    expect(findDuplicates([10, 2, 10, 5, 5, 2])).toEqual([2, 5, 10]);
    expect(findDuplicates([100, 50, 75, 50, 100])).toEqual([50, 100]);
  });

  test('negative numbers sorted correctly', () => {
    expect(findDuplicates([-1, -5, -1, -5])).toEqual([-5, -1]);
    expect(findDuplicates([-10, -3, -7, -10, -3])).toEqual([-10, -3]);
  });

  test('mixed range sorted correctly', () => {
    expect(findDuplicates([10, -10, 0, 10, -10, 0]))
      .toEqual([-10, 0, 10]);
    expect(findDuplicates([5, -5, 0, 5, -5])).toEqual([-5, 5]);
  });
});

describe('findDuplicates - edge cases', () => {
  test('zeros', () => {
    expect(findDuplicates([0, 0])).toEqual([0]);
    expect(findDuplicates([0, 0, 0, 0])).toEqual([0]);
    expect(findDuplicates([0, 1, 0, 2])).toEqual([0]);
  });

  test('large numbers', () => {
    expect(findDuplicates([1000, 1000])).toEqual([1000]);
    expect(findDuplicates([999, 1000, 999])).toEqual([999]);
  });

  test('only one instance appears', () => {
    expect(findDuplicates([1, 1, 2, 3, 4])).toEqual([1]);
    expect(findDuplicates([5, 4, 3, 2, 2])).toEqual([2]);
  });

  test('complex mixed array', () => {
    expect(findDuplicates([7, -7, 0, 7, -7, 3, 3, 0]))
      .toEqual([-7, 0, 3, 7]);
    expect(findDuplicates([15, 8, 3, 15, 8, 3, 20, 1]))
      .toEqual([3, 8, 15]);
  });
});
