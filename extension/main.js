function helloWorld() {
	console.log('hello, world!');

	let body = document.getElementsByTagName('body')[0];
	body.style.backgroundColor = 'green';

	let doc = nlp('she sells seashells by the seashore.');
	doc.verbs().toPastTense();
	console.log(doc.text());
}

helloWorld();
