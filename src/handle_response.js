import { XMLValidator, XMLParser } from 'fast-xml-parser';

export function HandleResponse(request) {
    return data => innerHandleResponse(request, data);
}

function innerHandleResponse(request, data) {

    const xml = String.fromCharCode(...data.value);

    const date_begin = xml.indexOf("ValCurs Date=\"") + 14;
    const response_date = xml.slice(date_begin, date_begin + 10);


    if (!XMLValidator.validate(xml)) {
        console.log("Received invalid XML");
        return;
    }

    const parser = new XMLParser();
    const json = parser.parse(xml);

    const currencies = json.ValCurs.Valute;

    const target = currencies.find(currency => currency.CharCode === request.Vname);

    console.log(`${target.CharCode} ${target.Nominal} ${response_date} ${target.Value}`);
}
