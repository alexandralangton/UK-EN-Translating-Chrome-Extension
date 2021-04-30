import { inlineRemover, simplifyBefore } from '../extension/main';
import { test, expect } from '@jest/globals';

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
		expect(simplifyBefore('"hello')).toBe('hello');
		expect(simplifyBefore("'world")).toBe('world');
		expect(simplifyBefore('\u2014how')).toBe('how');
		expect(simplifyBefore('\u2013are')).toBe('are');
		expect(simplifyBefore('-you')).toBe('you');
		expect(simplifyBefore('(today')).toBe('today');
		expect(simplifyBefore('{all')).toBe('all');
		expect(simplifyBefore('[is')).toBe('is');
		expect(simplifyBefore('#well')).toBe('well');
		expect(simplifyBefore('>here')).toBe('here');
		expect(simplifyBefore('.in')).toBe('in');
		expect(simplifyBefore(',this')).toBe('this');
		expect(simplifyBefore(';chrome')).toBe('chrome');
		expect(simplifyBefore(':extension')).toBe('extension');
		expect(simplifyBefore('!right')).toBe('right');
		expect(simplifyBefore('?now')).toBe('now');
	});

	test('it removes punctuation from the end of a word', () => {
		expect(simplifyBefore('hello"')).toBe('hello');
		expect(simplifyBefore("world'")).toBe('world');
		expect(simplifyBefore('how\u2014')).toBe('how');
		expect(simplifyBefore('are\u2013')).toBe('are');
		expect(simplifyBefore('you-')).toBe('you');
		expect(simplifyBefore('today)')).toBe('today');
		expect(simplifyBefore('all}')).toBe('all');
		expect(simplifyBefore('is]')).toBe('is');
		expect(simplifyBefore('well#')).toBe('well');
		expect(simplifyBefore('here<')).toBe('here');
		expect(simplifyBefore('in.')).toBe('in');
		expect(simplifyBefore('this,')).toBe('this');
		expect(simplifyBefore('chrome;')).toBe('chrome');
		expect(simplifyBefore('extension:')).toBe('extension');
		expect(simplifyBefore('thanks!')).toBe('thanks');
		expect(simplifyBefore('for?')).toBe('for');
		expect(simplifyBefore('asking°')).toBe('asking');
	});

	test('it removes punctuation from the start and end of a word', () => {
		expect(simplifyBefore('"you"')).toBe('you');
		expect(simplifyBefore("'are'")).toBe('are');
		expect(simplifyBefore('\u2014the\u2014')).toBe('the');
		expect(simplifyBefore('\u2013dancing\u2013')).toBe('dancing');
		expect(simplifyBefore('-queen-')).toBe('queen');
		expect(simplifyBefore('(young)')).toBe('young');
		expect(simplifyBefore('°and°')).toBe('and');
		expect(simplifyBefore(';sweet.')).toBe('sweet');
		expect(simplifyBefore(':only!')).toBe('only');
		expect(simplifyBefore("!seventeen'")).toBe('seventeen');
	});

	test('it removes multiple punctuation symbols from the start of a word', () => {
		expect(simplifyBefore('("we')).toBe('we');
		expect(simplifyBefore("'*all")).toBe('all');
		expect(simplifyBefore('!\u2014live')).toBe('live');
		expect(simplifyBefore(',\u2013in')).toBe('in');
		expect(simplifyBefore('-:a')).toBe('a');
		expect(simplifyBefore('#(yellow)')).toBe('yellow');
		expect(simplifyBefore('!?submarine')).toBe('submarine');
		expect(simplifyBefore("'[and")).toBe('and');
		expect(simplifyBefore('@#our')).toBe('our');
		expect(simplifyBefore('%/friends')).toBe('friends');
		expect(simplifyBefore('&!are')).toBe('are');
		expect(simplifyBefore('>,all')).toBe('all');
		expect(simplifyBefore(';,aboard')).toBe('aboard');
	});

	test('it removes multiple punctuation symbols from the end of a word', () => {
		expect(simplifyBefore('we)"')).toBe('we');
		expect(simplifyBefore("all}'")).toBe('all');
		expect(simplifyBefore('live\u2014!')).toBe('live');
		expect(simplifyBefore('in\u2013,')).toBe('in');
		expect(simplifyBefore('a-:')).toBe('a');
		expect(simplifyBefore('yellow)#)')).toBe('yellow');
		expect(simplifyBefore('submarine!?')).toBe('submarine');
		expect(simplifyBefore('and?!')).toBe('and');
		expect(simplifyBefore('our@.')).toBe('our');
		expect(simplifyBefore('friends%/')).toBe('friends');
		expect(simplifyBefore('are&!')).toBe('are');
		expect(simplifyBefore('all>,')).toBe('all');
		expect(simplifyBefore('aboard".')).toBe('aboard');
	});

	test('it removes multiple punctuation symbols from the start and end of a word', () => {
		expect(simplifyBefore('"(we)"')).toBe('we');
		expect(simplifyBefore("'{all}'")).toBe('all');
		expect(simplifyBefore('^\u2014live\u2014!')).toBe('live');
		expect(simplifyBefore('\u2013,in\u2013,')).toBe('in');
		expect(simplifyBefore('!"a-:')).toBe('a');
		expect(simplifyBefore('(yellow)#)')).toBe('yellow');
		expect(simplifyBefore(',"submarine!?')).toBe('submarine');
	});

	test('it converts words into lower case', () => {
		expect(simplifyBefore('EVERY')).toBe('every');
		expect(simplifyBefore('Body')).toBe('body');
		expect(simplifyBefore('cLaP')).toBe('clap');
		expect(simplifyBefore('YOUR')).toBe('your');
		expect(simplifyBefore('hands')).toBe('hands');
	});

	test('it converts plural words into singular form', () => {
		expect(simplifyBefore('frogs')).toBe('frog');
		expect(simplifyBefore('oranges')).toBe('orange');
		expect(simplifyBefore('geese')).toBe('goose');
		expect(simplifyBefore('lives')).toBe('life');
		expect(simplifyBefore('potato')).toBe('potatoes');
		expect(simplifyBefore('women')).toBe('woman');
		expect(simplifyBefore('mice')).toBe('mouse');
		expect(simplifyBefore('oxen')).toBe('ox');
		expect(simplifyBefore('people')).toBe('person');
	});

	test('it does not attempt to edit words which end in an "s" and are not plural', () => {
		expect(simplifyBefore('gas')).toBe('gas');
		expect(simplifyBefore('pass')).toBe('pass');
		expect(simplifyBefore('stress')).toBe('stress');
		expect(simplifyBefore('analysis')).toBe('analysis');
		expect(simplifyBefore('numerous')).toBe('numerous');
	});
});
