# Проектная работа 12: Проект Mesto на Реакте с авторизацией и регистрацией (https://ageevdmitryminsk.github.io/react-mesto-auth/)
## react-mesto-auth

#### Исполнитель                                  *Агеев Дмитрий* 

<p align="center"><img src="https://avatars.githubusercontent.com/u/51228454?v=4" width="200" alt="Агеев Дмитрий"></p>


## Обзор ПР №12

В этой проектной работе начал портировать проект Mesto на «Реакт». Сайт будет представлять собой 12ую проектную работу в рамках курса "Яндекс.Практикума" по веб-разработке, 
когорта 24. Это учебный проект, в котором сверстана страница профиля сервиса по публикации фотографий из путешествий, добавлена авторизация и регистрация.
На странице присутствует информация о пользователе (фото профиля, имя, небольшая информация) и грид из фотографий. 
Предусматривается возможность добавить новую фотографию, удалить фотографию, просмотреть фотографию фулвью, поставить лайк, отредактировать аватарку и имя пользователя.

<p align="center"><img src="https://static.wixstatic.com/media/99aa7a_b88b44e0b60b492eac1f7c72f9f836a6~mv2.gif" width="200" alt="Спиннер"></p>

В рамках текущей учебной работы разработана связь сервиса c cервером по API. 
Изменения, сделанные в браузере, сохраняются на сервере (лайки, добавленные фотографии, информация о пользователе). 
При изначальной загрузке страницы рендерится массив фотографий с сервера. Добавлен лоудер на момент сабмита данных на сервер.

Использованные технологии:
React
JS, popup
flexbox, grid
медиазапросы
верстка по figma
верстка по адаптивному макету
организация файлов по БЭМ методологии
внедрение TEMPLATE-элементов в Html для работы с шаблоном ввода карточек и повышения безопасности сайти при работе с введением запросов клиентов через input
добавление и удаление карточек, а также лайков пользователем сайта самостоятельно, реализовано через функции JavaScript
плавное открытие и закрытие попапов с использованием visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.5s linear; visibility: visible; opacity: 1;
разработана валидацию всех форм API-свойством validity.valid - проверка валидности формы на стороне клиента
улучшен UX при работе с попапами.
инициализация npm и настройка Webpack
настроил сборку Вебпаком)
Figma

Ссылка на макет в Figma
Картинки

Фотографии брал не из макета FIGMA, а с сайта https://unsplash.com — это коллекция бесплатных фотографий, которые можно использовать, не беспокоясь об авторских правах.

также не забыл оптимизировать картинки, чтобы сайт загружался быстрее.
[Посмотрите мой деплой-проект MESTO на GitHub Pages.] (https://ageevdmitryminsk.github.io/mesto/index.html)

2022 ЯндексПрактикум рулит) 🏎
Чем большим числом программ вы владеете, тем проще вольётесь в любой проект.

Original /mesto single page demo ported to React.

Developed under the Practicum online bootcamp with the following stack implementation:

JavaScript, React, Hook useState, useEffect, useHistory, CurrentUserContext, localStorage, etc.
