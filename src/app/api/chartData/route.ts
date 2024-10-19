import { prisma } from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Filter {
    date?: {
        gte: Date;
        lte: Date;
    };
    ageGroup?: string;
    gender?: string;
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const startDate = url.searchParams.get("startDate");
        const endDate = url.searchParams.get("endDate");
        const ageGroup = url.searchParams.get("ageGroup");
        const gender = url.searchParams.get("gender");

        const filter : Filter = {};

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if(!isNaN(start.getTime()) && !isNaN(end.getTime())) { 
                start.setUTCHours(0, 0, 0, 0);
                end.setUTCHours(23, 59, 59, 999);
                filter.date = {
                    gte: start,
                    lte: end
                };
            }
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

        if (!data || data.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No data found for the given filter"
            }, { status : 404 });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Data filtered successfully!",
                data : data
            },
            { status : 200 },
        );

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status : 500 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error occurred" },
                { status: 500 }
            );
        }
    }
}
