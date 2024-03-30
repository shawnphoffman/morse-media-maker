'use client'

// @ts-expect-error types
import useSound from 'use-sound'
import { useCallback, useMemo, useState } from 'react'
import { decode, encode } from './utils/morse'
import { createMorseMedia } from './utils/audio'
import Crunker from 'crunker'

const AudioIcon = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height={'1em'} className="inline-block align-[-0.125em]" viewBox="0 0 576 512">
			<path d="M333.1 34.8C344.6 40 352 51.4 352 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L163.8 352H96c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L298.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zm172 72.2c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C507.3 341.3 528 301.1 528 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C466.1 199.1 480 225.9 480 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C425.1 284.4 432 271 432 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
		</svg>
	)
}

export default function Home() {
	const [message, setMessage] = useState('')
	const [output, setOutput] = useState<{ exported?: { blob: Blob } }>({})
	const [theme, setTheme] = useState('ohyeah')

	const clips = useMemo(() => {
		if (theme === 'discord') {
			return {
				di: '/audio/di.mp3',
				dah: '/audio/dah.mp3',
			}
		}
		return {
			di: '/audio/di-oh.mp3',
			dah: '/audio/dah-oh.mp3',
		}
	}, [theme])

	const [playDi] = useSound(clips.di)
	const [playDah] = useSound(clips.dah)

	const handleMessage = useCallback((e: any) => {
		setMessage(e.target.value)
	}, [])

	const handleTheme = useCallback((e: any) => {
		setTheme(e.target.value)
	}, [])

	const morseMessage = useMemo(() => {
		return encode(message)
	}, [message])

	const handleGenerateAudio = useCallback(async () => {
		const response = await createMorseMedia(morseMessage, clips)
		// console.log('handleGenerateAudio', response)
		setOutput(() => response)
	}, [clips, morseMessage])

	const outputBlobUrl = useMemo(() => {
		if (!output?.exported?.blob) return ''
		const url = URL.createObjectURL(output?.exported.blob)
		return url
	}, [output])

	const downloadOutput = useCallback(() => {
		if (!output?.exported?.blob) return ''
		let crunker = new Crunker()
		crunker.download(output.exported.blob, `morse-output (${new Date().toLocaleString()}).mp3`)
	}, [output])

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
			<div className="max-w-5xl w-full flex flex-col bg-gray-800/30 border border-gray-800 gap-4 p-4 rounded-xl card">
				<h1 className="text-4xl text-accent font-bold">Morse Media Maker</h1>
				<h2 className="text-xl text-primary font-medium">Mmmmmmmm...</h2>
				<div>
					This website is dumb. It converts text to morse code, then converts the morse code to audio. You can preview the audio, download
					it, and even play it in your browser.
				</div>
				<div>
					Currently, there are a limited set of <span className="badge badge-info font-medium">dot</span> and{' '}
					<span className="badge badge-primary font-medium">dash</span> audio files. I plan on making this customizable at some point.
				</div>
				<form className="gap-4 flex flex-col">
					{/*  */}
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-secondary">What would you like to say?</span>
						</div>
						<input
							type="text"
							placeholder="Type your message here..."
							className="input input-bordered input-primary w-full"
							maxLength={100}
							onChange={handleMessage}
							autoFocus
							value={message}
						/>
					</label>

					{/*  */}
					{message && (
						<div className="mockup-code">
							<div className="whitespace-break-words px-[2ch]">
								<code>
									<span className="font-bold">Input: </span>
									<>{message}</>
								</code>
							</div>
							<div className="whitespace-break-spaces	px-[2ch] text-info">
								<code>
									<span className="font-bold">Output: </span>
									<>{morseMessage}</>
								</code>
							</div>
							<div className="whitespace-break-words px-[2ch] text-success">
								<code>
									<span className="font-bold">Decoded: </span>
									<>{decode(morseMessage)}</>
								</code>
							</div>
						</div>
					)}

					{/*  */}
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text text-secondary">Audio Theme</span>
						</div>
						<div className="join w-full flex">
							<input
								className="join-item btn flex-1 text-lg"
								type="radio"
								name="options"
								value="discord"
								checked={theme === 'discord'}
								onChange={handleTheme}
								aria-label="Boop Boop"
							/>
							<input
								className="join-item btn flex-1 text-lg"
								type="radio"
								name="options"
								value="ohyeah"
								checked={theme === 'ohyeah'}
								onChange={handleTheme}
								aria-label="Ho Yeah"
							/>
						</div>
					</label>

					{/*  */}
					<div className="flex flex-row gap-4 w-full">
						<button className="btn btn-info flex-1 text-lg" type="button" onClick={playDi}>
							<AudioIcon />
							<>
								<span className="hidden sm:inline">Preview </span>
								Dot
							</>
						</button>
						<button className="btn btn-secondary flex-1 text-lg" type="button" onClick={playDah}>
							<AudioIcon />
							<>
								<span className="hidden sm:inline">Preview </span>
								Dash
							</>
						</button>
					</div>

					{outputBlobUrl ? (
						<button className="btn btn-warning text-xl" type="button" onClick={handleGenerateAudio} disabled={!message}>
							Regenerate Audio
						</button>
					) : (
						<button className="btn btn-accent text-xl" type="button" onClick={handleGenerateAudio} disabled={!message}>
							Generate Audio
						</button>
					)}

					{/*  */}
					{outputBlobUrl && (
						<>
							{/*  */}
							<div className="flex flex-col w-full">
								<div className="divider divider-primary" />
							</div>
							<audio src={outputBlobUrl} controls className="w-full" />
							<button className="btn btn-success flex-1 text-xl" type="button" onClick={downloadOutput}>
								Download Output
							</button>
						</>
					)}
				</form>
			</div>
		</main>
	)
}
