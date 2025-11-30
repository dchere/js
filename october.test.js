const { spookify, toDecimal, toBinary, checkStrength, classification, format, sequence, navigate, sort, nthPrime, hasExoplanet, sendMessage, hexToDecimal, findLandingSpot, goldilocksZone, moonPhase, launchFuel, extractAttributes, calculateTips, adjustThermostat, wiseSpeak, favoriteSongs, dive, complementaryDNA, sockPairs, mask, validate, stripTags, count, to12, battle } = require('./october');

describe('spookify - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(spookify("hello_world")).toBe("HeLlO~wOrLd");
        expect(spookify("Spooky_Case")).toBe("SpOoKy~CaSe");
        expect(spookify("TRICK-or-TREAT")).toBe("TrIcK~oR~tReAt");
        expect(spookify("c_a-n_d-y_-b-o_w_l")).toBe("C~a~N~d~Y~~b~O~w~L");
        expect(spookify("thE_hAUntEd-hOUsE-Is-fUll_Of_ghOsts"))
            .toBe("ThE~hAuNtEd~HoUsE~iS~fUlL~oF~gHoStS");
    });

    test('simple strings', () => {
        expect(spookify("hello")).toBe("HeLlO");
        expect(spookify("world")).toBe("WoRlD");
        expect(spookify("test")).toBe("TeSt");
    });
});

describe('spookify - underscore replacement', () => {
    test('single underscore', () => {
        expect(spookify("hello_world")).toBe("HeLlO~wOrLd");
        expect(spookify("foo_bar")).toBe("FoO~bAr");
    });

    test('multiple underscores', () => {
        expect(spookify("a_b_c")).toBe("A~b~C");
        expect(spookify("one_two_three")).toBe("OnE~tWo~ThReE");
    });

    test('consecutive underscores', () => {
        expect(spookify("hello__world")).toBe("HeLlO~~wOrLd");
        expect(spookify("a___b")).toBe("A~~~b");
    });

    test('underscore at boundaries', () => {
        expect(spookify("_hello")).toBe("~HeLlO");
        expect(spookify("hello_")).toBe("HeLlO~");
        expect(spookify("_hello_")).toBe("~HeLlO~");
    });
});

describe('spookify - hyphen replacement', () => {
    test('single hyphen', () => {
        expect(spookify("hello-world")).toBe("HeLlO~wOrLd");
        expect(spookify("foo-bar")).toBe("FoO~bAr");
    });

    test('multiple hyphens', () => {
        expect(spookify("a-b-c")).toBe("A~b~C");
        expect(spookify("one-two-three")).toBe("OnE~tWo~ThReE");
    });

    test('consecutive hyphens', () => {
        expect(spookify("hello--world")).toBe("HeLlO~~wOrLd");
        expect(spookify("a---b")).toBe("A~~~b");
    });

    test('hyphen at boundaries', () => {
        expect(spookify("-hello")).toBe("~HeLlO");
        expect(spookify("hello-")).toBe("HeLlO~");
        expect(spookify("-hello-")).toBe("~HeLlO~");
    });
});

describe('spookify - mixed separators', () => {
    test('underscore and hyphen mixed', () => {
        expect(spookify("hello_world-test")).toBe("HeLlO~wOrLd~TeSt");
        expect(spookify("foo-bar_baz")).toBe("FoO~bAr~BaZ");
    });

    test('consecutive mixed separators', () => {
        expect(spookify("a_-b")).toBe("A~~b");
        expect(spookify("a-_b")).toBe("A~~b");
        expect(spookify("hello_-world")).toBe("HeLlO~~wOrLd");
    });
});

describe('spookify - alternating case', () => {
    test('first letter capitalized', () => {
        expect(spookify("hello")).toBe("HeLlO");
        expect(spookify("test")).toBe("TeSt");
        expect(spookify("abc")).toBe("AbC");
    });

    test('even positions uppercase, odd lowercase', () => {
        expect(spookify("abcd")).toBe("AbCd");
        expect(spookify("abcdef")).toBe("AbCdEf");
    });

    test('case alternation ignores separators', () => {
        expect(spookify("a_b")).toBe("A~b");
        expect(spookify("a-b-c")).toBe("A~b~C");
        expect(spookify("ab_cd")).toBe("Ab~Cd");
    });
});

describe('spookify - input with different cases', () => {
    test('all uppercase input', () => {
        expect(spookify("HELLO")).toBe("HeLlO");
        expect(spookify("WORLD")).toBe("WoRlD");
        expect(spookify("HELLO_WORLD")).toBe("HeLlO~wOrLd");
    });

    test('all lowercase input', () => {
        expect(spookify("hello")).toBe("HeLlO");
        expect(spookify("world")).toBe("WoRlD");
        expect(spookify("hello_world")).toBe("HeLlO~wOrLd");
    });

    test('mixed case input', () => {
        expect(spookify("HeLLo")).toBe("HeLlO");
        expect(spookify("WoRLd")).toBe("WoRlD");
        expect(spookify("HeLLo_WoRLd")).toBe("HeLlO~wOrLd");
    });
});

describe('spookify - edge cases', () => {
    test('empty string', () => {
        expect(spookify("")).toBe("");
    });

    test('single character', () => {
        expect(spookify("a")).toBe("A");
        expect(spookify("A")).toBe("A");
        expect(spookify("z")).toBe("Z");
    });

    test('two characters', () => {
        expect(spookify("ab")).toBe("Ab");
        expect(spookify("AB")).toBe("Ab");
    });

    test('only separators', () => {
        expect(spookify("_")).toBe("~");
        expect(spookify("-")).toBe("~");
        expect(spookify("___")).toBe("~~~");
        expect(spookify("---")).toBe("~~~");
        expect(spookify("_-_")).toBe("~~~");
    });
});

describe('spookify - long strings', () => {
    test('longer variable names', () => {
        expect(spookify("this_is_a_long_variable_name"))
            .toBe("ThIs~Is~A~lOnG~vArIaBlE~nAmE");
        expect(spookify("another-long-variable-name"))
            .toBe("AnOtHeR~lOnG~vArIaBlE~nAmE");
    });

    test('very long string', () => {
        const input = "a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p";
        const result = spookify(input);
        expect(result).toBe("A~b~C~d~E~f~G~h~I~j~K~l~M~n~O~p");
    });
});

describe('spookify - special patterns', () => {
    test('alternating letters and separators', () => {
        expect(spookify("a_b_c_d")).toBe("A~b~C~d");
        expect(spookify("a-b-c-d")).toBe("A~b~C~d");
    });

    test('multiple letters between separators', () => {
        expect(spookify("hello_world_test")).toBe("HeLlO~wOrLd~TeSt");
        expect(spookify("foo_bar_baz")).toBe("FoO~bAr~BaZ");
    });

    test('complex patterns', () => {
        expect(spookify("c_a-n_d-y_-b-o_w_l"))
            .toBe("C~a~N~d~Y~~b~O~w~L");
    });
});

describe('spookify - counting logic', () => {
    test('tilde does not affect letter count', () => {
        expect(spookify("a_bc")).toBe("A~bC");
        expect(spookify("ab_cd")).toBe("Ab~Cd");
        expect(spookify("abc_def")).toBe("AbC~dEf");
    });

    test('multiple separators do not affect count', () => {
        expect(spookify("a__b")).toBe("A~~b");
        expect(spookify("a___b")).toBe("A~~~b");
        expect(spookify("ab__cd")).toBe("Ab~~Cd");
    });
});

describe('toDecimal - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("1010")).toBe(10);
        expect(toDecimal("10010")).toBe(18);
        expect(toDecimal("1010101")).toBe(85);
    });

    test('single digit', () => {
        expect(toDecimal("0")).toBe(0);
        expect(toDecimal("1")).toBe(1);
    });

    test('two digits', () => {
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("11")).toBe(3);
        expect(toDecimal("01")).toBe(1);
        expect(toDecimal("00")).toBe(0);
    });

    test('three digits', () => {
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("110")).toBe(6);
        expect(toDecimal("111")).toBe(7);
    });
});

describe('toDecimal - powers of 2', () => {
    test('single bit set', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("1000")).toBe(8);
        expect(toDecimal("10000")).toBe(16);
        expect(toDecimal("100000")).toBe(32);
        expect(toDecimal("1000000")).toBe(64);
        expect(toDecimal("10000000")).toBe(128);
    });

    test('powers of 2 minus 1', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("11")).toBe(3);
        expect(toDecimal("111")).toBe(7);
        expect(toDecimal("1111")).toBe(15);
        expect(toDecimal("11111")).toBe(31);
        expect(toDecimal("111111")).toBe(63);
        expect(toDecimal("1111111")).toBe(127);
        expect(toDecimal("11111111")).toBe(255);
    });
});

describe('toDecimal - numbers 0-15', () => {
    test('0-7', () => {
        expect(toDecimal("0")).toBe(0);
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("11")).toBe(3);
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("110")).toBe(6);
        expect(toDecimal("111")).toBe(7);
    });

    test('8-15', () => {
        expect(toDecimal("1000")).toBe(8);
        expect(toDecimal("1001")).toBe(9);
        expect(toDecimal("1010")).toBe(10);
        expect(toDecimal("1011")).toBe(11);
        expect(toDecimal("1100")).toBe(12);
        expect(toDecimal("1101")).toBe(13);
        expect(toDecimal("1110")).toBe(14);
        expect(toDecimal("1111")).toBe(15);
    });
});

describe('toDecimal - leading zeros', () => {
    test('with leading zeros', () => {
        expect(toDecimal("01")).toBe(1);
        expect(toDecimal("001")).toBe(1);
        expect(toDecimal("0001")).toBe(1);
        expect(toDecimal("00101")).toBe(5);
        expect(toDecimal("001010")).toBe(10);
    });

    test('all zeros', () => {
        expect(toDecimal("0")).toBe(0);
        expect(toDecimal("00")).toBe(0);
        expect(toDecimal("000")).toBe(0);
        expect(toDecimal("0000")).toBe(0);
    });
});

describe('toDecimal - larger numbers', () => {
    test('16-31', () => {
        expect(toDecimal("10000")).toBe(16);
        expect(toDecimal("10100")).toBe(20);
        expect(toDecimal("11001")).toBe(25);
        expect(toDecimal("11111")).toBe(31);
    });

    test('32-63', () => {
        expect(toDecimal("100000")).toBe(32);
        expect(toDecimal("101010")).toBe(42);
        expect(toDecimal("110010")).toBe(50);
        expect(toDecimal("111111")).toBe(63);
    });

    test('64-127', () => {
        expect(toDecimal("1000000")).toBe(64);
        expect(toDecimal("1010101")).toBe(85);
        expect(toDecimal("1100100")).toBe(100);
        expect(toDecimal("1111111")).toBe(127);
    });

    test('128-255', () => {
        expect(toDecimal("10000000")).toBe(128);
        expect(toDecimal("10101010")).toBe(170);
        expect(toDecimal("11001000")).toBe(200);
        expect(toDecimal("11111111")).toBe(255);
    });
});

describe('toDecimal - specific patterns', () => {
    test('alternating bits', () => {
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("1010")).toBe(10);
        expect(toDecimal("10101")).toBe(21);
        expect(toDecimal("101010")).toBe(42);
        expect(toDecimal("1010101")).toBe(85);
    });

    test('alternating bits starting with 0', () => {
        expect(toDecimal("01")).toBe(1);
        expect(toDecimal("010")).toBe(2);
        expect(toDecimal("0101")).toBe(5);
        expect(toDecimal("01010")).toBe(10);
        expect(toDecimal("010101")).toBe(21);
    });

    test('all ones', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("11")).toBe(3);
        expect(toDecimal("111")).toBe(7);
        expect(toDecimal("1111")).toBe(15);
        expect(toDecimal("11111")).toBe(31);
    });

    test('single one at different positions', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("1000")).toBe(8);
        expect(toDecimal("10000")).toBe(16);
    });
});

describe('toDecimal - return value validation', () => {
    test('returns number', () => {
        expect(typeof toDecimal("101")).toBe("number");
        expect(typeof toDecimal("0")).toBe("number");
        expect(typeof toDecimal("1111")).toBe("number");
    });

    test('returns integer', () => {
        expect(Number.isInteger(toDecimal("101"))).toBe(true);
        expect(Number.isInteger(toDecimal("1010"))).toBe(true);
        expect(Number.isInteger(toDecimal("11111"))).toBe(true);
    });

    test('returns non-negative', () => {
        expect(toDecimal("0")).toBeGreaterThanOrEqual(0);
        expect(toDecimal("1")).toBeGreaterThanOrEqual(0);
        expect(toDecimal("1010")).toBeGreaterThanOrEqual(0);
    });
});

describe('toDecimal - conversion verification', () => {
    test('verify calculation for 101', () => {
        // 1*2^2 + 0*2^1 + 1*2^0 = 4 + 0 + 1 = 5
        expect(toDecimal("101")).toBe(5);
    });

    test('verify calculation for 1010', () => {
        // 1*2^3 + 0*2^2 + 1*2^1 + 0*2^0 = 8 + 0 + 2 + 0 = 10
        expect(toDecimal("1010")).toBe(10);
    });

    test('verify calculation for 10010', () => {
        // 1*2^4 + 0*2^3 + 0*2^2 + 1*2^1 + 0*2^0 = 16 + 0 + 0 + 2 + 0 = 18
        expect(toDecimal("10010")).toBe(18);
    });

    test('verify calculation for 1010101', () => {
        // 1*2^6 + 0*2^5 + 1*2^4 + 0*2^3 + 1*2^2 + 0*2^1 + 1*2^0
        // = 64 + 0 + 16 + 0 + 4 + 0 + 1 = 85
        expect(toDecimal("1010101")).toBe(85);
    });
});

describe('toDecimal - edge cases', () => {
    test('single bit', () => {
        expect(toDecimal("0")).toBe(0);
        expect(toDecimal("1")).toBe(1);
    });

    test('maximum 8-bit value', () => {
        expect(toDecimal("11111111")).toBe(255);
    });

    test('minimum values', () => {
        expect(toDecimal("0")).toBe(0);
        expect(toDecimal("00")).toBe(0);
        expect(toDecimal("000")).toBe(0);
    });
});

describe('toDecimal - common decimal values', () => {
    test('multiples of 10', () => {
        expect(toDecimal("1010")).toBe(10);
        expect(toDecimal("10100")).toBe(20);
        expect(toDecimal("11110")).toBe(30);
        expect(toDecimal("101000")).toBe(40);
        expect(toDecimal("110010")).toBe(50);
    });

    test('powers of 10', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("1010")).toBe(10);
        expect(toDecimal("1100100")).toBe(100);
    });

    test('common round numbers', () => {
        expect(toDecimal("1100100")).toBe(100);
        expect(toDecimal("11001000")).toBe(200);
        expect(toDecimal("1111101000")).toBe(1000);
    });
});

describe('toDecimal - bit positions', () => {
    test('rightmost bit', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("11")).toBe(3);
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("1001")).toBe(9);
    });

    test('leftmost bit', () => {
        expect(toDecimal("1")).toBe(1);
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("1000")).toBe(8);
    });

    test('middle bits', () => {
        expect(toDecimal("010")).toBe(2);
        expect(toDecimal("0100")).toBe(4);
        expect(toDecimal("01000")).toBe(8);
    });
});

describe('toDecimal - systematic coverage', () => {
    test('all 2-bit combinations', () => {
        expect(toDecimal("00")).toBe(0);
        expect(toDecimal("01")).toBe(1);
        expect(toDecimal("10")).toBe(2);
        expect(toDecimal("11")).toBe(3);
    });

    test('all 3-bit combinations', () => {
        expect(toDecimal("000")).toBe(0);
        expect(toDecimal("001")).toBe(1);
        expect(toDecimal("010")).toBe(2);
        expect(toDecimal("011")).toBe(3);
        expect(toDecimal("100")).toBe(4);
        expect(toDecimal("101")).toBe(5);
        expect(toDecimal("110")).toBe(6);
        expect(toDecimal("111")).toBe(7);
    });
});

describe('toDecimal - longer binary strings', () => {
    test('8-bit numbers', () => {
        expect(toDecimal("00000001")).toBe(1);
        expect(toDecimal("00001010")).toBe(10);
        expect(toDecimal("01100100")).toBe(100);
        expect(toDecimal("11111111")).toBe(255);
    });

    test('10-bit numbers', () => {
        expect(toDecimal("1111111111")).toBe(1023);
        expect(toDecimal("1111101000")).toBe(1000);
    });
});

describe('toBinary - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(toBinary(5)).toBe("101");
        expect(toBinary(12)).toBe("1100");
        expect(toBinary(50)).toBe("110010");
        expect(toBinary(99)).toBe("1100011");
    });

    test('zero', () => {
        expect(toBinary(0)).toBe("0");
    });

    test('one', () => {
        expect(toBinary(1)).toBe("1");
    });

    test('small numbers', () => {
        expect(toBinary(2)).toBe("10");
        expect(toBinary(3)).toBe("11");
        expect(toBinary(4)).toBe("100");
    });
});

describe('toBinary - powers of 2', () => {
    test('powers of 2', () => {
        expect(toBinary(1)).toBe("1");
        expect(toBinary(2)).toBe("10");
        expect(toBinary(4)).toBe("100");
        expect(toBinary(8)).toBe("1000");
        expect(toBinary(16)).toBe("10000");
        expect(toBinary(32)).toBe("100000");
        expect(toBinary(64)).toBe("1000000");
        expect(toBinary(128)).toBe("10000000");
    });

    test('powers of 2 minus 1', () => {
        expect(toBinary(1)).toBe("1");
        expect(toBinary(3)).toBe("11");
        expect(toBinary(7)).toBe("111");
        expect(toBinary(15)).toBe("1111");
        expect(toBinary(31)).toBe("11111");
        expect(toBinary(63)).toBe("111111");
        expect(toBinary(127)).toBe("1111111");
        expect(toBinary(255)).toBe("11111111");
    });
});

describe('toBinary - numbers 0-15', () => {
    test('0-7', () => {
        expect(toBinary(0)).toBe("0");
        expect(toBinary(1)).toBe("1");
        expect(toBinary(2)).toBe("10");
        expect(toBinary(3)).toBe("11");
        expect(toBinary(4)).toBe("100");
        expect(toBinary(5)).toBe("101");
        expect(toBinary(6)).toBe("110");
        expect(toBinary(7)).toBe("111");
    });

    test('8-15', () => {
        expect(toBinary(8)).toBe("1000");
        expect(toBinary(9)).toBe("1001");
        expect(toBinary(10)).toBe("1010");
        expect(toBinary(11)).toBe("1011");
        expect(toBinary(12)).toBe("1100");
        expect(toBinary(13)).toBe("1101");
        expect(toBinary(14)).toBe("1110");
        expect(toBinary(15)).toBe("1111");
    });
});

describe('toBinary - larger numbers', () => {
    test('16-31', () => {
        expect(toBinary(16)).toBe("10000");
        expect(toBinary(20)).toBe("10100");
        expect(toBinary(25)).toBe("11001");
        expect(toBinary(31)).toBe("11111");
    });

    test('32-63', () => {
        expect(toBinary(32)).toBe("100000");
        expect(toBinary(42)).toBe("101010");
        expect(toBinary(50)).toBe("110010");
        expect(toBinary(63)).toBe("111111");
    });

    test('64-127', () => {
        expect(toBinary(64)).toBe("1000000");
        expect(toBinary(85)).toBe("1010101");
        expect(toBinary(100)).toBe("1100100");
        expect(toBinary(127)).toBe("1111111");
    });

    test('128-255', () => {
        expect(toBinary(128)).toBe("10000000");
        expect(toBinary(170)).toBe("10101010");
        expect(toBinary(200)).toBe("11001000");
        expect(toBinary(255)).toBe("11111111");
    });
});

describe('toBinary - specific patterns', () => {
    test('alternating bits', () => {
        expect(toBinary(2)).toBe("10");
        expect(toBinary(5)).toBe("101");
        expect(toBinary(10)).toBe("1010");
        expect(toBinary(21)).toBe("10101");
        expect(toBinary(42)).toBe("101010");
        expect(toBinary(85)).toBe("1010101");
    });

    test('all ones pattern', () => {
        expect(toBinary(1)).toBe("1");
        expect(toBinary(3)).toBe("11");
        expect(toBinary(7)).toBe("111");
        expect(toBinary(15)).toBe("1111");
        expect(toBinary(31)).toBe("11111");
    });

    test('single one at different positions', () => {
        expect(toBinary(1)).toBe("1");
        expect(toBinary(2)).toBe("10");
        expect(toBinary(4)).toBe("100");
        expect(toBinary(8)).toBe("1000");
        expect(toBinary(16)).toBe("10000");
    });
});

describe('toBinary - return value validation', () => {
    test('returns string', () => {
        expect(typeof toBinary(5)).toBe("string");
        expect(typeof toBinary(0)).toBe("string");
        expect(toBinary(15)).toEqual(expect.any(String));
    });

    test('contains only 0 and 1', () => {
        expect(toBinary(5)).toMatch(/^[01]+$/);
        expect(toBinary(12)).toMatch(/^[01]+$/);
        expect(toBinary(99)).toMatch(/^[01]+$/);
    });

    test('no leading zeros except for zero', () => {
        expect(toBinary(0)).toBe("0");
        expect(toBinary(5)).not.toMatch(/^0[01]+/);
        expect(toBinary(12)).not.toMatch(/^0[01]+/);
        expect(toBinary(99)).not.toMatch(/^0[01]+/);
    });
});

describe('toBinary - conversion verification', () => {
    test('verify calculation for 5', () => {
        // 5 ÷ 2 = 2 remainder 1
        // 2 ÷ 2 = 1 remainder 0
        // 1 ÷ 2 = 0 remainder 1
        // Result: 101
        expect(toBinary(5)).toBe("101");
    });

    test('verify calculation for 12', () => {
        // 12 ÷ 2 = 6 remainder 0
        // 6 ÷ 2 = 3 remainder 0
        // 3 ÷ 2 = 1 remainder 1
        // 1 ÷ 2 = 0 remainder 1
        // Result: 1100
        expect(toBinary(12)).toBe("1100");
    });

    test('verify calculation for 50', () => {
        // 50 ÷ 2 = 25 remainder 0
        // 25 ÷ 2 = 12 remainder 1
        // 12 ÷ 2 = 6 remainder 0
        // 6 ÷ 2 = 3 remainder 0
        // 3 ÷ 2 = 1 remainder 1
        // 1 ÷ 2 = 0 remainder 1
        // Result: 110010
        expect(toBinary(50)).toBe("110010");
    });

    test('verify calculation for 99', () => {
        // 99 ÷ 2 = 49 remainder 1
        // 49 ÷ 2 = 24 remainder 1
        // 24 ÷ 2 = 12 remainder 0
        // 12 ÷ 2 = 6 remainder 0
        // 6 ÷ 2 = 3 remainder 0
        // 3 ÷ 2 = 1 remainder 1
        // 1 ÷ 2 = 0 remainder 1
        // Result: 1100011
        expect(toBinary(99)).toBe("1100011");
    });
});

describe('toBinary - round trip conversion', () => {
    test('toBinary and toDecimal are inverse operations', () => {
        expect(toDecimal(toBinary(5))).toBe(5);
        expect(toDecimal(toBinary(12))).toBe(12);
        expect(toDecimal(toBinary(50))).toBe(50);
        expect(toDecimal(toBinary(99))).toBe(99);
    });

    test('round trip for various numbers', () => {
        expect(toDecimal(toBinary(0))).toBe(0);
        expect(toDecimal(toBinary(1))).toBe(1);
        expect(toDecimal(toBinary(10))).toBe(10);
        expect(toDecimal(toBinary(100))).toBe(100);
        expect(toDecimal(toBinary(255))).toBe(255);
    });

    test('round trip for powers of 2', () => {
        expect(toDecimal(toBinary(2))).toBe(2);
        expect(toDecimal(toBinary(4))).toBe(4);
        expect(toDecimal(toBinary(8))).toBe(8);
        expect(toDecimal(toBinary(16))).toBe(16);
        expect(toDecimal(toBinary(32))).toBe(32);
    });
});

describe('toBinary - common decimal values', () => {
    test('multiples of 10', () => {
        expect(toBinary(10)).toBe("1010");
        expect(toBinary(20)).toBe("10100");
        expect(toBinary(30)).toBe("11110");
        expect(toBinary(40)).toBe("101000");
        expect(toBinary(50)).toBe("110010");
    });

    test('powers of 10', () => {
        expect(toBinary(1)).toBe("1");
        expect(toBinary(10)).toBe("1010");
        expect(toBinary(100)).toBe("1100100");
        expect(toBinary(1000)).toBe("1111101000");
    });

    test('common round numbers', () => {
        expect(toBinary(100)).toBe("1100100");
        expect(toBinary(200)).toBe("11001000");
        expect(toBinary(500)).toBe("111110100");
    });
});

describe('toBinary - edge cases', () => {
    test('minimum value', () => {
        expect(toBinary(0)).toBe("0");
    });

    test('single digit', () => {
        expect(toBinary(1)).toBe("1");
    });

    test('maximum 8-bit value', () => {
        expect(toBinary(255)).toBe("11111111");
    });

    test('maximum 16-bit value', () => {
        expect(toBinary(65535)).toBe("1111111111111111");
    });
});

describe('toBinary - systematic coverage', () => {
    test('all values 0-15', () => {
        const expected = [
            "0", "1", "10", "11", "100", "101", "110", "111",
            "1000", "1001", "1010", "1011", "1100", "1101", "1110", "1111"
        ];
        for (let i = 0; i < 16; i++) {
            expect(toBinary(i)).toBe(expected[i]);
        }
    });
});

describe('toBinary - larger values', () => {
    test('256-1023', () => {
        expect(toBinary(256)).toBe("100000000");
        expect(toBinary(512)).toBe("1000000000");
        expect(toBinary(1000)).toBe("1111101000");
        expect(toBinary(1023)).toBe("1111111111");
    });

    test('values above 1000', () => {
        expect(toBinary(1024)).toBe("10000000000");
        expect(toBinary(2000)).toBe("11111010000");
        expect(toBinary(5000)).toBe("1001110001000");
    });

    test('large powers of 2', () => {
        expect(toBinary(256)).toBe("100000000");
        expect(toBinary(512)).toBe("1000000000");
        expect(toBinary(1024)).toBe("10000000000");
        expect(toBinary(2048)).toBe("100000000000");
    });
});

describe('toBinary - bit length verification', () => {
    test('correct bit length for powers of 2', () => {
        expect(toBinary(1).length).toBe(1);
        expect(toBinary(2).length).toBe(2);
        expect(toBinary(4).length).toBe(3);
        expect(toBinary(8).length).toBe(4);
        expect(toBinary(16).length).toBe(5);
    });

    test('bit length matches expected', () => {
        expect(toBinary(0).length).toBe(1);
        expect(toBinary(5).length).toBe(3);
        expect(toBinary(12).length).toBe(4);
        expect(toBinary(50).length).toBe(6);
        expect(toBinary(99).length).toBe(7);
    });
});

describe('checkStrength - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(checkStrength("123456")).toBe("weak");
        expect(checkStrength("pass!!!")).toBe("weak");
        expect(checkStrength("Qwerty")).toBe("weak");
        expect(checkStrength("PASSWORD")).toBe("weak");
        expect(checkStrength("PASSWORD!")).toBe("medium");
        expect(checkStrength("PassWord%^!")).toBe("medium");
        expect(checkStrength("qwerty12345")).toBe("medium");
        expect(checkStrength("S3cur3P@ssw0rd")).toBe("strong");
        expect(checkStrength("C0d3&Fun!")).toBe("strong");
    });
});

describe('checkStrength - weak passwords', () => {
    test('meets 0 rules', () => {
        expect(checkStrength("abc")).toBe("weak");
        expect(checkStrength("xyz")).toBe("weak");
        expect(checkStrength("test")).toBe("weak");
    });

    test('meets 1 rule - length only', () => {
        expect(checkStrength("abcdefgh")).toBe("weak");
        expect(checkStrength("lowercase")).toBe("weak");
        expect(checkStrength("UPPERCASE")).toBe("weak");
    });

    test('meets 1 rule - mixed case only (short)', () => {
        expect(checkStrength("Abc")).toBe("weak");
        expect(checkStrength("Qwerty")).toBe("weak");
        expect(checkStrength("AaAa")).toBe("weak");
    });

    test('meets 1 rule - numbers only (short)', () => {
        expect(checkStrength("123")).toBe("weak");
        expect(checkStrength("123456")).toBe("weak");
        expect(checkStrength("999")).toBe("weak");
    });

    test('meets 1 rule - special chars only (short)', () => {
        expect(checkStrength("!!!")).toBe("weak");
        expect(checkStrength("@#$")).toBe("weak");
        expect(checkStrength("pass!!!")).toBe("weak");
    });

    test('only uppercase', () => {
        expect(checkStrength("PASSWORD")).toBe("weak");
        expect(checkStrength("TESTING")).toBe("weak");
    });

    test('only lowercase', () => {
        expect(checkStrength("password")).toBe("weak");
        expect(checkStrength("testing")).toBe("weak");
    });
});

describe('checkStrength - medium passwords', () => {
    test('meets 2 rules - length + mixed case', () => {
        expect(checkStrength("Password")).toBe("medium");
        expect(checkStrength("TestCase")).toBe("medium");
        expect(checkStrength("AbCdEfGh")).toBe("medium");
    });

    test('meets 2 rules - length + numbers', () => {
        expect(checkStrength("password123")).toBe("medium");
        expect(checkStrength("qwerty12345")).toBe("medium");
        expect(checkStrength("testing999")).toBe("medium");
    });

    test('meets 2 rules - length + special chars', () => {
        expect(checkStrength("password!")).toBe("medium");
        expect(checkStrength("PASSWORD!")).toBe("medium");
        expect(checkStrength("testing@@@")).toBe("medium");
    });

    test('meets 2 rules - mixed case + numbers (short)', () => {
        expect(checkStrength("Pass1")).toBe("medium");
        expect(checkStrength("Aa1")).toBe("medium");
    });

    test('meets 2 rules - mixed case + special (short)', () => {
        expect(checkStrength("Pass!")).toBe("medium");
        expect(checkStrength("Aa@")).toBe("medium");
    });

    test('meets 2 rules - numbers + special (short)', () => {
        expect(checkStrength("123!")).toBe("medium");
        expect(checkStrength("99@")).toBe("medium");
    });
});

describe('checkStrength - medium passwords (3 rules)', () => {
    test('meets 3 rules - length + mixed case + numbers', () => {
        expect(checkStrength("Password123")).toBe("medium");
        expect(checkStrength("Testing999")).toBe("medium");
    });

    test('meets 3 rules - length + mixed case + special', () => {
        expect(checkStrength("Password!")).toBe("medium");
        expect(checkStrength("PassWord%^!")).toBe("medium");
    });

    test('meets 3 rules - length + numbers + special', () => {
        expect(checkStrength("password123!")).toBe("medium");
        expect(checkStrength("testing999@")).toBe("medium");
    });

    test('meets 3 rules - mixed case + numbers + special (short)', () => {
        expect(checkStrength("Aa1!")).toBe("medium");
        expect(checkStrength("Bb2@")).toBe("medium");
    });
});

describe('checkStrength - strong passwords', () => {
    test('meets all 4 rules', () => {
        expect(checkStrength("S3cur3P@ssw0rd")).toBe("strong");
        expect(checkStrength("C0d3&Fun!")).toBe("strong");
        expect(checkStrength("MyP@ss123")).toBe("strong");
    });

    test('minimum length strong passwords', () => {
        expect(checkStrength("Abcd123!")).toBe("strong");
        expect(checkStrength("Pass1234@")).toBe("strong");
        expect(checkStrength("Test567#")).toBe("strong");
    });

    test('longer strong passwords', () => {
        expect(checkStrength("MyVerySecure123!")).toBe("strong");
        expect(checkStrength("P@ssw0rd123456")).toBe("strong");
        expect(checkStrength("Str0ng&Secure!")).toBe("strong");
    });

    test('all special characters', () => {
        expect(checkStrength("Pass123!")).toBe("strong");
        expect(checkStrength("Pass123@")).toBe("strong");
        expect(checkStrength("Pass123#")).toBe("strong");
        expect(checkStrength("Pass123$")).toBe("strong");
        expect(checkStrength("Pass123%")).toBe("strong");
        expect(checkStrength("Pass123^")).toBe("strong");
        expect(checkStrength("Pass123&")).toBe("strong");
        expect(checkStrength("Pass123*")).toBe("strong");
    });

    test('multiple special characters', () => {
        expect(checkStrength("P@ssw0rd!")).toBe("strong");
        expect(checkStrength("T3st!@#$")).toBe("strong");
        expect(checkStrength("C0d3&*%^")).toBe("strong");
    });
});

