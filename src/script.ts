import luhnCheck from './luhncheck.ts';

// HTML ELEMENTS
const nameInput: HTMLInputElement | null = document.getElementById(
  'name'
) as HTMLInputElement | null;
const emailInput: HTMLInputElement | null = document.getElementById(
  'email'
) as HTMLInputElement | null;
const cardNumberInput: HTMLInputElement | null = document.getElementById(
  'card-number'
) as HTMLInputElement | null;

const form: HTMLFormElement | null = document.querySelector('form');

// ARRAYS
const inputArray: Array<HTMLInputElement | null> = [
  nameInput,
  emailInput,
  cardNumberInput,
];

// the Email regex is copied from https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
const regexArray: Array<RegExp> = [
  /^[A-Za-z!#$%&'*+\-\/=?^_`{|}~\s]*$/,
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
  /^\d{16}$/,
];

let isValidArray: Array<boolean> = [false, false, false];

const changeInputColour = (
  input: HTMLInputElement | null,
  isCorrect: boolean
) => {
  if (!input) {
    alert('ERROR: Input not provided');
    return;
  }
  input.style.backgroundColor = isCorrect ? 'green' : 'var(--DN_Pink)';
};

function validateInput(e: FocusEvent, index: number) {
  const input = e.target as HTMLInputElement;
  const inputValue = input.value;
  const regex = regexArray[index];

  if (index === 2) {
    isValidArray[index] = regex.test(inputValue) && luhnCheck(inputValue);
  } else {
    isValidArray[index] = regex.test(inputValue);
  }

  changeInputColour(inputArray[index], isValidArray[index]);
}

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const dataTypes = ['name', 'email address', 'card number'];

  for (let i = 0; i < 3; i++) {
    if (!isValidArray[i]) {
      alert(`Please enter a valid ${dataTypes[i]}`);
      return;
    }
  }

  alert('Data entered successfully!');
};

nameInput?.addEventListener('focusout', (e) => validateInput(e, 0));
emailInput?.addEventListener('focusout', (e) => validateInput(e, 1));
cardNumberInput?.addEventListener('focusout', (e) => validateInput(e, 2));

form?.addEventListener('submit', handleSubmit);
