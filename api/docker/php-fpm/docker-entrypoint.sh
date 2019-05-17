#!/bin/bash
set -e

echo "[ ****************** ] Starting Endpoint of Application"

if [ "$UPDATE_COMPOSER_DEPENDENCIES" == "true" ]; then
	echo "[ ****************** ] Updating composer dependencies."
    composer update --prefer-source --no-interaction
fi

if  ! [ -e "/application/.env" ] && [ -e "/application/.env.example" ] ; then
    echo "[ ****************** ] Copying sample application configuration to real one"
    cp /application/.env.example /application/.env
fi

echo "[ ****************** ] Ending Endpoint of Application"

php artisan migrate && php artisan db:seed

if [ "$USE_PHP_FPM" == "true" ]; then
    set -- php-fpm
fi

exec "$@"
