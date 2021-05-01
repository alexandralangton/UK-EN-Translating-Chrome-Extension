/* eslint-disable complexity */
import { dictionary } from './dictionary';

function helloWorld() {
	console.log('hello, world!');

	let body = document.getElementsByTagName('body')[0];
	body.style.backgroundColor = 'green';

	let doc = nlp('she sells seashells by the seashore.');
	doc.verbs().toPastTense();
	console.log(doc.text());
}

// comment this line out for testing
// helloWorld();

// Remove all punctuation, plurals and capitals before looking up the word in the dictionary
export const inlineRemover = (word) => word.replace(/<\/*\w+>/g, '');

export function simplifyBefore(word, nlp) {
	word = inlineRemover(word)
		.toLowerCase()
		.replace(
			/^[%^\-\u2014\u2013*&@#%/:;.,"'?!°(){}[\]<>]+|[%^\-\u2014\u2013*&@%/#:;.,"'?!°(){}[\]<>]+$/g,
			''
		);
	let singNoun = nlp(word).nouns().toSingular();
	return singNoun.list.length ? singNoun.text() : word;
}

export function matchCase(usWord, ukWord) {
	let result = '';

	for (let i = 0; i < ukWord.length; i++) {
		let usCode, ukLetter;
		if (i === 0) {
			ukLetter = ukWord.charAt(i);
			usCode = usWord.charCodeAt(i);
		} else {
			ukLetter = ukWord.charAt(i);
			usCode = usWord.charCodeAt(1);
		}
		if (usCode >= 65 && usCode < 65 + 26) {
			result += ukLetter.toUpperCase();
		} else {
			result += ukLetter.toLowerCase();
		}
	}
	return result;
}

export function inlineAdder(word, translatedWord) {
	let frontInline = '',
		endInline = '';
	if (/^<\/*\w+>/g.test(word)) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === '>' && word[i + 1] !== '<') {
				frontInline = word.slice(0, i + 1);
				break;
			}
		}
	}
	if (/<\/*\w+>$/g.test(word)) {
		for (let j = word.length - 1; j >= 0; j--) {
			if (word[j] === '<' && word[j - 1] !== '>') {
				endInline = word.slice(j);
				break;
			}
		}
	}
	return frontInline + translatedWord + endInline;
}

function rebuildTranslatedWord(word, translatedWord, twoToOnePlural) {
	if ('-.,:;"\'?!)}]°<'.includes(word[word.length - 1])) {
		if (word.slice(0, -1).endsWith('s')) {
			translatedWord = translatedWord + 's';
		}
		translatedWord = translatedWord + word[word.length - 1];
	}
	if ('-.,"\'{[(#>'.includes(word[0])) {
		translatedWord = word[0] + translatedWord;
	}
	if (word.endsWith('s') || twoToOnePlural === 's') {
		translatedWord = translatedWord + 's';
	}
	if (word.endsWith('zed') || twoToOnePlural === 'zed') {
		translatedWord = translatedWord + 'd';
	}
	if (word.endsWith('lled')) {
		translatedWord = translatedWord + 'ed';
	} else if (word.endsWith('llment')) {
		translatedWord = translatedWord + 'ment';
	}
	return translatedWord;
}

// Get the word out of the dictionary & adjust the format to match the original word (caps & punctuation)
export function translate(word, wordToTest) {
	// extract the UKEN word from the dictionary
	let translatedWord = dictionary[wordToTest];

	// make sure the translated word has the same capitalization as the original
	translatedWord = matchCase(inlineRemover(word), translatedWord);

	// add any punctuation before/after & plurals back in
	translatedWord = rebuildTranslatedWord(word, translatedWord);

	// add back in any inline tags before returning the word
	return inlineAdder(word, translatedWord);
}
