
const form = document.querySelector("form");
const from = document.getElementById("from");
const amount = document.getElementById("amount");
const to = document.getElementById("to");
const rates = document.getElementById("rate");
const currencies = document.querySelectorAll("select");


// get available currencies
const availableCurrencies= async() => {
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '163eda3793msh03f2a233f335058p12124cjsn8e78e5ff88c9',
		'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};
    const response =  await fetch(url, options);
    const result = await response.json();
    return result;
}

//convert from one currency to another
const getAnotherCurrency = async(from, to, amount) => {
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`;
    const options = {
	headers: {
		'X-RapidAPI-Key': '163eda3793msh03f2a233f335058p12124cjsn8e78e5ff88c9',
		'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

//get available currencies
availableCurrencies()
    .then(data => {
        for(let currencyCode in data.symbols){
            updateAvailableCurrencies(currencyCode)
        }
    })
    .catch(error => console.log(error));

//updating the UI with available currencies
const updateAvailableCurrencies = (currency) =>  {
     const newCurrency = `
    <formv >
    <div>
         <option value="${currency}">${currency}</option>
    </div>
    <div>
         <option value="${currency}" id="currencies">${currency}</option>
    </div>
    </formv>
    `;
    currencies.forEach(item => item.innerHTML += newCurrency);
}

//updating the UI with the rate
updateRate = (rate) => {
     const newRate = `
     <p class="rate" id="rate">${rate}</p>
    `;
    rates.innerHTML = newRate;
}

const getCurrency = (event) => {
    event.preventDefault();
    const from = form.from.value;
    const amount = form.amount.value;
    const to = form.to.value;
    if ((from.value = "") && (to.value = "")){
        alert("from currency or tocurrency is empty");
        return false;
    } else {
        getAnotherCurrency(from, to, amount)
        .then(data => updateRate(data.result))
        .catch(error => console.log(error));
        return true;
    }
    
}
form.addEventListener("keyup", getCurrency);






