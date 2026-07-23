"use client"
import getCityNames from "@/app/lib/setSearchParamsLocation"
import {getData, getYears} from "@/app/lib/getData&years"


export default function locationList(props: { locations: string[] }) {
    return (
        <>
            {props.locations.map((currentLocation: string) => (
                <button key={currentLocation} onClick={async () => { getCityNames(currentLocation) }}>
                    {currentLocation}
                </button>
            ))}
        </>
    )
}