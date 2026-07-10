'use client';
import { columns } from "@/app/eventsTable/columns"
import { DataTable } from "@/app/eventsTable/data-table"
import { getData } from "@/app/lib/getData&years"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchFilter() {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log('Zmieniono parametr year na:', year);
    
    if (year) {
      getData(year).then((fetchedData) => {
        setTableData(fetchedData);
      });
    }
  }, [year]);

  return(
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={tableData} />
      </div>
  );
}