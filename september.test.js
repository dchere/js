const { formatNumber, tribonacciSequence, getLongestWord, getHeadings, rgbToHex, isPangram, repeatVowels, isValidIPv4, rotate } = require('./september');

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
