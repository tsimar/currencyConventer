const inp = document.querySelector("#inp");
const res1 = document.createElement("p");
let date = new Date();

function convert(ur) {
  fetch(ur)
    .then((res) => res.json())
    .then((out) => {
      res1.textContent = out.rates[0].ask * parseFloat(inp.value);
      console.log(res1.textContent);
      document.body.appendChild(res1);
    })
    .catch((err) => console.error(err));
}

const btn = document.querySelector("#btn");
const sb = document.querySelector("#framework");
function plusZero(date) {
  if (date < 10) {
    return (date = "0" + date);
  }
  return date;
}

btn.onclick = (event) => {
  event.preventDefault();
  let day = date.getDate();
  let month = plusZero(date.getMonth() + 1);
  if (date.getDay() === 0) {
    day = day - 2;
  } else if (date.getDay() === 6) {
    day = day - 1;
  }
  day = plusZero(day);
  let dateByConvert = date.getFullYear() + "-" + month + "-" + day;

  let ur = `http://api.nbp.pl/api/exchangerates/rates/c/${sb.value}/${dateByConvert}/?format=json`;
  convert(ur);
};
