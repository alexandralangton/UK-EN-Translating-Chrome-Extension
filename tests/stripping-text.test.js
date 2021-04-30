import { inlineRemover } from '../extension/main';
import { test, expect } from '@jest/globals';

describe('detecting and removing inline HTML elements from original text', () => {
	test('removes HTML elements at the start of a word', () => {
		expect(inlineRemover('<b>hello')).toBe('hello');
		expect(inlineRemover('<strong>world')).toBe('world');
		expect(inlineRemover('<i>today')).toBe('today');
	});

	test('removes HTML elements at the end of a word', () => {
		expect(inlineRemover('hello</b>')).toBe('hello');
		expect(inlineRemover('world</strong>')).toBe('world');
		expect(inlineRemover('today</i>')).toBe('today');
	});

	test('removes HTML elements at the start and end of a word', () => {
		expect(inlineRemover('<b>hello</b>')).toBe('hello');
		expect(inlineRemover('<strong>world</strong>')).toBe('world');
		expect(inlineRemover('<i>today</i>')).toBe('today');
	});

	test('removes erroneous closing HTML elements at the start of a word', () => {
		expect(inlineRemover('</b>hello')).toBe('hello');
		expect(inlineRemover('</strong>world')).toBe('world');
		expect(inlineRemover('</i>today')).toBe('today');
	});

	test('removes erroneous opening HTML elements at the end of a word', () => {
		expect(inlineRemover('hello<b>')).toBe('hello');
		expect(inlineRemover('world<strong>')).toBe('world');
		expect(inlineRemover('today<i>')).toBe('today');
	});

	test('removes multiple HTML elements at the start of a word', () => {
		expect(inlineRemover('<b><span>hello')).toBe('hello');
		expect(inlineRemover('<strong><li>world')).toBe('world');
		expect(inlineRemover('<a><i><small>link')).toBe('link');
	});

	test('removes multiple HTML elements at the end of a word', () => {
		expect(inlineRemover('hello</b></span>')).toBe('hello');
		expect(inlineRemover('world</strong></li>')).toBe('world');
		expect(inlineRemover('link</a></i></small>')).toBe('link');
	});

	test('removes multiple HTML elements at the start and end of a word', () => {
		expect(inlineRemover('<b><span>hello</b></span>')).toBe('hello');
		expect(inlineRemover('<strong><li>world</strong></li>')).toBe('world');
		expect(inlineRemover('<a><i><small>link</a></i></small>')).toBe('link');
	});
});
