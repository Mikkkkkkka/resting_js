import { XMLValidator, XMLParser } from 'fast-xml-parser';


export function CollectCurrencyInfo(request, data) {

    const xml = String.fromCharCode(...data.value);

    const date_begin = xml.indexOf("ValCurs Date=\"") + 14;
    const response_date = xml.slice(date_begin, date_begin + 10);

    if (!XMLValidator.validate(xml)) {
        console.log("Received invalid XML");
        return undefined;
    }

    const parser = new XMLParser();
    const target = parser
        .parse(xml)
        ?.ValCurs
        ?.Valute
        ?.find(currency => currency.CharCode === request.Vname);

    if (target === undefined)
        return parser.parse(xml);

    return {
        name: target.CharCode,
        nominal: target.Nominal,
        date: response_date,
        value: target.Value,
    };
}
