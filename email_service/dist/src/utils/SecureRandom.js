"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureRandom = void 0;
const crypto_1 = require("crypto");
/**
 * Responsible for generating cryptographically secure random numbers or strings of characters (depending on the use-case).
 *
 * @author Peter (Somogyvari) Metz <peter.metz@unarin.com>
 */
class SecureRandom {
    /**
     * @inheritDoc
     */
    static generate(length = 36, chars = SecureRandom.DEFAULT_CHARACTER_SET) {
        return SecureRandom._generate(length, chars);
    }
    /**
     * Produces a random character string with the given length and from the characters provided.
     * @param {Number} length The number of characters you wish to have in the output (integer).
     * @param {string} chars
     * @returns {string} The random sequence of characters, picked from {@code chars} or the default set which is
     *    {@code SecureRandom#DEFAULT_CHARACTER_SET}
     *
     * @throws Error if the provided {@code chars} argument is longer than 256 characters.
     * @throw TypeError if the provided {@code length} argument is a {@code NaN} or not finite.
     */
    static _generate(length, chars) {
        if (isNaN(length)) {
            throw new TypeError(`Argument 'length' must be a number. Got: ` + length);
        }
        if (!isFinite(length)) {
            throw new TypeError(`Argument 'length' has to be a finite integer. Got: ` + length);
        }
        const charsLength = chars.length;
        if (charsLength > 256) {
            throw new Error(`Argument 'chars' should not have more than 256 characters, otherwise unpredictability ` +
                `will be broken`);
        }
        const randomBytesBuffer = (0, crypto_1.randomBytes)(length);
        const result = new Array(length);
        let cursor = 0;
        for (let i = 0; i < length; i++) {
            cursor += randomBytesBuffer[i];
            result[i] = chars[cursor % charsLength];
        }
        return result.join('');
    }
}
exports.SecureRandom = SecureRandom;
SecureRandom.DEFAULT_CHARACTER_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//# sourceMappingURL=SecureRandom.js.map