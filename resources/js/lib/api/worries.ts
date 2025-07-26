import axios from 'axios';

export async function validateWorry(message: string) {
    const { data } = await axios.post(route('worries.validate'), {
        message,
    });

    return data;
}
