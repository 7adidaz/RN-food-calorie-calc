import uniq from 'lodash.uniq';
export default async function calories(items: string[]) {
    try {
        const queryText = uniq(items).join(', ');
        const apiKey = process.env.EXPO_PUBLIC_CALORIE_API_KEY;
        if (!apiKey) {
            throw new Error('EXPO_PUBLIC_CALORIE_API_KEY is not defined');
        }

        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            }
        }
        const result = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${queryText}`, options)
        const data = await result.json();
        console.log('data__', data);
        return data;
    } catch (error) {
        console.log('error__', error);
        return null;
    }
}
