// @ts-expect-error types
import audioconcat from 'audioconcat'

// @ts-expect-error mp3
import di from './audio/di-deez.mp3'
// @ts-expect-error mp3
import dah from './audio/dah-boop.mp3'
// @ts-expect-error mp3
import gap from './audio/gap.mp3'

const map = {
	'.': di,
	'-': dah,
	' ': gap,
} as const

export const createMorseMedia = async (morseMessage: string) => {
	const filesToJoin = []
	const pieces = morseMessage.split('')
	for (const j in pieces) {
		const i = pieces[j]
		filesToJoin.push(map[i as keyof typeof map])
	}

	const output = await audioconcat(filesToJoin)
		.concat('all.mp3')
		.on('start', function (command: any) {
			console.log('ffmpeg process started:', command)
		})
		.on('error', function (err: any) {
			console.error('Error:', err)
			// console.error('ffmpeg stderr:', stderr)
		})
	// .on('end', function (output: any) {
	// 	console.error('Audio created in:', output)
	// })

	console.log('createMorseMedia', { output, filesToJoin, morseMessage, di, dah, gap })

	return 'TEST'
}
