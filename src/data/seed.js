import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// Get the directory name equivalent to __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const results = [];
  const filePath = path.resolve(__dirname, "../data/DataSheet.csv");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        date: new Date(data.Day),
        ageGroup: data.Age,
        gender: data.Gender,
        featureA: parseInt(data.A, 10),
        featureB: parseInt(data.B, 10),
        featureC: parseInt(data.C, 10),
        featureD: parseInt(data.D, 10),
        featureE: parseInt(data.E, 10),
        featureF: parseInt(data.F, 10),
      });
    })
    .on('end', async () => {
      try {
        for (const record of results) {
          await prisma.featureData.create({
            data: record,
          });
        }
        console.log('Data seeding completed successfully.');
      } catch (error) {
        console.error('Error seeding data:', error);
      } finally {
        await prisma.$disconnect();
      }
    });
}

seed().catch((error) => {
  console.error('Error in seed script:', error);
  prisma.$disconnect();
});