describe('checkStrength - length validation', () => {
    test('exactly 8 characters', () => {
        expect(checkStrength("Abcd123!")).toBe("strong");
        expect(checkStrength("Password")).toBe("medium");
    });

    test('7 characters', () => {
        expect(checkStrength("Abc123!")).toBe("medium");
        expect(checkStrength("Pass123")).toBe("medium");
    });

    test('very short', () => {
        expect(checkStrength("Aa1!")).toBe("medium");
        expect(checkStrength("Ab1")).toBe("medium");
    });

    test('very long', () => {
        expect(checkStrength("ThisIsAVeryLongPassword123!")).toBe("strong");
    });
});

describe('checkStrength - mixed case validation', () => {
    test('has both upper and lower', () => {
        expect(checkStrength("AaBbCcDd12345678")).toBe("medium");
        expect(checkStrength("Password123!")).toBe("strong");
    });

    test('only uppercase', () => {
        expect(checkStrength("PASSWORD123!")).toBe("medium");
    });

    test('only lowercase', () => {
        expect(checkStrength("password123!")).toBe("medium");
    });

    test('single uppercase letter', () => {
        expect(checkStrength("Password123!")).toBe("strong");
    });

    test('single lowercase letter', () => {
        expect(checkStrength("PASSWORd123!")).toBe("strong");
    });
});

describe('checkStrength - number validation', () => {
    test('has numbers', () => {
        expect(checkStrength("Password123!")).toBe("strong");
        expect(checkStrength("Test123!")).toBe("strong");
    });

    test('no numbers', () => {
        expect(checkStrength("Password!")).toBe("medium");
        expect(checkStrength("Testing!")).toBe("medium");
    });

    test('single digit', () => {
        expect(checkStrength("Password1!")).toBe("strong");
    });

    test('multiple digits', () => {
        expect(checkStrength("Pass12345!")).toBe("strong");
    });

    test('only digits', () => {
        expect(checkStrength("12345678")).toBe("medium");
    });
});

describe('checkStrength - special character validation', () => {
    test('has special chars', () => {
        expect(checkStrength("Password123!")).toBe("strong");
    });

    test('no special chars', () => {
        expect(checkStrength("Password123")).toBe("medium");
    });

    test('each valid special character', () => {
        expect(checkStrength("Password1!")).toBe("strong");
        expect(checkStrength("Password1@")).toBe("strong");
        expect(checkStrength("Password1#")).toBe("strong");
        expect(checkStrength("Password1$")).toBe("strong");
        expect(checkStrength("Password1%")).toBe("strong");
        expect(checkStrength("Password1^")).toBe("strong");
        expect(checkStrength("Password1&")).toBe("strong");
        expect(checkStrength("Password1*")).toBe("strong");
    });

    test('invalid special characters', () => {
        expect(checkStrength("Password1?")).toBe("medium");
        expect(checkStrength("Password1.")).toBe("medium");
        expect(checkStrength("Password1,")).toBe("medium");
    });
});

describe('checkStrength - return value validation', () => {
    test('returns string', () => {
        expect(typeof checkStrength("Password123!")).toBe("string");
        expect(typeof checkStrength("weak")).toBe("string");
    });

    test('returns only valid values', () => {
        const result1 = checkStrength("Password123!");
        expect(["weak", "medium", "strong"]).toContain(result1);
        
        const result2 = checkStrength("abc");
        expect(["weak", "medium", "strong"]).toContain(result2);
    });
});

describe('checkStrength - edge cases', () => {
    test('empty string', () => {
        expect(checkStrength("")).toBe("weak");
    });

    test('single character', () => {
        expect(checkStrength("a")).toBe("weak");
        expect(checkStrength("A")).toBe("weak");
        expect(checkStrength("1")).toBe("weak");
        expect(checkStrength("!")).toBe("weak");
    });

    test('exactly at boundaries', () => {
        expect(checkStrength("Aa1!")).toBe("medium");
        expect(checkStrength("Abcd123!")).toBe("strong");
    });
});

describe('checkStrength - rule counting', () => {
    test('0 rules met', () => {
        expect(checkStrength("abc")).toBe("weak");
    });

    test('1 rule met', () => {
        expect(checkStrength("abcdefgh")).toBe("weak");
    });

    test('2 rules met', () => {
        expect(checkStrength("Password")).toBe("medium");
    });

    test('3 rules met', () => {
        expect(checkStrength("Password123")).toBe("medium");
    });

    test('4 rules met', () => {
        expect(checkStrength("Password123!")).toBe("strong");
    });
});

describe('checkStrength - real world examples', () => {
    test('common weak passwords', () => {
        expect(checkStrength("password")).toBe("weak");
        expect(checkStrength("123456")).toBe("weak");
        expect(checkStrength("qwerty")).toBe("weak");
        expect(checkStrength("abc123")).toBe("weak");
    });

    test('common medium passwords', () => {
        expect(checkStrength("Password1")).toBe("medium");
        expect(checkStrength("Welcome123")).toBe("medium");
    });

    test('common strong passwords', () => {
        expect(checkStrength("MyP@ssw0rd")).toBe("strong");
        expect(checkStrength("S3cur3!Pass")).toBe("strong");
        expect(checkStrength("Tr0ub4dor&3")).toBe("strong");
    });
});

describe('checkStrength - comprehensive coverage', () => {
    test('all combinations of 2 rules', () => {
        expect(checkStrength("Password")).toBe("medium");
        expect(checkStrength("password123")).toBe("medium");
        expect(checkStrength("password!")).toBe("medium");
        expect(checkStrength("Pass1")).toBe("medium");
        expect(checkStrength("Pass!")).toBe("medium");
        expect(checkStrength("123!")).toBe("medium");
    });

    test('all combinations of 3 rules', () => {
        expect(checkStrength("Password123")).toBe("medium");
        expect(checkStrength("Password!")).toBe("medium");
        expect(checkStrength("password123!")).toBe("medium");
        expect(checkStrength("Aa1!")).toBe("medium");
    });

    test('special chars at different positions', () => {
        expect(checkStrength("!Password123")).toBe("strong");
        expect(checkStrength("Pass!word123")).toBe("strong");
        expect(checkStrength("Password123!")).toBe("strong");
    });

    test('numbers at different positions', () => {
        expect(checkStrength("1Password!")).toBe("strong");
        expect(checkStrength("Pass1word!")).toBe("strong");
        expect(checkStrength("Password1!")).toBe("strong");
    });
});

describe('checkStrength - case sensitivity', () => {
    test('requires both cases', () => {
        expect(checkStrength("PASSWORD123!")).toBe("medium");
        expect(checkStrength("password123!")).toBe("medium");
        expect(checkStrength("Password123!")).toBe("strong");
    });

    test('mixed case patterns', () => {
        expect(checkStrength("PaSsWoRd123!")).toBe("strong");
        expect(checkStrength("pAsSwOrD123!")).toBe("strong");
    });
});

describe('classification - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(classification(5778)).toBe("G");
        expect(classification(2400)).toBe("M");
        expect(classification(9999)).toBe("A");
        expect(classification(3700)).toBe("K");
        expect(classification(3699)).toBe("M");
        expect(classification(210000)).toBe("O");
        expect(classification(6000)).toBe("F");
        expect(classification(11432)).toBe("B");
    });
});

describe('classification - class O stars', () => {
    test('exactly at boundary', () => {
        expect(classification(30000)).toBe("O");
    });

    test('above boundary', () => {
        expect(classification(30001)).toBe("O");
        expect(classification(35000)).toBe("O");
        expect(classification(40000)).toBe("O");
    });

    test('very high temperatures', () => {
        expect(classification(50000)).toBe("O");
        expect(classification(100000)).toBe("O");
        expect(classification(210000)).toBe("O");
    });

    test('just below boundary', () => {
        expect(classification(29999)).toBe("B");
    });
});

describe('classification - class B stars', () => {
    test('at lower boundary', () => {
        expect(classification(10000)).toBe("B");
    });

    test('at upper boundary', () => {
        expect(classification(29999)).toBe("B");
    });

    test('in the middle', () => {
        expect(classification(15000)).toBe("B");
        expect(classification(20000)).toBe("B");
        expect(classification(25000)).toBe("B");
    });

    test('edge cases', () => {
        expect(classification(10001)).toBe("B");
        expect(classification(29998)).toBe("B");
    });

    test('just outside boundaries', () => {
        expect(classification(9999)).toBe("A");
        expect(classification(30000)).toBe("O");
    });
});

describe('classification - class A stars', () => {
    test('at lower boundary', () => {
        expect(classification(7500)).toBe("A");
    });

    test('at upper boundary', () => {
        expect(classification(9999)).toBe("A");
    });

    test('in the middle', () => {
        expect(classification(8000)).toBe("A");
        expect(classification(8500)).toBe("A");
        expect(classification(9000)).toBe("A");
    });

    test('edge cases', () => {
        expect(classification(7501)).toBe("A");
        expect(classification(9998)).toBe("A");
    });

    test('just outside boundaries', () => {
        expect(classification(7499)).toBe("F");
        expect(classification(10000)).toBe("B");
    });
});

describe('classification - class F stars', () => {
    test('at lower boundary', () => {
        expect(classification(6000)).toBe("F");
    });

    test('at upper boundary', () => {
        expect(classification(7499)).toBe("F");
    });

    test('in the middle', () => {
        expect(classification(6500)).toBe("F");
        expect(classification(7000)).toBe("F");
    });

    test('edge cases', () => {
        expect(classification(6001)).toBe("F");
        expect(classification(7498)).toBe("F");
    });

    test('just outside boundaries', () => {
        expect(classification(5999)).toBe("G");
        expect(classification(7500)).toBe("A");
    });
});

describe('classification - class G stars', () => {
    test('at lower boundary', () => {
        expect(classification(5200)).toBe("G");
    });

    test('at upper boundary', () => {
        expect(classification(5999)).toBe("G");
    });

    test('in the middle', () => {
        expect(classification(5400)).toBe("G");
        expect(classification(5600)).toBe("G");
        expect(classification(5800)).toBe("G");
    });

    test('Sun temperature', () => {
        expect(classification(5778)).toBe("G");
    });

    test('edge cases', () => {
        expect(classification(5201)).toBe("G");
        expect(classification(5998)).toBe("G");
    });

    test('just outside boundaries', () => {
        expect(classification(5199)).toBe("K");
        expect(classification(6000)).toBe("F");
    });
});

describe('classification - class K stars', () => {
    test('at lower boundary', () => {
        expect(classification(3700)).toBe("K");
    });

    test('at upper boundary', () => {
        expect(classification(5199)).toBe("K");
    });

    test('in the middle', () => {
        expect(classification(4000)).toBe("K");
        expect(classification(4500)).toBe("K");
        expect(classification(5000)).toBe("K");
    });

    test('edge cases', () => {
        expect(classification(3701)).toBe("K");
        expect(classification(5198)).toBe("K");
    });

    test('just outside boundaries', () => {
        expect(classification(3699)).toBe("M");
        expect(classification(5200)).toBe("G");
    });
});

describe('classification - class M stars', () => {
    test('at upper boundary', () => {
        expect(classification(3699)).toBe("M");
    });

    test('various temperatures', () => {
        expect(classification(3000)).toBe("M");
        expect(classification(2400)).toBe("M");
        expect(classification(2000)).toBe("M");
        expect(classification(1000)).toBe("M");
    });

    test('very low temperatures', () => {
        expect(classification(500)).toBe("M");
        expect(classification(100)).toBe("M");
        expect(classification(1)).toBe("M");
    });

    test('zero temperature', () => {
        expect(classification(0)).toBe("M");
    });

    test('just above boundary', () => {
        expect(classification(3700)).toBe("K");
    });
});

describe('classification - boundary testing', () => {
    test('all lower boundaries', () => {
        expect(classification(30000)).toBe("O");
        expect(classification(10000)).toBe("B");
        expect(classification(7500)).toBe("A");
        expect(classification(6000)).toBe("F");
        expect(classification(5200)).toBe("G");
        expect(classification(3700)).toBe("K");
        expect(classification(0)).toBe("M");
    });

    test('all upper boundaries', () => {
        expect(classification(29999)).toBe("B");
        expect(classification(9999)).toBe("A");
        expect(classification(7499)).toBe("F");
        expect(classification(5999)).toBe("G");
        expect(classification(5199)).toBe("K");
        expect(classification(3699)).toBe("M");
    });

    test('just below lower boundaries', () => {
        expect(classification(29999)).toBe("B");
        expect(classification(9999)).toBe("A");
        expect(classification(7499)).toBe("F");
        expect(classification(5999)).toBe("G");
        expect(classification(5199)).toBe("K");
        expect(classification(3699)).toBe("M");
    });

    test('just above lower boundaries', () => {
        expect(classification(30001)).toBe("O");
        expect(classification(10001)).toBe("B");
        expect(classification(7501)).toBe("A");
        expect(classification(6001)).toBe("F");
        expect(classification(5201)).toBe("G");
        expect(classification(3701)).toBe("K");
    });
});

describe('classification - return value validation', () => {
    test('returns string', () => {
        expect(typeof classification(5778)).toBe("string");
        expect(typeof classification(30000)).toBe("string");
    });

    test('returns only valid classes', () => {
        const validClasses = ["O", "B", "A", "F", "G", "K", "M"];
        expect(validClasses).toContain(classification(5778));
        expect(validClasses).toContain(classification(2400));
        expect(validClasses).toContain(classification(30000));
    });

    test('returns single character', () => {
        expect(classification(5778).length).toBe(1);
        expect(classification(30000).length).toBe(1);
    });
});

describe('classification - astronomical examples', () => {
    test('Sun (G-type)', () => {
        expect(classification(5778)).toBe("G");
    });

    test('Rigel (B-type)', () => {
        expect(classification(11000)).toBe("B");
    });

    test('Sirius (A-type)', () => {
        expect(classification(9940)).toBe("A");
    });

    test('Procyon (F-type)', () => {
        expect(classification(6530)).toBe("F");
    });

    test('Alpha Centauri (G-type)', () => {
        expect(classification(5790)).toBe("G");
    });

    test('Arcturus (K-type)', () => {
        expect(classification(4286)).toBe("K");
    });

    test('Proxima Centauri (M-type)', () => {
        expect(classification(3042)).toBe("M");
    });

    test('Betelgeuse (M-type)', () => {
        expect(classification(3500)).toBe("M");
    });
});

describe('classification - complete range coverage', () => {
    test('sample from each class', () => {
        expect(classification(50000)).toBe("O");
        expect(classification(20000)).toBe("B");
        expect(classification(8750)).toBe("A");
        expect(classification(6750)).toBe("F");
        expect(classification(5600)).toBe("G");
        expect(classification(4450)).toBe("K");
        expect(classification(3000)).toBe("M");
    });

    test('all classes in order', () => {
        const temps = [40000, 15000, 8000, 6500, 5500, 4000, 2000];
        const expected = ["O", "B", "A", "F", "G", "K", "M"];
        temps.forEach((temp, i) => {
            expect(classification(temp)).toBe(expected[i]);
        });
    });
});

describe('classification - systematic testing', () => {
    test('decreasing temperature sequence', () => {
        expect(classification(35000)).toBe("O");
        expect(classification(25000)).toBe("B");
        expect(classification(8500)).toBe("A");
        expect(classification(6800)).toBe("F");
        expect(classification(5500)).toBe("G");
        expect(classification(4500)).toBe("K");
        expect(classification(2500)).toBe("M");
    });

    test('increasing temperature sequence', () => {
        expect(classification(1500)).toBe("M");
        expect(classification(4200)).toBe("K");
        expect(classification(5400)).toBe("G");
        expect(classification(6300)).toBe("F");
        expect(classification(8200)).toBe("A");
        expect(classification(18000)).toBe("B");
        expect(classification(45000)).toBe("O");
    });
});

describe('classification - edge cases', () => {
    test('zero and very low', () => {
        expect(classification(0)).toBe("M");
        expect(classification(1)).toBe("M");
        expect(classification(10)).toBe("M");
    });

    test('very high temperatures', () => {
        expect(classification(100000)).toBe("O");
        expect(classification(500000)).toBe("O");
    });

    test('mid-range values', () => {
        expect(classification(10000)).toBe("B");
        expect(classification(15000)).toBe("B");
        expect(classification(20000)).toBe("B");
    });
});

describe('classification - realistic stellar temperatures', () => {
    test('common O-type stars', () => {
        expect(classification(30000)).toBe("O");
        expect(classification(35000)).toBe("O");
        expect(classification(40000)).toBe("O");
    });

    test('common B-type stars', () => {
        expect(classification(10000)).toBe("B");
        expect(classification(15000)).toBe("B");
        expect(classification(20000)).toBe("B");
    });

    test('common A-type stars', () => {
        expect(classification(7500)).toBe("A");
        expect(classification(8500)).toBe("A");
        expect(classification(9500)).toBe("A");
    });

    test('common F-type stars', () => {
        expect(classification(6000)).toBe("F");
        expect(classification(6500)).toBe("F");
        expect(classification(7000)).toBe("F");
    });

    test('common G-type stars', () => {
        expect(classification(5200)).toBe("G");
        expect(classification(5500)).toBe("G");
        expect(classification(5800)).toBe("G");
    });

    test('common K-type stars', () => {
        expect(classification(3700)).toBe("K");
        expect(classification(4200)).toBe("K");
        expect(classification(4800)).toBe("K");
    });

    test('common M-type stars', () => {
        expect(classification(2000)).toBe("M");
        expect(classification(2500)).toBe("M");
        expect(classification(3000)).toBe("M");
    });
});

describe('format - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(format(500)).toBe("8:20");
        expect(format(4000)).toBe("1:06:40");
        expect(format(1)).toBe("0:01");
        expect(format(5555)).toBe("1:32:35");
        expect(format(99999)).toBe("27:46:39");
    });
});

describe('format - zero and single digit seconds', () => {
    test('zero seconds', () => {
        expect(format(0)).toBe("0:00");
    });

    test('single digit seconds', () => {
        expect(format(1)).toBe("0:01");
        expect(format(5)).toBe("0:05");
        expect(format(9)).toBe("0:09");
    });

    test('double digit seconds', () => {
        expect(format(10)).toBe("0:10");
        expect(format(30)).toBe("0:30");
        expect(format(59)).toBe("0:59");
    });
});

describe('format - minutes without hours', () => {
    test('exactly one minute', () => {
        expect(format(60)).toBe("1:00");
    });

    test('multiple minutes no seconds', () => {
        expect(format(120)).toBe("2:00");
        expect(format(300)).toBe("5:00");
        expect(format(600)).toBe("10:00");
    });

    test('minutes with seconds', () => {
        expect(format(61)).toBe("1:01");
        expect(format(125)).toBe("2:05");
        expect(format(500)).toBe("8:20");
    });

    test('59 minutes', () => {
        expect(format(3540)).toBe("59:00");
        expect(format(3599)).toBe("59:59");
    });
});

describe('format - hours with minutes and seconds', () => {
    test('exactly one hour', () => {
        expect(format(3600)).toBe("1:00:00");
    });

    test('hours with no minutes or seconds', () => {
        expect(format(7200)).toBe("2:00:00");
        expect(format(10800)).toBe("3:00:00");
    });

    test('hours with minutes only', () => {
        expect(format(3660)).toBe("1:01:00");
        expect(format(3900)).toBe("1:05:00");
        expect(format(4200)).toBe("1:10:00");
    });

    test('hours with seconds only', () => {
        expect(format(3601)).toBe("1:00:01");
        expect(format(3605)).toBe("1:00:05");
        expect(format(3659)).toBe("1:00:59");
    });

    test('hours with minutes and seconds', () => {
        expect(format(3661)).toBe("1:01:01");
        expect(format(4000)).toBe("1:06:40");
        expect(format(5555)).toBe("1:32:35");
    });
});

describe('format - padding validation', () => {
    test('seconds always padded to 2 digits', () => {
        expect(format(1)).toBe("0:01");
        expect(format(61)).toBe("1:01");
        expect(format(3601)).toBe("1:00:01");
    });

    test('minutes not padded when no hours', () => {
        expect(format(60)).toBe("1:00");
        expect(format(600)).toBe("10:00");
        expect(format(3540)).toBe("59:00");
    });

    test('minutes padded to 2 digits when hours present', () => {
        expect(format(3660)).toBe("1:01:00");
        expect(format(3900)).toBe("1:05:00");
        expect(format(4200)).toBe("1:10:00");
    });

    test('hours never padded', () => {
        expect(format(3600)).toBe("1:00:00");
        expect(format(36000)).toBe("10:00:00");
        expect(format(360000)).toBe("100:00:00");
    });
});

describe('format - boundary cases', () => {
    test('59 seconds (just before 1 minute)', () => {
        expect(format(59)).toBe("0:59");
    });

    test('60 seconds (exactly 1 minute)', () => {
        expect(format(60)).toBe("1:00");
    });

    test('3599 seconds (just before 1 hour)', () => {
        expect(format(3599)).toBe("59:59");
    });

    test('3600 seconds (exactly 1 hour)', () => {
        expect(format(3600)).toBe("1:00:00");
    });
});

describe('format - large values', () => {
    test('multiple hours', () => {
        expect(format(7200)).toBe("2:00:00");
        expect(format(18000)).toBe("5:00:00");
        expect(format(36000)).toBe("10:00:00");
    });

    test('many hours', () => {
        expect(format(86400)).toBe("24:00:00");
        expect(format(99999)).toBe("27:46:39");
        expect(format(100000)).toBe("27:46:40");
    });

    test('very large values', () => {
        expect(format(360000)).toBe("100:00:00");
        expect(format(359999)).toBe("99:59:59");
    });
});

describe('format - return value validation', () => {
    test('returns string', () => {
        expect(typeof format(500)).toBe("string");
        expect(typeof format(0)).toBe("string");
        expect(typeof format(3600)).toBe("string");
    });

    test('contains colons', () => {
        expect(format(500)).toContain(":");
        expect(format(1)).toContain(":");
        expect(format(3600)).toContain(":");
    });

    test('format without hours has one colon', () => {
        expect(format(500).split(':').length).toBe(2);
        expect(format(1).split(':').length).toBe(2);
    });

    test('format with hours has two colons', () => {
        expect(format(3600).split(':').length).toBe(3);
        expect(format(4000).split(':').length).toBe(3);
    });
});

describe('format - time calculations', () => {
    test('verify 500 seconds = 8:20', () => {
        // 500 / 60 = 8 minutes, 20 seconds
        expect(format(500)).toBe("8:20");
    });

    test('verify 4000 seconds = 1:06:40', () => {
        // 4000 / 3600 = 1 hour, 400 seconds
        // 400 / 60 = 6 minutes, 40 seconds
        expect(format(4000)).toBe("1:06:40");
    });

    test('verify 5555 seconds = 1:32:35', () => {
        // 5555 / 3600 = 1 hour, 1955 seconds
        // 1955 / 60 = 32 minutes, 35 seconds
        expect(format(5555)).toBe("1:32:35");
    });

    test('verify 99999 seconds = 27:46:39', () => {
        // 99999 / 3600 = 27 hours, 2799 seconds
        // 2799 / 60 = 46 minutes, 39 seconds
        expect(format(99999)).toBe("27:46:39");
    });
});

describe('format - systematic coverage', () => {
    test('0-59 seconds range', () => {
        expect(format(0)).toBe("0:00");
        expect(format(15)).toBe("0:15");
        expect(format(30)).toBe("0:30");
        expect(format(45)).toBe("0:45");
        expect(format(59)).toBe("0:59");
    });

    test('1-59 minutes range', () => {
        expect(format(60)).toBe("1:00");
        expect(format(900)).toBe("15:00");
        expect(format(1800)).toBe("30:00");
        expect(format(2700)).toBe("45:00");
        expect(format(3540)).toBe("59:00");
    });

    test('various hours', () => {
        expect(format(3600)).toBe("1:00:00");
        expect(format(7200)).toBe("2:00:00");
        expect(format(10800)).toBe("3:00:00");
        expect(format(18000)).toBe("5:00:00");
        expect(format(36000)).toBe("10:00:00");
    });
});

describe('format - special patterns', () => {
    test('all maximum values within unit', () => {
        expect(format(59)).toBe("0:59");
        expect(format(3599)).toBe("59:59");
        expect(format(359999)).toBe("99:59:59");
    });

    test('all minimum values within unit', () => {
        expect(format(0)).toBe("0:00");
        expect(format(60)).toBe("1:00");
        expect(format(3600)).toBe("1:00:00");
    });

    test('repeating digits', () => {
        expect(format(3661)).toBe("1:01:01");
        expect(format(3666)).toBe("1:01:06");
        expect(format(7322)).toBe("2:02:02");
    });
});

describe('format - edge cases', () => {
    test('zero', () => {
        expect(format(0)).toBe("0:00");
    });

    test('one second', () => {
        expect(format(1)).toBe("0:01");
    });

    test('transitions', () => {
        expect(format(59)).toBe("0:59");
        expect(format(60)).toBe("1:00");
        expect(format(61)).toBe("1:01");
        expect(format(3599)).toBe("59:59");
        expect(format(3600)).toBe("1:00:00");
        expect(format(3601)).toBe("1:00:01");
    });
});

describe('format - realistic durations', () => {
    test('common video lengths', () => {
        expect(format(180)).toBe("3:00");
        expect(format(300)).toBe("5:00");
        expect(format(600)).toBe("10:00");
    });

    test('movie lengths', () => {
        expect(format(5400)).toBe("1:30:00");
        expect(format(7200)).toBe("2:00:00");
        expect(format(9000)).toBe("2:30:00");
    });

    test('common intervals', () => {
        expect(format(30)).toBe("0:30");
        expect(format(90)).toBe("1:30");
        expect(format(150)).toBe("2:30");
    });
});

describe('format - comprehensive time units', () => {
    test('each second 0-9', () => {
        expect(format(0)).toBe("0:00");
        expect(format(1)).toBe("0:01");
        expect(format(2)).toBe("0:02");
        expect(format(5)).toBe("0:05");
        expect(format(9)).toBe("0:09");
    });

    test('each minute 0-9', () => {
        expect(format(0)).toBe("0:00");
        expect(format(60)).toBe("1:00");
        expect(format(120)).toBe("2:00");
        expect(format(300)).toBe("5:00");
        expect(format(540)).toBe("9:00");
    });

    test('each hour 1-5', () => {
        expect(format(3600)).toBe("1:00:00");
        expect(format(7200)).toBe("2:00:00");
        expect(format(10800)).toBe("3:00:00");
        expect(format(14400)).toBe("4:00:00");
        expect(format(18000)).toBe("5:00:00");
    });
});

describe('format - mixed values', () => {
    test('various combinations', () => {
        expect(format(125)).toBe("2:05");
        expect(format(666)).toBe("11:06");
        expect(format(1234)).toBe("20:34");
        expect(format(4321)).toBe("1:12:01");
    });

    test('with different padding needs', () => {
        expect(format(3605)).toBe("1:00:05");
        expect(format(3650)).toBe("1:00:50");
        expect(format(3905)).toBe("1:05:05");
        expect(format(3950)).toBe("1:05:50");
    });
});

describe('sequence - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(sequence(5)).toBe("12345");
        expect(sequence(10)).toBe("12345678910");
        expect(sequence(1)).toBe("1");
        expect(sequence(27)).toBe("123456789101112131415161718192021222324252627");
    });
});

describe('sequence - single digit', () => {
    test('n = 1', () => {
        expect(sequence(1)).toBe("1");
    });

    test('n = 2-9', () => {
        expect(sequence(2)).toBe("12");
        expect(sequence(3)).toBe("123");
        expect(sequence(5)).toBe("12345");
        expect(sequence(9)).toBe("123456789");
    });
});

describe('sequence - double digit', () => {
    test('n = 10', () => {
        expect(sequence(10)).toBe("12345678910");
    });

    test('n = 11-19', () => {
        expect(sequence(11)).toBe("1234567891011");
        expect(sequence(15)).toBe("123456789101112131415");
    });

    test('n = 20-99', () => {
        expect(sequence(20)).toBe("1234567891011121314151617181920");
        expect(sequence(25)).toBe("12345678910111213141516171819202122232425");
    });
});

describe('sequence - triple digit', () => {
    test('n = 100', () => {
        const result = sequence(100);
        expect(result).toContain("100");
        expect(result.endsWith("100")).toBe(true);
    });

    test('n = 101-150', () => {
        const result = sequence(101);
        expect(result).toContain("100101");
        expect(result.endsWith("101")).toBe(true);
    });
});

describe('sequence - return value validation', () => {
    test('returns string', () => {
        expect(typeof sequence(5)).toBe("string");
        expect(typeof sequence(1)).toBe("string");
        expect(typeof sequence(100)).toBe("string");
    });

    test('starts with 1', () => {
        expect(sequence(1).startsWith("1")).toBe(true);
        expect(sequence(5).startsWith("1")).toBe(true);
        expect(sequence(100).startsWith("1")).toBe(true);
    });

    test('ends with n', () => {
        expect(sequence(5).endsWith("5")).toBe(true);
        expect(sequence(10).endsWith("10")).toBe(true);
        expect(sequence(27).endsWith("27")).toBe(true);
    });
});

describe('sequence - length validation', () => {
    test('single digit lengths', () => {
        expect(sequence(1).length).toBe(1);
        expect(sequence(2).length).toBe(2);
        expect(sequence(5).length).toBe(5);
        expect(sequence(9).length).toBe(9);
    });

    test('includes double digits', () => {
        // 1-9 = 9 chars, 10 = 2 chars, total = 11
        expect(sequence(10).length).toBe(11);
        // 1-9 = 9 chars, 10-15 = 12 chars, total = 21
        expect(sequence(15).length).toBe(21);
    });
});

describe('sequence - content validation', () => {
    test('contains all numbers 1 to n', () => {
        const result = sequence(5);
        expect(result).toContain("1");
        expect(result).toContain("2");
        expect(result).toContain("3");
        expect(result).toContain("4");
        expect(result).toContain("5");
    });

    test('numbers are in order', () => {
        expect(sequence(5)).toBe("12345");
        expect(sequence(3)).toBe("123");
    });

    test('no separators or spaces', () => {
        expect(sequence(10)).not.toContain(" ");
        expect(sequence(10)).not.toContain(",");
        expect(sequence(10)).not.toContain("-");
    });
});

describe('sequence - specific values', () => {
    test('small values', () => {
        expect(sequence(1)).toBe("1");
        expect(sequence(2)).toBe("12");
        expect(sequence(3)).toBe("123");
        expect(sequence(4)).toBe("1234");
    });

    test('boundary at 10', () => {
        expect(sequence(9)).toBe("123456789");
        expect(sequence(10)).toBe("12345678910");
        expect(sequence(11)).toBe("1234567891011");
    });

    test('teens', () => {
        expect(sequence(12)).toBe("123456789101112");
        expect(sequence(13)).toBe("12345678910111213");
    });

    test('twenties', () => {
        expect(sequence(20)).toBe("1234567891011121314151617181920");
        expect(sequence(21)).toBe("123456789101112131415161718192021");
    });
});

describe('sequence - pattern verification', () => {
    test('verify sequence(5)', () => {
        expect(sequence(5)).toBe("12345");
    });

    test('verify sequence(10)', () => {
        expect(sequence(10)).toBe("12345678910");
    });

    test('verify sequence(1)', () => {
        expect(sequence(1)).toBe("1");
    });

    test('verify sequence(27)', () => {
        expect(sequence(27)).toBe("123456789101112131415161718192021222324252627");
    });
});

