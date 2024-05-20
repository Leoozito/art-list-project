import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API}`);
    const data = await res.json();

    return NextResponse.json({data})
}

export async function POST(request:Request) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API}`);
    const data = await res.json();

    return NextResponse.json({data})
}

export async function PUT(request:Request) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API}`);
    const data = await res.json();

    return NextResponse.json({data})
}

export async function DELETE(request:Request) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API}`);
    const data = await res.json();

    return NextResponse.json({data})
}