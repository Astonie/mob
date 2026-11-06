FROM php:8.4-fpm-alpine AS base

RUN apk add --no-cache \
    icu-dev libzip-dev postgresql-dev libpng-dev libjpeg-turbo-dev freetype-dev \
    oniguruma-dev bash curl git supervisor nginx

# OPcache tuning for production.
COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) pdo pdo_pgsql pgsql zip intl gd opcache bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-scripts --optimize-autoloader --ignore-platform-reqs || true

COPY . .

RUN rm -f vendor/composer/platform_check.php \
 && sed -i '/platform_check/d' vendor/composer/autoload_real.php \
 && mkdir -p storage/framework/{sessions,views,cache} storage/logs storage/app/{public,private} bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache \
 && php artisan storage:link || true

# Production web stack: nginx serving public/, php-fpm, managed by supervisord.
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 8000

# Production command. docker-compose overrides this for local dev (php artisan serve).
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
