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
	// also need to account for ized, lled, llment endings
	return singNoun.list.length ? singNoun.text() : word;
}

export function matchCase(usWord, ukWord) {
	let lowerNum = 0,
		upperNum = 0;
	for (let i = 0; i < usWord.length; i++) {
		let usCode = usWord.charCodeAt(i);
		if (usCode >= 65 && usCode < 65 + 26) upperNum++;
		else lowerNum++;
	}

	let capCase;
	if (lowerNum > upperNum) {
		if (usWord.charCodeAt(0) >= 65 && usWord.charCodeAt(0) < 65 + 26) {
			capCase = 'title';
		} else {
			capCase = 'lower';
		}
	} else {
		capCase = 'upper';
	}

	let result = capCase === 'lower' ? ukWord[0] : ukWord[0].toUpperCase();
	for (let j = 1; j < ukWord.length; j++) {
		result += capCase === 'upper' ? ukWord[j].toUpperCase() : ukWord[j];
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

export function punctuationAdder(word, translatedWord) {
	const frontPunct = word.match(
		/^[%^\-\u2014\u2013*&@#%/:;.,"'?!°(){}[\]<>]+/g
	);
	const endPunct = word.match(/[%^\-\u2014\u2013*&@%/#:;.,"'?!°(){}[\]<>]+$/g);
	let punctuatedWord = '';
	if (frontPunct) punctuatedWord += frontPunct;
	punctuatedWord += translatedWord;
	if (endPunct) punctuatedWord += endPunct;
	return punctuatedWord;
}

export function pluralDetector(word, translatedWord, twoToOnePlural) {
	if (word.endsWith('s') || twoToOnePlural === 's') {
		translatedWord = translatedWord + 's';
	} else if (word.endsWith('zed') || twoToOnePlural === 'zed') {
		translatedWord = translatedWord + 'd';
	} else if (word.endsWith('lled')) {
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

	// add any plurals back in
	translatedWord = pluralDetector(wordToTest, translatedWord);

	// add back any punctuation at the start / end
	translatedWord = punctuationAdder(word, translatedWord);

	// add back in any inline tags before returning the word
	return inlineAdder(word, translatedWord);
}
