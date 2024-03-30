import Crunker from 'crunker'

export const createMorseMedia = async (morseMessage: string) => {
	const filesToJoin: AudioBuffer[] = []
	let crunker = new Crunker()

	const promDi = crunker.fetchAudio('/audio/di.mp3')
	const promDah = crunker.fetchAudio('/audio/dah.mp3')
	const promGap = crunker.fetchAudio('/audio/gap.mp3')
	const [buffDi, buffDah, buffGap] = await Promise.all([promDi, promDah, promGap])

	const pieces = morseMessage.split('')

	for (const i of pieces) {
		if (i === '.') {
			filesToJoin.push(buffDi[0])
		} else if (i === '-') {
			filesToJoin.push(buffDah[0])
		} else {
			filesToJoin.push(buffGap[0])
		}
	}

	const merged = await crunker.concatAudio(filesToJoin)
	const exported = await crunker.export(merged, 'audio/mp3')

	return {
		merged,
		exported,
	}
}
