import { error } from "console";
import {getLocations} from "@/app/lib/getUniqueLocations"
// ma zwracać unikalne miasta, dla danego roku
export default async function getCityNames(location: string) {
    let params = new URLSearchParams(window.location.search);

    params.set("location", location);
    let newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
    return []
}