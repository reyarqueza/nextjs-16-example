import { Filter } from "bad-words";

const profanityFilter = new Filter();

const INVISIBLE_CHAR_REGEX = /[\u200B-\u200D\uFEFF\u2060]/g;
const URL_SCHEME_REGEX = /\b[a-z][a-z0-9+.-]{1,15}:\/\/\S+/i;
const WWW_REGEX = /\bwww\.\S+/i;
const DOMAIN_REGEX =
  /\b(?:[a-z0-9-]{1,63}\.)+(?:com|net|org|io|co|edu|gov|me|app|dev|gg|tv|fm|biz|info|xyz|site|store|shop|online|us|uk|ca|au|de|fr|jp|cn|ru)\b/i;
const BOX_DRAWING_OR_BRAILLE_REGEX = /[\u2500-\u257F\u2580-\u259F\u2800-\u28FF]/;
const REPEATED_SYMBOL_REGEX = /([^\p{L}\p{N}\s])\1{5,}/u;
const EQUALS_ART_REGEX = /={3,}/;
const NON_ALPHANUMERIC_SPACE_REGEX = /[^\p{L}\p{N} ]/u;
const REPEATED_ALPHANUMERIC_REGEX = /([\p{L}\p{N}])\1{3,}/u;

export function sanitizeUserTextInput(value: string) {
  return value.normalize("NFKC").replace(INVISIBLE_CHAR_REGEX, "");
}

export function normalizeSingleLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function assertNoUrlLike(value: string) {
  if (URL_SCHEME_REGEX.test(value) || WWW_REGEX.test(value) || DOMAIN_REGEX.test(value)) {
    throw new Error("Please remove URLs from the title.");
  }
}

export function assertNoProfanity(value: string) {
  if (profanityFilter.isProfane(value)) {
    throw new Error("Please remove profanity from the title.");
  }
}

export function assertNoAsciiArtLike(rawValue: string, normalizedValue: string) {
  if (
    BOX_DRAWING_OR_BRAILLE_REGEX.test(rawValue) ||
    REPEATED_SYMBOL_REGEX.test(rawValue) ||
    EQUALS_ART_REGEX.test(rawValue)
  ) {
    throw new Error("Please remove ASCII art from the title.");
  }

  const compact = normalizedValue.replace(/\s/g, "");
  if (compact.length >= 20) {
    const lettersAndNumbers = compact.match(/[\p{L}\p{N}]/gu)?.length ?? 0;
    const ratio = lettersAndNumbers / compact.length;
    if (ratio < 0.4) {
      throw new Error("Please remove ASCII art from the title.");
    }
  }
}

export function assertAlphaNumericOnly(value: string) {
  if (NON_ALPHANUMERIC_SPACE_REGEX.test(value)) {
    throw new Error("Title may only contain letters, numbers, and spaces.");
  }
}

export function assertNoRepeatedConsecutiveChars(value: string) {
  if (REPEATED_ALPHANUMERIC_REGEX.test(value)) {
    throw new Error("Title may not contain 4+ repeated consecutive characters.");
  }
}

function isRepeatedPatternToken(token: string) {
  if (token.length < 4) return false;

  const maxUnitLength = Math.min(6, Math.floor(token.length / 2));
  for (let unitLength = 2; unitLength <= maxUnitLength; unitLength += 1) {
    if (token.length % unitLength !== 0) continue;
    const unit = token.slice(0, unitLength);
    const repeated = unit.repeat(token.length / unitLength);
    if (repeated === token) return true;
  }

  return false;
}

export function assertNoRepeatedPatterns(value: string) {
  const tokens = value.split(" ").filter(Boolean);
  if (tokens.some(isRepeatedPatternToken)) {
    throw new Error("Title may not contain repeated patterns.");
  }
}

export function sanitizeAndValidateTitle(rawTitle: string) {
  const cleanedRawTitle = sanitizeUserTextInput(rawTitle);
  const title = normalizeSingleLine(cleanedRawTitle);

  if (title.length > 200) {
    throw new Error("Title must be 200 characters or fewer.");
  }

  assertAlphaNumericOnly(title);
  assertNoRepeatedConsecutiveChars(title);
  assertNoRepeatedPatterns(title);
  assertNoUrlLike(cleanedRawTitle);
  assertNoProfanity(title);
  assertNoAsciiArtLike(cleanedRawTitle, title);

  return title;
}
