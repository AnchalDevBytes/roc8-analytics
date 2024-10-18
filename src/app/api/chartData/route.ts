import { prisma } from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const date = url.searchParams.get("date");
        const ageGroup = url.searchParams.get("ageGroup");
        const gender = url.searchParams.get("gender");

        const filter : any = {};  // eslint-disable-line @typescript-eslint/no-explicit-any

        if(date) {
            const startOfDay = new Date(date);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setUTCHours(23, 59, 59, 999);
            filter.date = {
                gte: startOfDay,
                lte: endOfDay
            };
        }
        if(ageGroup) {
            filter.ageGroup = ageGroup;
        }
        if(gender) {
            filter.gender = gender;
        }

        const data = await prisma.featureData.findMany({
            where : filter,
        });

        if (!data) {
            return NextResponse.json({
                success: false,
                message: "No data found for the given filter"
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Data filtered successfully!",
                data : data
            },
            {
                status : 200
            },
        );

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error occurred" }
            );
        }
    }
}
