import { BtnList } from "./btnList";
import { getYears } from "@/app/lib/getData&years"
import SearchFilter from "@/app/eventsTable/renderTable" // <-- Dodaj import
import GridPattern from "@/app/eventsTable/background"
import localFont from  "next/font/local"
import LocationList from "@/app/eventsTable/cityButtons"
import {getLocations} from "@/app/lib/getUniqueLocations"

  const LTAvocadeFont = localFont({
    src: "../fonts/LTAvocado-Bold.ttf"
  })
export default async function DemoPage() {
  const year = await getYears()

  return (
    <div className="relative">
      <div className={`${LTAvocadeFont.className} flex flex-wrap justify-center items-center`}>
        <h1 className="text-4xl font-bold pt-6">OvO<span className="text-[#FFDB32]" >doc</span> </h1>
      </div>
      <GridPattern className="opacity-75 " />

      <BtnList year={year} />
      <SearchFilter />
    </div>
  )
}