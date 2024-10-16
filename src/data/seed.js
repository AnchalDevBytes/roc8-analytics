import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johnnn@example.com',
      password: 'password123',
    },
  });

  const csvFilePath = path.join(process.cwd(), 'src', 'data', 'DataSheet.csv');
  console.log(`CSV File Path: ${csvFilePath}`);

  const records = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv({ skipEmptyLines: true, trim: true }))
        .on('data', (row) => {
          console.log('Row data:', row);
          const record = {
            feature: row.feature,
            hours: parseFloat(row.hours),
            date: new Date(row.date),
            age: parseInt(row.age, 10),
            gender: row.gender,
          };

          // Validate and push valid records
          if (record.feature && !isNaN(record.hours) && record.date instanceof Date && !isNaN(record.age) && record.gender) {
            records.push(record);
          } else {
            console.warn('Invalid record:', row); // Log invalid records
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const record of records) {
      await prisma.usage.create({
        data: {
          feature: record.feature,
          hours: record.hours,
          date: record.date,
          age: record.age,
          gender: record.gender,
          userId: user.id,
        },
      });
    }

    console.log('Data has been seeded successfully!');
  } catch (error) {
    console.error('Error reading CSV file:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
