const { countDifferences, isMatch, oneHundred, countRectangles, verify, canPost, gcd, convert, infected, getExtension, imageSearch, generateSignature, getWeekday, daysUntilWeekend, shiftArray, count, findWord, countWords, combinations, buildMatrix, longestWord, lcm, scaleRecipe, countCharacters, isValidMessage, fizzBuzz, isFizzBuzz, calculateAge } = require('./november');

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

describe('convert', () => {
    test('freecodecamp.org test cases', () => {
        expect(convert("# My level 1 heading")).toBe("<h1>My level 1 heading</h1>");
        expect(convert("My heading")).toBe("Invalid format");
        expect(convert("##### My level 5 heading")).toBe("<h5>My level 5 heading</h5>");
        expect(convert("#My heading")).toBe("Invalid format");
        expect(convert("  ###  My level 3 heading")).toBe("<h3>My level 3 heading</h3>");
        expect(convert("####### My level 7 heading")).toBe("Invalid format");
        expect(convert("## My #2 heading")).toBe("<h2>My #2 heading</h2>");
    });

    test('all heading levels 1-6', () => {
        expect(convert("# Heading 1")).toBe("<h1>Heading 1</h1>");
        expect(convert("## Heading 2")).toBe("<h2>Heading 2</h2>");
        expect(convert("### Heading 3")).toBe("<h3>Heading 3</h3>");
        expect(convert("#### Heading 4")).toBe("<h4>Heading 4</h4>");
        expect(convert("##### Heading 5")).toBe("<h5>Heading 5</h5>");
        expect(convert("###### Heading 6")).toBe("<h6>Heading 6</h6>");
    });

    test('headings with leading spaces', () => {
        expect(convert(" # Heading with 1 space")).toBe("<h1>Heading with 1 space</h1>");
        expect(convert("  ## Heading with 2 spaces")).toBe("<h2>Heading with 2 spaces</h2>");
        expect(convert("   ### Heading with 3 spaces")).toBe("<h3>Heading with 3 spaces</h3>");
    });
});

describe('convert - invalid formats', () => {
    test('no hash symbols', () => {
        expect(convert("No hash symbols")).toBe("Invalid format");
        expect(convert("Just text")).toBe("Invalid format");
        expect(convert("")).toBe("Invalid format");
    });

    test('too many hash symbols', () => {
        expect(convert("####### Seven hashes")).toBe("Invalid format");
        expect(convert("######## Eight hashes")).toBe("Invalid format");
    });

    test('missing space after hash', () => {
        expect(convert("#NoSpace")).toBe("Invalid format");
        expect(convert("##NoSpace")).toBe("Invalid format");
        expect(convert("######NoSpace")).toBe("Invalid format");
    });

    test('hash not at start', () => {
        expect(convert("Text # Not at start")).toBe("Invalid format");
        expect(convert("a # Heading")).toBe("Invalid format");
    });

    test('only hashes without text', () => {
        expect(convert("#")).toBe("Invalid format");
        expect(convert("# ")).toBe("Invalid format");
        expect(convert("##")).toBe("Invalid format");
        expect(convert("## ")).toBe("Invalid format");
    });
});

describe('convert - edge cases', () => {
    test('headings with special characters', () => {
        expect(convert("# Heading with !@#$%")).toBe("<h1>Heading with !@#$%</h1>");
        expect(convert("## Heading & symbols")).toBe("<h2>Heading & symbols</h2>");
        expect(convert("### Heading (with) [brackets]")).toBe("<h3>Heading (with) [brackets]</h3>");
    });

    test('headings with numbers', () => {
        expect(convert("# 123 Heading")).toBe("<h1>123 Heading</h1>");
        expect(convert("## Heading 456")).toBe("<h2>Heading 456</h2>");
        expect(convert("### 2025 Year")).toBe("<h3>2025 Year</h3>");
    });

    test('headings with multiple spaces', () => {
        expect(convert("#  Multiple  spaces  in  text")).toBe("<h1>Multiple  spaces  in  text</h1>");
        expect(convert("##   Extra   spaces")).toBe("<h2>Extra   spaces</h2>");
    });

    test('headings with hashes in text', () => {
        expect(convert("# Use # for headings")).toBe("<h1>Use # for headings</h1>");
        expect(convert("## #hashtag in heading")).toBe("<h2>#hashtag in heading</h2>");
        expect(convert("### Multiple ### hashes ### here")).toBe("<h3>Multiple ### hashes ### here</h3>");
    });

    test('minimal valid headings', () => {
        expect(convert("# a")).toBe("<h1>a</h1>");
        expect(convert("###### z")).toBe("<h6>z</h6>");
        expect(convert("## 1")).toBe("<h2>1</h2>");
    });
});

describe('infected', () => {
    test('freecodecamp.org test cases', () => {
        expect(infected(1)).toBe(2);
        expect(infected(3)).toBe(6);
        expect(infected(8)).toBe(152);
        expect(infected(17)).toBe(39808);
        expect(infected(25)).toBe(5217638);
    });

    test('day 0 - initial infection', () => {
        expect(infected(0)).toBe(1);
    });

    test('first few days without patch', () => {
        expect(infected(1)).toBe(2);
        expect(infected(2)).toBe(4);
    });

    test('day 3 - first patch applied', () => {
        // Day 3: 8 infected, patch 20% = ceil(1.6) = 2, result = 6
        expect(infected(3)).toBe(6);
    });

    test('day 6 - second patch applied', () => {
        // Day 0: 1, Day 1: 2, Day 2: 4
        // Day 3: 8 -> patch 2 -> 6
        // Day 4: 12, Day 5: 24
        // Day 6: 48 -> patch ceil(9.6) = 10 -> 38
        expect(infected(6)).toBe(38);
    });
});

describe('infected - more test cases', () => {
    test('day 9 - third patch applied', () => {
        // Day 9: 304 -> patch ceil(60.8) = 61 -> 243
        expect(infected(9)).toBe(243);
    });

    test('patch days sequence', () => {
        expect(infected(3)).toBe(6);
        expect(infected(6)).toBe(38);
        expect(infected(9)).toBe(243);
        expect(infected(12)).toBe(1555);
    });

    test('days between patches', () => {
        // Day 4: from 6 -> 12
        expect(infected(4)).toBe(12);
        // Day 5: from 12 -> 24
        expect(infected(5)).toBe(24);
        // Day 7: from 38 -> 76
        expect(infected(7)).toBe(76);
        // Day 8: from 76 -> 152
        expect(infected(8)).toBe(152);
    });

    test('larger day values', () => {
        expect(infected(15)).toBe(9952);
        expect(infected(20)).toBe(254768);
        expect(infected(25)).toBe(5217638);
    });

    test('verify patch calculation', () => {
        // Day 3: 8 * 0.2 = 1.6 -> ceil = 2 -> 6
        expect(infected(3)).toBe(6);
        // Day 6: 48 * 0.2 = 9.6 -> ceil = 10 -> 38
        expect(infected(6)).toBe(38);
        // Day 9: 304 * 0.2 = 60.8 -> ceil = 61 -> 243
        expect(infected(9)).toBe(243);
    });
});

describe('getExtension', () => {
    test('freecodecamp.org test cases', () => {
        expect(getExtension("document.txt")).toBe("txt");
        expect(getExtension("README")).toBe("none");
        expect(getExtension("image.PNG")).toBe("PNG");
        expect(getExtension(".gitignore")).toBe("gitignore");
        expect(getExtension("archive.tar.gz")).toBe("gz");
        expect(getExtension("final.draft.")).toBe("none");
    });

    test('common file extensions', () => {
        expect(getExtension("script.js")).toBe("js");
        expect(getExtension("style.css")).toBe("css");
        expect(getExtension("index.html")).toBe("html");
        expect(getExtension("data.json")).toBe("json");
        expect(getExtension("photo.jpg")).toBe("jpg");
        expect(getExtension("video.mp4")).toBe("mp4");
    });

    test('case sensitivity preserved', () => {
        expect(getExtension("Document.TXT")).toBe("TXT");
        expect(getExtension("Image.Png")).toBe("Png");
        expect(getExtension("FILE.PDF")).toBe("PDF");
    });
});

describe('getExtension - edge cases', () => {
    test('multiple dots in filename', () => {
        expect(getExtension("my.file.txt")).toBe("txt");
        expect(getExtension("backup.2024.11.19.tar.gz")).toBe("gz");
        expect(getExtension("v1.0.0.release.zip")).toBe("zip");
    });

    test('files without extensions', () => {
        expect(getExtension("Makefile")).toBe("none");
        expect(getExtension("LICENSE")).toBe("none");
        expect(getExtension("dockerfile")).toBe("none");
    });

    test('hidden files (starting with dot)', () => {
        expect(getExtension(".bashrc")).toBe("bashrc");
        expect(getExtension(".eslintrc")).toBe("eslintrc");
        expect(getExtension(".env")).toBe("env");
    });

    test('files ending with dot', () => {
        expect(getExtension("file.")).toBe("none");
        expect(getExtension("document.txt.")).toBe("none");
        expect(getExtension("test.")).toBe("none");
    });

    test('long extensions', () => {
        expect(getExtension("data.typescript")).toBe("typescript");
        expect(getExtension("file.configuration")).toBe("configuration");
    });

    test('single character extensions', () => {
        expect(getExtension("file.c")).toBe("c");
        expect(getExtension("program.h")).toBe("h");
        expect(getExtension("data.r")).toBe("r");
    });

    test('numeric extensions', () => {
        expect(getExtension("backup.001")).toBe("001");
        expect(getExtension("archive.7z")).toBe("7z");
    });
});

