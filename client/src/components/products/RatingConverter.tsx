import { Star } from "lucide-react"

interface RatingConverterProps {
    rating_count: number
}

function RatingConverter({rating_count} : RatingConverterProps) {
  return (
    <>
        {Array.from({length: rating_count}).map((_, index) => (<Star className="w-[18px] h-[18px] text-yellow-400 fill-yellow-400" key={index}/>))}
    </>
  )
}

export default RatingConverter
