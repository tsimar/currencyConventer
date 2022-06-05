const input = document.querySelector("#in-money");
const res1 = document.createElement("p");
res1.classList.add("converter-total");
const div = document.querySelector(".convert-container");
let date = new Date();

function checkInMoney(money) {
  console.log(typeof money);
  if (isNaN(money)) {
    input.value = 0;
    return 0;
  } else if (money < 0) {
    return money * -1;
  }
  return money;
}

function convert(url) {
  fetch(url)
    .then((res) => res.json())
    .then((out) => {
      let formatNumber = (
        out.rates[0].ask * checkInMoney(parseFloat(input.value))
      ).toFixed(2);
      res1.textContent = "to  " + formatNumber + " PLN";
      console.log(res1.textContent);
      div.appendChild(res1);
    })
    .catch((err) => console.error(err));
}

const btn = document.querySelector("#btn");
const sb = document.querySelector("#currency");
function addZero(date) {
  if (date < 10) {
    return (date = "0" + date);
  }
  return date;
}

btn.onclick = (event) => {
  event.preventDefault();
  let day = date.getDate();
  let month = addZero(date.getMonth() + 1);
  if (date.getDay() === 0) {
    day = day - 2;
  } else if (date.getDay() === 6) {
    day = day - 1;
  }
  day = addZero(day);
  let dateByConvert = date.getFullYear() + "-" + month + "-" + day;

  let url = `http://api.nbp.pl/api/exchangerates/rates/c/${sb.value}/${dateByConvert}/?format=json`;
  convert(url);
};
