import { ParseCurrencyData, } from './collect_currency_info.js';


const argv = process.argv;
let request = {};

for (let i = 2; i < argv.length; i++) {
    const eq = argv[i].search('=');
    if (!argv[i].startsWith("--") || eq === -1)
        continue;
    request[argv[i].slice(2, eq)] = argv[i].slice(eq + 1);
}

if (!request.Vname) {
    console.log("Error: Vname argument is mandatory");
    process.exit();
}

if (request.DateDate !== undefined) {
    [request.Date1, request.Date2] = request
        .DateDate
        .replace('.', '/')
        .split('-');

    console.log("Not implemented yet!"); // TODO: handle dynamic
    process.exit();
}

let http_request = "https://www.cbr.ru/scripts/XML_daily_eng.asp?"

http_request += request.Date
    ? `date_req=${request.Date.replaceAll('.', '/')}`
    : "";

console.log(http_request);

const currencies = await fetch(http_request)
    .then(response => response
        .body
        .getReader()
        .read())
    .then(ParseCurrencyData);

if (currencies.ValCurs === 'Error in parameters') {
    console.log(currencies.ValCurs);
    process.exit();
}

const target = currencies
    .ValCurs
    .Valute
    .find(currency => currency.CharCode === request.Vname);

target.Nominal = request.Vnom ?? target.Nominal;
target.VunitRate = Number(target
    .VunitRate
    .replace(',', '.'));

console.log(`${target.CharCode} ${target.Nominal} ${request.Date ?? currencies.Date} ${target.Nominal * target.VunitRate}`);


// https://www.cbr.ru/scripts/XML_daily_eng.asp?
// https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/01/2024&date_req2=01/05/2024&VAL_NM_RQ=R01215