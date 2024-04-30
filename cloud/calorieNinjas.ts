export default async function calories(items: string[]) {
  try {
    const queryText = [...new Set(items)].join(", ");
    console.log("queryText__", queryText);
    const apiKey = process.env.EXPO_PUBLIC_CALORIE_API_KEY;
    console.log("apiKey__", apiKey);
    if (!apiKey) {
      throw new Error("EXPO_PUBLIC_CALORIE_API_KEY is not defined");
    }

    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    };
    const result = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${queryText}`,
      options
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("error__", error);
    return null;
  }
}
