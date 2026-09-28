FROM php:8.4-fpm-alpine AS base

RUN apk add --no-cache \
    icu-dev libzip-dev postgresql-dev libpng-dev libjpeg-turbo-dev freetype-dev \
    oniguruma-dev bash curl git supervisor nginx

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) pdo pdo_pgsql pgsql zip intl gd opcache bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-scripts --optimize-autoloader --ignore-platform-reqs || true

COPY . .

RUN rm -f vendor/composer/platform_check.php \
 && sed -i '/platform_check/d' vendor/composer/autoload_real.php \
 && mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache && true

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
