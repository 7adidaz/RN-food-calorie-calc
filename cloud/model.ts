export default async function model(url: string) {
    try {
        const PAT = process.env.EXPO_PUBLIC_PAT;
        const userId = 'clarifai';
        const appId = 'main';
        const modelId = 'general-image-detection';
        const modelVersionId = '1580bb1932594c93b7e2e04456af7c6f';

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": userId,
                "app_id": appId
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": url
                            // "base64": image as base64 
                        }
                    }
                }
            ]
        });
        console.log('url__', url);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        const t1 = Date.now();
        const result = await fetch
            (`https://api.clarifai.com/v2/models/${modelId}/versions/${modelVersionId}/outputs`, requestOptions)
            .then(response => response.json())

        const items: string[] = [];

        const regions = result.outputs[0].data.regions;
        regions.forEach((region: any) => {
            region.data.concepts.forEach((concept: any) => {
                items.push(concept.name);
            });
        });
        console.log(`${items} finished in ${Date.now() - t1}ms`);
        return items;
    } catch (err) {
        console.log('error__', err);
        return null;
    }
}
