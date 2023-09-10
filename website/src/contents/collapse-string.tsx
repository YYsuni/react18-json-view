import { writeText } from '@/lib/clipboard'
import clsx from 'clsx'
import hljs from 'highlight.js/lib/core'
import { useState } from 'react'
import JsonView from 'react18-json-view'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

type Option = 'directly' | 'word' | 'address'
const options: Option[] = ['directly', 'word', 'address']

export default function CollapseString() {
	const [selected, setSelected] = useState(options[0])
	const [length, setLength] = useState(20)

	const code = `<JsonView \n  src={json_object} \n  collapseStringMode="${selected}" \n  collapseStringsAfterLength={${length}}\n/>`

	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(code, { language: 'js' }).value

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Collapse String</h2>

			<div className='mt-3 flex flex-wrap items-center gap-2'>
				<ul className='flex select-none flex-wrap gap-1'>
					{options.map(item => (
						<li
							key={item}
							className={clsx(
								'min-w-[32px] cursor-pointer rounded-lg border px-2 py-1 text-center',
								selected === item && 'bg-slate-200 dark:bg-slate-700'
							)}
							onClick={() => setSelected(item)}>
							{item}
						</li>
					))}
				</ul>

				<input
					value={length}
					className='rounded-lg border bg-white px-2 py-1'
					type='number'
					onInput={e => {
						const target = e.target as HTMLInputElement
						const value = target.value

						setLength(+value)
					}}
				/>
			</div>

			<div className='relative'>
				<code className='my-3 flex items-center justify-between overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-700'>
					<pre
						dangerouslySetInnerHTML={{
							__html: highlightedCode
						}}
					/>
				</code>
				<button onClick={copy} className='absolute right-4 top-3 rounded-lg border bg-white/50 p-1 backdrop-blur'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>

			<div className='mt-2 rounded-lg border bg-white p-4 text-sm dark:bg-[#0E0832]'>
				<JsonView
					collapseStringMode={selected}
					collapseStringsAfterLength={length}
					src={{
						Interstellar:
							'And we count these moments. These moments when we dare to aim higher, to break barriers, to reach for the stars, to make the unknown known. We count these moments as our proudest achievements.',
						Yasuo: 'Just looking for a road home.',
						Yone: '风中传来苦咸，是悔恨的气味吗？弟弟，疾风亦有归途。',
						ルフィ: 'オレはいつかこの一味にも负けない仲间を集めて、世界一の财宝を见つけて、绝対なってやる！海贼王に！',
						'Поб ег из Шоуш енка':
							'Это заб авные стен ы: снач ала ты их ненав идишь, пот ом ты к ним привык аешь. Попрош ествии н екоторого вр емени ты начин аешь от них зав исеть.',
						π: '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899',
						hash: '0xc12d04188e98f4e5119de50178eb3cdf46db74f762bdb771118f3f3779af84eb',
						code: `"use strict";
            (()=>{
                const functors = [({imports: $h‍_imports, liveVar: $h‍_live, onceVar: $h‍_once, importMeta: $h‍____meta})=>{
                    $h‍_imports([]);
                    const universalThis = globalThis;
                    $h‍_once.universalThis(universalThis);
                    const {Array: Array, Date: Date, FinalizationRegistry: FinalizationRegistry, Float32Array: Float32Array, JSON: JSON, Map: Map, Math: Math, Number: Number, Object: Object, Promise: Promise, Proxy: Proxy, Reflect: Reflect, RegExp: FERAL_REG_EXP, Set: Set, String: String, Symbol: Symbol, WeakMap: WeakMap, WeakSet: WeakSet} = globalThis;
                    $h‍_once.Array(Array),
                    $h‍_once.Date(Date),
                    $h‍_once.FinalizationRegistry(FinalizationRegistry),
                    $h‍_once.Float32Array(Float32Array),
                    $h‍_once.JSON(JSON),
                    $h‍_once.Map(Map),
                    $h‍_once.Math(Math),
                    $h‍_once.Number(Number),`
					}}
				/>
			</div>
		</>
	)
}
