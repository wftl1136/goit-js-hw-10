const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.elements.email;
const messageInput = feedbackForm.elements.message;
const localStorageKey = 'feedback-form-state';
const maxCount = 400;
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const errorMessage = document.getElementById('email-error');
const chek = document.querySelector('.chek');
const countNumber = document.getElementById('countNumber');
const messageCounter = document.querySelector('.message-counter');
const stopRegex = /[^a-zA-Z0-9._@-]/;

let formData = {
  email: '',
  message: '',
};

// Парсимо локальне сховище з потрібним нам ключем і витягуєм з нього дані в FormData
const savedData = JSON.parse(localStorage.getItem(localStorageKey)) || {};
formData = {
  email: savedData.email || '',
  message: savedData.message || '',
};
//console.log('🚀 ~ formData:', formData);

// заповнюємо дані полів вводу
emailInput.value = formData.email;
messageInput.value = formData.message;
if (emailInput.value) {
  validateEmail(emailInput);
}

if (messageInput.value) {
  counterNumber(messageInput);
}

//Додаємо слухача на input і використовуючи делегування вішаєм його на форму
feedbackForm.addEventListener('input', saveToLocalStr);

function saveToLocalStr(event) {
  // записуємо значення інпут в formData, перед записом позбуваємося лишніх знаків табуляції(пробіл і ентер)
  validateEmail(emailInput);
  counterNumber(messageInput);
  formData[event.target.name] = event.target.value.trim();
  console.log("🚀 ~ saveToLocalStr ~ formData:", formData)
  

  // записуємо значення formData локальне сховище
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

// Додаємо слухача на кнопку submit, перевірку на пусті поля, якщо все ок: виводимо дані в консоль і все очищуємо
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    return alert('Fill please all fields');
  }
  console.log('formData:', formData);
  localStorage.removeItem(localStorageKey);
  formData.email = '';
  formData.message = '';
  feedbackForm.reset();
  counterNumber(messageInput);
  countNumber.textContent = `0/${maxCount}`;
    messageCounter.classList.add('hidden');
    chek.classList.add('hidden');
});



// проводимо валідацію введеного емайл
function validateEmail(emailInput) {
  //console.log("🚀 ~ validateEmail ~ FirstemailInput.value:", emailInput.value)
  let email = emailInput.value;
    // додаємо заборону вводу кирилецею. та знаків табуляції
    
 // emailInput.value = emailInput.value.replace(stopRegex, '');
 // console.log("🚀 replaseInputValue ~ replaseeEmailInput.value:", emailInput.value)
 
    //попередній метод не підійшов, браузер автоматично міняв в домені  перший символ кирилиці в Punycode;
    //Використовуєм подію beforeinput
    emailInput.addEventListener('beforeinput', (event) => {
    const inputChar = event.data;
    if (stopRegex.test(inputChar)) {
        event.preventDefault();
    }
});

    
    if (stopRegex.test(email)) {
    chek.classList.add('hidden');
    errorMessage.classList.add('error-message');
    errorMessage.textContent =
          '❗ Будь ласка не використовуйте кирилицю чи табуляцію при вводі!';
      
    return;
  }
  if (!email) {
    emailInput.classList.remove('error');
    errorMessage.classList.remove('error-message');
    errorMessage.textContent = '';
      return;
  }
  if (!regex.test(email)) {
    console.log('🚀 ~ validateEmail ~ !regex.test(email):', !regex.test(email));
    chek.classList.add('hidden');
    emailInput.classList.add('error');
    errorMessage.classList.add('error-message');
    errorMessage.textContent =
      '❗ Некорректний або неповний email! Перевірте правильність вводу!';
  } else {
    emailInput.classList.remove('error');
    errorMessage.classList.remove('error-message');
    errorMessage.textContent = '';
    chek.classList.remove('hidden');
    
  }
}

// підраховуємо кількість симолів і виводимо інфо
function counterNumber(messageInput) {
  const message = messageInput.value;
  const currentLength = message.length;
  countNumber.textContent = `${currentLength}/${maxCount}`;
  const avalibleLength = maxCount - currentLength;
  if (currentLength > maxCount * 0.9) {
    messageCounter.classList.remove('hidden');

    if (currentLength >= maxCount) {
      messageCounter.innerHTML = `❗ Ви досягли ліміту в ${maxCount} символів. Якщо маєте додаткові пропозиції, надішліть їх на  
   <a href="mailto:info@goit.ua">info@goit.ua</a>.`;
      messageCounter.style.bottom = '0';
    } else {
      messageCounter.textContent = `⚠ У Вас залишилося доступних ${avalibleLength} символів`;
      messageCounter.style.bottom = '16px';
    }
  } else {
    messageCounter.classList.add('hidden');
  }
}

//забороняємо набір тексту, коли досягнуто макимальнох кількості тексту
feedbackForm.addEventListener('keydown', stopInputMsg);

function stopInputMsg(event) {
  console.log(
    '🚀 ~ stopInputMsg ~ event.target.tagName:',
    event.target.tagName
  );
  if (event.target.tagName.toLowerCase() !== 'textarea') {
    return;
  }
  if (
    event.target.value.length >= maxCount &&
    event.key !== 'Delete' &&
    event.code !== 'Backspace' &&
    event.code !== 'ArrowRight' &&
    event.code !== 'ArrowLeft' &&
    event.code !== 'ArrowUp' &&
    event.code !== 'ArrowDown'
  ) {
    event.preventDefault();
  }
}

//Дозоляємо вставку тільки тексту з доступною кількістю символів
messageInput.addEventListener('paste', cutPaste);

function cutPaste(event) {
  event.preventDefault();
  const message = event.target.value;
  const availableLength = maxCount - message.length;
  const pasteText = event.clipboardData.getData('text');
  const cutPasteMessage = pasteText.substring(0, availableLength);
  event.target.value = message + cutPasteMessage;
  counterNumber(event.target);
  saveToLocalStr(event);
}
