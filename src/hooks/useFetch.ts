import { useState, useEffect } from 'react'
import api from '#/api/axiosInstance'
import axios from 'axios'

interface FetchSate<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export default function useFetch<T>(url: string): FetchSate<T> {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    api
      .get(url, { signal: controller.signal })
      .then((res) => setData(res.data))
      .catch((err: unknown) => {
        if (!axios.isCancel(err)) {
          setError(
            err instanceof Error ? err.message : 'An unknown error occurred',
          )
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [url])

  return { data, isLoading, error }
}
