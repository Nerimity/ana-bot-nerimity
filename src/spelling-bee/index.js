/**
 * Reference https://github.com/Gyanreyer/open-spelling-bee/blob/main/src/pwa/serviceWorker.js
 */
import { readFileSync } from "fs";
const fullWordData = JSON.parse(readFileSync("./bee-words.json", "utf-8"));

function createSpellingBeeData() {
  const [allWords, letterSets, letterSetWordIndices] = fullWordData;

  const letterSetIndex = Math.floor(Math.random() * letterSets.length);
  const letterSetString = letterSets[letterSetIndex];
  /**
   * @type {string}
   */
  let centerLetter = null;
  /**
   * @type {string[]}
   */
  const outerLetters = new Array(6);
  let outerLetterIndex = 0;

  for (let i = 0; i < 7; ++i) {
    const letter = letterSetString[i];
    const charCode = letter.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      // If the letter is uppercase, it's the center letter
      centerLetter = letter.toLowerCase();
    } else {
      outerLetters[outerLetterIndex++] = letter;
    }
  }

  for (let i = 0; i < 7; ++i) {
    const letter = letterSetString[i];
    const charCode = letter.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      // If the letter is uppercase, it's the center letter
      centerLetter = letter.toLowerCase();
    } else {
      outerLetters[outerLetterIndex++] = letter;
    }
  }

  const validWordIndices = letterSetWordIndices[letterSetIndex];

  /**
   * @type {string[]}
   */
  const validWords = new Array(validWordIndices.length);
  for (let i = 0; i < validWordIndices.length; ++i) {
    validWords[i] = allWords[validWordIndices[i]];
  }

  const data = {
    centerLetter,
    outerLetters,
    validWords,
  };
  return data;
}


console.log(createSpellingBeeData())