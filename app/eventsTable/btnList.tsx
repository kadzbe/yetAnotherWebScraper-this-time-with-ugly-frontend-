"use client"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

import {getData, getYears} from "@/app/lib/getData&years"
import { Button } from "@/components/ui/button"
import React from "react"
export  function BtnList(props: {year: string[]}){
    console.log(props)
    
    return(
        <>
        <div className="flex flex-wrap justify-center items-center gap-2 w-full p-20 ">
            {
            props.year.map((currentYear: string) => (
                <Button  key={currentYear} onClick={async()=> getData(currentYear)} variant="outline" size="sm"  className="hover:bg-[#FFDB32] bg-white" >{currentYear}</Button >
            ))
            }

        </div>

         </>
    )
} 
//  onClick={()=>getData(currentYear)}