describe('sequence - systematic coverage', () => {
    test('each single digit', () => {
        expect(sequence(1)).toBe("1");
        expect(sequence(2)).toBe("12");
        expect(sequence(3)).toBe("123");
        expect(sequence(4)).toBe("1234");
        expect(sequence(5)).toBe("12345");
        expect(sequence(6)).toBe("123456");
        expect(sequence(7)).toBe("1234567");
        expect(sequence(8)).toBe("12345678");
        expect(sequence(9)).toBe("123456789");
    });

    test('first few double digits', () => {
        expect(sequence(10)).toBe("12345678910");
        expect(sequence(11)).toBe("1234567891011");
        expect(sequence(12)).toBe("123456789101112");
    });
});

describe('sequence - multiples of 10', () => {
    test('10, 20, 30', () => {
        expect(sequence(10).endsWith("10")).toBe(true);
        expect(sequence(20).endsWith("20")).toBe(true);
        expect(sequence(30).endsWith("30")).toBe(true);
    });

    test('contains decade markers', () => {
        expect(sequence(20)).toContain("10");
        expect(sequence(30)).toContain("20");
        expect(sequence(50)).toContain("30");
    });
});

describe('sequence - edge cases', () => {
    test('minimum value', () => {
        expect(sequence(1)).toBe("1");
    });

    test('transition to double digits', () => {
        expect(sequence(9)).toBe("123456789");
        expect(sequence(10)).toBe("12345678910");
    });

    test('transition to triple digits', () => {
        expect(sequence(99).endsWith("99")).toBe(true);
        expect(sequence(100).endsWith("100")).toBe(true);
    });
});

describe('sequence - larger values', () => {
    test('50', () => {
        const result = sequence(50);
        expect(result.startsWith("1")).toBe(true);
        expect(result.endsWith("50")).toBe(true);
        expect(result).toContain("25");
    });

    test('100', () => {
        const result = sequence(100);
        expect(result.startsWith("1")).toBe(true);
        expect(result.endsWith("100")).toBe(true);
        expect(result).toContain("50");
    });
});

describe('sequence - number presence', () => {
    test('all numbers present in sequence(10)', () => {
        const result = sequence(10);
        for (let i = 1; i <= 10; i++) {
            expect(result).toContain(String(i));
        }
    });

    test('all numbers present in sequence(20)', () => {
        const result = sequence(20);
        for (let i = 1; i <= 20; i++) {
            expect(result).toContain(String(i));
        }
    });
});

describe('sequence - character composition', () => {
    test('contains only digits', () => {
        expect(sequence(5)).toMatch(/^\d+$/);
        expect(sequence(10)).toMatch(/^\d+$/);
        expect(sequence(27)).toMatch(/^\d+$/);
    });

    test('no special characters', () => {
        expect(sequence(10)).not.toMatch(/[^0-9]/);
        expect(sequence(27)).not.toMatch(/[^0-9]/);
    });
});

describe('sequence - specific patterns', () => {
    test('sequential nature', () => {
        expect(sequence(3)).toBe("123");
        expect(sequence(5)).toBe("12345");
    });

    test('no gaps or skips', () => {
        const result = sequence(15);
        for (let i = 1; i <= 15; i++) {
            expect(result).toContain(String(i));
        }
    });
});

describe('sequence - boundary values', () => {
    test('at digit boundaries', () => {
        expect(sequence(9).length).toBe(9);
        expect(sequence(10).length).toBe(11);
        expect(sequence(99).endsWith("99")).toBe(true);
        expect(sequence(100).endsWith("100")).toBe(true);
    });
});

describe('sequence - comprehensive test', () => {
    test('various values match expected', () => {
        expect(sequence(1)).toBe("1");
        expect(sequence(5)).toBe("12345");
        expect(sequence(10)).toBe("12345678910");
        expect(sequence(12)).toBe("123456789101112");
        expect(sequence(15)).toBe("123456789101112131415");
    });

    test('all start with 1', () => {
        for (let n = 1; n <= 20; n++) {
            expect(sequence(n).startsWith("1")).toBe(true);
        }
    });

    test('length increases appropriately', () => {
        expect(sequence(1).length).toBeLessThan(sequence(5).length);
        expect(sequence(5).length).toBeLessThan(sequence(10).length);
        expect(sequence(10).length).toBeLessThan(sequence(20).length);
    });
});

describe('navigate - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(navigate(["Visit About Us", "Back", "Forward"])).toBe("About Us");
        expect(navigate(["Forward"])).toBe("Home");
        expect(navigate(["Back"])).toBe("Home");
        expect(navigate(["Visit About Us", "Visit Gallery"])).toBe("Gallery");
        expect(navigate(["Visit About Us", "Visit Gallery", "Back", "Back"])).toBe("Home");
        expect(navigate(["Visit About", "Visit Gallery", "Back", "Visit Contact", "Forward"])).toBe("Contact");
        expect(navigate(["Visit About Us", "Visit Visit Us", "Forward", "Visit Contact Us", "Back"])).toBe("Visit Us");
    });
});

describe('navigate - starting state', () => {
    test('empty commands returns Home', () => {
        expect(navigate([])).toBe("Home");
    });

    test('always starts on Home', () => {
        expect(navigate(["Forward"])).toBe("Home");
        expect(navigate(["Back"])).toBe("Home");
    });
});

describe('navigate - visit command', () => {
    test('single visit', () => {
        expect(navigate(["Visit About"])).toBe("About");
        expect(navigate(["Visit Contact"])).toBe("Contact");
        expect(navigate(["Visit Gallery"])).toBe("Gallery");
    });

    test('multiple visits', () => {
        expect(navigate(["Visit About", "Visit Contact"])).toBe("Contact");
        expect(navigate(["Visit Page1", "Visit Page2", "Visit Page3"])).toBe("Page3");
    });

    test('visit with spaces in page name', () => {
        expect(navigate(["Visit About Us"])).toBe("About Us");
        expect(navigate(["Visit Contact Us"])).toBe("Contact Us");
    });

    test('visit page named Visit', () => {
        expect(navigate(["Visit Visit"])).toBe("Visit");
        expect(navigate(["Visit Visit Us"])).toBe("Visit Us");
    });
});

describe('navigate - back command', () => {
    test('back from home stays on home', () => {
        expect(navigate(["Back"])).toBe("Home");
    });

    test('back after one visit', () => {
        expect(navigate(["Visit About", "Back"])).toBe("Home");
    });

    test('back after multiple visits', () => {
        expect(navigate(["Visit About", "Visit Contact", "Back"])).toBe("About");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back"])).toBe("B");
    });

    test('multiple backs', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Back"])).toBe("Home");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back"])).toBe("A");
    });

    test('back beyond home stays on home', () => {
        expect(navigate(["Visit About", "Back", "Back"])).toBe("Home");
        expect(navigate(["Back", "Back", "Back"])).toBe("Home");
    });
});

describe('navigate - forward command', () => {
    test('forward from home with no history stays on home', () => {
        expect(navigate(["Forward"])).toBe("Home");
    });

    test('forward after back', () => {
        expect(navigate(["Visit About", "Back", "Forward"])).toBe("About");
    });

    test('forward restores position', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Forward"])).toBe("B");
    });

    test('multiple forwards after multiple backs', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Back", "Forward"])).toBe("A");
        expect(navigate(["Visit A", "Visit B", "Back", "Back", "Forward", "Forward"])).toBe("B");
    });

    test('forward beyond history stays at end', () => {
        expect(navigate(["Visit About", "Back", "Forward", "Forward"])).toBe("About");
    });
});

describe('navigate - visit clears forward history', () => {
    test('visit after back clears forward history', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Visit C"])).toBe("C");
    });

    test('forward after new visit does nothing', () => {
        expect(navigate(["Visit A", "Back", "Visit B", "Forward"])).toBe("B");
    });

    test('complex case with cleared history', () => {
        expect(navigate(["Visit About", "Visit Gallery", "Back", "Visit Contact", "Forward"])).toBe("Contact");
    });
});

describe('navigate - combined operations', () => {
    test('visit, back, forward cycle', () => {
        expect(navigate(["Visit About Us", "Back", "Forward"])).toBe("About Us");
    });

    test('multiple visits and backs', () => {
        expect(navigate(["Visit About Us", "Visit Gallery", "Back", "Back"])).toBe("Home");
    });

    test('visit, back, visit pattern', () => {
        expect(navigate(["Visit A", "Back", "Visit B"])).toBe("B");
        expect(navigate(["Visit A", "Visit B", "Back", "Visit C"])).toBe("C");
    });

    test('complex navigation', () => {
        expect(navigate(["Visit About Us", "Visit Visit Us", "Forward", "Visit Contact Us", "Back"])).toBe("Visit Us");
    });
});

describe('navigate - return value validation', () => {
    test('returns string', () => {
        expect(typeof navigate([])).toBe("string");
        expect(typeof navigate(["Visit About"])).toBe("string");
    });

    test('returns page name', () => {
        expect(navigate([])).toBe("Home");
        expect(navigate(["Visit About"])).toBe("About");
        expect(navigate(["Visit Gallery"])).toBe("Gallery");
    });
});

describe('navigate - edge cases', () => {
    test('empty commands', () => {
        expect(navigate([])).toBe("Home");
    });

    test('only back commands', () => {
        expect(navigate(["Back"])).toBe("Home");
        expect(navigate(["Back", "Back", "Back"])).toBe("Home");
    });

    test('only forward commands', () => {
        expect(navigate(["Forward"])).toBe("Home");
        expect(navigate(["Forward", "Forward", "Forward"])).toBe("Home");
    });

    test('back and forward without visits', () => {
        expect(navigate(["Back", "Forward"])).toBe("Home");
        expect(navigate(["Forward", "Back"])).toBe("Home");
    });
});

describe('navigate - page names', () => {
    test('simple page names', () => {
        expect(navigate(["Visit Home"])).toBe("Home");
        expect(navigate(["Visit About"])).toBe("About");
        expect(navigate(["Visit Contact"])).toBe("Contact");
    });

    test('page names with spaces', () => {
        expect(navigate(["Visit About Us"])).toBe("About Us");
        expect(navigate(["Visit Contact Us"])).toBe("Contact Us");
        expect(navigate(["Visit Our Gallery"])).toBe("Our Gallery");
    });

    test('page name is Visit', () => {
        expect(navigate(["Visit Visit"])).toBe("Visit");
        expect(navigate(["Visit Visit Us"])).toBe("Visit Us");
    });
});

describe('navigate - history tracking', () => {
    test('back traverses history correctly', () => {
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back"])).toBe("B");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back"])).toBe("A");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back", "Back"])).toBe("Home");
    });

    test('forward uses saved history', () => {
        expect(navigate(["Visit A", "Back", "Forward"])).toBe("A");
        expect(navigate(["Visit A", "Visit B", "Back", "Forward"])).toBe("B");
    });

    test('visit clears future history', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Visit C", "Forward"])).toBe("C");
    });
});

describe('navigate - systematic patterns', () => {
    test('linear forward navigation', () => {
        expect(navigate(["Visit A"])).toBe("A");
        expect(navigate(["Visit A", "Visit B"])).toBe("B");
        expect(navigate(["Visit A", "Visit B", "Visit C"])).toBe("C");
    });

    test('linear backward navigation', () => {
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back"])).toBe("B");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back"])).toBe("A");
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back", "Back"])).toBe("Home");
    });

    test('back and forward alternating', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Forward"])).toBe("B");
        expect(navigate(["Visit A", "Visit B", "Back", "Forward", "Back"])).toBe("A");
        expect(navigate(["Visit A", "Visit B", "Back", "Forward", "Back", "Forward"])).toBe("B");
    });
});

describe('navigate - realistic scenarios', () => {
    test('typical browsing session', () => {
        expect(navigate(["Visit Home", "Visit About", "Visit Contact"])).toBe("Contact");
        expect(navigate(["Visit Products", "Visit Details", "Back", "Visit Cart"])).toBe("Cart");
    });

    test('browse and return', () => {
        expect(navigate(["Visit Gallery", "Visit Photo1", "Back", "Visit Photo2"])).toBe("Photo2");
    });

    test('deep navigation with backtracking', () => {
        expect(navigate(["Visit A", "Visit B", "Visit C", "Visit D", "Back", "Back"])).toBe("B");
    });
});

describe('navigate - boundary conditions', () => {
    test('maximum backs', () => {
        expect(navigate(["Visit A", "Back", "Back", "Back"])).toBe("Home");
    });

    test('maximum forwards', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Back", "Forward", "Forward", "Forward"])).toBe("B");
    });

    test('alternating at boundaries', () => {
        expect(navigate(["Back", "Forward", "Back"])).toBe("Home");
        expect(navigate(["Visit A", "Forward", "Back", "Forward"])).toBe("A");
    });
});

describe('navigate - complex sequences', () => {
    test('sequence 1', () => {
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back", "Visit D"])).toBe("D");
    });

    test('sequence 2', () => {
        expect(navigate(["Visit A", "Back", "Visit B", "Back", "Visit C"])).toBe("C");
    });

    test('sequence 3', () => {
        expect(navigate(["Visit A", "Visit B", "Back", "Forward", "Visit C"])).toBe("C");
    });

    test('sequence 4', () => {
        expect(navigate(["Visit A", "Visit B", "Visit C", "Back", "Back", "Forward", "Forward"])).toBe("C");
    });
});

describe('sort - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(sort(["jill@mail.com", "john@example.com", "jane@example.com"])).toEqual(["jane@example.com", "john@example.com", "jill@mail.com"]);
        expect(sort(["bob@mail.com", "alice@zoo.com", "carol@mail.com"])).toEqual(["bob@mail.com", "carol@mail.com", "alice@zoo.com"]);
        expect(sort(["user@z.com", "user@y.com", "user@x.com"])).toEqual(["user@x.com", "user@y.com", "user@z.com"]);
        expect(sort(["sam@MAIL.com", "amy@mail.COM", "bob@Mail.com"])).toEqual(["amy@mail.COM", "bob@Mail.com", "sam@MAIL.com"]);
        expect(sort(["simon@beta.com", "sammy@alpha.com", "Sarah@Alpha.com", "SAM@ALPHA.com", "Simone@Beta.com", "sara@alpha.com"])).toEqual(["SAM@ALPHA.com", "sammy@alpha.com", "sara@alpha.com", "Sarah@Alpha.com", "simon@beta.com", "Simone@Beta.com"]);
    });
});

describe('sort - single email', () => {
    test('single email returns same', () => {
        expect(sort(["user@example.com"])).toEqual(["user@example.com"]);
    });

    test('empty array', () => {
        expect(sort([])).toEqual([]);
    });
});

describe('sort - same domain sorting', () => {
    test('sort by username when same domain', () => {
        expect(sort(["bob@mail.com", "alice@mail.com"])).toEqual(["alice@mail.com", "bob@mail.com"]);
        expect(sort(["charlie@mail.com", "alice@mail.com", "bob@mail.com"])).toEqual(["alice@mail.com", "bob@mail.com", "charlie@mail.com"]);
    });

    test('alphabetical by username', () => {
        expect(sort(["z@test.com", "a@test.com", "m@test.com"])).toEqual(["a@test.com", "m@test.com", "z@test.com"]);
    });
});

describe('sort - different domain sorting', () => {
    test('sort by domain first', () => {
        expect(sort(["user@z.com", "user@a.com"])).toEqual(["user@a.com", "user@z.com"]);
    });

    test('domain takes precedence over username', () => {
        expect(sort(["alice@zoo.com", "zoe@alpha.com"])).toEqual(["zoe@alpha.com", "alice@zoo.com"]);
    });

    test('multiple domains', () => {
        expect(sort(["user@c.com", "user@a.com", "user@b.com"])).toEqual(["user@a.com", "user@b.com", "user@c.com"]);
    });
});

describe('sort - case insensitive sorting', () => {
    test('domain case insensitive', () => {
        expect(sort(["user@MAIL.com", "user@mail.com"])).toEqual(["user@MAIL.com", "user@mail.com"]);
        expect(sort(["user@Zoo.com", "user@alpha.com"])).toEqual(["user@alpha.com", "user@Zoo.com"]);
    });

    test('username case insensitive', () => {
        expect(sort(["BOB@mail.com", "alice@mail.com"])).toEqual(["alice@mail.com", "BOB@mail.com"]);
        expect(sort(["ZACK@mail.com", "Amy@mail.com"])).toEqual(["Amy@mail.com", "ZACK@mail.com"]);
    });

    test('mixed case sorting', () => {
        expect(sort(["sam@MAIL.com", "amy@mail.COM", "bob@Mail.com"])).toEqual(["amy@mail.COM", "bob@Mail.com", "sam@MAIL.com"]);
    });
});

describe('sort - original case preservation', () => {
    test('preserves original case in output', () => {
        const result = sort(["Bob@Mail.com", "Alice@Mail.com"]);
        expect(result).toEqual(["Alice@Mail.com", "Bob@Mail.com"]);
        expect(result[0]).toBe("Alice@Mail.com");
        expect(result[1]).toBe("Bob@Mail.com");
    });

    test('case preserved with mixed domains', () => {
        const result = sort(["USER@EXAMPLE.COM", "user@test.com"]);
        expect(result).toEqual(["USER@EXAMPLE.COM", "user@test.com"]);
    });
});

describe('sort - return value validation', () => {
    test('returns array', () => {
        expect(Array.isArray(sort(["user@test.com"]))).toBe(true);
        expect(Array.isArray(sort([]))).toBe(true);
    });

    test('returns new array', () => {
        const original = ["b@mail.com", "a@mail.com"];
        const result = sort(original);
        expect(result).not.toBe(original);
        expect(original).toEqual(["b@mail.com", "a@mail.com"]);
    });

    test('same length as input', () => {
        expect(sort(["a@test.com", "b@test.com"]).length).toBe(2);
        expect(sort(["a@test.com"]).length).toBe(1);
        expect(sort([]).length).toBe(0);
    });
});

describe('sort - complex sorting scenarios', () => {
    test('multiple users, multiple domains', () => {
        expect(sort(["john@zoo.com", "alice@alpha.com", "bob@alpha.com"])).toEqual(["alice@alpha.com", "bob@alpha.com", "john@zoo.com"]);
    });

    test('mixed case complex', () => {
        expect(sort(["simon@beta.com", "sammy@alpha.com", "Sarah@Alpha.com", "SAM@ALPHA.com", "Simone@Beta.com", "sara@alpha.com"])).toEqual(["SAM@ALPHA.com", "sammy@alpha.com", "sara@alpha.com", "Sarah@Alpha.com", "simon@beta.com", "Simone@Beta.com"]);
    });
});

describe('sort - alphabetical order verification', () => {
    test('usernames in alphabetical order', () => {
        expect(sort(["charlie@test.com", "alice@test.com", "bob@test.com"])).toEqual(["alice@test.com", "bob@test.com", "charlie@test.com"]);
    });

    test('domains in alphabetical order', () => {
        expect(sort(["user@c.com", "user@a.com", "user@b.com"])).toEqual(["user@a.com", "user@b.com", "user@c.com"]);
    });
});

describe('sort - edge cases', () => {
    test('empty array', () => {
        expect(sort([])).toEqual([]);
    });

    test('single element', () => {
        expect(sort(["user@test.com"])).toEqual(["user@test.com"]);
    });

    test('all same email', () => {
        expect(sort(["user@test.com", "user@test.com"])).toEqual(["user@test.com", "user@test.com"]);
    });

    test('all same domain different users', () => {
        expect(sort(["c@test.com", "a@test.com", "b@test.com"])).toEqual(["a@test.com", "b@test.com", "c@test.com"]);
    });

    test('all same user different domains', () => {
        expect(sort(["user@z.com", "user@a.com", "user@m.com"])).toEqual(["user@a.com", "user@m.com", "user@z.com"]);
    });
});

describe('sort - sorting stability', () => {
    test('maintains relative order for same emails', () => {
        const result = sort(["user@test.com", "user@test.com"]);
        expect(result).toEqual(["user@test.com", "user@test.com"]);
    });
});

describe('sort - two element arrays', () => {
    test('already sorted', () => {
        expect(sort(["alice@test.com", "bob@test.com"])).toEqual(["alice@test.com", "bob@test.com"]);
    });

    test('needs sorting', () => {
        expect(sort(["bob@test.com", "alice@test.com"])).toEqual(["alice@test.com", "bob@test.com"]);
    });

    test('different domains', () => {
        expect(sort(["user@z.com", "user@a.com"])).toEqual(["user@a.com", "user@z.com"]);
    });
});

describe('sort - three element arrays', () => {
    test('reverse order', () => {
        expect(sort(["c@test.com", "b@test.com", "a@test.com"])).toEqual(["a@test.com", "b@test.com", "c@test.com"]);
    });

    test('partial order', () => {
        expect(sort(["b@test.com", "a@test.com", "c@test.com"])).toEqual(["a@test.com", "b@test.com", "c@test.com"]);
    });

    test('mixed domains', () => {
        expect(sort(["jill@mail.com", "john@example.com", "jane@example.com"])).toEqual(["jane@example.com", "john@example.com", "jill@mail.com"]);
    });
});

describe('sort - domain priority', () => {
    test('domain always takes priority', () => {
        expect(sort(["z@a.com", "a@z.com"])).toEqual(["z@a.com", "a@z.com"]);
    });

    test('domain overrides username', () => {
        expect(sort(["alice@zoo.com", "zack@alpha.com"])).toEqual(["zack@alpha.com", "alice@zoo.com"]);
    });
});

describe('sort - username sorting within domain', () => {
    test('multiple users same domain', () => {
        expect(sort(["bob@mail.com", "carol@mail.com", "alice@mail.com"])).toEqual(["alice@mail.com", "bob@mail.com", "carol@mail.com"]);
    });

    test('reverse alphabetical users', () => {
        expect(sort(["z@test.com", "y@test.com", "x@test.com"])).toEqual(["x@test.com", "y@test.com", "z@test.com"]);
    });
});

describe('sort - comprehensive scenarios', () => {
    test('large mixed list', () => {
        const input = [
            "user3@domain2.com",
            "user1@domain1.com",
            "user2@domain1.com",
            "user1@domain2.com"
        ];
        const expected = [
            "user1@domain1.com",
            "user2@domain1.com",
            "user1@domain2.com",
            "user3@domain2.com"
        ];
        expect(sort(input)).toEqual(expected);
    });

    test('all different combinations', () => {
        const input = [
            "charlie@zoo.com",
            "alice@alpha.com",
            "bob@alpha.com",
            "dana@zoo.com"
        ];
        const expected = [
            "alice@alpha.com",
            "bob@alpha.com",
            "charlie@zoo.com",
            "dana@zoo.com"
        ];
        expect(sort(input)).toEqual(expected);
    });
});

describe('sort - case variations', () => {
    test('all uppercase', () => {
        expect(sort(["BOB@MAIL.COM", "ALICE@MAIL.COM"])).toEqual(["ALICE@MAIL.COM", "BOB@MAIL.COM"]);
    });

    test('all lowercase', () => {
        expect(sort(["bob@mail.com", "alice@mail.com"])).toEqual(["alice@mail.com", "bob@mail.com"]);
    });

    test('mixed case patterns', () => {
        expect(sort(["BoB@MaIl.CoM", "AlIcE@MaIl.CoM"])).toEqual(["AlIcE@MaIl.CoM", "BoB@MaIl.CoM"]);
    });
});

describe('sort - same username different domains', () => {
    test('user sorted by domain', () => {
        expect(sort(["user@z.com", "user@y.com", "user@x.com"])).toEqual(["user@x.com", "user@y.com", "user@z.com"]);
    });

    test('domain order matters', () => {
        expect(sort(["test@c.com", "test@a.com", "test@b.com"])).toEqual(["test@a.com", "test@b.com", "test@c.com"]);
    });
});

describe('sort - immutability', () => {
    test('does not modify original array', () => {
        const original = ["b@test.com", "a@test.com"];
        const originalCopy = [...original];
        sort(original);
        expect(original).toEqual(originalCopy);
    });

    test('returns new sorted array', () => {
        const original = ["b@test.com", "a@test.com"];
        const result = sort(original);
        expect(result).toEqual(["a@test.com", "b@test.com"]);
        expect(original).toEqual(["b@test.com", "a@test.com"]);
    });
});

describe('nthPrime - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(nthPrime(5)).toBe(11);
        expect(nthPrime(10)).toBe(29);
        expect(nthPrime(16)).toBe(53);
        expect(nthPrime(99)).toBe(523);
        expect(nthPrime(1000)).toBe(7919);
    });
});

describe('nthPrime - first primes', () => {
    test('1st prime', () => {
        expect(nthPrime(1)).toBe(2);
    });

    test('2nd prime', () => {
        expect(nthPrime(2)).toBe(3);
    });

    test('3rd prime', () => {
        expect(nthPrime(3)).toBe(5);
    });

    test('4th prime', () => {
        expect(nthPrime(4)).toBe(7);
    });

    test('5th prime', () => {
        expect(nthPrime(5)).toBe(11);
    });
});

describe('nthPrime - first 10 primes', () => {
    test('primes 1-5', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2)).toBe(3);
        expect(nthPrime(3)).toBe(5);
        expect(nthPrime(4)).toBe(7);
        expect(nthPrime(5)).toBe(11);
    });

    test('primes 6-10', () => {
        expect(nthPrime(6)).toBe(13);
        expect(nthPrime(7)).toBe(17);
        expect(nthPrime(8)).toBe(19);
        expect(nthPrime(9)).toBe(23);
        expect(nthPrime(10)).toBe(29);
    });
});

describe('nthPrime - primes 11-20', () => {
    test('primes 11-15', () => {
        expect(nthPrime(11)).toBe(31);
        expect(nthPrime(12)).toBe(37);
        expect(nthPrime(13)).toBe(41);
        expect(nthPrime(14)).toBe(43);
        expect(nthPrime(15)).toBe(47);
    });

    test('primes 16-20', () => {
        expect(nthPrime(16)).toBe(53);
        expect(nthPrime(17)).toBe(59);
        expect(nthPrime(18)).toBe(61);
        expect(nthPrime(19)).toBe(67);
        expect(nthPrime(20)).toBe(71);
    });
});

describe('nthPrime - primes 21-30', () => {
    test('primes 21-25', () => {
        expect(nthPrime(21)).toBe(73);
        expect(nthPrime(22)).toBe(79);
        expect(nthPrime(23)).toBe(83);
        expect(nthPrime(24)).toBe(89);
        expect(nthPrime(25)).toBe(97);
    });

    test('primes 26-30', () => {
        expect(nthPrime(26)).toBe(101);
        expect(nthPrime(27)).toBe(103);
        expect(nthPrime(28)).toBe(107);
        expect(nthPrime(29)).toBe(109);
        expect(nthPrime(30)).toBe(113);
    });
});

describe('nthPrime - milestone primes', () => {
    test('10th prime', () => {
        expect(nthPrime(10)).toBe(29);
    });

    test('25th prime', () => {
        expect(nthPrime(25)).toBe(97);
    });

    test('50th prime', () => {
        expect(nthPrime(50)).toBe(229);
    });

    test('100th prime', () => {
        expect(nthPrime(100)).toBe(541);
    });
});

describe('nthPrime - return value validation', () => {
    test('returns number', () => {
        expect(typeof nthPrime(1)).toBe("number");
        expect(typeof nthPrime(5)).toBe("number");
        expect(typeof nthPrime(10)).toBe("number");
    });

    test('returns positive integer', () => {
        expect(nthPrime(1)).toBeGreaterThan(0);
        expect(Number.isInteger(nthPrime(1))).toBe(true);
    });

    test('returns prime number', () => {
        const result = nthPrime(5);
        expect(result).toBe(11);
    });
});

describe('nthPrime - prime properties', () => {
    test('all results are greater than 1', () => {
        expect(nthPrime(1)).toBeGreaterThan(1);
        expect(nthPrime(5)).toBeGreaterThan(1);
        expect(nthPrime(10)).toBeGreaterThan(1);
    });

    test('results increase with n', () => {
        expect(nthPrime(1)).toBeLessThan(nthPrime(2));
        expect(nthPrime(5)).toBeLessThan(nthPrime(10));
        expect(nthPrime(10)).toBeLessThan(nthPrime(20));
    });
});

describe('nthPrime - specific values', () => {
    test('single digit n', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(5)).toBe(11);
        expect(nthPrime(9)).toBe(23);
    });

    test('double digit n', () => {
        expect(nthPrime(10)).toBe(29);
        expect(nthPrime(50)).toBe(229);
        expect(nthPrime(99)).toBe(523);
    });

    test('triple digit n', () => {
        expect(nthPrime(100)).toBe(541);
        expect(nthPrime(200)).toBe(1223);
    });
});

describe('nthPrime - larger values', () => {
    test('100th prime', () => {
        expect(nthPrime(100)).toBe(541);
    });

    test('200th prime', () => {
        expect(nthPrime(200)).toBe(1223);
    });

    test('500th prime', () => {
        expect(nthPrime(500)).toBe(3571);
    });
});

describe('nthPrime - edge cases', () => {
    test('first prime', () => {
        expect(nthPrime(1)).toBe(2);
    });

    test('2 is the only even prime', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2)).not.toBe(4);
        expect(nthPrime(2)).toBe(3);
    });
});

describe('nthPrime - sequential verification', () => {
    test('first 5 primes in sequence', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2)).toBe(3);
        expect(nthPrime(3)).toBe(5);
        expect(nthPrime(4)).toBe(7);
        expect(nthPrime(5)).toBe(11);
    });

    test('primes 6-10 in sequence', () => {
        expect(nthPrime(6)).toBe(13);
        expect(nthPrime(7)).toBe(17);
        expect(nthPrime(8)).toBe(19);
        expect(nthPrime(9)).toBe(23);
        expect(nthPrime(10)).toBe(29);
    });
});

describe('nthPrime - known prime sequences', () => {
    test('twin primes included', () => {
        expect(nthPrime(2)).toBe(3);
        expect(nthPrime(3)).toBe(5);
        expect(nthPrime(5)).toBe(11);
        expect(nthPrime(6)).toBe(13);
    });

    test('primes around 100', () => {
        expect(nthPrime(25)).toBe(97);
        expect(nthPrime(26)).toBe(101);
        expect(nthPrime(27)).toBe(103);
    });
});

describe('nthPrime - boundary testing', () => {
    test('small n values', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2)).toBe(3);
        expect(nthPrime(3)).toBe(5);
    });

    test('medium n values', () => {
        expect(nthPrime(50)).toBe(229);
        expect(nthPrime(100)).toBe(541);
    });

    test('large n values', () => {
        expect(nthPrime(500)).toBe(3571);
        expect(nthPrime(1000)).toBe(7919);
    });
});

describe('nthPrime - correctness verification', () => {
    test('verify 5th prime is 11', () => {
        expect(nthPrime(5)).toBe(11);
    });

    test('verify 10th prime is 29', () => {
        expect(nthPrime(10)).toBe(29);
    });

    test('verify 16th prime is 53', () => {
        expect(nthPrime(16)).toBe(53);
    });

    test('verify 99th prime is 523', () => {
        expect(nthPrime(99)).toBe(523);
    });

    test('verify 1000th prime is 7919', () => {
        expect(nthPrime(1000)).toBe(7919);
    });
});

describe('nthPrime - consistency checks', () => {
    test('same input produces same output', () => {
        expect(nthPrime(5)).toBe(nthPrime(5));
        expect(nthPrime(10)).toBe(nthPrime(10));
    });

    test('different inputs produce different outputs', () => {
        expect(nthPrime(5)).not.toBe(nthPrime(6));
        expect(nthPrime(10)).not.toBe(nthPrime(11));
    });
});

describe('nthPrime - prime number properties', () => {
    test('result greater than n for n > 1', () => {
        expect(nthPrime(5)).toBeGreaterThan(5);
        expect(nthPrime(10)).toBeGreaterThan(10);
        expect(nthPrime(20)).toBeGreaterThan(20);
    });

    test('results are odd except first', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2) % 2).toBe(1);
        expect(nthPrime(3) % 2).toBe(1);
        expect(nthPrime(4) % 2).toBe(1);
    });
});

