# ------------------ PNPM commands ------------------
.PHONY: clean format format-check install update run scan build start
clean:
	@pnpm cache delete
format:
	@pnpm exec prettier . --write
format-check:
	@pnpm exec prettier . --check
install:
	@pnpm install
update:
	@pnpm up --latest
run:
	@pnpm dev
scan:
	@pnpm audit
build:
	@pnpm build
start:
	@pnpm start

# ------------------ Docker commands ------------------
.PHONY: docker-template
docker-template:
	@docker compose up --build --no-deps -d template
