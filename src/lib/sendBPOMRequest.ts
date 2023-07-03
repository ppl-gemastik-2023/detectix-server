import axios from "axios";

export async function sendBPOMRequest<T>(url: string, param: any): Promise<T> {
    const { data } = await axios.post<T>(url, param, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    });
    return data
}