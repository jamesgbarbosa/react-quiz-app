import { useState, useEffect } from "react";

export default function useFetch(url, initialValue) {
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(initialValue)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        fetch(url).then((res) => {
            return res.json()
        }).then((it) => {
            setDataFetched(() => it.questions)
        }).catch((err) => {
            setIsError(true);
        }).finally(() => {
            setIsLoading(() => false);
        })
    }, [url])

    return {
        isLoading,
        dataFetched,
        isError
    }
}