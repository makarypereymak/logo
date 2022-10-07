const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let formIsValid = true;
  const formElements = document.getElementsByClassName('form__element');

  for (let i = 0; i <= formElements.length - 1; i++) {
    if (formElements[i].className !== 'form__input form__element form__input--comment' &&
    formElements[i].className !== 'selectCustom js-selectCustom form__element' &&
    formElements[i].value === "") {
      formIsValid = false;
      formElements[i].classList.add('form__input--invalid');
    }
  }

  const selectCustomTrigger = document.getElementsByClassName('selectCustom-trigger')[0];

  if (selectCustomTrigger.textContent === 'Тип упаковки') {
    formIsValid = false;
    selectCustomTrigger.className = 'selectCustom-trigger selectCustom-trigger--invalid';
  }

  if (formIsValid) {
    const formData = new FormData(form);

    for (let key of formData.keys()) {
      console.log(`${key}: ${formData.get(key)}`);
    }

    event.target.reset();
    selectCustomTrigger.textContent = 'Тип упаковки';
    selectCustomTrigger.classList.remove('selectCustom-trigger--active');
    const activeOption = document.getElementsByClassName('isActive')[0];
    activeOption.classList.remove('isActive');

    const invalidInputs = document.querySelectorAll('.form__input--invalid');

    if (invalidInputs[0]) {
      for (let i = 0; i <= invalidInputs.length - 1; i++) {
        invalidInputs[i].classList.remove('form__input--invalid');
      }
    }

    const invalidSelector = document.getElementsByClassName('selectCustom-trigger--invalid')[0];

    if (invalidSelector) {
      invalidSelector.classList.remove('selectCustom-trigger--invalid');
    }
  }
})

const btnsMinus = document.getElementsByClassName('products__item-button--minus');
const btnsPlus = document.getElementsByClassName('products__item-button--plus');
const inputs = document.getElementsByClassName('products__item-input-counter');

for (let i = 0; i <= btnsMinus.length - 1; i++) {
  btnsMinus[i].addEventListener('click', () => {
    inputs[i].value -= 1;
  })

  btnsPlus[i].addEventListener('click', () => {
    inputs[i].value = Number(inputs[i].value) + 1;
  })
}

