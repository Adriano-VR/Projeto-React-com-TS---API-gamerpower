import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";


    interface Props extends ComponentProps<'h1'>{
        detalhes?:boolean
    }

export const TitulosH1 = ({detalhes,...props}: Props) => {
    
return(
        <h1 {...props} 
        className= {twMerge(" dark:text-blue-50 py-3  tracking-wider font-poppins" ,
            
            detalhes ? 
            "flex items-center justify-center text-2xl dark:text-blue-100" :
            "truncate px-2 text-center text-lg ")}/>
    )
}    
