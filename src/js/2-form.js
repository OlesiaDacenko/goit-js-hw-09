const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

//  збереження введених даних
let formData = {
  email: '',
  message: '',
};
// Використовуй метод делегування для відстеження змін у формі через подію input.
// Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт
// у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
});
// При завантаженні сторінки перевір, чи є дані у локальному сховищі.
// Якщо так, використовуй їх для заповнення форми та об'єкта formData.
// Якщо ні, залиш поля форми порожніми.
const basket = localStorage.getItem(LOCAL_STORAGE_KEY);
if (basket) {
  formData = JSON.parse(basket);
  form.email.value = formData.email || '';
  form.message.value = formData.message || '';
} else {
  form.email.value = '';
  form.message.value = '';
}
// Перед відправленням форми переконайся, що обидва поля форми заповнені.
// Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй
// сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені,
//  виведи у консоль об’єкт formData з актуальними значеннями, очисти
//  локальне сховище, об’єкт formData і поля форми.
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.email.value || !form.message.value) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
  formData = {
    email: '',
    message: '',
  };
});