describe('imageSearch', () => {
    test('freecodecamp.org test cases', () => {
        expect(imageSearch(["dog.png", "cat.jpg", "parrot.jpeg"], "dog")).toEqual(["dog.png"]);
        expect(imageSearch(["Sunset.jpg", "Beach.png", "sunflower.jpeg"], "sun")).toEqual(["Sunset.jpg", "sunflower.jpeg"]);
        expect(imageSearch(["Moon.png", "sun.jpeg", "stars.png"], "PNG")).toEqual(["Moon.png", "stars.png"]);
        expect(imageSearch(["cat.jpg", "dogToy.jpeg", "kitty-cat.png", "catNip.jpeg", "franken_cat.gif"], "Cat")).toEqual(["cat.jpg", "kitty-cat.png", "catNip.jpeg", "franken_cat.gif"]);
    });

    test('case insensitive matching', () => {
        expect(imageSearch(["Photo.jpg", "photo.png", "PHOTO.gif"], "photo")).toEqual(["Photo.jpg", "photo.png", "PHOTO.gif"]);
        expect(imageSearch(["Beach.jpg", "BEACH.png", "beach.gif"], "BEACH")).toEqual(["Beach.jpg", "BEACH.png", "beach.gif"]);
    });

    test('partial matches in filename', () => {
        expect(imageSearch(["vacation_beach.jpg", "beachside.png", "my_beach_photo.gif"], "beach")).toEqual(["vacation_beach.jpg", "beachside.png", "my_beach_photo.gif"]);
        expect(imageSearch(["mountain1.jpg", "mountain2.png", "hill.gif"], "mountain")).toEqual(["mountain1.jpg", "mountain2.png"]);
    });

    test('no matches found', () => {
        expect(imageSearch(["cat.jpg", "dog.png", "bird.gif"], "fish")).toEqual([]);
        expect(imageSearch(["sunset.jpg", "sunrise.png"], "moon")).toEqual([]);
    });
});

describe('imageSearch - edge cases', () => {
    test('empty array', () => {
        expect(imageSearch([], "dog")).toEqual([]);
    });

    test('empty search term', () => {
        expect(imageSearch(["cat.jpg", "dog.png"], "")).toEqual(["cat.jpg", "dog.png"]);
    });

    test('search term in extension', () => {
        expect(imageSearch(["document.png", "photo.jpg", "image.png"], "png")).toEqual(["document.png", "image.png"]);
        expect(imageSearch(["file.jpeg", "pic.jpg", "img.png"], "jp")).toEqual(["file.jpeg", "pic.jpg"]);
    });

    test('maintains original order', () => {
        const images = ["zebra.jpg", "apple.png", "banana.gif", "cherry.jpg"];
        expect(imageSearch(images, "jpg")).toEqual(["zebra.jpg", "cherry.jpg"]);
    });

    test('special characters in filenames', () => {
        expect(imageSearch(["photo_1.jpg", "photo-2.png", "photo.3.gif"], "photo")).toEqual(["photo_1.jpg", "photo-2.png", "photo.3.gif"]);
        expect(imageSearch(["img@home.jpg", "pic#1.png"], "@")).toEqual(["img@home.jpg"]);
    });

    test('numbers in search term', () => {
        expect(imageSearch(["file1.jpg", "file2.png", "file10.gif"], "1")).toEqual(["file1.jpg", "file10.gif"]);
        expect(imageSearch(["2020-photo.jpg", "2021-image.png"], "2020")).toEqual(["2020-photo.jpg"]);
    });

    test('single image match', () => {
        expect(imageSearch(["sunset.jpg"], "sunset")).toEqual(["sunset.jpg"]);
        expect(imageSearch(["sunset.jpg"], "sunrise")).toEqual([]);
    });
});

describe('generateSignature', () => {
    test('freecodecamp.org test cases', () => {
        expect(generateSignature("Quinn Waverly", "Founder and CEO", "TechCo")).toBe("--Quinn Waverly, Founder and CEO at TechCo");
        expect(generateSignature("Alice Reed", "Engineer", "TechCo")).toBe(">>Alice Reed, Engineer at TechCo");
        expect(generateSignature("Tina Vaughn", "Developer", "example.com")).toBe("::Tina Vaughn, Developer at example.com");
        expect(generateSignature("B. B.", "Product Tester", "AcmeCorp")).toBe(">>B. B., Product Tester at AcmeCorp");
        expect(generateSignature("windstorm", "Cloud Architect", "Atmospheronics")).toBe("::windstorm, Cloud Architect at Atmospheronics");
    });

    test('names starting with A-I (>> prefix)', () => {
        expect(generateSignature("Alice Johnson", "Developer", "Tech Inc")).toBe(">>Alice Johnson, Developer at Tech Inc");
        expect(generateSignature("Bob Smith", "Designer", "Creative Co")).toBe(">>Bob Smith, Designer at Creative Co");
        expect(generateSignature("Charlie Brown", "Manager", "Corp")).toBe(">>Charlie Brown, Manager at Corp");
        expect(generateSignature("Diana Prince", "Hero", "Justice League")).toBe(">>Diana Prince, Hero at Justice League");
        expect(generateSignature("Eve Adams", "Analyst", "DataCo")).toBe(">>Eve Adams, Analyst at DataCo");
        expect(generateSignature("Frank Miller", "Writer", "DC")).toBe(">>Frank Miller, Writer at DC");
        expect(generateSignature("Grace Hopper", "Programmer", "Navy")).toBe(">>Grace Hopper, Programmer at Navy");
        expect(generateSignature("Henry Ford", "Founder", "Ford")).toBe(">>Henry Ford, Founder at Ford");
        expect(generateSignature("Iris West", "Journalist", "Central City")).toBe(">>Iris West, Journalist at Central City");
    });
});

describe('generateSignature - more prefixes', () => {
    test('names starting with J-R (-- prefix)', () => {
        expect(generateSignature("Jack Ryan", "Analyst", "CIA")).toBe("--Jack Ryan, Analyst at CIA");
        expect(generateSignature("Kate Bishop", "Archer", "Young Avengers")).toBe("--Kate Bishop, Archer at Young Avengers");
        expect(generateSignature("Lara Croft", "Archaeologist", "Tomb Raider Inc")).toBe("--Lara Croft, Archaeologist at Tomb Raider Inc");
        expect(generateSignature("Mike Ross", "Associate", "Pearson Specter")).toBe("--Mike Ross, Associate at Pearson Specter");
        expect(generateSignature("Nancy Drew", "Detective", "River Heights")).toBe("--Nancy Drew, Detective at River Heights");
        expect(generateSignature("Oscar Martinez", "Accountant", "Dunder Mifflin")).toBe("--Oscar Martinez, Accountant at Dunder Mifflin");
        expect(generateSignature("Peter Parker", "Photographer", "Daily Bugle")).toBe("--Peter Parker, Photographer at Daily Bugle");
        expect(generateSignature("Rachel Green", "Buyer", "Ralph Lauren")).toBe("--Rachel Green, Buyer at Ralph Lauren");
    });

    test('names starting with S-Z (:: prefix)', () => {
        expect(generateSignature("Sarah Connor", "Resistance Leader", "Future")).toBe("::Sarah Connor, Resistance Leader at Future");
        expect(generateSignature("Tony Stark", "CEO", "Stark Industries")).toBe("::Tony Stark, CEO at Stark Industries");
        expect(generateSignature("Uma Thurman", "Actress", "Hollywood")).toBe("::Uma Thurman, Actress at Hollywood");
        expect(generateSignature("Victor Stone", "Cyborg", "Justice League")).toBe("::Victor Stone, Cyborg at Justice League");
        expect(generateSignature("Wanda Maximoff", "Witch", "Avengers")).toBe("::Wanda Maximoff, Witch at Avengers");
        expect(generateSignature("Xena Warrior", "Princess", "Greece")).toBe("::Xena Warrior, Princess at Greece");
        expect(generateSignature("Yoda Master", "Jedi", "Jedi Council")).toBe("::Yoda Master, Jedi at Jedi Council");
        expect(generateSignature("Zelda Princess", "Ruler", "Hyrule")).toBe("::Zelda Princess, Ruler at Hyrule");
    });

    test('boundary letters', () => {
        expect(generateSignature("Amy Adams", "Actor", "Films")).toBe(">>Amy Adams, Actor at Films");
        expect(generateSignature("Ian McKellen", "Actor", "Theatre")).toBe(">>Ian McKellen, Actor at Theatre");
        expect(generateSignature("James Bond", "Agent", "MI6")).toBe("--James Bond, Agent at MI6");
        expect(generateSignature("Ryan Reynolds", "Actor", "Marvel")).toBe("--Ryan Reynolds, Actor at Marvel");
        expect(generateSignature("Sam Wilson", "Falcon", "Avengers")).toBe("::Sam Wilson, Falcon at Avengers");
        expect(generateSignature("Zoe Saldana", "Actor", "Marvel")).toBe("::Zoe Saldana, Actor at Marvel");
    });
});

