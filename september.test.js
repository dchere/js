const { formatNumber, tribonacciSequence, getLongestWord, getHeadings, rgbToHex, isPangram, repeatVowels, isValidIPv4, rotate, numberOfVideos, digitsOrLetters, isMirror, isPerfectSquare, secondLargest, speeding, isSpam, numberOfFiles, numberOfPhotos, costToFill, generateSlug, capitalize, adjustThermostat, getWords, parseRomanNumeral, buildAcronym, allUnique, arrayDiff, reverseSentence, tooMuchScreenTime, findMissingNumbers } = require('./september');

describe('formatNumber - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(formatNumber("05552340182")).toBe("+0 (555) 234-0182");
        expect(formatNumber("15554354792")).toBe("+1 (555) 435-4792");
    });

    test('simple phone numbers', () => {
        expect(formatNumber("12345678901")).toBe("+1 (234) 567-8901");
        expect(formatNumber("19876543210")).toBe("+1 (987) 654-3210");
    });
});

describe('formatNumber - different country codes', () => {
    test('country code 0', () => {
        expect(formatNumber("01234567890")).toBe("+0 (123) 456-7890");
        expect(formatNumber("09876543210")).toBe("+0 (987) 654-3210");
    });

    test('country code 1', () => {
        expect(formatNumber("11234567890")).toBe("+1 (123) 456-7890");
        expect(formatNumber("15551234567")).toBe("+1 (555) 123-4567");
    });

    test('country code 2-9', () => {
        expect(formatNumber("21234567890")).toBe("+2 (123) 456-7890");
        expect(formatNumber("31234567890")).toBe("+3 (123) 456-7890");
        expect(formatNumber("91234567890")).toBe("+9 (123) 456-7890");
    });
});

describe('formatNumber - area codes', () => {
    test('common area codes', () => {
        expect(formatNumber("12125551234")).toBe("+1 (212) 555-1234");
        expect(formatNumber("13105551234")).toBe("+1 (310) 555-1234");
        expect(formatNumber("17185551234")).toBe("+1 (718) 555-1234");
    });

    test('area code with zeros', () => {
        expect(formatNumber("10005551234")).toBe("+1 (000) 555-1234");
        expect(formatNumber("10015551234")).toBe("+1 (001) 555-1234");
    });

    test('area code all same digit', () => {
        expect(formatNumber("11111111111")).toBe("+1 (111) 111-1111");
        expect(formatNumber("15555555555")).toBe("+1 (555) 555-5555");
    });
});

describe('formatNumber - exchange codes', () => {
    test('different exchange codes', () => {
        expect(formatNumber("12121234567")).toBe("+1 (212) 123-4567");
        expect(formatNumber("12125551234")).toBe("+1 (212) 555-1234");
        expect(formatNumber("12129991234")).toBe("+1 (212) 999-1234");
    });

    test('exchange code with zeros', () => {
        expect(formatNumber("12120001234")).toBe("+1 (212) 000-1234");
        expect(formatNumber("12120011234")).toBe("+1 (212) 001-1234");
    });
});

describe('formatNumber - subscriber numbers', () => {
    test('different subscriber numbers', () => {
        expect(formatNumber("12125550001")).toBe("+1 (212) 555-0001");
        expect(formatNumber("12125551234")).toBe("+1 (212) 555-1234");
        expect(formatNumber("12125559999")).toBe("+1 (212) 555-9999");
    });

    test('subscriber number all zeros', () => {
        expect(formatNumber("12125550000")).toBe("+1 (212) 555-0000");
    });

    test('subscriber number all nines', () => {
        expect(formatNumber("12125559999")).toBe("+1 (212) 555-9999");
    });
});

describe('formatNumber - format structure', () => {
    test('has correct format structure', () => {
        const result = formatNumber("12125551234");
        expect(result).toMatch(/^\+\d \(\d{3}\) \d{3}-\d{4}$/);
    });

    test('has + prefix', () => {
        expect(formatNumber("12125551234")).toContain("+");
        expect(formatNumber("12125551234")[0]).toBe("+");
    });

    test('has parentheses around area code', () => {
        expect(formatNumber("12125551234")).toContain("(212)");
    });

    test('has hyphen before last 4 digits', () => {
        expect(formatNumber("12125551234")).toContain("-1234");
    });

    test('correct spacing', () => {
        const result = formatNumber("12125551234");
        expect(result[2]).toBe(" ");
        expect(result[8]).toBe(" ");
    });
});

describe('formatNumber - all digits', () => {
    test('all zeros', () => {
        expect(formatNumber("00000000000")).toBe("+0 (000) 000-0000");
    });

    test('all ones', () => {
        expect(formatNumber("11111111111")).toBe("+1 (111) 111-1111");
    });

    test('all nines', () => {
        expect(formatNumber("99999999999")).toBe("+9 (999) 999-9999");
    });

    test('ascending sequence', () => {
        expect(formatNumber("01234567890")).toBe("+0 (123) 456-7890");
    });

    test('descending sequence', () => {
        expect(formatNumber("09876543210")).toBe("+0 (987) 654-3210");
    });
});

describe('formatNumber - specific patterns', () => {
    test('alternating digits', () => {
        expect(formatNumber("10101010101")).toBe("+1 (010) 101-0101");
        expect(formatNumber("12121212121")).toBe("+1 (212) 121-2121");
    });

    test('repeated patterns', () => {
        expect(formatNumber("12312312312")).toBe("+1 (231) 231-2312");
        expect(formatNumber("14561456145")).toBe("+1 (456) 145-6145");
    });
});

describe('formatNumber - edge cases', () => {
    test('starts with different digits', () => {
        expect(formatNumber("01234567890")).toBe("+0 (123) 456-7890");
        expect(formatNumber("51234567890")).toBe("+5 (123) 456-7890");
        expect(formatNumber("91234567890")).toBe("+9 (123) 456-7890");
    });

    test('various combinations', () => {
        expect(formatNumber("11231231234")).toBe("+1 (123) 123-1234");
        expect(formatNumber("15559998877")).toBe("+1 (555) 999-8877");
        expect(formatNumber("17778889999")).toBe("+1 (777) 888-9999");
    });
});

describe('tribonacciSequence - freeCodeCamp tests', () => {
    test('standard sequence with length 20', () => {
        expect(tribonacciSequence([0, 0, 1], 20)).toEqual([0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513]);
    });

    test('length 1 returns first element only', () => {
        expect(tribonacciSequence([21, 32, 43], 1)).toEqual([21]);
    });

    test('length 0 returns empty array', () => {
        expect(tribonacciSequence([0, 0, 1], 0)).toEqual([]);
    });

    test('length 2 returns first two elements', () => {
        expect(tribonacciSequence([10, 20, 30], 2)).toEqual([10, 20]);
    });

    test('length 3 returns all three starting elements', () => {
        expect(tribonacciSequence([10, 20, 30], 3)).toEqual([10, 20, 30]);
    });

    test('custom starting sequence with length 8', () => {
        expect(tribonacciSequence([123, 456, 789], 8)).toEqual([123, 456, 789, 1368, 2613, 4770, 8751, 16134]);
    });
});

describe('tribonacciSequence - standard sequence', () => {
    test('first 10 numbers', () => {
        expect(tribonacciSequence([0, 0, 1], 10)).toEqual([0, 0, 1, 1, 2, 4, 7, 13, 24, 44]);
    });

    test('first 5 numbers', () => {
        expect(tribonacciSequence([0, 0, 1], 5)).toEqual([0, 0, 1, 1, 2]);
    });

    test('first 15 numbers', () => {
        expect(tribonacciSequence([0, 0, 1], 15)).toEqual([0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927]);
    });
});

describe('tribonacciSequence - custom starting sequences', () => {
    test('starting with [1, 1, 1]', () => {
        expect(tribonacciSequence([1, 1, 1], 10)).toEqual([1, 1, 1, 3, 5, 9, 17, 31, 57, 105]);
    });

    test('starting with [1, 2, 3]', () => {
        expect(tribonacciSequence([1, 2, 3], 10)).toEqual([1, 2, 3, 6, 11, 20, 37, 68, 125, 230]);
    });

    test('starting with [5, 10, 15]', () => {
        expect(tribonacciSequence([5, 10, 15], 10)).toEqual([5, 10, 15, 30, 55, 100, 185, 340, 625, 1150]);
    });

    test('starting with negative numbers', () => {
        expect(tribonacciSequence([-1, -2, -3], 10)).toEqual([-1, -2, -3, -6, -11, -20, -37, -68, -125, -230]);
    });

    test('starting with mixed positive and negative', () => {
        expect(tribonacciSequence([1, -1, 2], 10)).toEqual([1, -1, 2, 2, 3, 7, 12, 22, 41, 75]);
    });

    test('starting with large numbers', () => {
        expect(tribonacciSequence([100, 200, 300], 7)).toEqual([100, 200, 300, 600, 1100, 2000, 3700]);
    });
});

describe('tribonacciSequence - edge cases for length', () => {
    test('length 0 with different starting sequences', () => {
        expect(tribonacciSequence([1, 2, 3], 0)).toEqual([]);
        expect(tribonacciSequence([100, 200, 300], 0)).toEqual([]);
        expect(tribonacciSequence([-5, -10, -15], 0)).toEqual([]);
    });

    test('length 1 with different starting sequences', () => {
        expect(tribonacciSequence([0, 0, 1], 1)).toEqual([0]);
        expect(tribonacciSequence([5, 10, 15], 1)).toEqual([5]);
        expect(tribonacciSequence([-10, 20, 30], 1)).toEqual([-10]);
    });

    test('length 2 with different starting sequences', () => {
        expect(tribonacciSequence([1, 2, 3], 2)).toEqual([1, 2]);
        expect(tribonacciSequence([10, 20, 30], 2)).toEqual([10, 20]);
        expect(tribonacciSequence([-5, 5, 10], 2)).toEqual([-5, 5]);
    });

    test('length 3 returns exact starting sequence', () => {
        expect(tribonacciSequence([0, 0, 1], 3)).toEqual([0, 0, 1]);
        expect(tribonacciSequence([7, 8, 9], 3)).toEqual([7, 8, 9]);
        expect(tribonacciSequence([100, 200, 300], 3)).toEqual([100, 200, 300]);
    });

    test('length 4 adds one number', () => {
        expect(tribonacciSequence([0, 0, 1], 4)).toEqual([0, 0, 1, 1]);
        expect(tribonacciSequence([1, 2, 3], 4)).toEqual([1, 2, 3, 6]);
        expect(tribonacciSequence([10, 20, 30], 4)).toEqual([10, 20, 30, 60]);
    });
});

describe('tribonacciSequence - longer sequences', () => {
    test('length 25', () => {
        const result = tribonacciSequence([0, 0, 1], 25);
        expect(result).toHaveLength(25);
        expect(result).toEqual([0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504, 927, 1705, 3136, 5768, 10609, 19513, 35890, 66012, 121415, 223317, 410744]);
    });

    test('length 30 with [1, 1, 1]', () => {
        const result = tribonacciSequence([1, 1, 1], 30);
        expect(result).toHaveLength(30);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(1);
        expect(result[29]).toBe(20603361);
    });
});

describe('tribonacciSequence - sequence properties', () => {
    test('each element is sum of previous three (after first three)', () => {
        const result = tribonacciSequence([1, 2, 3], 10);
        for (let i = 3; i < result.length; i++) {
            expect(result[i]).toBe(result[i - 1] + result[i - 2] + result[i - 3]);
        }
    });

    test('returned array has correct length', () => {
        expect(tribonacciSequence([0, 0, 1], 5)).toHaveLength(5);
        expect(tribonacciSequence([1, 2, 3], 10)).toHaveLength(10);
        expect(tribonacciSequence([5, 10, 15], 15)).toHaveLength(15);
    });

    test('starting sequence is preserved', () => {
        const result = tribonacciSequence([7, 8, 9], 10);
        expect(result[0]).toBe(7);
        expect(result[1]).toBe(8);
        expect(result[2]).toBe(9);
    });
});

