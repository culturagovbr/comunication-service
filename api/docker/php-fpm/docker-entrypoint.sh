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

    sed -i "s/@@APP_ENV@@/$APP_ENV/g" /application/.env
    sed -i "s/@@APP_DEBUG@@/$APP_DEBUG/g" /application/.env
    sed -i "s/@@APP_KEY@@/$APP_KEY/g" /application/.env
    sed -i "s/@@APP_TIMEZONE@@/$APP_TIMEZONE/g" /application/.env
    sed -i "s/@@LOG_CHANNEL@@/$LOG_CHANNEL/g" /application/.env
    sed -i "s/@@LOG_SLACK_WEBHOOK_URL@@/$LOG_SLACK_WEBHOOK_URL/g" /application/.env
    sed -i "s/@@DB_CONNECTION@@/$DB_CONNECTION/g" /application/.env
    sed -i "s/@@DB_HOST@@/$DB_HOST/g" /application/.env
    sed -i "s/@@DB_PORT@@/$DB_PORT/g" /application/.env
    sed -i "s/@@DB_DATABASE@@/$DB_DATABASE/g" /application/.env
    sed -i "s/@@DB_USERNAME@@/$DB_USERNAME/g" /application/.env
    sed -i "s/@@DB_PASSWORD@@/$DB_PASSWORD/g" /application/.env
    sed -i "s/@@CACHE_DRIVER@@/$CACHE_DRIVER/g" /application/.env
    sed -i "s/@@QUEUE_DRIVER@@/$QUEUE_DRIVER/g" /application/.env
    sed -i "s/@@JWT_SECRET@@/$JWT_SECRET/g" /application/.env
    sed -i "s/@@MAIL_DRIVER@@/$MAIL_DRIVER/g" /application/.env
    sed -i "s/@@MAIL_HOST@@/$MAIL_HOST/g" /application/.env
    sed -i "s/@@MAIL_PORT@@/$MAIL_PORT/g" /application/.env
    sed -i "s/@@MAIL_USERNAME@@/$MAIL_USERNAME/g" /application/.env
    sed -i "s/@@MAIL_PASSWORD@@/$MAIL_PASSWORD/g" /application/.env
    sed -i "s/@@MAIL_ENCRYPTION@@/$MAIL_ENCRYPTION/g" /application/.env
    sed -i "s/@@MAIL_FROM_ADDRESS@@/$MAIL_FROM_ADDRESS/g" /application/.env
    sed -i "s/@@MAIL_FROM_NAME@@/$MAIL_FROM_NAME/g" /application/.env
fi

echo "[ ****************** ] Ending Endpoint of Application"

php artisan migrate && php artisan db:seed

if [ "$USE_PHP_FPM" == "true" ]; then
    set -- php-fpm
fi

exec "$@"
