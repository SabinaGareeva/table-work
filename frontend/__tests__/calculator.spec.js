import { sum, multiply, divide, subtract } from "../src/js/calculator";

describe("sum function", () => {
    test("should return the sum of two numbers", () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(-1, 1)).toBe(0);
    });
});

describe("subtract function", () => {
    test("should return the difference between two numbers", () => {
        expect(subtract(1, 2)).toBe(-1);
        expect(subtract(-1, 1)).toBe(-2);
    });
});

describe("multiply function", () => {
    test("should return the product of two numbers", () => {
        expect(multiply(3, 2)).toBe(6);
        expect(multiply(-1, 1)).toBe(-1);
    });
});

describe("divide function", () => {
    test("should return the quotient of two numbers", () => {
        expect(divide(4, 2)).toBe(2);
        expect(divide(-4, 2)).toBe(-2);
    });
});
