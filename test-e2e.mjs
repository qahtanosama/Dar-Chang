import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("---- Testing E2E CMS Updates propagation ----");
    
    // 1. Log in to get the admin token
    console.log("1. Logging in as admin...");
    const loginRes = await fetch('http://localhost:3000/ar/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@darchang.com', password: 'DarChang2024!' })
    });
    
    if (!loginRes.ok) {
        console.error("Login failed!", await loginRes.text());
        process.exit(1);
    }
    
    const setCookieHeader = loginRes.headers.get('set-cookie');
    const tokenCookie = setCookieHeader?.split(';').find(c => c.trim().startsWith('admin_token='));
    
    if (!tokenCookie) {
        console.error("Failed to extract admin_token cookie");
        process.exit(1);
    }

    const cookieHeader = tokenCookie;

    // ----- TESTIMONIAL TEST -----
    console.log("\n--- Testing Testimonials ---");
    // Ensure we have at least one testimonial in DB
    let testimonial = await prisma.testimonial.findFirst();
    if (!testimonial) {
        testimonial = await prisma.testimonial.create({
            data: {
                clientNameEn: 'Original Client', clientNameAr: 'Original Client',
                quoteEn: 'Original Quote', quoteAr: 'Original Quote',
                published: true
            }
        });
    }

    const testId = testimonial.id;
    const newName = `E2E Test Client ${Date.now()}`;
    console.log(`Updating testimonial ${testId} to client name: ${newName}`);

    // Update via API (Simulate CMS)
    await fetch(`http://localhost:3000/api/admin/testimonials/${testId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
        body: JSON.stringify({ ...testimonial, clientNameEn: newName })
    });

    console.log("Fetching Homepage (en)...");
    const homeRes = await fetch('http://localhost:3000/en', { cache: 'no-store' });
    const homeText = await homeRes.text();
    
    if (homeText.includes(newName)) {
        console.log(`✅ Testimonial successfully appeared on homepage!`);
    } else {
        console.error(`❌ Testimonial update failed. Name '${newName}' not found on homepage.`);
    }

    // ----- BRAND TICKER TEST -----
    console.log("\n--- Testing Brand Ticker ---");
    let brand = await prisma.brandLogo.findFirst();
    if (!brand) {
        brand = await prisma.brandLogo.create({
            data: { name: 'Original Brand', active: true }
        });
    }

    const brandId = brand.id;
    const newBrandName = `E2E Brand ${Date.now()}`;
    console.log(`Updating brand to: ${newBrandName}`);

    await fetch(`http://localhost:3000/api/admin/brands/${brandId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
        body: JSON.stringify({ ...brand, name: newBrandName })
    });

    const homeRes2 = await fetch('http://localhost:3000/en', { cache: 'no-store' });
    const homeText2 = await homeRes2.text();
    
    if (homeText2.includes(newBrandName)) {
        console.log(`✅ Brand successfully appeared on homepage!`);
    } else {
        console.error(`❌ Brand update failed. Name '${newBrandName}' not found on homepage.`);
    }

    // ----- VAULT DOCUMENT TEST -----
    console.log("\n--- Testing Vault Documents ---");
    let vaultDocs = await prisma.vaultDocument.findMany();
    // If no vault docs exist, create one so we can test updating it
    if (vaultDocs.length === 0) {
        await fetch('http://localhost:3000/api/admin/vault', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': cookieHeader
            },
            body: JSON.stringify({
                 titleEn: 'Original Vault Doc', titleAr: 'Original Vault Doc',
                 descriptionEn: 'Desc', descriptionAr: 'Desc',
                 categoryEn: 'Cat', categoryAr: 'Cat', status: 'Active', active: true, displayOrder: 0
            })
        });
    }

    let vaultDoc = await prisma.vaultDocument.findFirst();
    const vaultId = vaultDoc.id;
    const newVaultTitle = `E2E Vault Doc ${Date.now()}`;
    console.log(`Updating vault document to: ${newVaultTitle}`);

    await fetch(`http://localhost:3000/api/admin/vault/${vaultId}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
        body: JSON.stringify({ ...vaultDoc, titleEn: newVaultTitle })
    });

    const vaultRes = await fetch('http://localhost:3000/en/compliance', { cache: 'no-store' });
    const vaultText = await vaultRes.text();
    
    if (vaultText.includes(newVaultTitle)) {
        console.log(`✅ Vault Document successfully appeared on compliance page!`);
    } else {
        console.error(`❌ Vault Document update failed. Title '${newVaultTitle}' not found on compliance page.`);
    }

    process.exit(0);
}

run().catch(console.error);