describe('nthPrime - comprehensive coverage', () => {
    test('primes under 30', () => {
        expect(nthPrime(1)).toBe(2);
        expect(nthPrime(2)).toBe(3);
        expect(nthPrime(3)).toBe(5);
        expect(nthPrime(4)).toBe(7);
        expect(nthPrime(5)).toBe(11);
        expect(nthPrime(6)).toBe(13);
        expect(nthPrime(7)).toBe(17);
        expect(nthPrime(8)).toBe(19);
        expect(nthPrime(9)).toBe(23);
        expect(nthPrime(10)).toBe(29);
    });

    test('every 10th prime', () => {
        expect(nthPrime(10)).toBe(29);
        expect(nthPrime(20)).toBe(71);
        expect(nthPrime(30)).toBe(113);
    });
});

describe('nthPrime - mathematical accuracy', () => {
    test('correct prime sequence', () => {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        for (let i = 0; i < primes.length; i++) {
            expect(nthPrime(i + 1)).toBe(primes[i]);
        }
    });
});

describe('hasExoplanet - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(hasExoplanet("665544554")).toBe(false);
        expect(hasExoplanet("FGFFCFFGG")).toBe(true);
        expect(hasExoplanet("MONOPLONOMONPLNOMPNOMP")).toBe(false);
        expect(hasExoplanet("FREECODECAMP")).toBe(true);
        expect(hasExoplanet("9AB98AB9BC98A")).toBe(false);
        expect(hasExoplanet("ZXXWYZXYWYXZEGZXWYZXYGEE")).toBe(true);
    });
});

describe('hasExoplanet - character conversion', () => {
    test('digits 0-9', () => {
        expect(hasExoplanet("012")).toBe(true);
        expect(hasExoplanet("555")).toBe(false);
    });

    test('letters A-Z', () => {
        expect(hasExoplanet("AAA")).toBe(false);
        expect(hasExoplanet("ZZZ")).toBe(false);
    });

    test('mixed digits and letters', () => {
        expect(hasExoplanet("5A5A5A")).toBe(true);
    });
});

describe('hasExoplanet - no exoplanet detected', () => {
    test('all same values', () => {
        expect(hasExoplanet("555")).toBe(false);
        expect(hasExoplanet("AAA")).toBe(false);
    });

    test('uniform readings', () => {
        expect(hasExoplanet("665544554")).toBe(false);
    });

    test('all readings above threshold', () => {
        expect(hasExoplanet("999")).toBe(false);
    });
});

describe('hasExoplanet - exoplanet detected', () => {
    test('one low reading', () => {
        expect(hasExoplanet("AAA0")).toBe(true);
    });

    test('multiple low readings', () => {
        expect(hasExoplanet("AA00")).toBe(true);
    });

    test('reading at exactly 80% threshold', () => {
        expect(hasExoplanet("AAAA8")).toBe(false);
    });
});

describe('hasExoplanet - threshold calculation', () => {
    test('average of 10, threshold of 8', () => {
        expect(hasExoplanet("AAA8")).toBe(false);
    });

    test('readings just above threshold', () => {
        expect(hasExoplanet("AAA9")).toBe(false);
    });
});

describe('hasExoplanet - return value validation', () => {
    test('returns boolean', () => {
        expect(typeof hasExoplanet("555")).toBe("boolean");
        expect(typeof hasExoplanet("AAA0")).toBe("boolean");
    });

    test('returns true or false', () => {
        const result1 = hasExoplanet("555");
        expect([true, false]).toContain(result1);
        
        const result2 = hasExoplanet("AAA0");
        expect([true, false]).toContain(result2);
    });
});

describe('hasExoplanet - edge cases', () => {
    test('single character', () => {
        expect(hasExoplanet("5")).toBe(false);
        expect(hasExoplanet("A")).toBe(false);
    });

    test('two characters', () => {
        expect(hasExoplanet("55")).toBe(false);
        expect(hasExoplanet("59")).toBe(true);
    });

    test('all zeros', () => {
        expect(hasExoplanet("000")).toBe(true);
    });

    test('all high values', () => {
        expect(hasExoplanet("ZZZ")).toBe(false);
    });
});

describe('hasExoplanet - numeric readings', () => {
    test('all digits', () => {
        expect(hasExoplanet("555")).toBe(false);
        expect(hasExoplanet("999")).toBe(false);
    });

    test('mixed digits with dip', () => {
        expect(hasExoplanet("9990")).toBe(true);
        expect(hasExoplanet("5551")).toBe(true);
    });

    test('no significant dip', () => {
        expect(hasExoplanet("665544554")).toBe(false);
    });
});

describe('hasExoplanet - alphabetic readings', () => {
    test('all same letter', () => {
        expect(hasExoplanet("FFF")).toBe(false);
        expect(hasExoplanet("GGG")).toBe(false);
    });

    test('with significant dip', () => {
        expect(hasExoplanet("FGFFCFFGG")).toBe(true);
    });

    test('no significant dip', () => {
        expect(hasExoplanet("MONOPLONOMONPLNOMPNOMP")).toBe(false);
    });
});

describe('hasExoplanet - mixed alphanumeric', () => {
    test('letters and numbers', () => {
        expect(hasExoplanet("A0A0A0")).toBe(true);
    });

    test('no dip detected', () => {
        expect(hasExoplanet("9AB98AB9BC98A")).toBe(false);
    });

    test('dip detected', () => {
        expect(hasExoplanet("FREECODECAMP")).toBe(true);
    });
});

describe('hasExoplanet - transit detection', () => {
    test('single transit', () => {
        expect(hasExoplanet("AAAA0AAAA")).toBe(true);
    });

    test('multiple transits', () => {
        expect(hasExoplanet("AAA0AAA0AAA")).toBe(true);
    });

    test('no transit', () => {
        expect(hasExoplanet("AAAAAAA")).toBe(false);
    });
});

describe('hasExoplanet - 80% threshold', () => {
    test('exactly at 80%', () => {
        expect(hasExoplanet("AAAA8")).toBe(false);
    });

    test('just below 80%', () => {
        expect(hasExoplanet("AAAA7")).toBe(true);
    });

    test('just above 80%', () => {
        const result = hasExoplanet("AAAA9");
        expect(typeof result).toBe("boolean");
    });
});

describe('hasExoplanet - luminosity values', () => {
    test('0-9 maps to 0-9', () => {
        expect(hasExoplanet("555")).toBe(false);
    });

    test('A-Z maps to 10-35', () => {
        expect(hasExoplanet("AAA")).toBe(false);
        expect(hasExoplanet("ZZZ")).toBe(false);
    });
});

describe('hasExoplanet - average calculation', () => {
    test('simple average', () => {
        expect(hasExoplanet("248")).toBe(true);
    });

    test('all same value', () => {
        expect(hasExoplanet("555")).toBe(false);
    });
});

describe('hasExoplanet - complex patterns', () => {
    test('gradual decrease', () => {
        expect(hasExoplanet("ZYXWVU")).toBe(false);
    });

    test('gradual increase', () => {
        expect(hasExoplanet("ABCDEFG")).toBe(true);
    });

    test('stable readings', () => {
        expect(hasExoplanet("MMMMMM")).toBe(false);
    });
});

describe('hasExoplanet - realistic scenarios', () => {
    test('star with exoplanet', () => {
        expect(hasExoplanet("FGFFCFFGG")).toBe(true);
        expect(hasExoplanet("FREECODECAMP")).toBe(true);
        expect(hasExoplanet("ZXXWYZXYWYXZEGZXWYZXYGEE")).toBe(true);
    });

    test('star without exoplanet', () => {
        expect(hasExoplanet("665544554")).toBe(false);
        expect(hasExoplanet("MONOPLONOMONPLNOMPNOMP")).toBe(false);
        expect(hasExoplanet("9AB98AB9BC98A")).toBe(false);
    });
});

describe('hasExoplanet - boundary conditions', () => {
    test('minimum length', () => {
        expect(hasExoplanet("A")).toBe(false);
    });

    test('two identical readings', () => {
        expect(hasExoplanet("AA")).toBe(false);
    });

    test('two different readings', () => {
        expect(hasExoplanet("AZ")).toBe(true);
    });
});

describe('hasExoplanet - long sequences', () => {
    test('long stable sequence', () => {
        expect(hasExoplanet("MMMMMMMMMMMMMMMMMMMM")).toBe(false);
    });

    test('long sequence with dip', () => {
        expect(hasExoplanet("MMMMMMMMMM0MMMMMMMMMM")).toBe(true);
    });
});

describe('hasExoplanet - verification tests', () => {
    test('verify 665544554', () => {
        expect(hasExoplanet("665544554")).toBe(false);
    });

    test('verify FGFFCFFGG', () => {
        expect(hasExoplanet("FGFFCFFGG")).toBe(true);
    });

    test('verify MONOPLONOMONPLNOMPNOMP', () => {
        expect(hasExoplanet("MONOPLONOMONPLNOMPNOMP")).toBe(false);
    });

    test('verify FREECODECAMP', () => {
        expect(hasExoplanet("FREECODECAMP")).toBe(true);
    });

    test('verify 9AB98AB9BC98A', () => {
        expect(hasExoplanet("9AB98AB9BC98A")).toBe(false);
    });

    test('verify ZXXWYZXYWYXZEGZXWYZXYGEE', () => {
        expect(hasExoplanet("ZXXWYZXYWYXZEGZXWYZXYGEE")).toBe(true);
    });
});

describe('hasExoplanet - various readings', () => {
    test('all low values', () => {
        expect(hasExoplanet("000")).toBe(true);
        expect(hasExoplanet("111")).toBe(false);
    });

    test('all high values', () => {
        expect(hasExoplanet("XYZ")).toBe(false);
    });

    test('mixed with clear dip', () => {
        expect(hasExoplanet("ZZZ0")).toBe(true);
    });
});

describe('sendMessage - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
        expect(sendMessage([384400, 384400])).toBe(3.0627);
        expect(sendMessage([54600000, 54600000])).toBe(364.5);
        expect(sendMessage([1000000, 500000000, 1000000])).toBe(1674.3333);
        expect(sendMessage([10000, 21339, 50000, 31243, 10000])).toBe(2.4086);
        expect(sendMessage([802101, 725994, 112808, 3625770, 481239])).toBe(21.1597);
    });
});

describe('sendMessage - two-hop route', () => {
    test('equal distances', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
    });

    test('unequal distances', () => {
        expect(sendMessage([150000, 450000])).toBe(2.5);
    });

    test('one satellite delay', () => {
        const result = sendMessage([600000, 600000]);
        expect(result).toBeGreaterThan(4);
    });
});

describe('sendMessage - multi-hop route', () => {
    test('three segments (two satellites)', () => {
        expect(sendMessage([300000, 300000, 300000])).toBe(4);
    });

    test('five segments (four satellites)', () => {
        expect(sendMessage([10000, 21339, 50000, 31243, 10000])).toBe(2.4086);
    });

    test('increasing delays with more hops', () => {
        const twoHop = sendMessage([300000, 300000]);
        const threeHop = sendMessage([300000, 300000, 300000]);
        expect(threeHop - twoHop).toBeCloseTo(1.5, 1);
    });
});

describe('sendMessage - transmission delay', () => {
    test('one satellite adds 0.5s', () => {
        const withDelay = sendMessage([300000, 300000]);
        const withoutDelay = 600000 / 300000;
        expect(withDelay - withoutDelay).toBe(0.5);
    });

    test('two satellites add 1s', () => {
        const result = sendMessage([300000, 300000, 300000]);
        expect(result).toBe(4);
    });

    test('four satellites add 2s', () => {
        const result = sendMessage([300000, 300000, 300000, 300000, 300000]);
        expect(result).toBe(7);
    });
});

describe('sendMessage - speed calculation', () => {
    test('300000 km/s speed', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
    });

    test('one second travel time', () => {
        expect(sendMessage([300000])).toBe(1);
    });

    test('ten second travel time', () => {
        expect(sendMessage([3000000])).toBe(10);
    });
});

describe('sendMessage - rounding', () => {
    test('rounded to 4 decimal places', () => {
        const result = sendMessage([384400, 384400]);
        const decimals = result.toString().split('.')[1];
        expect(decimals.length).toBeLessThanOrEqual(4);
    });

    test('trailing zeros removed', () => {
        const result = sendMessage([300000, 300000]);
        expect(result).toBe(2.5);
        expect(result.toString()).not.toMatch(/\.50$/);
    });

    test('no trailing zeros in result', () => {
        expect(sendMessage([54600000, 54600000])).toBe(364.5);
    });
});

describe('sendMessage - return value validation', () => {
    test('returns number', () => {
        expect(typeof sendMessage([300000, 300000])).toBe('number');
    });

    test('positive value', () => {
        expect(sendMessage([300000, 300000])).toBeGreaterThan(0);
    });

    test('finite value', () => {
        expect(isFinite(sendMessage([300000, 300000]))).toBe(true);
    });
});

describe('sendMessage - edge cases', () => {
    test('single segment (no satellites)', () => {
        expect(sendMessage([300000])).toBe(1);
    });

    test('very short distance', () => {
        expect(sendMessage([1, 1])).toBeCloseTo(0.5, 4);
    });

    test('very long distance', () => {
        expect(sendMessage([500000000, 1000000])).toBe(1670.5);
    });
});

describe('sendMessage - distance variations', () => {
    test('small distances', () => {
        const result = sendMessage([10000, 10000]);
        expect(result).toBeGreaterThan(0.5);
    });

    test('large distances', () => {
        expect(sendMessage([54600000, 54600000])).toBe(364.5);
    });

    test('mixed distances', () => {
        expect(sendMessage([1000000, 500000000, 1000000])).toBe(1674.3333);
    });
});

describe('sendMessage - satellite count', () => {
    test('zero satellites', () => {
        expect(sendMessage([300000])).toBe(1);
    });

    test('one satellite', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
    });

    test('multiple satellites', () => {
        expect(sendMessage([300000, 300000, 300000, 300000])).toBe(5.5);
    });
});

describe('sendMessage - total time calculation', () => {
    test('travel time plus delay', () => {
        const distances = [300000, 300000];
        const travelTime = 2;
        const delay = 0.5;
        expect(sendMessage(distances)).toBe(travelTime + delay);
    });

    test('sum of all segments', () => {
        expect(sendMessage([150000, 150000, 150000, 150000])).toBe(3.5);
    });
});

describe('sendMessage - precision tests', () => {
    test('maintains precision', () => {
        expect(sendMessage([384400, 384400])).toBe(3.0627);
    });

    test('exact decimal values', () => {
        expect(sendMessage([1000000, 500000000, 1000000])).toBe(1674.3333);
    });

    test('no precision loss', () => {
        expect(sendMessage([10000, 21339, 50000, 31243, 10000])).toBe(2.4086);
    });
});

describe('sendMessage - realistic scenarios', () => {
    test('Earth to Moon distance', () => {
        expect(sendMessage([384400, 384400])).toBe(3.0627);
    });

    test('interplanetary communication', () => {
        expect(sendMessage([54600000, 54600000])).toBe(364.5);
    });

    test('complex relay network', () => {
        expect(sendMessage([802101, 725994, 112808, 3625770, 481239])).toBe(21.1597);
    });
});

describe('sendMessage - array length', () => {
    test('minimum length (1)', () => {
        expect(sendMessage([300000])).toBe(1);
    });

    test('length 2', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
    });

    test('length 5', () => {
        expect(sendMessage([10000, 21339, 50000, 31243, 10000])).toBe(2.4086);
    });
});

describe('sendMessage - delay contribution', () => {
    test('delay increases linearly', () => {
        const oneDelay = sendMessage([300000, 300000]);
        const twoDelays = sendMessage([300000, 300000, 300000]);
        expect(twoDelays - oneDelay).toBeCloseTo(1.5, 1);
    });

    test('no delay with single segment', () => {
        expect(sendMessage([300000])).toBe(1);
    });
});

describe('sendMessage - verification tests', () => {
    test('verify [300000, 300000]', () => {
        expect(sendMessage([300000, 300000])).toBe(2.5);
    });

    test('verify [384400, 384400]', () => {
        expect(sendMessage([384400, 384400])).toBe(3.0627);
    });

    test('verify [54600000, 54600000]', () => {
        expect(sendMessage([54600000, 54600000])).toBe(364.5);
    });

    test('verify [1000000, 500000000, 1000000]', () => {
        expect(sendMessage([1000000, 500000000, 1000000])).toBe(1674.3333);
    });

    test('verify [10000, 21339, 50000, 31243, 10000]', () => {
        expect(sendMessage([10000, 21339, 50000, 31243, 10000])).toBe(2.4086);
    });

    test('verify [802101, 725994, 112808, 3625770, 481239]', () => {
        expect(sendMessage([802101, 725994, 112808, 3625770, 481239])).toBe(21.1597);
    });
});

describe('sendMessage - boundary calculations', () => {
    test('minimum travel time', () => {
        const result = sendMessage([1]);
        expect(result).toBe(0);
    });

    test('large number handling', () => {
        expect(sendMessage([1000000000])).toBeCloseTo(3333.3333, 4);
    });
});

describe('sendMessage - format verification', () => {
    test('no unnecessary trailing zeros', () => {
        const result = sendMessage([300000, 300000]);
        expect(result.toString()).toBe('2.5');
    });

    test('preserves necessary decimals', () => {
        const result = sendMessage([384400, 384400]);
        expect(result.toString()).toBe('3.0627');
    });

    test('rounds correctly', () => {
        expect(sendMessage([1000000, 500000000, 1000000])).toBe(1674.3333);
    });
});

describe('hexToDecimal - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(hexToDecimal("A")).toBe(10);
        expect(hexToDecimal("15")).toBe(21);
        expect(hexToDecimal("2E")).toBe(46);
        expect(hexToDecimal("FF")).toBe(255);
        expect(hexToDecimal("A3F")).toBe(2623);
    });
});

describe('hexToDecimal - single digit', () => {
    test('numeric digits 0-9', () => {
        expect(hexToDecimal("0")).toBe(0);
        expect(hexToDecimal("1")).toBe(1);
        expect(hexToDecimal("5")).toBe(5);
        expect(hexToDecimal("9")).toBe(9);
    });

    test('letter digits A-F', () => {
        expect(hexToDecimal("A")).toBe(10);
        expect(hexToDecimal("B")).toBe(11);
        expect(hexToDecimal("C")).toBe(12);
        expect(hexToDecimal("D")).toBe(13);
        expect(hexToDecimal("E")).toBe(14);
        expect(hexToDecimal("F")).toBe(15);
    });
});

describe('hexToDecimal - two digits', () => {
    test('basic two digit numbers', () => {
        expect(hexToDecimal("10")).toBe(16);
        expect(hexToDecimal("15")).toBe(21);
        expect(hexToDecimal("1A")).toBe(26);
        expect(hexToDecimal("1F")).toBe(31);
    });

    test('all same digit', () => {
        expect(hexToDecimal("11")).toBe(17);
        expect(hexToDecimal("AA")).toBe(170);
        expect(hexToDecimal("FF")).toBe(255);
    });

    test('mixed numbers and letters', () => {
        expect(hexToDecimal("2E")).toBe(46);
        expect(hexToDecimal("3C")).toBe(60);
        expect(hexToDecimal("9F")).toBe(159);
    });
});

describe('hexToDecimal - three digits', () => {
    test('starting with 1', () => {
        expect(hexToDecimal("100")).toBe(256);
        expect(hexToDecimal("123")).toBe(291);
        expect(hexToDecimal("1FF")).toBe(511);
    });

    test('starting with A-F', () => {
        expect(hexToDecimal("A00")).toBe(2560);
        expect(hexToDecimal("A3F")).toBe(2623);
        expect(hexToDecimal("FFF")).toBe(4095);
    });

    test('various combinations', () => {
        expect(hexToDecimal("ABC")).toBe(2748);
        expect(hexToDecimal("DEF")).toBe(3567);
    });
});

describe('hexToDecimal - conversion table values', () => {
    test('table: 0 = 0', () => {
        expect(hexToDecimal("0")).toBe(0);
    });

    test('table: F = 15', () => {
        expect(hexToDecimal("F")).toBe(15);
    });

    test('table: 10 = 16', () => {
        expect(hexToDecimal("10")).toBe(16);
    });

    test('table: 9F = 159', () => {
        expect(hexToDecimal("9F")).toBe(159);
    });

    test('table: A0 = 160', () => {
        expect(hexToDecimal("A0")).toBe(160);
    });

    test('table: FF = 255', () => {
        expect(hexToDecimal("FF")).toBe(255);
    });

    test('table: 100 = 256', () => {
        expect(hexToDecimal("100")).toBe(256);
    });
});

describe('hexToDecimal - return value validation', () => {
    test('returns number', () => {
        expect(typeof hexToDecimal("A")).toBe('number');
        expect(typeof hexToDecimal("FF")).toBe('number');
    });

    test('returns integer', () => {
        expect(Number.isInteger(hexToDecimal("A"))).toBe(true);
        expect(Number.isInteger(hexToDecimal("FF"))).toBe(true);
    });

    test('non-negative values', () => {
        expect(hexToDecimal("0")).toBeGreaterThanOrEqual(0);
        expect(hexToDecimal("FF")).toBeGreaterThanOrEqual(0);
    });
});

describe('hexToDecimal - edge cases', () => {
    test('minimum value', () => {
        expect(hexToDecimal("0")).toBe(0);
    });

    test('single letter', () => {
        expect(hexToDecimal("A")).toBe(10);
        expect(hexToDecimal("F")).toBe(15);
    });

    test('maximum two-digit value', () => {
        expect(hexToDecimal("FF")).toBe(255);
    });

    test('maximum three-digit value', () => {
        expect(hexToDecimal("FFF")).toBe(4095);
    });
});

describe('hexToDecimal - powers of 16', () => {
    test('16^0 = 1', () => {
        expect(hexToDecimal("1")).toBe(1);
    });

    test('16^1 = 16', () => {
        expect(hexToDecimal("10")).toBe(16);
    });

    test('16^2 = 256', () => {
        expect(hexToDecimal("100")).toBe(256);
    });

    test('16^3 = 4096', () => {
        expect(hexToDecimal("1000")).toBe(4096);
    });
});

describe('hexToDecimal - digit position values', () => {
    test('ones place', () => {
        expect(hexToDecimal("5")).toBe(5);
        expect(hexToDecimal("F")).toBe(15);
    });

    test('sixteens place', () => {
        expect(hexToDecimal("10")).toBe(16);
        expect(hexToDecimal("50")).toBe(80);
        expect(hexToDecimal("F0")).toBe(240);
    });

    test('256s place', () => {
        expect(hexToDecimal("100")).toBe(256);
        expect(hexToDecimal("500")).toBe(1280);
        expect(hexToDecimal("F00")).toBe(3840);
    });
});

describe('hexToDecimal - sequential values', () => {
    test('counting from 0', () => {
        expect(hexToDecimal("0")).toBe(0);
        expect(hexToDecimal("1")).toBe(1);
        expect(hexToDecimal("2")).toBe(2);
        expect(hexToDecimal("3")).toBe(3);
    });

    test('crossing digit boundary', () => {
        expect(hexToDecimal("E")).toBe(14);
        expect(hexToDecimal("F")).toBe(15);
        expect(hexToDecimal("10")).toBe(16);
        expect(hexToDecimal("11")).toBe(17);
    });

    test('crossing two-digit boundary', () => {
        expect(hexToDecimal("FE")).toBe(254);
        expect(hexToDecimal("FF")).toBe(255);
        expect(hexToDecimal("100")).toBe(256);
        expect(hexToDecimal("101")).toBe(257);
    });
});

describe('hexToDecimal - all numeric', () => {
    test('single numeric digit', () => {
        expect(hexToDecimal("7")).toBe(7);
    });

    test('two numeric digits', () => {
        expect(hexToDecimal("42")).toBe(66);
        expect(hexToDecimal("99")).toBe(153);
    });

    test('three numeric digits', () => {
        expect(hexToDecimal("123")).toBe(291);
        expect(hexToDecimal("999")).toBe(2457);
    });
});

describe('hexToDecimal - all letters', () => {
    test('single letter', () => {
        expect(hexToDecimal("C")).toBe(12);
    });

    test('two letters', () => {
        expect(hexToDecimal("AB")).toBe(171);
        expect(hexToDecimal("CD")).toBe(205);
    });

    test('three letters', () => {
        expect(hexToDecimal("ABC")).toBe(2748);
        expect(hexToDecimal("DEF")).toBe(3567);
    });
});

describe('hexToDecimal - mixed combinations', () => {
    test('number then letter', () => {
        expect(hexToDecimal("1A")).toBe(26);
        expect(hexToDecimal("9F")).toBe(159);
    });

    test('letter then number', () => {
        expect(hexToDecimal("A1")).toBe(161);
        expect(hexToDecimal("F9")).toBe(249);
    });

    test('alternating pattern', () => {
        expect(hexToDecimal("A5A")).toBe(2650);
        expect(hexToDecimal("5A5")).toBe(1445);
    });
});

describe('hexToDecimal - specific conversions', () => {
    test('common byte values', () => {
        expect(hexToDecimal("00")).toBe(0);
        expect(hexToDecimal("7F")).toBe(127);
        expect(hexToDecimal("80")).toBe(128);
        expect(hexToDecimal("FF")).toBe(255);
    });

    test('round numbers', () => {
        expect(hexToDecimal("64")).toBe(100);
        expect(hexToDecimal("3E8")).toBe(1000);
    });
});

describe('hexToDecimal - verification tests', () => {
    test('verify A = 10', () => {
        expect(hexToDecimal("A")).toBe(10);
    });

    test('verify 15 = 21', () => {
        expect(hexToDecimal("15")).toBe(21);
    });

    test('verify 2E = 46', () => {
        expect(hexToDecimal("2E")).toBe(46);
    });

    test('verify FF = 255', () => {
        expect(hexToDecimal("FF")).toBe(255);
    });

    test('verify A3F = 2623', () => {
        expect(hexToDecimal("A3F")).toBe(2623);
    });
});

describe('hexToDecimal - four digits', () => {
    test('starting with 1', () => {
        expect(hexToDecimal("1000")).toBe(4096);
        expect(hexToDecimal("1234")).toBe(4660);
    });

    test('starting with A-F', () => {
        expect(hexToDecimal("ABCD")).toBe(43981);
        expect(hexToDecimal("FFFF")).toBe(65535);
    });
});

describe('hexToDecimal - base conversion', () => {
    test('hex A equals decimal 10', () => {
        expect(hexToDecimal("A")).toBe(10);
    });

    test('hex B equals decimal 11', () => {
        expect(hexToDecimal("B")).toBe(11);
    });

    test('hex C equals decimal 12', () => {
        expect(hexToDecimal("C")).toBe(12);
    });

    test('hex D equals decimal 13', () => {
        expect(hexToDecimal("D")).toBe(13);
    });

    test('hex E equals decimal 14', () => {
        expect(hexToDecimal("E")).toBe(14);
    });

    test('hex F equals decimal 15', () => {
        expect(hexToDecimal("F")).toBe(15);
    });
});

describe('hexToDecimal - calculation verification', () => {
    test('manual calculation: 2E', () => {
        const result = 2 * 16 + 14;
        expect(hexToDecimal("2E")).toBe(result);
        expect(result).toBe(46);
    });

    test('manual calculation: A3F', () => {
        const result = 10 * 256 + 3 * 16 + 15;
        expect(hexToDecimal("A3F")).toBe(result);
        expect(result).toBe(2623);
    });

    test('manual calculation: FF', () => {
        const result = 15 * 16 + 15;
        expect(hexToDecimal("FF")).toBe(result);
        expect(result).toBe(255);
    });
});

describe('findLandingSpot - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(findLandingSpot([[1, 0], [2, 0]])).toEqual([0, 1]);
        expect(findLandingSpot([[9, 0, 3], [7, 0, 4], [8, 0, 5]])).toEqual([1, 1]);
        expect(findLandingSpot([[1, 2, 1], [0, 0, 2], [3, 0, 0]])).toEqual([2, 2]);
        expect(findLandingSpot([[9, 6, 0, 8], [7, 1, 1, 0], [3, 0, 3, 9], [8, 6, 0, 9]])).toEqual([2, 1]);
    });
});

describe('findLandingSpot - simple 2x2 matrix', () => {
    test('corner positions', () => {
        expect(findLandingSpot([[1, 0], [2, 0]])).toEqual([0, 1]);
    });

    test('top row safer', () => {
        expect(findLandingSpot([[0, 1], [3, 0]])).toEqual([0, 0]);
    });

    test('bottom row safer', () => {
        expect(findLandingSpot([[9, 0], [1, 0]])).toEqual([1, 1]);
    });
});

describe('findLandingSpot - 3x3 matrix', () => {
    test('center position safest', () => {
        expect(findLandingSpot([[9, 0, 3], [7, 0, 4], [8, 0, 5]])).toEqual([1, 1]);
    });

    test('corner position safest', () => {
        expect(findLandingSpot([[1, 2, 1], [0, 0, 2], [3, 0, 0]])).toEqual([2, 2]);
    });

    test('edge position safest', () => {
        expect(findLandingSpot([[0, 9, 0], [1, 1, 1], [0, 9, 0]])).toEqual([0, 0]);
    });
});

describe('findLandingSpot - 4x4 matrix', () => {
    test('interior position', () => {
        expect(findLandingSpot([[9, 6, 0, 8], [7, 1, 1, 0], [3, 0, 3, 9], [8, 6, 0, 9]])).toEqual([2, 1]);
    });

    test('multiple zeros', () => {
        const result = findLandingSpot([[0, 5, 5, 0], [5, 1, 1, 5], [5, 1, 1, 5], [0, 5, 5, 0]]);
        expect(result).toEqual([0, 0]);
    });
});

describe('findLandingSpot - neighbor calculation', () => {
    test('counts up neighbor', () => {
        expect(findLandingSpot([[5, 0], [0, 9]])).toEqual([0, 1]);
    });

    test('counts down neighbor', () => {
        expect(findLandingSpot([[0, 9], [5, 0]])).toEqual([0, 0]);
    });

    test('counts left neighbor', () => {
        expect(findLandingSpot([[5, 0, 0]])).toEqual([0, 2]);
    });

    test('counts right neighbor', () => {
        expect(findLandingSpot([[0, 0, 5]])).toEqual([0, 0]);
    });
});

describe('findLandingSpot - edge cases', () => {
    test('single zero in matrix', () => {
        expect(findLandingSpot([[1, 2], [3, 0]])).toEqual([1, 1]);
    });

    test('corner has fewer neighbors', () => {
        expect(findLandingSpot([[0, 1], [1, 9]])).toEqual([0, 0]);
    });

    test('edge has 3 neighbors', () => {
        expect(findLandingSpot([[1, 0, 1], [1, 1, 1]])).toEqual([0, 1]);
    });

    test('center has 4 neighbors', () => {
        expect(findLandingSpot([[1, 1, 1], [1, 0, 1], [1, 1, 1]])).toEqual([1, 1]);
    });
});

describe('findLandingSpot - danger calculation', () => {
    test('zero danger surroundings', () => {
        expect(findLandingSpot([[0, 0, 0], [0, 0, 0], [0, 0, 0]])).toEqual([0, 0]);
    });

    test('low danger neighbors', () => {
        expect(findLandingSpot([[1, 0], [1, 0]])).toEqual([0, 1]);
    });

    test('high danger neighbors', () => {
        expect(findLandingSpot([[9, 0], [9, 0]])).toEqual([0, 1]);
    });
});

describe('findLandingSpot - return value validation', () => {
    test('returns array', () => {
        const result = findLandingSpot([[1, 0], [2, 0]]);
        expect(Array.isArray(result)).toBe(true);
    });

    test('array has length 2', () => {
        const result = findLandingSpot([[1, 0], [2, 0]]);
        expect(result.length).toBe(2);
    });

    test('contains row and column indices', () => {
        const result = findLandingSpot([[1, 0], [2, 0]]);
        expect(typeof result[0]).toBe('number');
        expect(typeof result[1]).toBe('number');
    });
});

