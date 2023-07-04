import axios from 'axios';
import service from './api';

import { useEffect, useState, useRef, useCallback } from 'react';

const status = (response) => {
    if (response.status >= 200 && response.status < 300)
        return Promise.resolve(response);
    else
        return Promise.reject(response);
}

export const useAxiosGet = (initialUrl) => {

    const [url, setUrl] = useState(initialUrl)
    const [ response, setResponse ] = useState({
        isLoading: true,
        data: null,
        error: null
    });

    useEffect(() => {
        const fetchData = async() => {
            await service.get(url)
                        .then(status)
                        .then(res => {
                            setResponse({
                                isLoading: false,
                                data: res.data,
                                error: null
                            })
                        })
                        .catch(err => {
                            setResponse({
                                isLoading: false,
                                data: null,
                                error: err
                            })
                        })
        };

        fetchData();
    }, [url]);

    const search = (url) => {
        setUrl(url);
    }

    return { response, search };
}

export const useAxiosPost = (data) => {

    const [ response, setResponse ] = useState({
        isLoading: true,
        data: null,
        error: null
    });

    const fetchData = useCallback(() => {
        service.post('user',data)
                .then(status)
                .then(res => {
                    setResponse({
                        isLoading: false,
                        data: res,
                        error: null
                    })
                })
                .catch(error => {
                    setResponse({
                        isLoading: false,
                        data: null,
                        error: error
                    })
                })
    }, [data]);

    return { response, fetchData };
}

export const useFetch = (params, ref) => {
    const [ isLoading, setIsloading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const isMounted = useRef(true);

    useEffect( () => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect( () => {
        const fetchData = async() => {
            await axios.request(params)
                    .then( status )
                .then( res => {
                    setData(res.data.result.records)
                } )
                .catch( err => setError(err) )
                .finally( () => setIsloading(false) );
        }

        if(ref.current === true){
            setIsloading(true);
            fetchData();   
        }
        
        return () => {
            ref.current = false;
        };

    }, [params, ref]);

    return { isLoading, data, error };
}