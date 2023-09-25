import { NextResponse } from "next/server";

const BE_URL = "http://localhost:3000";


export async function GET() {
    const responseFetchNasabah = await fetch(`${BE_URL}/nasabah?limit=100`);
    const response = await responseFetchNasabah.json();

    return NextResponse.json({ data: response })
}