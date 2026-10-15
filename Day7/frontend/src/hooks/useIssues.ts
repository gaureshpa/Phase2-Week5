import { useCallback, useEffect, useState } from "react";
import { getIssues } from "../api";
import type { Issue } from "../types";

function useIssues() {
    const [issues, setIssues] = useState<Issue[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] =useState<string | null>(null)

    const fetchIssues = useCallback(async  () => {
        try{
            setLoading(true)
            setError(null)

            const data = await getIssues()
            setIssues(data)
        } catch(error) {
            setError(
                error instanceof Error ? error.message : "Failed to load issues"
            )
        } finally {
            setLoading(false)
        }
    }, []) 

    useEffect(() => {
        fetchIssues()
    }, [fetchIssues])

    return {
        issues, loading, error, refetch: fetchIssues
    }
}

export default useIssues
