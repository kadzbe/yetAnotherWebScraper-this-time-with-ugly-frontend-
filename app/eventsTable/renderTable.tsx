'use client';
import { columns } from "@/app/eventsTable/columns"
import { DataTable } from "@/app/eventsTable/data-table"
import { getData } from "@/app/lib/getData&years"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import getCityNames from "@/app/lib/setSearchParamsLocation"
import {getLocations} from "@/app/lib/getUniqueLocations"



export default function SearchFilter() {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  const location = searchParams.get('location');

  const [cityData, setCityData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log('Zmieniono parametr year na:', year);
    
    if (year) {
      getData(year).then((fetchedData) => {
        setTableData(fetchedData);
      });
      getLocations(year).then((cities)=>{
        setCityData(cities);
      })
    }

  }, [year]);

  return(
      <div>
        <DataTable columns={columns} data={tableData} cityData={cityData} />
      </div>
  );
}