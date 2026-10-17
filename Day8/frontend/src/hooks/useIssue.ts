import useIssues from "./useIssues";

function useIssue(id: number | null) {
    const {
        issues, loading, error, refetch
    } = useIssues()

    const issue = id === null 
        ? undefined 
        : issues.find((issue) => issue.id ===  id)

    const notFound = !loading && !error && issue === undefined

    return {
        issue, loading, error, notFound, refetch
    }
}

export default useIssue
