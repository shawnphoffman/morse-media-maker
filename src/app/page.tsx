'use client'

// @ts-expect-error types
import useSound from 'use-sound'
import { useCallback, useMemo, useState } from 'react'
import morse, { decode } from './utils/morse'
import { createMorseMedia } from './utils/audio'

console.log('env', process.env)

export default function Home() {
	const [message, setMessage] = useState('')

	const [playDi] = useSound('/audio/di-deez.mp3')
	const [playDah] = useSound('audio/di-deez.mp3')

	const handleMessage = useCallback((e: any) => {
		setMessage(e.target.value)
	}, [])

	const morseMessage = useMemo(() => {
		return morse.encode(message)
	}, [message])

	const handleGenerateAudio = useCallback(async () => {
		const response = await createMorseMedia(morseMessage)
	}, [morseMessage])

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-16 lg:p-24">
			<div className="max-w-5xl w-full flex flex-col bg-gray-800/30 border border-gray-800 gap-4 p-4 rounded-xl card">
				<h1 className="text-3xl">Morse Media Maker</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
					consequat interdum varius sit amet mattis vulputate. Tortor at risus viverra adipiscing at in.
				</p>
				<form className="gap-4 flex flex-col">
					{/*  */}
					{/*  */}
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text">What would you like to say?</span>
							{/* <span className="label-text-alt">Top Right label</span> */}
						</div>
						<input
							type="text"
							placeholder="Type your message here..."
							className="input input-bordered input-primary w-full"
							maxLength={100}
							onChange={handleMessage}
							value={message}
						/>
						{/* <div className="label">
							<span className="label-text-alt">Bottom Left label</span>
							<span className="label-text-alt">Bottom Right label</span>
						</div> */}
					</label>

					{/*  */}
					{/*  */}
					{message && (
						<div className="mockup-code">
							<pre className="">
								<code>Input: {message}</code>
							</pre>
							<div className="whitespace-break-spaces	px-[2ch] text-info">
								<code>Output: {morseMessage}</code>
							</div>
							<pre className="">
								<code>Decoded: {decode(morseMessage)}</code>
							</pre>
						</div>
					)}

					{/*  */}
					{/*  */}
					<div className="flex flex-row gap-4 w-full">
						<button className="btn btn-accent flex-1" type="button" onClick={playDi}>
							<svg xmlns="http://www.w3.org/2000/svg" height={'1em'} className="inline-block align-[-0.125em]" viewBox="0 0 576 512">
								<path d="M333.1 34.8C344.6 40 352 51.4 352 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L163.8 352H96c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L298.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zm172 72.2c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C507.3 341.3 528 301.1 528 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C466.1 199.1 480 225.9 480 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C425.1 284.4 432 271 432 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
							</svg>
							<>Dot</>
						</button>
						<button className="btn btn-secondary flex-1" type="button" onClick={playDah}>
							<svg xmlns="http://www.w3.org/2000/svg" height={'1em'} className="inline-block align-[-0.125em]" viewBox="0 0 576 512">
								<path d="M333.1 34.8C344.6 40 352 51.4 352 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L163.8 352H96c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L298.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zm172 72.2c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C507.3 341.3 528 301.1 528 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C466.1 199.1 480 225.9 480 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C425.1 284.4 432 271 432 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
							</svg>
							<>Dash</>
						</button>
					</div>

					<button className="btn btn-info" type="button" onClick={handleGenerateAudio}>
						GENERATE AUDIO
					</button>
					{/* <button className="btn btn-warning">REGENERATE AUDIO</button> */}
				</form>

				{/*  */}
				{/*  */}
				<div className="flex flex-col w-full">
					{/* <div className="divider divider-primary">Output</div> */}
					<div className="divider divider-primary" />
				</div>

				{/*  */}
				{/*  */}
				<div className="mockup-code">
					<pre data-prefix="$" className="text-info">
						<code>create morse media</code>
					</pre>
					<pre data-prefix=">" className="">
						<code>converting text to morse code...</code>
					</pre>
					<pre data-prefix=">" className="text-info pre">
						{/* <code className="loading loading-spinner loading-xs"></code> */}
						<code className="loading loading-dots loading-xs"></code>
					</pre>
					<pre data-prefix=">" className="text-info">
						<code>morse code: ...-- .-. --..- .-.. --.- --.</code>
					</pre>
					<pre data-prefix=">" className="">
						<code>converting morse to audio...</code>
					</pre>
					<pre data-prefix=">" className="text-success">
						<code>success!!!</code>
					</pre>
				</div>

				{/*  */}
				{/*  */}
				{/* <button className="btn btn-success btn-lg">DOWNLOAD OUTPUT</button> */}
				<button className="btn btn-success">DOWNLOAD OUTPUT</button>
			</div>
		</main>
	)
}
