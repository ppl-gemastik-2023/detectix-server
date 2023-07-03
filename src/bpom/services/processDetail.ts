import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";

export interface ProcessedData {
    PRODUCT_ID: string;
    APPLICATION_ID: string;
    CLASS_ID: string;
    PRODUCT_REGISTER: string;
    PRODUCT_DATE: string;
    PRODUCT_NAME: string;
    PRODUCT_BRANDS: string;
    PRODUCT_PACKAGE: string;
    PENDAFTAR: string;
    ALAMAT_PENDAFTAR: string;
    STATUS: string;
    details?: any
}

export async function processDetail(item: ProcessedData) {
    let data = qs.stringify({
        'product_id': item.PRODUCT_ID,
        'aplication_id': item.APPLICATION_ID
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cekbpom.pom.go.id/get_detail_produk_obat',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    };

    const res = await axios.request(config)
    const $ = cheerio.load(res.data);
    const $labels = $(".form-field-caption > b")
    let labels: string[] = []
    $labels.each((_, el: any) => {
        labels.push(el.children.map((child: any) => child.data)[0])
    })
    const $values = $(".form-field-input > div > span")
    let values: (string | null)[] = []
    $values.each((_, el: any) => {
        values.push(el.children.map((child: any) => {
            if (child.data) {
                return child.data
            }
            return child.children.map((child: any) => child.data)[0]
        })[0])
    })
    const extractedData = labels.reduce((acc, label: string | null, index) => {
        acc[label?.toLowerCase()?.replace(" ", "_") || ""] = values[index]
        return acc
    }, {} as any)
    extractedData["komposisi"] = extractedData["komposisi"]?.replace("-", "")?.trim()?.split(".")?.map((i: string) => i.trim());
    delete extractedData["nomor_registrasi"]
    delete extractedData["nama_produk"]
    delete extractedData["kemasan"]
    extractedData["masa_berlaku"] = extractedData["masa_berlaku s/d"]
    delete extractedData["masa_berlaku s/d"]
    item['details'] = extractedData;
    return item
}