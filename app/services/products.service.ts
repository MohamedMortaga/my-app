"use server"
export  async function getProducts(limit:number=100){ {
        try{
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/Products?limit='+limit+'',{
                cache: 'no-cache',
                next: {revalidate: 120 , tags: ['products']},
            });
            if(!res.ok)
            {
                throw new Error(res.statusText || 'Failed to fetch Products')
            }
            const data = await res.json();
            return data;
        }catch(error){
            throw new Error((error as Error).message || "Something went wrong");
            return (error);
        }
    }
}



export  async function getProductDetails(id:string){ {
        try{
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/Products/${id}`,{
                cache: 'no-cache',
                next: {revalidate: 120 , tags: ['products']},
            });
            if(!res.ok)
            {
                throw new Error(res.statusText || 'Failed to fetch Products')
            }
            const data = await res.json();
            return data;
        }catch(error){
            throw new Error((error as Error).message || "Something went wrong");
            return (error);
        }
    }
}