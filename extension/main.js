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

export function simplifyBefore(word, nlp) {
	word = inlineRemover(word)
		.toLowerCase()
		.replace(
			/^[%^\-\u2014\u2013*&@#%/:;.,"'?!°(){}[\]<>]+|[%^\-\u2014\u2013*&@%/#:;.,"'?!°(){}[\]<>]+$/gm,
			''
		);
	let singNoun = nlp(word).nouns().toSingular();
	return singNoun.list.length ? singNoun.text() : word;
}
