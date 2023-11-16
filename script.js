const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two= document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const token = '56384b05f6d94ea2bac0c911'; // Obviously not good to make this public but it's a free one so I'm taking a gamble that this doesn't matter
  // fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) <- Brad Traversey version that doesn't need a token, not sure how long still valid)
  fetch(`https://v6.exchangerate-api.com/v6/${token}/latest/${currency_one}`) 
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    const rate = data.conversion_rates[currency_two];
    console.log(rate);

    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
  });
};

// Event listeners
currencyEl_one.addEventListener('change', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  // const temp2 = amountEl_one.value;
  // amountEl_one.value = amountEl_two.value;
  // amountEl_two.value = temp2;
  calculate();
})

calculate();