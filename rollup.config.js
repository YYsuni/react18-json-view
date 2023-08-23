import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'

const plugins = [
	external(),
	url(),
	svgr({ dimensions: false }),
	typescript({ useTsconfigDeclarationDir: true }),
	nodeResolve(),
	commonjs()
]

/** @type {import('rollup').InputOption} */
export default {
	input: ['src/index.tsx'],
	output: [
		{
			dir: 'dist/cjs',
			format: 'cjs',
			sourcemap: true,
			entryFileNames: '[name].cjs',
			chunkFileNames: '[name]-[hash].cjs'
		},
		{
			dir: 'dist/es',
			format: 'es',
			sourcemap: true,
			entryFileNames: '[name].mjs',
			chunkFileNames: '[name]-[hash].mjs'
		}
	],
	plugins
}