describe('tribonacciSequence - special cases', () => {
    test('all zeros', () => {
        expect(tribonacciSequence([0, 0, 0], 10)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('starting with zeros and ones', () => {
        expect(tribonacciSequence([0, 1, 0], 10)).toEqual([0, 1, 0, 1, 2, 3, 6, 11, 20, 37]);
    });

    test('starting with [2, 4, 8]', () => {
        expect(tribonacciSequence([2, 4, 8], 10)).toEqual([2, 4, 8, 14, 26, 48, 88, 162, 298, 548]);
    });

    test('starting with decimals', () => {
        expect(tribonacciSequence([0.5, 1, 1.5], 7)).toEqual([0.5, 1, 1.5, 3, 5.5, 10, 18.5]);
    });
});

describe('getLongestWord - freeCodeCamp tests', () => {
    test('simple sentence', () => {
        expect(getLongestWord("coding is fun")).toBe("coding");
    });

    test('sentence with period at end', () => {
        expect(getLongestWord("Coding challenges are fun and educational.")).toBe("educational");
    });

    test('sentence with multiple long words', () => {
        expect(getLongestWord("This sentence has multiple long words.")).toBe("sentence");
    });
});

describe('getLongestWord - basic functionality', () => {
    test('single word', () => {
        expect(getLongestWord("hello")).toBe("hello");
    });

    test('two words of different lengths', () => {
        expect(getLongestWord("hi world")).toBe("world");
        expect(getLongestWord("amazing day")).toBe("amazing");
    });

    test('three words', () => {
        expect(getLongestWord("the quick fox")).toBe("quick");
    });

    test('all words same length returns first', () => {
        expect(getLongestWord("cat dog rat")).toBe("cat");
        expect(getLongestWord("one two six")).toBe("one");
    });
});

describe('getLongestWord - with periods', () => {
    test('period at end of sentence', () => {
        expect(getLongestWord("Hello world.")).toBe("Hello");
    });

    test('period after longest word', () => {
        expect(getLongestWord("short longer.")).toBe("longer");
    });

    test('multiple periods', () => {
        expect(getLongestWord("This. is. a. test.")).toBe("This");
    });

    test('period makes words equal length', () => {
        expect(getLongestWord("hello world.")).toBe("hello");
    });

    test('period in middle of sentence', () => {
        expect(getLongestWord("Mr. Smith is here")).toBe("Smith");
    });
});

describe('getLongestWord - tie scenarios', () => {
    test('two words tied, returns first', () => {
        expect(getLongestWord("apple grape")).toBe("apple");
        expect(getLongestWord("hello world")).toBe("hello");
    });

    test('three words tied, returns first', () => {
        expect(getLongestWord("cat dog rat")).toBe("cat");
    });

    test('tie at beginning and end', () => {
        expect(getLongestWord("start a stops")).toBe("start");
    });

    test('tie with periods making equal length', () => {
        expect(getLongestWord("hello world.")).toBe("hello");
    });
});

describe('getLongestWord - various word lengths', () => {
    test('very short words', () => {
        expect(getLongestWord("I am ok")).toBe("am");
    });

    test('mix of short and long', () => {
        expect(getLongestWord("a remarkable day")).toBe("remarkable");
    });

    test('long word at start', () => {
        expect(getLongestWord("programming is fun")).toBe("programming");
    });

    test('long word in middle', () => {
        expect(getLongestWord("I love programming today")).toBe("programming");
    });

    test('long word at end', () => {
        expect(getLongestWord("I love programming")).toBe("programming");
    });
});

describe('getLongestWord - capitalization', () => {
    test('capitalized first word', () => {
        expect(getLongestWord("Hello world")).toBe("Hello");
    });

    test('all uppercase', () => {
        expect(getLongestWord("HELLO WORLD")).toBe("HELLO");
    });

    test('mixed case', () => {
        expect(getLongestWord("ThIs WoRd TeSt")).toBe("ThIs");
    });

    test('capitalized longest word', () => {
        expect(getLongestWord("the LONGEST word")).toBe("LONGEST");
    });
});

describe('getLongestWord - complex sentences', () => {
    test('long sentence with many words', () => {
        expect(getLongestWord("The quick brown fox jumps over the lazy dog")).toBe("quick");
    });

    test('sentence with commas (no special handling)', () => {
        expect(getLongestWord("Hello, how are you today?")).toBe("Hello,");
    });

    test('multiple spaces (would create empty strings)', () => {
        expect(getLongestWord("hello  world")).toBe("hello");
    });

    test('sentence with numbers', () => {
        expect(getLongestWord("I have 123 apples")).toBe("apples");
    });
});

describe('getLongestWord - edge cases', () => {
    test('sentence ending with period', () => {
        expect(getLongestWord("JavaScript is awesome.")).toBe("JavaScript");
    });

    test('all words with periods', () => {
        expect(getLongestWord("Dr. Mr. Ms.")).toBe("Dr");
    });

    test('word with multiple periods removed', () => {
        expect(getLongestWord("test... word")).toBe("test");
    });

    test('very long word', () => {
        expect(getLongestWord("short antidisestablishmentarianism word")).toBe("antidisestablishmentarianism");
    });

    test('single letter words', () => {
        expect(getLongestWord("a I am")).toBe("am");
    });
});

describe('getLongestWord - real-world examples', () => {
    test('programming statement', () => {
        expect(getLongestWord("JavaScript is a powerful programming language.")).toBe("programming");
    });

    test('question', () => {
        expect(getLongestWord("What is your favorite programming language?")).toBe("programming");
    });

    test('technical sentence', () => {
        expect(getLongestWord("Algorithm optimization requires careful analysis.")).toBe("optimization");
    });

    test('simple statement', () => {
        expect(getLongestWord("I enjoy coding every day.")).toBe("coding");
    });
});

describe('getHeadings - freeCodeCamp tests', () => {
    test('simple headers without spaces', () => {
        expect(getHeadings("name,age,city")).toEqual(["name", "age", "city"]);
    });

    test('headers with spaces in names', () => {
        expect(getHeadings("first name,last name,phone")).toEqual(["first name", "last name", "phone"]);
    });

    test('headers with leading and trailing spaces', () => {
        expect(getHeadings("username , email , signup date ")).toEqual(["username", "email", "signup date"]);
    });
});

describe('getHeadings - basic functionality', () => {
    test('single header', () => {
        expect(getHeadings("name")).toEqual(["name"]);
    });

    test('two headers', () => {
        expect(getHeadings("name,age")).toEqual(["name", "age"]);
    });

    test('multiple headers', () => {
        expect(getHeadings("id,name,email,phone,address")).toEqual(["id", "name", "email", "phone", "address"]);
    });

    test('no spaces anywhere', () => {
        expect(getHeadings("a,b,c,d")).toEqual(["a", "b", "c", "d"]);
    });
});

describe('getHeadings - whitespace handling', () => {
    test('leading spaces only', () => {
        expect(getHeadings(" name, age, city")).toEqual(["name", "age", "city"]);
    });

    test('trailing spaces only', () => {
        expect(getHeadings("name ,age ,city ")).toEqual(["name", "age", "city"]);
    });

    test('both leading and trailing spaces', () => {
        expect(getHeadings(" name , age , city ")).toEqual(["name", "age", "city"]);
    });

    test('multiple spaces', () => {
        expect(getHeadings("  name  ,  age  ,  city  ")).toEqual(["name", "age", "city"]);
    });

    test('inconsistent spacing', () => {
        expect(getHeadings("name, age ,city  , state")).toEqual(["name", "age", "city", "state"]);
    });

    test('no spaces at all', () => {
        expect(getHeadings("name,age,city")).toEqual(["name", "age", "city"]);
    });
});

describe('getHeadings - headers with internal spaces', () => {
    test('single word with spaces between', () => {
        expect(getHeadings("first name,last name")).toEqual(["first name", "last name"]);
    });

    test('mixed single and multi-word headers', () => {
        expect(getHeadings("id,first name,age,email address")).toEqual(["id", "first name", "age", "email address"]);
    });

    test('all multi-word headers', () => {
        expect(getHeadings("first name,last name,email address,phone number")).toEqual(["first name", "last name", "email address", "phone number"]);
    });

    test('three-word headers', () => {
        expect(getHeadings("date of birth,place of work")).toEqual(["date of birth", "place of work"]);
    });
});

describe('getHeadings - special characters', () => {
    test('headers with underscores', () => {
        expect(getHeadings("first_name,last_name,email_address")).toEqual(["first_name", "last_name", "email_address"]);
    });

    test('headers with hyphens', () => {
        expect(getHeadings("first-name,last-name,e-mail")).toEqual(["first-name", "last-name", "e-mail"]);
    });

    test('headers with numbers', () => {
        expect(getHeadings("field1,field2,field3")).toEqual(["field1", "field2", "field3"]);
    });

    test('mixed special characters', () => {
        expect(getHeadings("user_id,first-name,email2")).toEqual(["user_id", "first-name", "email2"]);
    });

    test('headers with dots', () => {
        expect(getHeadings("user.name,user.email,user.id")).toEqual(["user.name", "user.email", "user.id"]);
    });
});

describe('getHeadings - case sensitivity', () => {
    test('all lowercase', () => {
        expect(getHeadings("name,age,city")).toEqual(["name", "age", "city"]);
    });

    test('all uppercase', () => {
        expect(getHeadings("NAME,AGE,CITY")).toEqual(["NAME", "AGE", "CITY"]);
    });

    test('mixed case', () => {
        expect(getHeadings("Name,Age,City")).toEqual(["Name", "Age", "City"]);
    });

    test('camelCase headers', () => {
        expect(getHeadings("firstName,lastName,emailAddress")).toEqual(["firstName", "lastName", "emailAddress"]);
    });

    test('PascalCase headers', () => {
        expect(getHeadings("FirstName,LastName,EmailAddress")).toEqual(["FirstName", "LastName", "EmailAddress"]);
    });
});

describe('getHeadings - real-world CSV examples', () => {
    test('user database headers', () => {
        expect(getHeadings("id,username,email,created_at,updated_at")).toEqual(["id", "username", "email", "created_at", "updated_at"]);
    });

    test('contact list headers', () => {
        expect(getHeadings("first name,last name,phone number,email,address")).toEqual(["first name", "last name", "phone number", "email", "address"]);
    });

    test('product catalog headers', () => {
        expect(getHeadings("sku,name,price,quantity,category")).toEqual(["sku", "name", "price", "quantity", "category"]);
    });

    test('employee records', () => {
        expect(getHeadings("employee_id,full_name,department,salary,hire_date")).toEqual(["employee_id", "full_name", "department", "salary", "hire_date"]);
    });

    test('sales data', () => {
        expect(getHeadings("date,product,quantity,revenue,region")).toEqual(["date", "product", "quantity", "revenue", "region"]);
    });
});

describe('getHeadings - edge cases', () => {
    test('single character headers', () => {
        expect(getHeadings("a,b,c")).toEqual(["a", "b", "c"]);
    });

    test('empty strings after trim (spaces only)', () => {
        expect(getHeadings(" , , ")).toEqual(["", "", ""]);
    });

    test('very long header names', () => {
        expect(getHeadings("this_is_a_very_long_header_name,short,another_very_long_header_name_here")).toEqual(["this_is_a_very_long_header_name", "short", "another_very_long_header_name_here"]);
    });

    test('many headers', () => {
        const result = getHeadings("a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p");
        expect(result).toHaveLength(16);
        expect(result).toEqual(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]);
    });

    test('headers with tabs are trimmed', () => {
        expect(getHeadings("name\t,age\t,city")).toEqual(["name", "age", "city"]);
    });
});

describe('getHeadings - spacing variations', () => {
    test('no space after comma', () => {
        expect(getHeadings("name,age,city")).toEqual(["name", "age", "city"]);
    });

    test('single space after comma', () => {
        expect(getHeadings("name, age, city")).toEqual(["name", "age", "city"]);
    });

    test('multiple spaces after comma', () => {
        expect(getHeadings("name,  age,  city")).toEqual(["name", "age", "city"]);
    });

    test('space before comma', () => {
        expect(getHeadings("name ,age ,city")).toEqual(["name", "age", "city"]);
    });

    test('space on both sides of comma', () => {
        expect(getHeadings("name , age , city")).toEqual(["name", "age", "city"]);
    });
});

describe('rgbToHex - freeCodeCamp tests', () => {
    test('white color', () => {
        expect(rgbToHex("rgb(255, 255, 255)")).toBe("#ffffff");
    });

    test('small RGB values', () => {
        expect(rgbToHex("rgb(1, 11, 111)")).toBe("#010b6f");
    });

    test('light blue color', () => {
        expect(rgbToHex("rgb(173, 216, 230)")).toBe("#add8e6");
    });

    test('medium blue color', () => {
        expect(rgbToHex("rgb(79, 123, 201)")).toBe("#4f7bc9");
    });
});

describe('rgbToHex - basic colors', () => {
    test('black', () => {
        expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    test('white', () => {
        expect(rgbToHex("rgb(255, 255, 255)")).toBe("#ffffff");
    });

    test('red', () => {
        expect(rgbToHex("rgb(255, 0, 0)")).toBe("#ff0000");
    });

    test('green', () => {
        expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00ff00");
    });

    test('blue', () => {
        expect(rgbToHex("rgb(0, 0, 255)")).toBe("#0000ff");
    });

    test('yellow', () => {
        expect(rgbToHex("rgb(255, 255, 0)")).toBe("#ffff00");
    });

    test('cyan', () => {
        expect(rgbToHex("rgb(0, 255, 255)")).toBe("#00ffff");
    });

    test('magenta', () => {
        expect(rgbToHex("rgb(255, 0, 255)")).toBe("#ff00ff");
    });
});

describe('rgbToHex - single digit values', () => {
    test('all single digits', () => {
        expect(rgbToHex("rgb(1, 2, 3)")).toBe("#010203");
    });

    test('all zeros', () => {
        expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    test('mixed single and double digits', () => {
        expect(rgbToHex("rgb(5, 50, 150)")).toBe("#053296");
    });

    test('single digit variations', () => {
        expect(rgbToHex("rgb(9, 9, 9)")).toBe("#090909");
        expect(rgbToHex("rgb(1, 1, 1)")).toBe("#010101");
        expect(rgbToHex("rgb(7, 8, 9)")).toBe("#070809");
    });
});

describe('rgbToHex - gray scale', () => {
    test('medium gray', () => {
        expect(rgbToHex("rgb(128, 128, 128)")).toBe("#808080");
    });

    test('dark gray', () => {
        expect(rgbToHex("rgb(64, 64, 64)")).toBe("#404040");
    });

    test('light gray', () => {
        expect(rgbToHex("rgb(192, 192, 192)")).toBe("#c0c0c0");
    });

    test('silver', () => {
        expect(rgbToHex("rgb(192, 192, 192)")).toBe("#c0c0c0");
    });

    test('dim gray', () => {
        expect(rgbToHex("rgb(105, 105, 105)")).toBe("#696969");
    });
});

describe('rgbToHex - common web colors', () => {
    test('tomato', () => {
        expect(rgbToHex("rgb(255, 99, 71)")).toBe("#ff6347");
    });

    test('orange', () => {
        expect(rgbToHex("rgb(255, 165, 0)")).toBe("#ffa500");
    });

    test('gold', () => {
        expect(rgbToHex("rgb(255, 215, 0)")).toBe("#ffd700");
    });

    test('lime', () => {
        expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00ff00");
    });

    test('aqua', () => {
        expect(rgbToHex("rgb(0, 255, 255)")).toBe("#00ffff");
    });

    test('navy', () => {
        expect(rgbToHex("rgb(0, 0, 128)")).toBe("#000080");
    });

    test('purple', () => {
        expect(rgbToHex("rgb(128, 0, 128)")).toBe("#800080");
    });

    test('maroon', () => {
        expect(rgbToHex("rgb(128, 0, 0)")).toBe("#800000");
    });
});

describe('rgbToHex - hex letter variations', () => {
    test('contains a', () => {
        expect(rgbToHex("rgb(170, 0, 0)")).toBe("#aa0000");
    });

    test('contains b', () => {
        expect(rgbToHex("rgb(187, 0, 0)")).toBe("#bb0000");
    });

    test('contains c', () => {
        expect(rgbToHex("rgb(204, 0, 0)")).toBe("#cc0000");
    });

    test('contains d', () => {
        expect(rgbToHex("rgb(221, 0, 0)")).toBe("#dd0000");
    });

    test('contains e', () => {
        expect(rgbToHex("rgb(238, 0, 0)")).toBe("#ee0000");
    });

    test('contains f', () => {
        expect(rgbToHex("rgb(255, 0, 0)")).toBe("#ff0000");
    });

    test('mixed hex letters', () => {
        expect(rgbToHex("rgb(171, 205, 239)")).toBe("#abcdef");
    });
});

describe('rgbToHex - padded values', () => {
    test('first value needs padding', () => {
        expect(rgbToHex("rgb(1, 255, 255)")).toBe("#01ffff");
    });

    test('second value needs padding', () => {
        expect(rgbToHex("rgb(255, 1, 255)")).toBe("#ff01ff");
    });

    test('third value needs padding', () => {
        expect(rgbToHex("rgb(255, 255, 1)")).toBe("#ffff01");
    });

    test('all values need padding', () => {
        expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
        expect(rgbToHex("rgb(1, 2, 3)")).toBe("#010203");
        expect(rgbToHex("rgb(9, 8, 7)")).toBe("#090807");
    });

    test('two values need padding', () => {
        expect(rgbToHex("rgb(5, 6, 255)")).toBe("#0506ff");
        expect(rgbToHex("rgb(255, 5, 6)")).toBe("#ff0506");
    });
});

describe('rgbToHex - format variations', () => {
    test('no spaces after commas', () => {
        expect(rgbToHex("rgb(255,255,255)")).toBe("#ffffff");
    });

    test('multiple spaces', () => {
        expect(rgbToHex("rgb(255,  255,  255)")).toBe("#ffffff");
    });

    test('spaces inside parentheses', () => {
        expect(rgbToHex("rgb( 255, 255, 255 )")).toBe("#ffffff");
    });

    test('various spacing patterns', () => {
        expect(rgbToHex("rgb(100,150,200)")).toBe("#6496c8");
        expect(rgbToHex("rgb( 100 , 150 , 200 )")).toBe("#6496c8");
    });
});

describe('rgbToHex - mid-range values', () => {
    test('values around 100', () => {
        expect(rgbToHex("rgb(100, 100, 100)")).toBe("#646464");
        expect(rgbToHex("rgb(99, 100, 101)")).toBe("#636465");
    });

    test('values around 150', () => {
        expect(rgbToHex("rgb(150, 150, 150)")).toBe("#969696");
    });

    test('values around 200', () => {
        expect(rgbToHex("rgb(200, 200, 200)")).toBe("#c8c8c8");
    });

    test('mixed mid-range values', () => {
        expect(rgbToHex("rgb(100, 150, 200)")).toBe("#6496c8");
        expect(rgbToHex("rgb(50, 100, 150)")).toBe("#326496");
    });
});

describe('rgbToHex - edge cases', () => {
    test('minimum values', () => {
        expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
    });

    test('maximum values', () => {
        expect(rgbToHex("rgb(255, 255, 255)")).toBe("#ffffff");
    });

    test('one max, others min', () => {
        expect(rgbToHex("rgb(255, 0, 0)")).toBe("#ff0000");
        expect(rgbToHex("rgb(0, 255, 0)")).toBe("#00ff00");
        expect(rgbToHex("rgb(0, 0, 255)")).toBe("#0000ff");
    });

    test('two max, one min', () => {
        expect(rgbToHex("rgb(255, 255, 0)")).toBe("#ffff00");
        expect(rgbToHex("rgb(255, 0, 255)")).toBe("#ff00ff");
        expect(rgbToHex("rgb(0, 255, 255)")).toBe("#00ffff");
    });
});

describe('rgbToHex - output format validation', () => {
    test('starts with hash', () => {
        const result = rgbToHex("rgb(100, 100, 100)");
        expect(result[0]).toBe("#");
    });

    test('has exactly 7 characters', () => {
        expect(rgbToHex("rgb(0, 0, 0)")).toHaveLength(7);
        expect(rgbToHex("rgb(255, 255, 255)")).toHaveLength(7);
        expect(rgbToHex("rgb(1, 2, 3)")).toHaveLength(7);
    });

    test('all lowercase letters', () => {
        expect(rgbToHex("rgb(255, 255, 255)")).toBe("#ffffff");
        expect(rgbToHex("rgb(170, 187, 204)")).toBe("#aabbcc");
        expect(rgbToHex("rgb(221, 238, 255)")).toBe("#ddeeff");
    });

    test('no shorthand', () => {
        expect(rgbToHex("rgb(255, 255, 255)")).toBe("#ffffff");
        expect(rgbToHex("rgb(0, 0, 0)")).toBe("#000000");
        expect(rgbToHex("rgb(17, 17, 17)")).toBe("#111111");
    });
});

describe('isPangram - freeCodeCamp tests', () => {
    test('simple word with exact letters', () => {
        expect(isPangram("hello", "helo")).toBe(true);
    });

    test('word missing required letter', () => {
        expect(isPangram("hello", "hel")).toBe(false);
    });

    test('word has extra letters not in set', () => {
        expect(isPangram("hello", "helow")).toBe(false);
    });

    test('sentence with spaces', () => {
        expect(isPangram("hello world", "helowrd")).toBe(true);
    });

    test('sentence with uppercase and punctuation', () => {
        expect(isPangram("Hello World!", "helowrd")).toBe(true);
    });

    test('sentence with extra letter in set', () => {
        expect(isPangram("Hello World!", "heliowrd")).toBe(false);
    });

    test('word missing letters from set', () => {
        expect(isPangram("freeCodeCamp", "frcdmp")).toBe(false);
    });

    test('classic pangram', () => {
        expect(isPangram("The quick brown fox jumps over the lazy dog.", "abcdefghijklmnopqrstuvwxyz")).toBe(true);
    });
});

describe('isPangram - exact matches', () => {
    test('single letter match', () => {
        expect(isPangram("a", "a")).toBe(true);
    });

    test('single letter mismatch', () => {
        expect(isPangram("a", "b")).toBe(false);
    });

    test('two letters match', () => {
        expect(isPangram("ab", "ab")).toBe(true);
        expect(isPangram("ba", "ab")).toBe(true);
    });

    test('exact word match', () => {
        expect(isPangram("cat", "cat")).toBe(true);
        expect(isPangram("cat", "atc")).toBe(true);
    });
});

describe('isPangram - case insensitivity', () => {
    test('lowercase sentence, lowercase letters', () => {
        expect(isPangram("hello", "helo")).toBe(true);
    });

    test('uppercase sentence, lowercase letters', () => {
        expect(isPangram("HELLO", "helo")).toBe(true);
    });

    test('mixed case sentence, lowercase letters', () => {
        expect(isPangram("HeLLo", "helo")).toBe(true);
    });

    test('mixed case with spaces', () => {
        expect(isPangram("HeLLo WoRLd", "helowrd")).toBe(true);
    });
});

describe('isPangram - non-alphabetical characters', () => {
    test('sentence with spaces only', () => {
        expect(isPangram("h e l l o", "helo")).toBe(true);
    });

    test('sentence with punctuation', () => {
        expect(isPangram("hello!", "helo")).toBe(true);
        expect(isPangram("hello.", "helo")).toBe(true);
        expect(isPangram("hello?", "helo")).toBe(true);
    });

    test('sentence with numbers', () => {
        expect(isPangram("hello123", "helo")).toBe(true);
        expect(isPangram("h3ll0", "hl")).toBe(true);
    });

    test('sentence with special characters', () => {
        expect(isPangram("h@e#l$l%o", "helo")).toBe(true);
        expect(isPangram("h-e-l-l-o", "helo")).toBe(true);
    });

    test('sentence with mixed non-alphabetical', () => {
        expect(isPangram("Hello, World! 123", "helowrd")).toBe(true);
    });
});

describe('isPangram - missing letters', () => {
    test('sentence missing one letter', () => {
        expect(isPangram("heo", "helo")).toBe(false);
    });

    test('sentence missing multiple letters', () => {
        expect(isPangram("he", "hello")).toBe(false);
    });

    test('sentence has no letters from set', () => {
        expect(isPangram("abc", "xyz")).toBe(false);
    });

    test('empty sentence', () => {
        expect(isPangram("", "abc")).toBe(false);
    });
});

describe('isPangram - extra letters', () => {
    test('sentence has one extra letter', () => {
        expect(isPangram("hello", "helo")).toBe(true);
        expect(isPangram("hellos", "helo")).toBe(false);
    });

    test('sentence has multiple extra letters', () => {
        expect(isPangram("hello world", "helo")).toBe(false);
    });

    test('set has extra letters', () => {
        expect(isPangram("hello", "helox")).toBe(false);
        expect(isPangram("hello", "heloxy")).toBe(false);
    });
});

describe('isPangram - repeated letters', () => {
    test('sentence has repeated letters', () => {
        expect(isPangram("hello", "helo")).toBe(true);
        expect(isPangram("heeelllooo", "helo")).toBe(true);
    });

    test('only repeated letters', () => {
        expect(isPangram("aaa", "a")).toBe(true);
        expect(isPangram("aaabbb", "ab")).toBe(true);
    });

    test('repeated letters with spaces', () => {
        expect(isPangram("h e l l o", "helo")).toBe(true);
    });
});

describe('isPangram - alphabet tests', () => {
    test('full alphabet pangram', () => {
        expect(isPangram("The quick brown fox jumps over the lazy dog", "abcdefghijklmnopqrstuvwxyz")).toBe(true);
    });

    test('another pangram', () => {
        expect(isPangram("Pack my box with five dozen liquor jugs", "abcdefghijklmnopqrstuvwxyz")).toBe(true);
    });

    test('almost pangram missing one letter', () => {
        expect(isPangram("The quick brown fox jumps over the lazy cat", "abcdefghijklmnopqrstuvwxyz")).toBe(false);
    });

    test('sentence with all letters but extra', () => {
        expect(isPangram("The quick brown fox jumps over the lazy dog", "abcdefghijklmnopqrstuvwxy")).toBe(false);
    });
});

describe('isPangram - partial alphabet', () => {
    test('uses only vowels', () => {
        expect(isPangram("aeiou", "aeiou")).toBe(true);
        expect(isPangram("a e i o u", "aeiou")).toBe(true);
    });

    test('uses only consonants subset', () => {
        expect(isPangram("bcdfg", "bcdfg")).toBe(true);
    });

    test('vowels with punctuation', () => {
        expect(isPangram("a, e, i, o, u!", "aeiou")).toBe(true);
    });

    test('missing one vowel', () => {
        expect(isPangram("aeio", "aeiou")).toBe(false);
    });
});

describe('isPangram - word patterns', () => {
    test('simple word', () => {
        expect(isPangram("cat", "cat")).toBe(true);
        expect(isPangram("dog", "dog")).toBe(true);
    });

    test('word with repeated letter', () => {
        expect(isPangram("book", "bok")).toBe(true);
        expect(isPangram("letter", "letr")).toBe(true);
    });

    test('compound word', () => {
        expect(isPangram("notebook", "notek")).toBe(false);
        expect(isPangram("notebook", "notebk")).toBe(true);
    });
});

describe('isPangram - longer texts', () => {
    test('sentence with many words', () => {
        expect(isPangram("the cat sat on the mat", "thecasonm")).toBe(true);
    });

    test('paragraph style text', () => {
        expect(isPangram("This is a test. This is only a test.", "thisaeonly")).toBe(true);
    });

    test('text with mixed punctuation', () => {
        expect(isPangram("Hello, how are you? I'm fine!", "helowaryoumfin")).toBe(true);
    });
});

describe('isPangram - edge cases', () => {
    test('empty sentence with empty set', () => {
        expect(isPangram("", "")).toBe(true);
    });

    test('spaces only', () => {
        expect(isPangram("   ", "")).toBe(true);
    });

    test('punctuation only', () => {
        expect(isPangram("!@#$%", "")).toBe(true);
    });

    test('numbers only', () => {
        expect(isPangram("12345", "")).toBe(true);
    });

    test('single letter repeated many times', () => {
        expect(isPangram("aaaaaaaa", "a")).toBe(true);
    });
});

describe('isPangram - order independence', () => {
    test('letters in different order', () => {
        expect(isPangram("abc", "cba")).toBe(true);
        expect(isPangram("xyz", "zyx")).toBe(true);
    });

    test('sentence letters in different order', () => {
        expect(isPangram("world hello", "helowrd")).toBe(true);
    });

    test('scrambled letters', () => {
        expect(isPangram("dcba", "abcd")).toBe(true);
    });
});

describe('repeatVowels - freeCodeCamp tests', () => {
    test('simple sentence', () => {
        expect(repeatVowels("hello world")).toBe("helloo wooorld");
    });

    test('mixed case with consonants', () => {
        expect(repeatVowels("freeCodeCamp")).toBe("freeeCooodeeeeCaaaaamp");
    });

    test('all uppercase vowels', () => {
        expect(repeatVowels("AEIOU")).toBe("AEeIiiOoooUuuuu");
    });

    test('long sentence', () => {
        expect(repeatVowels("I like eating ice cream in Iceland")).toBe("I liikeee eeeeaaaaatiiiiiing iiiiiiiceeeeeeee creeeeeeeeeaaaaaaaaaam iiiiiiiiiiin Iiiiiiiiiiiiceeeeeeeeeeeeelaaaaaaaaaaaaaand");
    });
});

describe('repeatVowels - single vowels', () => {
    test('single lowercase a', () => {
        expect(repeatVowels("a")).toBe("a");
    });

    test('single uppercase A', () => {
        expect(repeatVowels("A")).toBe("A");
    });

    test('each vowel once', () => {
        expect(repeatVowels("aeiou")).toBe("aeeiiioooouuuuu");
    });

    test('each vowel uppercase once', () => {
        expect(repeatVowels("AEIOU")).toBe("AEeIiiOoooUuuuu");
    });
});

describe('repeatVowels - consonants only', () => {
    test('single consonant', () => {
        expect(repeatVowels("b")).toBe("b");
    });

    test('multiple consonants', () => {
        expect(repeatVowels("bcd")).toBe("bcd");
    });

    test('word with no vowels', () => {
        expect(repeatVowels("xyz")).toBe("xyz");
    });

    test('longer consonant string', () => {
        expect(repeatVowels("bcdfghjklmnpqrstvwxyz")).toBe("bcdfghjklmnpqrstvwxyz");
    });
});

describe('repeatVowels - vowel progression', () => {
    test('first vowel unchanged', () => {
        expect(repeatVowels("a")).toBe("a");
        expect(repeatVowels("cat")).toBe("cat");
    });

    test('second vowel doubled', () => {
        expect(repeatVowels("ae")).toBe("aee");
        expect(repeatVowels("cafe")).toBe("cafee");
    });

    test('third vowel tripled', () => {
        expect(repeatVowels("aei")).toBe("aeeiii");
    });

    test('four vowels', () => {
        expect(repeatVowels("aeio")).toBe("aeeiiioooo");
    });

    test('five vowels', () => {
        expect(repeatVowels("aeiou")).toBe("aeeiiioooouuuuu");
    });
});

describe('repeatVowels - case preservation', () => {
    test('uppercase first vowel', () => {
        expect(repeatVowels("A")).toBe("A");
        expect(repeatVowels("Apple")).toBe("Applee");
    });

    test('uppercase second vowel becomes lowercase repeats', () => {
        expect(repeatVowels("AE")).toBe("AEe");
        expect(repeatVowels("ApplE")).toBe("ApplEe");
    });

    test('mixed case vowels', () => {
        expect(repeatVowels("AeIoU")).toBe("AeeIiiooooUuuuu");
    });

    test('all uppercase', () => {
        expect(repeatVowels("HELLO")).toBe("HELLOo");
    });

    test('consonants keep original case', () => {
        expect(repeatVowels("HeLLo")).toBe("HeLLoo");
    });
});

describe('repeatVowels - words with spaces', () => {
    test('two words', () => {
        expect(repeatVowels("hi yo")).toBe("hi yoo");
    });

    test('three words', () => {
        expect(repeatVowels("the cat sat")).toBe("the caat saaat");
    });

    test('multiple spaces preserved', () => {
        expect(repeatVowels("a  e")).toBe("a  ee");
    });

    test('space does not reset counter', () => {
        expect(repeatVowels("a e")).toBe("a ee");
    });
});

describe('repeatVowels - punctuation', () => {
    test('period at end', () => {
        expect(repeatVowels("hello.")).toBe("helloo.");
    });

    test('comma in sentence', () => {
        expect(repeatVowels("hi, yo")).toBe("hi, yoo");
    });

    test('exclamation mark', () => {
        expect(repeatVowels("hello!")).toBe("helloo!");
    });

    test('question mark', () => {
        expect(repeatVowels("are you?")).toBe("aree yooouuuu?");
    });

    test('mixed punctuation', () => {
        expect(repeatVowels("Hello, world!")).toBe("Helloo, wooorld!");
    });
});

describe('repeatVowels - numbers', () => {
    test('numbers preserved', () => {
        expect(repeatVowels("a1e2")).toBe("a1ee2");
    });

    test('number between vowels', () => {
        expect(repeatVowels("a1e")).toBe("a1ee");
    });

    test('mixed numbers and vowels', () => {
        expect(repeatVowels("h3ll0")).toBe("h3ll0");
    });
});

describe('repeatVowels - special characters', () => {
    test('hyphen preserved', () => {
        expect(repeatVowels("a-e")).toBe("a-ee");
    });

    test('underscore preserved', () => {
        expect(repeatVowels("a_e")).toBe("a_ee");
    });

    test('at symbol', () => {
        expect(repeatVowels("a@e")).toBe("a@ee");
    });

    test('mixed special characters', () => {
        expect(repeatVowels("a!@#e")).toBe("a!@#ee");
    });
});

describe('repeatVowels - repeated vowels in input', () => {
    test('double a', () => {
        expect(repeatVowels("aa")).toBe("aaa");
    });

    test('triple e', () => {
        expect(repeatVowels("eee")).toBe("eeeeee");
    });

    test('word with repeated vowels', () => {
        expect(repeatVowels("book")).toBe("boook");
    });

    test('word with consecutive different vowels', () => {
        expect(repeatVowels("ae")).toBe("aee");
    });
});

describe('repeatVowels - all vowel types', () => {
    test('lowercase a', () => {
        expect(repeatVowels("ba")).toBe("ba");
    });

    test('lowercase e', () => {
        expect(repeatVowels("be")).toBe("be");
    });

    test('lowercase i', () => {
        expect(repeatVowels("bi")).toBe("bi");
    });

    test('lowercase o', () => {
        expect(repeatVowels("bo")).toBe("bo");
    });

    test('lowercase u', () => {
        expect(repeatVowels("bu")).toBe("bu");
    });

    test('uppercase vowels', () => {
        expect(repeatVowels("BAE")).toBe("BAEe");
    });
});

describe('repeatVowels - edge cases', () => {
    test('empty string', () => {
        expect(repeatVowels("")).toBe("");
    });

    test('only spaces', () => {
        expect(repeatVowels("   ")).toBe("   ");
    });

    test('only punctuation', () => {
        expect(repeatVowels("!@#")).toBe("!@#");
    });

    test('single character consonant', () => {
        expect(repeatVowels("x")).toBe("x");
    });

    test('single character vowel', () => {
        expect(repeatVowels("a")).toBe("a");
    });
});

describe('repeatVowels - real-world examples', () => {
    test('greeting', () => {
        expect(repeatVowels("Hello")).toBe("Helloo");
    });

    test('farewell', () => {
        expect(repeatVowels("Goodbye")).toBe("Gooodbyeee");
    });

    test('question', () => {
        expect(repeatVowels("How are you?")).toBe("How aareee yoooouuuuu?");
    });

    test('sentence with commas', () => {
        expect(repeatVowels("I am fine, thank you.")).toBe("I aam fiiineeee, thaaaaank yoooooouuuuuuu.");
    });

    test('short poem line', () => {
        expect(repeatVowels("Roses are red")).toBe("Rosees aaareeee reeeeed");
    });
});

describe('repeatVowels - vowel count progression', () => {
    test('10 vowels', () => {
        const result = repeatVowels("aaaaaaaaaa");
        expect(result.length).toBe(55); // 1+2+3+4+5+6+7+8+9+10
    });

    test('count increases continuously', () => {
        expect(repeatVowels("a b e")).toBe("a b ee");
        expect(repeatVowels("a b c e")).toBe("a b c ee");
    });

    test('consonants do not affect count', () => {
        expect(repeatVowels("axe")).toBe("axee");
        expect(repeatVowels("axxxe")).toBe("axxxee");
    });
});

describe('repeatVowels - complex patterns', () => {
    test('alternating vowels and consonants', () => {
        expect(repeatVowels("abacada")).toBe("abaacaaadaaaa");
    });

    test('multiple words with various vowels', () => {
        expect(repeatVowels("cat dog")).toBe("cat doog");
    });

    test('sentence with mixed case', () => {
        expect(repeatVowels("The Quick Brown Fox")).toBe("The Quuiiick Broooown Fooooox");
    });

    test('long word', () => {
        expect(repeatVowels("beautiful")).toBe("beaauuutiiiifuuuuul");
    });
});

describe('repeatVowels - validation', () => {
    test('vowel repeats are lowercase', () => {
        const result = repeatVowels("AE");
        expect(result).toBe("AEe");
        expect(result[2]).toBe("e");
    });

    test('first vowel not repeated', () => {
        const result = repeatVowels("ae");
        expect(result.length).toBe(3); // a + e + e
    });

    test('original vowel case preserved', () => {
        const result = repeatVowels("AEI");
        expect(result[0]).toBe("A");
        expect(result[1]).toBe("E");
        expect(result[3]).toBe("I");
    });
});

describe('isValidIPv4 - freeCodeCamp tests', () => {
    test('standard valid IP', () => {
        expect(isValidIPv4("192.168.1.1")).toBe(true);
    });

    test('all zeros', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
    });

    test('leading zero in second octet', () => {
        expect(isValidIPv4("255.01.50.111")).toBe(false);
    });

    test('leading zeros in second octet', () => {
        expect(isValidIPv4("255.00.50.111")).toBe(false);
    });

    test('first octet out of range', () => {
        expect(isValidIPv4("256.101.50.115")).toBe(false);
    });

    test('missing last octet', () => {
        expect(isValidIPv4("192.168.101.")).toBe(false);
    });

    test('no dots', () => {
        expect(isValidIPv4("192168145213")).toBe(false);
    });
});

describe('isValidIPv4 - valid addresses', () => {
    test('localhost', () => {
        expect(isValidIPv4("127.0.0.1")).toBe(true);
    });

    test('all max values', () => {
        expect(isValidIPv4("255.255.255.255")).toBe(true);
    });

    test('all zeros', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
    });

    test('common private network', () => {
        expect(isValidIPv4("10.0.0.1")).toBe(true);
    });

    test('another private network', () => {
        expect(isValidIPv4("172.16.0.1")).toBe(true);
    });

    test('mixed values', () => {
        expect(isValidIPv4("1.2.3.4")).toBe(true);
    });

    test('broadcast address', () => {
        expect(isValidIPv4("255.255.255.255")).toBe(true);
    });

    test('google DNS', () => {
        expect(isValidIPv4("8.8.8.8")).toBe(true);
    });
});

describe('isValidIPv4 - leading zeros', () => {
    test('leading zero in first octet', () => {
        expect(isValidIPv4("01.0.0.0")).toBe(false);
    });

    test('leading zero in second octet', () => {
        expect(isValidIPv4("1.01.0.0")).toBe(false);
    });

    test('leading zero in third octet', () => {
        expect(isValidIPv4("1.0.01.0")).toBe(false);
    });

    test('leading zero in fourth octet', () => {
        expect(isValidIPv4("1.0.0.01")).toBe(false);
    });

    test('multiple leading zeros', () => {
        expect(isValidIPv4("001.002.003.004")).toBe(false);
    });

    test('zero with leading zero', () => {
        expect(isValidIPv4("00.0.0.0")).toBe(false);
    });

    test('single zero is valid', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
    });
});

describe('isValidIPv4 - out of range values', () => {
    test('first octet 256', () => {
        expect(isValidIPv4("256.0.0.0")).toBe(false);
    });

    test('second octet 256', () => {
        expect(isValidIPv4("0.256.0.0")).toBe(false);
    });

    test('third octet 256', () => {
        expect(isValidIPv4("0.0.256.0")).toBe(false);
    });

    test('fourth octet 256', () => {
        expect(isValidIPv4("0.0.0.256")).toBe(false);
    });

    test('all octets over 255', () => {
        expect(isValidIPv4("300.300.300.300")).toBe(false);
    });

    test('first octet 1000', () => {
        expect(isValidIPv4("1000.0.0.0")).toBe(false);
    });

    test('negative value not possible with string', () => {
        expect(isValidIPv4("192.168.-1.1")).toBe(false);
    });
});

describe('isValidIPv4 - wrong number of octets', () => {
    test('only three octets', () => {
        expect(isValidIPv4("192.168.1")).toBe(false);
    });

    test('only two octets', () => {
        expect(isValidIPv4("192.168")).toBe(false);
    });

    test('only one octet', () => {
        expect(isValidIPv4("192")).toBe(false);
    });

    test('five octets', () => {
        expect(isValidIPv4("192.168.1.1.1")).toBe(false);
    });

    test('six octets', () => {
        expect(isValidIPv4("1.2.3.4.5.6")).toBe(false);
    });

    test('missing first octet', () => {
        expect(isValidIPv4(".168.1.1")).toBe(false);
    });

    test('missing second octet', () => {
        expect(isValidIPv4("192..1.1")).toBe(false);
    });

    test('missing third octet', () => {
        expect(isValidIPv4("192.168..1")).toBe(false);
    });

    test('missing fourth octet', () => {
        expect(isValidIPv4("192.168.1.")).toBe(false);
    });
});

describe('isValidIPv4 - non-numeric characters', () => {
    test('letter in first octet', () => {
        expect(isValidIPv4("a.168.1.1")).toBe(false);
    });

    test('letter in last octet', () => {
        expect(isValidIPv4("192.168.1.a")).toBe(false);
    });

    test('letters in all octets', () => {
        expect(isValidIPv4("abc.def.ghi.jkl")).toBe(false);
    });

    test('space in octet', () => {
        expect(isValidIPv4("192. 168.1.1")).toBe(false);
    });

    test('special characters', () => {
        expect(isValidIPv4("192.168.@.1")).toBe(false);
    });

    test('mixed letters and numbers', () => {
        expect(isValidIPv4("192.168a.1.1")).toBe(false);
    });
});

describe('isValidIPv4 - empty values', () => {
    test('empty string', () => {
        expect(isValidIPv4("")).toBe(false);
    });

    test('only dots', () => {
        expect(isValidIPv4("...")).toBe(false);
    });

    test('empty first octet', () => {
        expect(isValidIPv4(".0.0.0")).toBe(false);
    });

    test('all empty octets', () => {
        expect(isValidIPv4("...")).toBe(false);
    });
});

describe('isValidIPv4 - boundary values', () => {
    test('255 in all octets', () => {
        expect(isValidIPv4("255.255.255.255")).toBe(true);
    });

    test('0 in all octets', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
    });

    test('254 in all octets', () => {
        expect(isValidIPv4("254.254.254.254")).toBe(true);
    });

    test('1 in all octets', () => {
        expect(isValidIPv4("1.1.1.1")).toBe(true);
    });

    test('mixed boundary values', () => {
        expect(isValidIPv4("0.255.0.255")).toBe(true);
    });
});

describe('isValidIPv4 - special cases', () => {
    test('no dots at all', () => {
        expect(isValidIPv4("192168001001")).toBe(false);
    });

    test('too many dots', () => {
        expect(isValidIPv4("192.168.1.1.")).toBe(false);
    });

    test('dots at start', () => {
        expect(isValidIPv4(".192.168.1.1")).toBe(false);
    });

    test('consecutive dots', () => {
        expect(isValidIPv4("192..168.1.1")).toBe(false);
    });

    test('spaces around dots', () => {
        expect(isValidIPv4("192 . 168 . 1 . 1")).toBe(false);
    });
});

describe('isValidIPv4 - real-world examples', () => {
    test('common router IP', () => {
        expect(isValidIPv4("192.168.0.1")).toBe(true);
    });

    test('another router IP', () => {
        expect(isValidIPv4("192.168.1.254")).toBe(true);
    });

    test('Google public DNS', () => {
        expect(isValidIPv4("8.8.4.4")).toBe(true);
    });

    test('Cloudflare DNS', () => {
        expect(isValidIPv4("1.1.1.1")).toBe(true);
    });

    test('OpenDNS', () => {
        expect(isValidIPv4("208.67.222.222")).toBe(true);
    });

    test('localhost', () => {
        expect(isValidIPv4("127.0.0.1")).toBe(true);
    });
});

describe('isValidIPv4 - each octet range', () => {
    test('first octet at boundaries', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
        expect(isValidIPv4("255.0.0.0")).toBe(true);
        expect(isValidIPv4("256.0.0.0")).toBe(false);
    });

    test('second octet at boundaries', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
        expect(isValidIPv4("0.255.0.0")).toBe(true);
        expect(isValidIPv4("0.256.0.0")).toBe(false);
    });

    test('third octet at boundaries', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
        expect(isValidIPv4("0.0.255.0")).toBe(true);
        expect(isValidIPv4("0.0.256.0")).toBe(false);
    });

    test('fourth octet at boundaries', () => {
        expect(isValidIPv4("0.0.0.0")).toBe(true);
        expect(isValidIPv4("0.0.0.255")).toBe(true);
        expect(isValidIPv4("0.0.0.256")).toBe(false);
    });
});

describe('isValidIPv4 - numeric edge cases', () => {
    test('very large numbers', () => {
        expect(isValidIPv4("999.999.999.999")).toBe(false);
    });

    test('three digit valid numbers', () => {
        expect(isValidIPv4("123.234.200.100")).toBe(true);
    });

    test('single digit numbers', () => {
        expect(isValidIPv4("1.2.3.4")).toBe(true);
    });

    test('two digit numbers', () => {
        expect(isValidIPv4("12.23.34.45")).toBe(true);
    });

    test('mixed digit lengths', () => {
        expect(isValidIPv4("1.22.123.200")).toBe(true);
    });
});

describe('isValidIPv4 - validation rules', () => {
    test('all rules satisfied', () => {
        expect(isValidIPv4("192.168.1.1")).toBe(true);
    });

    test('fails range check', () => {
        expect(isValidIPv4("256.168.1.1")).toBe(false);
    });

    test('fails leading zero check', () => {
        expect(isValidIPv4("192.168.01.1")).toBe(false);
    });

    test('fails octet count check', () => {
        expect(isValidIPv4("192.168.1")).toBe(false);
    });

    test('fails numeric check', () => {
        expect(isValidIPv4("192.168.a.1")).toBe(false);
    });
});