describe('getWeekday', () => {
    test('freecodecamp.org test cases', () => {
        expect(getWeekday("2025-11-06")).toBe("Thursday");
        expect(getWeekday("1999-12-31")).toBe("Friday");
        expect(getWeekday("1111-11-11")).toBe("Saturday");
        expect(getWeekday("2112-12-21")).toBe("Wednesday");
        expect(getWeekday("2345-10-01")).toBe("Monday");
    });

    test('all days of the week', () => {
        expect(getWeekday("2025-11-16")).toBe("Sunday");
        expect(getWeekday("2025-11-17")).toBe("Monday");
        expect(getWeekday("2025-11-18")).toBe("Tuesday");
        expect(getWeekday("2025-11-19")).toBe("Wednesday");
        expect(getWeekday("2025-11-20")).toBe("Thursday");
        expect(getWeekday("2025-11-21")).toBe("Friday");
        expect(getWeekday("2025-11-22")).toBe("Saturday");
    });

    test('famous historical dates', () => {
        expect(getWeekday("1776-07-04")).toBe("Thursday");
        expect(getWeekday("1969-07-20")).toBe("Sunday");
        expect(getWeekday("2001-09-11")).toBe("Tuesday");
    });
});

describe('getWeekday - edge cases', () => {
    test('leap year dates', () => {
        expect(getWeekday("2000-02-29")).toBe("Tuesday");
        expect(getWeekday("2024-02-29")).toBe("Thursday");
        expect(getWeekday("2020-02-29")).toBe("Saturday");
    });

    test('start and end of year', () => {
        expect(getWeekday("2025-01-01")).toBe("Wednesday");
        expect(getWeekday("2025-12-31")).toBe("Wednesday");
        expect(getWeekday("2024-01-01")).toBe("Monday");
        expect(getWeekday("2024-12-31")).toBe("Tuesday");
    });

    test('first day of each month in 2025', () => {
        expect(getWeekday("2025-01-01")).toBe("Wednesday");
        expect(getWeekday("2025-02-01")).toBe("Saturday");
        expect(getWeekday("2025-03-01")).toBe("Saturday");
        expect(getWeekday("2025-04-01")).toBe("Tuesday");
        expect(getWeekday("2025-05-01")).toBe("Thursday");
        expect(getWeekday("2025-06-01")).toBe("Sunday");
        expect(getWeekday("2025-07-01")).toBe("Tuesday");
        expect(getWeekday("2025-08-01")).toBe("Friday");
        expect(getWeekday("2025-09-01")).toBe("Monday");
        expect(getWeekday("2025-10-01")).toBe("Wednesday");
        expect(getWeekday("2025-11-01")).toBe("Saturday");
        expect(getWeekday("2025-12-01")).toBe("Monday");
    });

    test('dates far in the past', () => {
        expect(getWeekday("1000-01-01")).toBe("Wednesday");
        expect(getWeekday("1900-01-01")).toBe("Monday");
    });

    test('dates far in the future', () => {
        expect(getWeekday("3000-01-01")).toBe("Wednesday");
        expect(getWeekday("2100-01-01")).toBe("Friday");
    });
});

describe('daysUntilWeekend', () => {
    test('freecodecamp.org test cases', () => {
        expect(daysUntilWeekend("2025-11-14")).toBe("1 day until the weekend.");
        expect(daysUntilWeekend("2025-01-01")).toBe("3 days until the weekend.");
        expect(daysUntilWeekend("2025-12-06")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2026-01-27")).toBe("4 days until the weekend.");
        expect(daysUntilWeekend("2026-09-07")).toBe("5 days until the weekend.");
        expect(daysUntilWeekend("2026-11-29")).toBe("It's the weekend!");
    });

    test('all weekdays counting down', () => {
        expect(daysUntilWeekend("2025-11-17")).toBe("5 days until the weekend.");
        expect(daysUntilWeekend("2025-11-18")).toBe("4 days until the weekend.");
        expect(daysUntilWeekend("2025-11-19")).toBe("3 days until the weekend.");
        expect(daysUntilWeekend("2025-11-20")).toBe("2 days until the weekend.");
        expect(daysUntilWeekend("2025-11-21")).toBe("1 day until the weekend.");
    });

    test('weekend days', () => {
        expect(daysUntilWeekend("2025-11-22")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2025-11-23")).toBe("It's the weekend!");
    });

    test('singular vs plural day/days', () => {
        expect(daysUntilWeekend("2025-11-21")).toBe("1 day until the weekend.");
        expect(daysUntilWeekend("2025-11-20")).toBe("2 days until the weekend.");
        expect(daysUntilWeekend("2025-11-19")).toBe("3 days until the weekend.");
        expect(daysUntilWeekend("2025-11-18")).toBe("4 days until the weekend.");
        expect(daysUntilWeekend("2025-11-17")).toBe("5 days until the weekend.");
    });
});

describe('daysUntilWeekend - more test cases', () => {
    test('start of year', () => {
        expect(daysUntilWeekend("2025-01-01")).toBe("3 days until the weekend.");
        expect(daysUntilWeekend("2025-01-04")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2025-01-05")).toBe("It's the weekend!");
    });

    test('various dates throughout the year', () => {
        expect(daysUntilWeekend("2025-02-14")).toBe("1 day until the weekend.");
        expect(daysUntilWeekend("2025-03-20")).toBe("2 days until the weekend.");
        expect(daysUntilWeekend("2025-04-09")).toBe("3 days until the weekend.");
        expect(daysUntilWeekend("2025-05-08")).toBe("2 days until the weekend.");
    });

    test('leap year dates', () => {
        expect(daysUntilWeekend("2024-02-29")).toBe("2 days until the weekend.");
        expect(daysUntilWeekend("2020-02-29")).toBe("It's the weekend!");
    });

    test('consecutive Saturdays and Sundays', () => {
        expect(daysUntilWeekend("2025-11-22")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2025-11-23")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2025-11-29")).toBe("It's the weekend!");
        expect(daysUntilWeekend("2025-11-30")).toBe("It's the weekend!");
    });
});

describe('shiftArray', () => {
    test('freecodecamp.org test cases', () => {
        expect(shiftArray([1, 2, 3], 1)).toEqual([2, 3, 1]);
        expect(shiftArray([1, 2, 3], -1)).toEqual([3, 1, 2]);
        expect(shiftArray(["alpha", "bravo", "charlie"], 5)).toEqual(["charlie", "alpha", "bravo"]);
        expect(shiftArray(["alpha", "bravo", "charlie"], -11)).toEqual(["bravo", "charlie", "alpha"]);
        expect(shiftArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15)).toEqual([5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
    });

    test('shift left by small amounts', () => {
        expect(shiftArray([1, 2, 3, 4, 5], 1)).toEqual([2, 3, 4, 5, 1]);
        expect(shiftArray([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
        expect(shiftArray([1, 2, 3, 4, 5], 3)).toEqual([4, 5, 1, 2, 3]);
        expect(shiftArray([1, 2, 3, 4, 5], 4)).toEqual([5, 1, 2, 3, 4]);
    });

    test('shift right by small amounts', () => {
        expect(shiftArray([1, 2, 3, 4, 5], -1)).toEqual([5, 1, 2, 3, 4]);
        expect(shiftArray([1, 2, 3, 4, 5], -2)).toEqual([4, 5, 1, 2, 3]);
        expect(shiftArray([1, 2, 3, 4, 5], -3)).toEqual([3, 4, 5, 1, 2]);
        expect(shiftArray([1, 2, 3, 4, 5], -4)).toEqual([2, 3, 4, 5, 1]);
    });

    test('shift by array length returns same array', () => {
        expect(shiftArray([1, 2, 3], 3)).toEqual([1, 2, 3]);
        expect(shiftArray([1, 2, 3], -3)).toEqual([1, 2, 3]);
        expect(shiftArray([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]);
        expect(shiftArray([1, 2, 3, 4, 5], -5)).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('shiftArray - edge cases', () => {
    test('shift by zero', () => {
        expect(shiftArray([1, 2, 3], 0)).toEqual([1, 2, 3]);
        expect(shiftArray([10, 20, 30, 40], 0)).toEqual([10, 20, 30, 40]);
    });

    test('shift larger than array length wraps around', () => {
        expect(shiftArray([1, 2, 3], 4)).toEqual([2, 3, 1]);
        expect(shiftArray([1, 2, 3], 7)).toEqual([2, 3, 1]);
        expect(shiftArray([1, 2, 3, 4], 9)).toEqual([2, 3, 4, 1]);
    });

    test('shift negative larger than array length wraps around', () => {
        expect(shiftArray([1, 2, 3], -4)).toEqual([3, 1, 2]);
        expect(shiftArray([1, 2, 3], -7)).toEqual([3, 1, 2]);
        expect(shiftArray([1, 2, 3, 4], -9)).toEqual([4, 1, 2, 3]);
    });

    test('empty array', () => {
        expect(shiftArray([], 5)).toEqual([]);
        expect(shiftArray([], -5)).toEqual([]);
    });

    test('single element array', () => {
        expect(shiftArray([42], 1)).toEqual([42]);
        expect(shiftArray([42], -1)).toEqual([42]);
        expect(shiftArray([42], 10)).toEqual([42]);
    });

    test('two element array', () => {
        expect(shiftArray([1, 2], 1)).toEqual([2, 1]);
        expect(shiftArray([1, 2], -1)).toEqual([2, 1]);
        expect(shiftArray([1, 2], 3)).toEqual([2, 1]);
    });

    test('array with different types', () => {
        expect(shiftArray([1, "two", true, null], 2)).toEqual([true, null, 1, "two"]);
        expect(shiftArray([1, "two", true, null], -2)).toEqual([true, null, 1, "two"]);
    });

    test('large shift values', () => {
        expect(shiftArray([1, 2, 3], 100)).toEqual([2, 3, 1]);
        expect(shiftArray([1, 2, 3], -100)).toEqual([3, 1, 2]);
    });
});

describe('count - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(count("Hello World")).toEqual([3, 7]);
        expect(count("JavaScript")).toEqual([3, 7]);
        expect(count("Python")).toEqual([1, 5]);
        expect(count("freeCodeCamp")).toEqual([5, 7]);
        expect(count("Hello, World!")).toEqual([3, 7]);
        expect(count("The quick brown fox jumps over the lazy dog.")).toEqual([11, 24]);
    });

    test('only vowels', () => {
        expect(count("aeiou")).toEqual([5, 0]);
        expect(count("AEIOU")).toEqual([5, 0]);
        expect(count("AeIoU")).toEqual([5, 0]);
    });

    test('only consonants', () => {
        expect(count("bcdfg")).toEqual([0, 5]);
        expect(count("BCDFG")).toEqual([0, 5]);
        expect(count("BcDfG")).toEqual([0, 5]);
    });

    test('empty string', () => {
        expect(count("")).toEqual([0, 0]);
    });
});

describe('count - edge cases', () => {
    test('only non-letter characters', () => {
        expect(count("123")).toEqual([0, 0]);
        expect(count("!@#$%")).toEqual([0, 0]);
        expect(count("   ")).toEqual([0, 0]);
        expect(count(".,;:")).toEqual([0, 0]);
    });

    test('mixed letters and numbers', () => {
        expect(count("abc123def")).toEqual([2, 4]);
        expect(count("H3ll0 W0rld")).toEqual([0, 7]);
    });

    test('special characters with letters', () => {
        expect(count("Hello!")).toEqual([2, 3]);
        expect(count("C++")).toEqual([0, 1]);
        expect(count("a@b#c$d%e")).toEqual([2, 3]);
    });

    test('single character', () => {
        expect(count("a")).toEqual([1, 0]);
        expect(count("b")).toEqual([0, 1]);
        expect(count("E")).toEqual([1, 0]);
        expect(count("Z")).toEqual([0, 1]);
        expect(count("5")).toEqual([0, 0]);
    });
});

describe('findWord - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(findWord([["a", "c", "t"], ["t", "a", "t"], ["c", "t", "c"]], "cat"))
            .toEqual([[0, 1], [2, 1]]);
        expect(findWord([["d", "o", "g"], ["o", "g", "d"], ["d", "g", "o"]], "dog"))
            .toEqual([[0, 0], [0, 2]]);
        expect(findWord([["h", "i", "s", "h"], ["i", "s", "f", "s"], ["f", "s", "i", "i"], ["s", "h", "i", "f"]], "fish"))
            .toEqual([[3, 3], [0, 3]]);
        expect(findWord([["f", "x", "o", "x"], ["o", "x", "o", "f"], ["f", "o", "f", "x"], ["f", "x", "x", "o"]], "fox"))
            .toEqual([[1, 3], [1, 1]]);
    });

    test('horizontal left to right', () => {
        expect(findWord([["h", "e", "l", "l", "o"]], "hello"))
            .toEqual([[0, 0], [0, 4]]);
        expect(findWord([["a", "b", "c"], ["d", "e", "f"]], "abc"))
            .toEqual([[0, 0], [0, 2]]);
        expect(findWord([["x", "y", "z"], ["a", "b", "c"]], "abc"))
            .toEqual([[1, 0], [1, 2]]);
    });

    test('horizontal right to left', () => {
        expect(findWord([["o", "l", "l", "e", "h"]], "hello"))
            .toEqual([[0, 4], [0, 0]]);
        expect(findWord([["c", "b", "a"], ["f", "e", "d"]], "abc"))
            .toEqual([[0, 2], [0, 0]]);
    });
});

describe('findWord - directional tests', () => {
    test('vertical top to bottom', () => {
        expect(findWord([["h"], ["e"], ["l"], ["l"], ["o"]], "hello"))
            .toEqual([[0, 0], [4, 0]]);
        expect(findWord([["a", "x"], ["b", "y"], ["c", "z"]], "abc"))
            .toEqual([[0, 0], [2, 0]]);
    });

    test('vertical bottom to top', () => {
        expect(findWord([["o"], ["l"], ["l"], ["e"], ["h"]], "hello"))
            .toEqual([[4, 0], [0, 0]]);
        expect(findWord([["c", "z"], ["b", "y"], ["a", "x"]], "abc"))
            .toEqual([[2, 0], [0, 0]]);
    });

    test('single character word', () => {
        expect(findWord([["a", "b"], ["c", "d"]], "a"))
            .toEqual([[0, 0], [0, 0]]);
        expect(findWord([["x", "y"], ["z", "a"]], "a"))
            .toEqual([[1, 1], [1, 1]]);
    });

    test('two character words', () => {
        expect(findWord([["a", "b", "c"]], "ab"))
            .toEqual([[0, 0], [0, 1]]);
        expect(findWord([["a"], ["b"], ["c"]], "ab"))
            .toEqual([[0, 0], [1, 0]]);
    });
});

describe('countWords - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(countWords("Hello world")).toBe(2);
        expect(countWords("The quick brown fox jumps over the lazy dog.")).toBe(9);
        expect(countWords("I like coding challenges!")).toBe(4);
        expect(countWords("Complete the challenge in JavaScript and Python.")).toBe(7);
        expect(countWords("The missing semi-colon crashed the entire internet.")).toBe(7);
    });

    test('single word', () => {
        expect(countWords("Hello")).toBe(1);
        expect(countWords("JavaScript")).toBe(1);
        expect(countWords("a")).toBe(1);
    });

    test('empty string', () => {
        expect(countWords("")).toBe(0);
    });

    test('words with punctuation', () => {
        expect(countWords("Hello, world!")).toBe(2);
        expect(countWords("It's a beautiful day.")).toBe(4);
        expect(countWords("What? Really?")).toBe(2);
    });
});

describe('countWords - edge cases', () => {
    test('multiple spaces treated as separate words', () => {
        expect(countWords("Hello  world")).toBe(3);
        expect(countWords("a   b")).toBe(4);
    });

    test('words with numbers', () => {
        expect(countWords("I have 2 cats")).toBe(4);
        expect(countWords("12345 67890")).toBe(2);
    });

    test('special characters', () => {
        expect(countWords("@#$% test")).toBe(2);
        expect(countWords("hello@world.com test")).toBe(2);
    });

    test('longer sentences', () => {
        expect(countWords("This is a longer sentence with many words in it.")).toBe(10);
        expect(countWords("a b c d e f g h i j")).toBe(10);
    });
});

describe('combinations - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(combinations(52)).toBe(1);
        expect(combinations(1)).toBe(52);
        expect(combinations(2)).toBe(1326);
        expect(combinations(5)).toBe(2598960);
        expect(combinations(10)).toBe(15820024220);
        expect(combinations(50)).toBe(1326);
    });

    test('edge cases - 0 and full deck', () => {
        expect(combinations(0)).toBe(1);
        expect(combinations(52)).toBe(1);
    });

    test('symmetry property C(52, k) = C(52, 52-k)', () => {
        expect(combinations(3)).toBe(combinations(49));
        expect(combinations(10)).toBe(combinations(42));
        expect(combinations(20)).toBe(combinations(32));
    });
});

