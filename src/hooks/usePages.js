import { useMemo } from "react";
import { getPages } from "../utils/pages";

export const usePages = (totalCount, limit) => {
  const pagesArray = useMemo(() => {
    const arr = []
    for (let i = 1; i <= getPages(limit, totalCount); i++) arr.push(i)
    return arr
  }, [totalCount, limit])
  return pagesArray
}