describe('rotate - freeCodeCamp tests', () => {
    test('1x1 matrix', () => {
        expect(rotate([[1]])).toEqual([[1]]);
    });

    test('2x2 matrix', () => {
        expect(rotate([[1, 2], [3, 4]])).toEqual([[3, 1], [4, 2]]);
    });

    test('3x3 matrix', () => {
        expect(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
    });

    test('3x3 matrix with zeros and ones', () => {
        expect(rotate([[0, 1, 0], [1, 0, 1], [0, 0, 0]])).toEqual([[0, 1, 0], [0, 0, 1], [0, 1, 0]]);
    });
});

describe('rotate - 1x1 matrices', () => {
    test('single zero', () => {
        expect(rotate([[0]])).toEqual([[0]]);
    });

    test('single positive number', () => {
        expect(rotate([[5]])).toEqual([[5]]);
    });

    test('single large number', () => {
        expect(rotate([[100]])).toEqual([[100]]);
    });

    test('single negative number', () => {
        expect(rotate([[-1]])).toEqual([[-1]]);
    });
});

describe('rotate - 2x2 matrices', () => {
    test('all zeros', () => {
        expect(rotate([[0, 0], [0, 0]])).toEqual([[0, 0], [0, 0]]);
    });

    test('all ones', () => {
        expect(rotate([[1, 1], [1, 1]])).toEqual([[1, 1], [1, 1]]);
    });

    test('sequential numbers', () => {
        expect(rotate([[1, 2], [3, 4]])).toEqual([[3, 1], [4, 2]]);
    });

    test('identity matrix', () => {
        expect(rotate([[1, 0], [0, 1]])).toEqual([[0, 1], [1, 0]]);
    });

    test('diagonal pattern', () => {
        expect(rotate([[1, 0], [0, 1]])).toEqual([[0, 1], [1, 0]]);
    });

    test('larger numbers', () => {
        expect(rotate([[10, 20], [30, 40]])).toEqual([[30, 10], [40, 20]]);
    });
});

describe('rotate - 3x3 matrices', () => {
    test('all zeros', () => {
        expect(rotate([[0, 0, 0], [0, 0, 0], [0, 0, 0]])).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    });

    test('all ones', () => {
        expect(rotate([[1, 1, 1], [1, 1, 1], [1, 1, 1]])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
    });

    test('sequential 1-9', () => {
        expect(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
    });

    test('identity matrix', () => {
        expect(rotate([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toEqual([[0, 0, 1], [0, 1, 0], [1, 0, 0]]);
    });

    test('diagonal values', () => {
        expect(rotate([[1, 0, 0], [0, 2, 0], [0, 0, 3]])).toEqual([[0, 0, 1], [0, 2, 0], [3, 0, 0]]);
    });

    test('border values only', () => {
        expect(rotate([[1, 2, 3], [4, 0, 5], [6, 7, 8]])).toEqual([[6, 4, 1], [7, 0, 2], [8, 5, 3]]);
    });
});

describe('rotate - 4x4 matrices', () => {
    test('all zeros', () => {
        expect(rotate([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]])).toEqual([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    });

    test('sequential 1-16', () => {
        expect(rotate([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])).toEqual([[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]);
    });

    test('identity matrix', () => {
        expect(rotate([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])).toEqual([[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]]);
    });

    test('corners only', () => {
        expect(rotate([[1, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 0, 4]])).toEqual([[3, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [4, 0, 0, 2]]);
    });
});

describe('rotate - 5x5 matrices', () => {
    test('sequential 1-25', () => {
        const input = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];
        const expected = [[21, 16, 11, 6, 1], [22, 17, 12, 7, 2], [23, 18, 13, 8, 3], [24, 19, 14, 9, 4], [25, 20, 15, 10, 5]];
        expect(rotate(input)).toEqual(expected);
    });

    test('identity matrix', () => {
        const input = [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
        const expected = [[0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]];
        expect(rotate(input)).toEqual(expected);
    });
});

describe('rotate - special patterns', () => {
    test('checkerboard 2x2', () => {
        expect(rotate([[0, 1], [1, 0]])).toEqual([[1, 0], [0, 1]]);
    });

    test('checkerboard 3x3', () => {
        expect(rotate([[0, 1, 0], [1, 0, 1], [0, 1, 0]])).toEqual([[0, 1, 0], [1, 0, 1], [0, 1, 0]]);
    });

    test('all same row values', () => {
        expect(rotate([[1, 1, 1], [2, 2, 2], [3, 3, 3]])).toEqual([[3, 2, 1], [3, 2, 1], [3, 2, 1]]);
    });

    test('increasing rows', () => {
        expect(rotate([[1, 1, 1], [2, 2, 2], [3, 3, 3]])).toEqual([[3, 2, 1], [3, 2, 1], [3, 2, 1]]);
    });

    test('increasing columns', () => {
        expect(rotate([[1, 2, 3], [1, 2, 3], [1, 2, 3]])).toEqual([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
    });
});

describe('rotate - negative numbers', () => {
    test('all negative 2x2', () => {
        expect(rotate([[-1, -2], [-3, -4]])).toEqual([[-3, -1], [-4, -2]]);
    });

    test('all negative 3x3', () => {
        expect(rotate([[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]])).toEqual([[-7, -4, -1], [-8, -5, -2], [-9, -6, -3]]);
    });

    test('mixed positive and negative', () => {
        expect(rotate([[1, -2], [-3, 4]])).toEqual([[-3, 1], [4, -2]]);
    });

    test('zeros with negatives', () => {
        expect(rotate([[0, -1], [1, 0]])).toEqual([[1, 0], [0, -1]]);
    });
});

describe('rotate - large numbers', () => {
    test('hundreds', () => {
        expect(rotate([[100, 200], [300, 400]])).toEqual([[300, 100], [400, 200]]);
    });

    test('thousands', () => {
        expect(rotate([[1000, 2000], [3000, 4000]])).toEqual([[3000, 1000], [4000, 2000]]);
    });

    test('mixed sizes', () => {
        expect(rotate([[1, 100, 1000], [10, 200, 2000], [20, 300, 3000]])).toEqual([[20, 10, 1], [300, 200, 100], [3000, 2000, 1000]]);
    });
});

describe('rotate - rotation mechanics', () => {
    test('top-left becomes top-right', () => {
        const result = rotate([[1, 2], [3, 4]]);
        expect(result[0][1]).toBe(1);
    });

    test('top-right becomes bottom-right', () => {
        const result = rotate([[1, 2], [3, 4]]);
        expect(result[1][1]).toBe(2);
    });

    test('bottom-right becomes bottom-left', () => {
        const result = rotate([[1, 2], [3, 4]]);
        expect(result[1][0]).toBe(4);
    });

    test('bottom-left becomes top-left', () => {
        const result = rotate([[1, 2], [3, 4]]);
        expect(result[0][0]).toBe(3);
    });

    test('center stays center in 3x3', () => {
        const result = rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        expect(result[1][1]).toBe(5);
    });
});

describe('rotate - output validation', () => {
    test('maintains matrix dimensions', () => {
        const result = rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        expect(result.length).toBe(3);
        expect(result[0].length).toBe(3);
        expect(result[1].length).toBe(3);
        expect(result[2].length).toBe(3);
    });

    test('creates new array', () => {
        const input = [[1, 2], [3, 4]];
        const result = rotate(input);
        expect(result).not.toBe(input);
    });

    test('result has correct structure', () => {
        const result = rotate([[1, 2], [3, 4]]);
        expect(Array.isArray(result)).toBe(true);
        expect(Array.isArray(result[0])).toBe(true);
        expect(Array.isArray(result[1])).toBe(true);
    });
});

describe('rotate - multiple rotations', () => {
    test('two rotations equal 180 degrees', () => {
        const input = [[1, 2], [3, 4]];
        const once = rotate(input);
        const twice = rotate(once);
        expect(twice).toEqual([[4, 3], [2, 1]]);
    });

    test('four rotations return to original', () => {
        const input = [[1, 2], [3, 4]];
        let result = input;
        for (let i = 0; i < 4; i++) {
            result = rotate(result);
        }
        expect(result).toEqual(input);
    });

    test('three rotations equal 270 degrees', () => {
        const input = [[1, 2], [3, 4]];
        let result = input;
        for (let i = 0; i < 3; i++) {
            result = rotate(result);
        }
        expect(result).toEqual([[2, 4], [1, 3]]);
    });
});

describe('rotate - edge cases', () => {
    test('matrix with zeros', () => {
        expect(rotate([[0, 0], [0, 0]])).toEqual([[0, 0], [0, 0]]);
    });

    test('symmetric matrix stays symmetric', () => {
        expect(rotate([[1, 2, 1], [2, 3, 2], [1, 2, 1]])).toEqual([[1, 2, 1], [2, 3, 2], [1, 2, 1]]);
    });

    test('anti-diagonal pattern', () => {
        expect(rotate([[0, 0, 1], [0, 1, 0], [1, 0, 0]])).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    });
});

describe('numberOfVideos - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(numberOfVideos(500, "MB", 100, "GB")).toBe(200);
        expect(numberOfVideos(1, "TB", 10, "TB")).toBe("Invalid video unit");
        expect(numberOfVideos(2000, "MB", 100000, "MB")).toBe("Invalid drive unit");
        expect(numberOfVideos(500000, "KB", 2, "TB")).toBe(4000);
        expect(numberOfVideos(1.5, "GB", 2.2, "TB")).toBe(1466);
    });

    test('simple MB to GB conversions', () => {
        expect(numberOfVideos(1, "MB", 1, "GB")).toBe(1000);
        expect(numberOfVideos(100, "MB", 10, "GB")).toBe(100);
        expect(numberOfVideos(250, "MB", 1, "GB")).toBe(4);
    });

    test('bytes to GB', () => {
        expect(numberOfVideos(1000000, "B", 1, "GB")).toBe(1000);
        expect(numberOfVideos(500000000, "B", 1, "GB")).toBe(2);
    });

    test('KB to GB', () => {
        expect(numberOfVideos(1000, "KB", 1, "GB")).toBe(1000);
        expect(numberOfVideos(500000, "KB", 1, "GB")).toBe(2);
    });
});

describe('numberOfVideos - TB drive capacity', () => {
    test('MB videos on TB drive', () => {
        expect(numberOfVideos(1, "MB", 1, "TB")).toBe(1000000);
        expect(numberOfVideos(100, "MB", 1, "TB")).toBe(10000);
        expect(numberOfVideos(1000, "MB", 1, "TB")).toBe(1000);
    });

    test('GB videos on TB drive', () => {
        expect(numberOfVideos(1, "GB", 1, "TB")).toBe(1000);
        expect(numberOfVideos(10, "GB", 1, "TB")).toBe(100);
        expect(numberOfVideos(100, "GB", 5, "TB")).toBe(50);
    });

    test('KB videos on TB drive', () => {
        expect(numberOfVideos(1000, "KB", 1, "TB")).toBe(1000000);
        expect(numberOfVideos(1000000, "KB", 1, "TB")).toBe(1000);
    });

    test('bytes videos on TB drive', () => {
        expect(numberOfVideos(1000000000, "B", 1, "TB")).toBe(1000);
        expect(numberOfVideos(1000000, "B", 1, "TB")).toBe(1000000);
    });
});

describe('numberOfVideos - decimal values', () => {
    test('decimal video sizes', () => {
        expect(numberOfVideos(0.5, "GB", 1, "GB")).toBe(2);
        expect(numberOfVideos(2.5, "GB", 10, "GB")).toBe(4);
        expect(numberOfVideos(1.5, "MB", 1, "GB")).toBe(666);
    });

    test('decimal drive sizes', () => {
        expect(numberOfVideos(100, "MB", 0.5, "GB")).toBe(5);
        expect(numberOfVideos(1, "GB", 2.5, "TB")).toBe(2500);
        expect(numberOfVideos(250, "MB", 1.5, "GB")).toBe(6);
    });

    test('both decimal', () => {
        expect(numberOfVideos(1.5, "GB", 2.2, "TB")).toBe(1466);
        expect(numberOfVideos(0.75, "GB", 1.5, "TB")).toBe(2000);
        expect(numberOfVideos(2.5, "MB", 0.5, "GB")).toBe(200);
    });
});

describe('numberOfVideos - invalid video units', () => {
    test('TB as video unit', () => {
        expect(numberOfVideos(1, "TB", 10, "TB")).toBe("Invalid video unit");
        expect(numberOfVideos(5, "TB", 100, "GB")).toBe("Invalid video unit");
    });

    test('lowercase units', () => {
        expect(numberOfVideos(100, "mb", 1, "GB")).toBe("Invalid video unit");
        expect(numberOfVideos(100, "kb", 1, "GB")).toBe("Invalid video unit");
        expect(numberOfVideos(100, "gb", 1, "GB")).toBe("Invalid video unit");
    });

    test('invalid strings', () => {
        expect(numberOfVideos(100, "PB", 1, "GB")).toBe("Invalid video unit");
        expect(numberOfVideos(100, "bytes", 1, "GB")).toBe("Invalid video unit");
        expect(numberOfVideos(100, "", 1, "GB")).toBe("Invalid video unit");
    });

    test('number as unit', () => {
        expect(numberOfVideos(100, 1000, 1, "GB")).toBe("Invalid video unit");
    });
});

describe('numberOfVideos - invalid drive units', () => {
    test('MB as drive unit', () => {
        expect(numberOfVideos(100, "MB", 1000, "MB")).toBe("Invalid drive unit");
        expect(numberOfVideos(1, "GB", 5000, "MB")).toBe("Invalid drive unit");
    });

    test('KB as drive unit', () => {
        expect(numberOfVideos(100, "KB", 1000000, "KB")).toBe("Invalid drive unit");
    });

    test('B as drive unit', () => {
        expect(numberOfVideos(1000, "B", 1000000000, "B")).toBe("Invalid drive unit");
    });

    test('lowercase units', () => {
        expect(numberOfVideos(100, "MB", 1, "gb")).toBe("Invalid drive unit");
        expect(numberOfVideos(100, "MB", 1, "tb")).toBe("Invalid drive unit");
    });

    test('invalid strings', () => {
        expect(numberOfVideos(100, "MB", 1, "PB")).toBe("Invalid drive unit");
        expect(numberOfVideos(100, "MB", 1, "terabyte")).toBe("Invalid drive unit");
        expect(numberOfVideos(100, "MB", 1, "")).toBe("Invalid drive unit");
    });
});

describe('numberOfVideos - whole number results', () => {
    test('exact divisions', () => {
        expect(numberOfVideos(500, "MB", 1, "GB")).toBe(2);
        expect(numberOfVideos(250, "MB", 1, "GB")).toBe(4);
        expect(numberOfVideos(200, "MB", 1, "GB")).toBe(5);
    });

    test('floor division - drops fractional videos', () => {
        expect(numberOfVideos(300, "MB", 1, "GB")).toBe(3);
        expect(numberOfVideos(700, "MB", 1, "GB")).toBe(1);
        expect(numberOfVideos(999, "MB", 1, "GB")).toBe(1);
    });

    test('result is always integer', () => {
        expect(Number.isInteger(numberOfVideos(333, "MB", 1, "GB"))).toBe(true);
        expect(Number.isInteger(numberOfVideos(1.7, "GB", 3.3, "TB"))).toBe(true);
    });
});

describe('numberOfVideos - large numbers', () => {
    test('many small videos', () => {
        expect(numberOfVideos(1, "B", 1, "GB")).toBe(1000000000);
        expect(numberOfVideos(1, "KB", 1, "TB")).toBe(1000000000);
    });

    test('large video files', () => {
        expect(numberOfVideos(100, "GB", 10, "TB")).toBe(100);
        expect(numberOfVideos(500, "GB", 5, "TB")).toBe(10);
    });

    test('large drive capacity', () => {
        expect(numberOfVideos(100, "MB", 100, "TB")).toBe(1000000);
        expect(numberOfVideos(1, "GB", 1000, "TB")).toBe(1000000);
    });
});

describe('numberOfVideos - small numbers', () => {
    test('video larger than drive', () => {
        expect(numberOfVideos(2, "GB", 1, "GB")).toBe(0);
        expect(numberOfVideos(100, "GB", 1, "GB")).toBe(0);
        expect(numberOfVideos(5, "GB", 1, "TB")).toBe(200);
    });

    test('small byte sizes', () => {
        expect(numberOfVideos(100, "B", 1, "GB")).toBe(10000000);
        expect(numberOfVideos(1, "B", 1, "KB")).toBe("Invalid drive unit");
    });
});

describe('numberOfVideos - edge cases', () => {
    test('same unit for video and drive', () => {
        expect(numberOfVideos(1, "GB", 10, "GB")).toBe(10);
        expect(numberOfVideos(2, "GB", 20, "GB")).toBe(10);
    });

    test('zero video size would cause division by zero', () => {
        expect(numberOfVideos(0, "MB", 1, "GB")).toBe(Infinity);
    });

    test('zero drive size', () => {
        expect(numberOfVideos(100, "MB", 0, "GB")).toBe(0);
    });

    test('very small video sizes', () => {
        expect(numberOfVideos(0.001, "MB", 1, "GB")).toBe(1000000);
        expect(numberOfVideos(0.1, "KB", 1, "GB")).toBe(10000000);
    });
});

describe('numberOfVideos - conversion accuracy', () => {
    test('1 KB = 1000 B', () => {
        expect(numberOfVideos(1000, "B", 1, "GB")).toBe(numberOfVideos(1, "KB", 1, "GB"));
    });

    test('1 MB = 1000 KB', () => {
        expect(numberOfVideos(1000, "KB", 1, "TB")).toBe(numberOfVideos(1, "MB", 1, "TB"));
    });

    test('1 GB = 1000 MB', () => {
        expect(numberOfVideos(1000, "MB", 1, "TB")).toBe(numberOfVideos(1, "GB", 1, "TB"));
    });

    test('1 TB = 1000 GB', () => {
        expect(numberOfVideos(1, "GB", 1000, "GB")).toBe(numberOfVideos(1, "GB", 1, "TB"));
    });
});

describe('digitsOrLetters - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(digitsOrLetters("abc123")).toBe("tie");
        expect(digitsOrLetters("a1b2c3d")).toBe("letters");
        expect(digitsOrLetters("1a2b3c4")).toBe("digits");
        expect(digitsOrLetters("abc123!@#DEF")).toBe("letters");
        expect(digitsOrLetters("H3110 W0R1D")).toBe("digits");
        expect(digitsOrLetters("P455W0RD")).toBe("tie");
    });

    test('all digits', () => {
        expect(digitsOrLetters("123456")).toBe("digits");
        expect(digitsOrLetters("0000")).toBe("digits");
        expect(digitsOrLetters("999")).toBe("digits");
    });

    test('all letters', () => {
        expect(digitsOrLetters("abcdef")).toBe("letters");
        expect(digitsOrLetters("HELLO")).toBe("letters");
        expect(digitsOrLetters("AaBbCc")).toBe("letters");
    });

    test('equal digits and letters', () => {
        expect(digitsOrLetters("a1")).toBe("tie");
        expect(digitsOrLetters("1a2b")).toBe("tie");
        expect(digitsOrLetters("abc123")).toBe("tie");
    });
});

describe('digitsOrLetters - uppercase and lowercase', () => {
    test('uppercase letters counted', () => {
        expect(digitsOrLetters("ABC123")).toBe("tie");
        expect(digitsOrLetters("HELLO123")).toBe("letters");
        expect(digitsOrLetters("A1B2C3D4")).toBe("tie");
    });

    test('lowercase letters counted', () => {
        expect(digitsOrLetters("abc123")).toBe("tie");
        expect(digitsOrLetters("hello123")).toBe("letters");
        expect(digitsOrLetters("a1b2c3d4")).toBe("tie");
    });

    test('mixed case letters', () => {
        expect(digitsOrLetters("AbC123")).toBe("tie");
        expect(digitsOrLetters("HeLLo123")).toBe("letters");
        expect(digitsOrLetters("AaBbCc123")).toBe("letters");
    });
});

describe('digitsOrLetters - special characters', () => {
    test('ignore spaces', () => {
        expect(digitsOrLetters("a b c 1 2 3")).toBe("tie");
        expect(digitsOrLetters("hello 123")).toBe("letters");
        expect(digitsOrLetters("1 2 3 4 5 a")).toBe("digits");
    });

    test('ignore punctuation', () => {
        expect(digitsOrLetters("abc!!!123")).toBe("tie");
        expect(digitsOrLetters("hello...123")).toBe("letters");
        expect(digitsOrLetters("123???a")).toBe("digits");
    });

    test('ignore special symbols', () => {
        expect(digitsOrLetters("a@b#c$1%2^3")).toBe("tie");
        expect(digitsOrLetters("hello@#$123")).toBe("letters");
        expect(digitsOrLetters("123*&^%a")).toBe("digits");
    });

    test('only special characters', () => {
        expect(digitsOrLetters("!@#$%^&*()")).toBe("tie");
        expect(digitsOrLetters("   ")).toBe("tie");
        expect(digitsOrLetters("...")).toBe("tie");
    });
});

describe('digitsOrLetters - more digits than letters', () => {
    test('one more digit', () => {
        expect(digitsOrLetters("a12")).toBe("digits");
        expect(digitsOrLetters("ab123")).toBe("digits");
        expect(digitsOrLetters("hello123456")).toBe("digits");
    });

    test('many more digits', () => {
        expect(digitsOrLetters("a123456")).toBe("digits");
        expect(digitsOrLetters("12345678a")).toBe("digits");
        expect(digitsOrLetters("1234567890abc")).toBe("digits");
    });

    test('with special characters', () => {
        expect(digitsOrLetters("a!1!2!3")).toBe("digits");
        expect(digitsOrLetters("H3110 W0R1D")).toBe("digits");
        expect(digitsOrLetters("1@2#3$a")).toBe("digits");
    });
});

describe('digitsOrLetters - more letters than digits', () => {
    test('one more letter', () => {
        expect(digitsOrLetters("ab1")).toBe("letters");
        expect(digitsOrLetters("abc12")).toBe("letters");
        expect(digitsOrLetters("hello1234")).toBe("letters");
    });

    test('many more letters', () => {
        expect(digitsOrLetters("abcdefg1")).toBe("letters");
        expect(digitsOrLetters("1abcdefgh")).toBe("letters");
        expect(digitsOrLetters("hello123")).toBe("letters");
    });

    test('with special characters', () => {
        expect(digitsOrLetters("a!b!c!1!2")).toBe("letters");
        expect(digitsOrLetters("abc123!@#DEF")).toBe("letters");
        expect(digitsOrLetters("h@e#l$l%o^1&2")).toBe("letters");
    });
});

describe('digitsOrLetters - tie scenarios', () => {
    test('single digit and letter', () => {
        expect(digitsOrLetters("a1")).toBe("tie");
        expect(digitsOrLetters("1a")).toBe("tie");
        expect(digitsOrLetters("Z9")).toBe("tie");
    });

    test('multiple pairs', () => {
        expect(digitsOrLetters("a1b2")).toBe("tie");
        expect(digitsOrLetters("1a2b3c")).toBe("tie");
        expect(digitsOrLetters("abc123")).toBe("tie");
    });

    test('with special characters', () => {
        expect(digitsOrLetters("a!1")).toBe("tie");
        expect(digitsOrLetters("a1!@#b2")).toBe("tie");
        expect(digitsOrLetters("P455W0RD")).toBe("tie");
    });

    test('zero of each', () => {
        expect(digitsOrLetters("")).toBe("tie");
        expect(digitsOrLetters("!@#$%")).toBe("tie");
        expect(digitsOrLetters("   ")).toBe("tie");
    });
});

describe('digitsOrLetters - edge cases', () => {
    test('empty string', () => {
        expect(digitsOrLetters("")).toBe("tie");
    });

    test('single character', () => {
        expect(digitsOrLetters("a")).toBe("letters");
        expect(digitsOrLetters("1")).toBe("digits");
        expect(digitsOrLetters("!")).toBe("tie");
    });

    test('all digits 0-9', () => {
        expect(digitsOrLetters("0123456789")).toBe("digits");
    });

    test('all letters a-z', () => {
        expect(digitsOrLetters("abcdefghijklmnopqrstuvwxyz")).toBe("letters");
    });

    test('all letters A-Z', () => {
        expect(digitsOrLetters("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe("letters");
    });

    test('returns string', () => {
        expect(typeof digitsOrLetters("abc123")).toBe("string");
        expect(typeof digitsOrLetters("123")).toBe("string");
        expect(typeof digitsOrLetters("abc")).toBe("string");
    });
});

describe('digitsOrLetters - long strings', () => {
    test('long string with more digits', () => {
        const str = "a".repeat(10) + "1".repeat(20);
        expect(digitsOrLetters(str)).toBe("digits");
    });

    test('long string with more letters', () => {
        const str = "a".repeat(20) + "1".repeat(10);
        expect(digitsOrLetters(str)).toBe("letters");
    });

    test('long string with tie', () => {
        const str = "a".repeat(50) + "1".repeat(50);
        expect(digitsOrLetters(str)).toBe("tie");
    });
});

describe('digitsOrLetters - real-world examples', () => {
    test('passwords', () => {
        expect(digitsOrLetters("P455W0RD")).toBe("tie");
        expect(digitsOrLetters("MyP@ssw0rd123")).toBe("letters");
        expect(digitsOrLetters("12345abc")).toBe("digits");
    });

    test('usernames', () => {
        expect(digitsOrLetters("user123")).toBe("letters");
        expect(digitsOrLetters("123user")).toBe("letters");
        expect(digitsOrLetters("u1s2e3r4")).toBe("tie");
    });

    test('mixed content', () => {
        expect(digitsOrLetters("H3110 W0R1D")).toBe("digits");
        expect(digitsOrLetters("abc123!@#DEF")).toBe("letters");
        expect(digitsOrLetters("Test123!")).toBe("letters");
    });
});

describe('isMirror - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(isMirror("helloworld", "helloworld")).toBe(false);
        expect(isMirror("Hello World", "dlroW olleH")).toBe(true);
        expect(isMirror("RaceCar", "raCecaR")).toBe(true);
        expect(isMirror("RaceCar", "RaceCar")).toBe(false);
        expect(isMirror("Mirror", "rorrim")).toBe(false);
        expect(isMirror("Hello World", "dlroW-olleH")).toBe(true);
        expect(isMirror("Hello World", "!dlroW !olleH")).toBe(true);
    });

    test('simple mirrors', () => {
        expect(isMirror("abc", "cba")).toBe(true);
        expect(isMirror("hello", "olleh")).toBe(true);
        expect(isMirror("world", "dlrow")).toBe(true);
    });

    test('not mirrors', () => {
        expect(isMirror("abc", "abc")).toBe(false);
        expect(isMirror("hello", "hello")).toBe(false);
        expect(isMirror("abc", "xyz")).toBe(false);
    });

    test('single character', () => {
        expect(isMirror("a", "a")).toBe(true);
        expect(isMirror("Z", "Z")).toBe(true);
        expect(isMirror("a", "b")).toBe(false);
    });
});

describe('isMirror - case sensitivity', () => {
    test('uppercase and lowercase are distinct', () => {
        expect(isMirror("ABC", "cba")).toBe(false);
        expect(isMirror("abc", "CBA")).toBe(false);
        expect(isMirror("Hello", "olleh")).toBe(false);
    });

    test('case must match exactly in reverse', () => {
        expect(isMirror("Hello", "olleH")).toBe(true);
        expect(isMirror("ABC", "CBA")).toBe(true);
        expect(isMirror("RaceCar", "raCecaR")).toBe(true);
    });

    test('mixed case mirrors', () => {
        expect(isMirror("AbCdEf", "fEdCbA")).toBe(true);
        expect(isMirror("HeLLo", "oLLeH")).toBe(true);
        expect(isMirror("TeSt", "TsEt")).toBe(false);
    });
});

describe('isMirror - with spaces', () => {
    test('spaces ignored in comparison', () => {
        expect(isMirror("hello world", "dlrowolleh")).toBe(true);
        expect(isMirror("helloworld", "dlrow olleh")).toBe(true);
        expect(isMirror("a b c", "cba")).toBe(true);
    });

    test('multiple spaces', () => {
        expect(isMirror("h e l l o", "olleh")).toBe(true);
        expect(isMirror("hello", "o l l e h")).toBe(true);
        expect(isMirror("a  b  c", "c  b  a")).toBe(true);
    });

    test('leading and trailing spaces', () => {
        expect(isMirror(" hello ", "olleh")).toBe(true);
        expect(isMirror("hello", " olleh ")).toBe(true);
        expect(isMirror(" abc ", " cba ")).toBe(true);
    });
});

describe('isMirror - with special characters', () => {
    test('punctuation ignored', () => {
        expect(isMirror("hello!", "olleh")).toBe(true);
        expect(isMirror("hello", "!olleh")).toBe(true);
        expect(isMirror("Hello, World!", "dlroWolleH")).toBe(true);
    });

    test('numbers ignored', () => {
        expect(isMirror("hello123", "olleh")).toBe(true);
        expect(isMirror("hello", "456olleh")).toBe(true);
        expect(isMirror("a1b2c3", "cba")).toBe(true);
    });

    test('special symbols ignored', () => {
        expect(isMirror("hello@world", "dlrowolleh")).toBe(true);
        expect(isMirror("abc#def", "fedcba")).toBe(true);
        expect(isMirror("test$%^&", "tset")).toBe(true);
    });

    test('mixed special characters', () => {
        expect(isMirror("Hello World", "dlroW-olleH")).toBe(true);
        expect(isMirror("Hello World", "!dlroW !olleH")).toBe(true);
        expect(isMirror("a!b@c#", "c3b2a1")).toBe(true);
    });
});

describe('isMirror - palindromes', () => {
    test('palindromes are mirrors of themselves', () => {
        expect(isMirror("a", "a")).toBe(true);
        expect(isMirror("aba", "aba")).toBe(true);
        expect(isMirror("racecar", "racecar")).toBe(true);
    });

    test('non-palindromes are not self-mirrors', () => {
        expect(isMirror("abc", "abc")).toBe(false);
        expect(isMirror("hello", "hello")).toBe(false);
        expect(isMirror("world", "world")).toBe(false);
    });

    test('palindromes with spaces and special chars', () => {
        expect(isMirror("A man a plan", "nalp a nam A")).toBe(true);
        expect(isMirror("race car", "rac ecar")).toBe(true);
    });
});

describe('isMirror - empty strings', () => {
    test('empty strings are mirrors', () => {
        expect(isMirror("", "")).toBe(true);
    });

    test('empty vs non-empty', () => {
        expect(isMirror("", "abc")).toBe(false);
        expect(isMirror("abc", "")).toBe(false);
    });

    test('only special characters treated as empty', () => {
        expect(isMirror("123!@#", "!@#123")).toBe(true);
        expect(isMirror("   ", "   ")).toBe(true);
    });
});

describe('isMirror - length differences', () => {
    test('different letter counts not mirrors', () => {
        expect(isMirror("abc", "dcba")).toBe(false);
        expect(isMirror("hello", "ollehh")).toBe(false);
        expect(isMirror("ab", "abc")).toBe(false);
    });

    test('same letters after filtering special chars', () => {
        expect(isMirror("a!b!c", "cba")).toBe(true);
        expect(isMirror("abc", "c1b2a3")).toBe(true);
    });
});

describe('isMirror - long strings', () => {
    test('long mirror strings', () => {
        const str1 = "abcdefghijklmnopqrstuvwxyz";
        const str2 = "zyxwvutsrqponmlkjihgfedcba";
        expect(isMirror(str1, str2)).toBe(true);
    });

    test('long non-mirror strings', () => {
        const str1 = "abcdefghijklmnopqrstuvwxyz";
        const str2 = "abcdefghijklmnopqrstuvwxyz";
        expect(isMirror(str1, str2)).toBe(false);
    });

    test('long strings with special characters', () => {
        const str1 = "The quick brown fox jumps over the lazy dog";
        const str2 = "god yzal eht revo spmuj xof nworb kciuq ehT";
        expect(isMirror(str1, str2)).toBe(true);
    });
});

describe('isMirror - edge cases', () => {
    test('returns boolean', () => {
        expect(typeof isMirror("abc", "cba")).toBe("boolean");
        expect(typeof isMirror("abc", "abc")).toBe("boolean");
    });

    test('only numbers and symbols not mirrors', () => {
        expect(isMirror("123", "321")).toBe(true);
        expect(isMirror("!@#", "#@!")).toBe(true);
    });

    test('repeated characters', () => {
        expect(isMirror("aaa", "aaa")).toBe(true);
        expect(isMirror("aaab", "baaa")).toBe(true);
        expect(isMirror("aabb", "bbaa")).toBe(true);
    });

    test('alternating case patterns', () => {
        expect(isMirror("AaBbCc", "cCbBaA")).toBe(true);
        expect(isMirror("aBcDeF", "FeDcBa")).toBe(true);
    });
});

describe('isMirror - real-world examples', () => {
    test('sentences', () => {
        expect(isMirror("Hello World", "dlroW olleH")).toBe(true);
        expect(isMirror("The cat", "tac ehT")).toBe(true);
        expect(isMirror("Good morning", "gninrom dooG")).toBe(true);
    });

    test('phrases with punctuation', () => {
        expect(isMirror("Hello, World!", "!dlroW ,olleH")).toBe(true);
        expect(isMirror("It's a test.", ".tset a s'tI")).toBe(true);
    });

    test('case-sensitive examples', () => {
        expect(isMirror("Mirror", "rorriM")).toBe(true);
        expect(isMirror("Mirror", "rorrim")).toBe(false);
        expect(isMirror("RaceCar", "raCecaR")).toBe(true);
    });
});

describe('isPerfectSquare - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(isPerfectSquare(9)).toBe(true);
        expect(isPerfectSquare(49)).toBe(true);
        expect(isPerfectSquare(1)).toBe(true);
        expect(isPerfectSquare(2)).toBe(false);
        expect(isPerfectSquare(99)).toBe(false);
        expect(isPerfectSquare(-9)).toBe(false);
        expect(isPerfectSquare(0)).toBe(true);
        expect(isPerfectSquare(25281)).toBe(true);
    });

    test('small perfect squares', () => {
        expect(isPerfectSquare(1)).toBe(true);
        expect(isPerfectSquare(4)).toBe(true);
        expect(isPerfectSquare(9)).toBe(true);
        expect(isPerfectSquare(16)).toBe(true);
        expect(isPerfectSquare(25)).toBe(true);
    });

    test('small non-perfect squares', () => {
        expect(isPerfectSquare(2)).toBe(false);
        expect(isPerfectSquare(3)).toBe(false);
        expect(isPerfectSquare(5)).toBe(false);
        expect(isPerfectSquare(7)).toBe(false);
        expect(isPerfectSquare(8)).toBe(false);
    });

    test('zero is a perfect square', () => {
        expect(isPerfectSquare(0)).toBe(true);
    });
});

describe('isPerfectSquare - negative numbers', () => {
    test('negative numbers are not perfect squares', () => {
        expect(isPerfectSquare(-1)).toBe(false);
        expect(isPerfectSquare(-4)).toBe(false);
        expect(isPerfectSquare(-9)).toBe(false);
        expect(isPerfectSquare(-16)).toBe(false);
        expect(isPerfectSquare(-100)).toBe(false);
    });

    test('large negative numbers', () => {
        expect(isPerfectSquare(-1000)).toBe(false);
        expect(isPerfectSquare(-10000)).toBe(false);
    });
});

describe('isPerfectSquare - medium numbers', () => {
    test('perfect squares 1-1000', () => {
        expect(isPerfectSquare(36)).toBe(true);
        expect(isPerfectSquare(64)).toBe(true);
        expect(isPerfectSquare(81)).toBe(true);
        expect(isPerfectSquare(100)).toBe(true);
        expect(isPerfectSquare(121)).toBe(true);
        expect(isPerfectSquare(144)).toBe(true);
        expect(isPerfectSquare(169)).toBe(true);
        expect(isPerfectSquare(196)).toBe(true);
        expect(isPerfectSquare(225)).toBe(true);
        expect(isPerfectSquare(400)).toBe(true);
        expect(isPerfectSquare(625)).toBe(true);
        expect(isPerfectSquare(900)).toBe(true);
    });

    test('perfect squares 1000-10000', () => {
        expect(isPerfectSquare(1024)).toBe(true);
        expect(isPerfectSquare(2025)).toBe(true);
        expect(isPerfectSquare(4096)).toBe(true);
        expect(isPerfectSquare(10000)).toBe(true);
    });

    test('non-perfect squares', () => {
        expect(isPerfectSquare(10)).toBe(false);
        expect(isPerfectSquare(15)).toBe(false);
        expect(isPerfectSquare(50)).toBe(false);
        expect(isPerfectSquare(99)).toBe(false);
        expect(isPerfectSquare(101)).toBe(false);
        expect(isPerfectSquare(200)).toBe(false);
        expect(isPerfectSquare(1000)).toBe(false);
        expect(isPerfectSquare(9999)).toBe(false);
    });
});

describe('isPerfectSquare - large numbers', () => {
    test('large perfect squares', () => {
        expect(isPerfectSquare(10201)).toBe(true);
        expect(isPerfectSquare(25281)).toBe(true);
        expect(isPerfectSquare(40000)).toBe(true);
        expect(isPerfectSquare(90000)).toBe(true);
        expect(isPerfectSquare(160000)).toBe(true);
        expect(isPerfectSquare(1000000)).toBe(true);
    });

    test('large non-perfect squares', () => {
        expect(isPerfectSquare(10000)).toBe(true);
        expect(isPerfectSquare(10001)).toBe(false);
        expect(isPerfectSquare(99999)).toBe(false);
        expect(isPerfectSquare(100001)).toBe(false);
        expect(isPerfectSquare(999999)).toBe(false);
    });

    test('very large perfect squares', () => {
        expect(isPerfectSquare(4000000)).toBe(true);
        expect(isPerfectSquare(9000000)).toBe(true);
    });
});

describe('isPerfectSquare - squares of consecutive integers', () => {
    test('squares 1-10', () => {
        expect(isPerfectSquare(1)).toBe(true);
        expect(isPerfectSquare(4)).toBe(true);
        expect(isPerfectSquare(9)).toBe(true);
        expect(isPerfectSquare(16)).toBe(true);
        expect(isPerfectSquare(25)).toBe(true);
        expect(isPerfectSquare(36)).toBe(true);
        expect(isPerfectSquare(49)).toBe(true);
        expect(isPerfectSquare(64)).toBe(true);
        expect(isPerfectSquare(81)).toBe(true);
        expect(isPerfectSquare(100)).toBe(true);
    });

    test('squares 11-20', () => {
        expect(isPerfectSquare(121)).toBe(true);
        expect(isPerfectSquare(144)).toBe(true);
        expect(isPerfectSquare(169)).toBe(true);
        expect(isPerfectSquare(196)).toBe(true);
        expect(isPerfectSquare(225)).toBe(true);
        expect(isPerfectSquare(256)).toBe(true);
        expect(isPerfectSquare(289)).toBe(true);
        expect(isPerfectSquare(324)).toBe(true);
        expect(isPerfectSquare(361)).toBe(true);
        expect(isPerfectSquare(400)).toBe(true);
    });

    test('numbers between consecutive squares', () => {
        expect(isPerfectSquare(2)).toBe(false);
        expect(isPerfectSquare(3)).toBe(false);
        expect(isPerfectSquare(5)).toBe(false);
        expect(isPerfectSquare(8)).toBe(false);
        expect(isPerfectSquare(15)).toBe(false);
        expect(isPerfectSquare(24)).toBe(false);
        expect(isPerfectSquare(35)).toBe(false);
        expect(isPerfectSquare(48)).toBe(false);
        expect(isPerfectSquare(63)).toBe(false);
        expect(isPerfectSquare(80)).toBe(false);
    });
});

describe('isPerfectSquare - edge cases', () => {
    test('returns boolean', () => {
        expect(typeof isPerfectSquare(9)).toBe("boolean");
        expect(typeof isPerfectSquare(10)).toBe("boolean");
        expect(typeof isPerfectSquare(0)).toBe("boolean");
        expect(typeof isPerfectSquare(-1)).toBe("boolean");
    });

    test('one less and one more than perfect squares', () => {
        expect(isPerfectSquare(8)).toBe(false);
        expect(isPerfectSquare(9)).toBe(true);
        expect(isPerfectSquare(10)).toBe(false);
        expect(isPerfectSquare(15)).toBe(false);
        expect(isPerfectSquare(16)).toBe(true);
        expect(isPerfectSquare(17)).toBe(false);
    });

    test('squares of primes', () => {
        expect(isPerfectSquare(4)).toBe(true);
        expect(isPerfectSquare(9)).toBe(true);
        expect(isPerfectSquare(25)).toBe(true);
        expect(isPerfectSquare(49)).toBe(true);
        expect(isPerfectSquare(121)).toBe(true);
        expect(isPerfectSquare(169)).toBe(true);
    });
});

describe('isPerfectSquare - special values', () => {
    test('powers of 2', () => {
        expect(isPerfectSquare(2)).toBe(false);
        expect(isPerfectSquare(4)).toBe(true);
        expect(isPerfectSquare(8)).toBe(false);
        expect(isPerfectSquare(16)).toBe(true);
        expect(isPerfectSquare(32)).toBe(false);
        expect(isPerfectSquare(64)).toBe(true);
        expect(isPerfectSquare(128)).toBe(false);
        expect(isPerfectSquare(256)).toBe(true);
        expect(isPerfectSquare(512)).toBe(false);
        expect(isPerfectSquare(1024)).toBe(true);
    });

    test('squares of multiples of 10', () => {
        expect(isPerfectSquare(100)).toBe(true);
        expect(isPerfectSquare(400)).toBe(true);
        expect(isPerfectSquare(900)).toBe(true);
        expect(isPerfectSquare(1600)).toBe(true);
        expect(isPerfectSquare(2500)).toBe(true);
    });

    test('prime numbers are not perfect squares', () => {
        expect(isPerfectSquare(2)).toBe(false);
        expect(isPerfectSquare(3)).toBe(false);
        expect(isPerfectSquare(5)).toBe(false);
        expect(isPerfectSquare(7)).toBe(false);
        expect(isPerfectSquare(11)).toBe(false);
        expect(isPerfectSquare(13)).toBe(false);
        expect(isPerfectSquare(17)).toBe(false);
        expect(isPerfectSquare(19)).toBe(false);
        expect(isPerfectSquare(23)).toBe(false);
    });
});

describe('secondLargest - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(secondLargest([1, 2, 3, 4])).toBe(3);
        expect(secondLargest([20, 139, 94, 67, 31])).toBe(94);
        expect(secondLargest([2, 3, 4, 6, 6])).toBe(4);
        expect(secondLargest([10, -17, 55.5, 44, 91, 0])).toBe(55.5);
        expect(secondLargest([1, 0, -1, 0, 1, 0, -1, 1, 0])).toBe(0);
    });

    test('simple sorted arrays', () => {
        expect(secondLargest([1, 2, 3])).toBe(2);
        expect(secondLargest([5, 10, 15])).toBe(10);
        expect(secondLargest([100, 200, 300])).toBe(200);
    });

    test('unsorted arrays', () => {
        expect(secondLargest([3, 1, 2])).toBe(2);
        expect(secondLargest([15, 5, 10])).toBe(10);
        expect(secondLargest([300, 100, 200])).toBe(200);
    });

    test('arrays with two elements', () => {
        expect(secondLargest([1, 2])).toBe(1);
        expect(secondLargest([10, 5])).toBe(5);
        expect(secondLargest([100, 200])).toBe(100);
    });
});

