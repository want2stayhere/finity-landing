# Finity-landing
Project on Gulp with Pug, Stylus, autoprefixer, browser-sync and other

Установка
-------

- Откройте папку проекта в терминале и выполните

```
npm install
```

- Для запуска проекта выполните:
```
gulp
```


Основные команды
-------------
```gulp``` - Компилирует все pug и  stylus файлы, прописывает все пути для плагинов которые были установлены через bower (пути для css файлов и js файлов), форматирует html код,  запускает сервер для авторефреша страниц при изменениях.

```gulp compile``` - компилирует все stylus и pug файлы, добавляет автопрефиксы для css стилей, создает sourcemap, делает рефреш для браузера.

```gulp build``` - сначала компилирует все, потом собирает весь проект в папке "dist",  сохраняя только нужные файлы css и js, при этом происходит их конкатенация. Все файлы минифицируются. После этого вся папка dist архивируется, архив записывается в корневую папку проекта.
