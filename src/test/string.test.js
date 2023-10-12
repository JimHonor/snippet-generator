import {
  getWordUnderCaret,
  insertTextAtCaret,
  replaceAt,
} from "@src/utils/string";
import { expect, it } from "vitest";

it("should insert text at caret", () => {
  const result = insertTextAtCaret("hello", "world ", 0);
  expect(result).toBe("world hello");
});

it("should", () => {
  const result = replaceAt("hello world", "my", 0, 5);
  expect(result).toBe("my world");
});

it("should get text under caret", () => {
  const result = getWordUnderCaret("012 world", 0);
  expect(result).toStrictEqual([0, 3]);
});

it("should get text under caret", () => {
  const result = getWordUnderCaret("012 hello world", 3);
  expect(result).toStrictEqual([0, 3]);
});

it("should get text under caret", () => {
  const result = getWordUnderCaret("012 hello world", 1);
  expect(result).toStrictEqual([0, 3]);
});

it("should get text under caret", () => {
  const result = getWordUnderCaret("012{}", 4);
  expect(result).toBeUndefined();
});
