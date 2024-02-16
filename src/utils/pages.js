export const getPages=(limit, totalCount)=>{
    return Math.ceil(totalCount/limit)
}