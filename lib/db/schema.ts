import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const loanTypeEnum = pgEnum('loan_type', [
  'conventional',
  'fha',
  'va',
  'usda',
  'jumbo',
  'refinance',
  'first_time_buyer',
  'other',
]);

export const applicationStatusEnum = pgEnum('application_status', [
  'new',
  'in_review',
  'approved',
  'funded',
  'closed',
  'denied',
]);

export const leadStatusEnum = pgEnum('lead_status', [
  'new',
  'contacted',
  'qualified',
  'closed',
  'lost',
]);

export const leadSourceTypeEnum = pgEnum('lead_source_type', [
  'contact_form',
  'apply_now',
  'calculator',
  'loan_program',
  'refinance',
]);

export const blogCategoryEnum = pgEnum('blog_category', [
  'market_update',
  'buying_tips',
  'mortgage_tips',
  'first_time_buyer',
  'refinancing',
  'company_news',
]);

export const siteSettingTypeEnum = pgEnum('site_setting_type', [
  'string',
  'number',
  'boolean',
  'json',
]);

export const employmentStatusEnum = pgEnum('employment_status', [
  'employed',
  'self_employed',
  'retired',
  'other',
]);

export const propertyTypeEnum = pgEnum('property_type_mortgage', [
  'single_family',
  'condo',
  'townhouse',
  'multi_family',
  'manufactured',
  'other',
]);

export const propertyUsageEnum = pgEnum('property_usage', [
  'primary_residence',
  'secondary_home',
  'investment_property',
]);

// ─── Tables ───────────────────────────────────────────────────────────────────

export const loanOfficers = pgTable('loan_officers', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  nmlsNumber: varchar('nmls_number', { length: 50 }).notNull(),
  phone: varchar('phone', { length: 30 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  bio: text('bio').notNull(),
  photoUrl: varchar('photo_url', { length: 500 }),
  specialties: jsonb('specialties').$type<string[]>().default([]),
  languages: jsonb('languages').$type<string[]>().default([]),
  yearsExperience: integer('years_experience').notNull().default(0),
  licenseState: jsonb('license_state').$type<string[]>().default([]),
  linkedinUrl: varchar('linkedin_url', { length: 500 }),
  facebookUrl: varchar('facebook_url', { length: 500 }),
  isFounder: boolean('is_founder').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const loanApplications = pgTable('loan_applications', {
  id: serial('id').primaryKey(),
  // Borrower Info
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }).notNull(),
  dateOfBirth: varchar('date_of_birth', { length: 20 }),
  ssn: varchar('ssn', { length: 20 }), // stored encrypted in production
  // Property Info
  propertyAddress: varchar('property_address', { length: 500 }),
  propertyCity: varchar('property_city', { length: 100 }),
  propertyState: varchar('property_state', { length: 50 }),
  propertyZip: varchar('property_zip', { length: 20 }),
  propertyType: propertyTypeEnum('property_type'),
  propertyUsage: propertyUsageEnum('property_usage'),
  purchasePrice: numeric('purchase_price', { precision: 12, scale: 2 }),
  downPayment: numeric('down_payment', { precision: 12, scale: 2 }),
  // Loan Info
  loanType: loanTypeEnum('loan_type').notNull(),
  loanAmount: numeric('loan_amount', { precision: 12, scale: 2 }),
  isRefinance: boolean('is_refinance').notNull().default(false),
  currentLoanBalance: numeric('current_loan_balance', { precision: 12, scale: 2 }),
  // Employment
  employmentStatus: employmentStatusEnum('employment_status'),
  employerName: varchar('employer_name', { length: 255 }),
  jobTitle: varchar('job_title', { length: 255 }),
  yearsEmployed: numeric('years_employed', { precision: 4, scale: 1 }),
  // Income
  grossMonthlyIncome: numeric('gross_monthly_income', { precision: 12, scale: 2 }),
  otherIncome: numeric('other_income', { precision: 12, scale: 2 }),
  // Credit
  estimatedCreditScore: varchar('estimated_credit_score', { length: 50 }),
  // Admin
  status: applicationStatusEnum('status').notNull().default('new'),
  assignedOfficerId: integer('assigned_officer_id').references(() => loanOfficers.id),
  notes: text('notes'),
  documents: jsonb('documents').$type<{ name: string; url: string; uploadedAt: string }[]>().default([]),
  smsConsent: boolean('sms_consent').notNull().default(false),
  emailConsent: boolean('email_consent').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  interest: varchar('interest', { length: 100 }),
  message: text('message'),
  sourcePage: varchar('source_page', { length: 255 }),
  sourceType: leadSourceTypeEnum('source_type').notNull().default('contact_form'),
  status: leadStatusEnum('status').notNull().default('new'),
  assignedOfficerId: integer('assigned_officer_id').references(() => loanOfficers.id),
  notes: text('notes'),
  smsConsent: boolean('sms_consent').notNull().default(false),
  emailConsent: boolean('email_consent').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  authorId: integer('author_id').references(() => loanOfficers.id),
  category: blogCategoryEnum('category').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  readTimeMinutes: integer('read_time_minutes').notNull().default(5),
  viewCount: integer('view_count').notNull().default(0),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: varchar('seo_description', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  reviewerName: varchar('reviewer_name', { length: 255 }).notNull(),
  reviewerAvatarUrl: varchar('reviewer_avatar_url', { length: 500 }),
  rating: integer('rating').notNull(),
  reviewText: text('review_text').notNull(),
  loanType: loanTypeEnum('loan_type').notNull(),
  location: varchar('location', { length: 255 }),
  isFeatured: boolean('is_featured').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  verified: boolean('verified').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const loanPrograms = pgTable('loan_programs', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  type: loanTypeEnum('type').notNull(),
  tagline: varchar('tagline', { length: 500 }),
  description: text('description').notNull(),
  features: jsonb('features').$type<string[]>().default([]),
  requirements: jsonb('requirements').$type<string[]>().default([]),
  minDownPayment: varchar('min_down_payment', { length: 50 }),
  minCreditScore: integer('min_credit_score'),
  maxLoanAmount: varchar('max_loan_amount', { length: 100 }),
  bestFor: jsonb('best_for').$type<string[]>().default([]),
  isActive: boolean('is_active').notNull().default(true),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value').notNull(),
  type: siteSettingTypeEnum('type').notNull().default('string'),
  description: varchar('description', { length: 500 }),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const loanOfficersRelations = relations(loanOfficers, ({ many }) => ({
  applications: many(loanApplications),
  leads: many(leads),
  blogPosts: many(blogPosts),
}));

export const loanApplicationsRelations = relations(loanApplications, ({ one }) => ({
  assignedOfficer: one(loanOfficers, {
    fields: [loanApplications.assignedOfficerId],
    references: [loanOfficers.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  assignedOfficer: one(loanOfficers, {
    fields: [leads.assignedOfficerId],
    references: [loanOfficers.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(loanOfficers, {
    fields: [blogPosts.authorId],
    references: [loanOfficers.id],
  }),
}));
