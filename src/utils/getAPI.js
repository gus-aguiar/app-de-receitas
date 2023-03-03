export async function toggleAPI(type, search) {
  if (type === 'ingredient') {
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const responseJSON = await responseAPI.json();
    return responseJSON;
  }
  if (type === 'name') {
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const responseJSON = await responseAPI.json();
    return responseJSON;
  }
  if (type === 'first-letter') {
    const responseAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    const responseJSON = await responseAPI.json();
    return responseJSON;
  }
}
