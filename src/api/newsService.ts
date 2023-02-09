export async function getNews() {
  let response = await fetch(
    "https://gnews.io/api/v4/top-headlines?category=general&apikey=bd72f6585288d8b025da1198faca9cfb"
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`error ${response.status}`);
  }
}