describe('findLandingSpot - position verification', () => {
    test('returns valid row index', () => {
        const matrix = [[1, 0], [2, 0]];
        const result = findLandingSpot(matrix);
        expect(result[0]).toBeGreaterThanOrEqual(0);
        expect(result[0]).toBeLessThan(matrix.length);
    });

    test('returns valid column index', () => {
        const matrix = [[1, 0], [2, 0]];
        const result = findLandingSpot(matrix);
        expect(result[1]).toBeGreaterThanOrEqual(0);
        expect(result[1]).toBeLessThan(matrix[0].length);
    });

    test('returned position is a zero', () => {
        const matrix = [[1, 0], [2, 0]];
        const result = findLandingSpot(matrix);
        expect(matrix[result[0]][result[1]]).toBe(0);
    });
});

describe('findLandingSpot - diagonal neighbors ignored', () => {
    test('ignores top-left diagonal', () => {
        expect(findLandingSpot([[9, 1, 1], [1, 0, 1], [1, 1, 1]])).toEqual([1, 1]);
    });

    test('ignores top-right diagonal', () => {
        expect(findLandingSpot([[1, 1, 9], [1, 0, 1], [1, 1, 1]])).toEqual([1, 1]);
    });

    test('ignores bottom-left diagonal', () => {
        expect(findLandingSpot([[1, 1, 1], [1, 0, 1], [9, 1, 1]])).toEqual([1, 1]);
    });

    test('ignores bottom-right diagonal', () => {
        expect(findLandingSpot([[1, 1, 1], [1, 0, 1], [1, 1, 9]])).toEqual([1, 1]);
    });
});

describe('findLandingSpot - out of bounds handling', () => {
    test('top-left corner', () => {
        expect(findLandingSpot([[0, 1], [1, 9]])).toEqual([0, 0]);
    });

    test('top-right corner', () => {
        expect(findLandingSpot([[1, 0], [9, 1]])).toEqual([0, 1]);
    });

    test('bottom-left corner', () => {
        expect(findLandingSpot([[9, 1], [0, 1]])).toEqual([1, 0]);
    });

    test('bottom-right corner', () => {
        expect(findLandingSpot([[1, 9], [1, 0]])).toEqual([1, 1]);
    });
});

describe('findLandingSpot - multiple landing spots', () => {
    test('chooses lowest danger total', () => {
        expect(findLandingSpot([[1, 0], [2, 0]])).toEqual([0, 1]);
    });

    test('first safest spot returned', () => {
        expect(findLandingSpot([[0, 0], [1, 1]])).toEqual([0, 0]);
    });

    test('compares all zeros', () => {
        expect(findLandingSpot([[9, 0, 3], [7, 0, 4], [8, 0, 5]])).toEqual([1, 1]);
    });
});

describe('findLandingSpot - danger values 0-9', () => {
    test('low danger values', () => {
        expect(findLandingSpot([[1, 0, 1], [1, 0, 1], [1, 0, 1]])).toEqual([0, 1]);
    });

    test('high danger values', () => {
        expect(findLandingSpot([[9, 0, 9], [9, 0, 9], [9, 0, 9]])).toEqual([0, 1]);
    });

    test('mixed danger values', () => {
        expect(findLandingSpot([[5, 0, 8], [3, 0, 7], [6, 0, 2]])).toEqual([2, 1]);
    });
});

describe('findLandingSpot - rectangular matrices', () => {
    test('wider than tall', () => {
        expect(findLandingSpot([[0, 1, 0, 1, 0], [1, 1, 1, 1, 1]])).toEqual([0, 0]);
    });

    test('taller than wide', () => {
        expect(findLandingSpot([[0, 1], [1, 0], [1, 0], [1, 0]])).toEqual([2, 1]);
    });
});

describe('findLandingSpot - verification tests', () => {
    test('verify [[1, 0], [2, 0]]', () => {
        expect(findLandingSpot([[1, 0], [2, 0]])).toEqual([0, 1]);
    });

    test('verify [[9, 0, 3], [7, 0, 4], [8, 0, 5]]', () => {
        expect(findLandingSpot([[9, 0, 3], [7, 0, 4], [8, 0, 5]])).toEqual([1, 1]);
    });

    test('verify [[1, 2, 1], [0, 0, 2], [3, 0, 0]]', () => {
        expect(findLandingSpot([[1, 2, 1], [0, 0, 2], [3, 0, 0]])).toEqual([2, 2]);
    });

    test('verify [[9, 6, 0, 8], [7, 1, 1, 0], [3, 0, 3, 9], [8, 6, 0, 9]]', () => {
        expect(findLandingSpot([[9, 6, 0, 8], [7, 1, 1, 0], [3, 0, 3, 9], [8, 6, 0, 9]])).toEqual([2, 1]);
    });
});

describe('findLandingSpot - neighbor sum calculation', () => {
    test('sum of 4 neighbors', () => {
        const matrix = [[1, 2, 3], [4, 0, 5], [6, 7, 8]];
        const result = findLandingSpot(matrix);
        expect(result).toEqual([1, 1]);
    });

    test('sum of 3 neighbors (edge)', () => {
        const matrix = [[1, 0, 3], [4, 5, 6]];
        const result = findLandingSpot(matrix);
        expect(result).toEqual([0, 1]);
    });

    test('sum of 2 neighbors (corner)', () => {
        const matrix = [[0, 1], [2, 3]];
        const result = findLandingSpot(matrix);
        expect(result).toEqual([0, 0]);
    });
});

describe('findLandingSpot - specific scenarios', () => {
    test('all zeros with varying neighbors', () => {
        expect(findLandingSpot([[0, 5], [5, 0]])).toEqual([0, 0]);
    });

    test('single row', () => {
        expect(findLandingSpot([[1, 0, 2, 0, 3]])).toEqual([0, 1]);
    });

    test('single column', () => {
        expect(findLandingSpot([[1], [0], [2], [0], [3]])).toEqual([1, 0]);
    });
});

describe('findLandingSpot - danger total comparison', () => {
    test('spot with danger 1 vs danger 2', () => {
        expect(findLandingSpot([[0, 1], [2, 0]])).toEqual([0, 0]);
    });

    test('spot with danger 10 vs danger 20', () => {
        expect(findLandingSpot([[5, 0, 5], [9, 0, 9], [1, 1, 1]])).toEqual([0, 1]);
    });

    test('spot with danger 0 is safest', () => {
        expect(findLandingSpot([[0, 0, 0], [0, 9, 0], [0, 0, 0]])).toEqual([0, 0]);
    });
});

describe('findLandingSpot - matrix traversal', () => {
    test('finds first occurrence when tied', () => {
        expect(findLandingSpot([[0, 1, 0], [1, 1, 1]])).toEqual([0, 0]);
    });

    test('scans row by row', () => {
        const matrix = [[9, 9, 9], [9, 9, 9], [1, 0, 1]];
        expect(findLandingSpot(matrix)).toEqual([2, 1]);
    });
});

describe('findLandingSpot - complex scenarios', () => {
    test('large matrix', () => {
        const matrix = [
            [9, 9, 9, 9, 9],
            [9, 0, 9, 0, 9],
            [9, 1, 0, 1, 9],
            [9, 0, 9, 0, 9],
            [9, 9, 9, 9, 9]
        ];
        expect(findLandingSpot(matrix)).toEqual([2, 2]);
    });

    test('scattered zeros', () => {
        const matrix = [
            [0, 5, 5, 5],
            [5, 5, 5, 0],
            [5, 0, 5, 5],
            [5, 5, 0, 5]
        ];
        expect(findLandingSpot(matrix)).toEqual([0, 0]);
    });
});

describe('goldilocksZone - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(goldilocksZone(1)).toEqual([0.95, 1.37]);
        expect(goldilocksZone(0.5)).toEqual([0.28, 0.41]);
        expect(goldilocksZone(6)).toEqual([21.85, 31.51]);
        expect(goldilocksZone(3.7)).toEqual([9.38, 13.52]);
        expect(goldilocksZone(20)).toEqual([179.69, 259.13]);
    });
});

describe('goldilocksZone - solar mass', () => {
    test('mass of 1 (Sun)', () => {
        expect(goldilocksZone(1)).toEqual([0.95, 1.37]);
    });

    test('luminosity calculation for mass 1', () => {
        const result = goldilocksZone(1);
        expect(result[0]).toBe(0.95);
        expect(result[1]).toBe(1.37);
    });
});

describe('goldilocksZone - small stars', () => {
    test('mass 0.5', () => {
        expect(goldilocksZone(0.5)).toEqual([0.28, 0.41]);
    });

    test('mass less than 1', () => {
        const result = goldilocksZone(0.5);
        expect(result[0]).toBeLessThan(1);
        expect(result[1]).toBeLessThan(2);
    });

    test('very small mass', () => {
        const result = goldilocksZone(0.1);
        expect(result[0]).toBe(0.02);
        expect(result[1]).toBe(0.02);
    });
});

describe('goldilocksZone - large stars', () => {
    test('mass 6', () => {
        expect(goldilocksZone(6)).toEqual([21.85, 31.51]);
    });

    test('mass 20', () => {
        expect(goldilocksZone(20)).toEqual([179.69, 259.13]);
    });

    test('very large mass', () => {
        const result = goldilocksZone(50);
        expect(result[0]).toBeGreaterThan(100);
        expect(result[1]).toBeGreaterThan(result[0]);
    });
});

describe('goldilocksZone - luminosity calculation', () => {
    test('luminosity is mass to power 3.5', () => {
        const mass = 2;
        const expectedLuminosity = Math.pow(2, 3.5);
        const sqrtLum = Math.sqrt(expectedLuminosity);
        const result = goldilocksZone(mass);
        expect(result[0]).toBeCloseTo(0.95 * sqrtLum, 2);
        expect(result[1]).toBeCloseTo(1.37 * sqrtLum, 2);
    });

    test('higher mass means higher luminosity', () => {
        const zone1 = goldilocksZone(1);
        const zone2 = goldilocksZone(2);
        expect(zone2[0]).toBeGreaterThan(zone1[0]);
        expect(zone2[1]).toBeGreaterThan(zone1[1]);
    });
});

describe('goldilocksZone - zone boundaries', () => {
    test('start is 0.95 times sqrt of luminosity', () => {
        const result = goldilocksZone(1);
        expect(result[0]).toBe(0.95);
    });

    test('end is 1.37 times sqrt of luminosity', () => {
        const result = goldilocksZone(1);
        expect(result[1]).toBe(1.37);
    });

    test('end is always greater than start', () => {
        const result = goldilocksZone(5);
        expect(result[1]).toBeGreaterThan(result[0]);
    });
});

describe('goldilocksZone - return value validation', () => {
    test('returns array', () => {
        const result = goldilocksZone(1);
        expect(Array.isArray(result)).toBe(true);
    });

    test('array has length 2', () => {
        const result = goldilocksZone(1);
        expect(result.length).toBe(2);
    });

    test('contains numbers', () => {
        const result = goldilocksZone(1);
        expect(typeof result[0]).toBe('number');
        expect(typeof result[1]).toBe('number');
    });

    test('values are positive', () => {
        const result = goldilocksZone(1);
        expect(result[0]).toBeGreaterThan(0);
        expect(result[1]).toBeGreaterThan(0);
    });
});

describe('goldilocksZone - rounding', () => {
    test('rounded to 2 decimal places', () => {
        const result = goldilocksZone(3.7);
        expect(result[0]).toBe(9.38);
        expect(result[1]).toBe(13.52);
    });

    test('decimal places check', () => {
        const result = goldilocksZone(1);
        const decimals0 = result[0].toString().split('.')[1];
        const decimals1 = result[1].toString().split('.')[1];
        expect(decimals0.length).toBeLessThanOrEqual(2);
        expect(decimals1.length).toBeLessThanOrEqual(2);
    });
});

describe('goldilocksZone - zone width', () => {
    test('width proportional to luminosity', () => {
        const zone1 = goldilocksZone(1);
        const zone2 = goldilocksZone(2);
        const width1 = zone1[1] - zone1[0];
        const width2 = zone2[1] - zone2[0];
        expect(width2).toBeGreaterThan(width1);
    });

    test('ratio of end to start is constant', () => {
        const zone1 = goldilocksZone(1);
        const zone2 = goldilocksZone(5);
        const ratio1 = zone1[1] / zone1[0];
        const ratio2 = zone2[1] / zone2[0];
        expect(ratio1).toBeCloseTo(ratio2, 3);
    });
});

describe('goldilocksZone - mid-range masses', () => {
    test('mass 2', () => {
        const result = goldilocksZone(2);
        expect(result[0]).toBeGreaterThan(0);
        expect(result[1]).toBeGreaterThan(result[0]);
    });

    test('mass 3.7', () => {
        expect(goldilocksZone(3.7)).toEqual([9.38, 13.52]);
    });

    test('mass 5', () => {
        const result = goldilocksZone(5);
        expect(result[0]).toBeGreaterThan(10);
        expect(result[1]).toBeLessThan(30);
    });
});

describe('goldilocksZone - edge cases', () => {
    test('very small mass', () => {
        const result = goldilocksZone(0.01);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(0);
    });

    test('fractional mass', () => {
        const result = goldilocksZone(1.5);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
    });
});

describe('goldilocksZone - verification tests', () => {
    test('verify mass 1', () => {
        expect(goldilocksZone(1)).toEqual([0.95, 1.37]);
    });

    test('verify mass 0.5', () => {
        expect(goldilocksZone(0.5)).toEqual([0.28, 0.41]);
    });

    test('verify mass 6', () => {
        expect(goldilocksZone(6)).toEqual([21.85, 31.51]);
    });

    test('verify mass 3.7', () => {
        expect(goldilocksZone(3.7)).toEqual([9.38, 13.52]);
    });

    test('verify mass 20', () => {
        expect(goldilocksZone(20)).toEqual([179.69, 259.13]);
    });
});

describe('goldilocksZone - astronomical units', () => {
    test('results in AU', () => {
        const result = goldilocksZone(1);
        expect(result[0]).toBeLessThan(2);
        expect(result[1]).toBeLessThan(2);
    });

    test('Earth is in solar goldilocks zone', () => {
        const result = goldilocksZone(1);
        expect(1).toBeGreaterThan(result[0]);
        expect(1).toBeLessThan(result[1]);
    });
});

describe('goldilocksZone - calculation accuracy', () => {
    test('precise calculation for mass 1', () => {
        const luminosity = Math.pow(1, 3.5);
        const sqrtLum = Math.sqrt(luminosity);
        const expectedStart = 0.95 * sqrtLum;
        const expectedEnd = 1.37 * sqrtLum;
        const result = goldilocksZone(1);
        expect(result[0]).toBeCloseTo(expectedStart, 2);
        expect(result[1]).toBeCloseTo(expectedEnd, 2);
    });

    test('precise calculation for mass 6', () => {
        const luminosity = Math.pow(6, 3.5);
        const sqrtLum = Math.sqrt(luminosity);
        const expectedStart = 0.95 * sqrtLum;
        const expectedEnd = 1.37 * sqrtLum;
        const result = goldilocksZone(6);
        expect(result[0]).toBeCloseTo(expectedStart, 2);
        expect(result[1]).toBeCloseTo(expectedEnd, 2);
    });
});

describe('goldilocksZone - mass-luminosity relationship', () => {
    test('doubling mass increases zone significantly', () => {
        const zone1 = goldilocksZone(1);
        const zone2 = goldilocksZone(2);
        expect(zone2[0] / zone1[0]).toBeGreaterThan(2);
    });

    test('mass scales with power 3.5', () => {
        const mass1 = 1;
        const mass2 = 2;
        const zone1 = goldilocksZone(mass1);
        const zone2 = goldilocksZone(mass2);
        const expectedRatio = Math.sqrt(Math.pow(mass2 / mass1, 3.5));
        const actualRatio = zone2[0] / zone1[0];
        expect(actualRatio).toBeCloseTo(expectedRatio, 1);
    });
});

describe('goldilocksZone - zone properties', () => {
    test('start is less than end', () => {
        expect(goldilocksZone(1)[0]).toBeLessThan(goldilocksZone(1)[1]);
        expect(goldilocksZone(5)[0]).toBeLessThan(goldilocksZone(5)[1]);
        expect(goldilocksZone(10)[0]).toBeLessThan(goldilocksZone(10)[1]);
    });

    test('zone contains habitable region', () => {
        const result = goldilocksZone(1);
        expect(result[1] - result[0]).toBeCloseTo(0.42, 1);
    });
});

describe('goldilocksZone - decimal mass values', () => {
    test('mass 0.5', () => {
        const result = goldilocksZone(0.5);
        expect(result[0]).toBe(0.28);
        expect(result[1]).toBe(0.41);
    });

    test('mass 3.7', () => {
        const result = goldilocksZone(3.7);
        expect(result[0]).toBe(9.38);
        expect(result[1]).toBe(13.52);
    });

    test('mass 1.5', () => {
        const result = goldilocksZone(1.5);
        expect(typeof result[0]).toBe('number');
        expect(typeof result[1]).toBe('number');
    });
});

describe('goldilocksZone - range validation', () => {
    test('small stars have smaller zones', () => {
        const zone = goldilocksZone(0.5);
        expect(zone[0]).toBeLessThan(1);
        expect(zone[1]).toBeLessThan(1);
    });

    test('large stars have larger zones', () => {
        const zone = goldilocksZone(20);
        expect(zone[0]).toBeGreaterThan(100);
        expect(zone[1]).toBeGreaterThan(200);
    });
});

describe('goldilocksZone - coefficient application', () => {
    test('0.95 coefficient for start', () => {
        const mass = 1;
        const luminosity = Math.pow(mass, 3.5);
        const expected = Math.round(0.95 * Math.sqrt(luminosity) * 100) / 100;
        expect(goldilocksZone(mass)[0]).toBe(expected);
    });

    test('1.37 coefficient for end', () => {
        const mass = 1;
        const luminosity = Math.pow(mass, 3.5);
        const expected = Math.round(1.37 * Math.sqrt(luminosity) * 100) / 100;
        expect(goldilocksZone(mass)[1]).toBe(expected);
    });
});

describe('moonPhase - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
        expect(moonPhase("2000-01-13")).toBe("Waxing");
        expect(moonPhase("2014-10-15")).toBe("Full");
        expect(moonPhase("2012-10-21")).toBe("Waning");
        expect(moonPhase("2022-12-14")).toBe("New");
    });
});

describe('moonPhase - reference date', () => {
    test('reference date is New moon', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
    });

    test('day after reference', () => {
        expect(moonPhase("2000-01-07")).toBe("New");
    });

    test('reference date day 1', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
    });
});

describe('moonPhase - New phase (days 1-7)', () => {
    test('day 1', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
    });

    test('day 2', () => {
        expect(moonPhase("2000-01-07")).toBe("New");
    });

    test('day 7', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
    });

    test('New phase boundary', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
        expect(moonPhase("2000-01-13")).toBe("Waxing");
    });
});

describe('moonPhase - Waxing phase (days 8-14)', () => {
    test('day 8', () => {
        expect(moonPhase("2000-01-13")).toBe("Waxing");
    });

    test('day 14', () => {
        expect(moonPhase("2000-01-19")).toBe("Waxing");
    });

    test('Waxing phase boundary', () => {
        expect(moonPhase("2000-01-19")).toBe("Waxing");
        expect(moonPhase("2000-01-20")).toBe("Full");
    });
});

describe('moonPhase - Full phase (days 15-21)', () => {
    test('day 15', () => {
        expect(moonPhase("2000-01-20")).toBe("Full");
    });

    test('day 21', () => {
        expect(moonPhase("2000-01-26")).toBe("Full");
    });

    test('Full phase boundary', () => {
        expect(moonPhase("2000-01-26")).toBe("Full");
        expect(moonPhase("2000-01-27")).toBe("Waning");
    });
});

describe('moonPhase - Waning phase (days 22-28)', () => {
    test('day 22', () => {
        expect(moonPhase("2000-01-27")).toBe("Waning");
    });

    test('day 28', () => {
        expect(moonPhase("2000-02-02")).toBe("Waning");
    });

    test('Waning phase wraps to New', () => {
        expect(moonPhase("2000-02-02")).toBe("Waning");
        expect(moonPhase("2000-02-03")).toBe("New");
    });
});

describe('moonPhase - cycle repetition', () => {
    test('28-day cycle repeats', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-02-03")).toBe("New");
    });

    test('second cycle day 8', () => {
        expect(moonPhase("2000-01-13")).toBe("Waxing");
        expect(moonPhase("2000-02-10")).toBe("Waxing");
    });

    test('multiple complete cycles', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-03-02")).toBe("New");
    });
});

describe('moonPhase - return value validation', () => {
    test('returns string', () => {
        expect(typeof moonPhase("2000-01-06")).toBe('string');
    });

    test('returns valid phase name', () => {
        const phases = ["New", "Waxing", "Full", "Waning"];
        const result = moonPhase("2000-01-06");
        expect(phases).toContain(result);
    });

    test('only returns one of four phases', () => {
        const validPhases = ["New", "Waxing", "Full", "Waning"];
        expect(validPhases).toContain(moonPhase("2000-01-06"));
        expect(validPhases).toContain(moonPhase("2000-01-13"));
        expect(validPhases).toContain(moonPhase("2000-01-20"));
        expect(validPhases).toContain(moonPhase("2000-01-27"));
    });
});

describe('moonPhase - phase distribution', () => {
    test('each phase is 7 days', () => {
        const newPhase = moonPhase("2000-01-06");
        const waxingPhase = moonPhase("2000-01-13");
        const fullPhase = moonPhase("2000-01-20");
        const waningPhase = moonPhase("2000-01-27");
        expect(newPhase).toBe("New");
        expect(waxingPhase).toBe("Waxing");
        expect(fullPhase).toBe("Full");
        expect(waningPhase).toBe("Waning");
    });

    test('phases follow correct order', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-01-13")).toBe("Waxing");
        expect(moonPhase("2000-01-20")).toBe("Full");
        expect(moonPhase("2000-01-27")).toBe("Waning");
        expect(moonPhase("2000-02-03")).toBe("New");
    });
});

describe('moonPhase - different years', () => {
    test('year 2012', () => {
        expect(moonPhase("2012-10-21")).toBe("Waning");
    });

    test('year 2014', () => {
        expect(moonPhase("2014-10-15")).toBe("Full");
    });

    test('year 2022', () => {
        expect(moonPhase("2022-12-14")).toBe("New");
    });
});

describe('moonPhase - different months', () => {
    test('January', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
    });

    test('October', () => {
        expect(moonPhase("2014-10-15")).toBe("Full");
    });

    test('December', () => {
        expect(moonPhase("2022-12-14")).toBe("New");
    });
});

describe('moonPhase - phase transitions', () => {
    test('New to Waxing transition', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
        expect(moonPhase("2000-01-13")).toBe("Waxing");
    });

    test('Waxing to Full transition', () => {
        expect(moonPhase("2000-01-19")).toBe("Waxing");
        expect(moonPhase("2000-01-20")).toBe("Full");
    });

    test('Full to Waning transition', () => {
        expect(moonPhase("2000-01-26")).toBe("Full");
        expect(moonPhase("2000-01-27")).toBe("Waning");
    });

    test('Waning to New transition', () => {
        expect(moonPhase("2000-02-02")).toBe("Waning");
        expect(moonPhase("2000-02-03")).toBe("New");
    });
});

describe('moonPhase - long time periods', () => {
    test('multiple years later', () => {
        const result = moonPhase("2020-05-15");
        expect(["New", "Waxing", "Full", "Waning"]).toContain(result);
    });

    test('consistent across years', () => {
        const phase2000 = moonPhase("2000-01-06");
        expect(phase2000).toBe("New");
    });
});

describe('moonPhase - verification tests', () => {
    test('verify 2000-01-12', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
    });

    test('verify 2000-01-13', () => {
        expect(moonPhase("2000-01-13")).toBe("Waxing");
    });

    test('verify 2014-10-15', () => {
        expect(moonPhase("2014-10-15")).toBe("Full");
    });

    test('verify 2012-10-21', () => {
        expect(moonPhase("2012-10-21")).toBe("Waning");
    });

    test('verify 2022-12-14', () => {
        expect(moonPhase("2022-12-14")).toBe("New");
    });
});

describe('moonPhase - date string format', () => {
    test('accepts YYYY-MM-DD format', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
    });

    test('handles different dates', () => {
        expect(typeof moonPhase("2020-05-20")).toBe('string');
    });
});

describe('moonPhase - cycle accuracy', () => {
    test('28 days equals one complete cycle', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-02-03")).toBe("New");
    });

    test('56 days equals two complete cycles', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-03-02")).toBe("New");
    });
});

describe('moonPhase - specific day calculations', () => {
    test('7 days after reference', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
    });

    test('14 days after reference', () => {
        expect(moonPhase("2000-01-19")).toBe("Waxing");
    });

    test('21 days after reference', () => {
        expect(moonPhase("2000-01-26")).toBe("Full");
    });

    test('28 days after reference', () => {
        expect(moonPhase("2000-02-02")).toBe("Waning");
    });
});

describe('moonPhase - edge cases within phases', () => {
    test('first day of New', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
    });

    test('last day of New', () => {
        expect(moonPhase("2000-01-12")).toBe("New");
    });

    test('first day of Waxing', () => {
        expect(moonPhase("2000-01-13")).toBe("Waxing");
    });

    test('last day of Waxing', () => {
        expect(moonPhase("2000-01-19")).toBe("Waxing");
    });

    test('first day of Full', () => {
        expect(moonPhase("2000-01-20")).toBe("Full");
    });

    test('last day of Full', () => {
        expect(moonPhase("2000-01-26")).toBe("Full");
    });

    test('first day of Waning', () => {
        expect(moonPhase("2000-01-27")).toBe("Waning");
    });

    test('last day of Waning', () => {
        expect(moonPhase("2000-02-02")).toBe("Waning");
    });
});

describe('moonPhase - consistency checks', () => {
    test('same day in different months', () => {
        const result1 = moonPhase("2000-01-15");
        const result2 = moonPhase("2000-02-12");
        expect(typeof result1).toBe('string');
        expect(typeof result2).toBe('string');
    });

    test('phase names are capitalized', () => {
        expect(moonPhase("2000-01-06")).toBe("New");
        expect(moonPhase("2000-01-13")).toBe("Waxing");
        expect(moonPhase("2000-01-20")).toBe("Full");
        expect(moonPhase("2000-01-27")).toBe("Waning");
    });
});

describe('launchFuel - basic tests', () => {
    test('freeCodeCamp test cases', () => {
        expect(launchFuel(50)).toBe(12.4);
        expect(launchFuel(500)).toBe(124.8);
        expect(launchFuel(243)).toBe(60.7);
        expect(launchFuel(11000)).toBe(2749.8);
        expect(launchFuel(6214)).toBe(1553.4);
    });
});

describe('launchFuel - simple calculations', () => {
    test('payload 50 kg', () => {
        expect(launchFuel(50)).toBe(12.4);
    });

    test('payload 100 kg', () => {
        const result = launchFuel(100);
        expect(result).toBeGreaterThan(20);
    });

    test('payload 500 kg', () => {
        expect(launchFuel(500)).toBe(124.8);
    });
});

describe('launchFuel - fuel ratio', () => {
    test('1 kg fuel per 5 kg mass', () => {
        const result = launchFuel(50);
        expect(result).toBeGreaterThan(10);
    });

    test('initial fuel calculation', () => {
        const payload = 50;
        const initialFuel = payload / 5;
        expect(initialFuel).toBe(10);
    });
});

describe('launchFuel - iterative process', () => {
    test('fuel has mass requiring more fuel', () => {
        const result = launchFuel(50);
        expect(result).toBeGreaterThan(10);
        expect(result).toBe(12.4);
    });

    test('stops when additional fuel < 1 kg', () => {
        const result = launchFuel(50);
        expect(typeof result).toBe('number');
    });
});

describe('launchFuel - return value validation', () => {
    test('returns number', () => {
        expect(typeof launchFuel(50)).toBe('number');
    });

    test('positive value', () => {
        expect(launchFuel(50)).toBeGreaterThan(0);
    });

    test('rounded to 1 decimal place', () => {
        const result = launchFuel(50);
        const decimals = result.toString().split('.')[1];
        expect(decimals.length).toBeLessThanOrEqual(1);
    });
});

describe('launchFuel - rounding', () => {
    test('one decimal place', () => {
        expect(launchFuel(50)).toBe(12.4);
    });

    test('proper rounding', () => {
        const result = launchFuel(243);
        expect(result).toBe(60.7);
    });
});

describe('launchFuel - small payloads', () => {
    test('small payload', () => {
        const result = launchFuel(10);
        expect(result).toBeGreaterThan(0);
    });

    test('minimal payload', () => {
        const result = launchFuel(5);
        expect(result).toBeGreaterThan(0);
    });
});

describe('launchFuel - large payloads', () => {
    test('payload 11000 kg', () => {
        expect(launchFuel(11000)).toBe(2749.8);
    });

    test('payload 6214 kg', () => {
        expect(launchFuel(6214)).toBe(1553.4);
    });

    test('large mass requires proportional fuel', () => {
        const fuel1 = launchFuel(100);
        const fuel2 = launchFuel(1000);
        expect(fuel2).toBeGreaterThan(fuel1 * 5);
    });
});

describe('launchFuel - edge cases', () => {
    test('very small payload', () => {
        const result = launchFuel(4);
        expect(result).toBeGreaterThan(0);
    });

    test('payload exactly divisible by 5', () => {
        expect(launchFuel(50)).toBe(12.4);
    });
});

describe('launchFuel - fuel accumulation', () => {
    test('total fuel increases with each iteration', () => {
        const result = launchFuel(50);
        expect(result).toBeGreaterThan(10);
    });

    test('converges to final value', () => {
        const result = launchFuel(500);
        expect(result).toBe(124.8);
    });
});

describe('launchFuel - verification tests', () => {
    test('verify 50 kg', () => {
        expect(launchFuel(50)).toBe(12.4);
    });

    test('verify 500 kg', () => {
        expect(launchFuel(500)).toBe(124.8);
    });

    test('verify 243 kg', () => {
        expect(launchFuel(243)).toBe(60.7);
    });

    test('verify 11000 kg', () => {
        expect(launchFuel(11000)).toBe(2749.8);
    });

    test('verify 6214 kg', () => {
        expect(launchFuel(6214)).toBe(1553.4);
    });
});

describe('launchFuel - calculation accuracy', () => {
    test('50 kg step by step', () => {
        expect(launchFuel(50)).toBe(12.4);
    });

    test('243 kg calculation', () => {
        expect(launchFuel(243)).toBe(60.7);
    });
});

describe('launchFuel - fuel to payload ratio', () => {
    test('fuel is roughly 1/4 of payload', () => {
        const payload = 500;
        const fuel = launchFuel(payload);
        expect(fuel / payload).toBeCloseTo(0.25, 1);
    });

    test('ratio consistent across sizes', () => {
        const ratio1 = launchFuel(50) / 50;
        const ratio2 = launchFuel(500) / 500;
        expect(ratio1).toBeCloseTo(ratio2, 2);
    });
});

describe('launchFuel - stopping condition', () => {
    test('stops when additional fuel < 1', () => {
        const result = launchFuel(50);
        expect(result).toBe(12.4);
    });

    test('includes all significant fuel', () => {
        const result = launchFuel(243);
        expect(result).toBe(60.7);
    });
});

describe('launchFuel - different payload sizes', () => {
    test('medium payload', () => {
        expect(launchFuel(243)).toBe(60.7);
    });

    test('large payload', () => {
        expect(launchFuel(6214)).toBe(1553.4);
    });

    test('very large payload', () => {
        expect(launchFuel(11000)).toBe(2749.8);
    });
});

describe('launchFuel - recursive nature', () => {
    test('each iteration adds fuel', () => {
        const result = launchFuel(50);
        expect(result).toBeGreaterThan(10);
        expect(result).toBeLessThan(15);
    });

    test('process converges', () => {
        const result = launchFuel(500);
        expect(typeof result).toBe('number');
        expect(result).toBe(124.8);
    });
});

describe('launchFuel - mass increase calculation', () => {
    test('total mass increases with fuel', () => {
        const payload = 50;
        const fuel = launchFuel(payload);
        const totalMass = payload + fuel;
        expect(totalMass).toBe(62.4);
    });

    test('fuel adds to mass requiring more fuel', () => {
        const fuel = launchFuel(50);
        expect(fuel).toBeGreaterThan(10);
    });
});

