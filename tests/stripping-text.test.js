import { inlineRemover, simplifyBefore } from '../extension/main';
import { test, expect } from '@jest/globals';
import nlp from 'compromise';

describe('Function inlineRemover: Detecting and removing inline HTML elements from original text', () => {
	test('it removes HTML elements at the start of a word', () => {
		expect(inlineRemover('<b>hello')).toBe('hello');
		expect(inlineRemover('<strong>world')).toBe('world');
		expect(inlineRemover('<i>today')).toBe('today');
	});

	test('it removes HTML elements at the end of a word', () => {
		expect(inlineRemover('hello</b>')).toBe('hello');
		expect(inlineRemover('world</strong>')).toBe('world');
		expect(inlineRemover('today</i>')).toBe('today');
	});

	test('it removes HTML elements at the start and end of a word', () => {
		expect(inlineRemover('<b>hello</b>')).toBe('hello');
		expect(inlineRemover('<strong>world</strong>')).toBe('world');
		expect(inlineRemover('<i>today</i>')).toBe('today');
	});

	test('it removes erroneous closing HTML elements at the start of a word', () => {
		expect(inlineRemover('</b>hello')).toBe('hello');
		expect(inlineRemover('</strong>world')).toBe('world');
		expect(inlineRemover('</i>today')).toBe('today');
	});

	test('it removes erroneous opening HTML elements at the end of a word', () => {
		expect(inlineRemover('hello<b>')).toBe('hello');
		expect(inlineRemover('world<strong>')).toBe('world');
		expect(inlineRemover('today<i>')).toBe('today');
	});

	test('it removes multiple HTML elements at the start of a word', () => {
		expect(inlineRemover('<b><span>hello')).toBe('hello');
		expect(inlineRemover('<strong><li>world')).toBe('world');
		expect(inlineRemover('<a><i><small>link')).toBe('link');
	});

	test('it removes multiple HTML elements at the end of a word', () => {
		expect(inlineRemover('hello</b></span>')).toBe('hello');
		expect(inlineRemover('world</strong></li>')).toBe('world');
		expect(inlineRemover('link</a></i></small>')).toBe('link');
	});

	test('it removes multiple HTML elements at the start and end of a word', () => {
		expect(inlineRemover('<b><span>hello</b></span>')).toBe('hello');
		expect(inlineRemover('<strong><li>world</strong></li>')).toBe('world');
		expect(inlineRemover('<a><i><small>link</a></i></small>')).toBe('link');
	});
});