describe('secondLargest - duplicates', () => {
    test('with duplicate largest', () => {
        expect(secondLargest([5, 5, 4])).toBe(4);
        expect(secondLargest([10, 10, 8])).toBe(8);
        expect(secondLargest([100, 100, 50])).toBe(50);
    });

    test('with multiple duplicates', () => {
        expect(secondLargest([5, 5, 5, 4, 4, 3])).toBe(4);
        expect(secondLargest([10, 10, 8, 8, 6])).toBe(8);
        expect(secondLargest([2, 3, 4, 6, 6])).toBe(4);
    });

    test('with duplicates throughout', () => {
        expect(secondLargest([1, 1, 2, 2, 3, 3])).toBe(2);
        expect(secondLargest([5, 5, 10, 10, 15, 15])).toBe(10);
    });

    test('with duplicate second largest', () => {
        expect(secondLargest([10, 5, 5, 3])).toBe(5);
        expect(secondLargest([20, 15, 15, 10])).toBe(15);
    });
});

describe('secondLargest - negative numbers', () => {
    test('all negative numbers', () => {
        expect(secondLargest([-1, -2, -3])).toBe(-2);
        expect(secondLargest([-10, -5, -20])).toBe(-10);
        expect(secondLargest([-100, -50, -200])).toBe(-100);
    });

    test('mixed positive and negative', () => {
        expect(secondLargest([5, -5, 10])).toBe(5);
        expect(secondLargest([10, -17, 44, 91, 0])).toBe(44);
        expect(secondLargest([-1, 0, 1])).toBe(0);
    });

    test('with negative duplicates', () => {
        expect(secondLargest([-5, -5, -10])).toBe(-10);
        expect(secondLargest([-1, -1, -2, -2])).toBe(-2);
    });
});

describe('secondLargest - decimal numbers', () => {
    test('with decimals', () => {
        expect(secondLargest([1.5, 2.5, 3.5])).toBe(2.5);
        expect(secondLargest([10.1, 10.2, 10.3])).toBe(10.2);
        expect(secondLargest([10, -17, 55.5, 44, 91, 0])).toBe(55.5);
    });

    test('mixed integers and decimals', () => {
        expect(secondLargest([1, 2.5, 3])).toBe(2.5);
        expect(secondLargest([10, 15.5, 20, 25])).toBe(20);
        expect(secondLargest([5.5, 10, 7.5])).toBe(7.5);
    });

    test('very close decimals', () => {
        expect(secondLargest([1.1, 1.2, 1.3])).toBe(1.2);
        expect(secondLargest([0.1, 0.2, 0.3])).toBe(0.2);
    });
});

describe('secondLargest - with zero', () => {
    test('zero in array', () => {
        expect(secondLargest([0, 1, 2])).toBe(1);
        expect(secondLargest([5, 0, 10])).toBe(5);
        expect(secondLargest([-5, 0, 5])).toBe(0);
    });

    test('multiple zeros', () => {
        expect(secondLargest([0, 0, 1])).toBe(0);
        expect(secondLargest([0, 0, 0, 1])).toBe(0);
        expect(secondLargest([1, 0, -1, 0, 1, 0, -1, 1, 0])).toBe(0);
    });

    test('zero as largest', () => {
        expect(secondLargest([0, -1, -2])).toBe(-1);
        expect(secondLargest([0, -5, -10])).toBe(-5);
    });
});

describe('secondLargest - larger arrays', () => {
    test('many elements', () => {
        expect(secondLargest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(9);
        expect(secondLargest([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toBe(9);
    });

    test('random order', () => {
        expect(secondLargest([5, 2, 8, 1, 9, 3, 7, 4, 6])).toBe(8);
        expect(secondLargest([20, 139, 94, 67, 31])).toBe(94);
    });

    test('with many duplicates', () => {
        expect(secondLargest([5, 5, 5, 5, 4, 4, 4])).toBe(4);
        expect(secondLargest([10, 10, 10, 9, 9, 9, 8, 8, 8])).toBe(9);
    });
});

describe('secondLargest - edge cases', () => {
    test('all same values', () => {
        expect(secondLargest([5, 5, 5, 5])).toBe(undefined);
        expect(secondLargest([0, 0, 0])).toBe(undefined);
    });

    test('returns number type', () => {
        expect(typeof secondLargest([1, 2, 3])).toBe("number");
        expect(typeof secondLargest([10, 20, 30])).toBe("number");
    });

    test('large numbers', () => {
        expect(secondLargest([1000, 2000, 3000])).toBe(2000);
        expect(secondLargest([999999, 1000000, 888888])).toBe(999999);
    });

    test('very small differences', () => {
        expect(secondLargest([1, 1.0001, 1.0002])).toBe(1.0001);
        expect(secondLargest([100, 100.1, 100.2])).toBe(100.1);
    });
});

describe('secondLargest - distinct values', () => {
    test('ensures distinct values', () => {
        expect(secondLargest([10, 10, 9, 9])).toBe(9);
        expect(secondLargest([5, 5, 5, 4, 4, 4, 3, 3, 3])).toBe(4);
    });

    test('second largest ignores duplicates of largest', () => {
        expect(secondLargest([100, 100, 100, 50])).toBe(50);
        expect(secondLargest([7, 7, 7, 7, 6])).toBe(6);
    });

    test('returns distinct second value', () => {
        expect(secondLargest([20, 20, 15, 15, 10, 10])).toBe(15);
        expect(secondLargest([3, 3, 2, 2, 1, 1])).toBe(2);
    });
});

describe('speeding - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(speeding([50, 60, 55], 60)).toEqual([0, 0]);
        expect(speeding([58, 50, 60, 55], 55)).toEqual([2, 4]);
        expect(speeding([61, 81, 74, 88, 65, 71, 68], 70)).toEqual([4, 8.5]);
        expect(speeding([100, 105, 95, 102], 100)).toEqual([2, 3.5]);
        expect(speeding([40, 45, 44, 50, 112, 39], 55)).toEqual([1, 57]);
    });

    test('no speeders', () => {
        expect(speeding([40, 50, 45], 60)).toEqual([0, 0]);
        expect(speeding([30, 35, 40], 50)).toEqual([0, 0]);
        expect(speeding([10, 20, 30], 40)).toEqual([0, 0]);
    });

    test('all at limit', () => {
        expect(speeding([60, 60, 60], 60)).toEqual([0, 0]);
        expect(speeding([50, 50, 50], 50)).toEqual([0, 0]);
    });

    test('one speeder', () => {
        expect(speeding([65, 50, 55], 60)).toEqual([1, 5]);
        expect(speeding([70, 60, 65], 65)).toEqual([1, 5]);
        expect(speeding([100, 90, 95], 95)).toEqual([1, 5]);
    });
});

describe('speeding - all speeding', () => {
    test('all vehicles speeding', () => {
        expect(speeding([70, 80, 90], 60)).toEqual([3, 20]);
        expect(speeding([61, 62, 63], 60)).toEqual([3, 2]);
        expect(speeding([100, 110, 120], 90)).toEqual([3, 20]);
    });

    test('all speeding by same amount', () => {
        expect(speeding([65, 65, 65], 60)).toEqual([3, 5]);
        expect(speeding([75, 75, 75], 70)).toEqual([3, 5]);
    });

    test('all speeding by different amounts', () => {
        expect(speeding([61, 71, 81], 60)).toEqual([3, 11]);
        expect(speeding([51, 61, 71], 50)).toEqual([3, 11]);
    });
});

describe('speeding - mixed scenarios', () => {
    test('some speeding, some not', () => {
        expect(speeding([50, 70, 60, 80], 65)).toEqual([2, 10]);
        expect(speeding([40, 50, 60, 70], 55)).toEqual([2, 10]);
    });

    test('majority not speeding', () => {
        expect(speeding([50, 55, 60, 61], 60)).toEqual([1, 1]);
        expect(speeding([40, 45, 50, 55, 61], 60)).toEqual([1, 1]);
    });

    test('majority speeding', () => {
        expect(speeding([70, 80, 90, 50], 60)).toEqual([3, 20]);
        expect(speeding([65, 70, 75, 55, 50], 60)).toEqual([3, 10]);
    });
});

describe('speeding - different excess amounts', () => {
    test('small excess speeds', () => {
        expect(speeding([61, 62, 63], 60)).toEqual([3, 2]);
        expect(speeding([51, 52], 50)).toEqual([2, 1.5]);
    });

    test('large excess speeds', () => {
        expect(speeding([100, 120, 140], 60)).toEqual([3, 60]);
        expect(speeding([80, 90, 100], 50)).toEqual([3, 40]);
    });

    test('varying excess speeds', () => {
        expect(speeding([61, 70, 100], 60)).toEqual([3, 17]);
        expect(speeding([51, 60, 80], 50)).toEqual([3, 13.666666666666666]);
    });
});

describe('speeding - edge cases with limit', () => {
    test('exactly at limit not counted', () => {
        expect(speeding([60, 60, 61], 60)).toEqual([1, 1]);
        expect(speeding([50, 50, 50, 51], 50)).toEqual([1, 1]);
    });

    test('one unit over limit', () => {
        expect(speeding([61, 61, 61], 60)).toEqual([3, 1]);
        expect(speeding([51], 50)).toEqual([1, 1]);
    });

    test('many units over limit', () => {
        expect(speeding([110, 120], 60)).toEqual([2, 55]);
        expect(speeding([100], 50)).toEqual([1, 50]);
    });
});

describe('speeding - single vehicle', () => {
    test('single vehicle not speeding', () => {
        expect(speeding([50], 60)).toEqual([0, 0]);
        expect(speeding([60], 60)).toEqual([0, 0]);
    });

    test('single vehicle speeding', () => {
        expect(speeding([70], 60)).toEqual([1, 10]);
        expect(speeding([61], 60)).toEqual([1, 1]);
        expect(speeding([100], 50)).toEqual([1, 50]);
    });
});

describe('speeding - large datasets', () => {
    test('many vehicles mixed', () => {
        const result = speeding([50, 55, 60, 65, 70, 75, 80], 60);
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(12.5);
    });

    test('many vehicles all speeding', () => {
        const result = speeding([61, 62, 63, 64, 65, 66, 67, 68, 69, 70], 60);
        expect(result[0]).toBe(10);
        expect(result[1]).toBe(5.5);
    });

    test('many vehicles none speeding', () => {
        const result = speeding([50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], 60);
        expect(result).toEqual([0, 0]);
    });
});

describe('speeding - decimal speeds', () => {
    test('decimal speeds over limit', () => {
        expect(speeding([60.5, 61.5, 62.5], 60)).toEqual([3, 1.5]);
        expect(speeding([55.5, 56.5], 55)).toEqual([2, 1]);
    });

    test('decimal limit', () => {
        expect(speeding([61, 62, 63], 60.5)).toEqual([3, 1.5]);
        expect(speeding([56, 57, 58], 55.5)).toEqual([3, 1.5]);
    });

    test('both decimal', () => {
        expect(speeding([60.5, 61.5], 60)).toEqual([2, 1]);
        expect(speeding([61, 62], 60.5)).toEqual([2, 1]);
    });
});

describe('speeding - return format', () => {
    test('returns array', () => {
        const result = speeding([70, 80], 60);
        expect(Array.isArray(result)).toBe(true);
    });

    test('array has two elements', () => {
        expect(speeding([70, 80], 60).length).toBe(2);
        expect(speeding([50, 60], 60).length).toBe(2);
    });

    test('first element is count', () => {
        expect(speeding([70, 80, 90], 60)[0]).toBe(3);
        expect(speeding([50, 60], 60)[0]).toBe(0);
    });

    test('second element is average', () => {
        expect(speeding([70, 80], 60)[1]).toBe(15);
        expect(speeding([50, 60], 60)[1]).toBe(0);
    });
});

describe('speeding - average calculations', () => {
    test('average with odd count', () => {
        expect(speeding([61, 62, 63], 60)).toEqual([3, 2]);
        expect(speeding([71, 72, 73, 74, 75], 70)).toEqual([5, 3]);
    });

    test('average with even count', () => {
        expect(speeding([61, 63], 60)).toEqual([2, 2]);
        expect(speeding([71, 72, 73, 74], 70)).toEqual([4, 2.5]);
    });

    test('average rounds correctly', () => {
        expect(speeding([61, 62, 64], 60)).toEqual([3, 2.3333333333333335]);
        expect(speeding([61, 64], 60)).toEqual([2, 2.5]);
    });
});

describe('speeding - special cases', () => {
    test('high speed limit', () => {
        expect(speeding([100, 110, 120], 100)).toEqual([2, 15]);
        expect(speeding([90, 100, 110], 100)).toEqual([1, 10]);
    });

    test('low speed limit', () => {
        expect(speeding([20, 30, 40], 25)).toEqual([2, 10]);
        expect(speeding([10, 20, 30], 15)).toEqual([2, 10]);
    });

    test('extreme speeding', () => {
        expect(speeding([40, 45, 44, 50, 112, 39], 55)).toEqual([1, 57]);
        expect(speeding([60, 150], 60)).toEqual([1, 90]);
    });
});

describe('isSpam - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
        expect(isSpam("+091 (555) 309-1922")).toBe(true);
        expect(isSpam("+1 (555) 435-4792")).toBe(true);
        expect(isSpam("+0 (955) 234-4364")).toBe(true);
        expect(isSpam("+0 (155) 131-6943")).toBe(true);
        expect(isSpam("+0 (555) 135-0192")).toBe(true);
        expect(isSpam("+0 (555) 564-1987")).toBe(true);
        expect(isSpam("+00 (555) 234-0182")).toBe(false);
    });

    test('valid non-spam numbers', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
        expect(isSpam("+00 (300) 234-0182")).toBe(false);
        expect(isSpam("+00 (555) 234-0182")).toBe(false);
    });
});

describe('isSpam - criterion 1: country code', () => {
    test('country code more than 2 digits is spam', () => {
        expect(isSpam("+091 (555) 309-1922")).toBe(true);
        expect(isSpam("+123 (200) 123-4567")).toBe(true);
        expect(isSpam("+0000 (200) 123-4567")).toBe(true);
    });

    test('country code not starting with 0 is spam', () => {
        expect(isSpam("+1 (555) 435-4792")).toBe(true);
        expect(isSpam("+2 (200) 123-4567")).toBe(true);
        expect(isSpam("+9 (500) 123-4567")).toBe(true);
    });

    test('country code starting with 0 and 1-2 digits is not spam by itself', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
        expect(isSpam("+00 (300) 234-0182")).toBe(false);
    });

    test('single digit 0 is valid', () => {
        expect(isSpam("+0 (500) 234-0182")).toBe(false);
    });
});

describe('isSpam - criterion 2: area code', () => {
    test('area code greater than 900 is spam', () => {
        expect(isSpam("+0 (901) 123-4567")).toBe(true);
        expect(isSpam("+0 (955) 234-4364")).toBe(true);
        expect(isSpam("+0 (999) 123-4567")).toBe(true);
    });

    test('area code less than 200 is spam', () => {
        expect(isSpam("+0 (199) 123-4567")).toBe(true);
        expect(isSpam("+0 (155) 131-6943")).toBe(true);
        expect(isSpam("+0 (100) 123-4567")).toBe(true);
    });

    test('area code exactly 200 is not spam by itself', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
    });

    test('area code exactly 900 is not spam by itself', () => {
        expect(isSpam("+0 (900) 234-0182")).toBe(false);
    });

    test('area code between 200 and 900 is valid', () => {
        expect(isSpam("+0 (500) 234-0182")).toBe(false);
        expect(isSpam("+0 (700) 234-0182")).toBe(false);
    });
});

describe('isSpam - criterion 3: sum in local number', () => {
    test('sum of first 3 digits appears in last 4', () => {
        expect(isSpam("+0 (555) 135-0192")).toBe(true);
        expect(isSpam("+0 (555) 564-1987")).toBe(true);
        expect(isSpam("+0 (200) 123-6789")).toBe(true);
    });

    test('sum does not appear in last 4', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
        expect(isSpam("+0 (500) 345-0182")).toBe(false);
    });

    test('single digit sum appears', () => {
        expect(isSpam("+0 (500) 102-3456")).toBe(true);
        expect(isSpam("+0 (500) 111-3456")).toBe(true);
    });

    test('double digit sum appears', () => {
        expect(isSpam("+0 (500) 555-1567")).toBe(true);
        expect(isSpam("+0 (500) 999-2789")).toBe(true);
    });

    test('sum as substring in last 4', () => {
        expect(isSpam("+0 (500) 234-9012")).toBe(true);
    });
});

describe('isSpam - criterion 4: repeated digits', () => {
    test('four same digits in a row is spam', () => {
        expect(isSpam("+0 (200) 111-1456")).toBe(true);
        expect(isSpam("+0 (200) 123-4444")).toBe(true);
        expect(isSpam("+00000 (200) 123-4567")).toBe(true);
    });

    test('five or more same digits in a row is spam', () => {
        expect(isSpam("+0 (200) 111-1156")).toBe(true);
        expect(isSpam("+00000 (200) 123-4567")).toBe(true);
    });

    test('repeated digits across formatting', () => {
        expect(isSpam("+0 (223) 456-0123")).toBe(false);
        expect(isSpam("+0 (555) 564-1987")).toBe(true);
    });

    test('three same digits in a row is not spam by itself', () => {
        expect(isSpam("+00 (223) 456-0123")).toBe(false);
        expect(isSpam("+0 (200) 111-2456")).toBe(false);
        expect(isSpam("+00 (200) 456-0111")).toBe(false);
    });

    test('different repeated digits', () => {
        expect(isSpam("+0 (200) 000-0123")).toBe(true);
        expect(isSpam("+0 (200) 999-9123")).toBe(true);
    });
});

describe('isSpam - multiple criteria', () => {
    test('country code and area code violations', () => {
        expect(isSpam("+1 (155) 123-4567")).toBe(true);
        expect(isSpam("+091 (999) 123-4567")).toBe(true);
    });

    test('area code and sum violations', () => {
        expect(isSpam("+0 (155) 131-6943")).toBe(true);
    });

    test('country code and repeated digits', () => {
        expect(isSpam("+1 (500) 111-1234")).toBe(true);
    });

    test('all criteria valid', () => {
        expect(isSpam("+0 (200) 234-0182")).toBe(false);
        expect(isSpam("+00 (555) 234-0182")).toBe(false);
    });
});

describe('isSpam - edge cases', () => {
    test('returns boolean', () => {
        expect(typeof isSpam("+0 (200) 123-4567")).toBe("boolean");
        expect(typeof isSpam("+1 (555) 435-4792")).toBe("boolean");
    });

    test('area code boundaries', () => {
        expect(isSpam("+0 (199) 345-0182")).toBe(true);
        expect(isSpam("+0 (200) 345-0182")).toBe(false);
        expect(isSpam("+0 (900) 345-0182")).toBe(false);
        expect(isSpam("+0 (901) 345-0182")).toBe(true);
    });

    test('country code length boundaries', () => {
        expect(isSpam("+0 (500) 345-0182")).toBe(false);
        expect(isSpam("+00 (500) 345-0182")).toBe(false);
        expect(isSpam("+000 (500) 345-0182")).toBe(true);
    });

    test('sum is zero', () => {
        expect(isSpam("+0 (500) 000-1234")).toBe(true);
        expect(isSpam("+0 (500) 000-5678")).toBe(true);
    });

    test('high sum values', () => {
        expect(isSpam("+0 (500) 999-2789")).toBe(true);
    });
});

describe('isSpam - real-world scenarios', () => {
    test('typical valid numbers', () => {
        expect(isSpam("+0 (300) 234-0182")).toBe(false);
        expect(isSpam("+0 (450) 567-0123")).toBe(false);
        expect(isSpam("+0 (800) 345-0182")).toBe(false);
    });

    test('typical spam patterns', () => {
        expect(isSpam("+1 (555) 435-4792")).toBe(true);
        expect(isSpam("+091 (555) 309-1922")).toBe(true);
    });

    test('borderline cases', () => {
        expect(isSpam("+00 (200) 234-0182")).toBe(false);
        expect(isSpam("+00 (900) 345-0182")).toBe(false);
    });
});

describe('numberOfFiles - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(numberOfFiles(500, "KB", 1)).toBe(2000);
        expect(numberOfFiles(50000, "B", 1)).toBe(20000);
        expect(numberOfFiles(5, "MB", 1)).toBe(200);
        expect(numberOfFiles(4096, "B", 1.5)).toBe(366210);
        expect(numberOfFiles(220.5, "KB", 100)).toBe(453514);
        expect(numberOfFiles(4.5, "MB", 750)).toBe(166666);
    });

    test('simple cases with bytes', () => {
        expect(numberOfFiles(1, "B", 1)).toBe(1000000000);
        expect(numberOfFiles(1000, "B", 1)).toBe(1000000);
        expect(numberOfFiles(1000000, "B", 1)).toBe(1000);
    });

    test('simple cases with kilobytes', () => {
        expect(numberOfFiles(1, "KB", 1)).toBe(1000000);
        expect(numberOfFiles(10, "KB", 1)).toBe(100000);
        expect(numberOfFiles(100, "KB", 1)).toBe(10000);
    });

    test('simple cases with megabytes', () => {
        expect(numberOfFiles(1, "MB", 1)).toBe(1000);
        expect(numberOfFiles(10, "MB", 1)).toBe(100);
        expect(numberOfFiles(100, "MB", 1)).toBe(10);
    });
});

describe('numberOfFiles - different drive sizes', () => {
    test('small drives', () => {
        expect(numberOfFiles(100, "KB", 0.5)).toBe(5000);
        expect(numberOfFiles(1, "MB", 0.1)).toBe(100);
        expect(numberOfFiles(500, "B", 0.001)).toBe(2000);
    });

    test('medium drives', () => {
        expect(numberOfFiles(500, "KB", 10)).toBe(20000);
        expect(numberOfFiles(5, "MB", 50)).toBe(10000);
        expect(numberOfFiles(1000, "B", 5)).toBe(5000000);
    });

    test('large drives', () => {
        expect(numberOfFiles(1, "MB", 1000)).toBe(1000000);
        expect(numberOfFiles(100, "KB", 500)).toBe(5000000);
        expect(numberOfFiles(10, "MB", 10000)).toBe(1000000);
    });
});

describe('numberOfFiles - decimal file sizes', () => {
    test('decimal bytes', () => {
        expect(numberOfFiles(1.5, "B", 1)).toBe(666666666);
        expect(numberOfFiles(2.5, "B", 1)).toBe(400000000);
    });

    test('decimal kilobytes', () => {
        expect(numberOfFiles(1.5, "KB", 1)).toBe(666666);
        expect(numberOfFiles(2.5, "KB", 1)).toBe(400000);
        expect(numberOfFiles(220.5, "KB", 100)).toBe(453514);
    });

    test('decimal megabytes', () => {
        expect(numberOfFiles(1.5, "MB", 1)).toBe(666);
        expect(numberOfFiles(2.5, "MB", 10)).toBe(4000);
        expect(numberOfFiles(4.5, "MB", 750)).toBe(166666);
    });
});

