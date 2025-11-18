const { countDifferences, isMatch, oneHundred, countRectangles, verify, canPost, gcd } = require('./november');

describe('isMatch', () => {
    test('freecodecamp.org test cases', () => {
        expect(isMatch("helloworld", "helloworld")).toBe(true);
        expect(isMatch("helloworld", "helloworlds")).toBe(false);
        expect(isMatch("helloworld", "jelloworld")).toBe(true);
        expect(isMatch("thequickbrownfoxjumpsoverthelazydog", "thequickbrownfoxjumpsoverthelazydog")).toBe(true);
        expect(isMatch("theslickbrownfoxjumpsoverthelazydog", "thequickbrownfoxjumpsoverthehazydog")).toBe(true);
        expect(isMatch("thequickbrownfoxjumpsoverthelazydog", "thequickbrownfoxjumpsoverthehazycat")).toBe(false);
    });

    test('edge cases', () => {
        expect(isMatch("", "")).toBe(true);
        expect(isMatch("hello", "")).toBe(false);
        expect(isMatch("", "hello")).toBe(false);
        expect(isMatch("a", "a")).toBe(true);
        expect(isMatch("a", "b")).toBe(false);
        // length=10, 1 diffs: 10*1=10 <= 10 (true)
        expect(isMatch("abcdefghij", "abcdefghik")).toBe(true);
        // length=10, 2 diffs: 10*2=20 <= 10 (false)
        expect(isMatch("abcdefghij", "abcdefghkl")).toBe(false);
        // length=20, 2 diffs: 10*2=20 <= 20 (true)
        expect(isMatch("abcdefghijklmnopqrst", "abcdefghijklmnopqr12")).toBe(true);
        // length=20, 3 diffs: 10*3=30 <= 20 (false)
        expect(isMatch("abcdefghijklmnopqrst", "abcdefghijklmnopq123")).toBe(false);
        // should accept exactly 10% difference (100 chars, 10 diffs)
        expect(isMatch("a".repeat(100), "b".repeat(10) + "a".repeat(90))).toBe(true);
        // should reject just over 10% difference (100 chars, 11 diffs)
        expect(isMatch("a".repeat(100), "b".repeat(11) + "a".repeat(89))).toBe(false);
    });
});

describe('countDifferences', () => {
    describe('basic functionality', () => {
        // should return 0 for identical strings
        expect(countDifferences("hello", "hello")).toBe(0);
        // should count single character difference
        expect(countDifferences("helloworld", "jelloworld")).toBe(1);
        // should count multiple character differences
        expect(countDifferences("abc", "xyz")).toBe(3);
    });

    describe('edge cases', () => {
        // should handle empty strings
        expect(countDifferences("", "")).toBe(0);
        // should handle single character strings
        expect(countDifferences("a", "a")).toBe(0);
        expect(countDifferences("a", "b")).toBe(1);
        // should count all differences when all characters differ
        expect(countDifferences("aaaa", "bbbb")).toBe(4);
        // should count differences at beginning
        expect(countDifferences("xyzabc", "123abc")).toBe(3);
        // should count differences at end
        expect(countDifferences("abcxyz", "abc123")).toBe(3);
        // should count differences in middle
        expect(countDifferences("abXYZcd", "ab123cd")).toBe(3);
        // should count scattered differences
        expect(countDifferences("a1b2c3", "aXbYcZ")).toBe(3);
    });
});

