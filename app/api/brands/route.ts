export function GET(){
        
    const data =[
        {
            id:1,
            name:"Brand 1"
        }
    ]

    return new Response(JSON.stringify(data))
}