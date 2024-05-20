export async function fetchWrapper(
    input: URL | RequestInfo, init?: RequestInit | undefined
) {
    const res = await fetch(`
        ${process.env.NEXT_PUBLIC_ROUTE_API}${input}`
        , init
    );
    const data = await res.json();

    return data;
}