describe('combinations - more test cases', () => {
    test('small numbers', () => {
        expect(combinations(3)).toBe(22100);
        expect(combinations(4)).toBe(270725);
    });

    test('middle range', () => {
        expect(combinations(13)).toBe(635013559600);
        expect(combinations(26)).toBe(495918532948104);
    });

    test('common poker hands', () => {
        expect(combinations(5)).toBe(2598960); // 5-card poker hand
        expect(combinations(7)).toBe(133784560); // 7-card poker hand
    });
});

describe('buildMatrix - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(buildMatrix(2, 3)).toEqual([[0, 0, 0], [0, 0, 0]]);
        expect(buildMatrix(3, 2)).toEqual([[0, 0], [0, 0], [0, 0]]);
        expect(buildMatrix(4, 3)).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        expect(buildMatrix(9, 1)).toEqual([[0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    });

    test('square matrices', () => {
        expect(buildMatrix(1, 1)).toEqual([[0]]);
        expect(buildMatrix(2, 2)).toEqual([[0, 0], [0, 0]]);
        expect(buildMatrix(3, 3)).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    });

    test('single row', () => {
        expect(buildMatrix(1, 5)).toEqual([[0, 0, 0, 0, 0]]);
        expect(buildMatrix(1, 10)).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    });

    test('single column', () => {
        expect(buildMatrix(5, 1)).toEqual([[0], [0], [0], [0], [0]]);
        expect(buildMatrix(10, 1)).toEqual([[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]);
    });
});

describe('buildMatrix - edge cases', () => {
    test('rows and columns are independent arrays', () => {
        const matrix = buildMatrix(3, 3);
        matrix[0][0] = 1;
        expect(matrix[0][0]).toBe(1);
        expect(matrix[1][0]).toBe(0);
        expect(matrix[2][0]).toBe(0);
    });

    test('large matrices', () => {
        const matrix = buildMatrix(10, 10);
        expect(matrix.length).toBe(10);
        expect(matrix[0].length).toBe(10);
        expect(matrix[9][9]).toBe(0);
    });

    test('rectangular matrices - more columns than rows', () => {
        expect(buildMatrix(2, 5)).toEqual([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    });

    test('rectangular matrices - more rows than columns', () => {
        expect(buildMatrix(5, 2)).toEqual([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]);
    });
});

describe('longestWord - basic tests', () => {
    test('freecodecamp.org test cases', () => {
        expect(longestWord("The quick red fox")).toBe("quick");
        expect(longestWord("Hello coding challenge.")).toBe("challenge");
        expect(longestWord("Do Try This At Home.")).toBe("This");
        expect(longestWord("This sentence... has commas, ellipses, and an exlamation point!")).toBe("exlamation");
        expect(longestWord("A tie? No way!")).toBe("tie");
        expect(longestWord("Wouldn't you like to know.")).toBe("Wouldnt");
    });

    test('single word', () => {
        expect(longestWord("Hello")).toBe("Hello");
        expect(longestWord("World!")).toBe("World");
    });

    test('all same length - returns first', () => {
        expect(longestWord("I am so ok")).toBe("am");
        expect(longestWord("cat dog rat")).toBe("cat");
    });
});

describe('longestWord - edge cases', () => {
    test('words with punctuation removed', () => {
        expect(longestWord("hello, world!")).toBe("hello");
        expect(longestWord("what's happening?")).toBe("happening");
        expect(longestWord("it's a beautiful day!!!")).toBe("beautiful");
    });

    test('words with numbers and special chars', () => {
        expect(longestWord("test123 words456")).toBe("words");
        expect(longestWord("@#$hello world$#@")).toBe("hello"); // both 5 letters, returns first
    });

    test('multiple punctuation marks', () => {
        expect(longestWord("Wow!!! Really???")).toBe("Really");
        expect(longestWord("can't won't shouldn't")).toBe("shouldnt");
    });

    test('case sensitivity preserved', () => {
        expect(longestWord("ABC def GHI")).toBe("ABC");
        expect(longestWord("JavaScript Python Ruby")).toBe("JavaScript");
    });

    test('words concatenated without spaces', () => {
        expect(longestWord("one,two,three,four")).toBe("onetwothreefour"); // no spaces = one word
        expect(longestWord("hello world")).toBe("hello"); // both 5 letters, returns first
    });
});

describe('lcm - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(lcm(4, 6)).toBe(12);
        expect(lcm(9, 6)).toBe(18);
        expect(lcm(10, 100)).toBe(100);
        expect(lcm(13, 17)).toBe(221);
        expect(lcm(45, 70)).toBe(630);
    });

    test('one number is multiple of the other', () => {
        expect(lcm(2, 4)).toBe(4);
        expect(lcm(3, 9)).toBe(9);
        expect(lcm(5, 25)).toBe(25);
        expect(lcm(7, 14)).toBe(14);
    });

    test('same numbers', () => {
        expect(lcm(5, 5)).toBe(5);
        expect(lcm(10, 10)).toBe(10);
        expect(lcm(1, 1)).toBe(1);
    });
});

