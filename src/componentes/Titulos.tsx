import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";


    interface Props extends ComponentProps<'h1'>{
        detalhes?:boolean
    }

export const TitulosH1 = ({detalhes,...props}: Props) => {
    
return(
        <h1 {...props} 
        className= {twMerge("font-extrabold dark:text-white py-3  tracking-wide" ,
            
            detalhes ? 
            "flex items-center justify-center text-2xl" :
            "truncate px-2 text-center text-lg ")}/>
    )
}    
