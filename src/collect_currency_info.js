import { XMLValidator, XMLParser } from 'fast-xml-parser';


export function ParseCurrencyData(data) {

    const xml = String.fromCharCode(...data.value);

    const date_begin = xml.indexOf("ValCurs Date=\"") + 14;
    const response_date = xml.slice(date_begin, date_begin + 10);

    if (!XMLValidator.validate(xml)) {
        console.log("Received invalid XML");
        return undefined;
    }

    const parser = new XMLParser();
    let json = parser.parse(xml)
    json.Date = response_date;

    return json;
}
