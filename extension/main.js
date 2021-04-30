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

export const inlineRemover = (word) => word.replace(/<\/*\w+>/g, '');

export function simplifyBefore(word) {
	word = word.toLowerCase();
	word = inlineRemover(word);

	if (':;.,"\'?!°)}]<'.includes(word[word.length - 1])) {
		word = word.slice(0, -1);
	}
	if ('.,"\'{[(#>'.includes(word[0])) {
		word = word.slice(1);
	}
	if (word.endsWith('s') && !word.endsWith('ss') && word !== 'gas') {
		word = word.slice(0, -1);
	}
	if (word.endsWith('zed')) {
		word = word.slice(0, -1);
	}
	if (word.endsWith('lled')) {
		word = word.slice(0, -2);
	} else if (word.endsWith('llment')) {
		word = word.slice(0, -4);
	}
	return word;
}
