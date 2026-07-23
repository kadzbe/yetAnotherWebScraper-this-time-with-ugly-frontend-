export async function getLocations(year: string) {

  const url = `http://localhost:5000/years/${year}`;
  var result = null
  var city = null
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    result = await response.json();
    city = result.unique_citeis.map((item: any)=> item.city)
    return city
  } catch (error) {
    console.error(error);
    return []
  }



}