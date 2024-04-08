import { useEffect, useState } from "react"

import dbApi from "../api/DbApi"

import { ServiceInterface } from "../interface/serviceInterface"

export const useService = () => {

    const [services, setServices] = useState<ServiceInterface[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getServices();
    },[])

    const getServices = async () => {
        
        try{
            const {data} = await dbApi.get<ServiceInterface[]>('/service');
            setServices(data)
            setIsLoading(false)
        } catch(error) {
            console.log(error)
        }
    }

    return {
        services,
        isLoading
    }
}