describe('numberOfFiles - decimal drive sizes', () => {
    test('fractional gigabytes', () => {
        expect(numberOfFiles(1, "MB", 0.5)).toBe(500);
        expect(numberOfFiles(100, "KB", 2.5)).toBe(25000);
        expect(numberOfFiles(4096, "B", 1.5)).toBe(366210);
    });

    test('large decimal drives', () => {
        expect(numberOfFiles(1, "KB", 10.5)).toBe(10500000);
        expect(numberOfFiles(5, "MB", 100.5)).toBe(20100);
    });
});

describe('numberOfFiles - unit conversions', () => {
    test('bytes to GB conversion', () => {
        expect(numberOfFiles(1000, "B", 1)).toBe(1000000);
        expect(numberOfFiles(1000000, "B", 1)).toBe(1000);
        expect(numberOfFiles(1000000000, "B", 1)).toBe(1);
    });

    test('KB to GB conversion', () => {
        expect(numberOfFiles(1000, "KB", 1)).toBe(1000);
        expect(numberOfFiles(1000000, "KB", 1)).toBe(1);
    });

    test('MB to GB conversion', () => {
        expect(numberOfFiles(1000, "MB", 1)).toBe(1);
        expect(numberOfFiles(500, "MB", 1)).toBe(2);
        expect(numberOfFiles(250, "MB", 1)).toBe(4);
    });
});

describe('numberOfFiles - whole file constraint', () => {
    test('returns floor of division', () => {
        expect(numberOfFiles(3, "MB", 1)).toBe(333);
        expect(numberOfFiles(7, "MB", 1)).toBe(142);
        expect(numberOfFiles(333, "KB", 1)).toBe(3003);
    });

    test('no partial files', () => {
        expect(numberOfFiles(1.7, "MB", 1)).toBe(588);
        expect(numberOfFiles(2.3, "KB", 1)).toBe(434782);
    });

    test('exact fit', () => {
        expect(numberOfFiles(1, "MB", 1)).toBe(1000);
        expect(numberOfFiles(500, "KB", 1)).toBe(2000);
        expect(numberOfFiles(1000000, "B", 1)).toBe(1000);
    });
});

describe('numberOfFiles - edge cases', () => {
    test('very small files', () => {
        expect(numberOfFiles(1, "B", 1)).toBe(1000000000);
        expect(numberOfFiles(0.1, "B", 1)).toBe(10000000000);
    });

    test('very large files', () => {
        expect(numberOfFiles(500, "MB", 1)).toBe(2);
        expect(numberOfFiles(900, "MB", 1)).toBe(1);
        expect(numberOfFiles(999, "MB", 1)).toBe(1);
    });

    test('file size equals drive size', () => {
        expect(numberOfFiles(1000, "MB", 1)).toBe(1);
    });

    test('returns integer', () => {
        expect(Number.isInteger(numberOfFiles(3, "MB", 1))).toBe(true);
        expect(Number.isInteger(numberOfFiles(7.5, "KB", 2.5))).toBe(true);
    });
});

describe('numberOfFiles - practical scenarios', () => {
    test('document storage', () => {
        expect(numberOfFiles(100, "KB", 16)).toBe(160000);
        expect(numberOfFiles(500, "KB", 256)).toBe(512000);
    });

    test('photo storage', () => {
        expect(numberOfFiles(3, "MB", 128)).toBe(42666);
        expect(numberOfFiles(5, "MB", 512)).toBe(102400);
    });

    test('video storage', () => {
        expect(numberOfFiles(100, "MB", 500)).toBe(5000);
        expect(numberOfFiles(750, "MB", 2000)).toBe(2666);
    });

    test('audio storage', () => {
        expect(numberOfFiles(4, "MB", 64)).toBe(16000);
        expect(numberOfFiles(8, "MB", 256)).toBe(32000);
    });
});

describe('numberOfFiles - different units same result', () => {
    test('equivalent file sizes', () => {
        expect(numberOfFiles(1000, "B", 1)).toBe(numberOfFiles(1, "KB", 1));
        expect(numberOfFiles(1000, "KB", 1)).toBe(numberOfFiles(1, "MB", 1));
    });

    test('scaled equivalents', () => {
        expect(numberOfFiles(500000, "B", 10)).toBe(numberOfFiles(500, "KB", 10));
        expect(numberOfFiles(5000, "KB", 100)).toBe(numberOfFiles(5, "MB", 100));
    });
});

describe('numberOfFiles - boundary values', () => {
    test('minimum reasonable values', () => {
        expect(numberOfFiles(1, "B", 0.000001)).toBe(1000);
        expect(numberOfFiles(0.001, "MB", 1)).toBe(1000000);
    });

    test('maximum reasonable values', () => {
        expect(numberOfFiles(1, "KB", 10000)).toBe(10000000000);
        expect(numberOfFiles(0.1, "MB", 5000)).toBe(50000000);
    });
});

describe('numberOfPhotos - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(numberOfPhotos(1, 1)).toBe(1000);
        expect(numberOfPhotos(2, 1)).toBe(500);
        expect(numberOfPhotos(4, 256)).toBe(64000);
        expect(numberOfPhotos(3.5, 750)).toBe(214285);
        expect(numberOfPhotos(3.5, 5.5)).toBe(1571);
    });

    test('simple whole number cases', () => {
        expect(numberOfPhotos(1, 1)).toBe(1000);
        expect(numberOfPhotos(2, 2)).toBe(1000);
        expect(numberOfPhotos(5, 5)).toBe(1000);
    });

    test('small photo sizes', () => {
        expect(numberOfPhotos(1, 10)).toBe(10000);
        expect(numberOfPhotos(2, 10)).toBe(5000);
        expect(numberOfPhotos(5, 10)).toBe(2000);
    });

    test('large photo sizes', () => {
        expect(numberOfPhotos(10, 100)).toBe(10000);
        expect(numberOfPhotos(20, 100)).toBe(5000);
        expect(numberOfPhotos(50, 100)).toBe(2000);
    });
});

describe('numberOfPhotos - different drive sizes', () => {
    test('small drives', () => {
        expect(numberOfPhotos(1, 0.5)).toBe(500);
        expect(numberOfPhotos(2, 1)).toBe(500);
        expect(numberOfPhotos(0.5, 1)).toBe(2000);
    });

    test('medium drives', () => {
        expect(numberOfPhotos(3, 50)).toBe(16666);
        expect(numberOfPhotos(5, 100)).toBe(20000);
        expect(numberOfPhotos(10, 500)).toBe(50000);
    });

    test('large drives', () => {
        expect(numberOfPhotos(2, 1000)).toBe(500000);
        expect(numberOfPhotos(5, 5000)).toBe(1000000);
        expect(numberOfPhotos(10, 10000)).toBe(1000000);
    });
});

describe('numberOfPhotos - decimal photo sizes', () => {
    test('decimal megabytes', () => {
        expect(numberOfPhotos(1.5, 10)).toBe(6666);
        expect(numberOfPhotos(2.5, 10)).toBe(4000);
        expect(numberOfPhotos(3.5, 750)).toBe(214285);
    });

    test('small decimals', () => {
        expect(numberOfPhotos(0.5, 1)).toBe(2000);
        expect(numberOfPhotos(0.25, 1)).toBe(4000);
        expect(numberOfPhotos(0.1, 1)).toBe(10000);
    });

    test('large decimals', () => {
        expect(numberOfPhotos(10.5, 100)).toBe(9523);
        expect(numberOfPhotos(25.5, 500)).toBe(19607);
    });
});

describe('numberOfPhotos - decimal drive sizes', () => {
    test('fractional gigabytes', () => {
        expect(numberOfPhotos(1, 0.5)).toBe(500);
        expect(numberOfPhotos(2, 1.5)).toBe(750);
        expect(numberOfPhotos(3.5, 5.5)).toBe(1571);
    });

    test('large decimal drives', () => {
        expect(numberOfPhotos(5, 100.5)).toBe(20100);
        expect(numberOfPhotos(10, 500.5)).toBe(50050);
    });

    test('both decimal', () => {
        expect(numberOfPhotos(2.5, 10.5)).toBe(4200);
        expect(numberOfPhotos(3.5, 7.5)).toBe(2142);
    });
});

describe('numberOfPhotos - whole photo constraint', () => {
    test('returns floor of division', () => {
        expect(numberOfPhotos(3, 1)).toBe(333);
        expect(numberOfPhotos(7, 1)).toBe(142);
        expect(numberOfPhotos(9, 1)).toBe(111);
    });

    test('no partial photos', () => {
        expect(numberOfPhotos(1.7, 1)).toBe(588);
        expect(numberOfPhotos(2.3, 1)).toBe(434);
    });

    test('exact fit', () => {
        expect(numberOfPhotos(1, 1)).toBe(1000);
        expect(numberOfPhotos(2, 2)).toBe(1000);
        expect(numberOfPhotos(10, 10)).toBe(1000);
    });
});

describe('numberOfPhotos - conversion validation', () => {
    test('1 GB = 1000 MB', () => {
        expect(numberOfPhotos(1, 1)).toBe(1000);
        expect(numberOfPhotos(1000, 1)).toBe(1);
    });

    test('conversion accuracy', () => {
        expect(numberOfPhotos(10, 1)).toBe(100);
        expect(numberOfPhotos(100, 1)).toBe(10);
        expect(numberOfPhotos(500, 1)).toBe(2);
    });

    test('multiple gigabytes', () => {
        expect(numberOfPhotos(1, 5)).toBe(5000);
        expect(numberOfPhotos(1, 10)).toBe(10000);
        expect(numberOfPhotos(1, 100)).toBe(100000);
    });
});

describe('numberOfPhotos - edge cases', () => {
    test('very small photos', () => {
        expect(numberOfPhotos(0.1, 1)).toBe(10000);
        expect(numberOfPhotos(0.01, 1)).toBe(100000);
    });

    test('very large photos', () => {
        expect(numberOfPhotos(500, 1000)).toBe(2000);
        expect(numberOfPhotos(900, 1000)).toBe(1111);
    });

    test('photo size equals drive size in MB', () => {
        expect(numberOfPhotos(1000, 1)).toBe(1);
        expect(numberOfPhotos(2000, 2)).toBe(1);
    });

    test('returns integer', () => {
        expect(Number.isInteger(numberOfPhotos(3, 1))).toBe(true);
        expect(Number.isInteger(numberOfPhotos(7.5, 2.5))).toBe(true);
    });
});

describe('numberOfPhotos - practical scenarios', () => {
    test('smartphone storage', () => {
        expect(numberOfPhotos(3, 64)).toBe(21333);
        expect(numberOfPhotos(4, 128)).toBe(32000);
        expect(numberOfPhotos(5, 256)).toBe(51200);
    });

    test('camera RAW files', () => {
        expect(numberOfPhotos(25, 500)).toBe(20000);
        expect(numberOfPhotos(30, 1000)).toBe(33333);
    });

    test('compressed photos', () => {
        expect(numberOfPhotos(1, 32)).toBe(32000);
        expect(numberOfPhotos(2, 64)).toBe(32000);
    });

    test('high resolution photos', () => {
        expect(numberOfPhotos(15, 500)).toBe(33333);
        expect(numberOfPhotos(20, 1000)).toBe(50000);
    });
});

describe('numberOfPhotos - scaling relationships', () => {
    test('double drive size, double photos', () => {
        expect(numberOfPhotos(5, 10)).toBe(numberOfPhotos(5, 5) * 2);
        expect(numberOfPhotos(3, 20)).toBe(numberOfPhotos(3, 10) * 2);
    });

    test('double photo size, half photos', () => {
        expect(numberOfPhotos(4, 100)).toBe(numberOfPhotos(2, 100) / 2);
        expect(numberOfPhotos(10, 100)).toBe(numberOfPhotos(5, 100) / 2);
    });

    test('proportional changes', () => {
        expect(numberOfPhotos(2, 10)).toBe(5000);
        expect(numberOfPhotos(4, 20)).toBe(5000);
        expect(numberOfPhotos(8, 40)).toBe(5000);
    });
});

describe('numberOfPhotos - boundary values', () => {
    test('minimum reasonable values', () => {
        expect(numberOfPhotos(0.01, 0.1)).toBe(10000);
        expect(numberOfPhotos(0.1, 0.5)).toBe(5000);
    });

    test('maximum reasonable values', () => {
        expect(numberOfPhotos(50, 10000)).toBe(200000);
        expect(numberOfPhotos(100, 50000)).toBe(500000);
    });

    test('equal photo and drive size ratio', () => {
        expect(numberOfPhotos(1, 1)).toBe(1000);
        expect(numberOfPhotos(10, 10)).toBe(1000);
        expect(numberOfPhotos(100, 100)).toBe(1000);
    });
});

describe('costToFill - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(costToFill(20, 0, 4.00)).toBe("$80.00");
        expect(costToFill(15, 10, 3.50)).toBe("$17.50");
        expect(costToFill(18, 9, 3.25)).toBe("$29.25");
        expect(costToFill(12, 12, 4.99)).toBe("$0.00");
        expect(costToFill(15, 9.5, 3.98)).toBe("$21.89");
    });

    test('empty tank', () => {
        expect(costToFill(20, 0, 4.00)).toBe("$80.00");
        expect(costToFill(15, 0, 3.00)).toBe("$45.00");
        expect(costToFill(10, 0, 5.00)).toBe("$50.00");
    });

    test('full tank', () => {
        expect(costToFill(20, 20, 4.00)).toBe("$0.00");
        expect(costToFill(15, 15, 3.50)).toBe("$0.00");
        expect(costToFill(12, 12, 4.99)).toBe("$0.00");
    });

    test('half full tank', () => {
        expect(costToFill(20, 10, 4.00)).toBe("$40.00");
        expect(costToFill(10, 5, 3.00)).toBe("$15.00");
        expect(costToFill(30, 15, 2.50)).toBe("$37.50");
    });
});

describe('costToFill - different tank sizes', () => {
    test('small tanks', () => {
        expect(costToFill(10, 5, 3.00)).toBe("$15.00");
        expect(costToFill(12, 8, 3.50)).toBe("$14.00");
        expect(costToFill(8, 3, 4.00)).toBe("$20.00");
    });

    test('medium tanks', () => {
        expect(costToFill(20, 10, 3.50)).toBe("$35.00");
        expect(costToFill(25, 15, 4.00)).toBe("$40.00");
        expect(costToFill(18, 9, 3.25)).toBe("$29.25");
    });

    test('large tanks', () => {
        expect(costToFill(50, 25, 3.00)).toBe("$75.00");
        expect(costToFill(100, 50, 2.50)).toBe("$125.00");
        expect(costToFill(80, 40, 3.75)).toBe("$150.00");
    });
});

describe('costToFill - different fuel levels', () => {
    test('nearly empty', () => {
        expect(costToFill(20, 1, 4.00)).toBe("$76.00");
        expect(costToFill(15, 2, 3.50)).toBe("$45.50");
        expect(costToFill(10, 0.5, 5.00)).toBe("$47.50");
    });

    test('nearly full', () => {
        expect(costToFill(20, 19, 4.00)).toBe("$4.00");
        expect(costToFill(15, 14, 3.50)).toBe("$3.50");
        expect(costToFill(10, 9.5, 5.00)).toBe("$2.50");
    });

    test('quarter full', () => {
        expect(costToFill(20, 5, 4.00)).toBe("$60.00");
        expect(costToFill(16, 4, 3.25)).toBe("$39.00");
    });

    test('three quarters full', () => {
        expect(costToFill(20, 15, 4.00)).toBe("$20.00");
        expect(costToFill(16, 12, 3.25)).toBe("$13.00");
    });
});

describe('costToFill - different prices', () => {
    test('low prices', () => {
        expect(costToFill(20, 10, 2.00)).toBe("$20.00");
        expect(costToFill(15, 5, 2.50)).toBe("$25.00");
        expect(costToFill(10, 5, 1.99)).toBe("$9.95");
    });

    test('medium prices', () => {
        expect(costToFill(20, 10, 3.50)).toBe("$35.00");
        expect(costToFill(15, 5, 4.00)).toBe("$40.00");
        expect(costToFill(18, 9, 3.25)).toBe("$29.25");
    });

    test('high prices', () => {
        expect(costToFill(20, 10, 5.00)).toBe("$50.00");
        expect(costToFill(15, 5, 6.00)).toBe("$60.00");
        expect(costToFill(10, 5, 7.50)).toBe("$37.50");
    });
});

describe('costToFill - decimal values', () => {
    test('decimal fuel level', () => {
        expect(costToFill(15, 9.5, 3.98)).toBe("$21.89");
        expect(costToFill(20, 10.5, 4.00)).toBe("$38.00");
        expect(costToFill(18, 8.25, 3.50)).toBe("$34.13");
    });

    test('decimal tank size', () => {
        expect(costToFill(15.5, 10, 4.00)).toBe("$22.00");
        expect(costToFill(20.5, 15, 3.50)).toBe("$19.25");
    });

    test('decimal price', () => {
        expect(costToFill(20, 10, 3.99)).toBe("$39.90");
        expect(costToFill(15, 5, 4.49)).toBe("$44.90");
        expect(costToFill(12, 12, 4.99)).toBe("$0.00");
    });

    test('all decimal values', () => {
        expect(costToFill(15.5, 9.5, 3.98)).toBe("$23.88");
        expect(costToFill(18.5, 8.25, 3.75)).toBe("$38.44");
    });
});

describe('costToFill - format validation', () => {
    test('always starts with dollar sign', () => {
        expect(costToFill(20, 10, 4.00)).toMatch(/^\$/);
        expect(costToFill(15, 5, 3.50)).toMatch(/^\$/);
    });

    test('always has two decimal places', () => {
        expect(costToFill(20, 10, 4.00)).toMatch(/\.\d{2}$/);
        expect(costToFill(15, 5, 3.50)).toMatch(/\.\d{2}$/);
        expect(costToFill(12, 12, 4.99)).toMatch(/\.\d{2}$/);
    });

    test('format for whole dollar amounts', () => {
        expect(costToFill(20, 10, 4.00)).toBe("$40.00");
        expect(costToFill(10, 5, 6.00)).toBe("$30.00");
    });

    test('format for cents', () => {
        expect(costToFill(20, 10, 3.50)).toBe("$35.00");
        expect(costToFill(15, 10, 3.50)).toBe("$17.50");
    });
});

describe('costToFill - calculation accuracy', () => {
    test('simple multiplications', () => {
        expect(costToFill(20, 0, 4.00)).toBe("$80.00");
        expect(costToFill(10, 0, 5.00)).toBe("$50.00");
        expect(costToFill(15, 0, 3.00)).toBe("$45.00");
    });

    test('complex calculations', () => {
        expect(costToFill(18, 9, 3.25)).toBe("$29.25");
        expect(costToFill(15, 9.5, 3.98)).toBe("$21.89");
    });

    test('rounding to cents', () => {
        expect(costToFill(10, 3, 3.33)).toBe("$23.31");
        expect(costToFill(15, 5, 2.99)).toBe("$29.90");
    });
});

describe('costToFill - edge cases', () => {
    test('very small amounts', () => {
        expect(costToFill(10, 9.99, 4.00)).toBe("$0.04");
        expect(costToFill(20, 19.95, 3.50)).toBe("$0.18");
    });

    test('very large amounts', () => {
        expect(costToFill(100, 0, 5.00)).toBe("$500.00");
        expect(costToFill(200, 50, 4.50)).toBe("$675.00");
    });

    test('returns string', () => {
        expect(typeof costToFill(20, 10, 4.00)).toBe("string");
        expect(typeof costToFill(12, 12, 4.99)).toBe("string");
    });
});

describe('costToFill - practical scenarios', () => {
    test('compact car', () => {
        expect(costToFill(12, 3, 3.50)).toBe("$31.50");
        expect(costToFill(13, 5, 3.75)).toBe("$30.00");
    });

    test('sedan', () => {
        expect(costToFill(16, 4, 3.50)).toBe("$42.00");
        expect(costToFill(18, 6, 3.99)).toBe("$47.88");
    });

    test('SUV', () => {
        expect(costToFill(20, 5, 4.00)).toBe("$60.00");
        expect(costToFill(22, 8, 4.25)).toBe("$59.50");
    });

    test('truck', () => {
        expect(costToFill(26, 10, 3.75)).toBe("$60.00");
        expect(costToFill(30, 12, 4.00)).toBe("$72.00");
    });
});

describe('costToFill - zero scenarios', () => {
    test('zero gallons needed', () => {
        expect(costToFill(15, 15, 3.50)).toBe("$0.00");
        expect(costToFill(20, 20, 4.00)).toBe("$0.00");
    });

    test('zero price per gallon', () => {
        expect(costToFill(20, 10, 0)).toBe("$0.00");
        expect(costToFill(15, 0, 0)).toBe("$0.00");
    });
});

describe('generateSlug - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(generateSlug("helloWorld")).toBe("helloworld");
        expect(generateSlug("hello world!")).toBe("hello%20world");
        expect(generateSlug(" hello-world ")).toBe("helloworld");
        expect(generateSlug("hello  world")).toBe("hello%20world");
        expect(generateSlug("  ?H^3-1*1]0! W[0%R#1]D  ")).toBe("h3110%20w0r1d");
    });

    test('simple lowercase conversion', () => {
        expect(generateSlug("Hello")).toBe("hello");
        expect(generateSlug("WORLD")).toBe("world");
        expect(generateSlug("TeSt")).toBe("test");
    });

    test('no spaces', () => {
        expect(generateSlug("helloworld")).toBe("helloworld");
        expect(generateSlug("test123")).toBe("test123");
        expect(generateSlug("abc")).toBe("abc");
    });

    test('single space', () => {
        expect(generateSlug("hello world")).toBe("hello%20world");
        expect(generateSlug("test case")).toBe("test%20case");
    });
});

describe('generateSlug - special characters', () => {
    test('remove punctuation', () => {
        expect(generateSlug("hello!")).toBe("hello");
        expect(generateSlug("world?")).toBe("world");
        expect(generateSlug("test.case")).toBe("testcase");
    });

    test('remove symbols', () => {
        expect(generateSlug("hello@world")).toBe("helloworld");
        expect(generateSlug("test#case")).toBe("testcase");
        expect(generateSlug("price$100")).toBe("price100");
    });

    test('remove special characters', () => {
        expect(generateSlug("hello-world")).toBe("helloworld");
        expect(generateSlug("test_case")).toBe("testcase");
        expect(generateSlug("hello*world")).toBe("helloworld");
    });

    test('mixed special characters', () => {
        expect(generateSlug("hello!@#$%^&*()world")).toBe("helloworld");
        expect(generateSlug("test[]{}|\\case")).toBe("testcase");
        expect(generateSlug("price:$100")).toBe("price100");
    });
});

describe('generateSlug - multiple spaces', () => {
    test('double spaces', () => {
        expect(generateSlug("hello  world")).toBe("hello%20world");
        expect(generateSlug("test  case")).toBe("test%20case");
    });

    test('triple spaces', () => {
        expect(generateSlug("hello   world")).toBe("hello%20world");
        expect(generateSlug("test   case")).toBe("test%20case");
    });

    test('many spaces', () => {
        expect(generateSlug("hello     world")).toBe("hello%20world");
        expect(generateSlug("test          case")).toBe("test%20case");
    });

    test('multiple word gaps', () => {
        expect(generateSlug("one  two  three")).toBe("one%20two%20three");
        expect(generateSlug("a   b   c")).toBe("a%20b%20c");
    });
});

describe('generateSlug - leading and trailing spaces', () => {
    test('leading spaces', () => {
        expect(generateSlug(" hello")).toBe("hello");
        expect(generateSlug("  world")).toBe("world");
        expect(generateSlug("   test")).toBe("test");
    });

    test('trailing spaces', () => {
        expect(generateSlug("hello ")).toBe("hello");
        expect(generateSlug("world  ")).toBe("world");
        expect(generateSlug("test   ")).toBe("test");
    });

    test('both leading and trailing', () => {
        expect(generateSlug(" hello ")).toBe("hello");
        expect(generateSlug("  world  ")).toBe("world");
        expect(generateSlug("   test   ")).toBe("test");
    });

    test('leading and trailing with words', () => {
        expect(generateSlug(" hello world ")).toBe("hello%20world");
        expect(generateSlug("  test case  ")).toBe("test%20case");
        expect(generateSlug("   one two three   ")).toBe("one%20two%20three");
    });
});

describe('generateSlug - numbers', () => {
    test('preserve numbers', () => {
        expect(generateSlug("test123")).toBe("test123");
        expect(generateSlug("hello456world")).toBe("hello456world");
        expect(generateSlug("abc789")).toBe("abc789");
    });

    test('only numbers', () => {
        expect(generateSlug("123")).toBe("123");
        expect(generateSlug("456789")).toBe("456789");
    });

    test('numbers with spaces', () => {
        expect(generateSlug("test 123")).toBe("test%20123");
        expect(generateSlug("hello 456 world")).toBe("hello%20456%20world");
    });

    test('numbers with special characters', () => {
        expect(generateSlug("test-123")).toBe("test123");
        expect(generateSlug("hello_456_world")).toBe("hello456world");
    });
});

describe('generateSlug - mixed case', () => {
    test('camelCase', () => {
        expect(generateSlug("helloWorld")).toBe("helloworld");
        expect(generateSlug("testCase")).toBe("testcase");
        expect(generateSlug("myVariable")).toBe("myvariable");
    });

    test('PascalCase', () => {
        expect(generateSlug("HelloWorld")).toBe("helloworld");
        expect(generateSlug("TestCase")).toBe("testcase");
        expect(generateSlug("MyVariable")).toBe("myvariable");
    });

    test('UPPERCASE', () => {
        expect(generateSlug("HELLO")).toBe("hello");
        expect(generateSlug("WORLD")).toBe("world");
        expect(generateSlug("TEST CASE")).toBe("test%20case");
    });
});

describe('generateSlug - complex strings', () => {
    test('URL-like strings', () => {
        expect(generateSlug("http://example.com")).toBe("httpexamplecom");
        expect(generateSlug("www.test.com")).toBe("wwwtestcom");
    });

    test('email-like strings', () => {
        expect(generateSlug("test@example.com")).toBe("testexamplecom");
        expect(generateSlug("user.name@domain.com")).toBe("usernamedomaincom");
    });

    test('file paths', () => {
        expect(generateSlug("path/to/file.txt")).toBe("pathtofiletxt");
        expect(generateSlug("folder\\subfolder\\file")).toBe("foldersubfolderfile");
    });

    test('sentences', () => {
        expect(generateSlug("Hello, World!")).toBe("hello%20world");
        expect(generateSlug("This is a test.")).toBe("this%20is%20a%20test");
    });
});

describe('generateSlug - edge cases', () => {
    test('empty string', () => {
        expect(generateSlug("")).toBe("");
    });

    test('only spaces', () => {
        expect(generateSlug("   ")).toBe("");
    });

    test('only special characters', () => {
        expect(generateSlug("!@#$%^&*()")).toBe("");
        expect(generateSlug("---___...")).toBe("");
    });

    test('single character', () => {
        expect(generateSlug("a")).toBe("a");
        expect(generateSlug("Z")).toBe("z");
        expect(generateSlug("5")).toBe("5");
    });

    test('returns string', () => {
        expect(typeof generateSlug("test")).toBe("string");
        expect(typeof generateSlug("hello world")).toBe("string");
    });
});

describe('generateSlug - real-world examples', () => {
    test('blog post titles', () => {
        expect(generateSlug("How to Learn JavaScript")).toBe("how%20to%20learn%20javascript");
        expect(generateSlug("10 Tips for Better Code")).toBe("10%20tips%20for%20better%20code");
    });

    test('product names', () => {
        expect(generateSlug("iPhone 15 Pro")).toBe("iphone%2015%20pro");
        expect(generateSlug("Samsung Galaxy S24")).toBe("samsung%20galaxy%20s24");
    });

    test('article titles', () => {
        expect(generateSlug("The Quick Brown Fox")).toBe("the%20quick%20brown%20fox");
        expect(generateSlug("Understanding Async/Await")).toBe("understanding%20asyncawait");
    });

    test('usernames', () => {
        expect(generateSlug("john_doe")).toBe("johndoe");
        expect(generateSlug("user-123")).toBe("user123");
    });
});

describe('generateSlug - consecutive operations', () => {
    test('multiple spaces collapsed', () => {
        expect(generateSlug("a    b")).toBe("a%20b");
        expect(generateSlug("one     two     three")).toBe("one%20two%20three");
    });

    test('trim then collapse', () => {
        expect(generateSlug("   hello   world   ")).toBe("hello%20world");
        expect(generateSlug("  a  b  c  ")).toBe("a%20b%20c");
    });

    test('remove chars then collapse spaces', () => {
        expect(generateSlug("hello--world")).toBe("helloworld");
        expect(generateSlug("test  -  case")).toBe("test%20case");
    });
});

describe('generateSlug - alphanumeric only', () => {
    test('keeps letters and numbers', () => {
        expect(generateSlug("abc123xyz789")).toBe("abc123xyz789");
        expect(generateSlug("test2024")).toBe("test2024");
    });

    test('removes everything else', () => {
        expect(generateSlug("a!b@c#1$2%3")).toBe("abc123");
        expect(generateSlug("hello!!!world???")).toBe("helloworld");
    });

    test('preserves spaces between valid chars', () => {
        expect(generateSlug("hello! world?")).toBe("hello%20world");
        expect(generateSlug("test@ 123#")).toBe("test%20123");
    });
});

describe('capitalize - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(capitalize("this is a simple sentence.")).toBe("This is a simple sentence.");
        expect(capitalize("hello world. how are you?")).toBe("Hello world. How are you?");
        expect(capitalize("i did today's coding challenge... it was fun!!")).toBe("I did today's coding challenge... It was fun!!");
        expect(capitalize("crazy!!!strange???unconventional...sentences.")).toBe("Crazy!!!Strange???Unconventional...Sentences.");
        expect(capitalize("there's a space before this period . why is there a space before that period ?")).toBe("There's a space before this period . Why is there a space before that period ?");
    });

    test('single sentence with period', () => {
        expect(capitalize("this is a test.")).toBe("This is a test.");
        expect(capitalize("hello world.")).toBe("Hello world.");
    });

    test('single sentence with question mark', () => {
        expect(capitalize("how are you?")).toBe("How are you?");
        expect(capitalize("what is this?")).toBe("What is this?");
    });

    test('single sentence with exclamation', () => {
        expect(capitalize("this is great!")).toBe("This is great!");
        expect(capitalize("hello world!")).toBe("Hello world!");
    });
});

describe('capitalize - multiple sentences', () => {
    test('two sentences with periods', () => {
        expect(capitalize("hello world. how are you?")).toBe("Hello world. How are you?");
        expect(capitalize("this is test. this is another test.")).toBe("This is test. This is another test.");
    });

    test('three sentences', () => {
        expect(capitalize("first sentence. second sentence. third sentence.")).toBe("First sentence. Second sentence. Third sentence.");
    });

    test('mixed punctuation', () => {
        expect(capitalize("hello! how are you? i am fine.")).toBe("Hello! How are you? I am fine.");
        expect(capitalize("wow! really? yes.")).toBe("Wow! Really? Yes.");
    });
});