describe('lcm - coprime numbers', () => {
    test('prime numbers', () => {
        expect(lcm(2, 3)).toBe(6);
        expect(lcm(5, 7)).toBe(35);
        expect(lcm(11, 13)).toBe(143);
        expect(lcm(3, 5)).toBe(15);
    });

    test('coprime non-prime numbers', () => {
        expect(lcm(8, 9)).toBe(72);
        expect(lcm(14, 15)).toBe(210);
        expect(lcm(21, 25)).toBe(525);
    });
});

describe('lcm - with one', () => {
    test('lcm with 1', () => {
        expect(lcm(1, 5)).toBe(5);
        expect(lcm(1, 100)).toBe(100);
        expect(lcm(7, 1)).toBe(7);
        expect(lcm(1, 1)).toBe(1);
    });
});

describe('lcm - large numbers', () => {
    test('larger values', () => {
        expect(lcm(12, 18)).toBe(36);
        expect(lcm(15, 25)).toBe(75);
        expect(lcm(20, 30)).toBe(60);
        expect(lcm(24, 36)).toBe(72);
    });

    test('very large numbers', () => {
        expect(lcm(100, 150)).toBe(300);
        expect(lcm(48, 180)).toBe(720);
        expect(lcm(50, 75)).toBe(150);
    });
});

describe('lcm - edge cases', () => {
    test('order doesnt matter', () => {
        expect(lcm(4, 6)).toBe(lcm(6, 4));
        expect(lcm(10, 15)).toBe(lcm(15, 10));
        expect(lcm(7, 21)).toBe(lcm(21, 7));
    });

    test('powers of same number', () => {
        expect(lcm(2, 4)).toBe(4);
        expect(lcm(4, 8)).toBe(8);
        expect(lcm(3, 27)).toBe(27);
        expect(lcm(5, 125)).toBe(125);
    });
});

describe('lcm - common factors', () => {
    test('numbers with common factors', () => {
        expect(lcm(6, 8)).toBe(24);
        expect(lcm(12, 15)).toBe(60);
        expect(lcm(16, 20)).toBe(80);
        expect(lcm(18, 24)).toBe(72);
    });

    test('multiple common factors', () => {
        expect(lcm(12, 16)).toBe(48);
        expect(lcm(20, 30)).toBe(60);
        expect(lcm(24, 30)).toBe(120);
    });
});

describe('scaleRecipe - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(scaleRecipe(["2 C Flour", "1.5 T Sugar"], 2))
            .toEqual(["4 C Flour", "3 T Sugar"]);
        expect(scaleRecipe(["4 T Flour", "1 C Milk", "2 T Oil"], 1.5))
            .toEqual(["6 T Flour", "1.5 C Milk", "3 T Oil"]);
        expect(scaleRecipe(["3 C Milk", "2 C Oats"], 0.5))
            .toEqual(["1.5 C Milk", "1 C Oats"]);
    });

    test('complex recipe scaling', () => {
        expect(scaleRecipe([
            "2 C All-purpose Flour",
            "1 t Baking Soda",
            "1 t Salt",
            "1 C Butter",
            "0.5 C Sugar",
            "0.5 C Brown Sugar",
            "1 t Vanilla Extract",
            "2 C Chocolate Chips"
        ], 2.5)).toEqual([
            "5 C All-purpose Flour",
            "2.5 t Baking Soda",
            "2.5 t Salt",
            "2.5 C Butter",
            "1.25 C Sugar",
            "1.25 C Brown Sugar",
            "2.5 t Vanilla Extract",
            "5 C Chocolate Chips"
        ]);
    });
});

describe('scaleRecipe - scaling by 1', () => {
    test('no change when scaled by 1', () => {
        expect(scaleRecipe(["2 C Flour"], 1)).toEqual(["2 C Flour"]);
        expect(scaleRecipe(["3.5 T Sugar", "1 C Milk"], 1))
            .toEqual(["3.5 T Sugar", "1 C Milk"]);
    });
});

describe('scaleRecipe - scaling up', () => {
    test('double recipe', () => {
        expect(scaleRecipe(["1 C Flour", "2 T Sugar"], 2))
            .toEqual(["2 C Flour", "4 T Sugar"]);
        expect(scaleRecipe(["0.5 C Oil"], 2)).toEqual(["1 C Oil"]);
    });

    test('triple recipe', () => {
        expect(scaleRecipe(["1 C Flour"], 3)).toEqual(["3 C Flour"]);
        expect(scaleRecipe(["2 T Salt", "1.5 C Water"], 3))
            .toEqual(["6 T Salt", "4.5 C Water"]);
    });

    test('scale by fractional amount', () => {
        expect(scaleRecipe(["2 C Flour"], 1.5)).toEqual(["3 C Flour"]);
        expect(scaleRecipe(["4 T Sugar"], 2.5)).toEqual(["10 T Sugar"]);
    });
});

describe('scaleRecipe - scaling down', () => {
    test('half recipe', () => {
        expect(scaleRecipe(["2 C Flour", "4 T Sugar"], 0.5))
            .toEqual(["1 C Flour", "2 T Sugar"]);
        expect(scaleRecipe(["6 C Milk"], 0.5)).toEqual(["3 C Milk"]);
    });

    test('quarter recipe', () => {
        expect(scaleRecipe(["4 C Flour"], 0.25)).toEqual(["1 C Flour"]);
        expect(scaleRecipe(["8 T Salt"], 0.25)).toEqual(["2 T Salt"]);
    });

    test('scale down with decimals', () => {
        expect(scaleRecipe(["3 C Flour"], 0.5)).toEqual(["1.5 C Flour"]);
        expect(scaleRecipe(["5 T Sugar"], 0.5)).toEqual(["2.5 T Sugar"]);
    });
});

describe('scaleRecipe - decimal quantities', () => {
    test('decimal starting quantities', () => {
        expect(scaleRecipe(["0.5 C Sugar"], 2)).toEqual(["1 C Sugar"]);
        expect(scaleRecipe(["1.5 T Salt"], 2)).toEqual(["3 T Salt"]);
        expect(scaleRecipe(["2.5 C Flour"], 2)).toEqual(["5 C Flour"]);
    });

    test('decimal results without trailing zeros', () => {
        expect(scaleRecipe(["1 C Flour"], 1.5)).toEqual(["1.5 C Flour"]);
        expect(scaleRecipe(["2 T Sugar"], 0.75)).toEqual(["1.5 T Sugar"]);
    });

    test('whole number results', () => {
        expect(scaleRecipe(["0.5 C Oil"], 4)).toEqual(["2 C Oil"]);
        expect(scaleRecipe(["1.5 C Water"], 2)).toEqual(["3 C Water"]);
    });
});

describe('scaleRecipe - different units', () => {
    test('various unit types', () => {
        expect(scaleRecipe(["1 C Flour"], 2)).toEqual(["2 C Flour"]);
        expect(scaleRecipe(["1 T Salt"], 2)).toEqual(["2 T Salt"]);
        expect(scaleRecipe(["1 t Vanilla"], 2)).toEqual(["2 t Vanilla"]);
        expect(scaleRecipe(["1 oz Chocolate"], 2))
            .toEqual(["2 oz Chocolate"]);
    });

    test('units are preserved', () => {
        expect(scaleRecipe(["2 cups Sugar"], 1.5))
            .toEqual(["3 cups Sugar"]);
        expect(scaleRecipe(["4 tablespoons Oil"], 0.5))
            .toEqual(["2 tablespoons Oil"]);
    });
});

