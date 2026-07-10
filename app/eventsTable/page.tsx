import { BtnList } from "./btnList";
import { getYears } from "@/app/lib/getData&years"
import SearchFilter from "@/app/eventsTable/renderTable" // <-- Dodaj import

export default async function DemoPage() {
  const year = await getYears()

  return (
    <div>
        <SearchFilter /> 
        
        <BtnList year={year}/>
    </div>
  )
}