describe('capitalize - multiple punctuation marks', () => {
    test('multiple periods', () => {
        expect(capitalize("wait... what is this?")).toBe("Wait... What is this?");
        expect(capitalize("hmm... i see...")).toBe("Hmm... I see...");
    });

    test('multiple exclamation marks', () => {
        expect(capitalize("wow!!! this is amazing!!")).toBe("Wow!!! This is amazing!!");
        expect(capitalize("hello!!! how are you!!")).toBe("Hello!!! How are you!!");
    });

    test('multiple question marks', () => {
        expect(capitalize("what??? are you serious??")).toBe("What??? Are you serious??");
        expect(capitalize("really??? why???")).toBe("Really??? Why???");
    });

    test('mixed multiple punctuation', () => {
        expect(capitalize("crazy!!!strange???unconventional...sentences.")).toBe("Crazy!!!Strange???Unconventional...Sentences.");
    });
});

describe('capitalize - preserve other characters', () => {
    test('preserve uppercase letters', () => {
        expect(capitalize("hello WORLD. how ARE you?")).toBe("Hello WORLD. How ARE you?");
        expect(capitalize("this is UPPERCASE.")).toBe("This is UPPERCASE.");
    });

    test('preserve numbers', () => {
        expect(capitalize("there are 5 dogs. and 3 cats.")).toBe("There are 5 dogs. And 3 cats.");
        expect(capitalize("test 123. test 456.")).toBe("Test 123. Test 456.");
    });

    test('preserve special characters', () => {
        expect(capitalize("hello@world. test#case.")).toBe("Hello@world. Test#case.");
        expect(capitalize("price is $100. discount is 20%.")).toBe("Price is $100. Discount is 20%.");
    });

    test('preserve apostrophes', () => {
        expect(capitalize("there's a space before this period . why is there a space before that period ?")).toBe("There's a space before this period . Why is there a space before that period ?");
        expect(capitalize("it's great. don't worry.")).toBe("It's great. Don't worry.");
    });
});

describe('capitalize - spacing variations', () => {
    test('single space after punctuation', () => {
        expect(capitalize("hello. world.")).toBe("Hello. World.");
        expect(capitalize("test! case!")).toBe("Test! Case!");
    });

    test('multiple spaces after punctuation', () => {
        expect(capitalize("hello.  world.")).toBe("Hello.  World.");
        expect(capitalize("test!   case!")).toBe("Test!   Case!");
    });

    test('space before punctuation', () => {
        expect(capitalize("there's a space before this period . why is there a space before that period ?")).toBe("There's a space before this period . Why is there a space before that period ?");
    });
});

describe('capitalize - edge cases', () => {
    test('single character sentence', () => {
        expect(capitalize("a. b. c.")).toBe("A. B. C.");
        expect(capitalize("i. u.")).toBe("I. U.");
    });

    test('already capitalized', () => {
        expect(capitalize("Hello world. How are you?")).toBe("Hello world. How are you?");
        expect(capitalize("This is test.")).toBe("This is test.");
    });

    test('all uppercase', () => {
        expect(capitalize("HELLO WORLD. HOW ARE YOU?")).toBe("HELLO WORLD. HOW ARE YOU?");
    });

    test('no punctuation at end', () => {
        expect(capitalize("hello world")).toBe("Hello world");
        expect(capitalize("test case")).toBe("Test case");
    });

    test('empty string', () => {
        expect(capitalize("")).toBe("");
    });

    test('only punctuation', () => {
        expect(capitalize("...")).toBe("...");
        expect(capitalize("!!!")).toBe("!!!");
    });
});

describe('capitalize - paragraph format', () => {
    test('multiple lines', () => {
        expect(capitalize("first line. second sentence.")).toBe("First line. Second sentence.");
    });

    test('long paragraph', () => {
        const input = "this is first. this is second. this is third.";
        const expected = "This is first. This is second. This is third.";
        expect(capitalize(input)).toBe(expected);
    });
});

describe('capitalize - sentence starters', () => {
    test('starts with lowercase letter', () => {
        expect(capitalize("hello world.")).toBe("Hello world.");
        expect(capitalize("test case.")).toBe("Test case.");
    });

    test('starts with uppercase letter', () => {
        expect(capitalize("Hello world.")).toBe("Hello world.");
        expect(capitalize("Test case.")).toBe("Test case.");
    });

    test('starts with number', () => {
        expect(capitalize("123 test.")).toBe("123 test.");
        expect(capitalize("5 dogs. 3 cats.")).toBe("5 dogs. 3 cats.");
    });

    test('starts with special character', () => {
        expect(capitalize("@test case.")).toBe("@test case.");
        expect(capitalize("#hello world.")).toBe("#hello world.");
    });
});

describe('capitalize - real-world examples', () => {
    test('story paragraphs', () => {
        expect(capitalize("once upon a time. there was a princess. she lived in a castle.")).toBe("Once upon a time. There was a princess. She lived in a castle.");
    });

    test('dialog', () => {
        expect(capitalize("hello! how are you? i am fine.")).toBe("Hello! How are you? I am fine.");
    });

    test('questions and answers', () => {
        expect(capitalize("what is your name? my name is john. nice to meet you!")).toBe("What is your name? My name is john. Nice to meet you!");
    });

    test('excited statements', () => {
        expect(capitalize("this is amazing!!! i love it!! so cool!")).toBe("This is amazing!!! I love it!! So cool!");
    });
});

describe('capitalize - consecutive sentences', () => {
    test('no space between sentences', () => {
        expect(capitalize("hello.world.test.")).toBe("Hello.World.Test.");
    });

    test('multiple sentences rapidly', () => {
        expect(capitalize("a.b.c.d.e.")).toBe("A.B.C.D.E.");
    });
});

describe('capitalize - mixed content', () => {
    test('with quotes', () => {
        expect(capitalize("he said 'hello'. she replied 'hi'.")).toBe("He said 'hello'. She replied 'hi'.");
    });

    test('with parentheses', () => {
        expect(capitalize("this is test (example). another test (sample).")).toBe("This is test (example). Another test (sample).");
    });

    test('with commas', () => {
        expect(capitalize("hello, world. how are you, friend?")).toBe("Hello, world. How are you, friend?");
    });
});

describe('adjustThermostat - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(adjustThermostat(68, 72)).toBe("heat");
        expect(adjustThermostat(75, 72)).toBe("cool");
        expect(adjustThermostat(72, 72)).toBe("hold");
        expect(adjustThermostat(-20.5, -10.1)).toBe("heat");
        expect(adjustThermostat(100, 99.9)).toBe("cool");
        expect(adjustThermostat(0.0, 0.0)).toBe("hold");
    });

    test('need heat', () => {
        expect(adjustThermostat(65, 70)).toBe("heat");
        expect(adjustThermostat(60, 68)).toBe("heat");
        expect(adjustThermostat(50, 72)).toBe("heat");
    });

    test('need cool', () => {
        expect(adjustThermostat(75, 70)).toBe("cool");
        expect(adjustThermostat(80, 72)).toBe("cool");
        expect(adjustThermostat(85, 68)).toBe("cool");
    });

    test('hold temperature', () => {
        expect(adjustThermostat(70, 70)).toBe("hold");
        expect(adjustThermostat(68, 68)).toBe("hold");
        expect(adjustThermostat(72, 72)).toBe("hold");
    });
});

describe('adjustThermostat - small differences', () => {
    test('one degree below', () => {
        expect(adjustThermostat(71, 72)).toBe("heat");
        expect(adjustThermostat(67, 68)).toBe("heat");
    });

    test('one degree above', () => {
        expect(adjustThermostat(73, 72)).toBe("cool");
        expect(adjustThermostat(69, 68)).toBe("cool");
    });

    test('half degree differences', () => {
        expect(adjustThermostat(71.5, 72)).toBe("heat");
        expect(adjustThermostat(72.5, 72)).toBe("cool");
    });

    test('small decimal differences', () => {
        expect(adjustThermostat(71.9, 72)).toBe("heat");
        expect(adjustThermostat(72.1, 72)).toBe("cool");
        expect(adjustThermostat(100, 99.9)).toBe("cool");
    });
});

describe('adjustThermostat - large differences', () => {
    test('much colder', () => {
        expect(adjustThermostat(50, 70)).toBe("heat");
        expect(adjustThermostat(40, 72)).toBe("heat");
        expect(adjustThermostat(30, 68)).toBe("heat");
    });

    test('much warmer', () => {
        expect(adjustThermostat(90, 70)).toBe("cool");
        expect(adjustThermostat(95, 72)).toBe("cool");
        expect(adjustThermostat(100, 68)).toBe("cool");
    });

    test('extreme differences', () => {
        expect(adjustThermostat(20, 80)).toBe("heat");
        expect(adjustThermostat(100, 50)).toBe("cool");
    });
});

describe('adjustThermostat - negative temperatures', () => {
    test('negative current, negative target', () => {
        expect(adjustThermostat(-20, -10)).toBe("heat");
        expect(adjustThermostat(-5, -15)).toBe("cool");
        expect(adjustThermostat(-20, -20)).toBe("hold");
    });

    test('negative current, positive target', () => {
        expect(adjustThermostat(-10, 20)).toBe("heat");
        expect(adjustThermostat(-5, 0)).toBe("heat");
    });

    test('decimal negative temperatures', () => {
        expect(adjustThermostat(-20.5, -10.1)).toBe("heat");
        expect(adjustThermostat(-5.5, -10.5)).toBe("cool");
        expect(adjustThermostat(-15.5, -15.5)).toBe("hold");
    });
});

describe('adjustThermostat - zero temperatures', () => {
    test('zero current and target', () => {
        expect(adjustThermostat(0, 0)).toBe("hold");
        expect(adjustThermostat(0.0, 0.0)).toBe("hold");
    });

    test('zero current', () => {
        expect(adjustThermostat(0, 20)).toBe("heat");
        expect(adjustThermostat(0, -10)).toBe("cool");
    });

    test('zero target', () => {
        expect(adjustThermostat(20, 0)).toBe("cool");
        expect(adjustThermostat(-10, 0)).toBe("heat");
    });
});

describe('adjustThermostat - decimal temperatures', () => {
    test('decimal current temp', () => {
        expect(adjustThermostat(68.5, 70)).toBe("heat");
        expect(adjustThermostat(73.5, 72)).toBe("cool");
        expect(adjustThermostat(70.0, 70)).toBe("hold");
    });

    test('decimal target temp', () => {
        expect(adjustThermostat(68, 70.5)).toBe("heat");
        expect(adjustThermostat(72, 70.5)).toBe("cool");
        expect(adjustThermostat(70.5, 70.5)).toBe("hold");
    });

    test('both decimal', () => {
        expect(adjustThermostat(68.5, 70.5)).toBe("heat");
        expect(adjustThermostat(72.5, 70.5)).toBe("cool");
        expect(adjustThermostat(70.5, 70.5)).toBe("hold");
    });
});

describe('adjustThermostat - extreme temperatures', () => {
    test('very hot', () => {
        expect(adjustThermostat(120, 72)).toBe("cool");
        expect(adjustThermostat(100, 80)).toBe("cool");
    });

    test('very cold', () => {
        expect(adjustThermostat(-40, 0)).toBe("heat");
        expect(adjustThermostat(-50, -20)).toBe("heat");
    });

    test('extreme ranges', () => {
        expect(adjustThermostat(-100, 100)).toBe("heat");
        expect(adjustThermostat(200, 0)).toBe("cool");
    });
});

describe('adjustThermostat - return values', () => {
    test('returns string', () => {
        expect(typeof adjustThermostat(68, 72)).toBe("string");
        expect(typeof adjustThermostat(72, 68)).toBe("string");
        expect(typeof adjustThermostat(70, 70)).toBe("string");
    });

    test('returns exact strings', () => {
        expect(adjustThermostat(65, 70)).toBe("heat");
        expect(adjustThermostat(75, 70)).toBe("cool");
        expect(adjustThermostat(70, 70)).toBe("hold");
    });
});

describe('adjustThermostat - typical scenarios', () => {
    test('morning warmup', () => {
        expect(adjustThermostat(62, 68)).toBe("heat");
        expect(adjustThermostat(65, 70)).toBe("heat");
    });

    test('afternoon cooling', () => {
        expect(adjustThermostat(78, 72)).toBe("cool");
        expect(adjustThermostat(80, 75)).toBe("cool");
    });

    test('maintain comfort', () => {
        expect(adjustThermostat(72, 72)).toBe("hold");
        expect(adjustThermostat(68, 68)).toBe("hold");
    });

    test('winter heating', () => {
        expect(adjustThermostat(55, 68)).toBe("heat");
        expect(adjustThermostat(60, 70)).toBe("heat");
    });

    test('summer cooling', () => {
        expect(adjustThermostat(85, 72)).toBe("cool");
        expect(adjustThermostat(90, 75)).toBe("cool");
    });
});

describe('adjustThermostat - boundary conditions', () => {
    test('just below target', () => {
        expect(adjustThermostat(71.99, 72)).toBe("heat");
        expect(adjustThermostat(67.99, 68)).toBe("heat");
    });

    test('just above target', () => {
        expect(adjustThermostat(72.01, 72)).toBe("cool");
        expect(adjustThermostat(68.01, 68)).toBe("cool");
    });

    test('exactly at target', () => {
        expect(adjustThermostat(72.00, 72.00)).toBe("hold");
        expect(adjustThermostat(68.00, 68.00)).toBe("hold");
    });
});

describe('adjustThermostat - temperature ranges', () => {
    test('comfort range 68-72', () => {
        expect(adjustThermostat(65, 68)).toBe("heat");
        expect(adjustThermostat(68, 68)).toBe("hold");
        expect(adjustThermostat(70, 68)).toBe("cool");
        expect(adjustThermostat(72, 72)).toBe("hold");
        expect(adjustThermostat(75, 72)).toBe("cool");
    });

    test('cold range below 50', () => {
        expect(adjustThermostat(40, 50)).toBe("heat");
        expect(adjustThermostat(30, 50)).toBe("heat");
    });

    test('hot range above 80', () => {
        expect(adjustThermostat(90, 80)).toBe("cool");
        expect(adjustThermostat(100, 80)).toBe("cool");
    });
});

describe('getWords - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(getWords("Coding in Python is fun because coding Python allows for coding in Python easily while coding")).toEqual(["coding", "python", "in"]);
        expect(getWords("I like coding. I like testing. I love debugging!")).toEqual(["i", "like", "coding"]);
        expect(getWords("Debug, test, deploy. Debug, debug, test, deploy. Debug, test, test, deploy!")).toEqual(["debug", "test", "deploy"]);
    });

    test('single word repeated', () => {
        expect(getWords("hello hello hello")).toEqual(["hello"]);
        expect(getWords("test test test test")).toEqual(["test"]);
    });

    test('three different words', () => {
        expect(getWords("one two three")).toEqual(["one", "two", "three"]);
        expect(getWords("apple banana cherry")).toEqual(["apple", "banana", "cherry"]);
    });

    test('returns top 3 when more words exist', () => {
        expect(getWords("a a a b b c d")).toEqual(["a", "b", "c"]);
        expect(getWords("x x x y y z")).toEqual(["x", "y", "z"]);
    });
});

describe('getWords - case sensitivity', () => {
    test('ignores case', () => {
        expect(getWords("Hello hello HELLO")).toEqual(["hello"]);
        expect(getWords("Test TEST test")).toEqual(["test"]);
    });

    test('mixed case words', () => {
        expect(getWords("Python python PYTHON Java java JAVA")).toEqual(["python", "java"]);
        expect(getWords("Coding CODING coding Testing TESTING")).toEqual(["coding", "testing"]);
    });

    test('returns lowercase', () => {
        const result = getWords("HELLO WORLD WORLD");
        expect(result).toEqual(["world", "hello"]);
        expect(result.every(word => word === word.toLowerCase())).toBe(true);
    });
});

describe('getWords - punctuation handling', () => {
    test('ignores commas', () => {
        expect(getWords("hello, hello, hello")).toEqual(["hello"]);
        expect(getWords("test, code, test, code, test")).toEqual(["test", "code"]);
    });

    test('ignores periods', () => {
        expect(getWords("hello. hello. hello.")).toEqual(["hello"]);
        expect(getWords("test. code. test. code. test.")).toEqual(["test", "code"]);
    });

    test('ignores exclamation points', () => {
        expect(getWords("hello! hello! hello!")).toEqual(["hello"]);
        expect(getWords("test! code! test! code! test!")).toEqual(["test", "code"]);
    });

    test('mixed punctuation', () => {
        expect(getWords("hello, world. hello! world, hello.")).toEqual(["hello", "world"]);
        expect(getWords("test, test. test! code, code.")).toEqual(["test", "code"]);
    });

    test('punctuation at different positions', () => {
        expect(getWords("hello, world! testing. hello, testing!")).toEqual(["hello", "testing", "world"]);
    });
});

describe('getWords - frequency counting', () => {
    test('counts correctly', () => {
        expect(getWords("a a a b b c")).toEqual(["a", "b", "c"]);
        expect(getWords("x x y y y z")).toEqual(["y", "x", "z"]);
    });

    test('same frequency preserves order', () => {
        const result = getWords("a b c");
        expect(result.length).toBe(3);
        expect(result).toContain("a");
        expect(result).toContain("b");
        expect(result).toContain("c");
    });

    test('high frequency words', () => {
        expect(getWords("the the the the the a a a b b c")).toEqual(["the", "a", "b"]);
    });

    test('descending order', () => {
        expect(getWords("a a a a b b b c c d")).toEqual(["a", "b", "c"]);
        expect(getWords("x x x x x y y y z z")).toEqual(["x", "y", "z"]);
    });
});

describe('getWords - array size', () => {
    test('returns 1 word when only 1 unique', () => {
        expect(getWords("test test test")).toEqual(["test"]);
        expect(getWords("hello hello")).toEqual(["hello"]);
    });

    test('returns 2 words when only 2 unique', () => {
        expect(getWords("test test hello")).toEqual(["test", "hello"]);
        expect(getWords("a a b")).toEqual(["a", "b"]);
    });

    test('returns exactly 3 words when 3 unique', () => {
        expect(getWords("a b c")).toEqual(["a", "b", "c"]);
        expect(getWords("one two three")).toEqual(["one", "two", "three"]);
    });

    test('returns 3 words when more than 3 unique', () => {
        expect(getWords("a b c d e").length).toBe(3);
        expect(getWords("one two three four five").length).toBe(3);
    });
});

describe('getWords - edge cases', () => {
    test('single word', () => {
        expect(getWords("hello")).toEqual(["hello"]);
        expect(getWords("test")).toEqual(["test"]);
    });

    test('two words', () => {
        expect(getWords("hello world")).toEqual(["hello", "world"]);
    });

    test('many spaces', () => {
        expect(getWords("hello    world    hello")).toEqual(["hello", "world"]);
        expect(getWords("test  test  code")).toEqual(["test", "code"]);
    });

    test('spaces and punctuation', () => {
        expect(getWords("hello,  world!  hello.")).toEqual(["hello", "world"]);
    });
});

describe('getWords - realistic paragraphs', () => {
    test('simple sentence', () => {
        expect(getWords("The quick brown fox jumps over the lazy dog. The dog barks.")).toEqual(["the", "dog", "quick"]);
    });

    test('coding paragraph', () => {
        const result = getWords("Programming in JavaScript is fun. JavaScript allows for programming on the web. I love programming!");
        expect(result[0]).toBe("programming");
        expect(result[1]).toBe("javascript");
    });

    test('repeated common words', () => {
        expect(getWords("I love to code. I code every day. Coding is fun!")).toEqual(["i", "code", "love"]);
    });

    test('technical text', () => {
        const result = getWords("Testing is important. Testing helps find bugs. Testing improves code quality. Test your code!");
        expect(result[0]).toBe("testing");
    });
});

describe('getWords - word variations', () => {
    test('short words', () => {
        expect(getWords("a a a I I me")).toEqual(["a", "i", "me"]);
        expect(getWords("it it is is am")).toEqual(["it", "is", "am"]);
    });

    test('long words', () => {
        expect(getWords("programming programming coding testing")).toEqual(["programming", "coding", "testing"]);
    });

    test('mixed length words', () => {
        expect(getWords("I love programming. I code daily. Programming is fun!")).toEqual(["i", "programming", "love"]);
    });
});

describe('getWords - special scenarios', () => {
    test('all words same frequency', () => {
        const result = getWords("apple banana cherry date");
        expect(result.length).toBe(3);
    });

    test('punctuation with spaces', () => {
        expect(getWords("hello! world, test. hello, world!")).toEqual(["hello", "world", "test"]);
    });

    test('multiple sentences', () => {
        expect(getWords("First sentence. Second sentence. Third sentence.")).toEqual(["sentence", "first", "second"]);
    });

    test('question-like structure', () => {
        expect(getWords("How do you code. How do you test. How do you debug.")).toEqual(["how", "do", "you"]);
    });
});

describe('getWords - return value validation', () => {
    test('returns array', () => {
        expect(Array.isArray(getWords("test test test"))).toBe(true);
        expect(Array.isArray(getWords("hello world"))).toBe(true);
    });

    test('array contains strings', () => {
        const result = getWords("hello world test hello world");
        result.forEach(word => {
            expect(typeof word).toBe("string");
        });
    });

    test('all lowercase strings', () => {
        const result = getWords("HELLO World TEST");
        result.forEach(word => {
            expect(word).toBe(word.toLowerCase());
        });
    });

    test('no empty strings', () => {
        const result = getWords("test   hello   world   test");
        result.forEach(word => {
            expect(word.length).toBeGreaterThan(0);
        });
    });
});

describe('getWords - complex frequency patterns', () => {
    test('gradually decreasing frequency', () => {
        expect(getWords("a a a a b b b c c d")).toEqual(["a", "b", "c"]);
    });

    test('two high frequency, many low', () => {
        expect(getWords("x x x x y y y y z a b c d")).toEqual(["x", "y", "z"]);
    });

    test('one dominant word', () => {
        const result = getWords("dominant dominant dominant dominant dominant a b c d e");
        expect(result[0]).toBe("dominant");
        expect(result.length).toBe(3);
    });
});

describe('parseRomanNumeral - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(parseRomanNumeral("III")).toBe(3);
        expect(parseRomanNumeral("IV")).toBe(4);
        expect(parseRomanNumeral("XXVI")).toBe(26);
        expect(parseRomanNumeral("XCIX")).toBe(99);
        expect(parseRomanNumeral("CDLX")).toBe(460);
        expect(parseRomanNumeral("DIV")).toBe(504);
        expect(parseRomanNumeral("MMXXV")).toBe(2025);
    });

    test('single symbols', () => {
        expect(parseRomanNumeral("I")).toBe(1);
        expect(parseRomanNumeral("V")).toBe(5);
        expect(parseRomanNumeral("X")).toBe(10);
        expect(parseRomanNumeral("L")).toBe(50);
        expect(parseRomanNumeral("C")).toBe(100);
        expect(parseRomanNumeral("D")).toBe(500);
        expect(parseRomanNumeral("M")).toBe(1000);
    });

    test('repeated symbols', () => {
        expect(parseRomanNumeral("II")).toBe(2);
        expect(parseRomanNumeral("III")).toBe(3);
        expect(parseRomanNumeral("XX")).toBe(20);
        expect(parseRomanNumeral("XXX")).toBe(30);
        expect(parseRomanNumeral("CC")).toBe(200);
        expect(parseRomanNumeral("CCC")).toBe(300);
        expect(parseRomanNumeral("MM")).toBe(2000);
        expect(parseRomanNumeral("MMM")).toBe(3000);
    });
});

describe('parseRomanNumeral - subtraction cases', () => {
    test('subtractive I before V and X', () => {
        expect(parseRomanNumeral("IV")).toBe(4);
        expect(parseRomanNumeral("IX")).toBe(9);
    });

    test('subtractive X before L and C', () => {
        expect(parseRomanNumeral("XL")).toBe(40);
        expect(parseRomanNumeral("XC")).toBe(90);
    });

    test('subtractive C before D and M', () => {
        expect(parseRomanNumeral("CD")).toBe(400);
        expect(parseRomanNumeral("CM")).toBe(900);
    });

    test('multiple subtractions', () => {
        expect(parseRomanNumeral("XCIV")).toBe(94);
        expect(parseRomanNumeral("CDXC")).toBe(490);
        expect(parseRomanNumeral("CMXC")).toBe(990);
    });
});

describe('parseRomanNumeral - addition cases', () => {
    test('simple additions', () => {
        expect(parseRomanNumeral("VI")).toBe(6);
        expect(parseRomanNumeral("VII")).toBe(7);
        expect(parseRomanNumeral("VIII")).toBe(8);
        expect(parseRomanNumeral("XI")).toBe(11);
        expect(parseRomanNumeral("XII")).toBe(12);
        expect(parseRomanNumeral("XIII")).toBe(13);
    });

    test('larger additions', () => {
        expect(parseRomanNumeral("LX")).toBe(60);
        expect(parseRomanNumeral("LXX")).toBe(70);
        expect(parseRomanNumeral("LXXX")).toBe(80);
        expect(parseRomanNumeral("CX")).toBe(110);
        expect(parseRomanNumeral("CXX")).toBe(120);
    });

    test('mixed symbols', () => {
        expect(parseRomanNumeral("LVIII")).toBe(58);
        expect(parseRomanNumeral("DCCC")).toBe(800);
        expect(parseRomanNumeral("MDC")).toBe(1600);
    });
});

describe('parseRomanNumeral - numbers 1-20', () => {
    test('1-10', () => {
        expect(parseRomanNumeral("I")).toBe(1);
        expect(parseRomanNumeral("II")).toBe(2);
        expect(parseRomanNumeral("III")).toBe(3);
        expect(parseRomanNumeral("IV")).toBe(4);
        expect(parseRomanNumeral("V")).toBe(5);
        expect(parseRomanNumeral("VI")).toBe(6);
        expect(parseRomanNumeral("VII")).toBe(7);
        expect(parseRomanNumeral("VIII")).toBe(8);
        expect(parseRomanNumeral("IX")).toBe(9);
        expect(parseRomanNumeral("X")).toBe(10);
    });

    test('11-20', () => {
        expect(parseRomanNumeral("XI")).toBe(11);
        expect(parseRomanNumeral("XII")).toBe(12);
        expect(parseRomanNumeral("XIII")).toBe(13);
        expect(parseRomanNumeral("XIV")).toBe(14);
        expect(parseRomanNumeral("XV")).toBe(15);
        expect(parseRomanNumeral("XVI")).toBe(16);
        expect(parseRomanNumeral("XVII")).toBe(17);
        expect(parseRomanNumeral("XVIII")).toBe(18);
        expect(parseRomanNumeral("XIX")).toBe(19);
        expect(parseRomanNumeral("XX")).toBe(20);
    });
});

describe('parseRomanNumeral - tens', () => {
    test('multiples of 10', () => {
        expect(parseRomanNumeral("X")).toBe(10);
        expect(parseRomanNumeral("XX")).toBe(20);
        expect(parseRomanNumeral("XXX")).toBe(30);
        expect(parseRomanNumeral("XL")).toBe(40);
        expect(parseRomanNumeral("L")).toBe(50);
        expect(parseRomanNumeral("LX")).toBe(60);
        expect(parseRomanNumeral("LXX")).toBe(70);
        expect(parseRomanNumeral("LXXX")).toBe(80);
        expect(parseRomanNumeral("XC")).toBe(90);
    });

    test('compound tens', () => {
        expect(parseRomanNumeral("XXI")).toBe(21);
        expect(parseRomanNumeral("XXXV")).toBe(35);
        expect(parseRomanNumeral("XLIV")).toBe(44);
        expect(parseRomanNumeral("LIX")).toBe(59);
        expect(parseRomanNumeral("LXXVIII")).toBe(78);
        expect(parseRomanNumeral("XCIX")).toBe(99);
    });
});

describe('parseRomanNumeral - hundreds', () => {
    test('multiples of 100', () => {
        expect(parseRomanNumeral("C")).toBe(100);
        expect(parseRomanNumeral("CC")).toBe(200);
        expect(parseRomanNumeral("CCC")).toBe(300);
        expect(parseRomanNumeral("CD")).toBe(400);
        expect(parseRomanNumeral("D")).toBe(500);
        expect(parseRomanNumeral("DC")).toBe(600);
        expect(parseRomanNumeral("DCC")).toBe(700);
        expect(parseRomanNumeral("DCCC")).toBe(800);
        expect(parseRomanNumeral("CM")).toBe(900);
    });

    test('compound hundreds', () => {
        expect(parseRomanNumeral("CXXIII")).toBe(123);
        expect(parseRomanNumeral("CCXLV")).toBe(245);
        expect(parseRomanNumeral("CDLXVII")).toBe(467);
        expect(parseRomanNumeral("DLXXXIX")).toBe(589);
        expect(parseRomanNumeral("DCCXLII")).toBe(742);
        expect(parseRomanNumeral("CMXCIX")).toBe(999);
    });
});

describe('parseRomanNumeral - thousands', () => {
    test('multiples of 1000', () => {
        expect(parseRomanNumeral("M")).toBe(1000);
        expect(parseRomanNumeral("MM")).toBe(2000);
        expect(parseRomanNumeral("MMM")).toBe(3000);
    });

    test('compound thousands', () => {
        expect(parseRomanNumeral("MCD")).toBe(1400);
        expect(parseRomanNumeral("MDCLXVI")).toBe(1666);
        expect(parseRomanNumeral("MCMXC")).toBe(1990);
        expect(parseRomanNumeral("MCMXCIV")).toBe(1994);
        expect(parseRomanNumeral("MM")).toBe(2000);
        expect(parseRomanNumeral("MMXXI")).toBe(2021);
        expect(parseRomanNumeral("MMXXIII")).toBe(2023);
        expect(parseRomanNumeral("MMXXIV")).toBe(2024);
    });
});

describe('parseRomanNumeral - special numbers', () => {
    test('years', () => {
        expect(parseRomanNumeral("MCMXC")).toBe(1990);
        expect(parseRomanNumeral("MM")).toBe(2000);
        expect(parseRomanNumeral("MMXXV")).toBe(2025);
    });

    test('historical years', () => {
        expect(parseRomanNumeral("MDCCLXXVI")).toBe(1776);
        expect(parseRomanNumeral("MCMXIV")).toBe(1914);
        expect(parseRomanNumeral("MCMXLV")).toBe(1945);
    });

    test('common numbers', () => {
        expect(parseRomanNumeral("L")).toBe(50);
        expect(parseRomanNumeral("C")).toBe(100);
        expect(parseRomanNumeral("D")).toBe(500);
        expect(parseRomanNumeral("M")).toBe(1000);
    });
});

describe('parseRomanNumeral - edge cases', () => {
    test('smallest numbers', () => {
        expect(parseRomanNumeral("I")).toBe(1);
        expect(parseRomanNumeral("II")).toBe(2);
        expect(parseRomanNumeral("III")).toBe(3);
    });

    test('numbers with all subtraction', () => {
        expect(parseRomanNumeral("IV")).toBe(4);
        expect(parseRomanNumeral("IX")).toBe(9);
        expect(parseRomanNumeral("XL")).toBe(40);
        expect(parseRomanNumeral("XC")).toBe(90);
        expect(parseRomanNumeral("CD")).toBe(400);
        expect(parseRomanNumeral("CM")).toBe(900);
    });

    test('long numerals', () => {
        expect(parseRomanNumeral("MMMDCCCLXXXVIII")).toBe(3888);
        expect(parseRomanNumeral("MMMCMXCIX")).toBe(3999);
    });
});

