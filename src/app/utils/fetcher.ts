// utils/fetcher.ts
export async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
    }
    return response.json();
}
