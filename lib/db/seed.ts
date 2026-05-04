import 'dotenv/config';
import { db } from './index';
import {
  loanOfficers, loanApplications, leads, blogPosts, testimonials, loanPrograms, siteSettings
} from './schema';

async function seed() {
  console.log('Seeding KLE Mortgage database...');

  // Loan Officers
  const officers = await db.insert(loanOfficers).values([
    {
      slug: 'kimberly-lewis-edwards',
      name: 'Kimberly Lewis-Edwards',
      title: 'Senior Loan Officer / Founder',
      nmlsNumber: '123456',
      phone: '(404) 555-1234',
      email: 'kle@klemortgage.com',
      bio: 'With 15+ years in mortgage lending, Kimberly founded KLE Mortgage with a single mission: make homeownership accessible to every family. She has personally helped over 300 families achieve their dreams.',
      specialties: ['FHA', 'VA', 'First-Time Buyers'] as unknown as string[],
      languages: ['English', 'Spanish'] as unknown as string[],
      yearsExperience: 15,
      licenseState: ['GA', 'FL', 'TX'] as unknown as string[],
      isFounder: true,
      isActive: true,
      displayOrder: 0,
    },
    {
      slug: 'marcus-thompson',
      name: 'Marcus Thompson',
      title: 'Loan Officer',
      nmlsNumber: '234567',
      phone: '(404) 555-2345',
      email: 'mthompson@klemortgage.com',
      bio: 'Marcus specializes in VA loans and has helped over 200 veterans and active-duty service members achieve homeownership. His attention to detail and speed are unmatched.',
      specialties: ['VA Loans', 'Conventional', 'Refinance'] as unknown as string[],
      languages: ['English'] as unknown as string[],
      yearsExperience: 8,
      licenseState: ['GA', 'TX'] as unknown as string[],
      isFounder: false,
      isActive: true,
      displayOrder: 1,
    },
    {
      slug: 'angela-roberts',
      name: 'Angela Roberts',
      title: 'Loan Officer',
      nmlsNumber: '345678',
      phone: '(404) 555-3456',
      email: 'aroberts@klemortgage.com',
      bio: "Angela's passion is guiding first-time homebuyers through the process with patience, education, and unwavering support. She believes no question is too small.",
      specialties: ['FHA', 'USDA', 'First-Time Buyers'] as unknown as string[],
      languages: ['English'] as unknown as string[],
      yearsExperience: 6,
      licenseState: ['GA', 'FL'] as unknown as string[],
      isFounder: false,
      isActive: true,
      displayOrder: 2,
    },
    {
      slug: 'david-chen',
      name: 'David Chen',
      title: 'Loan Officer',
      nmlsNumber: '456789',
      phone: '(404) 555-4567',
      email: 'dchen@klemortgage.com',
      bio: 'David brings expertise in jumbo loans and investment properties, helping high-net-worth clients maximize their real estate portfolios.',
      specialties: ['Jumbo Loans', 'Conventional', 'Investment Properties'] as unknown as string[],
      languages: ['English', 'Mandarin'] as unknown as string[],
      yearsExperience: 10,
      licenseState: ['GA', 'FL', 'TX'] as unknown as string[],
      isFounder: false,
      isActive: true,
      displayOrder: 3,
    },
  ]).returning();

  console.log(`Seeded ${officers.length} loan officers`);

  // Testimonials
  await db.insert(testimonials).values([
    { reviewerName: 'Marcus & Tanya Williams', rating: 5, location: 'Atlanta, GA', loanType: 'fha', reviewText: 'KLE made our first home purchase stress-free. Our loan officer explained everything clearly and we closed in 28 days. Highly recommend!', isFeatured: true, displayOrder: 0, verified: true },
    { reviewerName: 'Robert Johnson', rating: 5, location: 'Marietta, GA', loanType: 'va', reviewText: 'As a veteran, I was grateful for the VA loan expertise at KLE. They knew exactly what I was entitled to and got me into my home with zero down.', isFeatured: true, displayOrder: 1, verified: true },
    { reviewerName: 'Priya Patel', rating: 5, location: 'Decatur, GA', loanType: 'conventional', reviewText: 'I refinanced my home through KLE and saved $420/month. The process was seamless and my loan officer was always available to answer my questions.', isFeatured: false, displayOrder: 2, verified: true },
    { reviewerName: 'David & Sarah Chen', rating: 5, location: 'Alpharetta, GA', loanType: 'conventional', reviewText: 'We tried two other lenders before KLE — nobody could get our deal done. KLE found a program that worked perfectly for our situation.', isFeatured: true, displayOrder: 3, verified: true },
    { reviewerName: 'Tamika Brooks', rating: 5, location: 'Stone Mountain, GA', loanType: 'fha', reviewText: 'As a single mom, I never thought homeownership was possible. KLE helped me qualify for a first-time buyer program and the whole team celebrated with me at closing!', isFeatured: true, displayOrder: 4, verified: true },
    { reviewerName: 'Kevin & Angela Moore', rating: 5, location: 'Duluth, GA', loanType: 'usda', reviewText: 'We used USDA and got into our dream home in a great school district for 0% down. KLE walked us through every step. Cannot say enough good things.', isFeatured: false, displayOrder: 5, verified: true },
  ]);

  console.log('Seeded testimonials');

  // Loan Programs
  await db.insert(loanPrograms).values([
    { slug: 'conventional', name: 'Conventional Loans', type: 'conventional', tagline: 'Flexible financing for qualified buyers', description: 'Traditional mortgage financing with competitive rates for buyers with good credit.', features: ['3% min down', 'Competitive rates', 'Remove PMI at 20% equity'] as unknown as string[], requirements: ['620+ credit score', '2 years employment'] as unknown as string[], bestFor: ['Good credit buyers', 'Move-up buyers'] as unknown as string[], minDownPayment: '3%', minCreditScore: 620, isActive: true, displayOrder: 0 },
    { slug: 'fha', name: 'FHA Loans', type: 'fha', tagline: 'Low down payment for more buyers', description: 'Government-backed loans with flexible requirements perfect for first-time buyers.', features: ['3.5% min down', 'Flexible credit', 'Gift funds allowed'] as unknown as string[], requirements: ['580+ credit score', 'Primary residence'] as unknown as string[], bestFor: ['First-time buyers', 'Credit rebuilding'] as unknown as string[], minDownPayment: '3.5%', minCreditScore: 580, isActive: true, displayOrder: 1 },
    { slug: 'va', name: 'VA Loans', type: 'va', tagline: 'Earned benefit for veterans', description: 'Zero down payment loans for veterans and active-duty service members.', features: ['0% down payment', 'No PMI', 'Competitive rates'] as unknown as string[], requirements: ['Military service', 'COE required'] as unknown as string[], bestFor: ['Veterans', 'Active duty'] as unknown as string[], minDownPayment: '0%', minCreditScore: 580, isActive: true, displayOrder: 2 },
    { slug: 'usda', name: 'USDA Loans', type: 'usda', tagline: 'Rural homeownership made affordable', description: '100% financing for eligible rural and suburban homebuyers.', features: ['0% down payment', 'Low MIP', 'Rural areas'] as unknown as string[], requirements: ['Eligible location', 'Income limits'] as unknown as string[], bestFor: ['Rural buyers', 'Limited savings'] as unknown as string[], minDownPayment: '0%', minCreditScore: 640, isActive: true, displayOrder: 3 },
    { slug: 'jumbo', name: 'Jumbo Loans', type: 'jumbo', tagline: 'Financing for luxury properties', description: 'Loans exceeding conforming limits for high-value properties.', features: ['High loan amounts', 'Competitive rates', 'Multiple terms'] as unknown as string[], requirements: ['700+ credit score', '12mo reserves'] as unknown as string[], bestFor: ['Luxury homes', 'High-cost markets'] as unknown as string[], minDownPayment: '10%', minCreditScore: 700, maxLoanAmount: 'No standard limit', isActive: true, displayOrder: 4 },
    { slug: 'refinance', name: 'Refinancing', type: 'refinance', tagline: 'Lower rate or access equity', description: 'Rate-and-term or cash-out refinancing options.', features: ['Lower payments', 'Cash-out available', 'Streamline options'] as unknown as string[], requirements: ['Existing mortgage', 'Sufficient equity'] as unknown as string[], bestFor: ['Rate improvement', 'Equity access'] as unknown as string[], minDownPayment: null, minCreditScore: 620, isActive: true, displayOrder: 5 },
    { slug: 'first-time-buyer', name: 'First-Time Buyer', type: 'first_time_buyer', tagline: 'Special programs for new buyers', description: 'Combining low down payment loans with assistance and education.', features: ['Down payment assistance', 'Closing cost help', 'Education included'] as unknown as string[], requirements: ['No recent homeownership', 'Income limits may apply'] as unknown as string[], bestFor: ['Never bought before', 'Limited savings'] as unknown as string[], minDownPayment: '3%', minCreditScore: 580, isActive: true, displayOrder: 6 },
  ]);

  console.log('Seeded loan programs');

  // Blog Posts
  const postAuthorId = officers[0]?.id ?? 1;
  await db.insert(blogPosts).values([
    { slug: 'first-time-buyer-guide', title: "The Complete First-Time Homebuyer's Guide", excerpt: 'Everything you need to know about buying your first home — from saving for a down payment to closing day.', content: `Buying your first home is one of the most exciting and important financial decisions you'll ever make. This comprehensive guide walks you through every step of the process.\n\n## Step 1: Check Your Credit Score\n\nYour credit score is the first thing lenders look at. Aim for at least 620 for conventional loans, or 580 for FHA.\n\n## Step 2: Save for a Down Payment\n\nYou'll need at least 3-3.5% of the purchase price. Don't forget closing costs (typically 2-5%).\n\n## Step 3: Get Pre-Approved\n\nA pre-approval letter shows sellers you're serious. Contact KLE Mortgage to get pre-approved in 24 hours.\n\n## Step 4: Find Your Home\n\nWork with a real estate agent to find homes within your budget. Think about location, schools, and commute.\n\n## Step 5: Make an Offer\n\nYour agent will help you write a competitive offer. Your pre-approval letter strengthens your position.\n\n## Step 6: Inspection and Appraisal\n\nA home inspection protects you. The lender will also require an appraisal to confirm the value.\n\n## Step 7: Close\n\nReview all closing documents carefully. Bring a cashier's check for closing costs. Get your keys!`, category: 'first_time_buyer', authorId: postAuthorId, readTimeMinutes: 8, isPublished: true, publishedAt: new Date('2024-01-15'), tags: ['first-time buyer', 'buying tips'] as unknown as string[], coverImageUrl: null },
    { slug: 'understanding-fha-loans', title: 'Understanding FHA Loans: Are They Right for You?', excerpt: 'FHA loans offer flexibility for buyers with less-than-perfect credit. Learn if this program fits your situation.', content: `FHA loans are one of the most popular loan programs in America for good reason. They offer more flexibility than conventional loans while still providing competitive rates.\n\n## What Makes FHA Different?\n\nFHA loans are backed by the Federal Housing Administration. This government backing allows lenders to offer more flexible terms.\n\n## Key Benefits\n\n- **Low down payment**: As little as 3.5% with a 580+ credit score\n- **Flexible credit**: Borrowers with 500-579 credit scores can qualify with 10% down\n- **Gift funds accepted**: The entire down payment can come from a gift\n- **Higher DTI**: Debt-to-income ratios up to 57% in some cases\n\n## The Downside\n\nFHA loans require Mortgage Insurance Premium (MIP) for the life of the loan if you put less than 10% down. For some borrowers, a conventional loan may be more cost-effective long-term.\n\n## Is FHA Right for You?\n\nContact our team to compare FHA vs. conventional for your specific situation.`, category: 'mortgage_tips', authorId: postAuthorId, readTimeMinutes: 6, isPublished: true, publishedAt: new Date('2024-02-01'), tags: ['FHA', 'loan programs'] as unknown as string[], coverImageUrl: null },
    { slug: 'va-loan-benefits-explained', title: 'VA Loan Benefits Explained: A Complete Guide for Veterans', excerpt: 'Zero down payment, no PMI, competitive rates — here\'s everything veterans need to know about VA loans.', content: `If you\'ve served in the military, a VA loan is one of the most powerful financial benefits available to you. Here\'s everything you need to know.\n\n## Who Qualifies?\n\nVA loans are available to:\n- Veterans (varying service requirements)\n- Active-duty service members (90+ days continuous service)\n- National Guard/Reserve members (6+ years service)\n- Eligible surviving spouses\n\n## Key Benefits\n\n**Zero down payment** — This is the big one. Most buyers have to save for years to afford a down payment. VA loans require $0 down.\n\n**No PMI** — Unlike conventional loans with less than 20% down, VA loans have no monthly mortgage insurance.\n\n**Competitive rates** — VA loans typically offer rates 0.25-0.5% lower than conventional loans.\n\n**Lifetime benefit** — You can use a VA loan multiple times throughout your life.\n\n## How to Get Started\n\nContact KLE Mortgage. We specialize in VA loans and can help you obtain your Certificate of Eligibility and start the process.`, category: 'mortgage_tips', authorId: postAuthorId, readTimeMinutes: 6, isPublished: true, publishedAt: new Date('2024-03-18'), tags: ['VA loan', 'veterans'] as unknown as string[], coverImageUrl: null },
  ]);

  console.log('Seeded blog posts');

  // Sample Lead
  await db.insert(leads).values([
    { firstName: 'John', lastName: 'Sample', email: 'john.sample@example.com', phone: '(404) 555-9999', interest: 'Buying a Home', message: 'I\'m interested in FHA loans for a first purchase. Budget around $280,000.', sourcePage: '/contact', sourceType: 'contact_form', status: 'new', emailConsent: true, smsConsent: false },
  ]);

  // Sample Application
  await db.insert(loanApplications).values([
    { firstName: 'Jane', lastName: 'Demo', email: 'jane.demo@example.com', phone: '(404) 555-8888', loanType: 'fha', isRefinance: false, purchasePrice: '285000', downPayment: '9975', propertyCity: 'Atlanta', propertyState: 'GA', propertyZip: '30301', propertyType: 'single_family', propertyUsage: 'primary_residence', employmentStatus: 'employed', employerName: 'Acme Corp', jobTitle: 'Marketing Manager', grossMonthlyIncome: '6500', estimatedCreditScore: 'good', status: 'new', emailConsent: true, smsConsent: false, assignedOfficerId: officers[0]?.id ?? null },
  ]);

  // Site Settings
  await db.insert(siteSettings).values([
    { key: 'company_name', value: 'KLE Mortgage Financing, LLC', type: 'string', description: 'Legal company name' },
    { key: 'company_phone', value: '(404) 555-1234', type: 'string', description: 'Main contact phone' },
    { key: 'company_email', value: 'info@klemortgage.com', type: 'string', description: 'Main contact email' },
    { key: 'company_nmls', value: '2380070', type: 'string', description: 'NMLS company number' },
    { key: 'company_address', value: 'Atlanta, GA', type: 'string', description: 'Office location' },
    { key: 'company_license_states', value: 'GA, FL, TX', type: 'string', description: 'Licensed states' },
  ]);

  console.log('Seeded site settings, leads, and applications');
  console.log('✓ Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
