# Установка и запуск приложения

## Запуск дев сервера
> yarn install && yarn start

Сайт будет доступен по адресу http://localhost:3000
## Продуктивная сборка
> yarn install && yarn build

В папке ./build будут собраны js файлы, пригодные для хоста на вэб сервере

## Docker образ

В проекте настроил сборку Docker Image с встроенным билдом этого приложения. Внутри хостинга сайт хостится на ngnix на 80 порту

> docker build -t uppitss_mapdemo_image .

>docker run -dt -p 81:80 --name uppitss_mapdemo_container uppitss_mapdemo_image

Открыть браузер http://localhost:81

Протестировав в Docker я уверен, что все зависимости собраны правильно и проект работает.

# О приложении
## Важно!
> Не стреляйте в пианиста, он играет, как умеет! (из какого - то х.ф. про ковбоев)

Сразу подсвечиваю некоторые моменты :
 
- У меня было очень мало времени. Я не мог позволить себе тратить на это больше 1,5 часа в день. И то не каждый день. Нехватка времени это мои личные проблемы, но пришлось сделать не все, что я планировал. Однако, считаю, что цель выполнена на 95%. Остальное украшалки и мелочи. Суть можно увидеть.
- Я, в принципе с самого начала сказал, что Redux владею +-, а Redux Saga не владею вообще. В целом в данном случае
мне так и не хватило времени разобраться в Saga. Примерное понимание, что это есть, но лепить в код то, чем не владеешь
хотя бы немного не в моих правилах. Поэтому саги тут нет! 
- Я использовал компоненты дизайн системы ant.design в виде списка, но осознанно ушел от Table. По моему опыту (а он есть!) это
очень неудобный и сырой и, главное, багованный, компонент. У него просто чрезмерно перегружен API. Я почти уверен, что этот "несчастный" компонент у них ходил от разработчика к разработчику по наследству.
Вообще при погружении в Ant design видно, что их делали разные люди/команды и они иногда даже нарушали основные принципы пропертис и прочее. Это плохо. 
- Поэтому я сделал свой кастомный компонент таблицы. Не стал делать на флексах, а сделал именно таблицей. Этого в данном примере достаточно. Зачем усложнять?
При разработке компонента я продемонстрировал, что умею Generics. Реализовал ровно тот минимум, что был в задании, но оставил перспективу на развитие компонента. Его можно сделать отличным при желании. Я, например, добавил генерацию футера, но уже не успел чем - то наполнить и т.д.
- Карта! Точки ставлю, соединяю их прямой линией. Не стал подгружать сервис для получения промежуточных координат и построения полилинии. Смог нарисовать одну - смогу и множество.
Ключевое - я просто не знаю таких сервисов. Компонент, к сожалению пришлось делать "в лоб". Я обещал отдать сервис к сроку и на нормальные обертки карты не было времени.

## Мокинг

Я реализовал фабрику, которая генерирует моковые данные. Сознательно в интерфейсы не вкладывал возможность переключения режимов мокинг/бэкенд.
В рамках демоверсии не было такой цели, и значит, интерфейсы не было смысла усложнять. 

## Тестирование

Я стараюсь идти от технологии TDD в идеале, но текущий проект это в чистом виде RnD для меня. Т.к. и Redux и Карты - новые темы.
В рамках RnD разработка через тесты не продуктивна (имхо).
Я охватил только фабрику всего двумя тестами. В разработке компонента не вставлял айдишники в ключевые места и, поэтому, отрендерить и сделать функциональные тесты в данной реализации трудно.


## Проблема изменения точки в выбранной накладной
Тут хочу подсветить. Я сравнивал выбранную накладную через проперти selectedBill в редюсере.
Сравнивал в своем кастомном компоненте таблицы по совпадению ссылки в куче на объекты. Это красиво!
Но! Наш объект содержит другой объект (точки доставки). В С# я бы их сделал структурами и горя бы не знал, но в js так не получится.
Поэтому пришлось городить огород. В момент присвоения новой точки я внутри мэппинга ловил выделенную строку и принудительно обновлял ее (deepclone).
Иначе редюсер не перерисовывал компонент. 
Почти уверен, что есть способы элегантнее, но с наскоку я их не нашел.
>./src/features/bills/billsSlice строка 50
 
## Еще раз про таблицу Ant.Design
Тут два способа решения:
- Первый - внедрить CSS проперти в описание столбца и ограничить это так. Но это антипаттерн при той огромной API таблицы
- Есть второй (работающий) способ https://codesandbox.io/s/minwidthresizable-cp25n?file=/index.js:1719 
Он сработает, если я буду тягать полоску разделитель, но не сработает при смене размера окна. 

Вся таблица от анта - одно большое недоразумение. Тут реально проще сделать свое. 

## СSS
Его тут почти нет! Ну как, почти. Флажок украины я убрал - значит умею в CSS.
Не внедрял его сознательно. Если уж умеешь хорошо кодить, то со стилями уж как - то да разберешься.

P.S. Мне интересна обратная связь в любом случае. Спасибо за чтение.