describe('oneHundred', () => {
    test('freecodecamp.org test cases', () => {
        expect(oneHundred("One hundred ")).toBe("One hundred One hundred One hundred One hundred One hundred One hundred One hundred One hundred One ");
        expect(oneHundred("freeCodeCamp ")).toBe("freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeCamp freeCodeC");
        expect(oneHundred("daily challenges ")).toBe("daily challenges daily challenges daily challenges daily challenges daily challenges daily challenge");
        expect(oneHundred("!")).toBe("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    });

    test('patterns that divide evenly into 100', () => {
        expect(oneHundred("abcde")).toBe("abcde".repeat(20));
        expect(oneHundred("0123456789")).toBe("0123456789".repeat(10));
        expect(oneHundred("a".repeat(20))).toBe("a".repeat(100));
        expect(oneHundred("x".repeat(25))).toBe("x".repeat(100));
    });

    test('string already 100 characters', () => {
        const str100 = "a".repeat(100);
        expect(oneHundred(str100)).toBe(str100);
        expect(oneHundred(str100).length).toBe(100);
    });

    test('string longer than 100 characters', () => {
        const str150 = "a".repeat(150);
        expect(oneHundred(str150)).toBe("a".repeat(100));
        expect(oneHundred(str150).length).toBe(100);
    });

    test('edge case with 99 and 101 character strings', () => {
        const pattern99 = "a".repeat(99);
        const result = oneHundred(pattern99);
        expect(result.length).toBe(100);
        expect(result).toBe(pattern99 + "a");
        
        const pattern101 = "a".repeat(101);
        expect(oneHundred(pattern101)).toBe("a".repeat(100));
    });
});

describe('countRectangles', () => {
    test('freecodecamp.org test cases', () => {
        expect(countRectangles(1, 3)).toBe(6);
        expect(countRectangles(3, 2)).toBe(18);
        expect(countRectangles(1, 2)).toBe(3);
        expect(countRectangles(5, 4)).toBe(150);
        expect(countRectangles(11, 19)).toBe(12540);
    });

    test('small grids', () => {
        expect(countRectangles(1, 1)).toBe(1);
        expect(countRectangles(2, 2)).toBe(9);
    });

    test('square grids', () => {
        expect(countRectangles(3, 3)).toBe(36);
        expect(countRectangles(4, 4)).toBe(100);
        expect(countRectangles(5, 5)).toBe(225);
        expect(countRectangles(10, 10)).toBe(3025);
    });

    test('commutative property', () => {
        expect(countRectangles(3, 5)).toBe(countRectangles(5, 3));
        expect(countRectangles(7, 11)).toBe(countRectangles(11, 7));
        expect(countRectangles(2, 8)).toBe(countRectangles(8, 2));
    });
});

describe('countRectangles - rectangular grids', () => {
    test('single row grids', () => {
        expect(countRectangles(1, 5)).toBe(15);
        expect(countRectangles(1, 10)).toBe(55);
    });

    test('2xN grids', () => {
        expect(countRectangles(2, 3)).toBe(18);
        expect(countRectangles(2, 5)).toBe(45);
    });

    test('single column grids', () => {
        expect(countRectangles(5, 1)).toBe(15);
        expect(countRectangles(10, 1)).toBe(55);
    });

    test('larger grids', () => {
        expect(countRectangles(6, 7)).toBe(588);
        expect(countRectangles(8, 9)).toBe(1620);
        expect(countRectangles(12, 15)).toBe(9360);
        expect(countRectangles(20, 20)).toBe(44100);
    });
});

describe('verify', () => {
    test('freecodecamp.org test cases', () => {
        expect(verify("foo", "bar", 57)).toBe(true);
        expect(verify("foo", "bar", 54)).toBe(false);
        expect(verify("freeCodeCamp", "Rocks", 238)).toBe(true);
        expect(verify("Is this valid?", "No", 210)).toBe(false);
        expect(verify("Is this valid?", "Yes", 233)).toBe(true);
        expect(verify("Check out the freeCodeCamp podcast,", "in the mobile app", 514)).toBe(true);
    });

    test('empty strings', () => {
        expect(verify("", "", 0)).toBe(true);
        expect(verify("", "", 1)).toBe(false);
    });

    test('single lowercase characters', () => {
        expect(verify("a", "", 1)).toBe(true);
        expect(verify("", "a", 1)).toBe(true);
        expect(verify("a", "b", 3)).toBe(true);
        expect(verify("z", "", 26)).toBe(true);
    });

    test('single uppercase characters', () => {
        expect(verify("A", "", 27)).toBe(true);
        expect(verify("Z", "", 52)).toBe(true);
        expect(verify("A", "a", 28)).toBe(true);
    });

    test('non-letter characters ignored', () => {
        expect(verify("123", "456", 0)).toBe(true);
        expect(verify("a1b2", "c3", 6)).toBe(true);
        expect(verify("hello!", "world?", 124)).toBe(true);
    });

    test('mixed case', () => {
        expect(verify("aA", "", 28)).toBe(true);
        expect(verify("aZ", "Az", 107)).toBe(false);
        expect(verify("aZ", "Az", 106)).toBe(true);
    });
});

describe('verify - more edge cases', () => {
    test('simple strings', () => {
        expect(verify("abc", "", 6)).toBe(true);
        expect(verify("", "abc", 6)).toBe(true);
        expect(verify("ABC", "", 84)).toBe(true);
    });

    test('spaces ignored', () => {
        expect(verify("a b c", "", 6)).toBe(true);
        expect(verify("hello world", "", 124)).toBe(true);
    });

    test('special characters ignored', () => {
        expect(verify("a@b#c$", "", 6)).toBe(true);
        expect(verify("!@#$%^&*()", "", 0)).toBe(true);
    });

    test('case sensitivity', () => {
        expect(verify("a", "A", 28)).toBe(true);
        expect(verify("aaa", "AAA", 84)).toBe(true);
        expect(verify("abc", "", 6)).toBe(true);
        expect(verify("ABC", "", 84)).toBe(true);
        expect(verify("abc", "", 84)).toBe(false);
        expect(verify("ABC", "", 6)).toBe(false);
    });

    test('full alphabet', () => {
        const allLower = "abcdefghijklmnopqrstuvwxyz";
        expect(verify(allLower, "", 351)).toBe(true);
        const allUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        expect(verify(allUpper, "", 1027)).toBe(true);
    });
});

describe('canPost', () => {
    test('freecodecamp.org test cases', () => {
        expect(canPost("Hello world")).toBe("short post");
        expect(canPost("This is a longer message but still under eighty characters.")).toBe("long post");
        expect(canPost("This message is too long to fit into either of the character limits for a social media post.")).toBe("invalid post");
    });

    test('short posts - exactly 40 chars', () => {
        expect(canPost("a".repeat(40))).toBe("short post");
        expect(canPost("This message is exactly 40 chars!!!!")).toBe("short post");
    });

    test('short posts - under 40 chars', () => {
        expect(canPost("a".repeat(39))).toBe("short post");
        expect(canPost("Short message")).toBe("short post");
        expect(canPost("Hi")).toBe("short post");
        expect(canPost("a")).toBe("short post");
        expect(canPost("Hello!")).toBe("short post");
    });

    test('long posts - 41 chars', () => {
        expect(canPost("a".repeat(41))).toBe("long post");
        expect(canPost("This is a message that is forty-one c")).toBe("short post"); // Actually 40 chars
    });

    test('long posts - exactly 80 chars', () => {
        expect(canPost("a".repeat(80))).toBe("long post");
        expect(canPost("This message is exactly eighty characters long and should be a long post!!!!!!")).toBe("long post");
    });

    test('long posts - middle range', () => {
        expect(canPost("a".repeat(79))).toBe("long post");
        expect(canPost("a".repeat(50))).toBe("long post");
        expect(canPost("a".repeat(60))).toBe("long post");
        expect(canPost("This is a message that fits in the long post range nicely")).toBe("long post");
    });

    test('invalid posts - over 80 chars', () => {
        expect(canPost("a".repeat(81))).toBe("invalid post");
        expect(canPost("a".repeat(100))).toBe("invalid post");
        expect(canPost("a".repeat(200))).toBe("invalid post");
        expect(canPost("This is a very long message that exceeds both the short and long post character limits for social media posts.")).toBe("invalid post");
    });
});

describe('canPost - special characters', () => {
    test('empty string and spaces', () => {
        expect(canPost("")).toBe("short post");
        expect(canPost("Hello world from freeCodeCamp!")).toBe("short post");
        expect(canPost("This message has spaces and is exactly forty")).toBe("long post");
    });

    test('special characters', () => {
        expect(canPost("!@#$%^&*()_+-=[]{}|;:',.<>?/~`")).toBe("short post");
        expect(canPost("Special chars: !@#$%^&*() count towards the character limit, so this is long")).toBe("long post");
    });

    test('newlines and tabs', () => {
        expect(canPost("Line1\nLine2\nLine3")).toBe("short post");
        expect(canPost("Tab\tseparated\ttext")).toBe("short post");
    });

    test('real-world examples', () => {
        // Twitter-like short posts
        expect(canPost("Just setting up my account")).toBe("short post");
        expect(canPost("Good morning!")).toBe("short post");
        expect(canPost("Check out this link: example.com")).toBe("short post");
        
        // Medium-length posts
        expect(canPost("I just completed a coding challenge on freeCodeCamp! It was great!")).toBe("long post");
        expect(canPost("Learning JavaScript has been an amazing journey so far. Keep coding!")).toBe("long post");
        
        // Too long posts
        expect(canPost("This is a very detailed explanation of something that requires a lot of text to describe properly and completely.")).toBe("invalid post");
        expect(canPost("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")).toBe("invalid post");
    });

    test('unicode and emoji handling', () => {
        // Emojis count as 2 chars in JavaScript length
        expect(canPost("Hello 👋 World 🌍")).toBe("short post");
        expect(canPost("🎉".repeat(20))).toBe("short post"); // 20 emojis = 40 chars
        expect(canPost("🎉".repeat(21))).toBe("long post"); // 21 emojis = 42 chars
        expect(canPost("🎉".repeat(41))).toBe("invalid post"); // 41 emojis = 82 chars
    });
});

describe('gcd', () => {
    test('freecodecamp.org test cases', () => {
        expect(gcd(4, 6)).toBe(2);
        expect(gcd(20, 15)).toBe(5);
        expect(gcd(13, 17)).toBe(1);
        expect(gcd(654, 456)).toBe(6);
        expect(gcd(3456, 4320)).toBe(864);
    });

    test('small numbers', () => {
        expect(gcd(1, 1)).toBe(1);
        expect(gcd(2, 2)).toBe(2);
        expect(gcd(2, 4)).toBe(2);
        expect(gcd(3, 6)).toBe(3);
        expect(gcd(5, 10)).toBe(5);
        expect(gcd(7, 14)).toBe(7);
    });

    test('coprime numbers - GCD is 1', () => {
        expect(gcd(7, 11)).toBe(1);
        expect(gcd(13, 17)).toBe(1);
        expect(gcd(15, 28)).toBe(1);
        expect(gcd(21, 32)).toBe(1);
        expect(gcd(17, 19)).toBe(1);
    });
});

describe('gcd - more test cases', () => {
    test('one number divides the other', () => {
        expect(gcd(12, 3)).toBe(3);
        expect(gcd(15, 5)).toBe(5);
        expect(gcd(100, 25)).toBe(25);
        expect(gcd(48, 16)).toBe(16);
    });

    test('commutative property', () => {
        expect(gcd(12, 18)).toBe(gcd(18, 12));
        expect(gcd(100, 50)).toBe(gcd(50, 100));
        expect(gcd(7, 21)).toBe(gcd(21, 7));
    });

    test('larger numbers', () => {
        expect(gcd(1071, 462)).toBe(21);
        expect(gcd(270, 192)).toBe(6);
        expect(gcd(1024, 768)).toBe(256);
        expect(gcd(999, 111)).toBe(111);
    });

    test('GCD with 1', () => {
        expect(gcd(1, 5)).toBe(1);
        expect(gcd(1, 100)).toBe(1);
        expect(gcd(1, 999)).toBe(1);
    });

    test('identical numbers', () => {
        expect(gcd(42, 42)).toBe(42);
        expect(gcd(100, 100)).toBe(100);
        expect(gcd(999, 999)).toBe(999);
    });
});