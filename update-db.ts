import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
    console.log("Starting DB Update...");

    // 1. Update Testimonial
    let testimonial = await prisma.testimonial.findFirst();
    if (!testimonial) {
        testimonial = await prisma.testimonial.create({
            data: { clientNameEn: 'Testimonial', clientNameAr: 'Testimonial', quoteEn: 'Q', quoteAr: 'Q', published: true }
        });
    }
    const newName = `E2E Client ${Date.now()}`;
    await prisma.testimonial.update({
        where: { id: testimonial.id },
        data: { clientNameEn: newName }
    });
    console.log(`Updated Testimonial to: ${newName}`);

    // 2. Update Brand
    let brand = await prisma.brandLogo.findFirst();
    if (!brand) {
        brand = await prisma.brandLogo.create({
            data: { name: 'Brand', active: true }
        });
    }
    const newBrandName = `E2E Brand ${Date.now()}`;
    await prisma.brandLogo.update({
        where: { id: brand.id },
        data: { name: newBrandName }
    });
    console.log(`Updated Brand to: ${newBrandName}`);

    // 3. Update Vault Document
    let vaultDoc = await prisma.vaultDocument.findFirst();
    if (!vaultDoc) {
        vaultDoc = await prisma.vaultDocument.create({
            data: { titleEn: 'Vault', titleAr: 'Vault', descriptionEn: 'D', descriptionAr: 'D', active: true, displayOrder: 0 }
        });
    }
    const newVaultTitle = `E2E Vault ${Date.now()}`;
    await prisma.vaultDocument.update({
        where: { id: vaultDoc.id },
        data: { titleEn: newVaultTitle }
    });
    console.log(`Updated Vault Document to: ${newVaultTitle}`);

    process.exit(0);
}

run().catch(console.error);
