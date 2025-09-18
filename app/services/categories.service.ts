"use server"
export  async function getCategories() {
        try{
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
            });
            if(!res.ok)
            {
                throw new Error(res.statusText || 'Failed to fetch categories')
            }
            const data = await res.json();
            return data;
        }catch(error){
                throw new Error((error as Error).message || "Something went wrong");
            return (error);
        }
}