    export interface GamesProps {
        id: number;
        title: string;
        thumbnail: string;
        open_giveaway:string
        platforms:string
        published_date:string
        end_date:string
        instructions:string
        worth:string
        description:string
        image:string
        users:number
    }


    export interface UserLogged {
        id?: string;
        name: string;
        image?:string;
    }