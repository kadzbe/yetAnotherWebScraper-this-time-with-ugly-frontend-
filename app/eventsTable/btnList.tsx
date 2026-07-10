"use client"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

import {getData, getYears} from "@/app/lib/getData&years"

import React from "react"
export  function BtnList(props: {year: string[]}){
    console.log(props)
    
    return(
        <>
        <div>
            {
            props.year.map((currentYear: string) => (
                <button key={currentYear} onClick={async()=> getData(currentYear)}>{currentYear}</button>
            ))
            }

        </div>

         </>
    )
} 
//  onClick={()=>getData(currentYear)}