describe('launchFuel - precision tests', () => {
    test('maintains precision', () => {
        expect(launchFuel(50)).toBe(12.4);
    });

    test('accurate for large values', () => {
        expect(launchFuel(11000)).toBe(2749.8);
    });
});

describe('launchFuel - example walkthrough', () => {
    test('50 kg example', () => {
        const result = launchFuel(50);
        expect(result).toBe(12.4);
    });

    test('total mass is payload plus fuel', () => {
        const payload = 50;
        const fuel = launchFuel(payload);
        expect(payload + fuel).toBe(62.4);
    });
});

describe('launchFuel - boundary conditions', () => {
    test('handles various payload sizes', () => {
        expect(launchFuel(50)).toBeGreaterThan(0);
        expect(launchFuel(500)).toBeGreaterThan(0);
        expect(launchFuel(11000)).toBeGreaterThan(0);
    });

    test('fuel always positive', () => {
        expect(launchFuel(10)).toBeGreaterThan(0);
        expect(launchFuel(100)).toBeGreaterThan(0);
    });
});

describe('extractAttributes - freeCodeCamp tests', () => {
    it('extracts single class attribute', () => {
      expect(extractAttributes('<span class="red"></span>'))
        .toEqual(["class, red"]);
    });

    it('extracts charset from meta tag', () => {
      expect(extractAttributes('<meta charset="UTF-8" />'))
        .toEqual(["charset, UTF-8"]);
    });

    it('returns empty array for no attributes', () => {
      expect(extractAttributes("<p>Lorem ipsum dolor sit amet</p>"))
        .toEqual([]);
    });

    it('extracts multiple attributes from input', () => {
      expect(extractAttributes('<input name="email" type="email" required="true" />'))
        .toEqual(["name, email", "type, email", "required, true"]);
    });

    it('extracts id and class from button', () => {
      expect(extractAttributes('<button id="submit" class="btn btn-primary">Submit</button>'))
        .toEqual(["id, submit", "class, btn btn-primary"]);
    });
});

describe('extractAttributes - empty and no attributes', () => {
    it('returns empty array for self-closing tag', () => {
      expect(extractAttributes('<br />')).toEqual([]);
    });

    it('returns empty array for simple div', () => {
      expect(extractAttributes('<div></div>')).toEqual([]);
    });

    it('returns empty array for tag with content only', () => {
      expect(extractAttributes('<h1>Title</h1>')).toEqual([]);
    });

    it('returns empty array for img without attributes', () => {
      expect(extractAttributes('<img />')).toEqual([]);
    });
});

describe('extractAttributes - single attribute', () => {
    it('extracts id attribute', () => {
      expect(extractAttributes('<div id="main"></div>'))
        .toEqual(["id, main"]);
    });

    it('extracts src attribute', () => {
      expect(extractAttributes('<img src="image.png" />'))
        .toEqual(["src, image.png"]);
    });

    it('extracts href attribute', () => {
      expect(extractAttributes('<a href="https://example.com">Link</a>'))
        .toEqual(["href, https://example.com"]);
    });

    it('extracts type attribute', () => {
      expect(extractAttributes('<input type="text" />'))
        .toEqual(["type, text"]);
    });

    it('extracts name attribute', () => {
      expect(extractAttributes('<button name="submit">Click</button>'))
        .toEqual(["name, submit"]);
    });
});

describe('extractAttributes - multiple attributes', () => {
    it('extracts two attributes', () => {
      expect(extractAttributes('<div id="container" class="wrapper"></div>'))
        .toEqual(["id, container", "class, wrapper"]);
    });

    it('extracts three attributes', () => {
      expect(extractAttributes('<img src="photo.jpg" alt="Photo" width="500" />'))
        .toEqual(["src, photo.jpg", "alt, Photo", "width, 500"]);
    });

    it('extracts four attributes', () => {
      expect(extractAttributes('<input id="email" name="email" type="email" placeholder="Enter email" />'))
        .toEqual(["id, email", "name, email", "type, email", "placeholder, Enter email"]);
    });

    it('extracts five attributes', () => {
      expect(extractAttributes('<button id="btn" class="primary" type="submit" name="action" value="save">Save</button>'))
        .toEqual(["id, btn", "class, primary", "type, submit", "name, action", "value, save"]);
    });
});

describe('extractAttributes - attribute order', () => {
    it('preserves order of attributes', () => {
      const result = extractAttributes('<div class="a" id="b" style="c"></div>');
      expect(result[0]).toBe("class, a");
      expect(result[1]).toBe("id, b");
      expect(result[2]).toBe("style, c");
    });

    it('maintains order with mixed attributes', () => {
      const result = extractAttributes('<input type="text" name="username" id="user" />');
      expect(result[0]).toBe("type, text");
      expect(result[1]).toBe("name, username");
      expect(result[2]).toBe("id, user");
    });
});

describe('extractAttributes - attribute values', () => {
    it('handles empty value', () => {
      expect(extractAttributes('<input value="" />'))
        .toEqual(["value, "]);
    });

    it('handles numeric values', () => {
      expect(extractAttributes('<input maxlength="100" />'))
        .toEqual(["maxlength, 100"]);
    });

    it('handles hyphenated values', () => {
      expect(extractAttributes('<div class="my-custom-class"></div>'))
        .toEqual(["class, my-custom-class"]);
    });

    it('handles multiple words in value', () => {
      expect(extractAttributes('<div title="This is a title"></div>'))
        .toEqual(["title, This is a title"]);
    });

    it('handles special characters in value', () => {
      expect(extractAttributes('<input pattern="[A-Za-z0-9]+" />'))
        .toEqual(["pattern, [A-Za-z0-9]+"]);
    });

    it('handles URL with query parameters', () => {
      expect(extractAttributes('<a href="https://example.com?page=1&sort=asc">Link</a>'))
        .toEqual(["href, https://example.com?page=1&sort=asc"]);
    });
});

describe('extractAttributes - common HTML elements', () => {
    it('extracts from link tag', () => {
      expect(extractAttributes('<link rel="stylesheet" href="styles.css" />'))
        .toEqual(["rel, stylesheet", "href, styles.css"]);
    });

    it('extracts from script tag', () => {
      expect(extractAttributes('<script src="app.js" type="text/javascript"></script>'))
        .toEqual(["src, app.js", "type, text/javascript"]);
    });

    it('extracts from form tag', () => {
      expect(extractAttributes('<form action="/submit" method="POST"></form>'))
        .toEqual(["action, /submit", "method, POST"]);
    });

    it('extracts from textarea', () => {
      expect(extractAttributes('<textarea rows="4" cols="50" name="comment"></textarea>'))
        .toEqual(["rows, 4", "cols, 50", "name, comment"]);
    });

    it('extracts from select', () => {
      expect(extractAttributes('<select name="country" id="country-select"></select>'))
        .toEqual(["name, country", "id, country-select"]);
    });
});

describe('extractAttributes - data attributes', () => {
    it('extracts single data attribute', () => {
      expect(extractAttributes('<div data-id="123"></div>'))
        .toEqual(["data-id, 123"]);
    });

    it('extracts multiple data attributes', () => {
      expect(extractAttributes('<div data-user="john" data-role="admin"></div>'))
        .toEqual(["data-user, john", "data-role, admin"]);
    });

    it('extracts mixed data and regular attributes', () => {
      expect(extractAttributes('<button id="btn" data-action="delete" class="danger">Delete</button>'))
        .toEqual(["id, btn", "data-action, delete", "class, danger"]);
    });
});

describe('extractAttributes - boolean-like attributes', () => {
    it('extracts required attribute', () => {
      expect(extractAttributes('<input type="text" required="required" />'))
        .toEqual(["type, text", "required, required"]);
    });

    it('extracts disabled attribute', () => {
      expect(extractAttributes('<button disabled="true">Click</button>'))
        .toEqual(["disabled, true"]);
    });

    it('extracts checked attribute', () => {
      expect(extractAttributes('<input type="checkbox" checked="checked" />'))
        .toEqual(["type, checkbox", "checked, checked"]);
    });

    it('extracts readonly attribute', () => {
      expect(extractAttributes('<input type="text" readonly="readonly" />'))
        .toEqual(["type, text", "readonly, readonly"]);
    });
});

describe('extractAttributes - edge cases', () => {
    it('handles attribute with path value', () => {
      expect(extractAttributes('<img src="/images/logo.png" />'))
        .toEqual(["src, /images/logo.png"]);
    });

    it('handles attribute with dots in value', () => {
      expect(extractAttributes('<a href="page.html">Link</a>'))
        .toEqual(["href, page.html"]);
    });

    it('handles attribute with underscores', () => {
      expect(extractAttributes('<div class="my_class_name"></div>'))
        .toEqual(["class, my_class_name"]);
    });

    it('handles numeric attribute name', () => {
      expect(extractAttributes('<div data123="value"></div>'))
        .toEqual(["data123, value"]);
    });
});

describe('extractAttributes - complex class values', () => {
    it('handles multiple classes', () => {
      expect(extractAttributes('<div class="container main active"></div>'))
        .toEqual(["class, container main active"]);
    });

    it('handles BEM notation', () => {
      expect(extractAttributes('<div class="block__element--modifier"></div>'))
        .toEqual(["class, block__element--modifier"]);
    });

    it('handles utility classes', () => {
      expect(extractAttributes('<div class="flex items-center justify-between"></div>'))
        .toEqual(["class, flex items-center justify-between"]);
    });
});

describe('extractAttributes - style attribute', () => {
    it('extracts style with single property', () => {
      expect(extractAttributes('<div style="color: red;"></div>'))
        .toEqual(["style, color: red;"]);
    });

    it('extracts style with multiple properties', () => {
      expect(extractAttributes('<div style="color: blue; font-size: 16px;"></div>'))
        .toEqual(["style, color: blue; font-size: 16px;"]);
    });
});

describe('extractAttributes - self-closing tags', () => {
    it('handles meta tag', () => {
      expect(extractAttributes('<meta name="viewport" content="width=device-width" />'))
        .toEqual(["name, viewport", "content, width=device-width"]);
    });

    it('handles input tag', () => {
      expect(extractAttributes('<input type="submit" value="Send" />'))
        .toEqual(["type, submit", "value, Send"]);
    });

    it('handles br tag with attributes', () => {
      expect(extractAttributes('<br class="clear" />'))
        .toEqual(["class, clear"]);
    });
});

describe('extractAttributes - attributes with numbers', () => {
    it('extracts width and height', () => {
      expect(extractAttributes('<img width="800" height="600" />'))
        .toEqual(["width, 800", "height, 600"]);
    });

    it('extracts tabindex', () => {
      expect(extractAttributes('<button tabindex="1">Button</button>'))
        .toEqual(["tabindex, 1"]);
    });

    it('extracts colspan', () => {
      expect(extractAttributes('<td colspan="2">Cell</td>'))
        .toEqual(["colspan, 2"]);
    });
});

describe('calculateTips - freeCodeCamp tests', () => {
    it('calculates tips for $10.00 with 25% custom', () => {
      expect(calculateTips("$10.00", "25%"))
        .toEqual(["$1.50", "$2.00", "$2.50"]);
    });

    it('calculates tips for $89.67 with 26% custom', () => {
      expect(calculateTips("$89.67", "26%"))
        .toEqual(["$13.45", "$17.93", "$23.31"]);
    });

    it('calculates tips for $19.85 with 9% custom', () => {
      expect(calculateTips("$19.85", "9%"))
        .toEqual(["$2.98", "$3.97", "$1.79"]);
    });
});

describe('calculateTips - small amounts', () => {
    it('handles $1.00 meal', () => {
      const result = calculateTips("$1.00", "10%");
      expect(result[0]).toBe("$0.15");
      expect(result[1]).toBe("$0.20");
      expect(result[2]).toBe("$0.10");
    });

    it('handles $5.00 meal', () => {
      const result = calculateTips("$5.00", "15%");
      expect(result[0]).toBe("$0.75");
      expect(result[1]).toBe("$1.00");
      expect(result[2]).toBe("$0.75");
    });

    it('handles $0.50 meal', () => {
      const result = calculateTips("$0.50", "20%");
      expect(result[0]).toBe("$0.07");
      expect(result[1]).toBe("$0.10");
      expect(result[2]).toBe("$0.10");
    });
});

describe('calculateTips - medium amounts', () => {
    it('handles $25.00 meal', () => {
      expect(calculateTips("$25.00", "18%"))
        .toEqual(["$3.75", "$5.00", "$4.50"]);
    });

    it('handles $50.00 meal', () => {
      expect(calculateTips("$50.00", "22%"))
        .toEqual(["$7.50", "$10.00", "$11.00"]);
    });

    it('handles $75.50 meal', () => {
      expect(calculateTips("$75.50", "20%"))
        .toEqual(["$11.32", "$15.10", "$15.10"]);
    });
});

describe('calculateTips - large amounts', () => {
    it('handles $100.00 meal', () => {
      expect(calculateTips("$100.00", "25%"))
        .toEqual(["$15.00", "$20.00", "$25.00"]);
    });

    it('handles $250.00 meal', () => {
      expect(calculateTips("$250.00", "18%"))
        .toEqual(["$37.50", "$50.00", "$45.00"]);
    });

    it('handles $500.00 meal', () => {
      expect(calculateTips("$500.00", "15%"))
        .toEqual(["$75.00", "$100.00", "$75.00"]);
    });
});

describe('calculateTips - custom tip percentages', () => {
    it('handles 0% custom tip', () => {
      const result = calculateTips("$20.00", "0%");
      expect(result[2]).toBe("$0.00");
    });

    it('handles 5% custom tip', () => {
      const result = calculateTips("$40.00", "5%");
      expect(result[2]).toBe("$2.00");
    });

    it('handles 10% custom tip', () => {
      const result = calculateTips("$30.00", "10%");
      expect(result[2]).toBe("$3.00");
    });

    it('handles 30% custom tip', () => {
      const result = calculateTips("$50.00", "30%");
      expect(result[2]).toBe("$15.00");
    });

    it('handles 50% custom tip', () => {
      const result = calculateTips("$20.00", "50%");
      expect(result[2]).toBe("$10.00");
    });
});

describe('calculateTips - decimal prices', () => {
    it('handles $12.50 meal', () => {
      expect(calculateTips("$12.50", "20%"))
        .toEqual(["$1.88", "$2.50", "$2.50"]);
    });

    it('handles $33.33 meal', () => {
      expect(calculateTips("$33.33", "15%"))
        .toEqual(["$5.00", "$6.67", "$5.00"]);
    });

    it('handles $99.99 meal', () => {
      expect(calculateTips("$99.99", "18%"))
        .toEqual(["$15.00", "$20.00", "$18.00"]);
    });

    it('handles $7.25 meal', () => {
      expect(calculateTips("$7.25", "22%"))
        .toEqual(["$1.09", "$1.45", "$1.59"]);
    });
});

describe('calculateTips - rounding precision', () => {
    it('rounds to two decimal places case 1', () => {
      const result = calculateTips("$13.47", "17%");
      expect(result[0]).toBe("$2.02");
      expect(result[1]).toBe("$2.69");
      expect(result[2]).toBe("$2.29");
    });

    it('rounds to two decimal places case 2', () => {
      const result = calculateTips("$27.89", "23%");
      expect(result[0]).toBe("$4.18");
      expect(result[1]).toBe("$5.58");
      expect(result[2]).toBe("$6.41");
    });

    it('rounds to two decimal places case 3', () => {
      const result = calculateTips("$45.67", "19%");
      expect(result[0]).toBe("$6.85");
      expect(result[1]).toBe("$9.13");
      expect(result[2]).toBe("$8.68");
    });
});

describe('calculateTips - return format', () => {
    it('returns array with three elements', () => {
      const result = calculateTips("$15.00", "20%");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
    });

    it('returns strings with dollar signs', () => {
      const result = calculateTips("$20.00", "15%");
      expect(result[0].startsWith("$")).toBe(true);
      expect(result[1].startsWith("$")).toBe(true);
      expect(result[2].startsWith("$")).toBe(true);
    });

    it('returns strings with two decimal places', () => {
      const result = calculateTips("$25.00", "18%");
      expect(result[0].split(".")[1].length).toBe(2);
      expect(result[1].split(".")[1].length).toBe(2);
      expect(result[2].split(".")[1].length).toBe(2);
    });
});

describe('calculateTips - 15% and 20% tips', () => {
    it('15% tip is always first element', () => {
      const result = calculateTips("$40.00", "25%");
      expect(result[0]).toBe("$6.00");
    });

    it('20% tip is always second element', () => {
      const result = calculateTips("$40.00", "25%");
      expect(result[1]).toBe("$8.00");
    });

    it('custom tip is always third element', () => {
      const result = calculateTips("$40.00", "25%");
      expect(result[2]).toBe("$10.00");
    });
});

describe('calculateTips - edge cases', () => {
    it('handles very small price', () => {
      const result = calculateTips("$0.10", "20%");
      expect(result[0]).toBe("$0.01");
      expect(result[1]).toBe("$0.02");
      expect(result[2]).toBe("$0.02");
    });

    it('handles 1% custom tip', () => {
      const result = calculateTips("$100.00", "1%");
      expect(result[2]).toBe("$1.00");
    });

    it('handles 99% custom tip', () => {
      const result = calculateTips("$10.00", "99%");
      expect(result[2]).toBe("$9.90");
    });
});

describe('calculateTips - real world scenarios', () => {
    it('coffee shop purchase', () => {
      expect(calculateTips("$4.75", "10%"))
        .toEqual(["$0.71", "$0.95", "$0.48"]);
    });

    it('lunch for one', () => {
      expect(calculateTips("$15.50", "18%"))
        .toEqual(["$2.32", "$3.10", "$2.79"]);
    });

    it('dinner for two', () => {
      expect(calculateTips("$65.80", "20%"))
        .toEqual(["$9.87", "$13.16", "$13.16"]);
    });

    it('group dinner', () => {
      expect(calculateTips("$142.35", "22%"))
        .toEqual(["$21.35", "$28.47", "$31.32"]);
    });
});

describe('calculateTips - various custom percentages', () => {
    it('handles 12% custom tip', () => {
      expect(calculateTips("$50.00", "12%"))
        .toEqual(["$7.50", "$10.00", "$6.00"]);
    });

    it('handles 16% custom tip', () => {
      expect(calculateTips("$75.00", "16%"))
        .toEqual(["$11.25", "$15.00", "$12.00"]);
    });

    it('handles 24% custom tip', () => {
      expect(calculateTips("$30.00", "24%"))
        .toEqual(["$4.50", "$6.00", "$7.20"]);
    });
});

describe('adjustThermostat - freeCodeCamp tests', () => {
    it('32F and 0C should hold', () => {
      expect(adjustThermostat(32, 0)).toBe("Hold");
    });

    it('70F and 25C should heat 7.0 degrees', () => {
      expect(adjustThermostat(70, 25)).toBe("Heat: 7.0 degrees Fahrenheit");
    });

    it('72F and 18C should cool 7.6 degrees', () => {
      expect(adjustThermostat(72, 18)).toBe("Cool: 7.6 degrees Fahrenheit");
    });

    it('212F and 100C should hold', () => {
      expect(adjustThermostat(212, 100)).toBe("Hold");
    });

    it('59F and 22C should heat 12.6 degrees', () => {
      expect(adjustThermostat(59, 22)).toBe("Heat: 12.6 degrees Fahrenheit");
    });
});

describe('adjustThermostat - hold scenarios', () => {
    it('freezing point match', () => {
      expect(adjustThermostat(32, 0)).toBe("Hold");
    });

    it('boiling point match', () => {
      expect(adjustThermostat(212, 100)).toBe("Hold");
    });

    it('room temperature match', () => {
      expect(adjustThermostat(68, 20)).toBe("Hold");
    });

    it('body temperature match', () => {
      expect(adjustThermostat(98.6, 37)).toBe("Heat: 0.0 degrees Fahrenheit");
    });
});

describe('adjustThermostat - heating scenarios', () => {
    it('needs slight heating', () => {
      expect(adjustThermostat(70, 22)).toBe("Heat: 1.6 degrees Fahrenheit");
    });

    it('needs moderate heating', () => {
      expect(adjustThermostat(60, 20)).toBe("Heat: 8.0 degrees Fahrenheit");
    });

    it('needs significant heating', () => {
      expect(adjustThermostat(50, 25)).toBe("Heat: 27.0 degrees Fahrenheit");
    });

    it('needs extreme heating from freezing', () => {
      expect(adjustThermostat(32, 25)).toBe("Heat: 45.0 degrees Fahrenheit");
    });
});

describe('adjustThermostat - cooling scenarios', () => {
    it('needs slight cooling', () => {
      expect(adjustThermostat(70, 20)).toBe("Cool: 2.0 degrees Fahrenheit");
    });

    it('needs moderate cooling', () => {
      expect(adjustThermostat(80, 20)).toBe("Cool: 12.0 degrees Fahrenheit");
    });

    it('needs significant cooling', () => {
      expect(adjustThermostat(90, 20)).toBe("Cool: 22.0 degrees Fahrenheit");
    });

    it('needs extreme cooling', () => {
      expect(adjustThermostat(100, 20)).toBe("Cool: 32.0 degrees Fahrenheit");
    });
});

describe('adjustThermostat - decimal precision', () => {
    it('heating with .1 decimal', () => {
      expect(adjustThermostat(65, 19)).toBe("Heat: 1.2 degrees Fahrenheit");
    });

    it('heating with .5 decimal', () => {
      expect(adjustThermostat(70, 23)).toBe("Heat: 3.4 degrees Fahrenheit");
    });

    it('cooling with .4 decimal', () => {
      expect(adjustThermostat(75, 21)).toBe("Cool: 5.2 degrees Fahrenheit");
    });

    it('cooling with .8 decimal', () => {
      expect(adjustThermostat(80, 24)).toBe("Cool: 4.8 degrees Fahrenheit");
    });
});

describe('adjustThermostat - negative Celsius', () => {
    it('handles -10C', () => {
      expect(adjustThermostat(20, -10)).toBe("Cool: 6.0 degrees Fahrenheit");
    });

    it('handles -20C', () => {
      expect(adjustThermostat(0, -20)).toBe("Cool: 4.0 degrees Fahrenheit");
    });

    it('handles 0C from below freezing', () => {
      expect(adjustThermostat(30, 0)).toBe("Heat: 2.0 degrees Fahrenheit");
    });
});

describe('adjustThermostat - common temperature targets', () => {
    it('comfortable room temp 20C from 65F', () => {
      expect(adjustThermostat(65, 20)).toBe("Heat: 3.0 degrees Fahrenheit");
    });

    it('comfortable room temp 21C from 72F', () => {
      expect(adjustThermostat(72, 21)).toBe("Cool: 2.2 degrees Fahrenheit");
    });

    it('warm room 25C from 70F', () => {
      expect(adjustThermostat(70, 25)).toBe("Heat: 7.0 degrees Fahrenheit");
    });

    it('cool room 18C from 68F', () => {
      expect(adjustThermostat(68, 18)).toBe("Cool: 3.6 degrees Fahrenheit");
    });
});

describe('adjustThermostat - extreme temperatures', () => {
    it('very hot room to comfortable', () => {
      expect(adjustThermostat(110, 22)).toBe("Cool: 38.4 degrees Fahrenheit");
    });

    it('very cold room to comfortable', () => {
      expect(adjustThermostat(40, 22)).toBe("Heat: 31.6 degrees Fahrenheit");
    });

    it('high target temperature', () => {
      expect(adjustThermostat(80, 35)).toBe("Heat: 15.0 degrees Fahrenheit");
    });
});

describe('adjustThermostat - conversion accuracy', () => {
    it('0C converts to 32F', () => {
      const result = adjustThermostat(32, 0);
      expect(result).toBe("Hold");
    });

    it('100C converts to 212F', () => {
      const result = adjustThermostat(212, 100);
      expect(result).toBe("Hold");
    });

    it('37C converts to 98.6F (with floating point)', () => {
      const result = adjustThermostat(98.6, 37);
      expect(result).toBe("Heat: 0.0 degrees Fahrenheit");
    });

    it('-40C converts to -40F', () => {
      const result = adjustThermostat(-40, -40);
      expect(result).toBe("Hold");
    });
});

describe('adjustThermostat - return format', () => {
    it('heat message includes degree symbol context', () => {
      const result = adjustThermostat(60, 20);
      expect(result).toContain("Heat:");
      expect(result).toContain("degrees Fahrenheit");
    });

    it('cool message includes degree symbol context', () => {
      const result = adjustThermostat(80, 20);
      expect(result).toContain("Cool:");
      expect(result).toContain("degrees Fahrenheit");
    });

    it('hold message is exact', () => {
      const result = adjustThermostat(68, 20);
      expect(result).toBe("Hold");
    });
});

describe('adjustThermostat - rounding to 1 decimal', () => {
    it('rounds .05 up', () => {
      expect(adjustThermostat(70, 21.083)).toBe("Cool: 0.1 degrees Fahrenheit");
    });

    it('displays .0 for whole numbers', () => {
      expect(adjustThermostat(60, 20)).toBe("Heat: 8.0 degrees Fahrenheit");
    });

    it('preserves single decimal', () => {
      expect(adjustThermostat(70, 22)).toBe("Heat: 1.6 degrees Fahrenheit");
    });
});

describe('adjustThermostat - boundary cases', () => {
    it('very small heating needed', () => {
      expect(adjustThermostat(68.5, 20.5)).toBe("Heat: 0.4 degrees Fahrenheit");
    });

    it('very small cooling needed', () => {
      expect(adjustThermostat(68.5, 20)).toBe("Cool: 0.5 degrees Fahrenheit");
    });

    it('large temperature difference heating', () => {
      expect(adjustThermostat(32, 40)).toBe("Heat: 72.0 degrees Fahrenheit");
    });

    it('large temperature difference cooling', () => {
      expect(adjustThermostat(104, 20)).toBe("Cool: 36.0 degrees Fahrenheit");
    });
});

describe('wiseSpeak - freeCodeCamp tests', () => {
    it('transforms with must', () => {
      expect(wiseSpeak("You must speak wisely."))
        .toBe("Speak wisely, you must.");
    });

    it('transforms with can', () => {
      expect(wiseSpeak("You can do it!"))
        .toBe("Do it, you can!");
    });

    it('transforms with will', () => {
      expect(wiseSpeak("Do you think you will complete this?"))
        .toBe("Complete this, do you think you will?");
    });

    it('transforms with are', () => {
      expect(wiseSpeak("All your base are belong to us."))
        .toBe("Belong to us, all your base are.");
    });

    it('transforms with have', () => {
      expect(wiseSpeak("You have much to learn."))
        .toBe("Much to learn, you have.");
    });
});

describe('wiseSpeak - must keyword', () => {
    it('simple must sentence', () => {
      expect(wiseSpeak("We must go now."))
        .toBe("Go now, we must.");
    });

    it('must at start', () => {
      expect(wiseSpeak("Must you leave?"))
        .toBe("You leave, must?");
    });

    it('must with multiple words before', () => {
      expect(wiseSpeak("The young Padawan must train hard."))
        .toBe("Train hard, the young padawan must.");
    });
});

describe('wiseSpeak - can keyword', () => {
    it('simple can sentence', () => {
      expect(wiseSpeak("You can succeed."))
        .toBe("Succeed, you can.");
    });

    it('can with exclamation', () => {
      expect(wiseSpeak("I can feel the Force!"))
        .toBe("Feel the Force, i can!");
    });

    it('can with question mark', () => {
      expect(wiseSpeak("Can you see the truth?"))
        .toBe("You see the truth, can?");
    });
});

describe('wiseSpeak - will keyword', () => {
    it('simple will sentence', () => {
      expect(wiseSpeak("They will arrive soon."))
        .toBe("Arrive soon, they will.");
    });

    it('will with long sentence', () => {
      expect(wiseSpeak("The Force will guide you."))
        .toBe("Guide you, the force will.");
    });

    it('will in middle of sentence', () => {
      expect(wiseSpeak("Tomorrow we will begin training."))
        .toBe("Begin training, tomorrow we will.");
    });
});

describe('wiseSpeak - are keyword', () => {
    it('simple are sentence', () => {
      expect(wiseSpeak("You are ready."))
        .toBe("Ready, you are.");
    });

    it('are with multiple words', () => {
      expect(wiseSpeak("The stars are shining bright."))
        .toBe("Shining bright, the stars are.");
    });

    it('are with exclamation', () => {
      expect(wiseSpeak("We are victorious!"))
        .toBe("Victorious, we are!");
    });
});

describe('wiseSpeak - have keyword', () => {
    it('simple have sentence', () => {
      expect(wiseSpeak("I have seen this."))
        .toBe("Seen this, i have.");
    });

    it('have with question', () => {
      expect(wiseSpeak("Do you have the answer?"))
        .toBe("The answer, do you have?");
    });

    it('have with long phrase', () => {
      expect(wiseSpeak("You have great power within."))
        .toBe("Great power within, you have.");
    });
});

describe('wiseSpeak - punctuation handling', () => {
    it('preserves period', () => {
      const result = wiseSpeak("You must try.");
      expect(result.endsWith(".")).toBe(true);
    });

    it('preserves exclamation', () => {
      const result = wiseSpeak("You can win!");
      expect(result.endsWith("!")).toBe(true);
    });

    it('preserves question mark', () => {
      const result = wiseSpeak("Will you help?");
      expect(result.endsWith("?")).toBe(true);
    });
});

describe('wiseSpeak - capitalization', () => {
    it('capitalizes new first word', () => {
      const result = wiseSpeak("You must believe.");
      expect(result.charAt(0)).toBe("B");
    });

    it('lowercases moved words', () => {
      expect(wiseSpeak("YOU MUST TRY."))
        .toBe("TRY, you must.");
    });

    it('handles mixed case', () => {
      expect(wiseSpeak("The FORCE will guide."))
        .toBe("Guide, the force will.");
    });
});

describe('wiseSpeak - first occurrence rule', () => {
    it('uses first must when multiple keywords', () => {
      expect(wiseSpeak("You must know you can win."))
        .toBe("Know you can win, you must.");
    });

    it('uses first can when can and will present', () => {
      expect(wiseSpeak("You can try but will fail."))
        .toBe("Try but will fail, you can.");
    });

    it('uses first keyword in order', () => {
      expect(wiseSpeak("The student will have wisdom."))
        .toBe("Have wisdom, the student will.");
    });
});

describe('wiseSpeak - word order preservation', () => {
    it('preserves order of moved words', () => {
      expect(wiseSpeak("One two three must four five."))
        .toBe("Four five, one two three must.");
    });

    it('preserves complex order', () => {
      expect(wiseSpeak("The wise old master will teach."))
        .toBe("Teach, the wise old master will.");
    });
});

describe('wiseSpeak - comma insertion', () => {
    it('adds comma before moved words', () => {
      const result = wiseSpeak("You must learn.");
      expect(result).toContain(", ");
    });

    it('has single space after comma', () => {
      const result = wiseSpeak("We can win.");
      const commaIndex = result.indexOf(",");
      expect(result.charAt(commaIndex + 1)).toBe(" ");
    });
});

describe('wiseSpeak - spacing', () => {
    it('has no leading spaces', () => {
      const result = wiseSpeak("You must go.");
      expect(result.charAt(0)).not.toBe(" ");
    });

    it('has no trailing spaces before punctuation', () => {
      const result = wiseSpeak("You will see.");
      expect(result.charAt(result.length - 2)).not.toBe(" ");
    });

    it('has single spaces between words', () => {
      const result = wiseSpeak("You must believe deeply.");
      expect(result).not.toContain("  ");
    });
});

describe('wiseSpeak - short sentences', () => {
    it('two words with must', () => {
      expect(wiseSpeak("Must go."))
        .toBe("Go, must.");
    });

    it('three words', () => {
      expect(wiseSpeak("You can win."))
        .toBe("Win, you can.");
    });
});

