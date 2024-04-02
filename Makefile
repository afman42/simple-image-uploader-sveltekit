run/prod:
	@echo "Run Docker"
	docker compose up -d --build --force-recreate app_simple_upload;
	@echo "Finish"

deploy:
	@echo "Deploy"
	rsync -av -e 'ssh -i ~/.ssh/id_ed_llubuntu' static src drizzle .dockerignore .gitignore .npmrc Dockerfile drizzle.config.ts Makefile package-lock.json package.json postcss.config.js svelte.config.js tailwind.config.js tsconfig.json vite.config.ts docker-compose.yml my-vite-plugin.ts root@just-wrapper.my.id:~/simple-image-upload;
	@echo "Finish"

