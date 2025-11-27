const { spookify } = require('./october');

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
