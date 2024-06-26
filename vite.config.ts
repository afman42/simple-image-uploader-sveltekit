import { sveltekit } from '@sveltejs/kit/vite';
// import { searchForWorkspaceRoot } from 'vite';
import { defineConfig } from 'vitest/config';
import { myVitePlugin } from './my-vite-plugin';
const mode = process.env.NODE_ENV;

export default defineConfig({
	plugins: [sveltekit(), myVitePlugin()],
	// server: {
	// 	fs: {
	// 		allow: [searchForWorkspaceRoot(process.cwd()), '/static/img/']
	// 	}
	// },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	base: mode == 'development' ? '/' : '/basepath/'
});
