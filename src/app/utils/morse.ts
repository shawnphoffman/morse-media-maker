export function encode(str: string) {
	const ret = str.split('')
	for (const j in ret) {
		ret[j] = map[ret[j].toUpperCase() as keyof typeof map] || '?'
	}
	return ret.join(' ')
}

export function decode(str: string) {
	const chars = str.split(' ')
	for (const i in chars) {
		chars[i] = decodeCharacterByMap(chars[i])
	}
	return chars.join('')
}

const decodeCharacterByMap = (char: string) => {
	for (const i in map) {
		if (map[i as keyof typeof map] == char) {
			return i
		}
	}
	return ' '
}

// copied from http://freenet.msp.mn.us/people/calguire/morse.html
const map = {
	A: '.-',
	B: '-...',
	C: '-.-.',
	D: '-..',
	E: '.',
	F: '..-.',
	G: '--.',
	H: '....',
	I: '..',
	J: '.---',
	K: '-.-',
	L: '.-..',
	M: '--',
	N: '-.',
	O: '---',
	P: '.--.',
	Q: '--.-',
	R: '.-.',
	S: '...',
	T: '-',
	U: '..-',
	V: '...-',
	W: '.--',
	X: '-..-',
	Y: '-.--',
	Z: '--..',
	// Diacritics
	Á: '.--.-', // A with acute accent
	Ä: '.-.-', // A with diaeresis
	É: '..-..', // E with acute accent
	Ñ: '--.--', // N with tilde
	Ö: '---.', // O with diaeresis
	Ü: '..--', // U with diaeresis
	// Numbers
	1: '.----',
	2: '..---',
	3: '...--',
	4: '....-',
	5: '.....',
	6: '-....',
	7: '--...',
	8: '---..',
	9: '----.',
	0: '-----',
	// Punctuation
	'.': '.-.-.-', // period
	',': '--..--', // comma
	'?': '..--..', // question mark
	"'": '.----.', // apostrophe
	'!': '-.-.--', // exclamation
	'/': '-..-.', // slash
	'(': '-.--.', // open paren
	')': '-.--.-', // close paren
	':': '---...', // colon
	';': '-.-.-.', // semicolon
	'=': '-...-', // equal
	'+': '.-.-.', // plus
	'-': '-....-', // dash
	_: '..--.-', // underline
	'"': '.-..-.', // quotation mark
	$: '...-..-', // dollar
	'@': '.--.-.', // at symbol from http://www.learnmorsecode.com/
	// ' ': '.......'
	' ': '/',
} as const

const output = {
	encode,
	decode,
	map,
}

export default output