describe('scaleRecipe - multi-word ingredients', () => {
    test('ingredients with multiple words', () => {
        expect(scaleRecipe(["2 C All-purpose Flour"], 2))
            .toEqual(["4 C All-purpose Flour"]);
        expect(scaleRecipe(["1 T Vanilla Extract"], 3))
            .toEqual(["3 T Vanilla Extract"]);
    });

    test('complex ingredient names', () => {
        expect(scaleRecipe(["0.5 C Brown Sugar"], 2))
            .toEqual(["1 C Brown Sugar"]);
        expect(scaleRecipe(["1.5 C Semi-sweet Chocolate Chips"], 2))
            .toEqual(["3 C Semi-sweet Chocolate Chips"]);
    });
});

describe('scaleRecipe - edge cases', () => {
    test('empty array', () => {
        expect(scaleRecipe([], 2)).toEqual([]);
    });

    test('single ingredient', () => {
        expect(scaleRecipe(["1 C Flour"], 2)).toEqual(["2 C Flour"]);
    });

    test('order is preserved', () => {
        const input = ["1 C A", "2 T B", "3 C C"];
        const output = scaleRecipe(input, 2);
        expect(output).toEqual(["2 C A", "4 T B", "6 C C"]);
        expect(output[0]).toBe("2 C A");
        expect(output[1]).toBe("4 T B");
        expect(output[2]).toBe("6 C C");
    });
});

describe('countCharacters - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(countCharacters("hello world"))
            .toEqual(["d 1", "e 1", "h 1", "l 3", "o 2", "r 1", "w 1"]);
        expect(countCharacters("I love coding challenges!"))
            .toEqual(["a 1", "c 2", "d 1", "e 3", "g 2", "h 1",
                "i 2", "l 3", "n 2", "o 2", "s 1", "v 1"]);
        expect(countCharacters("// TODO: Complete this challenge ASAP!"))
            .toEqual(["a 3", "c 2", "d 1", "e 4", "g 1", "h 2",
                "i 1", "l 3", "m 1", "n 1", "o 3", "p 2", "s 2", "t 3"]);
    });

    test('simple words', () => {
        expect(countCharacters("hello")).toEqual(["e 1", "h 1", "l 2", "o 1"]);
        expect(countCharacters("world")).toEqual(["d 1", "l 1", "o 1", "r 1", "w 1"]);
    });
});

describe('countCharacters - case sensitivity', () => {
    test('uppercase letters', () => {
        expect(countCharacters("HELLO"))
            .toEqual(["e 1", "h 1", "l 2", "o 1"]);
        expect(countCharacters("WORLD"))
            .toEqual(["d 1", "l 1", "o 1", "r 1", "w 1"]);
    });

    test('mixed case treated as same', () => {
        expect(countCharacters("AaBbCc")).toEqual(["a 2", "b 2", "c 2"]);
        expect(countCharacters("HeLLo WoRLd"))
            .toEqual(["d 1", "e 1", "h 1", "l 3", "o 2", "r 1", "w 1"]);
    });

    test('all returned letters are lowercase', () => {
        const result = countCharacters("ABC");
        expect(result).toEqual(["a 1", "b 1", "c 1"]);
        result.forEach((item) => {
            const letter = item.split(' ')[0];
            expect(letter).toBe(letter.toLowerCase());
        });
    });
});

describe('countCharacters - ignoring non-letters', () => {
    test('ignore numbers', () => {
        expect(countCharacters("abc123"))
            .toEqual(["a 1", "b 1", "c 1"]);
        expect(countCharacters("test 123 test"))
            .toEqual(["e 2", "s 2", "t 4"]);
    });

    test('ignore spaces', () => {
        expect(countCharacters("a b c"))
            .toEqual(["a 1", "b 1", "c 1"]);
        expect(countCharacters("   hello   "))
            .toEqual(["e 1", "h 1", "l 2", "o 1"]);
    });

    test('ignore punctuation', () => {
        expect(countCharacters("hello!"))
            .toEqual(["e 1", "h 1", "l 2", "o 1"]);
        expect(countCharacters("hello, world!"))
            .toEqual(["d 1", "e 1", "h 1", "l 3", "o 2", "r 1", "w 1"]);
    });

    test('ignore special characters', () => {
        expect(countCharacters("@#$%abc"))
            .toEqual(["a 1", "b 1", "c 1"]);
        expect(countCharacters("test@email.com"))
            .toEqual(["a 1", "c 1", "e 2", "i 1", "l 1", "m 2", "o 1", "s 1", "t 2"]);
    });
});

describe('countCharacters - alphabetical order', () => {
    test('results sorted alphabetically', () => {
        expect(countCharacters("zyx"))
            .toEqual(["x 1", "y 1", "z 1"]);
        expect(countCharacters("dcba"))
            .toEqual(["a 1", "b 1", "c 1", "d 1"]);
    });

    test('mixed order input gives sorted output', () => {
        expect(countCharacters("zebra"))
            .toEqual(["a 1", "b 1", "e 1", "r 1", "z 1"]);
        expect(countCharacters("programming"))
            .toEqual(["a 1", "g 2", "i 1", "m 2", "n 1", "o 1", "p 1", "r 2"]);
    });
});

describe('countCharacters - character counts', () => {
    test('single occurrence', () => {
        expect(countCharacters("abc")).toEqual(["a 1", "b 1", "c 1"]);
        expect(countCharacters("abcdefg"))
            .toEqual(["a 1", "b 1", "c 1", "d 1", "e 1", "f 1", "g 1"]);
    });

    test('multiple occurrences', () => {
        expect(countCharacters("aaa")).toEqual(["a 3"]);
        expect(countCharacters("aabbcc"))
            .toEqual(["a 2", "b 2", "c 2"]);
        expect(countCharacters("mississippi"))
            .toEqual(["i 4", "m 1", "p 2", "s 4"]);
    });

    test('varying counts', () => {
        expect(countCharacters("aaabbc"))
            .toEqual(["a 3", "b 2", "c 1"]);
        expect(countCharacters("bookkeeper"))
            .toEqual(["b 1", "e 3", "k 2", "o 2", "p 1", "r 1"]);
    });
});

describe('countCharacters - edge cases', () => {
    test('empty string', () => {
        expect(countCharacters("")).toEqual([]);
    });

    test('only non-letter characters', () => {
        expect(countCharacters("123!@#")).toEqual([]);
        expect(countCharacters("   ")).toEqual([]);
        expect(countCharacters("!@#$%^&*()")).toEqual([]);
    });

    test('single letter', () => {
        expect(countCharacters("a")).toEqual(["a 1"]);
        expect(countCharacters("Z")).toEqual(["z 1"]);
    });

    test('all alphabet letters', () => {
        const result = countCharacters("abcdefghijklmnopqrstuvwxyz");
        expect(result.length).toBe(26);
        expect(result[0]).toBe("a 1");
        expect(result[25]).toBe("z 1");
    });

    test('only letters not in string are excluded', () => {
        expect(countCharacters("ace")).toEqual(["a 1", "c 1", "e 1"]);
        expect(countCharacters("ace")).not.toContain("b 0");
        expect(countCharacters("ace")).not.toContain("d 0");
    });
});

describe('isValidMessage - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(isValidMessage("hello world", "hw")).toBe(true);
        expect(isValidMessage("ALL CAPITAL LETTERS", "acl")).toBe(true);
        expect(isValidMessage("Coding challenge are boring.", "cca"))
            .toBe(false);
        expect(isValidMessage(
            "The quick brown fox jumps over the lazy dog.",
            "TQBFJOTLD"
        )).toBe(true);
        expect(isValidMessage(
            "The quick brown fox jumps over the lazy dog.",
            "TQBFJOTLDT"
        )).toBe(false);
    });

    test('simple valid messages', () => {
        expect(isValidMessage("hello world", "hw")).toBe(true);
        expect(isValidMessage("abc def", "ad")).toBe(true);
        expect(isValidMessage("test message", "tm")).toBe(true);
    });

    test('simple invalid messages', () => {
        expect(isValidMessage("hello world", "ab")).toBe(false);
        expect(isValidMessage("test message", "ab")).toBe(false);
    });
});

describe('isValidMessage - case insensitivity', () => {
    test('lowercase message and lowercase validator', () => {
        expect(isValidMessage("hello world", "hw")).toBe(true);
        expect(isValidMessage("coding challenge", "cc")).toBe(true);
    });

    test('uppercase message and lowercase validator', () => {
        expect(isValidMessage("HELLO WORLD", "hw")).toBe(true);
        expect(isValidMessage("ALL CAPS", "ac")).toBe(true);
    });

    test('lowercase message and uppercase validator', () => {
        expect(isValidMessage("hello world", "HW")).toBe(true);
        expect(isValidMessage("test message", "TM")).toBe(true);
    });

    test('mixed case in both', () => {
        expect(isValidMessage("Hello World", "hW")).toBe(true);
        expect(isValidMessage("TeSt MeSsAgE", "Tm")).toBe(true);
    });
});

describe('isValidMessage - length mismatch', () => {
    test('validator too short', () => {
        expect(isValidMessage("hello world test", "hw")).toBe(false);
        expect(isValidMessage("one two three", "ot")).toBe(false);
    });

    test('validator too long', () => {
        expect(isValidMessage("hello world", "hwt")).toBe(false);
        expect(isValidMessage("one two", "otf")).toBe(false);
    });

    test('correct length matches', () => {
        expect(isValidMessage("a b c", "abc")).toBe(true);
        expect(isValidMessage("one two three", "ott")).toBe(true);
    });
});

