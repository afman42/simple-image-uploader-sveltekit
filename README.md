Svelte Store Custom: https://svelte.dev/repl/2254c3b9b9ba4eeda05d81d2816f6276?version=4.2.12

Upload file: https://www.sinasafari.com/blog/upload-file-in-sveltekit

Sveltekit Adapter Node: https://kit.svelte.dev/docs/adapter-node

Challenge: https://devchallenges.io/challenge/image-upload-app

## User Stories

- [x] Create a simple image upload application following the given design.
- [x] Users can upload an image at a time. The file should be JPG, PNG, or GIF. The maximum size is 2MB.
- [x] Users can drag and drop the file to upload it.
- [x] Users can browse files and select a file to upload.
- [x] When the image is uploading, users can see a loader like in the design.
- [x] When the image is successfully uploaded, users can see the image.
- [x] After the image is uploaded, users can copy its address by selecting the `Share` button
- [x] After the image is uploaded, users can download the image by selecting the `Download` button
- [x] Optionally, users change theme between dark and light.
- [] Deploy the solution and submit Repository URL and Demo URL.

# Prod

- Adapter Node: ORIGIN=http://0.0.0.0:8009 BODY_SIZE_LIMIT=2048000 node build/index.js

