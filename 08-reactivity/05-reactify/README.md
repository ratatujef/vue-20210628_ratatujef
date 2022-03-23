# reactify

👷🏻 _Задача нормальной сложности_\
📚 _Закрепление материала_

<!--start_statement-->

Требуется реализовать функцию высшего порядка `reactify`, которая делает обычные функции "реактивными".

Обычная функция принимает на вход некоторые значения и возвращает результат некоторого вычисления.

"Реактивная функция" может принимать на вход `ref-ы`, а возвращает вычисляемое значение `computed` с результатом
вычисления.

```javascript
// Пример

const sum = (a, b) => a + b;
const reactiveSum = reactify(sum);

const a = ref(0);
const b = ref(0);
const sumAB = reactiveSum(a, b);
// или
const sumAB2 = reactify(sum)(a, b);

// Передача не реактивных значений также должна работать
const sumAB3 = reactify(sum)(a, 10);

// При изменении значений a или b должно изменяться и значение в sumAB, sumAB2, sumAB3
// sumAB.value === 0
// sumAB2.value === 0
// sumAB3.value === 10
```

<img src="https://i.imgur.com/7oRrkcP.gif" alt="Example" />

<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `utils/reactify.js`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/08-reactivity/05-reactify](http://localhost:8080/08-reactivity/05-reactify).

✅ Доступно автоматическое тестирование: `npm test reactify`.
