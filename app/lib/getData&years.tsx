import { columns, Payment } from "@/app/eventsTable/columns"
import { DataTable } from "@/app/eventsTable/data-table"

export  async function getData(year: string) {

  const url = `http://localhost:5000/years/${year}`;
  var result = null
  var data = null
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    result = await response.json();
    data = result.data
    
    let params = new URLSearchParams(window.location.search);

    params.set("year", year);
    let newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
    return (data)
  } catch (error) {
    console.error(error);
    return []
  }
/*
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
*/
}

export async function getYears() {

  const url = `http://localhost:5000/years`;
  var result = null
  var years = null
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    result = await response.json();
    years = result.years
    return years
  } catch (error) {
    console.error(error);
    return []
  }



}
