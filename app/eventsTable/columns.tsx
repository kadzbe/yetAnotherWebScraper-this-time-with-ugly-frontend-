"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "start_date",
    header: "Data startu",
  },{
    accessorKey: "end_date",
    header: "Data końca",
  },
  {
    accessorKey: "genres",
    header: "Kategoria",
  },
  {
    accessorKey: "location",
    header: "Lokalizacja",
  },
  {
    accessorKey: "name",
    header: "Nazwa",
  }
]