describe('isValidMessage - first letter matching', () => {
    test('correct first letters', () => {
        expect(isValidMessage("apple banana", "ab")).toBe(true);
        expect(isValidMessage("cat dog elephant", "cde")).toBe(true);
    });

    test('incorrect first letters', () => {
        expect(isValidMessage("apple banana", "ba")).toBe(false);
        expect(isValidMessage("cat dog elephant", "xyz")).toBe(false);
    });

    test('partial match not enough', () => {
        expect(isValidMessage("apple banana cherry", "abc")).toBe(true);
        expect(isValidMessage("apple banana cherry", "abd")).toBe(false);
    });
});

describe('isValidMessage - single word', () => {
    test('valid single word', () => {
        expect(isValidMessage("hello", "h")).toBe(true);
        expect(isValidMessage("world", "w")).toBe(true);
    });

    test('invalid single word', () => {
        expect(isValidMessage("hello", "w")).toBe(false);
        expect(isValidMessage("world", "h")).toBe(false);
    });

    test('single word with wrong length validator', () => {
        expect(isValidMessage("hello", "hw")).toBe(false);
        expect(isValidMessage("test", "")).toBe(false);
    });
});

describe('isValidMessage - multiple words', () => {
    test('long valid message', () => {
        expect(isValidMessage("a b c d e f", "abcdef")).toBe(true);
        expect(isValidMessage(
            "one two three four five",
            "ottff"
        )).toBe(true);
    });

    test('long invalid message', () => {
        expect(isValidMessage("a b c d e f", "xbcdef")).toBe(false);
        expect(isValidMessage("one two three four five", "otxff"))
            .toBe(false);
    });
});

describe('isValidMessage - edge cases', () => {
    test('empty message and validator', () => {
        expect(isValidMessage("", "")).toBe(true);
    });

    test('single character words', () => {
        expect(isValidMessage("a b c", "abc")).toBe(true);
        expect(isValidMessage("I am ok", "iao")).toBe(true);
    });

    test('order matters', () => {
        expect(isValidMessage("hello world", "hw")).toBe(true);
        expect(isValidMessage("world hello", "hw")).toBe(false);
        expect(isValidMessage("world hello", "wh")).toBe(true);
    });

    test('repeated letters', () => {
        expect(isValidMessage("apple apple", "aa")).toBe(true);
        expect(isValidMessage("test test test", "ttt")).toBe(true);
    });

    test('different words same first letter', () => {
        expect(isValidMessage("apple apricot avocado", "aaa"))
            .toBe(true);
        expect(isValidMessage("banana berry blueberry", "bbb"))
            .toBe(true);
    });
});

describe('fizzBuzz - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(fizzBuzz(2)).toEqual([1, 2]);
        expect(fizzBuzz(4)).toEqual([1, 2, "Fizz", 4]);
        expect(fizzBuzz(8))
            .toEqual([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8]);
        expect(fizzBuzz(20)).toEqual([1, 2, "Fizz", 4, "Buzz", "Fizz",
            7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz", 16,
            17, "Fizz", 19, "Buzz"]);
    });

    test('fizzBuzz(50) complete test', () => {
        expect(fizzBuzz(50)).toEqual([1, 2, "Fizz", 4, "Buzz", "Fizz",
            7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz", 16,
            17, "Fizz", 19, "Buzz", "Fizz", 22, 23, "Fizz", "Buzz",
            26, "Fizz", 28, 29, "FizzBuzz", 31, 32, "Fizz", 34, "Buzz",
            "Fizz", 37, 38, "Fizz", "Buzz", 41, "Fizz", 43, 44,
            "FizzBuzz", 46, 47, "Fizz", 49, "Buzz"]);
    });
});

describe('fizzBuzz - small numbers', () => {
    test('n = 1', () => {
        expect(fizzBuzz(1)).toEqual([1]);
    });

    test('n = 3 (first Fizz)', () => {
        expect(fizzBuzz(3)).toEqual([1, 2, "Fizz"]);
    });

    test('n = 5 (first Buzz)', () => {
        expect(fizzBuzz(5)).toEqual([1, 2, "Fizz", 4, "Buzz"]);
    });

    test('n = 15 (first FizzBuzz)', () => {
        expect(fizzBuzz(15)).toEqual([1, 2, "Fizz", 4, "Buzz", "Fizz",
            7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]);
    });
});

describe('fizzBuzz - Fizz pattern', () => {
    test('multiples of 3', () => {
        const result = fizzBuzz(12);
        expect(result[2]).toBe("Fizz");
        expect(result[5]).toBe("Fizz");
        expect(result[8]).toBe("Fizz");
        expect(result[11]).toBe("Fizz");
    });

    test('3, 6, 9, 12 are Fizz', () => {
        expect(fizzBuzz(12)[2]).toBe("Fizz");
        expect(fizzBuzz(12)[5]).toBe("Fizz");
        expect(fizzBuzz(12)[8]).toBe("Fizz");
        expect(fizzBuzz(12)[11]).toBe("Fizz");
    });
});

describe('fizzBuzz - Buzz pattern', () => {
    test('multiples of 5', () => {
        const result = fizzBuzz(25);
        expect(result[4]).toBe("Buzz");
        expect(result[9]).toBe("Buzz");
        expect(result[19]).toBe("Buzz");
    });

    test('5, 10, 20, 25 are Buzz (not FizzBuzz)', () => {
        expect(fizzBuzz(25)[4]).toBe("Buzz");
        expect(fizzBuzz(25)[9]).toBe("Buzz");
        expect(fizzBuzz(25)[19]).toBe("Buzz");
        expect(fizzBuzz(25)[24]).toBe("Buzz");
    });
});

describe('fizzBuzz - FizzBuzz pattern', () => {
    test('multiples of 15', () => {
        const result = fizzBuzz(45);
        expect(result[14]).toBe("FizzBuzz");
        expect(result[29]).toBe("FizzBuzz");
        expect(result[44]).toBe("FizzBuzz");
    });

    test('15, 30, 45 are FizzBuzz', () => {
        expect(fizzBuzz(45)[14]).toBe("FizzBuzz");
        expect(fizzBuzz(45)[29]).toBe("FizzBuzz");
        expect(fizzBuzz(45)[44]).toBe("FizzBuzz");
    });

    test('FizzBuzz takes precedence over Fizz and Buzz', () => {
        const result = fizzBuzz(15);
        expect(result[14]).toBe("FizzBuzz");
        expect(result[14]).not.toBe("Fizz");
        expect(result[14]).not.toBe("Buzz");
    });
});

describe('fizzBuzz - regular numbers', () => {
    test('non-multiples remain as numbers', () => {
        const result = fizzBuzz(10);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[3]).toBe(4);
        expect(result[6]).toBe(7);
        expect(result[7]).toBe(8);
    });

    test('1, 2, 4, 7, 8, 11 are numbers', () => {
        expect(fizzBuzz(12)[0]).toBe(1);
        expect(fizzBuzz(12)[1]).toBe(2);
        expect(fizzBuzz(12)[3]).toBe(4);
        expect(fizzBuzz(12)[6]).toBe(7);
        expect(fizzBuzz(12)[7]).toBe(8);
        expect(fizzBuzz(12)[10]).toBe(11);
    });
});

describe('fizzBuzz - array properties', () => {
    test('array length equals n', () => {
        expect(fizzBuzz(5).length).toBe(5);
        expect(fizzBuzz(10).length).toBe(10);
        expect(fizzBuzz(20).length).toBe(20);
        expect(fizzBuzz(100).length).toBe(100);
    });

    test('first element is always 1', () => {
        expect(fizzBuzz(1)[0]).toBe(1);
        expect(fizzBuzz(10)[0]).toBe(1);
        expect(fizzBuzz(50)[0]).toBe(1);
    });

    test('last element depends on n', () => {
        expect(fizzBuzz(2)[1]).toBe(2);
        expect(fizzBuzz(5)[4]).toBe("Buzz");
        expect(fizzBuzz(15)[14]).toBe("FizzBuzz");
    });
});

describe('fizzBuzz - larger numbers', () => {
    test('n = 30', () => {
        const result = fizzBuzz(30);
        expect(result.length).toBe(30);
        expect(result[14]).toBe("FizzBuzz");
        expect(result[29]).toBe("FizzBuzz");
    });

    test('n = 100 has correct structure', () => {
        const result = fizzBuzz(100);
        expect(result.length).toBe(100);
        expect(result[14]).toBe("FizzBuzz");
        expect(result[29]).toBe("FizzBuzz");
        expect(result[44]).toBe("FizzBuzz");
        expect(result[59]).toBe("FizzBuzz");
        expect(result[74]).toBe("FizzBuzz");
        expect(result[89]).toBe("FizzBuzz");
    });

    test('counts in range', () => {
        const result = fizzBuzz(100);
        const fizzes = result.filter((x) => x === "Fizz").length;
        const buzzes = result.filter((x) => x === "Buzz").length;
        const fizzBuzzes = result.filter((x) => x === "FizzBuzz").length;
        expect(fizzBuzzes).toBe(6);
        expect(fizzes).toBe(27);
        expect(buzzes).toBe(14);
    });
});

