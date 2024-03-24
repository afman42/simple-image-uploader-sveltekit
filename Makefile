run/prod:
	@echo "Build Image"
	docker build -t node_app_image .;
	@echo "Run Container"
	docker run --name node_app -p 127.0.0.1:8089:8009 node_app_image;
	@echo "Finish"

deploy:
	@echo "Deploy"
	rsync -av -e 'ssh -i ~/.ssh/id_ed_llubuntu' static src drizzle .dockerignore .gitignore .npmrc .prettierignore .prettierc Dockerfile drizzle.config.ts Makefile package-lock.json package.json postcss.config.js svelte.config.js tailwind.config.js tsconfig.json vite.config.ts root@just-wrapper.my.id:~/simple-image-upload;
	@echo "Finish"