describe('wiseSpeak - long sentences', () => {
    it('handles long philosophical sentence', () => {
      expect(wiseSpeak("The path to wisdom will require patience."))
        .toBe("Require patience, the path to wisdom will.");
    });

    it('handles very long sentence', () => {
      expect(wiseSpeak("In the ancient texts you will find great knowledge."))
        .toBe("Find great knowledge, in the ancient texts you will.");
    });
});

describe('wiseSpeak - edge cases', () => {
    it('keyword at very start', () => {
      expect(wiseSpeak("Must you go now?"))
        .toBe("You go now, must?");
    });

    it('single word after keyword', () => {
      expect(wiseSpeak("You must go."))
        .toBe("Go, you must.");
    });

    it('many words before keyword', () => {
      expect(wiseSpeak("The young and eager student must learn."))
        .toBe("Learn, the young and eager student must.");
    });
});

describe('favoriteSongs - freeCodeCamp tests', () => {
    it('returns two most played from three songs', () => {
      const playlist = [
        {"title": "Sync or Swim", "plays": 3},
        {"title": "Byte Me", "plays": 1},
        {"title": "Earbud Blues", "plays": 2}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Sync or Swim", "Earbud Blues"]);
    });

    it('handles high play counts', () => {
      const playlist = [
        {"title": "Skip Track", "plays": 98},
        {"title": "99 Downloads", "plays": 99},
        {"title": "Clickwheel Love", "plays": 100}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Clickwheel Love", "99 Downloads"]);
    });

    it('returns correct order with various counts', () => {
      const playlist = [
        {"title": "Song A", "plays": 42},
        {"title": "Song B", "plays": 99},
        {"title": "Song C", "plays": 75}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Song B", "Song C"]);
    });
});

describe('favoriteSongs - ordering', () => {
    it('most played song is first', () => {
      const playlist = [
        {"title": "Low", "plays": 5},
        {"title": "High", "plays": 50},
        {"title": "Medium", "plays": 20}
      ];
      const result = favoriteSongs(playlist);
      expect(result[0]).toBe("High");
    });

    it('second most played is second', () => {
      const playlist = [
        {"title": "Low", "plays": 5},
        {"title": "High", "plays": 50},
        {"title": "Medium", "plays": 20}
      ];
      const result = favoriteSongs(playlist);
      expect(result[1]).toBe("Medium");
    });
});

describe('favoriteSongs - return format', () => {
    it('returns array with two elements', () => {
      const playlist = [
        {"title": "A", "plays": 1},
        {"title": "B", "plays": 2},
        {"title": "C", "plays": 3}
      ];
      const result = favoriteSongs(playlist);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('returns only titles, not objects', () => {
      const playlist = [
        {"title": "Song1", "plays": 10},
        {"title": "Song2", "plays": 20}
      ];
      const result = favoriteSongs(playlist);
      expect(typeof result[0]).toBe("string");
      expect(typeof result[1]).toBe("string");
    });
});

describe('favoriteSongs - equal play counts', () => {
    it('handles two songs with same plays', () => {
      const playlist = [
        {"title": "First", "plays": 10},
        {"title": "Second", "plays": 10},
        {"title": "Third", "plays": 5}
      ];
      const result = favoriteSongs(playlist);
      expect(result.length).toBe(2);
      expect(result).toContain("First");
      expect(result).toContain("Second");
    });

    it('handles all equal plays', () => {
      const playlist = [
        {"title": "A", "plays": 7},
        {"title": "B", "plays": 7},
        {"title": "C", "plays": 7}
      ];
      const result = favoriteSongs(playlist);
      expect(result.length).toBe(2);
    });
});

describe('favoriteSongs - various playlist sizes', () => {
    it('handles exactly three songs', () => {
      const playlist = [
        {"title": "One", "plays": 100},
        {"title": "Two", "plays": 50},
        {"title": "Three", "plays": 25}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["One", "Two"]);
    });

    it('handles four songs', () => {
      const playlist = [
        {"title": "A", "plays": 10},
        {"title": "B", "plays": 40},
        {"title": "C", "plays": 30},
        {"title": "D", "plays": 20}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["B", "C"]);
    });

    it('handles five songs', () => {
      const playlist = [
        {"title": "Song1", "plays": 5},
        {"title": "Song2", "plays": 15},
        {"title": "Song3", "plays": 25},
        {"title": "Song4", "plays": 10},
        {"title": "Song5", "plays": 20}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Song3", "Song5"]);
    });
});

describe('favoriteSongs - play count ranges', () => {
    it('handles low play counts', () => {
      const playlist = [
        {"title": "Rare", "plays": 1},
        {"title": "Uncommon", "plays": 2},
        {"title": "Common", "plays": 3}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Common", "Uncommon"]);
    });

    it('handles very high play counts', () => {
      const playlist = [
        {"title": "Mega Hit", "plays": 10000},
        {"title": "Super Hit", "plays": 5000},
        {"title": "Hit", "plays": 1000}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Mega Hit", "Super Hit"]);
    });

    it('handles zero plays for some songs', () => {
      const playlist = [
        {"title": "Never Played", "plays": 0},
        {"title": "Played Once", "plays": 1},
        {"title": "Played Twice", "plays": 2}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Played Twice", "Played Once"]);
    });
});

describe('favoriteSongs - song title variations', () => {
    it('handles long titles', () => {
      const playlist = [
        {"title": "This Is A Very Long Song Title", "plays": 100},
        {"title": "Short", "plays": 50},
        {"title": "Medium Length Title", "plays": 75}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["This Is A Very Long Song Title", "Medium Length Title"]);
    });

    it('handles titles with special characters', () => {
      const playlist = [
        {"title": "Rock & Roll!", "plays": 30},
        {"title": "Jazz (Live)", "plays": 20},
        {"title": "Pop: The Remix", "plays": 40}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Pop: The Remix", "Rock & Roll!"]);
    });

    it('handles titles with numbers', () => {
      const playlist = [
        {"title": "Track 1", "plays": 10},
        {"title": "Track 2", "plays": 30},
        {"title": "Track 3", "plays": 20}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Track 2", "Track 3"]);
    });
});

describe('favoriteSongs - immutability', () => {
    it('does not modify original playlist', () => {
      const playlist = [
        {"title": "A", "plays": 1},
        {"title": "B", "plays": 3},
        {"title": "C", "plays": 2}
      ];
      const original = JSON.parse(JSON.stringify(playlist));
      favoriteSongs(playlist);
      expect(playlist).toEqual(original);
    });

    it('does not modify order of original array', () => {
      const playlist = [
        {"title": "First", "plays": 1},
        {"title": "Second", "plays": 3},
        {"title": "Third", "plays": 2}
      ];
      favoriteSongs(playlist);
      expect(playlist[0].title).toBe("First");
      expect(playlist[1].title).toBe("Second");
      expect(playlist[2].title).toBe("Third");
    });
});

describe('favoriteSongs - different orderings', () => {
    it('works when highest is at start', () => {
      const playlist = [
        {"title": "Best", "plays": 100},
        {"title": "Good", "plays": 50},
        {"title": "Okay", "plays": 25}
      ];
      expect(favoriteSongs(playlist)[0]).toBe("Best");
    });

    it('works when highest is at end', () => {
      const playlist = [
        {"title": "Okay", "plays": 25},
        {"title": "Good", "plays": 50},
        {"title": "Best", "plays": 100}
      ];
      expect(favoriteSongs(playlist)[0]).toBe("Best");
    });

    it('works when highest is in middle', () => {
      const playlist = [
        {"title": "Okay", "plays": 25},
        {"title": "Best", "plays": 100},
        {"title": "Good", "plays": 50}
      ];
      expect(favoriteSongs(playlist)[0]).toBe("Best");
    });
});

describe('favoriteSongs - realistic scenarios', () => {
    it('typical iPod playlist', () => {
      const playlist = [
        {"title": "Favorite Song", "plays": 47},
        {"title": "Workout Mix", "plays": 23},
        {"title": "Commute Jam", "plays": 35},
        {"title": "Study Music", "plays": 12}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["Favorite Song", "Commute Jam"]);
    });

    it('new playlist with few plays', () => {
      const playlist = [
        {"title": "New Discovery", "plays": 3},
        {"title": "Just Added", "plays": 1},
        {"title": "Tried Once", "plays": 2}
      ];
      expect(favoriteSongs(playlist))
        .toEqual(["New Discovery", "Tried Once"]);
    });
});

describe('dive - freeCodeCamp tests', () => {
    it('recovers last unfound treasure', () => {
      const map = [
        ["-", "X"],
        ["-", "X"],
        ["-", "O"]
      ];
      expect(dive(map, [2, 1])).toBe("Recovered");
    });

    it('returns empty for no treasure', () => {
      const map = [
        ["-", "X"],
        ["-", "X"],
        ["-", "O"]
      ];
      expect(dive(map, [2, 0])).toBe("Empty");
    });

    it('finds treasure with more unfound parts', () => {
      const map = [
        ["-", "X"],
        ["-", "O"],
        ["-", "O"]
      ];
      expect(dive(map, [1, 1])).toBe("Found");
    });
});

describe('dive - freeCodeCamp tests continued', () => {
    it('finds treasure in middle row', () => {
      const map = [
        ["-", "-", "-"],
        ["X", "O", "X"],
        ["-", "-", "-"]
      ];
      expect(dive(map, [1, 2])).toBe("Found");
    });

    it('recovers last treasure bottom left', () => {
      const map = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["O", "X", "X"]
      ];
      expect(dive(map, [2, 0])).toBe("Recovered");
    });

    it('empty in 3x3 map', () => {
      const map = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["O", "X", "X"]
      ];
      expect(dive(map, [1, 2])).toBe("Empty");
    });
});

describe('dive - empty results', () => {
    it('empty at top left', () => {
      const map = [
        ["-", "O"],
        ["X", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Empty");
    });

    it('empty at bottom right', () => {
      const map = [
        ["O", "X"],
        ["X", "-"]
      ];
      expect(dive(map, [1, 1])).toBe("Empty");
    });

    it('empty in center', () => {
      const map = [
        ["O", "X", "O"],
        ["X", "-", "X"],
        ["O", "X", "O"]
      ];
      expect(dive(map, [1, 1])).toBe("Empty");
    });
});

describe('dive - found results', () => {
    it('found with two unfound parts', () => {
      const map = [
        ["O", "O"],
        ["-", "-"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });

    it('found with three unfound parts', () => {
      const map = [
        ["O", "O", "O"],
        ["-", "-", "-"]
      ];
      expect(dive(map, [0, 1])).toBe("Found");
    });

    it('found with mixed X and O', () => {
      const map = [
        ["X", "O"],
        ["O", "X"]
      ];
      expect(dive(map, [0, 1])).toBe("Found");
    });
});

describe('dive - recovered results', () => {
    it('recovered top left corner', () => {
      const map = [
        ["O", "X"],
        ["X", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Recovered");
    });

    it('recovered top right corner', () => {
      const map = [
        ["X", "O"],
        ["X", "X"]
      ];
      expect(dive(map, [0, 1])).toBe("Recovered");
    });

    it('recovered single O remaining', () => {
      const map = [
        ["X", "X", "X"],
        ["X", "O", "X"],
        ["X", "X", "X"]
      ];
      expect(dive(map, [1, 1])).toBe("Recovered");
    });
});

describe('dive - different map sizes', () => {
    it('1x2 map', () => {
      const map = [["O", "X"]];
      expect(dive(map, [0, 0])).toBe("Recovered");
    });

    it('2x2 map', () => {
      const map = [
        ["O", "O"],
        ["-", "-"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });

    it('4x4 map', () => {
      const map = [
        ["-", "-", "-", "-"],
        ["-", "O", "X", "-"],
        ["-", "X", "X", "-"],
        ["-", "-", "-", "-"]
      ];
      expect(dive(map, [1, 1])).toBe("Recovered");
    });
});

describe('dive - treasure patterns', () => {
    it('horizontal treasure line', () => {
      const map = [
        ["-", "-", "-"],
        ["O", "O", "X"],
        ["-", "-", "-"]
      ];
      expect(dive(map, [1, 0])).toBe("Found");
    });

    it('vertical treasure line', () => {
      const map = [
        ["-", "O", "-"],
        ["-", "O", "-"],
        ["-", "X", "-"]
      ];
      expect(dive(map, [0, 1])).toBe("Found");
    });

    it('diagonal treasure pattern', () => {
      const map = [
        ["O", "-", "-"],
        ["-", "X", "-"],
        ["-", "-", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Recovered");
    });
});

describe('dive - coordinate positions', () => {
    it('top left [0,0]', () => {
      const map = [
        ["O", "X"],
        ["X", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Recovered");
    });

    it('top right', () => {
      const map = [
        ["-", "O"],
        ["-", "X"]
      ];
      expect(dive(map, [0, 1])).toBe("Recovered");
    });

    it('bottom left', () => {
      const map = [
        ["-", "X"],
        ["O", "X"]
      ];
      expect(dive(map, [1, 0])).toBe("Recovered");
    });

    it('bottom right', () => {
      const map = [
        ["X", "-"],
        ["-", "O"]
      ];
      expect(dive(map, [1, 1])).toBe("Recovered");
    });
});

describe('dive - large treasure counts', () => {
    it('many found pieces, one unfound', () => {
      const map = [
        ["X", "X", "X"],
        ["X", "X", "X"],
        ["X", "X", "O"]
      ];
      expect(dive(map, [2, 2])).toBe("Recovered");
    });

    it('many unfound pieces', () => {
      const map = [
        ["O", "O", "O"],
        ["O", "O", "O"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });
});

describe('dive - edge cases', () => {
    it('only dashes except one O', () => {
      const map = [
        ["-", "-", "-"],
        ["-", "O", "-"],
        ["-", "-", "-"]
      ];
      expect(dive(map, [1, 1])).toBe("Recovered");
    });

    it('all X except one O', () => {
      const map = [
        ["X", "X"],
        ["X", "O"]
      ];
      expect(dive(map, [1, 1])).toBe("Recovered");
    });

    it('checking already found treasure', () => {
      const map = [
        ["X", "O"],
        ["O", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });
});

describe('dive - complex scenarios', () => {
    it('L-shaped treasure', () => {
      const map = [
        ["O", "-", "-"],
        ["O", "-", "-"],
        ["O", "X", "X"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });

    it('scattered treasure pieces', () => {
      const map = [
        ["O", "-", "X"],
        ["-", "X", "-"],
        ["X", "-", "O"]
      ];
      expect(dive(map, [0, 0])).toBe("Found");
    });

    it('treasure around empty center', () => {
      const map = [
        ["X", "O", "X"],
        ["X", "-", "X"],
        ["X", "X", "X"]
      ];
      expect(dive(map, [0, 1])).toBe("Recovered");
    });
});

describe('complementaryDNA - freeCodeCamp tests', () => {
    it('simple ACGT sequence', () => {
      expect(complementaryDNA("ACGT")).toBe("TGCA");
    });

    it('long sequence 1', () => {
      expect(complementaryDNA("ATGCGTACGTTAGC")).toBe("TACGCATGCAATCG");
    });

    it('long sequence 2', () => {
      expect(complementaryDNA("GGCTTACGATCGAAG")).toBe("CCGAATGCTAGCTTC");
    });

    it('very long sequence', () => {
      expect(complementaryDNA("GATCTAGCTAGGCTAGCTAG"))
        .toBe("CTAGATCGATCCGATCGATC");
    });
});

describe('complementaryDNA - single bases', () => {
    it('A complements to T', () => {
      expect(complementaryDNA("A")).toBe("T");
    });

    it('T complements to A', () => {
      expect(complementaryDNA("T")).toBe("A");
    });

    it('C complements to G', () => {
      expect(complementaryDNA("C")).toBe("G");
    });

    it('G complements to C', () => {
      expect(complementaryDNA("G")).toBe("C");
    });
});

describe('complementaryDNA - repeated bases', () => {
    it('all A bases', () => {
      expect(complementaryDNA("AAAA")).toBe("TTTT");
    });

    it('all T bases', () => {
      expect(complementaryDNA("TTTT")).toBe("AAAA");
    });

    it('all C bases', () => {
      expect(complementaryDNA("CCCC")).toBe("GGGG");
    });

    it('all G bases', () => {
      expect(complementaryDNA("GGGG")).toBe("CCCC");
    });
});

describe('complementaryDNA - complementary pairs', () => {
    it('AT pairs', () => {
      expect(complementaryDNA("ATATAT")).toBe("TATATA");
    });

    it('TA pairs', () => {
      expect(complementaryDNA("TATATA")).toBe("ATATAT");
    });

    it('CG pairs', () => {
      expect(complementaryDNA("CGCGCG")).toBe("GCGCGC");
    });

    it('GC pairs', () => {
      expect(complementaryDNA("GCGCGC")).toBe("CGCGCG");
    });
});

describe('complementaryDNA - mixed sequences', () => {
    it('balanced mix', () => {
      expect(complementaryDNA("ATCG")).toBe("TAGC");
    });

    it('reverse pattern', () => {
      expect(complementaryDNA("GCAT")).toBe("CGTA");
    });

    it('complex pattern', () => {
      expect(complementaryDNA("AATTCCGG")).toBe("TTAAGGCC");
    });
});

describe('complementaryDNA - various lengths', () => {
    it('two bases', () => {
      expect(complementaryDNA("AT")).toBe("TA");
    });

    it('three bases', () => {
      expect(complementaryDNA("CGT")).toBe("GCA");
    });

    it('five bases', () => {
      expect(complementaryDNA("ATCGA")).toBe("TAGCT");
    });

    it('ten bases', () => {
      expect(complementaryDNA("ATCGATCGAT")).toBe("TAGCTAGCTA");
    });
});

describe('complementaryDNA - biological patterns', () => {
    it('start codon ATG', () => {
      expect(complementaryDNA("ATG")).toBe("TAC");
    });

    it('stop codon TAG', () => {
      expect(complementaryDNA("TAG")).toBe("ATC");
    });

    it('codon sequence', () => {
      expect(complementaryDNA("ATGCGT")).toBe("TACGCA");
    });
});

describe('complementaryDNA - symmetrical sequences', () => {
    it('palindrome sequence', () => {
      expect(complementaryDNA("ATCGAT")).toBe("TAGCTA");
    });

    it('mirror pattern', () => {
      expect(complementaryDNA("AAATTT")).toBe("TTTAAA");
    });
});

describe('complementaryDNA - double complement', () => {
    it('complement of complement returns original', () => {
      const original = "ACGT";
      const comp1 = complementaryDNA(original);
      const comp2 = complementaryDNA(comp1);
      expect(comp2).toBe(original);
    });

    it('works with longer sequence', () => {
      const original = "ATGCGTACGTTA";
      const comp1 = complementaryDNA(original);
      const comp2 = complementaryDNA(comp1);
      expect(comp2).toBe(original);
    });
});

describe('complementaryDNA - edge cases', () => {
    it('very long sequence', () => {
      const long = "A".repeat(50);
      const expected = "T".repeat(50);
      expect(complementaryDNA(long)).toBe(expected);
    });

    it('alternating pattern', () => {
      expect(complementaryDNA("ACACACAC")).toBe("TGTGTGTG");
    });
});

describe('sockPairs - freeCodeCamp tests', () => {
    it('2 pairs, 5 cycles returns 1', () => {
      expect(sockPairs(2, 5)).toBe(1);
    });

    it('1 pair, 2 cycles returns 0', () => {
      expect(sockPairs(1, 2)).toBe(0);
    });

    it('5 pairs, 11 cycles returns 4', () => {
      expect(sockPairs(5, 11)).toBe(4);
    });

    it('6 pairs, 25 cycles returns 3', () => {
      expect(sockPairs(6, 25)).toBe(3);
    });

    it('1 pair, 8 cycles returns 0', () => {
      expect(sockPairs(1, 8)).toBe(0);
    });
});

describe('sockPairs - no wash cycles', () => {
    it('0 cycles keeps original pairs', () => {
      expect(sockPairs(3, 0)).toBe(3);
    });

    it('5 pairs, 0 cycles', () => {
      expect(sockPairs(5, 0)).toBe(5);
    });
});

describe('sockPairs - single rule applications', () => {
    it('cycle 2 loses one sock', () => {
      expect(sockPairs(2, 2)).toBe(1);
    });

    it('cycle 3 finds one sock', () => {
      expect(sockPairs(1, 3)).toBe(1);
    });

    it('cycle 4 loses another sock', () => {
      expect(sockPairs(2, 4)).toBe(1);
    });

    it('cycle 5 throws away one sock', () => {
      expect(sockPairs(3, 5)).toBe(2);
    });
});

describe('sockPairs - cycle 10 overlaps', () => {
    it('cycle 10 applies all rules', () => {
      expect(sockPairs(3, 10)).toBe(2);
    });

    it('cycle 20 applies all rules again', () => {
      expect(sockPairs(5, 20)).toBe(3);
    });
});

describe('sockPairs - multiple cycles', () => {
    it('10 cycles simulation', () => {
      expect(sockPairs(10, 10)).toBe(9);
    });

    it('15 cycles simulation', () => {
      expect(sockPairs(8, 15)).toBe(6);
    });

    it('20 cycles simulation', () => {
      expect(sockPairs(10, 20)).toBe(8);
    });
});

describe('sockPairs - zero socks constraint', () => {
    it('cannot go below zero socks', () => {
      expect(sockPairs(0, 5)).toBe(0);
    });

    it('small starting amount', () => {
      expect(sockPairs(1, 10)).toBe(0);
    });

    it('loses all socks but recovers', () => {
      expect(sockPairs(1, 15)).toBe(0);
    });
});

describe('sockPairs - buying new pairs', () => {
    it('buys pair at cycle 10', () => {
      expect(sockPairs(0, 10)).toBe(0);
    });

    it('buys pairs at 10 and 20', () => {
      expect(sockPairs(0, 20)).toBe(0);
    });

    it('buys pair at cycle 30', () => {
      expect(sockPairs(5, 30)).toBe(2);
    });
});

describe('sockPairs - finding socks', () => {
    it('finds socks at cycles 3, 6, 9', () => {
      expect(sockPairs(2, 9)).toBe(1);
    });

    it('finds sock at cycle 12', () => {
      expect(sockPairs(3, 12)).toBe(2);
    });
});

describe('sockPairs - losing socks', () => {
    it('loses at cycles 2, 4, 6, 8', () => {
      expect(sockPairs(5, 8)).toBe(3);
    });

    it('loses at even cycles', () => {
      expect(sockPairs(10, 6)).toBe(9);
    });
});

describe('sockPairs - throwing away socks', () => {
    it('throws away at cycle 5', () => {
      expect(sockPairs(3, 5)).toBe(2);
    });

    it('throws away at cycles 5, 10, 15', () => {
      expect(sockPairs(10, 15)).toBe(8);
    });
});

describe('sockPairs - edge cases', () => {
    it('zero starting pairs', () => {
      expect(sockPairs(0, 0)).toBe(0);
    });

    it('large number of pairs', () => {
      expect(sockPairs(100, 0)).toBe(100);
    });

    it('many cycles', () => {
      expect(sockPairs(20, 50)).toBe(15);
    });
});

describe('sockPairs - odd sock scenarios', () => {
    it('odd number after losses', () => {
      expect(sockPairs(3, 2)).toBe(2);
    });

    it('loses one creates odd', () => {
      expect(sockPairs(4, 2)).toBe(3);
    });
});

describe('sockPairs - cycle patterns', () => {
    it('cycle 6 loses and finds', () => {
      expect(sockPairs(3, 6)).toBe(2);
    });

    it('cycle 15 complex rules', () => {
      expect(sockPairs(6, 15)).toBe(4);
    });

    it('cycle 30 all rules multiple times', () => {
      expect(sockPairs(10, 30)).toBe(7);
    });
});

describe('sockPairs - progressive loss', () => {
    it('1 cycle no change', () => {
      expect(sockPairs(5, 1)).toBe(5);
    });

    it('gradual decline', () => {
      expect(sockPairs(10, 7)).toBe(9);
    });
});

describe('mask - freeCodeCamp tests', () => {
    it('mask("4012-8888-8888-1881") should return "****-****-****-1881"', () => {
      expect(mask("4012-8888-8888-1881")).toBe("****-****-****-1881");
    });

    it('mask("5105 1051 0510 5100") should return "**** **** **** 5100"', () => {
      expect(mask("5105 1051 0510 5100")).toBe("**** **** **** 5100");
    });

    it('mask("6011 1111 1111 1117") should return "**** **** **** 1117"', () => {
      expect(mask("6011 1111 1111 1117")).toBe("**** **** **** 1117");
    });

    it('mask("2223-0000-4845-0010") should return "****-****-****-0010"', () => {
      expect(mask("2223-0000-4845-0010")).toBe("****-****-****-0010");
    });
});

describe('mask - hyphen separator', () => {
    it('masks first 12 digits with hyphens', () => {
      expect(mask("1234-5678-9012-3456")).toBe("****-****-****-3456");
    });

    it('preserves last four digits', () => {
      expect(mask("0000-0000-0000-9999")).toBe("****-****-****-9999");
    });

    it('handles different digit patterns', () => {
      expect(mask("9876-5432-1098-7654")).toBe("****-****-****-7654");
    });
});

describe('mask - space separator', () => {
    it('masks first 12 digits with spaces', () => {
      expect(mask("1234 5678 9012 3456")).toBe("**** **** **** 3456");
    });

    it('preserves last four digits with spaces', () => {
      expect(mask("0000 0000 0000 1234")).toBe("**** **** **** 1234");
    });

    it('handles all zeros except last four', () => {
      expect(mask("0000 0000 0000 5678")).toBe("**** **** **** 5678");
    });
});

describe('mask - separator preservation', () => {
    it('keeps hyphens in correct positions', () => {
      const result = mask("1111-2222-3333-4444");
      expect(result.charAt(4)).toBe('-');
      expect(result.charAt(9)).toBe('-');
      expect(result.charAt(14)).toBe('-');
    });

    it('keeps spaces in correct positions', () => {
      const result = mask("1111 2222 3333 4444");
      expect(result.charAt(4)).toBe(' ');
      expect(result.charAt(9)).toBe(' ');
      expect(result.charAt(14)).toBe(' ');
    });
});

describe('mask - digit masking', () => {
    it('masks exactly 12 digits', () => {
      const result = mask("1234-5678-9012-3456");
      const asterisks = (result.match(/\*/g) || []).length;
      expect(asterisks).toBe(12);
    });

    it('shows exactly 4 unmasked digits', () => {
      const result = mask("1234 5678 9012 3456");
      const digits = result.match(/\d/g);
      expect(digits.length).toBe(4);
    });

    it('last four digits are correct', () => {
      expect(mask("1111-2222-3333-4567").slice(-4)).toBe("4567");
    });
});

describe('mask - different last four combinations', () => {
    it('last four all same digit', () => {
      expect(mask("1234-5678-9012-0000")).toBe("****-****-****-0000");
    });

    it('last four ascending', () => {
      expect(mask("1111-1111-1111-6789")).toBe("****-****-****-6789");
    });

    it('last four descending', () => {
      expect(mask("2222-2222-2222-9876")).toBe("****-****-****-9876");
    });

    it('last four mixed pattern', () => {
      expect(mask("3333-3333-3333-1357")).toBe("****-****-****-1357");
    });
});

describe('mask - format consistency', () => {
    it('maintains format with hyphen', () => {
      const result = mask("4012-8888-8888-1881");
      expect(result.length).toBe(19);
      expect(result.split('-').length).toBe(4);
    });

    it('maintains format with space', () => {
      const result = mask("5105 1051 0510 5100");
      expect(result.length).toBe(19);
      expect(result.split(' ').length).toBe(4);
    });

    it('each group has correct length with hyphen', () => {
      const groups = mask("1234-5678-9012-3456").split('-');
      groups.forEach(group => expect(group.length).toBe(4));
    });

    it('each group has correct length with space', () => {
      const groups = mask("1234 5678 9012 3456").split(' ');
      groups.forEach(group => expect(group.length).toBe(4));
    });
});

describe('mask - edge cases', () => {
    it('all digits same except last four', () => {
      expect(mask("9999-9999-9999-1234")).toBe("****-****-****-1234");
    });

    it('ascending sequence', () => {
      expect(mask("0123-4567-8901-2345")).toBe("****-****-****-2345");
    });

    it('alternating digits', () => {
      expect(mask("0101-0101-0101-0101")).toBe("****-****-****-0101");
    });
});

describe('mask - real credit card patterns', () => {
    it('Visa pattern with hyphen', () => {
      expect(mask("4532-0159-8765-4321")).toBe("****-****-****-4321");
    });

    it('Mastercard pattern with space', () => {
      expect(mask("5425 2334 3010 9903")).toBe("**** **** **** 9903");
    });

    it('American Express pattern with hyphen', () => {
      expect(mask("3782-8224-6310-0005")).toBe("****-****-****-0005");
    });

    it('Discover pattern with space', () => {
      expect(mask("6011 0009 9013 9424")).toBe("**** **** **** 9424");
    });
});

describe('mask - verification', () => {
    it('no digits before last four are visible', () => {
      const result = mask("1234-5678-9012-3456");
      const firstTwelve = result.slice(0, 14);
      expect(firstTwelve).not.toMatch(/\d/);
    });

    it('asterisks replace digits only', () => {
      const result = mask("1234 5678 9012 3456");
      expect(result.slice(0, 4)).toBe("****");
      expect(result.slice(5, 9)).toBe("****");
      expect(result.slice(10, 14)).toBe("****");
    });
});

describe('validate - freeCodeCamp tests', () => {
    it('validate("a@b.cd") should return true', () => {
      expect(validate("a@b.cd")).toBe(true);
    });

    it('validate("hell.-w.rld@example.com") should return true', () => {
      expect(validate("hell.-w.rld@example.com")).toBe(true);
    });

    it('validate(".b@sh.rc") should return false', () => {
      expect(validate(".b@sh.rc")).toBe(false);
    });

    it('validate("example@test.c0") should return false', () => {
      expect(validate("example@test.c0")).toBe(false);
    });

    it('validate("freecodecamp.org") should return false', () => {
      expect(validate("freecodecamp.org")).toBe(false);
    });

    it('validate("develop.ment_user@c0D!NG.R.CKS") should return true', () => {
      expect(validate("develop.ment_user@c0D!NG.R.CKS")).toBe(true);
    });

    it('validate("hello.@wo.rld") should return false', () => {
      expect(validate("hello.@wo.rld")).toBe(false);
    });

    it('validate("hello@world..com") should return false', () => {
      expect(validate("hello@world..com")).toBe(false);
    });

    it('validate("git@commit@push.io") should return false', () => {
      expect(validate("git@commit@push.io")).toBe(false);
    });
});

describe('validate - exactly one @ symbol', () => {
    it('no @ symbol', () => {
      expect(validate("username.domain.com")).toBe(false);
    });

    it('multiple @ symbols', () => {
      expect(validate("user@@example.com")).toBe(false);
    });

    it('three @ symbols', () => {
      expect(validate("a@b@c@d.com")).toBe(false);
    });

    it('exactly one @ symbol', () => {
      expect(validate("user@example.com")).toBe(true);
    });
});

describe('validate - local part valid characters', () => {
    it('letters only', () => {
      expect(validate("abc@example.com")).toBe(true);
    });

    it('digits only', () => {
      expect(validate("123@example.com")).toBe(true);
    });

    it('mixed letters and digits', () => {
      expect(validate("user123@example.com")).toBe(true);
    });

    it('with dots', () => {
      expect(validate("first.last@example.com")).toBe(true);
    });

    it('with underscores', () => {
      expect(validate("user_name@example.com")).toBe(true);
    });

    it('with hyphens', () => {
      expect(validate("user-name@example.com")).toBe(true);
    });

    it('all valid characters', () => {
      expect(validate("user.name_123-test@example.com")).toBe(true);
    });
});

describe('validate - local part invalid characters', () => {
    it('special character !', () => {
      expect(validate("user!@example.com")).toBe(false);
    });

    it('special character #', () => {
      expect(validate("user#name@example.com")).toBe(false);
    });

    it('special character $', () => {
      expect(validate("user$@example.com")).toBe(false);
    });

    it('special character %', () => {
      expect(validate("user%@example.com")).toBe(false);
    });

    it('space', () => {
      expect(validate("user name@example.com")).toBe(false);
    });
});

describe('validate - local part dot constraints', () => {
    it('cannot start with dot', () => {
      expect(validate(".user@example.com")).toBe(false);
    });

    it('cannot end with dot', () => {
      expect(validate("user.@example.com")).toBe(false);
    });

    it('cannot have consecutive dots', () => {
      expect(validate("user..name@example.com")).toBe(false);
    });

    it('dot in middle is valid', () => {
      expect(validate("user.name@example.com")).toBe(true);
    });

    it('multiple dots separated', () => {
      expect(validate("first.middle.last@example.com")).toBe(true);
    });
});

describe('validate - domain must have dot', () => {
    it('no dot in domain', () => {
      expect(validate("user@example")).toBe(false);
    });

    it('one dot in domain', () => {
      expect(validate("user@example.com")).toBe(true);
    });

    it('multiple dots in domain', () => {
      expect(validate("user@mail.example.com")).toBe(true);
    });
});

describe('validate - domain TLD must be letters', () => {
    it('TLD with digit', () => {
      expect(validate("user@example.c0m")).toBe(false);
    });

    it('TLD with number', () => {
      expect(validate("user@example.123")).toBe(false);
    });

    it('TLD with special character', () => {
      expect(validate("user@example.c!m")).toBe(false);
    });

    it('valid TLD lowercase', () => {
      expect(validate("user@example.com")).toBe(true);
    });

    it('valid TLD uppercase', () => {
      expect(validate("user@example.COM")).toBe(true);
    });

    it('valid TLD mixed case', () => {
      expect(validate("user@example.CoM")).toBe(true);
    });
});

describe('validate - domain TLD length', () => {
    it('TLD with one letter', () => {
      expect(validate("user@example.c")).toBe(false);
    });

    it('TLD with two letters', () => {
      expect(validate("user@example.co")).toBe(true);
    });

    it('TLD with three letters', () => {
      expect(validate("user@example.com")).toBe(true);
    });

    it('TLD with four letters', () => {
      expect(validate("user@example.info")).toBe(true);
    });
});

describe('validate - domain consecutive dots', () => {
    it('consecutive dots in domain', () => {
      expect(validate("user@example..com")).toBe(false);
    });

    it('consecutive dots after subdomain', () => {
      expect(validate("user@mail..example.com")).toBe(false);
    });

    it('valid subdomain with dots', () => {
      expect(validate("user@mail.example.com")).toBe(true);
    });
});

describe('validate - edge cases', () => {
    it('empty string', () => {
      expect(validate("")).toBe(false);
    });

    it('only @', () => {
      expect(validate("@")).toBe(false);
    });

    it('@ at start', () => {
      expect(validate("@example.com")).toBe(false);
    });

    it('@ at end', () => {
      expect(validate("user@")).toBe(false);
    });

    it('very short valid email', () => {
      expect(validate("a@b.co")).toBe(true);
    });
});

describe('validate - real world examples', () => {
    it('standard email', () => {
      expect(validate("john.doe@example.com")).toBe(true);
    });

    it('email with numbers', () => {
      expect(validate("user123@test456.org")).toBe(true);
    });

    it('email with underscore', () => {
      expect(validate("first_last@company.net")).toBe(true);
    });

    it('email with hyphen', () => {
      expect(validate("john-doe@my-company.com")).toBe(true);
    });

    it('subdomain email', () => {
      expect(validate("admin@mail.company.com")).toBe(true);
    });

    it('complex valid email', () => {
      expect(validate("user.name_123-test@sub.domain.example.com")).toBe(true);
    });
});

describe('validate - mixed case domains', () => {
    it('uppercase domain', () => {
      expect(validate("user@EXAMPLE.COM")).toBe(true);
    });

    it('mixed case domain', () => {
      expect(validate("user@Example.Com")).toBe(true);
    });

    it('uppercase local', () => {
      expect(validate("USER@example.com")).toBe(true);
    });
});

describe('validate - domain with numbers', () => {
    it('numbers in domain name allowed', () => {
      expect(validate("user@test123.com")).toBe(true);
    });

    it('subdomain with numbers', () => {
      expect(validate("user@mail1.example.com")).toBe(true);
    });

    it('numbers in TLD not allowed', () => {
      expect(validate("user@example.co1")).toBe(false);
    });
});

describe('validate - boundary tests', () => {
    it('single character local', () => {
      expect(validate("a@example.com")).toBe(true);
    });

    it('single character domain part', () => {
      expect(validate("user@a.com")).toBe(true);
    });

    it('minimum valid email', () => {
      expect(validate("a@b.cd")).toBe(true);
    });

    it('long local part', () => {
      expect(validate("averylongusernamewithmanychars@example.com")).toBe(true);
    });

    it('long domain part', () => {
      expect(validate("user@verylongdomainnamewithmanycharacters.com")).toBe(true);
    });
});

describe('stripTags - freeCodeCamp tests', () => {
    it('stripTags("<a href=\"#\">Click here</a>") should return "Click here"', () => {
      expect(stripTags('<a href="#">Click here</a>')).toBe('Click here');
    });

    it('stripTags("<p class=\"center\">Hello <b>World</b>!</p>") should return "Hello World!"', () => {
      expect(stripTags('<p class="center">Hello <b>World</b>!</p>')).toBe('Hello World!');
    });

    it('stripTags("<img src=\"cat.jpg\" alt=\"Cat\">") should return empty string', () => {
      expect(stripTags('<img src="cat.jpg" alt="Cat">')).toBe('');
    });

    it('stripTags("<main id=\"main\"><section class=\"section\">section</section><section class=\"section\">section</section></main>") should return "sectionsection"', () => {
      expect(stripTags('<main id="main"><section class="section">section</section><section class="section">section</section></main>')).toBe('sectionsection');
    });
});

describe('stripTags - simple tags', () => {
    it('single tag with text', () => {
      expect(stripTags('<p>Hello</p>')).toBe('Hello');
    });

    it('tag with no content', () => {
      expect(stripTags('<div></div>')).toBe('');
    });

    it('self-closing tag', () => {
      expect(stripTags('<br/>')).toBe('');
    });

    it('multiple tags with text', () => {
      expect(stripTags('<h1>Title</h1><p>Content</p>')).toBe('TitleContent');
    });
});

describe('stripTags - nested tags', () => {
    it('one level nesting', () => {
      expect(stripTags('<div><p>Text</p></div>')).toBe('Text');
    });

    it('two levels nesting', () => {
      expect(stripTags('<div><p><span>Text</span></p></div>')).toBe('Text');
    });

    it('multiple nested tags', () => {
      expect(stripTags('<div><p>First</p><p>Second</p></div>')).toBe('FirstSecond');
    });

    it('deeply nested tags', () => {
      expect(stripTags('<a><b><c><d><e>Deep</e></d></c></b></a>')).toBe('Deep');
    });
});

describe('stripTags - tags with attributes', () => {
    it('single attribute', () => {
      expect(stripTags('<p id="main">Text</p>')).toBe('Text');
    });

    it('multiple attributes', () => {
      expect(stripTags('<a href="#" class="link" id="main">Link</a>')).toBe('Link');
    });

    it('attributes with special chars', () => {
      expect(stripTags('<img src="path/to/image.jpg" alt="Test & Demo">')).toBe('');
    });

    it('attribute with numbers', () => {
      expect(stripTags('<input type="text" maxlength="100">')).toBe('');
    });
});

describe('stripTags - mixed content', () => {
    it('text before tag', () => {
      expect(stripTags('Before<p>Inside</p>')).toBe('BeforeInside');
    });

    it('text after tag', () => {
      expect(stripTags('<p>Inside</p>After')).toBe('InsideAfter');
    });

    it('text before and after', () => {
      expect(stripTags('Before<p>Inside</p>After')).toBe('BeforeInsideAfter');
    });

    it('text between multiple tags', () => {
      expect(stripTags('<p>First</p> Middle <p>Last</p>')).toBe('First Middle Last');
    });
});

describe('stripTags - special characters in content', () => {
    it('exclamation mark', () => {
      expect(stripTags('<p>Hello!</p>')).toBe('Hello!');
    });

    it('question mark', () => {
      expect(stripTags('<p>Why?</p>')).toBe('Why?');
    });

    it('numbers', () => {
      expect(stripTags('<p>123</p>')).toBe('123');
    });

    it('special characters', () => {
      expect(stripTags('<p>Hello & goodbye @ 5pm!</p>')).toBe('Hello & goodbye @ 5pm!');
    });
});

describe('stripTags - empty and whitespace', () => {
    it('empty string', () => {
      expect(stripTags('')).toBe('');
    });

    it('only tags, no content', () => {
      expect(stripTags('<div><p></p></div>')).toBe('');
    });

    it('whitespace between tags', () => {
      expect(stripTags('<p> </p>')).toBe(' ');
    });

    it('preserves spaces', () => {
      expect(stripTags('<p>Hello World</p>')).toBe('Hello World');
    });
});

describe('stripTags - common HTML structures', () => {
    it('paragraph', () => {
      expect(stripTags('<p>This is a paragraph.</p>')).toBe('This is a paragraph.');
    });

    it('heading', () => {
      expect(stripTags('<h1>Main Title</h1>')).toBe('Main Title');
    });

    it('link', () => {
      expect(stripTags('<a href="https://example.com">Visit</a>')).toBe('Visit');
    });

    it('list items', () => {
      expect(stripTags('<ul><li>One</li><li>Two</li></ul>')).toBe('OneTwo');
    });
});

describe('stripTags - inline formatting', () => {
    it('bold tag', () => {
      expect(stripTags('This is <b>bold</b> text')).toBe('This is bold text');
    });

    it('italic tag', () => {
      expect(stripTags('This is <i>italic</i> text')).toBe('This is italic text');
    });

    it('strong tag', () => {
      expect(stripTags('This is <strong>important</strong>')).toBe('This is important');
    });

    it('emphasis tag', () => {
      expect(stripTags('This is <em>emphasized</em>')).toBe('This is emphasized');
    });
});

describe('stripTags - void elements', () => {
    it('br tag', () => {
      expect(stripTags('Line 1<br>Line 2')).toBe('Line 1Line 2');
    });

    it('hr tag', () => {
      expect(stripTags('Above<hr>Below')).toBe('AboveBelow');
    });

    it('img tag', () => {
      expect(stripTags('<img src="test.png">')).toBe('');
    });

    it('input tag', () => {
      expect(stripTags('<input type="text" value="test">')).toBe('');
    });
});

describe('stripTags - complex nested structures', () => {
    it('table structure', () => {
      expect(stripTags('<table><tr><td>Cell</td></tr></table>')).toBe('Cell');
    });

    it('multiple paragraphs with formatting', () => {
      expect(stripTags('<p><b>Bold</b> and <i>italic</i></p>')).toBe('Bold and italic');
    });

    it('div with multiple children', () => {
      expect(stripTags('<div><h1>Title</h1><p>Text</p><span>More</span></div>')).toBe('TitleTextMore');
    });
});

describe('stripTags - edge cases', () => {
    it('no tags', () => {
      expect(stripTags('Just plain text')).toBe('Just plain text');
    });

    it('tag at start', () => {
      expect(stripTags('<p>Text')).toBe('Text');
    });

    it('tag at end', () => {
      expect(stripTags('Text</p>')).toBe('Text');
    });

    it('consecutive tags', () => {
      expect(stripTags('<p></p><p></p><p>Text</p>')).toBe('Text');
    });
});

describe('stripTags - real world examples', () => {
    it('blog post excerpt', () => {
      expect(stripTags('<article><h2>Title</h2><p>Content here</p></article>')).toBe('TitleContent here');
    });

    it('navigation link', () => {
      expect(stripTags('<nav><a href="/home">Home</a></nav>')).toBe('Home');
    });

    it('formatted text', () => {
      expect(stripTags('<p>This is <b>really</b> <i>cool</i>!</p>')).toBe('This is really cool!');
    });

    it('comment-like content', () => {
      expect(stripTags('<div>User said: <span>Hello</span></div>')).toBe('User said: Hello');
    });
});

describe('count - freeCodeCamp tests', () => {
    it('count("abcdefg", "def") should return 1', () => {
      expect(count('abcdefg', 'def')).toBe(1);
    });

    it('count("hello", "world") should return 0', () => {
      expect(count('hello', 'world')).toBe(0);
    });

    it('count("mississippi", "iss") should return 2', () => {
      expect(count('mississippi', 'iss')).toBe(2);
    });

    it('count("she sells seashells by the seashore", "sh") should return 3', () => {
      expect(count('she sells seashells by the seashore', 'sh')).toBe(3);
    });

    it('count("101010101010101010101", "101") should return 10', () => {
      expect(count('101010101010101010101', '101')).toBe(10);
    });
});

describe('count - no matches', () => {
    it('pattern not in text', () => {
      expect(count('abc', 'xyz')).toBe(0);
    });

    it('empty text', () => {
      expect(count('', 'abc')).toBe(0);
    });

    it('pattern longer than text', () => {
      expect(count('ab', 'abc')).toBe(0);
    });

    it('completely different strings', () => {
      expect(count('hello', 'goodbye')).toBe(0);
    });
});

describe('count - single match', () => {
    it('pattern at start', () => {
      expect(count('abcdef', 'abc')).toBe(1);
    });

    it('pattern at end', () => {
      expect(count('abcdef', 'def')).toBe(1);
    });

    it('pattern in middle', () => {
      expect(count('abcdefg', 'cde')).toBe(1);
    });

    it('entire string is pattern', () => {
      expect(count('hello', 'hello')).toBe(1);
    });
});

describe('count - multiple non-overlapping matches', () => {
    it('two occurrences', () => {
      expect(count('abcabc', 'abc')).toBe(2);
    });

    it('three occurrences', () => {
      expect(count('catcatcat', 'cat')).toBe(3);
    });

    it('pattern separated by text', () => {
      expect(count('the cat in the hat', 'the')).toBe(2);
    });

    it('multiple spaces', () => {
      expect(count('a b a b a b', 'a b')).toBe(3);
    });
});

describe('count - overlapping matches', () => {
    it('double overlap', () => {
      expect(count('aaa', 'aa')).toBe(2);
    });

    it('triple overlap', () => {
      expect(count('aaaa', 'aa')).toBe(3);
    });

    it('overlapping pattern', () => {
      expect(count('abababa', 'aba')).toBe(3);
    });

    it('multiple overlapping occurrences', () => {
      expect(count('aaaaaa', 'aaa')).toBe(4);
    });
});

describe('count - single character pattern', () => {
    it('single character match', () => {
      expect(count('hello', 'l')).toBe(2);
    });

    it('no match', () => {
      expect(count('hello', 'x')).toBe(0);
    });

    it('multiple matches', () => {
      expect(count('aaaaaa', 'a')).toBe(6);
    });

    it('one match', () => {
      expect(count('world', 'd')).toBe(1);
    });
});

describe('count - case sensitivity', () => {
    it('different case no match', () => {
      expect(count('Hello', 'hello')).toBe(0);
    });

    it('uppercase pattern', () => {
      expect(count('HELLO WORLD', 'HELLO')).toBe(1);
    });

    it('mixed case', () => {
      expect(count('HeLLo', 'LL')).toBe(1);
    });

    it('case matters', () => {
      expect(count('AaAaAa', 'Aa')).toBe(3);
    });
});

describe('count - special characters', () => {
    it('with spaces', () => {
      expect(count('a b a b a b', ' b ')).toBe(2);
    });

    it('with punctuation', () => {
      expect(count('Hello! Hello! Hello!', 'Hello!')).toBe(3);
    });

    it('with numbers', () => {
      expect(count('123123123', '123')).toBe(3);
    });

    it('with symbols', () => {
      expect(count('a@b@c@d', '@')).toBe(3);
    });
});

describe('count - edge cases', () => {
    it('empty pattern returns 0', () => {
      expect(count('hello', '')).toBe(0);
    });

    it('both empty', () => {
      expect(count('', '')).toBe(0);
    });

    it('pattern equals text', () => {
      expect(count('test', 'test')).toBe(1);
    });

    it('very long text', () => {
      const longText = 'ab'.repeat(100);
      expect(count(longText, 'ab')).toBe(100);
    });
});

describe('count - repeating patterns', () => {
    it('binary pattern', () => {
      expect(count('010101', '01')).toBe(3);
    });

    it('overlapping binary', () => {
      expect(count('0000', '00')).toBe(3);
    });

    it('repeating word', () => {
      expect(count('nanananana', 'na')).toBe(5);
    });

    it('single char repeated', () => {
      expect(count('xxxxxxxxxx', 'xx')).toBe(9);
    });
});

describe('count - words and sentences', () => {
    it('word in sentence', () => {
      expect(count('the quick brown fox jumps over the lazy dog', 'the')).toBe(2);
    });

    it('substring in words', () => {
      expect(count('testing tester tested', 'test')).toBe(3);
    });

    it('partial word matches', () => {
      expect(count('banana', 'ana')).toBe(2);
    });

    it('word boundary crossing', () => {
      expect(count('hello world', 'o w')).toBe(1);
    });
});

describe('count - numeric patterns', () => {
    it('digit sequence', () => {
      expect(count('1234512345', '12345')).toBe(2);
    });

    it('overlapping numbers', () => {
      expect(count('111', '11')).toBe(2);
    });

    it('phone pattern', () => {
      expect(count('555-555-5555', '555')).toBe(4);
    });

    it('zero pattern', () => {
      expect(count('10001000', '000')).toBe(2);
    });
});

describe('count - real world examples', () => {
    it('DNA sequence', () => {
      expect(count('ATCGATCGATCG', 'ATCG')).toBe(3);
    });

    it('repeated phrase', () => {
      expect(count('lalala', 'la')).toBe(3);
    });

    it('error code', () => {
      expect(count('ERR:404 ERR:500 ERR:403', 'ERR:')).toBe(3);
    });

    it('file path', () => {
      expect(count('/home/user/home/test', 'home')).toBe(2);
    });
});

describe('to12 - freeCodeCamp tests', () => {
    it('to12("1124") should return "11:24 AM"', () => {
      expect(to12('1124')).toBe('11:24 AM');
    });

    it('to12("0900") should return "9:00 AM"', () => {
      expect(to12('0900')).toBe('9:00 AM');
    });

    it('to12("1455") should return "2:55 PM"', () => {
      expect(to12('1455')).toBe('2:55 PM');
    });

    it('to12("2346") should return "11:46 PM"', () => {
      expect(to12('2346')).toBe('11:46 PM');
    });

    it('to12("0030") should return "12:30 AM"', () => {
      expect(to12('0030')).toBe('12:30 AM');
    });
});

describe('to12 - midnight hour', () => {
    it('midnight exactly', () => {
      expect(to12('0000')).toBe('12:00 AM');
    });

    it('midnight with minutes', () => {
      expect(to12('0015')).toBe('12:15 AM');
    });

    it('half past midnight', () => {
      expect(to12('0030')).toBe('12:30 AM');
    });

    it('12:59 AM', () => {
      expect(to12('0059')).toBe('12:59 AM');
    });
});

describe('to12 - morning hours', () => {
    it('1 AM', () => {
      expect(to12('0100')).toBe('1:00 AM');
    });

    it('6:30 AM', () => {
      expect(to12('0630')).toBe('6:30 AM');
    });

    it('9:45 AM', () => {
      expect(to12('0945')).toBe('9:45 AM');
    });

    it('11:59 AM', () => {
      expect(to12('1159')).toBe('11:59 AM');
    });
});

describe('to12 - noon hour', () => {
    it('noon exactly', () => {
      expect(to12('1200')).toBe('12:00 PM');
    });

    it('noon with minutes', () => {
      expect(to12('1215')).toBe('12:15 PM');
    });

    it('half past noon', () => {
      expect(to12('1230')).toBe('12:30 PM');
    });

    it('12:59 PM', () => {
      expect(to12('1259')).toBe('12:59 PM');
    });
});

describe('to12 - afternoon hours', () => {
    it('1 PM', () => {
      expect(to12('1300')).toBe('1:00 PM');
    });

    it('3:15 PM', () => {
      expect(to12('1515')).toBe('3:15 PM');
    });

    it('5:45 PM', () => {
      expect(to12('1745')).toBe('5:45 PM');
    });

    it('6:00 PM', () => {
      expect(to12('1800')).toBe('6:00 PM');
    });
});

describe('to12 - evening hours', () => {
    it('7 PM', () => {
      expect(to12('1900')).toBe('7:00 PM');
    });

    it('8:30 PM', () => {
      expect(to12('2030')).toBe('8:30 PM');
    });

    it('10:15 PM', () => {
      expect(to12('2215')).toBe('10:15 PM');
    });

    it('11:59 PM', () => {
      expect(to12('2359')).toBe('11:59 PM');
    });
});

describe('to12 - single digit hours', () => {
    it('1:00 AM', () => {
      expect(to12('0100')).toBe('1:00 AM');
    });

    it('2:30 AM', () => {
      expect(to12('0230')).toBe('2:30 AM');
    });

    it('5:45 AM', () => {
      expect(to12('0545')).toBe('5:45 AM');
    });

    it('1:00 PM', () => {
      expect(to12('1300')).toBe('1:00 PM');
    });

    it('5:00 PM', () => {
      expect(to12('1700')).toBe('5:00 PM');
    });

    it('9:00 PM', () => {
      expect(to12('2100')).toBe('9:00 PM');
    });
});

describe('to12 - leading zeros in minutes', () => {
    it('hour with :00', () => {
      expect(to12('1500')).toBe('3:00 PM');
    });

    it('hour with :01', () => {
      expect(to12('1401')).toBe('2:01 PM');
    });

    it('hour with :05', () => {
      expect(to12('0805')).toBe('8:05 AM');
    });

    it('hour with :09', () => {
      expect(to12('1009')).toBe('10:09 AM');
    });
});

describe('to12 - various minutes', () => {
    it('15 minutes past', () => {
      expect(to12('1015')).toBe('10:15 AM');
    });

    it('30 minutes past', () => {
      expect(to12('1530')).toBe('3:30 PM');
    });

    it('45 minutes past', () => {
      expect(to12('0845')).toBe('8:45 AM');
    });

    it('59 minutes past', () => {
      expect(to12('1759')).toBe('5:59 PM');
    });
});

describe('to12 - boundary times', () => {
    it('start of day', () => {
      expect(to12('0000')).toBe('12:00 AM');
    });

    it('end of day', () => {
      expect(to12('2359')).toBe('11:59 PM');
    });

    it('start of PM', () => {
      expect(to12('1200')).toBe('12:00 PM');
    });

    it('last minute of AM', () => {
      expect(to12('1159')).toBe('11:59 AM');
    });
});

describe('to12 - AM/PM transitions', () => {
    it('last minute before noon', () => {
      expect(to12('1159')).toBe('11:59 AM');
    });

    it('noon', () => {
      expect(to12('1200')).toBe('12:00 PM');
    });

    it('first minute after noon', () => {
      expect(to12('1201')).toBe('12:01 PM');
    });

    it('last minute before midnight', () => {
      expect(to12('2359')).toBe('11:59 PM');
    });

    it('midnight', () => {
      expect(to12('0000')).toBe('12:00 AM');
    });

    it('first minute after midnight', () => {
      expect(to12('0001')).toBe('12:01 AM');
    });
});

describe('to12 - format verification', () => {
    it('includes colon separator', () => {
      expect(to12('1430')).toContain(':');
    });

    it('includes AM or PM', () => {
      const result = to12('1430');
      expect(result.endsWith(' AM') || result.endsWith(' PM')).toBe(true);
    });

    it('no leading zero in hour', () => {
      expect(to12('0900')).toBe('9:00 AM');
    });

    it('preserves leading zero in minutes', () => {
      expect(to12('1405')).toBe('2:05 PM');
    });
});

describe('to12 - all hours AM', () => {
    it('12 AM', () => {
      expect(to12('0000')).toBe('12:00 AM');
    });

    it('1 AM', () => {
      expect(to12('0100')).toBe('1:00 AM');
    });

    it('6 AM', () => {
      expect(to12('0600')).toBe('6:00 AM');
    });

    it('11 AM', () => {
      expect(to12('1100')).toBe('11:00 AM');
    });
});

describe('to12 - all hours PM', () => {
    it('12 PM', () => {
      expect(to12('1200')).toBe('12:00 PM');
    });

    it('1 PM', () => {
      expect(to12('1300')).toBe('1:00 PM');
    });

    it('6 PM', () => {
      expect(to12('1800')).toBe('6:00 PM');
    });

    it('11 PM', () => {
      expect(to12('2300')).toBe('11:00 PM');
    });
});

describe('battle - freeCodeCamp tests', () => {
    it('battle("hello world", "hello word") should return "We win"', () => {
      expect(battle('hello world', 'hello word')).toBe('We win');
    });

    it('battle("Hello world", "hello world") should return "We win"', () => {
      expect(battle('Hello world', 'hello world')).toBe('We win');
    });

    it('battle("lorem ipsum", "kitty ipsum") should return "We lose"', () => {
      expect(battle('lorem ipsum', 'kitty ipsum')).toBe('We lose');
    });

    it('battle("hello world", "world hello") should return "Draw"', () => {
      expect(battle('hello world', 'world hello')).toBe('Draw');
    });

    it('battle("git checkout", "git switch") should return "We win"', () => {
      expect(battle('git checkout', 'git switch')).toBe('We win');
    });

    it('battle("Cheeseburger with fries", "Cheeseburger with Fries") should return "We lose"', () => {
      expect(battle('Cheeseburger with fries', 'Cheeseburger with Fries')).toBe('We lose');
    });

    it('battle("We must never surrender", "Our team must win") should return "Draw"', () => {
      expect(battle('We must never surrender', 'Our team must win')).toBe('Draw');
    });
});

describe('battle - we win scenarios', () => {
    it('all our words win', () => {
      expect(battle('zzz zzz', 'aaa aaa')).toBe('We win');
    });

    it('majority of our words win', () => {
      expect(battle('zzz aaa zzz', 'aaa zzz aaa')).toBe('We win');
    });

    it('single word battle we win', () => {
      expect(battle('cat', 'bat')).toBe('We win');
    });

    it('capital letters help us win', () => {
      expect(battle('Hello', 'hello')).toBe('We win');
    });
});

describe('battle - we lose scenarios', () => {
    it('all opponent words win', () => {
      expect(battle('aaa aaa', 'zzz zzz')).toBe('We lose');
    });

    it('majority of opponent words win', () => {
      expect(battle('aaa zzz aaa', 'zzz aaa zzz')).toBe('We lose');
    });

    it('single word battle we lose', () => {
      expect(battle('bat', 'cat')).toBe('We lose');
    });

    it('capital letters make us lose', () => {
      expect(battle('hello', 'Hello')).toBe('We lose');
    });
});

describe('battle - draw scenarios', () => {
    it('all words tie', () => {
      expect(battle('abc abc', 'abc abc')).toBe('Draw');
    });

    it('equal wins', () => {
      expect(battle('aaa zzz', 'zzz aaa')).toBe('Draw');
    });

    it('single word tie', () => {
      expect(battle('cat', 'cat')).toBe('Draw');
    });

    it('mixed wins equal', () => {
      expect(battle('aaa bbb ccc', 'zzz abc bbb')).toBe('Draw');
    });
});

describe('battle - lowercase letters', () => {
    it('letter a vs b', () => {
      expect(battle('b', 'a')).toBe('We win');
    });

    it('letter z vs a', () => {
      expect(battle('z', 'a')).toBe('We win');
    });

    it('multiple lowercase words', () => {
      expect(battle('abc def', 'xyz uvw')).toBe('We lose');
    });

    it('same lowercase words', () => {
      expect(battle('test test', 'test test')).toBe('Draw');
    });
});

describe('battle - uppercase letters', () => {
    it('A vs a', () => {
      expect(battle('A', 'a')).toBe('We win');
    });

    it('Z vs z', () => {
      expect(battle('Z', 'z')).toBe('We win');
    });

    it('all uppercase vs lowercase', () => {
      expect(battle('ABC', 'abc')).toBe('We win');
    });

    it('uppercase doubles value', () => {
      expect(battle('B', 'aa')).toBe('We win');
    });
});

describe('battle - mixed case', () => {
    it('mixed case word', () => {
      expect(battle('HeLLo', 'hello')).toBe('We win');
    });

    it('mixed case vs lowercase', () => {
      expect(battle('Test', 'test')).toBe('We win');
    });

    it('different mixed patterns', () => {
      expect(battle('AbC', 'aBc')).toBe('We win');
    });

    it('capitals affect battle', () => {
      expect(battle('code Code', 'Code code')).toBe('Draw');
    });
});

describe('battle - word length variations', () => {
    it('longer word vs shorter', () => {
      expect(battle('aaaa', 'z')).toBe('We lose');
    });

    it('many short words', () => {
      expect(battle('a a a a', 'z z z z')).toBe('We lose');
    });

    it('one long word each', () => {
      expect(battle('programming', 'development')).toBe('Draw');
    });

    it('very short words', () => {
      expect(battle('a b c', 'x y z')).toBe('We lose');
    });
});

describe('battle - multiple words', () => {
    it('three words each', () => {
      expect(battle('one two three', 'four five six')).toBe('We win');
    });

    it('five words each', () => {
      expect(battle('a b c d e', 'z y x w v')).toBe('We lose');
    });

    it('many ties', () => {
      expect(battle('cat cat dog', 'cat dog cat')).toBe('Draw');
    });

    it('alternating wins', () => {
      expect(battle('z a z a z', 'a z a z a')).toBe('We win');
    });
});

describe('battle - letter values', () => {
    it('a equals 1', () => {
      expect(battle('a', 'aa')).toBe('We lose');
    });

    it('z equals 26', () => {
      expect(battle('zz', 'z')).toBe('We win');
    });

    it('capital A equals 2', () => {
      expect(battle('A', 'aa')).toBe('Draw');
    });

    it('capital Z equals 52', () => {
      expect(battle('Z', 'zz')).toBe('Draw');
    });
});

describe('battle - word position matters', () => {
    it('first word determines first battle', () => {
      expect(battle('z a', 'a z')).toBe('Draw');
    });

    it('order affects outcome', () => {
      expect(battle('zzz a a', 'a zzz zzz')).toBe('We lose');
    });

    it('position changes result', () => {
      expect(battle('cat dog bird', 'dog bird cat')).toBe('We lose');
    });

    it('sequential battles', () => {
      expect(battle('a b c', 'c b a')).toBe('Draw');
    });
});

describe('battle - equal word values', () => {
    it('identical words tie', () => {
      expect(battle('test', 'test')).toBe('Draw');
    });

    it('different words same value', () => {
      expect(battle('ba', 'ab')).toBe('Draw');
    });

    it('ties do not count as wins', () => {
      expect(battle('aa bb cc', 'aa bb dd')).toBe('We lose');
    });

    it('all battles tie', () => {
      expect(battle('abc def', 'abc def')).toBe('Draw');
    });
});

describe('battle - real word examples', () => {
    it('programming terms', () => {
      expect(battle('function method', 'variable constant')).toBe('Draw');
    });

    it('animal names', () => {
      expect(battle('elephant tiger', 'mouse bird')).toBe('We win');
    });

    it('colors', () => {
      expect(battle('red blue green', 'yellow orange purple')).toBe('We lose');
    });

    it('common words', () => {
      expect(battle('the quick brown', 'fox jumps over')).toBe('We lose');
    });
});

describe('battle - edge cases', () => {
    it('single letter each', () => {
      expect(battle('z', 'a')).toBe('We win');
    });

    it('one word each', () => {
      expect(battle('winner', 'loser')).toBe('We win');
    });

    it('many single letters', () => {
      expect(battle('z z z', 'a a a')).toBe('We win');
    });

    it('identical sentences', () => {
      expect(battle('same same same', 'same same same')).toBe('Draw');
    });
});

describe('battle - capital letter impact', () => {
    it('one capital changes result', () => {
      expect(battle('Test', 'test')).toBe('We win');
    });

    it('multiple capitals', () => {
      expect(battle('ABC', 'abc')).toBe('We win');
    });

    it('capitals in opponent favor', () => {
      expect(battle('test', 'TEST')).toBe('We lose');
    });

    it('strategic capital placement', () => {
      expect(battle('Code Java', 'code java')).toBe('We win');
    });
});













