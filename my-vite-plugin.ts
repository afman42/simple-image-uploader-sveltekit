import express from 'express';
const assets = express.static('static');
//@ts-ignore
const configureServer = (server) => {
	server.middlewares.use(assets);
};
export const myVitePlugin = () => ({
	name: 'my-vite-plugin',
	configureServer,
	configurePreviewServer: configureServer
});
