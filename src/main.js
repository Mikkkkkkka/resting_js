import { HandleResponse, HandleDynamicResponse } from './handle_response.js';


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
}
else {
    let http_request = "https://www.cbr.ru/scripts/XML_daily_eng.asp?"

    http_request += request.Date
        ? `date_req=${request.Date.replaceAll('.', '/')}`
        : "";

    fetch(http_request)
        .then(response => response
            .body
            .getReader()
            .read())
        .then(HandleResponse(request));
}


// https://www.cbr.ru/scripts/XML_daily_eng.asp?

// node .\main.js --Vname=USD --Vnom=10 --Date=01.01.2024

// https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/01/2024&date_req2=01/05/2024$VAL_NM_RQ=R01215
// https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=01/01/2024&date_req2=01/05/2024