describe('parseRomanNumeral - complex patterns', () => {
    test('multiple subtractions in sequence', () => {
        expect(parseRomanNumeral("CDXLIV")).toBe(444);
        expect(parseRomanNumeral("CMXCIV")).toBe(994);
    });

    test('alternating add and subtract', () => {
        expect(parseRomanNumeral("MCMIV")).toBe(1904);
        expect(parseRomanNumeral("MCMXL")).toBe(1940);
        expect(parseRomanNumeral("MCMXC")).toBe(1990);
    });

    test('all symbols used', () => {
        expect(parseRomanNumeral("MDCLXVI")).toBe(1666);
    });

    test('repeated patterns', () => {
        expect(parseRomanNumeral("XIII")).toBe(13);
        expect(parseRomanNumeral("XXIII")).toBe(23);
        expect(parseRomanNumeral("XXXIII")).toBe(33);
    });
});

describe('parseRomanNumeral - return value validation', () => {
    test('returns number', () => {
        expect(typeof parseRomanNumeral("X")).toBe("number");
        expect(typeof parseRomanNumeral("IV")).toBe("number");
        expect(typeof parseRomanNumeral("MMXXV")).toBe("number");
    });

    test('returns positive integer', () => {
        expect(parseRomanNumeral("I")).toBeGreaterThan(0);
        expect(parseRomanNumeral("V")).toBeGreaterThan(0);
        expect(parseRomanNumeral("M")).toBeGreaterThan(0);
        expect(Number.isInteger(parseRomanNumeral("X"))).toBe(true);
    });
});

describe('parseRomanNumeral - systematic coverage', () => {
    test('40s', () => {
        expect(parseRomanNumeral("XL")).toBe(40);
        expect(parseRomanNumeral("XLI")).toBe(41);
        expect(parseRomanNumeral("XLII")).toBe(42);
        expect(parseRomanNumeral("XLIII")).toBe(43);
        expect(parseRomanNumeral("XLIV")).toBe(44);
        expect(parseRomanNumeral("XLV")).toBe(45);
    });

    test('90s', () => {
        expect(parseRomanNumeral("XC")).toBe(90);
        expect(parseRomanNumeral("XCI")).toBe(91);
        expect(parseRomanNumeral("XCII")).toBe(92);
        expect(parseRomanNumeral("XCIII")).toBe(93);
        expect(parseRomanNumeral("XCIV")).toBe(94);
        expect(parseRomanNumeral("XCV")).toBe(95);
    });

    test('400s', () => {
        expect(parseRomanNumeral("CD")).toBe(400);
        expect(parseRomanNumeral("CDI")).toBe(401);
        expect(parseRomanNumeral("CDII")).toBe(402);
        expect(parseRomanNumeral("CDX")).toBe(410);
        expect(parseRomanNumeral("CDXX")).toBe(420);
    });

    test('900s', () => {
        expect(parseRomanNumeral("CM")).toBe(900);
        expect(parseRomanNumeral("CMI")).toBe(901);
        expect(parseRomanNumeral("CMX")).toBe(910);
        expect(parseRomanNumeral("CMXX")).toBe(920);
        expect(parseRomanNumeral("CMXC")).toBe(990);
    });
});

describe('buildAcronym - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(buildAcronym("Search Engine Optimization")).toBe("SEO");
        expect(buildAcronym("Frequently Asked Questions")).toBe("FAQ");
        expect(buildAcronym("National Aeronautics and Space Administration")).toBe("NASA");
        expect(buildAcronym("Federal Bureau of Investigation")).toBe("FBI");
        expect(buildAcronym("For your information")).toBe("FYI");
        expect(buildAcronym("By the way")).toBe("BTW");
        expect(buildAcronym("An unstoppable herd of waddling penguins overtakes the icy mountains and sings happily")).toBe("AUHWPOTIMSH");
    });

    test('simple phrases', () => {
        expect(buildAcronym("Hello World")).toBe("HW");
        expect(buildAcronym("Test Driven Development")).toBe("TDD");
        expect(buildAcronym("Object Oriented Programming")).toBe("OOP");
    });

    test('two words', () => {
        expect(buildAcronym("Web Development")).toBe("WD");
        expect(buildAcronym("Machine Learning")).toBe("ML");
        expect(buildAcronym("Artificial Intelligence")).toBe("AI");
    });

    test('single word', () => {
        expect(buildAcronym("Hello")).toBe("H");
        expect(buildAcronym("Test")).toBe("T");
        expect(buildAcronym("Programming")).toBe("P");
    });
});

describe('buildAcronym - skip words', () => {
    test('skips "and" in middle', () => {
        expect(buildAcronym("Rock and Roll")).toBe("RR");
        expect(buildAcronym("Salt and Pepper")).toBe("SP");
        expect(buildAcronym("Trial and Error")).toBe("TE");
    });

    test('skips "of" in middle', () => {
        expect(buildAcronym("House of Cards")).toBe("HC");
        expect(buildAcronym("Game of Thrones")).toBe("GT");
        expect(buildAcronym("Department of Defense")).toBe("DD");
    });

    test('skips "a" in middle', () => {
        expect(buildAcronym("Once a Day")).toBe("OD");
        expect(buildAcronym("Take a Break")).toBe("TB");
        expect(buildAcronym("Make a Wish")).toBe("MW");
    });

    test('skips "an" in middle', () => {
        expect(buildAcronym("Write an Email")).toBe("WE");
        expect(buildAcronym("Send an Invoice")).toBe("SI");
        expect(buildAcronym("Create an Account")).toBe("CA");
    });

    test('skips "for" in middle', () => {
        expect(buildAcronym("Room for Rent")).toBe("RR");
        expect(buildAcronym("Time for Tea")).toBe("TT");
        expect(buildAcronym("Space for Storage")).toBe("SS");
    });

    test('skips "by" in middle', () => {
        expect(buildAcronym("Step by Step")).toBe("SS");
        expect(buildAcronym("Day by Day")).toBe("DD");
        expect(buildAcronym("Side by Side")).toBe("SS");
    });
});

describe('buildAcronym - skip words at start', () => {
    test('keeps "For" at start', () => {
        expect(buildAcronym("For your information")).toBe("FYI");
        expect(buildAcronym("For the win")).toBe("FTW");
        expect(buildAcronym("For better results")).toBe("FBR");
    });

    test('keeps "By" at start', () => {
        expect(buildAcronym("By the way")).toBe("BTW");
        expect(buildAcronym("By the book")).toBe("BTB");
        expect(buildAcronym("By the numbers")).toBe("BTN");
    });

    test('keeps "An" at start', () => {
        expect(buildAcronym("An interesting story")).toBe("AIS");
        expect(buildAcronym("An amazing journey")).toBe("AAJ");
        expect(buildAcronym("An excellent example")).toBe("AEE");
    });

    test('keeps "A" at start', () => {
        expect(buildAcronym("A new beginning")).toBe("ANB");
        expect(buildAcronym("A beautiful day")).toBe("ABD");
        expect(buildAcronym("A great opportunity")).toBe("AGO");
    });

    test('keeps "And" at start', () => {
        expect(buildAcronym("And then some")).toBe("ATS");
        expect(buildAcronym("And so forth")).toBe("ASF");
    });

    test('keeps "Of" at start', () => {
        expect(buildAcronym("Of course not")).toBe("OCN");
        expect(buildAcronym("Of mice and men")).toBe("OMM");
    });
});

describe('buildAcronym - multiple skip words', () => {
    test('multiple skip words', () => {
        expect(buildAcronym("Lord of the Rings")).toBe("LTR");
        expect(buildAcronym("Beauty and the Beast")).toBe("BTB");
        expect(buildAcronym("Jack and Jill")).toBe("JJ");
    });

    test('consecutive skip words', () => {
        expect(buildAcronym("National Aeronautics and Space Administration")).toBe("NASA");
        expect(buildAcronym("Research and Development")).toBe("RD");
    });

    test('all skip words except first', () => {
        expect(buildAcronym("For a by and of")).toBe("F");
        expect(buildAcronym("A for by and of")).toBe("A");
    });
});

describe('buildAcronym - capitalization', () => {
    test('lowercase input', () => {
        expect(buildAcronym("hello world")).toBe("HW");
        expect(buildAcronym("test driven development")).toBe("TDD");
        expect(buildAcronym("frequently asked questions")).toBe("FAQ");
    });

    test('uppercase input', () => {
        expect(buildAcronym("HELLO WORLD")).toBe("HW");
        expect(buildAcronym("TEST DRIVEN DEVELOPMENT")).toBe("TDD");
    });

    test('mixed case input', () => {
        expect(buildAcronym("HeLLo WoRLd")).toBe("HW");
        expect(buildAcronym("TeSt DrIvEn DeVeLoPmEnT")).toBe("TDD");
    });

    test('returns uppercase', () => {
        expect(buildAcronym("hello world")).toBe("HW");
        expect(buildAcronym("HELLO WORLD")).toBe("HW");
        expect(buildAcronym("Hello World")).toBe("HW");
    });
});

describe('buildAcronym - no spaces in output', () => {
    test('returns no spaces', () => {
        expect(buildAcronym("Hello World")).not.toContain(" ");
        expect(buildAcronym("Test Driven Development")).not.toContain(" ");
        expect(buildAcronym("Search Engine Optimization")).not.toContain(" ");
    });

    test('multiple words no spaces', () => {
        expect(buildAcronym("One Two Three Four Five")).toBe("OTTFF");
        expect(buildAcronym("A B C D E F")).toBe("ABCDEF");
    });
});

describe('buildAcronym - common acronyms', () => {
    test('technology acronyms', () => {
        expect(buildAcronym("Hypertext Markup Language")).toBe("HML");
        expect(buildAcronym("Cascading Style Sheets")).toBe("CSS");
        expect(buildAcronym("Application Programming Interface")).toBe("API");
        expect(buildAcronym("Uniform Resource Locator")).toBe("URL");
    });

    test('business acronyms', () => {
        expect(buildAcronym("Chief Executive Officer")).toBe("CEO");
        expect(buildAcronym("Chief Technology Officer")).toBe("CTO");
        expect(buildAcronym("Return on Investment")).toBe("ROI");
    });

    test('government acronyms', () => {
        expect(buildAcronym("Federal Bureau of Investigation")).toBe("FBI");
        expect(buildAcronym("Central Intelligence Agency")).toBe("CIA");
        expect(buildAcronym("Internal Revenue Service")).toBe("IRS");
    });
});

describe('buildAcronym - order preservation', () => {
    test('maintains order', () => {
        expect(buildAcronym("First Second Third")).toBe("FST");
        expect(buildAcronym("Alpha Beta Gamma")).toBe("ABG");
        expect(buildAcronym("One Two Three")).toBe("OTT");
    });

    test('maintains order with skip words', () => {
        expect(buildAcronym("First and Second")).toBe("FS");
        expect(buildAcronym("Alpha of Beta")).toBe("AB");
        expect(buildAcronym("One by Two")).toBe("OT");
    });
});

describe('buildAcronym - edge cases', () => {
    test('many words', () => {
        expect(buildAcronym("One Two Three Four Five Six Seven")).toBe("OTTFFSS");
        expect(buildAcronym("This is a very long phrase with many words")).toBe("TIVLPWMW");
    });

    test('all single letter words', () => {
        expect(buildAcronym("I O U")).toBe("IOU");
        expect(buildAcronym("A B C")).toBe("ABC");
    });

    test('alternating skip and keep', () => {
        expect(buildAcronym("Test and Code and Debug")).toBe("TCD");
        expect(buildAcronym("Read and Write and Execute")).toBe("RWE");
    });
});

describe('buildAcronym - real world examples', () => {
    test('organizations', () => {
        expect(buildAcronym("World Health Organization")).toBe("WHO");
        expect(buildAcronym("United Nations")).toBe("UN");
        expect(buildAcronym("North Atlantic Treaty Organization")).toBe("NATO");
    });

    test('phrases', () => {
        expect(buildAcronym("As soon as possible")).toBe("ASAP");
        expect(buildAcronym("Laugh out loud")).toBe("LOL");
        expect(buildAcronym("In my opinion")).toBe("IMO");
    });

    test('technical terms', () => {
        expect(buildAcronym("Random Access Memory")).toBe("RAM");
        expect(buildAcronym("Central Processing Unit")).toBe("CPU");
        expect(buildAcronym("Graphics Processing Unit")).toBe("GPU");
    });
});

describe('buildAcronym - return value validation', () => {
    test('returns string', () => {
        expect(typeof buildAcronym("Hello World")).toBe("string");
        expect(typeof buildAcronym("Test")).toBe("string");
    });

    test('returns uppercase letters only', () => {
        const result = buildAcronym("hello world test");
        expect(result).toMatch(/^[A-Z]+$/);
    });

    test('returns non-empty for non-empty input', () => {
        expect(buildAcronym("Hello").length).toBeGreaterThan(0);
        expect(buildAcronym("Test Code").length).toBeGreaterThan(0);
    });
});

describe('buildAcronym - case sensitivity of skip words', () => {
    test('skips "And" with capital A', () => {
        expect(buildAcronym("Rock And Roll")).toBe("RR");
        expect(buildAcronym("Salt And Pepper")).toBe("SP");
    });

    test('skips "OF" with capitals', () => {
        expect(buildAcronym("House OF Cards")).toBe("HC");
        expect(buildAcronym("Game OF Thrones")).toBe("GT");
    });

    test('skips mixed case skip words', () => {
        expect(buildAcronym("Test AnD Code")).toBe("TC");
        expect(buildAcronym("Read oF Write")).toBe("RW");
    });
});

describe('buildAcronym - complex scenarios', () => {
    test('long technical phrases', () => {
        expect(buildAcronym("Transmission Control Protocol Internet Protocol")).toBe("TCPIP");
        expect(buildAcronym("Structured Query Language")).toBe("SQL");
    });

    test('phrases with multiple of same skip word', () => {
        expect(buildAcronym("King of the Queen of the Castle")).toBe("KTQTC");
        expect(buildAcronym("One and Two and Three")).toBe("OTT");
    });

    test('mixed skip words throughout', () => {
        expect(buildAcronym("Department of Motor Vehicles and Transportation")).toBe("DMVT");
        expect(buildAcronym("Ministry for Education and Training")).toBe("MET");
    });
});

describe('allUnique - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(allUnique("abc")).toBe(true);
        expect(allUnique("aA")).toBe(true);
        expect(allUnique("QwErTy123!@")).toBe(true);
        expect(allUnique("~!@#$%^&*()_+")).toBe(true);
        expect(allUnique("hello")).toBe(false);
        expect(allUnique("freeCodeCamp")).toBe(false);
        expect(allUnique("!@#*$%^&*()aA")).toBe(false);
    });

    test('all unique lowercase', () => {
        expect(allUnique("abc")).toBe(true);
        expect(allUnique("xyz")).toBe(true);
        expect(allUnique("abcdefghijklmnopqrstuvwxyz")).toBe(true);
    });

    test('all unique uppercase', () => {
        expect(allUnique("ABC")).toBe(true);
        expect(allUnique("XYZ")).toBe(true);
        expect(allUnique("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe(true);
    });

    test('repeated lowercase', () => {
        expect(allUnique("aa")).toBe(false);
        expect(allUnique("hello")).toBe(false);
        expect(allUnique("book")).toBe(false);
    });

    test('repeated uppercase', () => {
        expect(allUnique("AA")).toBe(false);
        expect(allUnique("HELLO")).toBe(false);
        expect(allUnique("BOOK")).toBe(false);
    });
});

describe('allUnique - case sensitivity', () => {
    test('uppercase and lowercase are different', () => {
        expect(allUnique("aA")).toBe(true);
        expect(allUnique("Aa")).toBe(true);
        expect(allUnique("AaBbCc")).toBe(true);
        expect(allUnique("XxYyZz")).toBe(true);
    });

    test('mixed case unique', () => {
        expect(allUnique("AbCdEf")).toBe(true);
        expect(allUnique("QwErTy")).toBe(true);
        expect(allUnique("MnOpQr")).toBe(true);
    });

    test('mixed case with duplicates', () => {
        expect(allUnique("AaBbAa")).toBe(false);
        expect(allUnique("Hello")).toBe(false);
        expect(allUnique("Password")).toBe(false);
    });
});

describe('allUnique - numbers', () => {
    test('unique numbers', () => {
        expect(allUnique("123")).toBe(true);
        expect(allUnique("1234567890")).toBe(true);
        expect(allUnique("0987654321")).toBe(true);
    });

    test('repeated numbers', () => {
        expect(allUnique("111")).toBe(false);
        expect(allUnique("1223")).toBe(false);
        expect(allUnique("1001")).toBe(false);
    });

    test('letters and numbers unique', () => {
        expect(allUnique("abc123")).toBe(true);
        expect(allUnique("xyz789")).toBe(true);
        expect(allUnique("QwErTy123")).toBe(true);
    });

    test('letters and numbers with duplicates', () => {
        expect(allUnique("abc123abc")).toBe(false);
        expect(allUnique("xyz789x")).toBe(false);
        expect(allUnique("test123t")).toBe(false);
    });
});

describe('allUnique - special characters', () => {
    test('unique special characters', () => {
        expect(allUnique("!@#$%^&*()")).toBe(true);
        expect(allUnique("~!@#$%^&*()_+")).toBe(true);
        expect(allUnique("-=[]\\;',./")).toBe(true);
    });

    test('repeated special characters', () => {
        expect(allUnique("!!")).toBe(false);
        expect(allUnique("##")).toBe(false);
        expect(allUnique("!@#*$%^&*()aA")).toBe(false);
    });

    test('mixed with special characters unique', () => {
        expect(allUnique("abc!@#")).toBe(true);
        expect(allUnique("QwErTy123!@")).toBe(true);
        expect(allUnique("xyz123!@#")).toBe(true);
    });

    test('mixed with special characters duplicates', () => {
        expect(allUnique("abc!@#!")).toBe(false);
        expect(allUnique("test!!123")).toBe(false);
        expect(allUnique("hello@world@")).toBe(false);
    });
});

describe('allUnique - empty and single character', () => {
    test('empty string', () => {
        expect(allUnique("")).toBe(true);
    });

    test('single character', () => {
        expect(allUnique("a")).toBe(true);
        expect(allUnique("Z")).toBe(true);
        expect(allUnique("5")).toBe(true);
        expect(allUnique("!")).toBe(true);
    });

    test('two different characters', () => {
        expect(allUnique("ab")).toBe(true);
        expect(allUnique("12")).toBe(true);
        expect(allUnique("!@")).toBe(true);
    });

    test('two same characters', () => {
        expect(allUnique("aa")).toBe(false);
        expect(allUnique("11")).toBe(false);
        expect(allUnique("!!")).toBe(false);
    });
});

describe('allUnique - position of duplicates', () => {
    test('duplicate at start', () => {
        expect(allUnique("aabcd")).toBe(false);
        expect(allUnique("bbxyz")).toBe(false);
    });

    test('duplicate in middle', () => {
        expect(allUnique("abcadef")).toBe(false);
        expect(allUnique("xyzxabc")).toBe(false);
    });

    test('duplicate at end', () => {
        expect(allUnique("abcdaa")).toBe(false);
        expect(allUnique("xyzbb")).toBe(false);
    });

    test('multiple duplicates', () => {
        expect(allUnique("aabbcc")).toBe(false);
        expect(allUnique("abcabc")).toBe(false);
        expect(allUnique("hello")).toBe(false);
    });
});

describe('allUnique - long strings', () => {
    test('long unique string', () => {
        expect(allUnique("abcdefghijklmnopqrstuvwxyz")).toBe(true);
        expect(allUnique("ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toBe(true);
        expect(allUnique("1234567890")).toBe(true);
    });

    test('long string with duplicate', () => {
        expect(allUnique("abcdefghijklmnopqrstuvwxyza")).toBe(false);
        expect(allUnique("ABCDEFGHIJKLMNOPQRSTUVWXYZA")).toBe(false);
        expect(allUnique("12345678901")).toBe(false);
    });

    test('alphabet and numbers', () => {
        expect(allUnique("abcdefghijklmnopqrstuvwxyz0123456789")).toBe(true);
    });
});

describe('allUnique - common words', () => {
    test('unique common words', () => {
        expect(allUnique("the")).toBe(true);
        expect(allUnique("cat")).toBe(true);
        expect(allUnique("dog")).toBe(true);
    });

    test('non-unique common words', () => {
        expect(allUnique("hello")).toBe(false);
        expect(allUnique("week")).toBe(false);
        expect(allUnique("book")).toBe(false);
        expect(allUnique("letter")).toBe(false);
    });
});

describe('allUnique - return value validation', () => {
    test('returns boolean', () => {
        expect(typeof allUnique("abc")).toBe("boolean");
        expect(typeof allUnique("hello")).toBe("boolean");
        expect(typeof allUnique("")).toBe("boolean");
    });

    test('returns true for unique', () => {
        expect(allUnique("abc")).toBe(true);
        expect(allUnique("xyz")).toBe(true);
        expect(allUnique("123")).toBe(true);
    });

    test('returns false for duplicates', () => {
        expect(allUnique("hello")).toBe(false);
        expect(allUnique("aaa")).toBe(false);
        expect(allUnique("1223")).toBe(false);
    });
});

describe('allUnique - alphanumeric combinations', () => {
    test('unique alphanumeric', () => {
        expect(allUnique("a1b2c3")).toBe(true);
        expect(allUnique("Test123")).toBe(true);
        expect(allUnique("abc123XYZ")).toBe(true);
    });

    test('duplicate alphanumeric', () => {
        expect(allUnique("a1b2c3a")).toBe(false);
        expect(allUnique("Test123T")).toBe(false);
        expect(allUnique("abc123abc")).toBe(false);
    });
});

describe('allUnique - spaces and whitespace', () => {
    test('with spaces unique', () => {
        expect(allUnique(" abc")).toBe(true);
        expect(allUnique("ab c")).toBe(true);
    });

    test('with duplicate spaces', () => {
        expect(allUnique("  ")).toBe(false);
        expect(allUnique(" a b  ")).toBe(false);
        expect(allUnique("hello world")).toBe(false);
    });
});

describe('allUnique - edge cases', () => {
    test('all same character', () => {
        expect(allUnique("aaa")).toBe(false);
        expect(allUnique("111")).toBe(false);
        expect(allUnique("!!!")).toBe(false);
    });

    test('palindromes', () => {
        expect(allUnique("racecar")).toBe(false);
        expect(allUnique("level")).toBe(false);
        expect(allUnique("noon")).toBe(false);
    });

    test('alternating characters', () => {
        expect(allUnique("aba")).toBe(false);
        expect(allUnique("121")).toBe(false);
        expect(allUnique("abab")).toBe(false);
    });
});

describe('allUnique - real world strings', () => {
    test('usernames', () => {
        expect(allUnique("user123")).toBe(true);
        expect(allUnique("support")).toBe(false);
        expect(allUnique("test_user")).toBe(false);
    });

    test('passwords', () => {
        expect(allUnique("P@ssw0rd")).toBe(false);
        expect(allUnique("Qwerty123!")).toBe(true);
        expect(allUnique("MyP@ss123")).toBe(false);
    });

    test('codes', () => {
        expect(allUnique("ABC123XYZ")).toBe(true);
        expect(allUnique("PASS1234")).toBe(false);
        expect(allUnique("freeCodeCamp")).toBe(false);
    });
});

describe('allUnique - systematic testing', () => {
    test('increasing length unique', () => {
        expect(allUnique("a")).toBe(true);
        expect(allUnique("ab")).toBe(true);
        expect(allUnique("abc")).toBe(true);
        expect(allUnique("abcd")).toBe(true);
        expect(allUnique("abcde")).toBe(true);
    });

    test('increasing length with duplicates', () => {
        expect(allUnique("aa")).toBe(false);
        expect(allUnique("aba")).toBe(false);
        expect(allUnique("abca")).toBe(false);
        expect(allUnique("abcda")).toBe(false);
    });

    test('different character types', () => {
        expect(allUnique("abc")).toBe(true);
        expect(allUnique("ABC")).toBe(true);
        expect(allUnique("123")).toBe(true);
        expect(allUnique("!@#")).toBe(true);
        expect(allUnique("aA1!")).toBe(true);
    });
});

describe('arrayDiff - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(arrayDiff(["apple", "banana"], ["apple", "banana", "cherry"])).toEqual(["cherry"]);
        expect(arrayDiff(["apple", "banana", "cherry"], ["apple", "banana"])).toEqual(["cherry"]);
        expect(arrayDiff(["one", "two", "three", "four", "six"], ["one", "three", "eight"])).toEqual(["eight", "four", "six", "two"]);
        expect(arrayDiff(["two", "four", "five", "eight"], ["one", "two", "three", "four", "seven", "eight"])).toEqual(["five", "one", "seven", "three"]);
        expect(arrayDiff(["I", "like", "freeCodeCamp"], ["I", "like", "rocks"])).toEqual(["freeCodeCamp", "rocks"]);
    });

    test('first array has extra', () => {
        expect(arrayDiff(["a", "b", "c"], ["a", "b"])).toEqual(["c"]);
        expect(arrayDiff(["x", "y", "z"], ["x", "y"])).toEqual(["z"]);
        expect(arrayDiff(["1", "2", "3"], ["1", "2"])).toEqual(["3"]);
    });

    test('second array has extra', () => {
        expect(arrayDiff(["a", "b"], ["a", "b", "c"])).toEqual(["c"]);
        expect(arrayDiff(["x", "y"], ["x", "y", "z"])).toEqual(["z"]);
        expect(arrayDiff(["1", "2"], ["1", "2", "3"])).toEqual(["3"]);
    });

    test('both arrays have unique elements', () => {
        expect(arrayDiff(["a", "b"], ["c", "d"])).toEqual(["a", "b", "c", "d"]);
        expect(arrayDiff(["x", "y"], ["p", "q"])).toEqual(["p", "q", "x", "y"]);
    });
});

describe('arrayDiff - empty arrays', () => {
    test('both arrays empty', () => {
        expect(arrayDiff([], [])).toEqual([]);
    });

    test('first array empty', () => {
        expect(arrayDiff([], ["a", "b", "c"])).toEqual(["a", "b", "c"]);
        expect(arrayDiff([], ["x", "y"])).toEqual(["x", "y"]);
    });

    test('second array empty', () => {
        expect(arrayDiff(["a", "b", "c"], [])).toEqual(["a", "b", "c"]);
        expect(arrayDiff(["x", "y"], [])).toEqual(["x", "y"]);
    });
});

describe('arrayDiff - identical arrays', () => {
    test('same elements', () => {
        expect(arrayDiff(["a", "b"], ["a", "b"])).toEqual([]);
        expect(arrayDiff(["x", "y", "z"], ["x", "y", "z"])).toEqual([]);
        expect(arrayDiff(["1", "2", "3"], ["1", "2", "3"])).toEqual([]);
    });

    test('same elements different order', () => {
        expect(arrayDiff(["a", "b", "c"], ["c", "b", "a"])).toEqual([]);
        expect(arrayDiff(["x", "y", "z"], ["z", "x", "y"])).toEqual([]);
    });
});

describe('arrayDiff - alphabetical sorting', () => {
    test('returns sorted result', () => {
        expect(arrayDiff(["z", "a"], ["m"])).toEqual(["a", "m", "z"]);
        expect(arrayDiff(["dog", "cat"], ["bird"])).toEqual(["bird", "cat", "dog"]);
        expect(arrayDiff(["banana", "apple"], ["cherry"])).toEqual(["apple", "banana", "cherry"]);
    });

    test('maintains alphabetical order', () => {
        const result = arrayDiff(["one", "two", "three"], ["four", "five"]);
        expect(result).toEqual(["five", "four", "one", "three", "two"]);
        for (let i = 0; i < result.length - 1; i++) {
            expect(result[i].localeCompare(result[i + 1])).toBeLessThanOrEqual(0);
        }
    });
});

describe('arrayDiff - single elements', () => {
    test('single element in each array - different', () => {
        expect(arrayDiff(["a"], ["b"])).toEqual(["a", "b"]);
        expect(arrayDiff(["x"], ["y"])).toEqual(["x", "y"]);
    });

    test('single element in each array - same', () => {
        expect(arrayDiff(["a"], ["a"])).toEqual([]);
        expect(arrayDiff(["x"], ["x"])).toEqual([]);
    });

    test('single element vs multiple', () => {
        expect(arrayDiff(["a"], ["a", "b", "c"])).toEqual(["b", "c"]);
        expect(arrayDiff(["a", "b", "c"], ["a"])).toEqual(["b", "c"]);
    });
});

describe('arrayDiff - no common elements', () => {
    test('completely different arrays', () => {
        expect(arrayDiff(["a", "b", "c"], ["x", "y", "z"])).toEqual(["a", "b", "c", "x", "y", "z"]);
        expect(arrayDiff(["dog", "cat"], ["bird", "fish"])).toEqual(["bird", "cat", "dog", "fish"]);
    });

    test('numbers as strings', () => {
        expect(arrayDiff(["1", "2", "3"], ["4", "5", "6"])).toEqual(["1", "2", "3", "4", "5", "6"]);
    });
});

describe('arrayDiff - partial overlap', () => {
    test('some common elements', () => {
        expect(arrayDiff(["a", "b", "c"], ["b", "c", "d"])).toEqual(["a", "d"]);
        expect(arrayDiff(["one", "two", "three"], ["two", "three", "four"])).toEqual(["four", "one"]);
    });

    test('one common element', () => {
        expect(arrayDiff(["a", "b"], ["b", "c"])).toEqual(["a", "c"]);
        expect(arrayDiff(["x", "y", "z"], ["y", "p", "q"])).toEqual(["p", "q", "x", "z"]);
    });
});

describe('arrayDiff - duplicates in input', () => {
    test('duplicates in first array', () => {
        expect(arrayDiff(["a", "a", "b"], ["b"])).toEqual(["a"]);
        expect(arrayDiff(["x", "x", "x", "y"], ["y"])).toEqual(["x"]);
    });

    test('duplicates in second array', () => {
        expect(arrayDiff(["a"], ["a", "b", "b"])).toEqual(["b"]);
        expect(arrayDiff(["x"], ["x", "y", "y"])).toEqual(["y"]);
    });

    test('duplicates in both arrays', () => {
        expect(arrayDiff(["a", "a", "b"], ["b", "b", "c"])).toEqual(["a", "c"]);
        expect(arrayDiff(["x", "x", "y", "y"], ["y", "z", "z"])).toEqual(["x", "z"]);
    });
});

describe('arrayDiff - different array sizes', () => {
    test('first array much larger', () => {
        expect(arrayDiff(["a", "b", "c", "d", "e"], ["a"])).toEqual(["b", "c", "d", "e"]);
        expect(arrayDiff(["1", "2", "3", "4", "5", "6"], ["1", "2"])).toEqual(["3", "4", "5", "6"]);
    });

    test('second array much larger', () => {
        expect(arrayDiff(["a"], ["a", "b", "c", "d", "e"])).toEqual(["b", "c", "d", "e"]);
        expect(arrayDiff(["1", "2"], ["1", "2", "3", "4", "5", "6"])).toEqual(["3", "4", "5", "6"]);
    });
});

