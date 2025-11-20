import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/config-service";

export async function GET() {
  try {
    const config = await getSiteConfig();
    return NextResponse.json(config, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Failed to load business config", error);
    return NextResponse.json(
      { message: "Não foi possível carregar as configurações. Tente novamente." },
      { status: 500 },
    );
  }
}

