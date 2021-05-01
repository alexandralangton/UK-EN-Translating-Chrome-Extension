import { inlineAdder } from '../extension/main';
import { test, expect } from '@jest/globals';

describe('Function inlineAdder: Adding in inline HTML elements from original text to translated words', () => {
	test('it returns the given translated word, not the original word', () => {
		expect(inlineAdder('<b>zucchini', 'courgette')).toBe('<b>courgette');
		expect(inlineAdder('<li>rumor', 'rumour')).toBe('<li>rumour');
		expect(inlineAdder('theater</small>', 'theatre')).toBe('theatre</small>');
	});

	test("it doesn't returns the translated word even if there are no inline elements to add", () => {
		expect(inlineAdder('jewelry', 'jewellery')).toBe('jewellery');
		expect(inlineAdder('mail', 'post')).toBe('post');
		expect(inlineAdder('cozy', 'cosy')).toBe('cosy');
	});

	test('it adds HTML elements at the start of a word', () => {
		expect(inlineAdder('<b>karat', 'carat')).toBe('<b>carat');
		expect(inlineAdder('<strong>canceled', 'cancelled')).toBe(
			'<strong>cancelled'
		);
		expect(inlineAdder('<i>wooly', 'woolly')).toBe('<i>woolly');
	});

	test('it adds HTML elements at the end of a word', () => {
		expect(inlineAdder('analyze</b>', 'analyse')).toBe('analyse</b>');
		expect(inlineAdder('airplane</strong>', 'aeroplane')).toBe(
			'aeroplane</strong>'
		);
		expect(inlineAdder('oatmeal</i>', 'porridge')).toBe('porridge</i>');
	});

	test('it adds HTML elements at the start and end of a word', () => {
		expect(inlineAdder('<b>candy</b>', 'sweets')).toBe('<b>sweets</b>');
		expect(inlineAdder('<strong>eggplant</strong>', 'aubergine')).toBe(
			'<strong>aubergine</strong>'
		);
		expect(inlineAdder('<i>flavor</i>', 'flavour')).toBe('<i>flavour</i>');
	});

	test('it adds erroneous closing HTML elements at the start of a word', () => {
		expect(inlineAdder('</b>ocher', 'ochre')).toBe('</b>ochre');
		expect(inlineAdder('</strong>center', 'centre')).toBe('</strong>centre');
		expect(inlineAdder('</i>trash', 'rubbish')).toBe('</i>rubbish');
	});

	test('it adds erroneous opening HTML elements at the end of a word', () => {
		expect(inlineAdder('sidewalk<b>', 'pavement')).toBe('pavement<b>');
		expect(inlineAdder('cilantro<strong>', 'coriander')).toBe(
			'coriander<strong>'
		);
		expect(inlineAdder('math<i>', 'maths')).toBe('maths<i>');
	});

	test('it correctly adds multiple HTML elements at the start of a word', () => {
		expect(inlineAdder('<b><span>humor', 'humour')).toBe('<b><span>humour');
		expect(inlineAdder('<strong><li>truck', 'lorry')).toBe('<strong><li>lorry');
		expect(inlineAdder('<a><i><small>mom', 'mum')).toBe('<a><i><small>mum');
	});

	test('it correctly adds multiple HTML elements at the end of a word', () => {
		expect(inlineAdder('curb</b></span>', 'kerb')).toBe('kerb</b></span>');
		expect(inlineAdder('optimize</strong></li>', 'optimise')).toBe(
			'optimise</strong></li>'
		);
		expect(inlineAdder('chili</a></i></small>', 'chilli')).toBe(
			'chilli</a></i></small>'
		);
	});

	test('it correctly adds multiple HTML elements at the start and end of a word', () => {
		expect(inlineAdder('<b><span>glamor</b></span>', 'glamour')).toBe(
			'<b><span>glamour</b></span>'
		);
		expect(inlineAdder('<strong><li>movie</strong></li>', 'film')).toBe(
			'<strong><li>film</strong></li>'
		);
		expect(inlineAdder('<a><i><small>ameba</a></i></small>', 'amoeba')).toBe(
			'<a><i><small>amoeba</a></i></small>'
		);
	});
});