describe('isFizzBuzz - basic tests', () => {
    test('freeCodeCamp test cases - valid', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4])).toBe(true);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz", 16, 17,
            "Fizz", 19, "Buzz", "Fizz", 22, 23, "Fizz", "Buzz", 26,
            "Fizz", 28, 29, "FizzBuzz", 31, 32, "Fizz", 34, "Buzz",
            "Fizz", 37, 38, "Fizz", "Buzz", 41, "Fizz", 43, 44,
            "FizzBuzz", 46, 47, "Fizz", 49, "Buzz"])).toBe(true);
    });

    test('freeCodeCamp test cases - invalid', () => {
        expect(isFizzBuzz([1, 2, 3, 4])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", 7])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "FizzBuzz"])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "Fizz"])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "Buzz"])).toBe(false);
    });
});

describe('isFizzBuzz - correct sequences', () => {
    test('small valid sequences', () => {
        expect(isFizzBuzz([1])).toBe(true);
        expect(isFizzBuzz([1, 2])).toBe(true);
        expect(isFizzBuzz([1, 2, "Fizz"])).toBe(true);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz"])).toBe(true);
    });

    test('sequence up to first FizzBuzz', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"])).toBe(true);
    });

    test('valid sequence to 20', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz", 16, 17,
            "Fizz", 19, "Buzz"])).toBe(true);
    });
});

describe('isFizzBuzz - incorrect replacements', () => {
    test('number instead of Fizz', () => {
        expect(isFizzBuzz([1, 2, 3])).toBe(false);
        expect(isFizzBuzz([1, 2, 3, 4])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", 6])).toBe(false);
    });

    test('number instead of Buzz', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, 5])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", 10])).toBe(false);
    });

    test('number instead of FizzBuzz', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, 15])).toBe(false);
    });

    test('wrong replacement type', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "Buzz"])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "Fizz"])).toBe(false);
    });
});

describe('isFizzBuzz - wrong starting point', () => {
    test('does not start at 1', () => {
        expect(isFizzBuzz([0, 1, 2])).toBe(false);
        expect(isFizzBuzz([2, "Fizz", 4])).toBe(false);
        expect(isFizzBuzz([5, "Buzz", 7])).toBe(false);
    });

    test('starts with wrong value', () => {
        expect(isFizzBuzz([2])).toBe(false);
        expect(isFizzBuzz(["Fizz"])).toBe(false);
    });
});

describe('isFizzBuzz - missing elements', () => {
    test('skipped numbers', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", 7]))
            .toBe(false);
        expect(isFizzBuzz([1, "Fizz", 4])).toBe(false);
    });

    test('incomplete sequence', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, "FizzBuzz"]))
            .toBe(false);
    });
});

describe('isFizzBuzz - edge cases', () => {
    test('empty array', () => {
        expect(isFizzBuzz([])).toBe(false);
    });

    test('null or undefined', () => {
        expect(isFizzBuzz(null)).toBe(false);
        expect(isFizzBuzz(undefined)).toBe(false);
    });

    test('single element valid', () => {
        expect(isFizzBuzz([1])).toBe(true);
    });

    test('single element invalid', () => {
        expect(isFizzBuzz([2])).toBe(false);
        expect(isFizzBuzz([0])).toBe(false);
    });
});

describe('isFizzBuzz - Fizz validation', () => {
    test('correct Fizz at position 3', () => {
        expect(isFizzBuzz([1, 2, "Fizz"])).toBe(true);
    });

    test('incorrect Fizz positions', () => {
        expect(isFizzBuzz([1, "Fizz", "Fizz"])).toBe(false);
        expect(isFizzBuzz(["Fizz", 2, "Fizz"])).toBe(false);
    });

    test('all Fizz positions correct', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz"])).toBe(true);
    });
});

describe('isFizzBuzz - Buzz validation', () => {
    test('correct Buzz at position 5', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz"])).toBe(true);
    });

    test('incorrect Buzz positions', () => {
        expect(isFizzBuzz([1, 2, "Fizz", "Buzz"])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, 5, "Buzz"])).toBe(false);
    });

    test('all Buzz positions correct', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz"])).toBe(true);
    });
});

describe('isFizzBuzz - FizzBuzz validation', () => {
    test('correct FizzBuzz at position 15', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]))
            .toBe(true);
    });

    test('FizzBuzz instead of Fizz or Buzz at 15', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "Fizz"])).toBe(false);
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "Buzz"])).toBe(false);
    });

    test('multiple FizzBuzz positions', () => {
        expect(isFizzBuzz([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8,
            "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz", 16, 17,
            "Fizz", 19, "Buzz", "Fizz", 22, 23, "Fizz", "Buzz", 26,
            "Fizz", 28, 29, "FizzBuzz"])).toBe(true);
    });
});

describe('calculateAge - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(calculateAge("2000-11-20")).toBe(25);
        expect(calculateAge("2000-12-01")).toBe(24);
        expect(calculateAge("2014-10-25")).toBe(11);
        expect(calculateAge("1994-01-06")).toBe(31);
        expect(calculateAge("1994-12-14")).toBe(30);
    });
});

describe('calculateAge - birthday before Nov 27', () => {
    test('birthday already happened in 2025', () => {
        expect(calculateAge("2000-01-01")).toBe(25);
        expect(calculateAge("2000-06-15")).toBe(25);
        expect(calculateAge("2000-11-27")).toBe(25);
    });

    test('early in the year', () => {
        expect(calculateAge("1990-01-01")).toBe(35);
        expect(calculateAge("1995-02-14")).toBe(30);
        expect(calculateAge("2010-03-20")).toBe(15);
    });

    test('summer birthdays', () => {
        expect(calculateAge("2000-06-01")).toBe(25);
        expect(calculateAge("2000-07-15")).toBe(25);
        expect(calculateAge("2000-08-31")).toBe(25);
    });
});

describe('calculateAge - birthday after Nov 27', () => {
    test('birthday has not happened yet in 2025', () => {
        expect(calculateAge("2000-11-28")).toBe(24);
        expect(calculateAge("2000-12-01")).toBe(24);
        expect(calculateAge("2000-12-31")).toBe(24);
    });

    test('December birthdays', () => {
        expect(calculateAge("1990-12-01")).toBe(34);
        expect(calculateAge("1995-12-15")).toBe(29);
        expect(calculateAge("2010-12-25")).toBe(14);
    });

    test('late November birthdays', () => {
        expect(calculateAge("2000-11-28")).toBe(24);
        expect(calculateAge("2000-11-29")).toBe(24);
        expect(calculateAge("2000-11-30")).toBe(24);
    });
});

describe('calculateAge - exact date Nov 27', () => {
    test('born on Nov 27', () => {
        expect(calculateAge("2000-11-27")).toBe(25);
        expect(calculateAge("1990-11-27")).toBe(35);
        expect(calculateAge("2010-11-27")).toBe(15);
    });

    test('birthday is today', () => {
        expect(calculateAge("2000-11-27")).toBe(25);
        expect(calculateAge("1995-11-27")).toBe(30);
    });
});

describe('calculateAge - different birth years', () => {
    test('born in 2000s', () => {
        expect(calculateAge("2000-01-01")).toBe(25);
        expect(calculateAge("2005-06-15")).toBe(20);
        expect(calculateAge("2010-09-20")).toBe(15);
    });

    test('born in 1990s', () => {
        expect(calculateAge("1990-01-01")).toBe(35);
        expect(calculateAge("1995-06-15")).toBe(30);
        expect(calculateAge("1999-12-31")).toBe(25);
    });

    test('born in 1980s', () => {
        expect(calculateAge("1980-01-01")).toBe(45);
        expect(calculateAge("1985-06-15")).toBe(40);
        expect(calculateAge("1989-12-31")).toBe(35);
    });
});

describe('calculateAge - young ages', () => {
    test('teenagers', () => {
        expect(calculateAge("2010-01-01")).toBe(15);
        expect(calculateAge("2012-06-15")).toBe(13);
        expect(calculateAge("2015-09-20")).toBe(10);
    });

    test('children', () => {
        expect(calculateAge("2020-01-01")).toBe(5);
        expect(calculateAge("2022-06-15")).toBe(3);
        expect(calculateAge("2024-11-20")).toBe(1);
    });

    test('babies', () => {
        expect(calculateAge("2025-01-01")).toBe(0);
        expect(calculateAge("2025-06-15")).toBe(0);
        expect(calculateAge("2025-11-27")).toBe(0);
    });
});

describe('calculateAge - boundary cases', () => {
    test('one day before reference date', () => {
        expect(calculateAge("2000-11-26")).toBe(25);
        expect(calculateAge("1990-11-26")).toBe(35);
    });

    test('one day after reference date', () => {
        expect(calculateAge("2000-11-28")).toBe(24);
        expect(calculateAge("1990-11-28")).toBe(34);
    });

    test('November boundary', () => {
        expect(calculateAge("2000-11-01")).toBe(25);
        expect(calculateAge("2000-11-30")).toBe(24);
    });

    test('December boundary', () => {
        expect(calculateAge("2000-12-01")).toBe(24);
        expect(calculateAge("2000-12-31")).toBe(24);
    });
});

describe('calculateAge - specific scenarios', () => {
    test('leap year birthdays', () => {
        expect(calculateAge("2000-02-29")).toBe(25);
        expect(calculateAge("2004-02-29")).toBe(21);
    });

    test('first and last day of months', () => {
        expect(calculateAge("2000-01-01")).toBe(25);
        expect(calculateAge("2000-01-31")).toBe(25);
        expect(calculateAge("2000-12-01")).toBe(24);
        expect(calculateAge("2000-12-31")).toBe(24);
    });

    test('year transitions', () => {
        expect(calculateAge("1999-12-31")).toBe(25);
        expect(calculateAge("2000-01-01")).toBe(25);
    });
});