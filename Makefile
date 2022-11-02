DEV_COMPOSE = docker-compose -f docker-compose.yml

start-dev:
	$(DEV_COMPOSE) build
	# $(DEV_COMPOSE) pull
	$(DEV_COMPOSE) up