describe('Function simplifyBefore: Removing all punctuation, plurals and capital letters from a word before looking it up in the dictionary', () => {
	test('it removes punctuation from the start of a word', () => {
		expect(simplifyBefore('"hello', nlp)).toBe('hello');
		expect(simplifyBefore("'world", nlp)).toBe('world');
		expect(simplifyBefore('\u2014how', nlp)).toBe('how');
		expect(simplifyBefore('\u2013are', nlp)).toBe('are');
		expect(simplifyBefore('-you', nlp)).toBe('you');
		expect(simplifyBefore('(today', nlp)).toBe('today');
		expect(simplifyBefore('{all', nlp)).toBe('all');
		expect(simplifyBefore('[is', nlp)).toBe('is');
		expect(simplifyBefore('#well', nlp)).toBe('well');
		expect(simplifyBefore('>here', nlp)).toBe('here');
		expect(simplifyBefore('.in', nlp)).toBe('in');
		expect(simplifyBefore(',this', nlp)).toBe('this');
		expect(simplifyBefore(';chrome', nlp)).toBe('chrome');
		expect(simplifyBefore(':extension', nlp)).toBe('extension');
		expect(simplifyBefore('!right', nlp)).toBe('right');
		expect(simplifyBefore('?now', nlp)).toBe('now');
	});

	test('it removes punctuation from the end of a word', () => {
		expect(simplifyBefore('hello"', nlp)).toBe('hello');
		expect(simplifyBefore("world'", nlp)).toBe('world');
		expect(simplifyBefore('how\u2014', nlp)).toBe('how');
		expect(simplifyBefore('are\u2013', nlp)).toBe('are');
		expect(simplifyBefore('you-', nlp)).toBe('you');
		expect(simplifyBefore('today)', nlp)).toBe('today');
		expect(simplifyBefore('all}', nlp)).toBe('all');
		expect(simplifyBefore('is]', nlp)).toBe('is');
		expect(simplifyBefore('well#', nlp)).toBe('well');
		expect(simplifyBefore('here<', nlp)).toBe('here');
		expect(simplifyBefore('in.', nlp)).toBe('in');
		expect(simplifyBefore('this,', nlp)).toBe('this');
		expect(simplifyBefore('chrome;', nlp)).toBe('chrome');
		expect(simplifyBefore('extension:', nlp)).toBe('extension');
		expect(simplifyBefore('thanks!', nlp)).toBe('thanks');
		expect(simplifyBefore('for?', nlp)).toBe('for');
		expect(simplifyBefore('asking°', nlp)).toBe('asking');
	});

	test('it removes punctuation from the start and end of a word', () => {
		expect(simplifyBefore('"you"', nlp)).toBe('you');
		expect(simplifyBefore("'are'", nlp)).toBe('are');
		expect(simplifyBefore('\u2014the\u2014', nlp)).toBe('the');
		expect(simplifyBefore('\u2013dancing\u2013', nlp)).toBe('dancing');
		expect(simplifyBefore('-queen-', nlp)).toBe('queen');
		expect(simplifyBefore('(young)', nlp)).toBe('young');
		expect(simplifyBefore('°and°', nlp)).toBe('and');
		expect(simplifyBefore(';sweet.', nlp)).toBe('sweet');
		expect(simplifyBefore(':only!', nlp)).toBe('only');
		expect(simplifyBefore("!seventeen'", nlp)).toBe('seventeen');
	});

	test('it removes multiple punctuation symbols from the start of a word', () => {
		expect(simplifyBefore('("we', nlp)).toBe('we');
		expect(simplifyBefore("'*all", nlp)).toBe('all');
		expect(simplifyBefore('!\u2014live', nlp)).toBe('live');
		expect(simplifyBefore(',\u2013in', nlp)).toBe('in');
		expect(simplifyBefore('-:a', nlp)).toBe('a');
		expect(simplifyBefore('#(yellow)', nlp)).toBe('yellow');
		expect(simplifyBefore('!?submarine', nlp)).toBe('submarine');
		expect(simplifyBefore("'[and", nlp)).toBe('and');
		expect(simplifyBefore('@#our', nlp)).toBe('our');
		expect(simplifyBefore('%/friends', nlp)).toBe('friend');
		expect(simplifyBefore('&!are', nlp)).toBe('are');
		expect(simplifyBefore('>,all', nlp)).toBe('all');
		expect(simplifyBefore(';,aboard', nlp)).toBe('aboard');
	});

	test('it removes multiple punctuation symbols from the end of a word', () => {
		expect(simplifyBefore('we)"', nlp)).toBe('we');
		expect(simplifyBefore("all}'", nlp)).toBe('all');
		expect(simplifyBefore('live\u2014!', nlp)).toBe('live');
		expect(simplifyBefore('in\u2013,', nlp)).toBe('in');
		expect(simplifyBefore('a-:', nlp)).toBe('a');
		expect(simplifyBefore('yellow)#)', nlp)).toBe('yellow');
		expect(simplifyBefore('submarine!?', nlp)).toBe('submarine');
		expect(simplifyBefore('and?!', nlp)).toBe('and');
		expect(simplifyBefore('our@.', nlp)).toBe('our');
		expect(simplifyBefore('friends%/', nlp)).toBe('friend');
		expect(simplifyBefore('are&!', nlp)).toBe('are');
		expect(simplifyBefore('all>,', nlp)).toBe('all');
		expect(simplifyBefore('aboard".', nlp)).toBe('aboard');
	});

	test('it removes multiple punctuation symbols from the start and end of a word', () => {
		expect(simplifyBefore('"(we)"', nlp)).toBe('we');
		expect(simplifyBefore("'{all}'", nlp)).toBe('all');
		expect(simplifyBefore('^\u2014live\u2014!', nlp)).toBe('live');
		expect(simplifyBefore('\u2013,in\u2013,', nlp)).toBe('in');
		expect(simplifyBefore('!"a-:', nlp)).toBe('a');
		expect(simplifyBefore('(yellow)#)', nlp)).toBe('yellow');
		expect(simplifyBefore(',"submarine!?', nlp)).toBe('submarine');
	});

	test('it converts words into lower case', () => {
		expect(simplifyBefore('EVERY', nlp)).toBe('every');
		expect(simplifyBefore('Body', nlp)).toBe('body');
		expect(simplifyBefore('cLaP', nlp)).toBe('clap');
		expect(simplifyBefore('YOUR', nlp)).toBe('your');
		expect(simplifyBefore('hands', nlp)).toBe('hand');
	});

	test('it converts plural words into singular form', () => {
		expect(simplifyBefore('frogs', nlp)).toBe('frog');
		expect(simplifyBefore('oranges', nlp)).toBe('orange');
		expect(simplifyBefore('geese', nlp)).toBe('goose');
		expect(simplifyBefore('knives', nlp)).toBe('knife');
		expect(simplifyBefore('potatoes', nlp)).toBe('potato');
		expect(simplifyBefore('women', nlp)).toBe('woman');
		expect(simplifyBefore('mice', nlp)).toBe('mouse');
		expect(simplifyBefore('oxen', nlp)).toBe('ox');
		expect(simplifyBefore('people', nlp)).toBe('person');
	});

	test('it does not attempt to edit words which end in an "s" and are not plural', () => {
		expect(simplifyBefore('gas', nlp)).toBe('gas');
		expect(simplifyBefore('pass', nlp)).toBe('pass');
		expect(simplifyBefore('stress', nlp)).toBe('stress');
		expect(simplifyBefore('analysis', nlp)).toBe('analysis');
		expect(simplifyBefore('numerous', nlp)).toBe('numerous');
	});
});