describe('arrayDiff - return value validation', () => {
    test('returns array', () => {
        expect(Array.isArray(arrayDiff(["a"], ["b"]))).toBe(true);
        expect(Array.isArray(arrayDiff([], []))).toBe(true);
    });

    test('returns new array', () => {
        const arr1 = ["a", "b"];
        const arr2 = ["b", "c"];
        const result = arrayDiff(arr1, arr2);
        expect(result).not.toBe(arr1);
        expect(result).not.toBe(arr2);
    });

    test('does not modify input arrays', () => {
        const arr1 = ["a", "b", "c"];
        const arr2 = ["b", "c", "d"];
        const arr1Copy = [...arr1];
        const arr2Copy = [...arr2];
        arrayDiff(arr1, arr2);
        expect(arr1).toEqual(arr1Copy);
        expect(arr2).toEqual(arr2Copy);
    });
});

describe('arrayDiff - word arrays', () => {
    test('fruit names', () => {
        expect(arrayDiff(["apple", "banana"], ["banana", "cherry"])).toEqual(["apple", "cherry"]);
        expect(arrayDiff(["orange", "grape"], ["apple", "orange"])).toEqual(["apple", "grape"]);
    });

    test('animal names', () => {
        expect(arrayDiff(["dog", "cat", "bird"], ["cat", "fish"])).toEqual(["bird", "dog", "fish"]);
        expect(arrayDiff(["lion", "tiger"], ["bear", "tiger"])).toEqual(["bear", "lion"]);
    });

    test('common words', () => {
        expect(arrayDiff(["hello", "world"], ["hello", "goodbye"])).toEqual(["goodbye", "world"]);
        expect(arrayDiff(["yes", "no", "maybe"], ["yes", "no"])).toEqual(["maybe"]);
    });
});

describe('arrayDiff - case sensitivity', () => {
    test('different cases are different', () => {
        expect(arrayDiff(["Apple"], ["apple"])).toEqual(["Apple", "apple"]);
        expect(arrayDiff(["Test"], ["test"])).toEqual(["Test", "test"]);
    });

    test('mixed case arrays', () => {
        expect(arrayDiff(["ABC", "def"], ["abc", "DEF"])).toEqual(["ABC", "DEF", "abc", "def"]);
    });
});

describe('arrayDiff - symmetric difference', () => {
    test('symmetric property', () => {
        const result1 = arrayDiff(["a", "b", "c"], ["b", "c", "d"]);
        const result2 = arrayDiff(["b", "c", "d"], ["a", "b", "c"]);
        expect(result1.sort()).toEqual(result2.sort());
    });

    test('finds elements in either but not both', () => {
        expect(arrayDiff(["a", "b", "c"], ["b", "c", "d"])).toEqual(["a", "d"]);
        expect(arrayDiff(["1", "2", "3"], ["2", "3", "4"])).toEqual(["1", "4"]);
    });
});

describe('arrayDiff - edge cases', () => {
    test('all elements unique in each', () => {
        expect(arrayDiff(["a", "b", "c"], ["d", "e", "f"])).toEqual(["a", "b", "c", "d", "e", "f"]);
    });

    test('one element difference', () => {
        expect(arrayDiff(["a", "b", "c"], ["a", "b", "c", "d"])).toEqual(["d"]);
        expect(arrayDiff(["a", "b", "c", "d"], ["a", "b", "c"])).toEqual(["d"]);
    });

    test('alternating elements', () => {
        expect(arrayDiff(["a", "c", "e"], ["b", "d", "f"])).toEqual(["a", "b", "c", "d", "e", "f"]);
    });
});

describe('arrayDiff - numbers as strings', () => {
    test('numeric strings', () => {
        expect(arrayDiff(["1", "2", "3"], ["2", "3", "4"])).toEqual(["1", "4"]);
        expect(arrayDiff(["10", "20"], ["20", "30"])).toEqual(["10", "30"]);
    });

    test('sorted numerically as strings', () => {
        expect(arrayDiff(["1", "10", "2"], ["2", "20"])).toEqual(["1", "10", "20"]);
    });
});

describe('arrayDiff - special strings', () => {
    test('with spaces', () => {
        expect(arrayDiff(["hello world"], ["goodbye world"])).toEqual(["goodbye world", "hello world"]);
    });

    test('with special characters', () => {
        expect(arrayDiff(["test!", "code@"], ["code@", "debug#"])).toEqual(["debug#", "test!"]);
    });

    test('empty strings', () => {
        expect(arrayDiff(["", "a"], ["a", "b"])).toEqual(["", "b"]);
    });
});

describe('reverseSentence - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(reverseSentence("world hello")).toBe("hello world");
        expect(reverseSentence("push commit git")).toBe("git commit push");
        expect(reverseSentence("npm  install  sudo")).toBe("sudo install npm");
        expect(reverseSentence("import    default   function  export")).toBe("export function default import");
    });

    test('two words', () => {
        expect(reverseSentence("hello world")).toBe("world hello");
        expect(reverseSentence("foo bar")).toBe("bar foo");
        expect(reverseSentence("test code")).toBe("code test");
    });

    test('three words', () => {
        expect(reverseSentence("one two three")).toBe("three two one");
        expect(reverseSentence("apple banana cherry")).toBe("cherry banana apple");
        expect(reverseSentence("red green blue")).toBe("blue green red");
    });

    test('single word', () => {
        expect(reverseSentence("hello")).toBe("hello");
        expect(reverseSentence("test")).toBe("test");
        expect(reverseSentence("word")).toBe("word");
    });
});

describe('reverseSentence - multiple spaces', () => {
    test('double spaces', () => {
        expect(reverseSentence("hello  world")).toBe("world hello");
        expect(reverseSentence("one  two  three")).toBe("three two one");
        expect(reverseSentence("foo  bar  baz")).toBe("baz bar foo");
    });

    test('triple spaces', () => {
        expect(reverseSentence("hello   world")).toBe("world hello");
        expect(reverseSentence("one   two   three")).toBe("three two one");
    });

    test('many spaces', () => {
        expect(reverseSentence("hello     world")).toBe("world hello");
        expect(reverseSentence("a          b")).toBe("b a");
    });

    test('mixed spacing', () => {
        expect(reverseSentence("one  two   three    four")).toBe("four three two one");
        expect(reverseSentence("a b  c   d")).toBe("d c b a");
    });
});

describe('reverseSentence - single space output', () => {
    test('returns single spaces only', () => {
        const result = reverseSentence("hello  world  test");
        expect(result).toBe("test world hello");
        expect(result).not.toContain("  ");
    });

    test('normalizes all spacing', () => {
        expect(reverseSentence("a    b    c")).toBe("c b a");
        expect(reverseSentence("one     two")).toBe("two one");
    });
});

describe('reverseSentence - many words', () => {
    test('four words', () => {
        expect(reverseSentence("one two three four")).toBe("four three two one");
        expect(reverseSentence("apple banana cherry date")).toBe("date cherry banana apple");
    });

    test('five words', () => {
        expect(reverseSentence("one two three four five")).toBe("five four three two one");
        expect(reverseSentence("a b c d e")).toBe("e d c b a");
    });

    test('many words', () => {
        expect(reverseSentence("a b c d e f g h i j")).toBe("j i h g f e d c b a");
    });
});

describe('reverseSentence - word order', () => {
    test('reverses order correctly', () => {
        expect(reverseSentence("first second third")).toBe("third second first");
        expect(reverseSentence("alpha beta gamma")).toBe("gamma beta alpha");
    });

    test('first becomes last', () => {
        const result = reverseSentence("first second third");
        expect(result.split(' ')[result.split(' ').length - 1]).toBe("first");
    });

    test('last becomes first', () => {
        const result = reverseSentence("first second third");
        expect(result.split(' ')[0]).toBe("third");
    });
});

describe('reverseSentence - return value validation', () => {
    test('returns string', () => {
        expect(typeof reverseSentence("hello world")).toBe("string");
        expect(typeof reverseSentence("test")).toBe("string");
    });

    test('returns different string', () => {
        expect(reverseSentence("hello world")).not.toBe("hello world");
        expect(reverseSentence("one two three")).not.toBe("one two three");
    });

    test('single word returns same', () => {
        expect(reverseSentence("hello")).toBe("hello");
        expect(reverseSentence("test")).toBe("test");
    });
});

describe('reverseSentence - technical terms', () => {
    test('programming commands', () => {
        expect(reverseSentence("git add commit")).toBe("commit add git");
        expect(reverseSentence("npm install package")).toBe("package install npm");
        expect(reverseSentence("docker build run")).toBe("run build docker");
    });

    test('programming concepts', () => {
        expect(reverseSentence("function class method")).toBe("method class function");
        expect(reverseSentence("array object string")).toBe("string object array");
    });
});

describe('reverseSentence - numbers and letters', () => {
    test('numbers as words', () => {
        expect(reverseSentence("one two three")).toBe("three two one");
        expect(reverseSentence("first second third")).toBe("third second first");
    });

    test('numeric strings', () => {
        expect(reverseSentence("1 2 3")).toBe("3 2 1");
        expect(reverseSentence("10 20 30")).toBe("30 20 10");
    });

    test('mixed alphanumeric', () => {
        expect(reverseSentence("test1 test2 test3")).toBe("test3 test2 test1");
        expect(reverseSentence("file1 file2")).toBe("file2 file1");
    });
});

describe('reverseSentence - case preservation', () => {
    test('preserves case', () => {
        expect(reverseSentence("Hello World")).toBe("World Hello");
        expect(reverseSentence("FOO BAR")).toBe("BAR FOO");
        expect(reverseSentence("TeSt CoDe")).toBe("CoDe TeSt");
    });

    test('mixed case words', () => {
        expect(reverseSentence("JavaScript Python Ruby")).toBe("Ruby Python JavaScript");
        expect(reverseSentence("CamelCase snake_case kebab-case")).toBe("kebab-case snake_case CamelCase");
    });
});

describe('reverseSentence - special characters', () => {
    test('with punctuation', () => {
        expect(reverseSentence("hello, world!")).toBe("world! hello,");
        expect(reverseSentence("test. code?")).toBe("code? test.");
    });

    test('with symbols', () => {
        expect(reverseSentence("@user #hashtag")).toBe("#hashtag @user");
        expect(reverseSentence("$money &symbol")).toBe("&symbol $money");
    });

    test('with underscores and hyphens', () => {
        expect(reverseSentence("snake_case kebab-case")).toBe("kebab-case snake_case");
        expect(reverseSentence("test_one test-two")).toBe("test-two test_one");
    });
});

describe('reverseSentence - palindrome sentences', () => {
    test('two word palindrome', () => {
        expect(reverseSentence("test test")).toBe("test test");
        expect(reverseSentence("word word")).toBe("word word");
    });

    test('odd number palindrome', () => {
        expect(reverseSentence("a b a")).toBe("a b a");
        expect(reverseSentence("x y x")).toBe("x y x");
    });

    test('even number palindrome', () => {
        expect(reverseSentence("a b b a")).toBe("a b b a");
        expect(reverseSentence("one two two one")).toBe("one two two one");
    });
});

describe('reverseSentence - edge cases', () => {
    test('single character words', () => {
        expect(reverseSentence("a b c")).toBe("c b a");
        expect(reverseSentence("i o u")).toBe("u o i");
    });

    test('very long words', () => {
        expect(reverseSentence("supercalifragilisticexpialidocious antidisestablishmentarianism")).toBe("antidisestablishmentarianism supercalifragilisticexpialidocious");
    });

    test('repeated words', () => {
        expect(reverseSentence("test test test")).toBe("test test test");
        expect(reverseSentence("word word word word")).toBe("word word word word");
    });
});

describe('reverseSentence - real world examples', () => {
    test('sentences', () => {
        expect(reverseSentence("The quick brown fox")).toBe("fox brown quick The");
        expect(reverseSentence("I love coding")).toBe("coding love I");
    });

    test('file paths', () => {
        expect(reverseSentence("home user documents")).toBe("documents user home");
        expect(reverseSentence("src components App")).toBe("App components src");
    });

    test('commands', () => {
        expect(reverseSentence("sudo apt update")).toBe("update apt sudo");
        expect(reverseSentence("git push origin main")).toBe("main origin push git");
    });
});

describe('reverseSentence - symmetry', () => {
    test('double reverse returns original', () => {
        const original = "one two three";
        const reversed = reverseSentence(original);
        const doubleReversed = reverseSentence(reversed);
        expect(doubleReversed).toBe(original);
    });

    test('works with multiple spaces', () => {
        const original = "one  two  three";
        const reversed = reverseSentence(original);
        expect(reversed).toBe("three two one");
        const doubleReversed = reverseSentence(reversed);
        expect(doubleReversed).toBe("one two three");
    });
});

describe('tooMuchScreenTime - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(tooMuchScreenTime([1, 2, 3, 4, 5, 6, 7])).toBe(false);
        expect(tooMuchScreenTime([7, 8, 8, 4, 2, 2, 3])).toBe(false);
        expect(tooMuchScreenTime([5, 6, 6, 6, 6, 6, 6])).toBe(false);
        expect(tooMuchScreenTime([1, 2, 3, 11, 1, 3, 4])).toBe(true);
        expect(tooMuchScreenTime([1, 2, 3, 10, 2, 1, 0])).toBe(true);
        expect(tooMuchScreenTime([3, 3, 5, 8, 8, 9, 4])).toBe(true);
        expect(tooMuchScreenTime([3, 9, 4, 8, 5, 7, 6])).toBe(true);
    });

    test('all low usage', () => {
        expect(tooMuchScreenTime([1, 1, 1, 1, 1, 1, 1])).toBe(false);
        expect(tooMuchScreenTime([2, 2, 2, 2, 2, 2, 2])).toBe(false);
        expect(tooMuchScreenTime([0, 0, 0, 0, 0, 0, 0])).toBe(false);
    });

    test('moderate usage', () => {
        expect(tooMuchScreenTime([4, 4, 4, 4, 4, 4, 4])).toBe(false);
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 5])).toBe(false);
    });
});

describe('tooMuchScreenTime - single day >= 10 hours', () => {
    test('exactly 10 hours', () => {
        expect(tooMuchScreenTime([10, 0, 0, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 10, 0, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 0, 0, 0, 0, 0, 10])).toBe(true);
    });

    test('more than 10 hours', () => {
        expect(tooMuchScreenTime([11, 0, 0, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([15, 1, 1, 1, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 1, 20, 1, 1, 1])).toBe(true);
    });

    test('10 hours in different positions', () => {
        expect(tooMuchScreenTime([10, 1, 1, 1, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 1, 10, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 1, 1, 1, 1, 10])).toBe(true);
    });

    test('multiple days with 10+ hours', () => {
        expect(tooMuchScreenTime([10, 10, 0, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([11, 12, 13, 1, 1, 1, 1])).toBe(true);
    });
});

describe('tooMuchScreenTime - three day average >= 8', () => {
    test('exactly 8 hour average', () => {
        expect(tooMuchScreenTime([8, 8, 8, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 8, 8, 8, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 0, 0, 0, 8, 8, 8])).toBe(true);
    });

    test('average sum equals 24', () => {
        expect(tooMuchScreenTime([6, 9, 9, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([7, 8, 9, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([5, 9, 10, 0, 0, 0, 0])).toBe(true);
    });

    test('average greater than 8', () => {
        expect(tooMuchScreenTime([9, 9, 9, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 0, 9, 9, 9, 0, 0])).toBe(true);
    });

    test('consecutive three days', () => {
        expect(tooMuchScreenTime([1, 8, 8, 8, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 8, 8, 8, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 1, 8, 8, 8, 1])).toBe(true);
    });
});

describe('tooMuchScreenTime - seven day average >= 6', () => {
    test('exactly 6 hour average', () => {
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 6, 6])).toBe(true);
    });

    test('average sum equals 42', () => {
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 6, 6])).toBe(true);
        expect(tooMuchScreenTime([7, 7, 7, 7, 7, 7, 0])).toBe(true);
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 12])).toBe(true);
    });

    test('average greater than 6', () => {
        expect(tooMuchScreenTime([7, 7, 7, 7, 7, 7, 7])).toBe(true);
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 6, 7])).toBe(true);
        expect(tooMuchScreenTime([9, 9, 9, 1, 1, 1, 1])).toBe(true);
    });

    test('distributed usage', () => {
        expect(tooMuchScreenTime([5, 6, 7, 6, 5, 6, 7])).toBe(true);
        expect(tooMuchScreenTime([4, 5, 6, 7, 6, 5, 9])).toBe(true);
    });
});

describe('tooMuchScreenTime - boundary cases', () => {
    test('just under 10 hours single day', () => {
        expect(tooMuchScreenTime([9, 0, 0, 0, 0, 0, 0])).toBe(false);
        expect(tooMuchScreenTime([0, 9, 9, 9, 0, 0, 0])).toBe(true);
    });

    test('just under 8 hour three day average', () => {
        expect(tooMuchScreenTime([7, 8, 8, 0, 0, 0, 0])).toBe(false);
        expect(tooMuchScreenTime([7, 7, 9, 0, 0, 0, 0])).toBe(false);
    });

    test('just under 6 hour weekly average', () => {
        expect(tooMuchScreenTime([5, 6, 6, 6, 6, 6, 6])).toBe(false);
        expect(tooMuchScreenTime([5, 5, 5, 6, 6, 6, 8])).toBe(false);
    });
});

describe('tooMuchScreenTime - return value validation', () => {
    test('returns boolean', () => {
        expect(typeof tooMuchScreenTime([1, 2, 3, 4, 5, 6, 7])).toBe("boolean");
        expect(typeof tooMuchScreenTime([10, 0, 0, 0, 0, 0, 0])).toBe("boolean");
    });

    test('returns true or false', () => {
        const result1 = tooMuchScreenTime([1, 1, 1, 1, 1, 1, 1]);
        expect(result1 === true || result1 === false).toBe(true);
        const result2 = tooMuchScreenTime([10, 10, 10, 10, 10, 10, 10]);
        expect(result2 === true || result2 === false).toBe(true);
    });
});

describe('tooMuchScreenTime - zero hours', () => {
    test('some zero days', () => {
        expect(tooMuchScreenTime([0, 1, 2, 3, 4, 5, 6])).toBe(false);
        expect(tooMuchScreenTime([0, 0, 0, 9, 9, 9, 0])).toBe(true);
    });

    test('all zero days', () => {
        expect(tooMuchScreenTime([0, 0, 0, 0, 0, 0, 0])).toBe(false);
    });
});

describe('tooMuchScreenTime - mixed patterns', () => {
    test('high start low end', () => {
        expect(tooMuchScreenTime([9, 8, 7, 1, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([8, 7, 6, 2, 2, 2, 2])).toBe(false);
    });

    test('low start high end', () => {
        expect(tooMuchScreenTime([1, 1, 1, 7, 8, 9, 0])).toBe(true);
        expect(tooMuchScreenTime([2, 2, 2, 6, 7, 8, 0])).toBe(false);
    });

    test('spike in middle', () => {
        expect(tooMuchScreenTime([1, 1, 1, 10, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([2, 2, 2, 9, 2, 2, 2])).toBe(false);
    });
});

describe('tooMuchScreenTime - edge values', () => {
    test('9 hours repeatedly', () => {
        expect(tooMuchScreenTime([9, 9, 9, 9, 9, 9, 9])).toBe(true);
        expect(tooMuchScreenTime([9, 9, 0, 0, 0, 0, 0])).toBe(false);
    });

    test('values around boundaries', () => {
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 11])).toBe(true);
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 10])).toBe(true);
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 9])).toBe(false);
    });
});

describe('tooMuchScreenTime - realistic patterns', () => {
    test('workweek pattern', () => {
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 8, 9])).toBe(true);
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 7, 7])).toBe(true);
    });

    test('weekend heavy', () => {
        expect(tooMuchScreenTime([2, 2, 2, 2, 2, 10, 5])).toBe(true);
        expect(tooMuchScreenTime([3, 3, 3, 3, 3, 9, 9])).toBe(false);
    });

    test('balanced week', () => {
        expect(tooMuchScreenTime([4, 5, 4, 5, 4, 5, 4])).toBe(false);
        expect(tooMuchScreenTime([5, 5, 5, 5, 5, 5, 5])).toBe(false);
    });
});

describe('tooMuchScreenTime - all three conditions', () => {
    test('passes all checks', () => {
        expect(tooMuchScreenTime([4, 4, 4, 4, 4, 4, 4])).toBe(false);
        expect(tooMuchScreenTime([3, 3, 3, 3, 3, 3, 3])).toBe(false);
    });

    test('fails only single day check', () => {
        expect(tooMuchScreenTime([10, 0, 0, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([1, 1, 1, 11, 1, 1, 1])).toBe(true);
    });

    test('fails only three day average', () => {
        expect(tooMuchScreenTime([8, 8, 8, 0, 0, 0, 0])).toBe(true);
        expect(tooMuchScreenTime([0, 0, 9, 9, 9, 0, 0])).toBe(true);
    });

    test('fails only weekly average', () => {
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 6, 6])).toBe(true);
        expect(tooMuchScreenTime([7, 7, 7, 7, 7, 7, 0])).toBe(true);
    });

    test('fails multiple checks', () => {
        expect(tooMuchScreenTime([10, 10, 10, 10, 10, 10, 10])).toBe(true);
        expect(tooMuchScreenTime([9, 9, 9, 9, 9, 9, 9])).toBe(true);
    });
});

describe('tooMuchScreenTime - precise calculations', () => {
    test('three day average at boundary', () => {
        expect(tooMuchScreenTime([7, 8, 9, 1, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([6, 8, 10, 1, 1, 1, 1])).toBe(true);
        expect(tooMuchScreenTime([7, 7, 9, 1, 1, 1, 1])).toBe(false);
    });

    test('weekly average at boundary', () => {
        expect(tooMuchScreenTime([6, 6, 6, 6, 6, 6, 6])).toBe(true);
        expect(tooMuchScreenTime([5, 6, 6, 6, 6, 6, 7])).toBe(true);
        expect(tooMuchScreenTime([5, 5, 6, 6, 6, 6, 7])).toBe(false);
    });
});

describe('findMissingNumbers - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(findMissingNumbers([1, 3, 5])).toEqual([2, 4]);
        expect(findMissingNumbers([1, 2, 3, 4, 5])).toEqual([]);
        expect(findMissingNumbers([1, 10])).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
        expect(findMissingNumbers([10, 1, 10, 1, 10, 1])).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
        expect(findMissingNumbers([3, 1, 4, 1, 5, 9])).toEqual([2, 6, 7, 8]);
        expect(findMissingNumbers([1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 6, 8, 9, 3, 2, 10, 7, 4])).toEqual([11]);
    });

    test('no missing numbers', () => {
        expect(findMissingNumbers([1, 2, 3])).toEqual([]);
        expect(findMissingNumbers([1, 2, 3, 4, 5, 6])).toEqual([]);
        expect(findMissingNumbers([1])).toEqual([]);
    });

    test('one missing number', () => {
        expect(findMissingNumbers([1, 3])).toEqual([2]);
        expect(findMissingNumbers([1, 2, 4])).toEqual([3]);
        expect(findMissingNumbers([1, 2, 3, 5])).toEqual([4]);
    });

    test('multiple missing numbers', () => {
        expect(findMissingNumbers([1, 4, 7])).toEqual([2, 3, 5, 6]);
        expect(findMissingNumbers([1, 5, 9])).toEqual([2, 3, 4, 6, 7, 8]);
    });
});

describe('findMissingNumbers - empty array', () => {
    test('empty array returns empty', () => {
        expect(findMissingNumbers([])).toEqual([]);
    });
});

describe('findMissingNumbers - single element', () => {
    test('single element [1]', () => {
        expect(findMissingNumbers([1])).toEqual([]);
    });

    test('single element greater than 1', () => {
        expect(findMissingNumbers([5])).toEqual([1, 2, 3, 4]);
        expect(findMissingNumbers([10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});

describe('findMissingNumbers - duplicates', () => {
    test('with duplicates', () => {
        expect(findMissingNumbers([1, 1, 3, 3])).toEqual([2]);
        expect(findMissingNumbers([2, 2, 2, 5, 5, 5])).toEqual([1, 3, 4]);
    });

    test('all duplicates', () => {
        expect(findMissingNumbers([5, 5, 5, 5])).toEqual([1, 2, 3, 4]);
        expect(findMissingNumbers([3, 3, 3])).toEqual([1, 2]);
    });

    test('duplicates of sequential numbers', () => {
        expect(findMissingNumbers([1, 1, 2, 2, 3, 3])).toEqual([]);
        expect(findMissingNumbers([1, 2, 2, 3, 4, 4, 5])).toEqual([]);
    });
});

describe('findMissingNumbers - unsorted arrays', () => {
    test('reverse order', () => {
        expect(findMissingNumbers([5, 4, 3, 2, 1])).toEqual([]);
        expect(findMissingNumbers([5, 3, 1])).toEqual([2, 4]);
    });

    test('random order', () => {
        expect(findMissingNumbers([3, 1, 4, 2])).toEqual([]);
        expect(findMissingNumbers([5, 2, 4, 1])).toEqual([3]);
        expect(findMissingNumbers([9, 3, 1, 6])).toEqual([2, 4, 5, 7, 8]);
    });
});

describe('findMissingNumbers - ascending order result', () => {
    test('returns sorted array', () => {
        const result = findMissingNumbers([5, 1, 9]);
        expect(result).toEqual([2, 3, 4, 6, 7, 8]);
        for (let i = 0; i < result.length - 1; i++) {
            expect(result[i]).toBeLessThan(result[i + 1]);
        }
    });

    test('sorted regardless of input order', () => {
        expect(findMissingNumbers([10, 1, 5])).toEqual([2, 3, 4, 6, 7, 8, 9]);
        expect(findMissingNumbers([7, 2, 9, 1])).toEqual([3, 4, 5, 6, 8]);
    });
});

describe('findMissingNumbers - consecutive missing', () => {
    test('missing from start', () => {
        expect(findMissingNumbers([5, 6, 7])).toEqual([1, 2, 3, 4]);
        expect(findMissingNumbers([10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('missing from end', () => {
        expect(findMissingNumbers([1, 2, 3])).toEqual([]);
        expect(findMissingNumbers([1, 2, 5])).toEqual([3, 4]);
    });

    test('missing in middle', () => {
        expect(findMissingNumbers([1, 2, 6, 7])).toEqual([3, 4, 5]);
        expect(findMissingNumbers([1, 5, 10])).toEqual([2, 3, 4, 6, 7, 8, 9]);
    });
});

describe('findMissingNumbers - small ranges', () => {
    test('range 1-2', () => {
        expect(findMissingNumbers([1, 2])).toEqual([]);
        expect(findMissingNumbers([2])).toEqual([1]);
    });

    test('range 1-3', () => {
        expect(findMissingNumbers([1, 2, 3])).toEqual([]);
        expect(findMissingNumbers([1, 3])).toEqual([2]);
        expect(findMissingNumbers([3])).toEqual([1, 2]);
    });
});

describe('findMissingNumbers - large ranges', () => {
    test('range 1-10 with gaps', () => {
        expect(findMissingNumbers([1, 3, 5, 7, 9])).toEqual([2, 4, 6, 8]);
        expect(findMissingNumbers([2, 4, 6, 8, 10])).toEqual([1, 3, 5, 7, 9]);
    });

    test('range 1-20', () => {
        expect(findMissingNumbers([1, 20])).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    });

    test('mostly missing', () => {
        expect(findMissingNumbers([1, 10, 20])).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
    });
});

describe('findMissingNumbers - return value validation', () => {
    test('returns array', () => {
        expect(Array.isArray(findMissingNumbers([1, 2, 3]))).toBe(true);
        expect(Array.isArray(findMissingNumbers([1, 5]))).toBe(true);
        expect(Array.isArray(findMissingNumbers([]))).toBe(true);
    });

    test('returns new array', () => {
        const input = [1, 3, 5];
        const result = findMissingNumbers(input);
        expect(result).not.toBe(input);
    });

    test('does not modify input', () => {
        const input = [3, 1, 5];
        const copy = [...input];
        findMissingNumbers(input);
        expect(input).toEqual(copy);
    });
});

describe('findMissingNumbers - edge cases', () => {
    test('all numbers from 1 to n present', () => {
        expect(findMissingNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([]);
    });

    test('only 1 and max', () => {
        expect(findMissingNumbers([1, 5])).toEqual([2, 3, 4]);
        expect(findMissingNumbers([1, 100])).toHaveLength(98);
    });

    test('alternating pattern', () => {
        expect(findMissingNumbers([1, 3, 5, 7])).toEqual([2, 4, 6]);
        expect(findMissingNumbers([2, 4, 6, 8])).toEqual([1, 3, 5, 7]);
    });
});

describe('findMissingNumbers - specific patterns', () => {
    test('every other number missing', () => {
        expect(findMissingNumbers([1, 3, 5, 7, 9])).toEqual([2, 4, 6, 8]);
        expect(findMissingNumbers([2, 4, 6, 8, 10])).toEqual([1, 3, 5, 7, 9]);
    });

    test('first half missing', () => {
        expect(findMissingNumbers([6, 7, 8, 9, 10])).toEqual([1, 2, 3, 4, 5]);
    });

    test('second half missing', () => {
        expect(findMissingNumbers([1, 2, 3, 4, 5])).toEqual([]);
        expect(findMissingNumbers([1, 2, 3, 4, 10])).toEqual([5, 6, 7, 8, 9]);
    });
});

describe('findMissingNumbers - complex scenarios', () => {
    test('with many duplicates and unsorted', () => {
        expect(findMissingNumbers([5, 1, 5, 1, 5, 1])).toEqual([2, 3, 4]);
        expect(findMissingNumbers([10, 5, 1, 10, 5, 1])).toEqual([2, 3, 4, 6, 7, 8, 9]);
    });

    test('sparse distribution', () => {
        expect(findMissingNumbers([1, 4, 7, 10])).toEqual([2, 3, 5, 6, 8, 9]);
        expect(findMissingNumbers([2, 5, 8])).toEqual([1, 3, 4, 6, 7]);
    });

    test('long sequence with few missing', () => {
        expect(findMissingNumbers([1, 2, 3, 4, 5, 6, 7, 8, 10])).toEqual([9]);
        expect(findMissingNumbers([1, 2, 3, 4, 6, 7, 8, 9, 10])).toEqual([5]);
    });
});

describe('findMissingNumbers - result properties', () => {
    test('result contains only integers', () => {
        const result = findMissingNumbers([1, 5, 10]);
        result.forEach(num => {
            expect(Number.isInteger(num)).toBe(true);
        });
    });

    test('result contains no duplicates', () => {
        const result = findMissingNumbers([1, 1, 5, 5, 10, 10]);
        const unique = [...new Set(result)];
        expect(result).toEqual(unique);
    });

    test('result in range 1 to max', () => {
        const input = [1, 5, 10];
        const result = findMissingNumbers(input);
        const max = Math.max(...input);
        result.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(max);
        });
    });
});

describe('findMissingNumbers - boundary values', () => {
    test('max is 1', () => {
        expect(findMissingNumbers([1])).toEqual([]);
    });

    test('max is 2', () => {
        expect(findMissingNumbers([2])).toEqual([1]);
        expect(findMissingNumbers([1, 2])).toEqual([]);
    });

    test('contains 1', () => {
        expect(findMissingNumbers([1, 5])).toEqual([2, 3, 4]);
        expect(findMissingNumbers([1, 3, 5])).toEqual([2, 4]);
    });

    test('does not contain 1', () => {
        expect(findMissingNumbers([5])).toEqual([1, 2, 3, 4]);
        expect(findMissingNumbers([3, 5, 7])).toEqual([1, 2, 4, 6]);
    });
});
