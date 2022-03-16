import { IsValid } from "./IsValid.js";

describe('IsValid.username()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            expect(IsValid.username()).toBe('Netinkamo tipo reiksme');
        });
        test('netinkamo tipo params', () => {
            expect(IsValid.username(512)).toBe('Netinkamo tipo reiksme');
        });
    })

    describe('Tinkamo tipo parametrai', () => {
        test('tuscias tekstas', () => {
            expect(IsValid.username('')).toBe('Pamirsai irasyti slapyvardi');
        });
        test('per trumpas', () => {
            expect(IsValid.username('As')).toBe('Per trumpas slapyvardis');
        });
        test('per ilgas', () => {
            expect(IsValid.username('Asdrsthjhgfdearsgtrhr')).toBe('Per ilgas slapyvardis');
        });
        test('neleistinas simbolis (tarpas)', () => {
            expect(IsValid.username('John Doe')).toBe('Slapyvardyje yra neleistinas simbolis ( )');
        });
        test('geras username', () => {
            expect(IsValid.username('John')).toBe(true);
        });
    })
})

describe('IsValid.email()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            expect(IsValid.email()).toBe('Netinkamo tipo reiksme');
        });
        test('netinkamo tipo reiksme', () => {
            expect(IsValid.email(512)).toBe('Netinkamo tipo reiksme');
        });
    })

    describe('Tinkamo tipo parametrai', () => {
        test('validus email', () => {
            expect(IsValid.email('vardenis.pavardenis@pastas.com')).toBe(true);
        });
    })
})

describe('IsValid.password()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            expect(IsValid.password()).toBe('Netinkamo tipo reiksme');
        });
        test('netinkamo tipo reiksme', () => {
            expect(IsValid.password(512)).toBe('Netinkamo tipo reiksme');
        });
    })

    describe('Tinkamo tipo parametrai', () => {
        test('tuscias tekstas', () => {
            expect(IsValid.password('')).toBe('Pamirsai irasyti slaptazodi');
        });
        test('per trumpas', () => {
            expect(IsValid.password('ertrhy')).toBe('Per trumpas slaptazodis');
        });
        test('validus password', () => {
            expect(IsValid.password('frsgtrdyukgu')).toBe(true);
        });
    })
})