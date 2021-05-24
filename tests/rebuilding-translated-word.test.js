import { inlineAdder, matchCase, punctuationAdder } from '../extension/main';
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

describe('Function matchCase: making the translated word the same case as the original word', () => {
	test('it rebuilds a word in sentence case', () => {
		expect(matchCase('Behavior', 'behaviour')).toBe('Behaviour');
		expect(matchCase('Fiber', 'fibre')).toBe('Fibre');
		expect(matchCase('Flashlight', 'torch')).toBe('Torch');
		expect(matchCase('Takeout', 'takeaway')).toBe('Takeaway');
		expect(matchCase('Honor', 'honour')).toBe('Honour');
	});

	test('it rebuilds a word in all capitals', () => {
		expect(matchCase('BEHAVIOR', 'behaviour')).toBe('BEHAVIOUR');
		expect(matchCase('FIBER', 'fibre')).toBe('FIBRE');
		expect(matchCase('FLASHLIGHT', 'torch')).toBe('TORCH');
		expect(matchCase('TAKEOUT', 'takeaway')).toBe('TAKEAWAY');
		expect(matchCase('HONOR', 'honour')).toBe('HONOUR');
	});

	test("it doesn't change a word in all lowercase", () => {
		expect(matchCase('behavior', 'behaviour')).toBe('behaviour');
		expect(matchCase('fiber', 'fibre')).toBe('fibre');
		expect(matchCase('flashlight', 'torch')).toBe('torch');
		expect(matchCase('takeout', 'takeaway')).toBe('takeaway');
		expect(matchCase('honor', 'honour')).toBe('honour');
	});

	test('it ignores random capitals in a word in sentence case', () => {
		expect(matchCase('BehaVior', 'behaviour')).toBe('Behaviour');
		expect(matchCase('FiBer', 'fibre')).toBe('Fibre');
		expect(matchCase('FlaShlight', 'torch')).toBe('Torch');
		expect(matchCase('TakEout', 'takeaway')).toBe('Takeaway');
		expect(matchCase('HoNor', 'honour')).toBe('Honour');
	});

	test('it ignores random capitals in primarily lowercase words', () => {
		expect(matchCase('behAvior', 'behaviour')).toBe('behaviour');
		expect(matchCase('fIBer', 'fibre')).toBe('fibre');
		expect(matchCase('flashLight', 'torch')).toBe('torch');
		expect(matchCase('takEOut', 'takeaway')).toBe('takeaway');
		expect(matchCase('honoR', 'honour')).toBe('honour');
	});

	test('it ignores random lowercased letters in primarily capitalized words', () => {
		expect(matchCase('BeHAVIOR', 'behaviour')).toBe('BEHAVIOUR');
		expect(matchCase('FIBeR', 'fibre')).toBe('FIBRE');
		expect(matchCase('FLASHLiGHT', 'torch')).toBe('TORCH');
		expect(matchCase('TAkEOUT', 'takeaway')).toBe('TAKEAWAY');
		expect(matchCase('HONOr', 'honour')).toBe('HONOUR');
	});
});

describe('Function punctuationAdder: adding back punctuation', () => {
	test('it adds in single punctuation at the start of a word', () => {
		expect(punctuationAdder('"behavior', 'behaviour')).toBe('"behaviour');
		expect(punctuationAdder('*Favorite', 'Favourite')).toBe('*Favourite');
		expect(punctuationAdder('#COLOR', 'COLOUR')).toBe('#COLOUR');
	});

	test('it adds in multiple punctuation marks at the start of a word', () => {
		expect(punctuationAdder('"%armor', 'armour')).toBe('"%armour');
		expect(punctuationAdder("'(Subway", 'Underground')).toBe("'(Underground");
		expect(punctuationAdder('@#trunk', 'bonnet')).toBe('@#bonnet');
	});

	test('it adds in single punctuation at the end of a word', () => {
		expect(punctuationAdder('wooly.', 'woolly')).toBe('woolly.');
		expect(punctuationAdder('jeweler;', 'jeweller')).toBe('jeweller;');
		expect(punctuationAdder('spelled&', 'spelt')).toBe('spelt&');
		expect(punctuationAdder('programed?', 'programmed')).toBe('programmed?');
	});

	test('it adds in multiple punctuation marks at the end of a word', () => {
		expect(punctuationAdder("wooly';", 'woolly')).toBe("woolly';");
		expect(punctuationAdder('jeweler!"', 'jeweller')).toBe('jeweller!"');
		expect(punctuationAdder('spelled)-', 'spelt')).toBe('spelt)-');
		expect(punctuationAdder('programed?!', 'programmed')).toBe('programmed?!');
	});

	test('it adds in single punctuation at the start and end of a word', () => {
		expect(punctuationAdder('"behavior"', 'behaviour')).toBe('"behaviour"');
		expect(punctuationAdder('(Favorite)', 'Favourite')).toBe('(Favourite)');
		expect(punctuationAdder('^COLOR.', 'COLOUR')).toBe('^COLOUR.');
	});

	test('it adds in multiple punctuation at the start and end of a word', () => {
		expect(punctuationAdder('("behavior")', 'behaviour')).toBe('("behaviour")');
		expect(punctuationAdder("#&Favorite-'", 'Favourite')).toBe("#&Favourite-'");
		expect(punctuationAdder('\u2014<COLOR>!', 'COLOUR')).toBe(
			'\u2014<COLOUR>!'
		);
	});
});

// also need to test for twoToOnePlural
describe('Function pluralDetector: adding back plurals and correct endings', () => {
	test('it makes a translated word plural if the original word is plural', () => {
		expect(punctuationAdder('behaviors', 'behaviour')).toBe('behaviours');
		expect(punctuationAdder('washrooms', 'lavatory')).toBe('lavatories');
		expect(punctuationAdder('apartments', 'flat')).toBe('flats');
		expect(punctuationAdder('flavors', 'flavour')).toBe('flavours');
		expect(punctuationAdder('sabers', 'sabre')).toBe('sabres');
	});

	test('it does not make a translated word plural if the original word is not plural', () => {
		expect(punctuationAdder('zipper', 'zip')).toBe('zip');
		expect(punctuationAdder('clothespin', 'peg')).toBe('peg');
		expect(punctuationAdder('mom', 'mum')).toBe('mum');
		expect(punctuationAdder('stroller', 'pushchair')).toBe('pushchair');
		expect(punctuationAdder('savanna', 'savannah')).toBe('savannah');
	});

	test('it identifies and matches root translations ending in "ized"', () => {
		expect(punctuationAdder('localized', 'localise')).toBe('localised');
		expect(punctuationAdder('apologized', 'apologise')).toBe('apologised');
		expect(punctuationAdder('hypnotized', 'hypnotise')).toBe('hypnotised');
		expect(punctuationAdder('realized', 'realise')).toBe('realised');
	});

	test('it identifies and matches root translations ending in "lled"', () => {
		expect(punctuationAdder('shoveled', 'shovel')).toBe('shovelled');
		expect(punctuationAdder('totaled', 'total')).toBe('totalled');
		expect(punctuationAdder('rivaled', 'rival')).toBe('rivalled');
		expect(punctuationAdder('unraveled', 'unravel')).toBe('unravelled');
	});

	test('it identifies and matches root translations ending in "llment"', () => {
		expect(punctuationAdder('fulfillment', 'fulfil')).toBe('fulfilment');
		expect(punctuationAdder('installment', 'install')).toBe('instalment');
		expect(punctuationAdder('enrollment', 'enrol')).toBe('enrolment');
		expect(punctuationAdder('entrallment', 'enthral')).toBe('enthralment');
	});
});
