var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  authSettings: () => authSettings,
  authSettingsRelations: () => authSettingsRelations,
  cards: () => cards,
  cardsRelations: () => cardsRelations,
  categories: () => categories,
  categoriesRelations: () => categoriesRelations,
  certificateBatchItems: () => certificateBatchItems,
  certificateBatchItemsRelations: () => certificateBatchItemsRelations,
  certificateBatches: () => certificateBatches,
  certificateBatchesRelations: () => certificateBatchesRelations,
  certificateShares: () => certificateShares,
  certificateSharesRelations: () => certificateSharesRelations,
  certificateViews: () => certificateViews,
  certificateViewsRelations: () => certificateViewsRelations,
  certificates: () => certificates,
  certificatesRelations: () => certificatesRelations,
  fonts: () => fonts,
  fontsRelations: () => fontsRelations,
  insertCardSchema: () => insertCardSchema,
  insertCategorySchema: () => insertCategorySchema,
  insertCertificateBatchItemSchema: () => insertCertificateBatchItemSchema,
  insertCertificateBatchSchema: () => insertCertificateBatchSchema,
  insertCertificateSchema: () => insertCertificateSchema,
  insertFontSchema: () => insertFontSchema,
  insertLayerSchema: () => insertLayerSchema,
  insertSeoSchema: () => insertSeoSchema,
  insertSettingSchema: () => insertSettingSchema,
  insertTemplateFieldSchema: () => insertTemplateFieldSchema,
  insertTemplateLogoSchema: () => insertTemplateLogoSchema,
  insertTemplateSchema: () => insertTemplateSchema,
  insertUserLogoSchema: () => insertUserLogoSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSignatureSchema: () => insertUserSignatureSchema,
  layers: () => layers,
  layersRelations: () => layersRelations,
  seo: () => seo,
  seoRelations: () => seoRelations,
  sessions: () => sessions,
  settings: () => settings,
  templateFields: () => templateFields,
  templateFieldsRelations: () => templateFieldsRelations,
  templateLogos: () => templateLogos,
  templateLogosRelations: () => templateLogosRelations,
  templates: () => templates,
  templatesRelations: () => templatesRelations,
  userLogos: () => userLogos,
  userLogosRelations: () => userLogosRelations,
  userSignatures: () => userSignatures,
  userSignaturesRelations: () => userSignaturesRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var users, insertUserSchema, categories, insertCategorySchema, templates, layers, templateFields, userLogos, userSignatures, templateLogos, cards, certificates, seo, fonts, settings, certificateBatches, certificateBatchItems, insertTemplateSchema, insertLayerSchema, insertTemplateFieldSchema, insertUserLogoSchema, insertUserSignatureSchema, insertTemplateLogoSchema, insertCardSchema, insertCertificateSchema, insertSeoSchema, insertFontSchema, insertSettingSchema, insertCertificateBatchSchema, insertCertificateBatchItemSchema, layersRelations, templateFieldsRelations, userLogosRelations, userSignaturesRelations, templateLogosRelations, cardsRelations, certificatesRelations, seoRelations, templatesRelations, usersRelations, categoriesRelations, certificateBatchesRelations, certificateBatchItemsRelations, fontsRelations, authSettings, authSettingsRelations, sessions, certificateViews, certificateViewsRelations, certificateShares, certificateSharesRelations;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
      // كلمة المرور إلزامية في البنية الحالية
      fullName: text("full_name").notNull(),
      email: text("email").notNull(),
      isAdmin: boolean("is_admin").default(false),
      role: text("role").default("user"),
      // دور المستخدم: admin, user, moderator, etc.
      createdAt: timestamp("created_at").notNull().defaultNow(),
      // الحقول التالية غير موجودة في بنية الجدول الحالية
      // يمكن إضافتها لاحقاً بعد ترقية قاعدة البيانات
      active: boolean("active").default(true).notNull(),
      lastLogin: timestamp("last_login"),
      profileImageUrl: text("profile_image_url"),
      // رابط صورة الملف الشخصي
      provider: text("provider"),
      // المزود (google, facebook, twitter, linkedin)
      providerId: text("provider_id"),
      // معرف المستخدم لدى المزود
      providerData: json("provider_data").default({}),
      // بيانات إضافية من المزود
      verifiedEmail: boolean("verified_email").default(false),
      // هل تم التحقق من البريد الإلكتروني
      locale: text("locale").default("ar"),
      // لغة المستخدم المفضلة
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true,
      fullName: true,
      email: true,
      isAdmin: true,
      role: true,
      active: true,
      profileImageUrl: true,
      provider: true,
      providerId: true,
      providerData: true,
      verifiedEmail: true,
      locale: true,
      lastLogin: true,
      // ✅ أضف هذا
      updatedAt: true
      // ✅ وأضف هذا
    });
    categories = pgTable("categories", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      slug: text("slug").notNull().unique(),
      description: text("description"),
      displayOrder: integer("display_order").notNull().default(0),
      icon: text("icon"),
      // Category icon
      active: boolean("active").default(true).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertCategorySchema = createInsertSchema(categories).pick({
      name: true,
      slug: true,
      description: true,
      displayOrder: true,
      icon: true,
      active: true
    });
    templates = pgTable("templates", {
      id: serial("id").primaryKey(),
      title: text("title").notNull(),
      titleAr: text("title_ar"),
      // Arabic title
      slug: text("slug").notNull(),
      categoryId: integer("category_id").notNull().references(() => categories.id),
      imageUrl: text("image_url").notNull(),
      thumbnailUrl: text("thumbnail_url"),
      displayOrder: integer("display_order").notNull().default(0),
      fields: json("fields").notNull().default([]).$type(),
      // Fields that this template requires
      defaultValues: json("default_values").default({}),
      // Default values for fields
      settings: json("settings").default({}),
      // Font, color, position settings
      active: boolean("active").default(true).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    layers = pgTable("layers", {
      id: serial("id").primaryKey(),
      templateId: integer("template_id").notNull().references(() => templates.id),
      name: text("name").notNull(),
      type: text("type").notNull(),
      // text, image, shape, etc.
      properties: json("properties").notNull().default({}),
      // position, size, color, etc.
      content: text("content"),
      // text content if applicable
      zIndex: integer("z_index").notNull().default(0),
      required: boolean("required").default(false).notNull(),
      displayOrder: integer("display_order").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    templateFields = pgTable("template_fields", {
      id: serial("id").primaryKey(),
      templateId: integer("template_id").notNull().references(() => templates.id),
      name: text("name").notNull(),
      label: text("label").notNull(),
      labelAr: text("label_ar"),
      // النسخة العربية للتسمية
      type: text("type").notNull(),
      // text, number, date, select, etc.
      imageType: text("image_type"),
      // نوع الصورة إذا كان الحقل من نوع صورة
      required: boolean("required").default(false).notNull(),
      defaultValue: text("default_value"),
      placeholder: text("placeholder"),
      placeholderAr: text("placeholder_ar"),
      // النسخة العربية للنص التوضيحي
      options: json("options").default([]).$type(),
      // options for select fields
      position: json("position").default({}),
      // موقع الحقل
      style: json("style").default({}),
      // نمط الحقل
      displayOrder: integer("display_order").notNull().default(0)
    });
    userLogos = pgTable("user_logos", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      name: text("name").notNull(),
      imageUrl: text("image_url").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    userSignatures = pgTable("user_signatures", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      name: text("name").notNull(),
      imageUrl: text("image_url").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    templateLogos = pgTable("template_logos", {
      id: serial("id").primaryKey(),
      templateId: integer("template_id").notNull().references(() => templates.id),
      name: text("name").notNull(),
      imageUrl: text("image_url").notNull(),
      position: json("position").default({}).$type(),
      // position on the template
      zIndex: integer("z_index").notNull().default(0),
      required: boolean("required").default(false).notNull(),
      displayOrder: integer("display_order").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow()
    });
    cards = pgTable("cards", {
      id: serial("id").primaryKey(),
      templateId: integer("template_id").notNull().references(() => templates.id),
      userId: integer("user_id").references(() => users.id),
      formData: json("form_data").notNull(),
      imageUrl: text("image_url").notNull(),
      thumbnailUrl: text("thumbnail_url"),
      categoryId: integer("category_id").notNull().references(() => categories.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      lastAccessed: timestamp("last_accessed"),
      quality: text("quality").default("medium"),
      publicId: text("public_id").unique(),
      accessCount: integer("access_count").default(0).notNull(),
      settings: json("settings").default({}),
      status: text("status").default("active").notNull()
    });
    certificates = pgTable("certificates", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      templateId: integer("template_id").references(() => templates.id),
      title: text("title").notNull(),
      code: text("code").notNull().unique(),
      data: json("data").default({}),
      // field values
      imageUrl: text("image_url"),
      isVerified: boolean("is_verified").default(false).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    seo = pgTable("seo", {
      id: serial("id").primaryKey(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      keywords: json("keywords").default([]),
      entityType: text("entity_type").notNull(),
      entityId: integer("entity_id"),
      canonicalUrl: text("canonical_url"),
      ogImage: text("og_image"),
      structuredData: json("structured_data").default({}),
      noIndex: boolean("no_index").default(false),
      updatedBy: integer("updated_by").references(() => users.id),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    fonts = pgTable("fonts", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      nameAr: text("name_ar"),
      family: text("family").notNull(),
      type: text("type").default("sans-serif"),
      url: text("url").notNull(),
      displayOrder: integer("display_order").default(0).notNull(),
      active: boolean("active").default(true).notNull(),
      isRtl: boolean("is_rtl").default(false),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    settings = pgTable("settings", {
      id: serial("id").primaryKey(),
      key: text("key").notNull().unique(),
      value: text("value"),
      category: text("category").default("general").notNull(),
      description: text("description"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    certificateBatches = pgTable("certificate_batches", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      name: text("name").notNull(),
      templateId: integer("template_id").references(() => templates.id),
      status: text("status").default("draft").notNull(),
      totalItems: integer("total_items").default(0).notNull(),
      processedItems: integer("processed_items").default(0).notNull(),
      errorItems: integer("error_items").default(0).notNull(),
      data: json("data").default({}),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    certificateBatchItems = pgTable("certificate_batch_items", {
      id: serial("id").primaryKey(),
      batchId: integer("batch_id").notNull().references(() => certificateBatches.id),
      rowNumber: integer("row_number").default(0).notNull(),
      certificateId: integer("certificate_id").references(() => certificates.id),
      recipientName: text("recipient_name").notNull(),
      recipientEmail: text("recipient_email"),
      status: text("status").default("pending").notNull(),
      errorMessage: text("error_message"),
      data: json("data").default({}),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
    });
    insertTemplateSchema = createInsertSchema(templates, {
      // إضافة قواعد التحقق المخصصة لبعض الحقول
      title: (schema) => schema.min(1, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0637\u0644\u0648\u0628"),
      categoryId: (schema) => schema.int("\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0631\u0642\u0645\u0627\u064B")
    }).pick({
      title: true,
      titleAr: true,
      slug: true,
      categoryId: true,
      imageUrl: true,
      thumbnailUrl: true,
      displayOrder: true,
      fields: true,
      defaultValues: true,
      settings: true,
      active: true
    });
    insertLayerSchema = createInsertSchema(layers).pick({
      templateId: true,
      name: true,
      type: true,
      properties: true,
      content: true,
      zIndex: true,
      required: true,
      displayOrder: true
    });
    insertTemplateFieldSchema = createInsertSchema(templateFields).pick({
      templateId: true,
      name: true,
      label: true,
      labelAr: true,
      type: true,
      imageType: true,
      required: true,
      defaultValue: true,
      placeholder: true,
      placeholderAr: true,
      options: true,
      position: true,
      style: true,
      displayOrder: true
    });
    insertUserLogoSchema = createInsertSchema(userLogos).pick({
      userId: true,
      name: true,
      imageUrl: true
    });
    insertUserSignatureSchema = createInsertSchema(userSignatures).pick({
      userId: true,
      name: true,
      imageUrl: true
    });
    insertTemplateLogoSchema = createInsertSchema(templateLogos).pick({
      templateId: true,
      name: true,
      imageUrl: true,
      position: true,
      zIndex: true,
      required: true,
      displayOrder: true
    });
    insertCardSchema = createInsertSchema(cards).pick({
      userId: true,
      templateId: true,
      formData: true,
      imageUrl: true,
      thumbnailUrl: true,
      categoryId: true,
      quality: true,
      publicId: true,
      settings: true,
      status: true
    });
    insertCertificateSchema = createInsertSchema(certificates).pick({
      userId: true,
      templateId: true,
      title: true,
      code: true,
      data: true,
      imageUrl: true,
      isVerified: true
    });
    insertSeoSchema = createInsertSchema(seo).pick({
      path: true,
      title: true,
      description: true,
      keywords: true,
      updatedBy: true
    });
    insertFontSchema = createInsertSchema(fonts).pick({
      name: true,
      nameAr: true,
      family: true,
      category: true,
      url: true,
      displayOrder: true,
      active: true
    });
    insertSettingSchema = createInsertSchema(settings).pick({
      key: true,
      value: true,
      category: true,
      description: true
    });
    insertCertificateBatchSchema = createInsertSchema(certificateBatches).pick({
      userId: true,
      name: true,
      templateId: true,
      status: true,
      totalItems: true,
      processedItems: true,
      errorItems: true,
      data: true
    });
    insertCertificateBatchItemSchema = createInsertSchema(certificateBatchItems).pick({
      batchId: true,
      rowNumber: true,
      certificateId: true,
      recipientName: true,
      recipientEmail: true,
      status: true,
      errorMessage: true,
      data: true
    });
    layersRelations = relations(layers, ({ one }) => ({
      template: one(templates, { fields: [layers.templateId], references: [templates.id] })
    }));
    templateFieldsRelations = relations(templateFields, ({ one }) => ({
      template: one(templates, { fields: [templateFields.templateId], references: [templates.id] })
    }));
    userLogosRelations = relations(userLogos, ({ one }) => ({
      user: one(users, { fields: [userLogos.userId], references: [users.id] })
    }));
    userSignaturesRelations = relations(userSignatures, ({ one }) => ({
      user: one(users, { fields: [userSignatures.userId], references: [users.id] })
    }));
    templateLogosRelations = relations(templateLogos, ({ one }) => ({
      template: one(templates, { fields: [templateLogos.templateId], references: [templates.id] })
    }));
    cardsRelations = relations(cards, ({ one }) => ({
      user: one(users, { fields: [cards.userId], references: [users.id] }),
      template: one(templates, { fields: [cards.templateId], references: [templates.id] })
    }));
    certificatesRelations = relations(certificates, ({ one }) => ({
      user: one(users, { fields: [certificates.userId], references: [users.id] }),
      template: one(templates, { fields: [certificates.templateId], references: [templates.id] })
    }));
    seoRelations = relations(seo, ({ one }) => ({
      user: one(users, { fields: [seo.updatedBy], references: [users.id] })
    }));
    templatesRelations = relations(templates, ({ one, many }) => ({
      category: one(categories, { fields: [templates.categoryId], references: [categories.id] }),
      layers: many(layers),
      fields: many(templateFields),
      logos: many(templateLogos),
      cards: many(cards),
      certificates: many(certificates)
    }));
    usersRelations = relations(users, ({ many }) => ({
      logos: many(userLogos),
      signatures: many(userSignatures),
      cards: many(cards),
      certificates: many(certificates)
    }));
    categoriesRelations = relations(categories, ({ many }) => ({
      templates: many(templates)
    }));
    certificateBatchesRelations = relations(certificateBatches, ({ one, many }) => ({
      user: one(users, { fields: [certificateBatches.userId], references: [users.id] }),
      template: one(templates, { fields: [certificateBatches.templateId], references: [templates.id] }),
      items: many(certificateBatchItems)
    }));
    certificateBatchItemsRelations = relations(certificateBatchItems, ({ one }) => ({
      batch: one(certificateBatches, { fields: [certificateBatchItems.batchId], references: [certificateBatches.id] }),
      certificate: one(certificates, { fields: [certificateBatchItems.certificateId], references: [certificates.id] })
    }));
    fontsRelations = relations(fonts, ({}) => ({}));
    authSettings = pgTable("auth_settings", {
      id: serial("id").primaryKey(),
      provider: text("provider").notNull().unique(),
      clientId: text("client_id"),
      clientSecret: text("client_secret"),
      redirectUri: text("redirect_uri"),
      enabled: boolean("enabled").default(false).notNull(),
      settings: json("settings").default({}),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      updatedBy: integer("updated_by").references(() => users.id)
    });
    authSettingsRelations = relations(authSettings, ({ one }) => ({
      updatedByUser: one(users, { fields: [authSettings.updatedBy], references: [users.id] })
    }));
    sessions = pgTable("session", {
      sid: text("sid").notNull().primaryKey(),
      sess: json("sess").notNull(),
      expire: timestamp("expire").notNull()
    });
    certificateViews = pgTable("certificate_views", {
      id: serial("id").primaryKey(),
      certificateId: integer("certificate_id").notNull().references(() => certificates.id),
      ip: text("ip"),
      userAgent: text("user_agent"),
      viewedAt: timestamp("viewed_at").notNull().defaultNow()
    });
    certificateViewsRelations = relations(certificateViews, ({ one }) => ({
      certificate: one(certificates, { fields: [certificateViews.certificateId], references: [certificates.id] })
    }));
    certificateShares = pgTable("certificate_shares", {
      id: serial("id").primaryKey(),
      certificateId: integer("certificate_id").notNull().references(() => certificates.id),
      platform: text("platform"),
      ip: text("ip"),
      sharedAt: timestamp("shared_at").notNull().defaultNow()
    });
    certificateSharesRelations = relations(certificateShares, ({ one }) => ({
      certificate: one(certificates, { fields: [certificateShares.certificateId], references: [certificates.id] })
    }));
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  checkDatabaseConnection: () => checkDatabaseConnection,
  db: () => db,
  dbInfo: () => dbInfo,
  pool: () => pool,
  withDatabaseRetry: () => withDatabaseRetry
});
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
async function checkDatabaseConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("\u2705 Database connection is working");
    return true;
  } catch (error) {
    console.error("\u274C Database connection error:", error);
    return false;
  }
}
async function withDatabaseRetry(operation, maxRetries = 3, delay = 1e3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`\u0645\u062D\u0627\u0648\u0644\u0629 \u0641\u0627\u0634\u0644\u0629 ${attempt}/${maxRetries}:`, error);
      if (attempt < maxRetries) {
        await new Promise((resolve2) => setTimeout(resolve2, delay * attempt));
      }
    }
  }
  throw lastError;
}
var pool, db, dbInfo;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    if (process.env.NODE_ENV === "production") {
      const envPath = path.resolve(process.cwd(), "production.env");
      if (fs.existsSync(envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(envPath));
        for (const key in envConfig) {
          process.env[key] = envConfig[key];
        }
        console.log("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 production.env \u0628\u0646\u062C\u0627\u062D");
      } else {
        console.warn("\u26A0\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0644\u0641 production.env");
      }
    } else {
      dotenv.config();
      console.log("\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 .env \u0628\u0646\u062C\u0627\u062D");
    }
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL \u063A\u064A\u0631 \u0645\u062D\u062F\u062F. \u0647\u0644 \u0646\u0633\u064A\u062A \u062A\u0643\u0648\u064A\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\u061F"
      );
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      // الحد الأقصى لعدد الاتصالات في المجمع
      idleTimeoutMillis: 3e4,
      // وقت الخمول قبل إغلاق اتصال غير مستخدم
      connectionTimeoutMillis: 1e4
      // وقت انتهاء المهلة عند محاولة إنشاء اتصال جديد
    });
    pool.query("SELECT NOW()").then(() => {
      console.log("\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }).catch((err) => {
      console.error("\u274C \u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", err);
    });
    db = drizzle({ client: pool, schema: schema_exports });
    console.log("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D");
    console.log("==== \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A ====");
    console.log("\u{1F310} \u0627\u0644\u0628\u064A\u0626\u0629:", process.env.NODE_ENV === "production" ? "\u0625\u0646\u062A\u0627\u062C" : "\u062A\u0637\u0648\u064A\u0631 (Replit)");
    console.log("\u{1F504} \u0646\u0648\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", process.env.DATABASE_URL.includes("neon") ? "neon-postgres" : "postgres");
    dbInfo = {
      type: process.env.DATABASE_URL.includes("neon") ? "neon-postgres" : "postgres",
      environment: process.env.NODE_ENV || "development",
      checkConnection: checkDatabaseConnection
    };
  }
});

// server/storage.ts
import { eq, and, desc, sql, like, asc, or } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { randomBytes } from "crypto";
var PostgresSessionStore, sessionStore, DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    init_db();
    PostgresSessionStore = connectPg(session);
    sessionStore = new PostgresSessionStore({
      pool,
      // نتجنب إنشاء الجدول مرة أخرى لأنه موجود بالفعل
      createTableIfMissing: false,
      tableName: "session"
    });
    DatabaseStorage = class {
      sessionStore;
      constructor() {
        this.sessionStore = sessionStore;
        this.initializeData();
      }
      // Initialize with sample data if empty
      async initializeData() {
        try {
          const existingCategories = await db.select().from(categories).limit(1);
          if (existingCategories.length === 0) {
            console.log("Initializing database with sample data...");
            const categoriesData = [
              {
                name: "\u062F\u0639\u0648\u0627\u062A \u0632\u0641\u0627\u0641",
                nameAr: "\u062F\u0639\u0648\u0627\u062A \u0632\u0641\u0627\u0641",
                slug: "wedding",
                displayOrder: 1,
                description: "\u062F\u0639\u0648\u0627\u062A \u0632\u0641\u0627\u0641 \u0645\u062A\u0646\u0648\u0639\u0629",
                descriptionAr: "\u062F\u0639\u0648\u0627\u062A \u0632\u0641\u0627\u0641 \u0645\u062A\u0646\u0648\u0639\u0629",
                active: true,
                icon: "\u{1F48D}"
              },
              {
                name: "\u062F\u0639\u0648\u0627\u062A \u062E\u0637\u0648\u0628\u0629",
                nameAr: "\u062F\u0639\u0648\u0627\u062A \u062E\u0637\u0648\u0628\u0629",
                slug: "engagement",
                displayOrder: 2,
                description: "\u062F\u0639\u0648\u0627\u062A \u062E\u0637\u0648\u0628\u0629 \u0645\u062A\u0646\u0648\u0639\u0629",
                descriptionAr: "\u062F\u0639\u0648\u0627\u062A \u062E\u0637\u0648\u0628\u0629 \u0645\u062A\u0646\u0648\u0639\u0629",
                active: true,
                icon: "\u{1F491}"
              },
              {
                name: "\u062A\u0647\u0646\u0626\u0629 \u062A\u062E\u0631\u062C",
                nameAr: "\u062A\u0647\u0646\u0626\u0629 \u062A\u062E\u0631\u062C",
                slug: "graduation",
                displayOrder: 3,
                description: "\u0634\u0647\u0627\u062F\u0627\u062A \u0648\u0628\u0637\u0627\u0642\u0627\u062A \u062A\u062E\u0631\u062C",
                descriptionAr: "\u0634\u0647\u0627\u062F\u0627\u062A \u0648\u0628\u0637\u0627\u0642\u0627\u062A \u062A\u062E\u0631\u062C",
                active: true,
                icon: "\u{1F393}"
              },
              {
                name: "\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u064A\u062F",
                nameAr: "\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u064A\u062F",
                slug: "eid",
                displayOrder: 4,
                description: "\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u064A\u062F \u0627\u0644\u0641\u0637\u0631 \u0648\u0627\u0644\u0623\u0636\u062D\u0649",
                descriptionAr: "\u0628\u0637\u0627\u0642\u0627\u062A \u0639\u064A\u062F \u0627\u0644\u0641\u0637\u0631 \u0648\u0627\u0644\u0623\u0636\u062D\u0649",
                active: true,
                icon: "\u{1F389}"
              },
              {
                name: "\u0628\u0637\u0627\u0642\u0627\u062A \u0631\u0645\u0636\u0627\u0646\u064A\u0629",
                nameAr: "\u0628\u0637\u0627\u0642\u0627\u062A \u0631\u0645\u0636\u0627\u0646\u064A\u0629",
                slug: "ramadan",
                displayOrder: 5,
                description: "\u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0647\u0646\u0626\u0629 \u0631\u0645\u0636\u0627\u0646 \u0643\u0631\u064A\u0645",
                descriptionAr: "\u0628\u0637\u0627\u0642\u0627\u062A \u062A\u0647\u0646\u0626\u0629 \u0631\u0645\u0636\u0627\u0646 \u0643\u0631\u064A\u0645",
                active: true,
                icon: "\u{1F319}"
              },
              {
                name: "\u0634\u0647\u0627\u062F\u0627\u062A \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631",
                nameAr: "\u0634\u0647\u0627\u062F\u0627\u062A \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631",
                slug: "certificates",
                displayOrder: 6,
                description: "\u0634\u0647\u0627\u062F\u0627\u062A \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631 \u0645\u062A\u0646\u0648\u0639\u0629",
                descriptionAr: "\u0634\u0647\u0627\u062F\u0627\u062A \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631 \u0645\u062A\u0646\u0648\u0639\u0629",
                active: true,
                icon: "\u{1F4DC}"
              }
            ];
            for (const category of categoriesData) {
              await this.createCategory(category);
            }
            const weddingCategory = await this.getCategoryBySlug("wedding");
            const eidCategory = await this.getCategoryBySlug("eid");
            const ramadanCategory = await this.getCategoryBySlug("ramadan");
            const graduationCategory = await this.getCategoryBySlug("graduation");
            const engagementCategory = await this.getCategoryBySlug("engagement");
            const certificatesCategory = await this.getCategoryBySlug("certificates");
            if (weddingCategory && eidCategory && ramadanCategory && graduationCategory && engagementCategory && certificatesCategory) {
              const templatesData = [
                {
                  title: "\u062F\u0639\u0648\u0629 \u0632\u0641\u0627\u0641 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629",
                  titleAr: "\u062F\u0639\u0648\u0629 \u0632\u0641\u0627\u0641 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629",
                  slug: "Wedding11",
                  categoryId: weddingCategory.id,
                  imageUrl: "/static/wedding-template.svg",
                  displayOrder: 1,
                  fields: ["groomName", "brideName", "weddingDate", "weddingTime", "weddingLocation", "additionalNotes"],
                  defaultValues: {
                    additionalNotes: "\u0628\u0643\u0644 \u0627\u0644\u062D\u0628 \u0648\u0627\u0644\u062A\u0642\u062F\u064A\u0631\n\u0623\u062A\u0634\u0631\u0641 \u0628\u062F\u0639\u0648\u062A\u0643\u0645 \u0644\u062D\u0636\u0648\u0631\n\u062D\u0641\u0644 \u0632\u0648\u0627\u062C\u064A \u0648\u062A\u0646\u0627\u0648\u0644 \u0637\u0639\u0627\u0645 \u0627\u0644\u0639\u0634\u0627\u0621\n\u064A\u0648\u0645 \u0627\u0644\u062C\u0645\u0639\u0629 \n\u0627\u0644\u0645\u0648\u0627\u0641\u0642 \u0661\u0664\u0664\u0663/\u0661\u0660/\u0661\u0669 \u0647\u0640\n\u0642\u0627\u0639\u0629 \u0641\u0640\u0640\u0631\u062D\n\u062C\u062F\u0629 - \u0634\u0627\u0631\u0639 \u0627\u0644\u062C\u0627\u0645\u0639\u0629"
                  },
                  active: true,
                  settings: {
                    fontFamily: "Tajawal",
                    fontSize: 18,
                    textColor: "#000000",
                    backgroundColor: "#ffffff"
                  }
                },
                {
                  title: "\u0628\u0637\u0627\u0642\u0629 \u0631\u0645\u0636\u0627\u0646\u064A\u0629",
                  titleAr: "\u0628\u0637\u0627\u0642\u0629 \u0631\u0645\u0636\u0627\u0646\u064A\u0629",
                  slug: "Ramadan2",
                  categoryId: ramadanCategory.id,
                  imageUrl: "/static/ramadan-template.svg",
                  displayOrder: 1,
                  fields: ["sender", "recipient", "message", "userImage"],
                  defaultValues: {},
                  active: true,
                  settings: {
                    fontFamily: "Tajawal",
                    fontSize: 16,
                    textColor: "#ffffff",
                    backgroundColor: "#002C59"
                  }
                },
                {
                  title: "\u0628\u0637\u0627\u0642\u0629 \u0639\u064A\u062F",
                  titleAr: "\u0628\u0637\u0627\u0642\u0629 \u0639\u064A\u062F",
                  slug: "Eid4",
                  categoryId: eidCategory.id,
                  imageUrl: "/static/eid-template.svg",
                  displayOrder: 1,
                  fields: ["sender", "recipient", "message", "eidType", "userImage"],
                  defaultValues: {},
                  active: true,
                  settings: {
                    fontFamily: "Tajawal",
                    fontSize: 16,
                    textColor: "#5E35B1",
                    backgroundColor: "#ffffff"
                  }
                },
                {
                  title: "\u0634\u0647\u0627\u062F\u0629 \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631",
                  titleAr: "\u0634\u0647\u0627\u062F\u0629 \u0634\u0643\u0631 \u0648\u062A\u0642\u062F\u064A\u0631",
                  slug: "Certificate1",
                  categoryId: certificatesCategory.id,
                  imageUrl: "/static/certificate-template.svg",
                  displayOrder: 1,
                  fields: [
                    "issuedTo",
                    "issuedToGender",
                    "schoolName",
                    "reason",
                    "date",
                    "principalTitle",
                    "principalName",
                    "secondaryTitle",
                    "secondaryName",
                    "thirdTitle",
                    "thirdName",
                    "certificateType",
                    "logo1",
                    "logo2",
                    "logo3"
                  ],
                  defaultValues: {
                    reason: "\u0648\u0630\u0644\u0643 \u0646\u0638\u064A\u0631 \u062C\u0647\u0648\u062F\u0647 \u0641\u064A \u062A\u0641\u0639\u064A\u0644 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u064A\u0648\u0645 \u0627\u0644\u0648\u0637\u0646\u064A 93 \u0644\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629\n\u0648\u0628\u062F\u0648\u0631\u0646\u0627 \u0646\u0642\u062F\u0645 \u0644\u0647 \u0647\u0630\u0627 \u0627\u0644\u0634\u0643\u0631 \u0643\u062A\u0642\u062F\u064A\u0631 \u0644\u062C\u0647\u0648\u062F\u0647 \u0627\u0644\u0645\u0628\u0630\u0648\u0644\u0629\n\u0633\u0627\u0626\u0644\u064A\u0646 \u0627\u0644\u0644\u0647 \u0644\u0647 \u0645\u0632\u064A\u062F\u064B\u0627 \u0645\u0646 \u0627\u0644\u062A\u0641\u0648\u0642 \u0648\u0627\u0644\u0646\u062C\u0627\u062D",
                    principalTitle: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u062F\u0631\u0633\u0629",
                    secondaryTitle: "\u0627\u0644\u0645\u0634\u0631\u0641 \u0627\u0644\u062A\u0631\u0628\u0648\u064A",
                    thirdTitle: "\u0631\u0627\u0626\u062F \u0627\u0644\u0646\u0634\u0627\u0637"
                  },
                  active: true,
                  settings: {
                    fontFamily: "Tajawal",
                    certificateFontFamily: "DecoType Naskh",
                    fontSize: 18,
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                    borderColor: "#D4AF37",
                    borderWidth: 10
                  }
                }
              ];
              for (const template of templatesData) {
                await this.createTemplate(template);
              }
              const fontsData = [
                {
                  name: "Tajawal",
                  nameAr: "\u062A\u062C\u0648\u0644",
                  family: "Tajawal, sans-serif",
                  type: "google",
                  url: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap",
                  active: true,
                  isRtl: true,
                  displayOrder: 1
                },
                {
                  name: "Cairo",
                  nameAr: "\u0627\u0644\u0642\u0627\u0647\u0631\u0629",
                  family: "Cairo, sans-serif",
                  type: "google",
                  url: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap",
                  active: true,
                  isRtl: true,
                  displayOrder: 2
                },
                {
                  name: "Amiri",
                  nameAr: "\u0623\u0645\u064A\u0631\u064A",
                  family: "Amiri, serif",
                  type: "google",
                  url: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap",
                  active: true,
                  isRtl: true,
                  displayOrder: 3
                },
                {
                  name: "Lateef",
                  nameAr: "\u0644\u0637\u064A\u0641",
                  family: "Lateef, cursive",
                  type: "google",
                  url: "https://fonts.googleapis.com/css2?family=Lateef&display=swap",
                  active: true,
                  isRtl: true,
                  displayOrder: 4
                },
                {
                  name: "DecoType Naskh",
                  nameAr: "\u062F\u064A\u0643\u0648 \u062A\u0627\u064A\u0628 \u0646\u0633\u062E",
                  family: "DecoType Naskh",
                  type: "custom",
                  active: true,
                  isRtl: true,
                  displayOrder: 5
                }
              ];
              for (const font of fontsData) {
                await this.createFont(font);
              }
            }
          }
        } catch (error) {
          console.error("Error initializing data:", error);
        }
      }
      // User methods
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
      }
      async getUserByUsername(username) {
        try {
          const result = await db.execute(sql`
        SELECT * FROM users WHERE username = ${username}
      `);
          return result.rows?.[0];
        } catch (error) {
          console.error("Error in getUserByUsername:", error);
          return void 0;
        }
      }
      async getUserByEmail(email) {
        return this.getUserByUsername(email);
      }
      async getUserByProviderId(provider, providerId) {
        const [user] = await db.select().from(users).where(
          and(
            eq(users.provider, provider),
            eq(users.providerId, providerId)
          )
        );
        return user;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async updateUser(id, data) {
        const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
        return updatedUser;
      }
      async getAllUsers(options = {}) {
        const { limit = 100, offset = 0, search = "" } = options;
        let query = db.select().from(users);
        if (search) {
          query = query.where(
            or(
              like(users.username, `%${search}%`),
              like(users.fullName || "", `%${search}%`)
              // عمود البريد الإلكتروني غير موجود في بنية الجدول الحالية
            )
          );
        }
        const usersData = await query.limit(limit).offset(offset).orderBy(desc(users.id));
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(users).where(search ? or(
          like(users.username, `%${search}%`),
          like(users.fullName || "", `%${search}%`)
          // عمود البريد الإلكتروني غير موجود في بنية الجدول الحالية
        ) : sql`1=1`);
        return { users: usersData, total: Number(count3) };
      }
      async deleteUser(id) {
        const result = await db.delete(users).where(eq(users.id, id));
        return !!result;
      }
      // User Preferences methods
      async getUserPreferences(userId) {
        try {
          const query = `
        SELECT key, value
        FROM settings
        WHERE category = 'user_preferences'
        AND (key = $1 OR key = $2)
      `;
          const result = await pool.query(query, [`user_${userId}_layout`, `user_${userId}_theme`]);
          if (!result.rows || result.rows.length === 0) {
            return { layout: "boxed", theme: "light" };
          }
          const preferences = {
            layout: "boxed",
            // Default
            theme: "light"
            // Default
          };
          for (const row of result.rows) {
            try {
              if (row.key === `user_${userId}_layout`) {
                preferences.layout = typeof row.value === "string" ? row.value.startsWith('"') ? JSON.parse(row.value) : row.value : row.value;
              } else if (row.key === `user_${userId}_theme`) {
                preferences.theme = typeof row.value === "string" ? row.value.startsWith('"') ? JSON.parse(row.value) : row.value : row.value;
              }
            } catch (error) {
              console.error(`Error parsing preference value for ${row.key}:`, error);
              if (row.key === `user_${userId}_layout`) {
                preferences.layout = row.value;
              } else if (row.key === `user_${userId}_theme`) {
                preferences.theme = row.value;
              }
            }
          }
          return preferences;
        } catch (error) {
          console.error("Error getting user preferences:", error);
          return { layout: "boxed", theme: "light" };
        }
      }
      async saveUserPreferences(userId, preferences) {
        try {
          if (preferences.layout) {
            const layoutQuery = `
          INSERT INTO settings (key, value, category, description, updated_at)
          VALUES ($1, $2, $3, $4, NOW())
          ON CONFLICT (category, key) 
          DO UPDATE SET 
            value = $2,
            updated_at = NOW()
        `;
            await pool.query(
              layoutQuery,
              [
                `user_${userId}_layout`,
                JSON.stringify(preferences.layout),
                "user_preferences",
                "User layout preference"
              ]
            );
          }
          if (preferences.theme) {
            const themeQuery = `
          INSERT INTO settings (key, value, category, description, updated_at)
          VALUES ($1, $2, $3, $4, NOW())
          ON CONFLICT (category, key) 
          DO UPDATE SET 
            value = $2,
            updated_at = NOW()
        `;
            await pool.query(
              themeQuery,
              [
                `user_${userId}_theme`,
                JSON.stringify(preferences.theme),
                "user_preferences",
                "User theme preference"
              ]
            );
          }
          return true;
        } catch (error) {
          console.error("Error saving user preferences:", error);
          return false;
        }
      }
      // Auth Provider Settings methods
      async getAuthSettings(provider) {
        const query = `
      SELECT * FROM auth_settings
      WHERE provider = $1
      LIMIT 1
    `;
        try {
          const result = await pool.query(query, [provider]);
          return result.rows[0];
        } catch (error) {
          console.error("Error fetching auth settings:", error);
          return void 0;
        }
      }
      async getAllAuthSettings() {
        const query = `
      SELECT * FROM auth_settings
      ORDER BY provider
    `;
        try {
          const result = await pool.query(query);
          return result.rows;
        } catch (error) {
          console.error("Error fetching all auth settings:", error);
          return [];
        }
      }
      async updateAuthSettings(provider, settings2) {
        const { clientId, clientSecret, redirectUri, scope, enabled, additionalSettings, updatedBy } = settings2;
        const query = `
      UPDATE auth_settings 
      SET 
        client_id = COALESCE($1, client_id),
        client_secret = COALESCE($2, client_secret),
        redirect_uri = COALESCE($3, redirect_uri),
        scope = COALESCE($4, scope),
        enabled = COALESCE($5, enabled),
        additional_settings = COALESCE($6, additional_settings),
        updated_by = COALESCE($7, updated_by),
        updated_at = NOW()
      WHERE provider = $8
      RETURNING *
    `;
        try {
          const result = await pool.query(query, [
            clientId,
            clientSecret,
            redirectUri,
            scope,
            enabled,
            additionalSettings || {},
            updatedBy,
            provider
          ]);
          return result.rows[0];
        } catch (error) {
          console.error("Error updating auth settings:", error);
          return void 0;
        }
      }
      // Category methods
      async getAllCategories(options = {}) {
        const { active } = options;
        let query = db.select().from(categories);
        if (active !== void 0) {
          query = query.where(eq(categories.active, active));
        }
        return query.orderBy(asc(categories.displayOrder));
      }
      async getCategoryBySlug(slug) {
        const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
        return category;
      }
      async getCategoryById(id) {
        const [category] = await db.select().from(categories).where(eq(categories.id, id));
        return category;
      }
      async createCategory(insertCategory) {
        const [category] = await db.insert(categories).values(insertCategory).returning();
        return category;
      }
      async updateCategory(id, data) {
        const [updatedCategory] = await db.update(categories).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(categories.id, id)).returning();
        return updatedCategory;
      }
      async deleteCategory(id) {
        const result = await db.delete(categories).where(eq(categories.id, id));
        return !!result;
      }
      // Template methods
      async getAllTemplates(options = {}) {
        const { active, limit = 100, offset = 0, search = "" } = options;
        let query = db.select().from(templates);
        if (active !== void 0) {
          query = query.where(eq(templates.active, active));
        }
        if (search) {
          query = query.where(
            or(
              like(templates.title, `%${search}%`),
              like(templates.titleAr || "", `%${search}%`)
            )
          );
        }
        const templatesData = await query.limit(limit).offset(offset).orderBy(asc(templates.categoryId), asc(templates.displayOrder));
        const conditions = [];
        if (active !== void 0) {
          conditions.push(eq(templates.active, active));
        }
        if (search) {
          conditions.push(
            or(
              like(templates.title, `%${search}%`),
              like(templates.titleAr || "", `%${search}%`)
            )
          );
        }
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(templates).where(conditions.length ? and(...conditions) : sql`1=1`);
        return { templates: templatesData, total: Number(count3) };
      }
      async getTemplatesByCategory(categoryId, options = {}) {
        const { active } = options;
        let query = db.select().from(templates).where(eq(templates.categoryId, categoryId));
        if (active !== void 0) {
          query = query.where(eq(templates.active, active));
        }
        return query.orderBy(asc(templates.displayOrder));
      }
      async getTemplate(id) {
        const [template] = await db.select().from(templates).where(eq(templates.id, id));
        return template;
      }
      async getTemplateBySlug(categorySlug, idOrSlug) {
        console.log(`getTemplateBySlug - categorySlug: ${categorySlug}, idOrSlug: ${idOrSlug}`);
        const category = await this.getCategoryBySlug(categorySlug);
        if (!category) {
          console.log(`Category with slug ${categorySlug} not found`);
          return void 0;
        }
        console.log(`Category found: ${category.name}, ID: ${category.id}`);
        if (!isNaN(Number(idOrSlug))) {
          const templateId = Number(idOrSlug);
          console.log(`Searching for template by ID: ${templateId} in category ${category.name}`);
          const [templateById] = await db.select().from(templates).where(
            and(
              eq(templates.categoryId, category.id),
              eq(templates.id, templateId)
            )
          );
          if (templateById) {
            console.log(`Template found by ID: ${templateById.title}, ID: ${templateById.id}`);
            return templateById;
          }
          const template = await this.getTemplate(templateId);
          if (template) {
            console.log(`Template found by ID (any category): ${template.title}, ID: ${template.id}`);
            return template;
          }
        }
        console.log(`Searching for template by slug: ${idOrSlug} in category ${category.name}`);
        const [templateBySlug] = await db.select().from(templates).where(
          and(
            eq(templates.categoryId, category.id),
            eq(templates.slug, idOrSlug)
          )
        );
        if (templateBySlug) {
          console.log(`Template found by slug: ${templateBySlug.title}, ID: ${templateBySlug.id}`);
          return templateBySlug;
        }
        console.log(`No template found for category: ${categorySlug}, idOrSlug: ${idOrSlug}`);
        return void 0;
      }
      /**
       * الحصول على أعلى ترتيب موجود للقوالب
       * @returns رقم الترتيب الأعلى يزيد بواحد
       */
      async getNextTemplateDisplayOrder() {
        try {
          console.log("\u{1F504} \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0644\u0642\u0627\u0644\u0628...");
          const result = await withDatabaseRetry(async () => {
            return await db.select({ maxOrder: sql`COALESCE(MAX(${templates.displayOrder}), 0)` }).from(templates);
          }, 3, 1e3, [{ maxOrder: 0 }]);
          const maxOrder = result && result[0] && typeof result[0].maxOrder === "number" ? result[0].maxOrder : 0;
          const nextOrder = maxOrder + 1;
          console.log(`\u2705 \u062A\u0645 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u0627\u0644\u064A: ${nextOrder}`);
          return nextOrder;
        } catch (error) {
          console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u0642\u0635\u0649 \u062A\u0631\u062A\u064A\u0628 \u0644\u0644\u0642\u0648\u0627\u0644\u0628:", error);
          console.log("\u26A0\uFE0F \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0644\u0644\u062A\u0631\u062A\u064A\u0628: 1");
          return 1;
        }
      }
      /**
       * إنشاء slug تلقائي من عنوان القالب
       * @param title عنوان القالب
       * @returns المعرف الفريد slug
       */
      createSlugFromTitle(title) {
        console.log(`\u{1F504} \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 slug \u0645\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646: "${title}"`);
        if (!title || typeof title !== "string") {
          console.error("\u274C \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0644\u0625\u0646\u0634\u0627\u0621 slug");
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomStr = Math.random().toString(36).substring(2, 8);
          const fallbackSlug = `template-${timestamp2}-${randomStr}`;
          console.log(`\u26A0\uFE0F \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 slug \u0628\u062F\u064A\u0644 \u0639\u0634\u0648\u0627\u0626\u064A: ${fallbackSlug}`);
          return fallbackSlug;
        }
        try {
          let baseSlug = title.toLowerCase().replace(/[؀-ۿ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
          if (!baseSlug || baseSlug.length < 2) {
            console.log("\u26A0\uFE0F \u0644\u0645 \u064A\u0646\u062A\u062C \u0623\u064A slug \u0645\u0646\u0627\u0633\u0628 \u0645\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646\u060C \u0633\u064A\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0645\u0639\u0631\u0641 \u0639\u0634\u0648\u0627\u0626\u064A");
            const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
            const randomStr = Math.random().toString(36).substring(2, 8);
            baseSlug = `template-${timestamp2}-${randomStr}`;
          }
          console.log(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 slug \u0628\u0646\u062C\u0627\u062D: ${baseSlug}`);
          return baseSlug;
        } catch (error) {
          console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 slug:", error);
          const timestamp2 = (/* @__PURE__ */ new Date()).getTime();
          const randomStr = Math.random().toString(36).substring(2, 8);
          const errorSlug = `template-${timestamp2}-${randomStr}`;
          console.log(`\u26A0\uFE0F \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 slug \u0628\u062F\u064A\u0644 \u0628\u0633\u0628\u0628 \u0627\u0644\u062E\u0637\u0623: ${errorSlug}`);
          return errorSlug;
        }
      }
      async createTemplate(insertTemplate) {
        try {
          const templateData = { ...insertTemplate };
          if (!templateData.slug || templateData.slug.trim() === "") {
            templateData.slug = this.createSlugFromTitle(templateData.title);
            console.log(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 slug \u062A\u0644\u0642\u0627\u0626\u064A: ${templateData.slug}`);
          }
          if (!templateData.displayOrder || templateData.displayOrder <= 0) {
            templateData.displayOrder = await this.getNextTemplateDisplayOrder();
            console.log(`\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A: ${templateData.displayOrder}`);
          }
          const [template] = await db.insert(templates).values(templateData).returning();
          console.log(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F: ${template.title} (ID: ${template.id})`);
          return template;
        } catch (error) {
          console.error("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628:", error);
          throw error;
        }
      }
      async updateTemplate(id, data) {
        try {
          return await withDatabaseRetry(async () => {
            const template = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
            if (template.length === 0) {
              console.log(`\u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0644\u0644\u062A\u062D\u062F\u064A\u062B`);
              return void 0;
            }
            const updateData = { ...data };
            if ("active" in updateData) {
              updateData.active = Boolean(updateData.active);
              console.log(`\u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 ${updateData.active ? "\u0625\u0644\u0649 \u0646\u0634\u0637" : "\u0625\u0644\u0649 \u063A\u064A\u0631 \u0646\u0634\u0637"}`);
            }
            const [updatedTemplate] = await db.update(templates).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(templates.id, id)).returning();
            console.log(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id} \u0628\u0646\u062C\u0627\u062D`);
            return updatedTemplate;
          }, 3, 1e3);
        } catch (error) {
          console.error(`\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id}:`, error);
          return void 0;
        }
      }
      async deleteTemplate(id) {
        try {
          return await withDatabaseRetry(async () => {
            const template = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
            if (template.length === 0) {
              console.log(`\u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F`);
              return false;
            }
            await db.delete(templateFields).where(eq(templateFields.templateId, id));
            const result = await db.delete(templates).where(eq(templates.id, id));
            console.log(`\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id}:\u060C \u0627\u0644\u0646\u062A\u064A\u062C\u0629:`, result);
            return true;
          }, 3, 1e3, false);
        } catch (error) {
          console.error(`\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0631\u0642\u0645 ${id}:`, error);
          return false;
        }
      }
      // Template Fields methods
      async getTemplateFields(templateId) {
        return db.select().from(templateFields).where(eq(templateFields.templateId, templateId)).orderBy(asc(templateFields.displayOrder));
      }
      async getAllTemplateFields() {
        return db.select().from(templateFields).orderBy(asc(templateFields.templateId), asc(templateFields.displayOrder));
      }
      async getTemplateField(id) {
        const [field] = await db.select().from(templateFields).where(eq(templateFields.id, id));
        return field;
      }
      async createTemplateField(insertField) {
        const [field] = await db.insert(templateFields).values(insertField).returning();
        return field;
      }
      async updateTemplateField(id, data) {
        const [updatedField] = await db.update(templateFields).set(data).where(eq(templateFields.id, id)).returning();
        return updatedField;
      }
      async deleteTemplateField(id) {
        const result = await db.delete(templateFields).where(eq(templateFields.id, id));
        return !!result;
      }
      // Card methods
      async getCard(id) {
        const [card] = await db.select().from(cards).where(eq(cards.id, id));
        return card;
      }
      async getCardByPublicId(publicId) {
        const [card] = await db.select().from(cards).where(eq(cards.publicId, publicId));
        return card;
      }
      async getUserCards(userId, options = {}) {
        const { limit = 100, offset = 0 } = options;
        const cardsData = await db.select().from(cards).where(eq(cards.userId, userId)).limit(limit).offset(offset).orderBy(desc(cards.createdAt));
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(cards).where(eq(cards.userId, userId));
        return { cards: cardsData, total: Number(count3) };
      }
      async createCard(insertCard) {
        if (!insertCard.publicId) {
          insertCard.publicId = randomBytes(8).toString("hex");
        }
        const [card] = await db.insert(cards).values(insertCard).returning();
        return card;
      }
      async updateCard(id, data) {
        const [updatedCard] = await db.update(cards).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(cards.id, id)).returning();
        return updatedCard;
      }
      async deleteCard(id) {
        const result = await db.delete(cards).where(eq(cards.id, id));
        return !!result;
      }
      // Certificate methods
      async getCertificate(id) {
        const [certificate] = await db.select().from(certificates).where(eq(certificates.id, id));
        return certificate;
      }
      async getCertificateByPublicId(publicId) {
        const [certificate] = await db.select().from(certificates).where(eq(certificates.publicId, publicId));
        return certificate;
      }
      async getCertificateByVerificationCode(code) {
        const [certificate] = await db.select().from(certificates).where(eq(certificates.verificationCode, code));
        return certificate;
      }
      async getUserCertificates(userId, options = {}) {
        const { limit = 100, offset = 0, type } = options;
        let query = db.select().from(certificates).where(eq(certificates.userId, userId));
        if (type) {
          query = query.where(eq(certificates.certificateType, type));
        }
        const certificatesData = await query.limit(limit).offset(offset).orderBy(desc(certificates.createdAt));
        const conditions = [eq(certificates.userId, userId)];
        if (type) {
          conditions.push(eq(certificates.certificateType, type));
        }
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(certificates).where(and(...conditions));
        return { certificates: certificatesData, total: Number(count3) };
      }
      async createCertificate(insertCertificate) {
        if (!insertCertificate.publicId) {
          insertCertificate.publicId = randomBytes(8).toString("hex");
        }
        if (!insertCertificate.verificationCode) {
          insertCertificate.verificationCode = randomBytes(4).toString("hex").toUpperCase();
        }
        const [certificate] = await db.insert(certificates).values(insertCertificate).returning();
        return certificate;
      }
      async updateCertificate(id, data) {
        const [updatedCertificate] = await db.update(certificates).set(data).where(eq(certificates.id, id)).returning();
        return updatedCertificate;
      }
      async deleteCertificate(id) {
        const result = await db.delete(certificates).where(eq(certificates.id, id));
        return !!result;
      }
      // Batch Certificate methods
      async getCertificateBatch(id) {
        const [batch] = await db.select().from(certificateBatches).where(eq(certificateBatches.id, id));
        return batch;
      }
      async getUserCertificateBatches(userId, options = {}) {
        const { limit = 100, offset = 0 } = options;
        const batchesData = await db.select().from(certificateBatches).where(eq(certificateBatches.userId, userId)).limit(limit).offset(offset).orderBy(desc(certificateBatches.createdAt));
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(certificateBatches).where(eq(certificateBatches.userId, userId));
        return { batches: batchesData, total: Number(count3) };
      }
      async createCertificateBatch(insertBatch) {
        const [batch] = await db.insert(certificateBatches).values(insertBatch).returning();
        return batch;
      }
      async updateCertificateBatch(id, data) {
        const [updatedBatch] = await db.update(certificateBatches).set(data).where(eq(certificateBatches.id, id)).returning();
        return updatedBatch;
      }
      async deleteCertificateBatch(id) {
        const result = await db.delete(certificateBatches).where(eq(certificateBatches.id, id));
        return !!result;
      }
      // Batch Certificate Items methods
      async getBatchItem(id) {
        const [item] = await db.select().from(certificateBatchItems).where(eq(certificateBatchItems.id, id));
        return item;
      }
      async getBatchItems(batchId, options = {}) {
        const { limit = 100, offset = 0, status } = options;
        let query = db.select().from(certificateBatchItems).where(eq(certificateBatchItems.batchId, batchId));
        if (status) {
          query = query.where(eq(certificateBatchItems.status, status));
        }
        const itemsData = await query.limit(limit).offset(offset).orderBy(asc(certificateBatchItems.rowNumber));
        const conditions = [eq(certificateBatchItems.batchId, batchId)];
        if (status) {
          conditions.push(eq(certificateBatchItems.status, status));
        }
        const [{ count: count3 }] = await db.select({ count: sql`count(*)` }).from(certificateBatchItems).where(and(...conditions));
        return { items: itemsData, total: Number(count3) };
      }
      async createBatchItem(insertItem) {
        const [item] = await db.insert(certificateBatchItems).values(insertItem).returning();
        return item;
      }
      async updateBatchItem(id, data) {
        const [updatedItem] = await db.update(certificateBatchItems).set(data).where(eq(certificateBatchItems.id, id)).returning();
        return updatedItem;
      }
      async deleteBatchItem(id) {
        const result = await db.delete(certificateBatchItems).where(eq(certificateBatchItems.id, id));
        return !!result;
      }
      // Font methods
      async getAllFonts(options = {}) {
        const { active } = options;
        let query = db.select().from(fonts);
        if (active !== void 0) {
          query = query.where(eq(fonts.active, active));
        }
        return query.orderBy(asc(fonts.displayOrder));
      }
      async getFont(id) {
        const [font] = await db.select().from(fonts).where(eq(fonts.id, id));
        return font;
      }
      async createFont(insertFont) {
        const [font] = await db.insert(fonts).values(insertFont).returning();
        return font;
      }
      async updateFont(id, data) {
        const [updatedFont] = await db.update(fonts).set(data).where(eq(fonts.id, id)).returning();
        return updatedFont;
      }
      async deleteFont(id) {
        const result = await db.delete(fonts).where(eq(fonts.id, id));
        return !!result;
      }
      // Settings methods
      async getSetting(key) {
        const [setting] = await db.select().from(settings).where(eq(settings.key, key));
        return setting;
      }
      async getSettingsByCategory(category) {
        return db.select().from(settings).where(eq(settings.category, category)).orderBy(asc(settings.key));
      }
      async createOrUpdateSetting(insertSetting) {
        try {
          return await withDatabaseRetry(async () => {
            const settingData = {
              ...insertSetting,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            };
            console.log(
              `\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F ${settingData.category}/${settingData.key} \u0628\u0627\u0644\u0642\u064A\u0645\u0629:`,
              typeof settingData.value === "object" ? JSON.stringify(settingData.value) : settingData.value
            );
            const [existingSetting] = await db.select().from(settings).where(and(
              eq(settings.category, settingData.category ?? ""),
              eq(settings.key, settingData.key)
            ));
            if (existingSetting) {
              console.log(`\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0648\u062C\u0648\u062F: ${settingData.category}/${settingData.key}`);
              const [updatedSetting] = await db.update(settings).set({
                value: settingData.value,
                description: settingData.description || existingSetting.description,
                updatedAt: /* @__PURE__ */ new Date()
              }).where(and(
                eq(settings.category, settingData.category ?? ""),
                eq(settings.key, settingData.key)
              )).returning();
              return updatedSetting;
            } else {
              console.log(`\u0625\u0646\u0634\u0627\u0621 \u0625\u0639\u062F\u0627\u062F \u062C\u062F\u064A\u062F: ${settingData.category}/${settingData.key}`);
              const [setting] = await db.insert(settings).values(settingData).returning();
              return setting;
            }
          }, 3, 1e3);
        } catch (error) {
          console.error(`\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0623\u0648 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0639\u062F\u0627\u062F ${insertSetting.category}/${insertSetting.key}:`, error);
          try {
            console.log("\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 UPSERT \u0627\u0644\u0642\u064A\u0627\u0633\u064A...");
            const query = `
          INSERT INTO settings (category, key, value, description, created_at, updated_at)
          VALUES ($1, $2, $3, $4, NOW(), NOW())
          ON CONFLICT (category, key) DO UPDATE 
          SET value = $3, description = $4, updated_at = NOW() 
          RETURNING *;
        `;
            const result = await db.execute(query, [
              insertSetting.category,
              insertSetting.key,
              typeof insertSetting.value === "object" ? JSON.stringify(insertSetting.value) : String(insertSetting.value),
              insertSetting.description || `Setting for ${insertSetting.category}/${insertSetting.key}`
            ]);
            if (result && result[0]) {
              console.log("\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 UPSERT");
              return result[0];
            }
            throw new Error("\u0641\u0634\u0644\u062A \u0639\u0645\u0644\u064A\u0629 UPSERT");
          } catch (sqlError) {
            console.error("\u0641\u0634\u0644\u062A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0623\u062E\u064A\u0631\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F:", sqlError);
            throw error;
          }
        }
      }
      async deleteSetting(key) {
        try {
          return await withDatabaseRetry(async () => {
            console.log(`\u0645\u062D\u0627\u0648\u0644\u0629 \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0627\u0644\u0645\u0641\u062A\u0627\u062D: ${key}`);
            const [existingSetting] = await db.select().from(settings).where(eq(settings.key, key));
            if (!existingSetting) {
              console.log(`\u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0627\u0644\u0645\u0641\u062A\u0627\u062D ${key} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u060C \u0644\u0627 \u064A\u0644\u0632\u0645 \u0627\u0644\u062D\u0630\u0641`);
              return true;
            }
            const result = await db.delete(settings).where(eq(settings.key, key));
            const success = result.rowCount > 0;
            if (success) {
              console.log(`\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0627\u0644\u0645\u0641\u062A\u0627\u062D ${key} \u0628\u0646\u062C\u0627\u062D`);
            } else {
              console.log(`\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0627\u0644\u0645\u0641\u062A\u0627\u062D ${key}`);
            }
            return success;
          }, 3, 1e3);
        } catch (error) {
          console.error(`\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0627\u0644\u0645\u0641\u062A\u0627\u062D ${key}:`, error);
          return false;
        }
      }
      // Get all cards
      async getAllCards(options = {}) {
        try {
          const { limit, offset, search, status } = options;
          let query = db.select().from(cards);
          let countQuery = db.select({ count: sql`count(*)` }).from(cards);
          if (status) {
            query = query.where(eq(cards.status, status));
            countQuery = countQuery.where(eq(cards.status, status));
          }
          if (search) {
            query = query.where(sql`LOWER(cards.title) LIKE ${`%${search.toLowerCase()}%`}`);
            countQuery = countQuery.where(sql`LOWER(cards.title) LIKE ${`%${search.toLowerCase()}%`}`);
          }
          if (limit) {
            query = query.limit(limit);
          }
          if (offset) {
            query = query.offset(offset);
          }
          query = query.orderBy(desc(cards.createdAt));
          const result = await query;
          const countResult = await countQuery;
          return {
            cards: result,
            total: Number(countResult[0]?.count || 0)
          };
        } catch (error) {
          console.error("Error getting all cards:", error);
          return { cards: [], total: 0 };
        }
      }
      // Get all certificates
      async getAllCertificates(options = {}) {
        try {
          const { limit, offset, search, type } = options;
          let query = db.select().from(certificates);
          let countQuery = db.select({ count: sql`count(*)` }).from(certificates);
          if (type) {
            query = query.where(eq(certificates.certificateType, type));
            countQuery = countQuery.where(eq(certificates.certificateType, type));
          }
          if (search) {
            query = query.where(sql`LOWER(certificates.title) LIKE ${`%${search.toLowerCase()}%`}`);
            countQuery = countQuery.where(sql`LOWER(certificates.title) LIKE ${`%${search.toLowerCase()}%`}`);
          }
          if (limit) {
            query = query.limit(limit);
          }
          if (offset) {
            query = query.offset(offset);
          }
          query = query.orderBy(desc(certificates.createdAt));
          const result = await query;
          const countResult = await countQuery;
          return {
            certificates: result,
            total: Number(countResult[0]?.count || 0)
          };
        } catch (error) {
          console.error("Error getting all certificates:", error);
          return { certificates: [], total: 0 };
        }
      }
      // ========================
      // طبقات العناصر - Layers
      // ========================
      async getLayers(templateId) {
        try {
          const layersList = await db.select().from(layers).where(eq(layers.templateId, templateId)).orderBy(asc(layers.zIndex));
          return layersList;
        } catch (error) {
          console.error("Error fetching layers:", error);
          return [];
        }
      }
      async getLayer(id) {
        try {
          const [layer] = await db.select().from(layers).where(eq(layers.id, id));
          return layer;
        } catch (error) {
          console.error("Error fetching layer:", error);
          return void 0;
        }
      }
      async createLayer(layer) {
        try {
          const [newLayer] = await db.insert(layers).values(layer).returning();
          return newLayer;
        } catch (error) {
          console.error("Error creating layer:", error);
          throw error;
        }
      }
      async updateLayer(id, data) {
        try {
          const [updatedLayer] = await db.update(layers).set({
            ...data,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(layers.id, id)).returning();
          return updatedLayer;
        } catch (error) {
          console.error("Error updating layer:", error);
          return void 0;
        }
      }
      async deleteLayer(id) {
        try {
          const result = await db.delete(layers).where(eq(layers.id, id));
          return result.rowCount > 0;
        } catch (error) {
          console.error("Error deleting layer:", error);
          return false;
        }
      }
      async reorderLayers(templateId, layerIds) {
        try {
          await db.transaction(async (tx) => {
            for (let i = 0; i < layerIds.length; i++) {
              await tx.update(layers).set({ zIndex: i }).where(and(
                eq(layers.id, layerIds[i]),
                eq(layers.templateId, templateId)
              ));
            }
          });
          return true;
        } catch (error) {
          console.error("Error reordering layers:", error);
          return false;
        }
      }
      // ==============================
      // شعارات القوالب - Template Logos
      // ==============================
      async getTemplateLogos(templateId) {
        try {
          const logosList = await db.select().from(templateLogos).where(eq(templateLogos.templateId, templateId)).orderBy(asc(templateLogos.displayOrder));
          return logosList;
        } catch (error) {
          console.error("Error fetching template logos:", error);
          return [];
        }
      }
      async getTemplateLogo(id) {
        try {
          const [logo] = await db.select().from(templateLogos).where(eq(templateLogos.id, id));
          return logo;
        } catch (error) {
          console.error("Error fetching template logo:", error);
          return void 0;
        }
      }
      async createTemplateLogo(logo) {
        try {
          const [newLogo] = await db.insert(templateLogos).values(logo).returning();
          return newLogo;
        } catch (error) {
          console.error("Error creating template logo:", error);
          throw error;
        }
      }
      async updateTemplateLogo(id, data) {
        try {
          const [updatedLogo] = await db.update(templateLogos).set({
            ...data,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(templateLogos.id, id)).returning();
          return updatedLogo;
        } catch (error) {
          console.error("Error updating template logo:", error);
          return void 0;
        }
      }
      async deleteTemplateLogo(id) {
        try {
          const result = await db.delete(templateLogos).where(eq(templateLogos.id, id));
          return result.rowCount > 0;
        } catch (error) {
          console.error("Error deleting template logo:", error);
          return false;
        }
      }
      // ============================
      // شعارات المستخدم - User Logos
      // ============================
      async getUserLogos(userId) {
        try {
          const logosList = await db.select().from(userLogos).where(eq(userLogos.userId, userId)).orderBy(desc(userLogos.updatedAt));
          return logosList;
        } catch (error) {
          console.error("Error fetching user logos:", error);
          return [];
        }
      }
      async getUserLogo(id) {
        try {
          const [logo] = await db.select().from(userLogos).where(eq(userLogos.id, id));
          return logo;
        } catch (error) {
          console.error("Error fetching user logo:", error);
          return void 0;
        }
      }
      async createUserLogo(logo) {
        try {
          const [newLogo] = await db.insert(userLogos).values(logo).returning();
          return newLogo;
        } catch (error) {
          console.error("Error creating user logo:", error);
          throw error;
        }
      }
      async updateUserLogo(id, data) {
        try {
          const [updatedLogo] = await db.update(userLogos).set({
            ...data,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(userLogos.id, id)).returning();
          return updatedLogo;
        } catch (error) {
          console.error("Error updating user logo:", error);
          return void 0;
        }
      }
      async deleteUserLogo(id) {
        try {
          const result = await db.delete(userLogos).where(eq(userLogos.id, id));
          return result.rowCount > 0;
        } catch (error) {
          console.error("Error deleting user logo:", error);
          return false;
        }
      }
      // ====================================
      // توقيعات المستخدم - User Signatures
      // ====================================
      async getUserSignatures(userId, type) {
        try {
          let query = db.select().from(userSignatures).where(eq(userSignatures.userId, userId));
          if (type) {
            query = query.where(eq(userSignatures.type, type));
          }
          const signaturesList = await query.orderBy(desc(userSignatures.updatedAt));
          return signaturesList;
        } catch (error) {
          console.error("Error fetching user signatures:", error);
          return [];
        }
      }
      async getUserSignature(id) {
        try {
          const [signature] = await db.select().from(userSignatures).where(eq(userSignatures.id, id));
          return signature;
        } catch (error) {
          console.error("Error fetching user signature:", error);
          return void 0;
        }
      }
      async createUserSignature(signature) {
        try {
          const [newSignature] = await db.insert(userSignatures).values(signature).returning();
          return newSignature;
        } catch (error) {
          console.error("Error creating user signature:", error);
          throw error;
        }
      }
      async updateUserSignature(id, data) {
        try {
          const [updatedSignature] = await db.update(userSignatures).set({
            ...data,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(userSignatures.id, id)).returning();
          return updatedSignature;
        } catch (error) {
          console.error("Error updating user signature:", error);
          return void 0;
        }
      }
      async deleteUserSignature(id) {
        try {
          const result = await db.delete(userSignatures).where(eq(userSignatures.id, id));
          return result.rowCount > 0;
        } catch (error) {
          console.error("Error deleting user signature:", error);
          return false;
        }
      }
      // إعدادات النظام - System Settings
      // هذه الدالة موجودة ومنفذة في مكان آخر
      // This function is now implemented elsewhere
      // Legacy function - uses the replacement implemented above
      async getSettings(category) {
        try {
          const settingsArray = await this.getSettingsByCategory(category);
          const settingsObject = {};
          for (const setting of settingsArray) {
            let value = setting.value;
            if (typeof value === "string") {
              try {
                value = JSON.parse(value);
              } catch (e) {
              }
            }
            settingsObject[setting.key] = value;
          }
          return settingsObject;
        } catch (error) {
          console.error(`Error retrieving settings for category ${category}:`, error);
          return {};
        }
      }
      async updateSettings(category, data) {
        try {
          for (const [key, value] of Object.entries(data)) {
            await this.updateSettingValue(category, key, value);
          }
          return true;
        } catch (error) {
          console.error(`Error updating settings for category ${category}:`, error);
          return false;
        }
      }
      async getSettingValue(category, key) {
        try {
          const query = `SELECT value FROM settings WHERE category = '${category}' AND key = '${key}'`;
          const result = await db.execute(query);
          if (result.rows.length === 0) return null;
          const rawValue = result.rows[0].value;
          if (typeof rawValue === "string") {
            try {
              const parsedValue = JSON.parse(rawValue);
              if (typeof parsedValue === "object" && parsedValue !== null && Object.keys(parsedValue).length === 1 && "value" in parsedValue) {
                return parsedValue.value;
              }
              return parsedValue;
            } catch (e) {
              console.warn(`Failed to parse JSON for ${category}.${key}:`, e);
              return rawValue;
            }
          }
          return rawValue;
        } catch (error) {
          console.error(`Error retrieving setting ${category}.${key}:`, error);
          return null;
        }
      }
      async updateSettingValue(category, key, value) {
        try {
          let valueToStore;
          if (typeof value === "object" && value !== null) {
            valueToStore = JSON.stringify(value);
          } else {
            valueToStore = JSON.stringify({ value });
          }
          console.log(`Storing value for ${category}.${key}:`, valueToStore);
          const checkQuery = `SELECT key FROM settings WHERE category = '${category}' AND key = '${key}'`;
          const checkResult = await db.execute(checkQuery);
          if (checkResult.rows.length > 0) {
            const updateQuery = `UPDATE settings SET value = '${valueToStore}', updated_at = NOW() WHERE category = '${category}' AND key = '${key}'`;
            await db.execute(updateQuery);
          } else {
            const insertQuery = `INSERT INTO settings (category, key, value, updated_at) VALUES ('${category}', '${key}', '${valueToStore}', NOW())`;
            await db.execute(insertQuery);
          }
          return true;
        } catch (error) {
          console.error(`Error updating setting ${category}.${key}:`, error);
          return false;
        }
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/optimized-image-generator.ts
var optimized_image_generator_exports = {};
__export(optimized_image_generator_exports, {
  generateOptimizedCardImage: () => generateOptimizedCardImage,
  generateOptimizedCertificateImage: () => generateOptimizedCertificateImage
});
import { createCanvas, loadImage, registerFont } from "canvas";
import sharp from "sharp";
import path2 from "path";
import fs2 from "fs";
import crypto from "crypto";
async function optimizeImage(buffer, quality = "high", format2 = "png", trimWhitespace = false) {
  let outputQuality = 100;
  switch (quality) {
    case "preview":
      outputQuality = 65;
      break;
    // تخفيض جودة المعاينة إلى 65% لتسريع العرض
    case "low":
      outputQuality = 75;
      break;
    // تخفيض الجودة المنخفضة إلى 75%
    case "medium":
      outputQuality = 85;
      break;
    // تخفيض الجودة المتوسطة إلى 85%
    case "high":
      outputQuality = 95;
      break;
    // استخدام 95% للجودة العالية
    case "download":
      outputQuality = 100;
      break;
  }
  let sharpImg = sharp(buffer);
  if (quality === "preview" || quality === "low") {
    sharpImg = sharpImg.resize({
      width: quality === "preview" ? 800 : 1e3,
      // تقليل الحجم للمعاينة
      withoutEnlargement: true,
      fastShrinkOnLoad: true
      // تسريع العملية
    });
  } else if (quality === "download" || trimWhitespace) {
    try {
      sharpImg = sharpImg.flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } }).extend({ top: 0, right: 0, bottom: 0, left: 0 }).sharpen();
    } catch (enhanceError) {
      console.error("\u26A0\uFE0F \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0633\u064A\u0646 \u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0646\u0632\u064A\u0644:", enhanceError);
    }
  }
  if (quality === "preview" && format2 !== "jpeg") {
    return await sharpImg.png({ quality: outputQuality }).toBuffer();
  }
  if ((quality === "low" || quality === "medium") && format2 !== "jpeg") {
    return await sharpImg.jpeg({ quality: outputQuality }).toBuffer();
  }
  if (format2 === "jpeg") {
    sharpImg = sharpImg.jpeg({
      quality: outputQuality,
      mozjpeg: quality === "download"
      // استخدام mozjpeg للتنزيل فقط
    });
  } else {
    sharpImg = sharpImg.png({
      quality: outputQuality,
      compressionLevel: quality === "preview" ? 3 : quality === "download" ? 9 : 6,
      adaptiveFiltering: quality === "download"
      // استخدام الترشيح التكيفي للتنزيل فقط
    });
  }
  if (quality !== "preview" && quality !== "low") {
    sharpImg = sharpImg.sharpen();
  }
  return await sharpImg.toBuffer();
}
async function generateOptimizedCardImage({
  templatePath,
  fields,
  formData,
  outputWidth = 1200,
  outputHeight = 1600,
  quality = "high",
  outputFormat = "png"
}) {
  const startTime = Date.now();
  if (quality === "preview") {
    outputWidth = 800;
    outputHeight = Math.round(outputHeight * (800 / 1200));
    console.log(`Using smaller dimensions for preview: ${outputWidth}x${outputHeight}`);
  }
  const useOriginalTemplateSize = quality === "download" || quality === "high";
  let effectiveFields = fields;
  if (formData._designFields && Array.isArray(formData._designFields) && formData._designFields.length > 0) {
    console.log("\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0642\u0648\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0639\u0644\u0649 \u0627\u0644\u0633\u064A\u0631\u0641\u0631:", formData._designFields.length);
    effectiveFields = formData._designFields;
  } else {
    console.log("\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0642\u0648\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0633\u064A\u0631\u0641\u0631:", fields.length);
  }
  const cachedResult = imageCache.get(templatePath, effectiveFields, formData, quality, outputWidth, outputHeight);
  if (cachedResult) {
    console.log(`\u26A1 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0635\u0648\u0631\u0629 \u0645\u062E\u0632\u0646\u0629 \u0645\u0624\u0642\u062A\u064B\u0627 \u0644\u0644\u0642\u0627\u0644\u0628. \u0648\u0642\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630: ${Date.now() - startTime}ms`);
    return cachedResult.path;
  }
  let templateImage;
  console.log(`Attempting to load template image from: ${templatePath}`);
  try {
    try {
      templateImage = await loadImage(templatePath);
      console.log(`Successfully loaded template image from direct path: ${templatePath}`);
    } catch (directError) {
      console.error(`Failed to load from direct path: ${templatePath}`, directError);
      const possiblePaths = [
        // 1. تجربة المسار كما هو بدون تغيير
        templatePath,
        // 2. إذا كان المسار يبدأ بـ /static، جرب مجلد client/static
        templatePath.startsWith("/static") ? path2.join(process.cwd(), "client", templatePath) : templatePath,
        // 3. إذا كان المسار يبدأ بـ /static، تجربة مسار مطلق في بيئة Replit
        templatePath.startsWith("/static") ? path2.join("/home/runner/workspace/client", templatePath) : templatePath,
        // 4. تجربة مباشرة في مجلد client/static
        path2.join(process.cwd(), "client", "static", path2.basename(templatePath)),
        // 5. تجربة في مجلد static بناءً على الاسم فقط
        path2.join(process.cwd(), "client/static", path2.basename(templatePath)),
        // 6. تجربة المسار المطلق في Replit
        path2.join("/home/runner/workspace/client/static", path2.basename(templatePath)),
        // 7. تجربة مجلد uploads
        path2.join(process.cwd(), "uploads", path2.basename(templatePath)),
        // 8. تجربة باستخدام الخادم المحلي
        templatePath.startsWith("/") ? `http://localhost:5000${templatePath}` : `http://localhost:5000/static/${path2.basename(templatePath)}`,
        // 9. محاولة موقع ثابت للتجربة
        `/static/${path2.basename(templatePath)}`
      ];
      console.log("Possible image paths to try:", possiblePaths);
      let loaded = false;
      for (const alternativePath of possiblePaths) {
        if (alternativePath === templatePath) continue;
        try {
          if (!alternativePath.startsWith("http") && fs2.existsSync(alternativePath)) {
            console.log(`Trying to load from alternative path (exists): ${alternativePath}`);
            templateImage = await loadImage(alternativePath);
            console.log(`Successfully loaded template image from alternative path: ${alternativePath}`);
            loaded = true;
            break;
          } else if (alternativePath.startsWith("http")) {
            console.log(`Trying to load from URL: ${alternativePath}`);
            templateImage = await loadImage(alternativePath);
            console.log(`Successfully loaded template image from URL: ${alternativePath}`);
            loaded = true;
            break;
          }
        } catch (altError) {
          console.error(`Failed to load from alternative path ${alternativePath}:`, altError.message);
        }
      }
      if (!loaded) {
        console.error(`All attempts to load template image failed. Creating a placeholder image.`);
        const placeholderCanvas = createCanvas(outputWidth, outputHeight);
        const placeholderCtx = placeholderCanvas.getContext("2d");
        placeholderCtx.fillStyle = "#ffffff";
        placeholderCtx.fillRect(0, 0, outputWidth, outputHeight);
        placeholderCtx.fillStyle = "#cccccc";
        placeholderCtx.font = "20px Arial";
        placeholderCtx.textAlign = "center";
        placeholderCtx.fillText("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u0627\u0644\u0628", outputWidth / 2, outputHeight / 2);
        templateImage = placeholderCanvas;
      }
    }
  } catch (imageError) {
    console.error("All attempts to load template image failed:", imageError);
    throw new Error(`Failed to load template image: ${imageError.message}`);
  }
  let imgWidth = 0;
  let imgHeight = 0;
  let finalCanvasWidth = outputWidth;
  let finalCanvasHeight = outputHeight;
  let canvas;
  let ctx;
  if (templateImage) {
    imgWidth = templateImage.width;
    imgHeight = templateImage.height;
    if (useOriginalTemplateSize && quality === "download") {
      console.log(`\u2728 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u0628\u0639\u0627\u062F \u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0641\u0642\u0637 \u0644\u0644\u062A\u0646\u0632\u064A\u0644: ${imgWidth}x${imgHeight}`);
      finalCanvasWidth = imgWidth;
      finalCanvasHeight = imgHeight;
    }
  }
  let tempCanvas, tempCtx, actualWidth, actualHeight, startX, startY;
  let croppedCanvas;
  if (useOriginalTemplateSize && quality === "download" && templateImage) {
    console.log(`\u{1F50D} \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u062D\u062F\u0648\u062F \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0644\u0644\u0635\u0648\u0631\u0629 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u0627\u062D\u0627\u062A \u0627\u0644\u0632\u0627\u0626\u062F\u0629...`);
    tempCanvas = createCanvas(imgWidth, imgHeight);
    tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(templateImage, 0, 0, imgWidth, imgHeight);
    const imageData = tempCtx.getImageData(0, 0, imgWidth, imgHeight);
    const data = imageData.data;
    let minX = imgWidth;
    let minY = imgHeight;
    let maxX = 0;
    let maxY = 0;
    for (let y = 0; y < imgHeight; y++) {
      for (let x = 0; x < imgWidth; x++) {
        const index = (y * imgWidth + x) * 4;
        const alpha = data[index + 3];
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const isWhite = r > 240 && g > 240 && b > 240;
        if (alpha > 10 && !isWhite) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    const margin = 5;
    minX = Math.max(0, minX - margin);
    minY = Math.max(0, minY - margin);
    maxX = Math.min(imgWidth - 1, maxX + margin);
    maxY = Math.min(imgHeight - 1, maxY + margin);
    actualWidth = maxX - minX + 1;
    actualHeight = maxY - minY + 1;
    startX = minX;
    startY = minY;
    console.log(`\u{1F50D} \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0644\u0644\u0645\u062D\u062A\u0648\u0649: ${actualWidth}x${actualHeight}, \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 (${startX}, ${startY})`);
    croppedCanvas = createCanvas(actualWidth, actualHeight);
    const croppedCtx = croppedCanvas.getContext("2d");
    croppedCtx.drawImage(
      templateImage,
      startX,
      startY,
      actualWidth,
      actualHeight,
      // منطقة المصدر (الجزء المراد نسخه)
      0,
      0,
      actualWidth,
      actualHeight
      // منطقة الوجهة (الكانفاس بالكامل)
    );
    finalCanvasWidth = actualWidth;
    finalCanvasHeight = actualHeight;
    canvas = croppedCanvas;
    ctx = croppedCtx;
  } else {
    canvas = createCanvas(finalCanvasWidth, finalCanvasHeight);
    ctx = canvas.getContext("2d");
    if (templateImage) {
      if (useOriginalTemplateSize && quality === "download") {
        ctx.drawImage(templateImage, 0, 0, imgWidth, imgHeight);
      } else if (imgWidth > 0 && imgHeight > 0) {
        const aspectRatio = imgWidth / imgHeight;
        let drawWidth = finalCanvasWidth;
        let drawHeight = finalCanvasHeight;
        if (finalCanvasWidth / finalCanvasHeight > aspectRatio) {
          drawWidth = finalCanvasHeight * aspectRatio;
          const offsetX = (finalCanvasWidth - drawWidth) / 2;
          ctx.drawImage(templateImage, offsetX, 0, drawWidth, finalCanvasHeight);
        } else {
          drawHeight = finalCanvasWidth / aspectRatio;
          const offsetY = (finalCanvasHeight - drawHeight) / 2;
          ctx.drawImage(templateImage, 0, offsetY, finalCanvasWidth, drawHeight);
        }
      } else {
        ctx.drawImage(templateImage, 0, 0, finalCanvasWidth, finalCanvasHeight);
      }
    } else {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, finalCanvasWidth, finalCanvasHeight);
      ctx.fillStyle = "#cccccc";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u0627\u0644\u0628", finalCanvasWidth / 2, finalCanvasHeight / 2);
    }
  }
  const BASE_IMAGE_WIDTH = 1e3;
  let scaleFactor;
  if (useOriginalTemplateSize && quality === "download") {
    scaleFactor = finalCanvasWidth / BASE_IMAGE_WIDTH;
    console.log(`Using download font scale factor: ${scaleFactor} (Original template: ${finalCanvasWidth}px, Client preview: ${BASE_IMAGE_WIDTH}px)`);
  } else {
    scaleFactor = outputWidth / BASE_IMAGE_WIDTH;
    console.log(`Using font scale factor: ${scaleFactor} (Server canvas: ${outputWidth}px, Client preview: ${BASE_IMAGE_WIDTH}px)`);
  }
  ctx.textBaseline = "middle";
  const fieldsMap = new Map(effectiveFields.map((field) => [field.name, field]));
  const fieldsToRender = [];
  for (const [fieldName, value] of Object.entries(formData)) {
    if (fieldName === "_designFields") continue;
    if (!value || typeof value !== "string") continue;
    const field = fieldsMap.get(fieldName);
    if (!field) continue;
    if (field.visible === false) {
      console.log(`Skipping hidden field: ${fieldName}`);
      continue;
    }
    const layer = field.zIndex || field.style?.layer || 1;
    fieldsToRender.push({ field, value, layer });
  }
  fieldsToRender.sort((a, b) => {
    const layerA = a.layer !== void 0 && a.layer !== null ? a.layer : 0;
    const layerB = b.layer !== void 0 && b.layer !== null ? b.layer : 0;
    if (layerA === layerB) {
      const orderA = a.field.displayOrder || 0;
      const orderB = b.field.displayOrder || 0;
      return orderA - orderB;
    }
    return layerA - layerB;
  });
  console.log(`\u{1F50D} Field layers detailed info:`);
  fieldsToRender.forEach((f) => {
    console.log(`   ${f.field.name}: layer=${f.layer}, zIndex=${f.field.zIndex || 0}, displayOrder=${f.field.displayOrder || 0}, visible=${f.field.visible !== false}, rotation=${f.field.rotation || 0}\xB0`);
  });
  console.log(`\u{1F50D} Field layers sorted order: ${fieldsToRender.map((f) => f.field.name).join(" > ")}`);
  for (const { field, value, layer } of fieldsToRender) {
    const fieldName = field.name;
    console.log(`Drawing field: ${fieldName} (layer: ${layer}, zIndex: ${field.zIndex || 0})`);
    ctx.save();
    const style = field.style || {};
    const xPercent = field.position.x || 50;
    const yPercent = field.position.y || 50;
    let posX, posY;
    if (useOriginalTemplateSize && quality === "download") {
      if (typeof startX !== "undefined" && typeof startY !== "undefined") {
        const originalPosX = Math.round(xPercent / 100 * imgWidth);
        const originalPosY = Math.round(yPercent / 100 * imgHeight);
        posX = originalPosX - startX;
        posY = originalPosY - startY;
        console.log(`Field ${field.name} position adjusted: (${originalPosX}, ${originalPosY}) => (${posX}, ${posY}) due to cropping`);
      } else {
        posX = Math.round(xPercent / 100 * finalCanvasWidth);
        posY = Math.round(yPercent / 100 * finalCanvasHeight);
      }
    } else {
      posX = Math.round(xPercent / 100 * outputWidth);
      posY = Math.round(yPercent / 100 * outputHeight);
    }
    const rotation = field.rotation || 0;
    if (rotation !== 0) {
      ctx.translate(posX, posY);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.translate(-posX, -posY);
      console.log(`Applied rotation of ${rotation} degrees to field ${fieldName}`);
    }
    if (field.type === "image") {
      try {
        console.log(`Processing image field: ${fieldName}, value length: ${value.length}, starts with: ${value.substring(0, 30)}...`);
        let imagePath = value;
        if (value.includes("/temp/")) {
          const fileName = path2.basename(value);
          const relativePath = `/uploads/${fileName}`;
          imagePath = path2.join(process.cwd(), relativePath);
          console.log(`Converting temp path ${value} to uploads path: ${imagePath}`);
        } else if (value.includes("/generated/") && !value.includes("/uploads/generated/")) {
          const fileName = path2.basename(value);
          const relativePath = `/uploads/generated/${fileName}`;
          imagePath = path2.join(process.cwd(), relativePath);
          console.log(`Converting generated path ${value} to uploads/generated path: ${imagePath}`);
        } else if (value.startsWith("/uploads/")) {
          imagePath = path2.join(process.cwd(), value);
          console.log(`Converting relative path ${value} to absolute path: ${imagePath}`);
        }
        const img = await loadImage(imagePath);
        console.log(`Image loaded successfully: ${img.width}x${img.height}`);
        const widthPercentage = style.imageMaxWidth || 25;
        const heightPercentage = style.imageMaxHeight || 25;
        const imgMaxWidth = Math.round(outputWidth * widthPercentage / 100);
        const imgMaxHeight = Math.round(outputHeight * heightPercentage / 100);
        const aspectRatio = img.width / img.height;
        let imgWidth2, imgHeight2;
        if (aspectRatio > 1) {
          imgWidth2 = Math.min(imgMaxWidth, img.width);
          imgHeight2 = imgWidth2 / aspectRatio;
          if (imgHeight2 > imgMaxHeight) {
            imgHeight2 = imgMaxHeight;
            imgWidth2 = imgHeight2 * aspectRatio;
          }
        } else {
          imgHeight2 = Math.min(imgMaxHeight, img.height);
          imgWidth2 = imgHeight2 * aspectRatio;
          if (imgWidth2 > imgMaxWidth) {
            imgWidth2 = imgMaxWidth;
            imgHeight2 = imgWidth2 / aspectRatio;
          }
        }
        imgWidth2 = Math.round(imgWidth2);
        imgHeight2 = Math.round(imgHeight2);
        console.log(`Image dimensions for ${fieldName}: Original: ${img.width}x${img.height}, Display: ${imgWidth2}x${imgHeight2}, AspectRatio: ${aspectRatio.toFixed(2)}, MaxSize: ${imgMaxWidth}x${imgMaxHeight}`);
        const drawX = posX - imgWidth2 / 2;
        const drawY = posY - imgHeight2 / 2;
        if (style.textShadow?.enabled) {
          ctx.shadowColor = style.textShadow.color || "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = (style.textShadow.blur || 3) * scaleFactor;
          ctx.shadowOffsetX = (style.textShadow.offsetX !== void 0 ? style.textShadow.offsetX : 2) * scaleFactor;
          ctx.shadowOffsetY = (style.textShadow.offsetY !== void 0 ? style.textShadow.offsetY : 2) * scaleFactor;
          console.log(`Applied text shadow to field ${fieldName} with blur: ${ctx.shadowBlur}, offsetX: ${ctx.shadowOffsetX}, offsetY: ${ctx.shadowOffsetY}`);
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        if (style.imageRounded) {
          ctx.save();
          ctx.beginPath();
          const radius = Math.min(imgWidth2, imgHeight2) / 2;
          ctx.arc(posX, posY, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, drawX, drawY, imgWidth2, imgHeight2);
          ctx.restore();
          if (style.imageBorder) {
            ctx.beginPath();
            ctx.arc(posX, posY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = style.color || "#000000";
            ctx.lineWidth = 2 * scaleFactor;
            ctx.stroke();
          }
        } else {
          ctx.drawImage(img, drawX, drawY, imgWidth2, imgHeight2);
          if (style.imageBorder) {
            ctx.beginPath();
            ctx.rect(drawX, drawY, imgWidth2, imgHeight2);
            ctx.strokeStyle = style.color || "#000000";
            ctx.lineWidth = 2 * scaleFactor;
            ctx.stroke();
          }
        }
        console.log(`Image drawn: ${fieldName} at (${drawX}, ${drawY}) with size ${imgWidth2}x${imgHeight2}`);
      } catch (error) {
        console.error(`Failed to load or draw image for field ${fieldName}:`, error);
      }
    } else {
      let originalFontSize = style.fontSize || 24;
      if (originalFontSize < 14) originalFontSize = 14;
      if (originalFontSize > 60) originalFontSize = 60;
      const fontSize = Math.round(originalFontSize * scaleFactor);
      const fontWeight = style.fontWeight || "";
      const fontFamily = style.fontFamily || "Cairo";
      console.log(`Field ${field.name} font: ${fontSize}px ${fontFamily} (original: ${originalFontSize}px, scaled: ${fontSize}px)`);
      let finalFontFamily = ARABIC_FONTS.CAIRO;
      let finalFontWeight = fontWeight || "normal";
      const normalizedFontFamily = fontFamily.toLowerCase();
      if (normalizedFontFamily === "amiri" || normalizedFontFamily === "\u0623\u0645\u064A\u0631\u064A") {
        finalFontFamily = ARABIC_FONTS.AMIRI;
      } else if (normalizedFontFamily === "tajawal" || normalizedFontFamily === "\u062A\u062C\u0648\u0627\u0644") {
        finalFontFamily = ARABIC_FONTS.TAJAWAL;
      } else if (normalizedFontFamily === "cairo" || normalizedFontFamily === "\u0627\u0644\u0642\u0627\u0647\u0631\u0629") {
        finalFontFamily = ARABIC_FONTS.CAIRO;
      } else {
        console.log(`\u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u062E\u0637 "${fontFamily}" \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645\u060C \u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 Cairo \u0628\u062F\u0644\u0627\u064B \u0645\u0646\u0647`);
      }
      if (finalFontWeight === "bold" || finalFontWeight === "700") {
        finalFontWeight = "bold";
      } else {
        finalFontWeight = "normal";
      }
      const fontString = `${finalFontWeight} ${fontSize}px ${finalFontFamily}`;
      console.log(`Field ${fieldName} final font: ${fontString}`);
      ctx.font = fontString;
      console.log(`Field ${fieldName} font: ${fontString} (original: ${originalFontSize}px, scaled: ${fontSize}px)`);
      let textColor = "#000000";
      if (style.color && typeof style.color === "string" && style.color.trim() !== "") {
        textColor = style.color.trim();
        console.log(`\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0648\u0646 \u0627\u0644\u0646\u0635 \u0645\u0646 \u062E\u0635\u0627\u0626\u0635 \u0627\u0644\u062D\u0642\u0644: ${textColor}`);
      } else {
        console.log(`\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0648\u0646 \u0627\u0644\u0646\u0635 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A: ${textColor}`);
      }
      ctx.fillStyle = textColor;
      console.log(`Field ${fieldName} color applied: ${textColor}`);
      if (style.align) {
        ctx.textAlign = style.align;
      } else {
        ctx.textAlign = "center";
      }
      if (style.textShadow?.enabled) {
        ctx.shadowColor = style.textShadow.color || "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = (style.textShadow.blur || 3) * scaleFactor;
        ctx.shadowOffsetX = (style.textShadow.offsetX !== void 0 ? style.textShadow.offsetX : 0) * scaleFactor;
        ctx.shadowOffsetY = (style.textShadow.offsetY !== void 0 ? style.textShadow.offsetY : 0) * scaleFactor;
        console.log(`Applied text shadow to field ${fieldName} with blur: ${ctx.shadowBlur}, offsetX: ${ctx.shadowOffsetX}, offsetY: ${ctx.shadowOffsetY}`);
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
      const maxWidth = style.maxWidth ? Math.round(style.maxWidth / 100 * outputWidth) : Math.round(outputWidth - 100);
      const text2 = value;
      const lines = wrapText(ctx, text2, maxWidth, fontSize);
      const lineHeightFactor = 1.3;
      const lineHeight = Math.round(fontSize * lineHeightFactor);
      const totalTextHeight = lineHeight * lines.length;
      let currentY = posY;
      if (style.verticalPosition === "middle") {
        currentY = Math.round(posY - totalTextHeight / 2 + lineHeight / 2);
      } else if (style.verticalPosition === "bottom") {
        currentY = Math.round(posY - totalTextHeight);
      }
      for (const line of lines) {
        ctx.fillText(line, posX, currentY);
        currentY += lineHeight;
      }
    }
    ctx.restore();
  }
  const hash = crypto.createHash("md5").update(JSON.stringify(formData) + Date.now()).digest("hex").slice(0, 10);
  const outputFileName = `${hash}-${quality}.${outputFormat}`;
  const outputDir = path2.resolve("./uploads/generated");
  if (!fs2.existsSync(outputDir)) {
    fs2.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path2.join(outputDir, outputFileName);
  const buffer = canvas.toBuffer();
  console.log(`\u23F1\uFE0F Starting parallel image optimization for ${quality} quality...`);
  const isDownloadMode = quality === "download";
  try {
    const [optimizedBuffer] = await Promise.all([
      // 1. تحسين وضغط الصورة حسب إعدادات الجودة
      // تأكد من استخدام PNG للتنزيل لضمان الجودة العالية
      optimizeImage(buffer, quality, quality === "download" ? "png" : outputFormat, isDownloadMode),
      // 2. في نفس الوقت، إنشاء إصدار منخفض الجودة للمعاينة (إذا كانت المعاينة مطلوبة)
      // سيتم تجاهل هذه النتيجة إذا كانت الجودة المطلوبة هي 'preview' بالفعل
      quality !== "preview" ? optimizeImage(buffer, "preview", "webp", false) : Promise.resolve(null)
    ]);
    fs2.writeFileSync(outputPath, optimizedBuffer);
    imageCache.set(templatePath, effectiveFields, formData, quality, outputWidth, outputHeight, optimizedBuffer, outputPath);
    const generationTime = Date.now() - startTime;
    console.log(`\u2705 Card image successfully generated at: ${outputPath} with quality: ${quality} in ${generationTime}ms`);
    if (generationTime < 1e3) {
      console.log(`\u{1F680} Image generation completed in under 1 second! (${generationTime}ms)`);
    } else {
      console.log(`\u23F3 Image generation took ${generationTime}ms - still looking for optimizations`);
    }
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0635\u0648\u0631\u0629:", error);
    fs2.writeFileSync(outputPath, buffer);
    console.log("\u2757 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0628\u062F\u0648\u0646 \u0645\u0639\u0627\u0644\u062C\u0629");
    imageCache.set(templatePath, effectiveFields, formData, quality, outputWidth, outputHeight, buffer, outputPath);
  }
  return outputPath;
}
function wrapText(ctx, text2, maxWidth, fontSize = 24) {
  if (!text2) return [];
  if (maxWidth <= 0) return [text2];
  const measureCache = {};
  const measureText = (str) => {
    if (!measureCache[str]) {
      measureCache[str] = ctx.measureText(str).width;
    }
    return measureCache[str];
  };
  const words = text2.split(" ");
  const lines = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (measureText(testLine) <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      if (measureText(word) > maxWidth) {
        let partialWord = "";
        for (const char of word) {
          const testWord = partialWord + char;
          if (measureText(testWord) <= maxWidth) {
            partialWord = testWord;
          } else {
            lines.push(partialWord);
            partialWord = char;
          }
        }
        currentLine = partialWord;
      } else {
        currentLine = word;
      }
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
async function generateOptimizedCertificateImage(template, formData) {
  const imageUrl = template.imageUrl || template.settings && template.settings.imageUrl || "/uploads/certificate-default.png";
  console.log(`Using template image URL: ${imageUrl}`);
  let fields = [];
  if (Array.isArray(template.fields) && template.fields.length > 0) {
    fields = template.fields;
    console.log(`Using ${fields.length} fields from template object`);
  } else if (template.id) {
    try {
      console.log(`Fetching template fields for template ID: ${template.id}`);
      try {
        const { rows } = await db.execute(
          `SELECT * FROM template_fields WHERE template_id = ${template.id}`
        );
        fields = rows || [];
        console.log(`Fetched ${fields.length} template fields using SQL query`);
      } catch (sqlError) {
        console.error(`Database query failed: ${sqlError.message}`);
        console.warn(`Using empty fields array as fallback`);
        fields = [];
      }
      console.log(`Got ${fields.length} fields from database for template ${template.id}`);
    } catch (err) {
      const dbError = err;
      console.error(`Failed to fetch template fields: ${dbError.message}`);
      fields = [];
    }
  }
  let effectiveFields = fields;
  if (formData._designFields && Array.isArray(formData._designFields) && formData._designFields.length > 0) {
    console.log("\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0642\u0648\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0641\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0634\u0647\u0627\u062F\u0629:", formData._designFields.length);
    effectiveFields = formData._designFields;
  } else {
    console.log("\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062D\u0642\u0648\u0644 \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0641\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0634\u0647\u0627\u062F\u0629:", fields.length);
  }
  return generateOptimizedCardImage({
    templatePath: imageUrl,
    // استخدام متغير imageUrl الذي تم تحديده في بداية الدالة
    fields: effectiveFields,
    // استخدام الحقول الفعالة (الأصلية أو المخصصة)
    formData,
    outputWidth: 2480,
    // A4 width at 300dpi
    outputHeight: 3508,
    // A4 height at 300dpi
    quality: "high",
    outputFormat: "png"
  });
}
var ImageGenerationCache, imageCache, ARABIC_FONTS;
var init_optimized_image_generator = __esm({
  "server/optimized-image-generator.ts"() {
    "use strict";
    init_db();
    ImageGenerationCache = class {
      cache = /* @__PURE__ */ new Map();
      maxEntries = 100;
      // العدد الأقصى من العناصر المخزنة مؤقتًا
      expiryTime = 3600 * 1e3;
      // وقت انتهاء الصلاحية (ساعة واحدة)
      constructor(maxEntries = 100, expiryTimeMs = 3600 * 1e3) {
        this.maxEntries = maxEntries;
        this.expiryTime = expiryTimeMs;
        setInterval(() => this.cleanCache(), 1800 * 1e3);
      }
      // إنشاء مفتاح فريد للتخزين المؤقت
      createKey(templatePath, fields, formData, quality, outputWidth, outputHeight) {
        const dataString = JSON.stringify({
          template: templatePath,
          width: outputWidth,
          height: outputHeight,
          quality,
          // استخدام المعرفات والمواضع فقط من الحقول لتقليل حجم المفتاح
          fields: fields.map((f) => ({
            id: f.id,
            name: f.name,
            position: f.position,
            type: f.type,
            zIndex: f.zIndex
          })),
          // استخدام المفاتيح الأساسية فقط من بيانات النموذج
          formData: Object.keys(formData).reduce((acc, key) => {
            if (typeof formData[key] === "string" || typeof formData[key] === "number") {
              acc[key] = formData[key];
            }
            return acc;
          }, {})
        });
        return crypto.createHash("md5").update(dataString).digest("hex");
      }
      // الحصول على عنصر من الذاكرة المؤقتة
      get(templatePath, fields, formData, quality, outputWidth, outputHeight) {
        const key = this.createKey(templatePath, fields, formData, quality, outputWidth, outputHeight);
        const entry = this.cache.get(key);
        if (entry && Date.now() - entry.timestamp < this.expiryTime) {
          console.log(`\u2705 Cache hit for ${key.substring(0, 8)}... (${quality})`);
          return entry;
        }
        if (entry) {
          console.log(`\u23F1\uFE0F Cache entry expired for ${key.substring(0, 8)}...`);
          this.cache.delete(key);
        } else {
          console.log(`\u2753 Cache miss for ${key.substring(0, 8)}...`);
        }
        return null;
      }
      // إضافة عنصر إلى الذاكرة المؤقتة
      set(templatePath, fields, formData, quality, outputWidth, outputHeight, buffer, path17) {
        if (this.cache.size >= this.maxEntries) {
          this.cleanCache(true);
        }
        const key = this.createKey(templatePath, fields, formData, quality, outputWidth, outputHeight);
        this.cache.set(key, {
          buffer,
          timestamp: Date.now(),
          path: path17
        });
        console.log(`\u{1F4BE} Cached image ${key.substring(0, 8)}... (${quality}, ${buffer.length} bytes)`);
      }
      // تنظيف العناصر القديمة من الذاكرة المؤقتة
      cleanCache(forceClean = false) {
        const now = Date.now();
        let deletedCount = 0;
        for (const [key, entry] of this.cache.entries()) {
          if (now - entry.timestamp > this.expiryTime) {
            this.cache.delete(key);
            deletedCount++;
          }
        }
        if (forceClean && this.cache.size >= this.maxEntries * 0.9) {
          const entries = Array.from(this.cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
          const deleteCount = Math.floor(this.maxEntries * 0.2);
          for (let i = 0; i < deleteCount && i < entries.length; i++) {
            this.cache.delete(entries[i][0]);
            deletedCount++;
          }
        }
        if (deletedCount > 0) {
          console.log(`\u{1F9F9} Cleaned ${deletedCount} expired entries from image cache`);
        }
      }
      // الحصول على حجم الذاكرة المؤقتة الحالي
      get size() {
        return this.cache.size;
      }
    };
    imageCache = new ImageGenerationCache(200, 12 * 3600 * 1e3);
    try {
      const possibleFontDirs = [
        path2.join(process.cwd(), "fonts"),
        // المسار القياسي (development)
        path2.join(process.cwd(), "/fonts"),
        // مع المسار المطلق
        path2.resolve("./fonts"),
        // نسبي للملف الحالي في ESM
        path2.join("/opt/render/project/src", "fonts"),
        // مسار Render.com
        path2.join("/app", "fonts"),
        // مسار Docker
        path2.resolve("./fonts"),
        // مسار نسبي بديل
        "/home/runner/workspace/fonts",
        // مسار Replit
        "/workspace/fonts"
        // مسار Cloud IDE آخر
      ];
      const registerFontSafely = (fontPath, options) => {
        if (fs2.existsSync(fontPath)) {
          registerFont(fontPath, options);
          return true;
        }
        return false;
      };
      let foundFontsDir = null;
      for (const dir of possibleFontDirs) {
        if (fs2.existsSync(dir)) {
          foundFontsDir = dir;
          console.log(`Found fonts directory at: ${dir}`);
          break;
        }
      }
      console.log(`Using fonts from directory: ${foundFontsDir}`);
      try {
        if (foundFontsDir) {
          const cairoPath = path2.join(foundFontsDir, "Cairo-Regular.ttf");
          console.log(`Cairo font path: ${cairoPath}, exists: ${fs2.existsSync(cairoPath)}`);
        }
      } catch (e) {
        console.log("Error checking font file", e);
      }
      if (!foundFontsDir) {
        throw new Error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u062C\u0644\u062F \u0627\u0644\u062E\u0637\u0648\u0637 \u0641\u064A \u0623\u064A \u0645\u0633\u0627\u0631 \u0645\u0639\u0631\u0648\u0641");
      }
      let registeredFonts = 0;
      if (registerFontSafely(path2.join(foundFontsDir, "Cairo-Regular.ttf"), { family: "Cairo" })) {
        registeredFonts++;
      }
      if (registerFontSafely(path2.join(foundFontsDir, "Cairo-Bold.ttf"), { family: "Cairo", weight: "bold" })) {
        registeredFonts++;
      }
      if (registerFontSafely(path2.join(foundFontsDir, "Tajawal-Regular.ttf"), { family: "Tajawal" })) {
        registeredFonts++;
      }
      if (registerFontSafely(path2.join(foundFontsDir, "Tajawal-Bold.ttf"), { family: "Tajawal", weight: "bold" })) {
        registeredFonts++;
      }
      if (registerFontSafely(path2.join(foundFontsDir, "Amiri-Regular.ttf"), { family: "Amiri" })) {
        registeredFonts++;
      }
      if (registerFontSafely(path2.join(foundFontsDir, "Amiri-Bold.ttf"), { family: "Amiri", weight: "bold" })) {
        registeredFonts++;
      }
      if (registeredFonts > 0) {
        console.log(`\u2705 \u062A\u0645 \u062A\u0633\u062C\u064A\u0644 ${registeredFonts} \u062E\u0637\u0648\u0637 \u0639\u0631\u0628\u064A\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0627\u0644\u0645\u062C\u0644\u062F ${foundFontsDir}`);
      } else {
        console.warn("Could not register custom fonts, using system fonts instead");
      }
    } catch (error) {
      console.warn("Could not register custom fonts, using system fonts instead");
      console.error("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0637\u0648\u0637 \u0627\u0644\u0639\u0631\u0628\u064A\u0629:", error);
    }
    ARABIC_FONTS = {
      CAIRO: "Cairo",
      CAIRO_BOLD: "Cairo",
      // سنستخدم Cairo بدون Bold وسنضيف bold في الخصائص
      TAJAWAL: "Tajawal",
      TAJAWAL_BOLD: "Tajawal",
      // سنستخدم Tajawal بدون Bold وسنضيف bold في الخصائص
      AMIRI: "Amiri",
      AMIRI_BOLD: "Amiri"
      // سنستخدم Amiri بدون Bold وسنضيف bold في الخصائص
    };
  }
});

// server/lib/social-image-generator.ts
var social_image_generator_exports = {};
__export(social_image_generator_exports, {
  DEFAULT_SOCIAL_FORMATS: () => DEFAULT_SOCIAL_FORMATS,
  generateSocialImage: () => generateSocialImage,
  getSocialFormats: () => getSocialFormats
});
import { createCanvas as createCanvas3, loadImage as loadImage3 } from "canvas";
import path5 from "path";
import fs5 from "fs";
import crypto2 from "crypto";
async function getSocialFormats() {
  try {
    const settings2 = await storage.getSettingsByCategory("social-formats");
    const formats = { ...DEFAULT_SOCIAL_FORMATS };
    for (const setting of settings2) {
      try {
        if (typeof setting.value === "string") {
          const parsedValue = JSON.parse(setting.value);
          formats[setting.key] = parsedValue;
        }
      } catch (e) {
        console.error(`Error parsing social format setting ${setting.key}:`, e);
      }
    }
    return formats;
  } catch (error) {
    console.error("Error loading social formats:", error);
    return DEFAULT_SOCIAL_FORMATS;
  }
}
async function generateSocialImage(templateImagePath, format2, options = {}) {
  try {
    let outputQuality;
    let imageFormat = "image/png";
    switch (options.quality) {
      case "preview":
        outputQuality = 0.6;
        imageFormat = "image/jpeg";
        break;
      case "download":
        outputQuality = 0.9;
        break;
      case "low":
        outputQuality = 0.4;
        imageFormat = "image/jpeg";
        break;
      case "medium":
        outputQuality = 0.7;
        break;
      case "high":
        outputQuality = 0.9;
        break;
      default:
        outputQuality = 0.8;
    }
    let formatSpec;
    if (typeof format2 === "string") {
      const formats = await getSocialFormats();
      formatSpec = formats[format2] || DEFAULT_SOCIAL_FORMATS.instagram;
    } else {
      formatSpec = format2;
    }
    const canvas = createCanvas3(formatSpec.width, formatSpec.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, formatSpec.width, formatSpec.height);
    const originalImagePath = templateImagePath.startsWith("/") ? path5.join(process.cwd(), templateImagePath.substring(1)) : templateImagePath;
    const image = await loadImage3(originalImagePath);
    const cropMode = options.cropMode || "fit";
    let sx = 0, sy = 0, sWidth = image.width, sHeight = image.height;
    let dx = 0, dy = 0, dWidth = formatSpec.width, dHeight = formatSpec.height;
    const originalRatio = image.width / image.height;
    const targetRatio = formatSpec.width / formatSpec.height;
    if (cropMode === "fit") {
      if (originalRatio > targetRatio) {
        dWidth = formatSpec.width;
        dHeight = dWidth / originalRatio;
        dy = (formatSpec.height - dHeight) / 2;
      } else {
        dHeight = formatSpec.height;
        dWidth = dHeight * originalRatio;
        dx = (formatSpec.width - dWidth) / 2;
      }
    } else if (cropMode === "fill" || cropMode === "cover") {
      if (originalRatio > targetRatio) {
        sWidth = image.height * targetRatio;
        sx = (image.width - sWidth) / 2;
      } else {
        sHeight = image.width / targetRatio;
        sy = (image.height - sHeight) / 2;
      }
    }
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    if (options.watermark) {
      const text2 = options.watermarkText || "Certificate Card";
      ctx.globalAlpha = 0.25;
      ctx.font = `14px Arial`;
      ctx.fillStyle = "#000000";
      ctx.textAlign = "end";
      ctx.fillText(text2, formatSpec.width - 20, formatSpec.height - 20);
      ctx.globalAlpha = 1;
    }
    const extension = imageFormat === "image/jpeg" ? "jpg" : "png";
    const qualitySuffix = options.quality || "medium";
    const formatName = typeof format2 === "string" ? format2 : "custom";
    const filename = `social_${crypto2.randomBytes(8).toString("hex")}_${formatName}_${qualitySuffix}.${extension}`;
    const outputPath = path5.join(process.cwd(), "uploads", filename);
    const buffer = imageFormat === "image/jpeg" ? canvas.toBuffer("image/jpeg", { quality: outputQuality }) : canvas.toBuffer("image/png");
    fs5.writeFileSync(outputPath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Error generating social image:", error);
    throw new Error("\u0641\u0634\u0644 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0635\u0648\u0631\u0629 \u0644\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A");
  }
}
var DEFAULT_SOCIAL_FORMATS;
var init_social_image_generator = __esm({
  "server/lib/social-image-generator.ts"() {
    "use strict";
    init_storage();
    DEFAULT_SOCIAL_FORMATS = {
      instagram: { width: 1080, height: 1080, ratio: "1:1", description: "Instagram (Square)" },
      instagramStory: { width: 1080, height: 1920, ratio: "9:16", description: "Instagram Story" },
      facebook: { width: 1200, height: 630, ratio: "1.91:1", description: "Facebook" },
      twitter: { width: 1200, height: 675, ratio: "16:9", description: "Twitter" },
      whatsapp: { width: 800, height: 800, ratio: "1:1", description: "WhatsApp" },
      pinterest: { width: 1e3, height: 1500, ratio: "2:3", description: "Pinterest" }
    };
  }
});

// server/index.ts
import express13 from "express";

// server/routes.ts
init_storage();
import express11 from "express";
import { createServer } from "http";

// server/image-generator.ts
init_optimized_image_generator();
var generateCardImage = async (template, formData, quality = "high") => {
  console.warn("\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062F\u0627\u0644\u0629 \u0627\u0644\u0642\u062F\u064A\u0645\u0629 generateCardImage. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 generateOptimizedCardImage");
  return generateOptimizedCardImage({
    templatePath: template.imageUrl,
    fields: template.fields || [],
    formData,
    quality,
    outputWidth: template.settings?.width || 1200,
    outputHeight: template.settings?.height || 1600
  });
};

// server/routes.ts
import path13 from "path";
import fs13 from "fs";

// server/auth.ts
init_storage();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import session2 from "express-session";
import { scrypt, randomBytes as randomBytes2, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { randomUUID } from "crypto";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes2(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  if (!hashed || !salt) return false;
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || randomUUID(),
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      // secure: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === "development",
      // secure: false, // غير آمن في بيئة التطوير
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      // 7 days
      sameSite: "lax"
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log(`\u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${username}`);
        const user = await storage.getUserByUsername(username);
        if (!user) {
          console.log(`\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F: ${username}`);
          return done(null, false, { message: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
        }
        console.log(`\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0648\u062C\u0648\u062F\u060C \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${username}`);
        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) {
          console.log(`\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${username}`);
          return done(null, false, { message: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
        }
        console.log(`\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 \u0646\u0627\u062C\u062D \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${username}`);
        try {
          await storage.updateUser(user.id, { updatedAt: /* @__PURE__ */ new Date() });
          console.log(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0648\u0642\u062A \u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${username}`);
        } catch (updateError) {
          console.log(`\u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 \u062A\u062D\u062F\u064A\u062B \u0648\u0642\u062A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ${username}:`, updateError);
        }
        return done(null, user);
      } catch (error) {
        console.error("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0627\u0644\u0645\u062D\u0644\u064A\u0629:", error);
        return done(null, false, { message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." });
      }
    })
  );
  const setupGoogleStrategy = async () => {
    try {
      const googleSettings = await storage.getAuthSettings("google");
      if (googleSettings?.enabled && googleSettings.clientId && googleSettings.clientSecret) {
        passport.use(
          new GoogleStrategy(
            {
              clientID: googleSettings.clientId,
              clientSecret: googleSettings.clientSecret,
              callbackURL: googleSettings.redirectUri || "/auth/google/callback",
              scope: googleSettings.scope?.split(",") || ["profile", "email"]
            },
            async (accessToken, refreshToken, profile, done) => {
              try {
                let user = await storage.getUserByProviderId("google", profile.id);
                if (!user && profile.emails && profile.emails.length > 0) {
                  const email = profile.emails[0].value;
                  user = await storage.getUserByEmail(email);
                  if (user) {
                    user = await storage.updateUser(user.id, {
                      provider: "google",
                      providerId: profile.id,
                      providerData: profile
                    });
                  }
                }
                if (!user) {
                  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@google.user`;
                  const username = profile.displayName ? profile.displayName.replace(/\s+/g, "_").toLowerCase() : `user_${profile.id}`;
                  const newUser = {
                    username,
                    email,
                    name: profile.displayName || username,
                    password: "",
                    // لا نحتاج كلمة مرور للمصادقة الاجتماعية
                    fullName: profile.displayName || username,
                    provider: "google",
                    providerId: profile.id,
                    providerData: profile,
                    profileImageUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                    verifiedEmail: true,
                    // عادة ما تكون البريد الإلكتروني مؤكد من جوجل
                    role: "user",
                    active: true
                  };
                  user = await storage.createUser(newUser);
                }
                await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
                return done(null, user);
              } catch (error) {
                return done(error);
              }
            }
          )
        );
        console.log("Google authentication strategy configured");
      } else {
        console.log("Google authentication is disabled or missing configuration");
      }
    } catch (error) {
      console.error("Error setting up Google strategy:", error);
    }
  };
  const setupFacebookStrategy = async () => {
    try {
      const facebookSettings = await storage.getAuthSettings("facebook");
      if (facebookSettings?.enabled && facebookSettings.clientId && facebookSettings.clientSecret) {
        passport.use(
          new FacebookStrategy(
            {
              clientID: facebookSettings.clientId,
              clientSecret: facebookSettings.clientSecret,
              callbackURL: facebookSettings.redirectUri || "/auth/facebook/callback",
              profileFields: ["id", "displayName", "email", "photos"]
            },
            async (accessToken, refreshToken, profile, done) => {
              try {
                let user = await storage.getUserByProviderId("facebook", profile.id);
                if (!user && profile.emails && profile.emails.length > 0) {
                  const email = profile.emails[0].value;
                  user = await storage.getUserByEmail(email);
                  if (user) {
                    user = await storage.updateUser(user.id, {
                      provider: "facebook",
                      providerId: profile.id,
                      providerData: profile
                    });
                  }
                }
                if (!user) {
                  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@facebook.user`;
                  const username = profile.displayName ? profile.displayName.replace(/\s+/g, "_").toLowerCase() : `user_${profile.id}`;
                  const newUser = {
                    username,
                    email,
                    name: profile.displayName || username,
                    password: "",
                    // لا نحتاج كلمة مرور للمصادقة الاجتماعية
                    provider: "facebook",
                    providerId: profile.id,
                    providerData: profile,
                    profileImageUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                    verifiedEmail: true,
                    // نفترض أن البريد الإلكتروني مؤكد من فيسبوك
                    role: "user",
                    active: true
                  };
                  user = await storage.createUser(newUser);
                }
                await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
                return done(null, user);
              } catch (error) {
                return done(error);
              }
            }
          )
        );
        console.log("Facebook authentication strategy configured");
      } else {
        console.log("Facebook authentication is disabled or missing configuration");
      }
    } catch (error) {
      console.error("Error setting up Facebook strategy:", error);
    }
  };
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u0631\u062C\u0627\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:", error);
      done(error);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password, name } = req.body;
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644" });
      }
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644" });
      }
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        name,
        role: "user",
        // Default role for new registrations
        active: true
      });
      const { password: _, ...userWithoutPassword } = user;
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644:", err);
        return next(err);
      }
      if (!user) {
        console.log("\u0641\u0634\u0644 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 - \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F:", info);
        return res.status(401).json({ message: info?.message || "\u0641\u0634\u0644 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" });
      }
      console.log("\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0648\u062C\u0648\u062F\u060C \u062C\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644:", { id: user.id, username: user.username, role: user.role });
      req.login(user, (err2) => {
        if (err2) {
          console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062C\u0644\u0633\u0629:", err2);
          return next(err2);
        }
        const { password, ...userWithoutPassword } = user;
        if (!userWithoutPassword.role && userWithoutPassword.isAdmin) {
          userWithoutPassword.role = "admin";
        } else if (!userWithoutPassword.role) {
          userWithoutPassword.role = "user";
        }
        console.log("\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0646\u062C\u0627\u062D");
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err2) => {
        if (err2) return next(err2);
        res.clearCookie("connect.sid");
        res.sendStatus(200);
      });
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const { password, ...userWithoutPassword } = req.user;
    if (!userWithoutPassword.role && userWithoutPassword.isAdmin) {
      userWithoutPassword.role = "admin";
    } else if (!userWithoutPassword.role) {
      userWithoutPassword.role = "user";
    }
    res.json(userWithoutPassword);
  });
  const setupTwitterStrategy = async () => {
    try {
      const twitterSettings = await storage.getAuthSettings("twitter");
      if (twitterSettings?.enabled && twitterSettings.clientId && twitterSettings.clientSecret) {
        passport.use(
          new TwitterStrategy(
            {
              consumerKey: twitterSettings.clientId,
              consumerSecret: twitterSettings.clientSecret,
              callbackURL: twitterSettings.redirectUri || "/auth/twitter/callback",
              includeEmail: true
            },
            async (token, tokenSecret, profile, done) => {
              try {
                let user = await storage.getUserByProviderId("twitter", profile.id);
                if (!user && profile.emails && profile.emails.length > 0) {
                  const email = profile.emails[0].value;
                  user = await storage.getUserByEmail(email);
                  if (user) {
                    user = await storage.updateUser(user.id, {
                      provider: "twitter",
                      providerId: profile.id,
                      providerData: profile
                    });
                  }
                }
                if (!user) {
                  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@twitter.user`;
                  const username = profile.username || profile.displayName ? (profile.username || profile.displayName).replace(/\s+/g, "_").toLowerCase() : `user_${profile.id}`;
                  const newUser = {
                    username,
                    email,
                    name: profile.displayName || username,
                    password: "",
                    // لا نحتاج كلمة مرور للمصادقة الاجتماعية
                    provider: "twitter",
                    providerId: profile.id,
                    providerData: profile,
                    profileImageUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                    verifiedEmail: true,
                    role: "user",
                    active: true
                  };
                  user = await storage.createUser(newUser);
                }
                await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
                return done(null, user);
              } catch (error) {
                return done(error);
              }
            }
          )
        );
        console.log("Twitter authentication strategy configured");
      } else {
        console.log("Twitter authentication is disabled or missing configuration");
      }
    } catch (error) {
      console.error("Error setting up Twitter strategy:", error);
    }
  };
  const setupLinkedInStrategy = async () => {
    try {
      const linkedinSettings = await storage.getAuthSettings("linkedin");
      if (linkedinSettings?.enabled && linkedinSettings.clientId && linkedinSettings.clientSecret) {
        passport.use(
          new LinkedInStrategy(
            {
              clientID: linkedinSettings.clientId,
              clientSecret: linkedinSettings.clientSecret,
              callbackURL: linkedinSettings.redirectUri || "/auth/linkedin/callback",
              scope: linkedinSettings.scope?.split(",") || ["r_emailaddress", "r_liteprofile"]
            },
            async (accessToken, refreshToken, profile, done) => {
              try {
                let user = await storage.getUserByProviderId("linkedin", profile.id);
                if (!user && profile.emails && profile.emails.length > 0) {
                  const email = profile.emails[0].value;
                  user = await storage.getUserByEmail(email);
                  if (user) {
                    user = await storage.updateUser(user.id, {
                      provider: "linkedin",
                      providerId: profile.id,
                      providerData: profile
                    });
                  }
                }
                if (!user) {
                  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@linkedin.user`;
                  const username = profile.displayName ? profile.displayName.replace(/\s+/g, "_").toLowerCase() : `user_${profile.id}`;
                  const newUser = {
                    username,
                    email,
                    name: profile.displayName || username,
                    password: "",
                    // لا نحتاج كلمة مرور للمصادقة الاجتماعية
                    provider: "linkedin",
                    providerId: profile.id,
                    providerData: profile,
                    profileImageUrl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                    verifiedEmail: true,
                    role: "user",
                    active: true
                  };
                  user = await storage.createUser(newUser);
                }
                await storage.updateUser(user.id, { lastLogin: /* @__PURE__ */ new Date() });
                return done(null, user);
              } catch (error) {
                return done(error);
              }
            }
          )
        );
        console.log("LinkedIn authentication strategy configured");
      } else {
        console.log("LinkedIn authentication is disabled or missing configuration");
      }
    } catch (error) {
      console.error("Error setting up LinkedIn strategy:", error);
    }
  };
  try {
    setupGoogleStrategy().catch((err) => {
      console.log("\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Google:", err);
    });
  } catch (err) {
    console.log("\u0641\u0634\u0644 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Google:", err);
  }
  try {
    setupFacebookStrategy().catch((err) => {
      console.log("\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Facebook:", err);
    });
  } catch (err) {
    console.log("\u0641\u0634\u0644 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Facebook:", err);
  }
  try {
    setupTwitterStrategy().catch((err) => {
      console.log("\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Twitter:", err);
    });
  } catch (err) {
    console.log("\u0641\u0634\u0644 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 Twitter:", err);
  }
  try {
    setupLinkedInStrategy().catch((err) => {
      console.log("\u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 LinkedIn:", err);
    });
  } catch (err) {
    console.log("\u0641\u0634\u0644 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 LinkedIn:", err);
  }
  app2.get("/auth/google", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.google) {
        passport.authenticate("google")(req, res, next);
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 Google: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 Google:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/google/callback", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.google) {
        passport.authenticate("google", {
          failureRedirect: "/#/login?error=google_auth_failed"
        })(req, res, () => {
          res.redirect("/#/");
        });
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 Google: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 Google:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/facebook", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.facebook) {
        passport.authenticate("facebook", { scope: ["email"] })(req, res, next);
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 Facebook: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 Facebook:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/facebook/callback", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.facebook) {
        passport.authenticate("facebook", {
          failureRedirect: "/#/login?error=facebook_auth_failed"
        })(req, res, () => {
          res.redirect("/#/");
        });
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 Facebook: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 Facebook:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/twitter", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.twitter) {
        passport.authenticate("twitter")(req, res, next);
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 Twitter: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 Twitter:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/twitter/callback", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.twitter) {
        passport.authenticate("twitter", {
          failureRedirect: "/#/login?error=twitter_auth_failed"
        })(req, res, () => {
          res.redirect("/#/");
        });
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 Twitter: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 Twitter:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/linkedin", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.linkedin) {
        passport.authenticate("linkedin")(req, res, next);
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 LinkedIn: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0645\u0633\u0627\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 LinkedIn:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/auth/linkedin/callback", (req, res, next) => {
    try {
      if (passport._strategies && passport._strategies.linkedin) {
        passport.authenticate("linkedin", {
          failureRedirect: "/#/login?error=linkedin_auth_failed"
        })(req, res, () => {
          res.redirect("/#/");
        });
      } else {
        console.log("\u062A\u0639\u0630\u0631 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 LinkedIn: \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623\u0629");
        res.redirect("/#/login?error=auth_strategy_not_configured");
      }
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 LinkedIn:", error);
      res.redirect("/#/login?error=auth_error");
    }
  });
  app2.get("/api/admin/auth-settings", isAdmin, async (req, res) => {
    try {
      const authSettings2 = await storage.getAllAuthSettings();
      const safeSettings = authSettings2.map((setting) => {
        const { clientSecret, ...safeData } = setting;
        return {
          ...safeData,
          clientSecret: clientSecret ? "\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF" : null
        };
      });
      res.json(safeSettings);
    } catch (error) {
      console.error("Error fetching auth settings:", error);
      res.status(500).json({ message: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645" });
    }
  });
  app2.put("/api/admin/auth-settings/:provider", isAdmin, async (req, res) => {
    try {
      const { provider } = req.params;
      const {
        enabled,
        clientId,
        clientSecret,
        redirectUri,
        scope,
        additionalSettings
      } = req.body;
      const existingSettings = await storage.getAuthSettings(provider);
      if (!existingSettings) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0632\u0648\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const updatedSettings = await storage.updateAuthSettings(provider, {
        enabled,
        clientId,
        // فقط تحديث كلمة السر إذا تم تقديمها وليست مخفية (●●●●●●●●●●●●)
        ...clientSecret && !clientSecret.includes("\u25CF") ? { clientSecret } : {},
        redirectUri,
        scope,
        additionalSettings,
        updatedBy: req.user.id
      });
      if (!updatedSettings) {
        return res.status(500).json({ message: "\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A" });
      }
      if (provider === "google") setupGoogleStrategy();
      else if (provider === "facebook") setupFacebookStrategy();
      else if (provider === "twitter") setupTwitterStrategy();
      else if (provider === "linkedin") setupLinkedInStrategy();
      const { clientSecret: _, ...safeSettings } = updatedSettings;
      res.json({
        ...safeSettings,
        clientSecret: updatedSettings.clientSecret ? "\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF" : null
      });
    } catch (error) {
      console.error("Error updating auth settings:", error);
      res.status(500).json({ message: "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645" });
    }
  });
  app2.use("/api/admin/*", isAdmin);
}
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629" });
}
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && (req.user.role === "admin" || req.user.isAdmin === true)) {
    return next();
  }
  res.status(403).json({ message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629" });
}

// server/certificate-generator.ts
import { createCanvas as createCanvas2, loadImage as loadImage2, registerFont as registerFont2 } from "canvas";
import * as fs3 from "fs";
import * as path3 from "path";
try {
  registerFont2(path3.join(process.cwd(), "assets/fonts/Tajawal-Regular.ttf"), { family: "Tajawal" });
  registerFont2(path3.join(process.cwd(), "assets/fonts/Tajawal-Bold.ttf"), { family: "Tajawal", weight: "bold" });
  registerFont2(path3.join(process.cwd(), "assets/fonts/Amiri-Regular.ttf"), { family: "Amiri" });
  registerFont2(path3.join(process.cwd(), "assets/fonts/DecoTypeNaskh.ttf"), { family: "DecoType Naskh" });
  console.log("Custom fonts registered successfully");
} catch (error) {
  console.warn("Could not register custom fonts, using system fonts instead");
}
async function generateCertificateImage(template, formData) {
  try {
    console.log("Starting certificate image generation for template:", template.id, template.title);
    const settings2 = template.settings || {};
    const orientation = settings2.orientation || "portrait";
    const useCustomSize = settings2.useCustomSize === true;
    const customWidth = useCustomSize ? parseInt(settings2.customWidth) || 0 : 0;
    const customHeight = useCustomSize ? parseInt(settings2.customHeight) || 0 : 0;
    const imageUrl = template.imageUrl.startsWith("http") ? template.imageUrl : path3.join(process.cwd(), template.imageUrl.replace(/^\//, ""));
    console.log(`Loading template image from: ${imageUrl}`);
    const templateImage = await loadImage2(imageUrl);
    let width, height;
    if (useCustomSize && customWidth > 0 && customHeight > 0) {
      console.log(`Using custom dimensions from template settings: ${customWidth}x${customHeight}`);
      width = customWidth;
      height = customHeight;
    } else if (orientation === "landscape") {
      if (templateImage.width > templateImage.height) {
        width = templateImage.width;
        height = templateImage.height;
      } else {
        width = templateImage.height;
        height = templateImage.width;
      }
    } else {
      width = templateImage.width;
      height = templateImage.height;
    }
    console.log(`Canvas dimensions set to: ${width}x${height}, orientation: ${orientation}`);
    const canvas = createCanvas2(width, height);
    const ctx = canvas.getContext("2d");
    if (orientation === "landscape" && templateImage.width < templateImage.height) {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(Math.PI / 2);
      const drawWidth = height;
      const drawHeight = width;
      ctx.drawImage(templateImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();
    } else if (orientation === "portrait" && templateImage.width > templateImage.height) {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 2);
      const drawWidth = height;
      const drawHeight = width;
      ctx.drawImage(templateImage, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();
    } else {
      ctx.drawImage(templateImage, 0, 0, width, height);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = settings2.textColor || "#000000";
    const fontFamily = settings2.certificateFontFamily || settings2.fontFamily || "DecoType Naskh, Amiri, Arial";
    const fontSize = settings2.fontSize || 24;
    let templateFields2 = [];
    try {
      if (Array.isArray(template.templateFields) && template.templateFields.length > 0) {
        templateFields2 = template.templateFields;
      } else {
        const { db: db3 } = await Promise.resolve().then(() => (init_db(), db_exports));
        const { templateFields: templateFieldsTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
        templateFields2 = await db3.query.templateFields.findMany({
          where: (fields, { eq: eq7 }) => eq7(fields.templateId, template.id)
        });
        console.log(`Fetched ${templateFields2.length} template fields from database for template ID ${template.id}`);
      }
    } catch (error) {
      console.warn(`Error fetching template fields: ${error}. Using default rendering.`);
    }
    if (templateFields2.length > 0) {
      console.log(`Rendering certificate with ${templateFields2.length} custom fields`);
      for (const field of templateFields2) {
        if (!formData[field.name] && !field.defaultValue) continue;
        const value = formData[field.name] || field.defaultValue || "";
        const fieldStyle = field.style || {};
        const position = field.position || {};
        const x = position.x !== void 0 ? position.x / 100 * width : width / 2;
        const y = position.y !== void 0 ? position.y / 100 * height : height / 2;
        console.log(`Rendering field ${field.name} at position (${position.x}%, ${position.y}%) => (${Math.round(x)}px, ${Math.round(y)}px)`);
        ctx.shadowBlur = 0;
        ctx.fillStyle = fieldStyle.color || settings2.textColor || "#000000";
        const fontWeight = fieldStyle.fontWeight || fieldStyle.weight || "";
        const fieldFontSize = fieldStyle.fontSize || fieldStyle.size || fontSize;
        const fieldFontFamily = fieldStyle.fontFamily || fontFamily;
        ctx.font = `${fontWeight} ${fieldFontSize}px ${fieldFontFamily}`;
        ctx.textAlign = fieldStyle.align || "center";
        if (fieldStyle.textShadow) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 5;
        }
        if (typeof value === "string") {
          const lines = wrapText2(ctx, value, width * 0.8);
          const lineHeight = parseInt(fieldStyle.size || fontSize, 10) * 1.2;
          lines.forEach((line, index) => {
            ctx.fillText(line, x, y + index * lineHeight);
          });
        }
      }
    } else {
      const certificateType = formData.certificateType || template.certificateType || "appreciation";
      ctx.font = `bold ${fontSize * 1.5}px ${fontFamily}`;
      const title = formData.title || template.title || "\u0634\u0647\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0631";
      ctx.fillText(title, width / 2, height * 0.15);
      ctx.font = `${fontSize}px ${fontFamily}`;
      const gender = formData.issuedToGender || "male";
      const prefix = gender === "female" ? "\u062A\u0634\u0647\u062F" : "\u064A\u0634\u0647\u062F";
      const recipient = gender === "female" ? "\u0644\u0644\u0637\u0627\u0644\u0628\u0629" : "\u0644\u0644\u0637\u0627\u0644\u0628";
      if (formData.schoolName) {
        ctx.fillText(`${prefix} \u0625\u062F\u0627\u0631\u0629 ${formData.schoolName}`, width / 2, height * 0.25);
      }
      if (formData.issuedTo) {
        ctx.fillText(`${recipient}: ${formData.issuedTo}`, width / 2, height * 0.35);
      }
      if (formData.reason) {
        const reasonLines = wrapText2(ctx, formData.reason, width * 0.7);
        reasonLines.forEach((line, index) => {
          ctx.fillText(line, width / 2, height * 0.45 + index * fontSize * 1.3);
        });
      }
      if (formData.date) {
        ctx.fillText(`\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ${formData.date}`, width / 2, height * 0.78);
      }
      ctx.font = `bold ${fontSize * 0.9}px ${fontFamily}`;
      if (formData.principalTitle) {
        ctx.fillText(formData.principalTitle, width * 0.2, height * 0.85);
        if (formData.principalName) {
          ctx.font = `${fontSize * 0.8}px ${fontFamily}`;
          ctx.fillText(formData.principalName, width * 0.2, height * 0.9);
          ctx.font = `bold ${fontSize * 0.9}px ${fontFamily}`;
        }
      }
      if (formData.secondaryTitle) {
        ctx.fillText(formData.secondaryTitle, width * 0.5, height * 0.85);
        if (formData.secondaryName) {
          ctx.font = `${fontSize * 0.8}px ${fontFamily}`;
          ctx.fillText(formData.secondaryName, width * 0.5, height * 0.9);
          ctx.font = `bold ${fontSize * 0.9}px ${fontFamily}`;
        }
      }
      if (formData.thirdTitle) {
        ctx.fillText(formData.thirdTitle, width * 0.8, height * 0.85);
        if (formData.thirdName) {
          ctx.font = `${fontSize * 0.8}px ${fontFamily}`;
          ctx.fillText(formData.thirdName, width * 0.8, height * 0.9);
        }
      }
      if (formData.logo1 && typeof formData.logo1 === "string" && formData.logo1.startsWith("data:image")) {
        try {
          const logo1 = await loadImage2(formData.logo1);
          const logoSize = height * 0.12;
          ctx.drawImage(logo1, width * 0.15 - logoSize / 2, height * 0.1 - logoSize / 2, logoSize, logoSize);
        } catch (error) {
          console.error("Error loading logo1:", error);
        }
      }
      if (formData.logo2 && typeof formData.logo2 === "string" && formData.logo2.startsWith("data:image")) {
        try {
          const logo2 = await loadImage2(formData.logo2);
          const logoSize = height * 0.12;
          ctx.drawImage(logo2, width * 0.5 - logoSize / 2, height * 0.1 - logoSize / 2, logoSize, logoSize);
        } catch (error) {
          console.error("Error loading logo2:", error);
        }
      }
      if (formData.logo3 && typeof formData.logo3 === "string" && formData.logo3.startsWith("data:image")) {
        try {
          const logo3 = await loadImage2(formData.logo3);
          const logoSize = height * 0.12;
          ctx.drawImage(logo3, width * 0.85 - logoSize / 2, height * 0.1 - logoSize / 2, logoSize, logoSize);
        } catch (error) {
          console.error("Error loading logo3:", error);
        }
      }
    }
    const uploadsDir3 = path3.join(process.cwd(), "uploads");
    const fileName = `certificate_${Date.now()}.png`;
    const outputPath = path3.join(uploadsDir3, fileName);
    let buffer;
    try {
      buffer = canvas.toBuffer("image/png");
    } catch (canvasError) {
      console.warn("\u062A\u0639\u0630\u0631 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0643\u0627\u0646\u0641\u0627\u0633 \u0625\u0644\u0649 \u0635\u0648\u0631\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0639\u0627\u062F\u064A\u0629\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0645\u0628\u0633\u0637\u0629:", canvasError);
      buffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");
      console.log("\u2757 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0635\u0648\u0631\u0629 \u0641\u0627\u0631\u063A\u0629 \u0643\u062D\u0644 \u0645\u0624\u0642\u062A \u0641\u064A \u0628\u064A\u0626\u0629 \u0627\u0644\u0645\u062D\u0627\u0643\u0627\u0629");
    }
    fs3.writeFileSync(outputPath, buffer);
    return outputPath;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw new Error("Failed to generate certificate");
  }
}
function wrapText2(ctx, text2, maxWidth) {
  if (!text2) return [];
  const paragraphs = text2.split("\n");
  const result = [];
  for (const paragraph of paragraphs) {
    if (paragraph.trim() === "") {
      result.push("");
      continue;
    }
    const words = paragraph.split(" ");
    let line = "";
    for (const word of words) {
      const testLine = line ? line + " " + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line) {
        result.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    result.push(line);
  }
  return result;
}

// server/routes.ts
init_optimized_image_generator();

// server/batch-processor.ts
init_storage();
import * as XLSX from "xlsx";
import * as fs4 from "fs";
import * as path4 from "path";
import { format } from "date-fns";
import { randomUUID as randomUUID2 } from "crypto";
async function processExcelBatch(batchId, filePath, template) {
  try {
    await storage.updateCertificateBatch(batchId, {
      status: "processing",
      processedItems: 0
    });
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    await storage.updateCertificateBatch(batchId, {
      totalItems: data.length
    });
    const batch = await storage.getCertificateBatch(batchId);
    if (!batch) {
      throw new Error("Batch not found");
    }
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 2;
      try {
        const batchItem = await storage.createBatchItem({
          batchId,
          status: "processing",
          formData: row,
          rowNumber
        });
        const formData = {
          ...row,
          date: row.date ? formatExcelDate(row.date) : format(/* @__PURE__ */ new Date(), "yyyy/MM/dd")
        };
        const imagePath = await generateCertificateImage(template, formData);
        const certificate = await storage.createCertificate({
          templateId: template.id,
          userId: batch.userId,
          title: formData.title || template.title,
          titleAr: formData.titleAr || template.titleAr,
          certificateType: formData.certificateType || "appreciation",
          formData,
          imageUrl: `/uploads/${path4.basename(imagePath)}`,
          status: "active",
          issuedTo: formData.issuedTo || formData.name || formData.recipient,
          issuedToGender: formData.issuedToGender || formData.gender || "male",
          publicId: randomUUID2(),
          verificationCode: generateVerificationCode()
        });
        await storage.updateBatchItem(batchItem.id, {
          certificateId: certificate.id,
          status: "completed",
          processedAt: /* @__PURE__ */ new Date()
        });
        await storage.updateCertificateBatch(batchId, {
          processedItems: i + 1
        });
      } catch (error) {
        console.error(`Error processing row ${rowNumber}:`, error);
        await storage.updateBatchItem(i + 1, {
          status: "failed",
          errorMessage: `${error}`,
          processedAt: /* @__PURE__ */ new Date()
        });
      }
    }
    await storage.updateCertificateBatch(batchId, {
      status: "completed",
      completedAt: /* @__PURE__ */ new Date()
    });
    try {
      fs4.unlinkSync(filePath);
    } catch (error) {
      console.warn("Could not delete temp file:", filePath, error);
    }
  } catch (error) {
    console.error("Error processing batch:", error);
    await storage.updateCertificateBatch(batchId, {
      status: "failed"
    });
    throw error;
  }
}
function formatExcelDate(excelDate) {
  try {
    if (typeof excelDate === "string") {
      return excelDate;
    }
    let date2 = new Date((excelDate - 25569) * 86400 * 1e3);
    return format(date2, "yyyy/MM/dd");
  } catch (error) {
    console.error("Error formatting Excel date:", error);
    return String(excelDate);
  }
}
function generateVerificationCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// server/routes.ts
init_schema();
init_db();
import multer3 from "multer";
import { randomUUID as randomUUID5 } from "crypto";
import { z as z5 } from "zod";

// server/api/admin-settings.ts
import express from "express";
init_storage();
var router = express.Router();
router.get("/display", isAdmin, async (req, res) => {
  try {
    const settings2 = await storage.getSettings("display");
    return res.json({ settings: settings2 || {
      displayMode: "multi",
      templateViewMode: "multi-page",
      // 'multi-page' للطريقة التقليدية، 'single-page' للطريقة الجديدة
      enableSocialFormats: true,
      defaultSocialFormat: "instagram"
    } });
  } catch (error) {
    console.error("Error fetching display settings:", error);
    return res.status(500).json({ message: "Error fetching display settings", error: error.message });
  }
});
router.post("/display", isAdmin, async (req, res) => {
  try {
    const data = req.body;
    const displayMode = data.displayMode && typeof data.displayMode === "object" && "value" in data.displayMode ? data.displayMode.value : data.displayMode || "multi";
    const templateViewMode = data.templateViewMode && typeof data.templateViewMode === "object" && "value" in data.templateViewMode ? data.templateViewMode.value : data.templateViewMode || "multi-page";
    const enableSocialFormats = data.enableSocialFormats && typeof data.enableSocialFormats === "object" && "value" in data.enableSocialFormats ? data.enableSocialFormats.value : data.enableSocialFormats !== void 0 ? data.enableSocialFormats : true;
    const defaultSocialFormat = data.defaultSocialFormat && typeof data.defaultSocialFormat === "object" && "value" in data.defaultSocialFormat ? data.defaultSocialFormat.value : data.defaultSocialFormat || "";
    console.log("Updating display settings with:", {
      displayMode,
      templateViewMode,
      enableSocialFormats,
      defaultSocialFormat
    });
    await storage.updateSettingValue("display", "displayMode", displayMode);
    await storage.updateSettingValue("display", "templateViewMode", templateViewMode);
    await storage.updateSettingValue("display", "enableSocialFormats", enableSocialFormats);
    await storage.updateSettingValue("display", "defaultSocialFormat", defaultSocialFormat);
    const settings2 = {
      displayMode,
      templateViewMode,
      enableSocialFormats,
      defaultSocialFormat
    };
    return res.json({ success: true, settings: settings2 });
  } catch (error) {
    console.error("Error updating display settings:", error);
    return res.status(500).json({ message: "Error updating display settings", error: error.message });
  }
});
router.get("/social-formats", async (req, res) => {
  try {
    const { DEFAULT_SOCIAL_FORMATS: DEFAULT_SOCIAL_FORMATS2 } = await Promise.resolve().then(() => (init_social_image_generator(), social_image_generator_exports));
    let formats = DEFAULT_SOCIAL_FORMATS2;
    try {
      const settingsArray = await storage.getSettingsByCategory("social-formats");
      if (settingsArray && settingsArray.length > 0) {
        formats = {};
        for (const setting of settingsArray) {
          try {
            if (setting.key && setting.value) {
              formats[setting.key] = JSON.parse(String(setting.value));
            }
          } catch (parseError) {
            console.error(`Error parsing format setting for ${setting.key}:`, parseError);
          }
        }
      }
    } catch (dbError) {
      console.error("Error fetching social formats from database:", dbError);
    }
    return res.json({ formats });
  } catch (error) {
    console.error("Error fetching social formats:", error);
    return res.status(500).json({ message: "Error fetching social formats", error: error.message });
  }
});
router.post("/social-formats", isAdmin, async (req, res) => {
  try {
    const { formats } = req.body;
    if (!formats || typeof formats !== "object") {
      return res.status(400).json({ message: "Invalid format data" });
    }
    const results = [];
    for (const [key, value] of Object.entries(formats)) {
      const stringValue = JSON.stringify(value);
      const result = await storage.updateSetting("social-formats", key, stringValue);
      results.push(result);
    }
    return res.json({ success: true, results });
  } catch (error) {
    console.error("Error updating social formats:", error);
    return res.status(500).json({ message: "Error updating social formats", error: error.message });
  }
});
var admin_settings_default = router;

// server/api/auth-settings.ts
import express2 from "express";
init_storage();
init_db();
init_schema();
import { z } from "zod";
import { eq as eq2 } from "drizzle-orm";
var router2 = express2.Router();
router2.get("/", isAdmin, async (req, res) => {
  try {
    const settings2 = await storage.getAllAuthSettings();
    res.json({ settings: settings2 });
  } catch (error) {
    console.error("Error fetching auth settings:", error);
    res.status(500).json({ message: "Failed to fetch auth settings" });
  }
});
router2.get("/:provider", isAdmin, async (req, res) => {
  try {
    const provider = req.params.provider;
    const settings2 = await storage.getAuthSettings(provider);
    if (!settings2) {
      return res.status(404).json({ message: `Settings for provider ${provider} not found` });
    }
    res.json({ settings: settings2 });
  } catch (error) {
    console.error(`Error fetching auth settings for provider ${req.params.provider}:`, error);
    res.status(500).json({ message: "Failed to fetch provider settings" });
  }
});
router2.post("/", isAdmin, async (req, res) => {
  try {
    const settingsSchema = z.object({
      provider: z.string(),
      clientId: z.string().optional(),
      clientSecret: z.string().optional(),
      redirectUri: z.string().optional(),
      enabled: z.boolean(),
      settings: z.record(z.any()).optional()
    });
    const validationResult = settingsSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid settings data",
        errors: validationResult.error.errors
      });
    }
    const settingsData = validationResult.data;
    const existingSettings = await storage.getAuthSettings(settingsData.provider);
    let result;
    if (existingSettings) {
      result = await storage.updateAuthSettings(
        settingsData.provider,
        {
          clientId: settingsData.clientId,
          clientSecret: settingsData.clientSecret,
          redirectUri: settingsData.redirectUri,
          enabled: settingsData.enabled,
          settings: settingsData.settings
        }
      );
    } else {
      const [newSettings] = await db.insert(authSettings).values({
        provider: settingsData.provider,
        clientId: settingsData.clientId,
        clientSecret: settingsData.clientSecret,
        redirectUri: settingsData.redirectUri,
        enabled: settingsData.enabled,
        settings: settingsData.settings || {},
        updatedAt: /* @__PURE__ */ new Date(),
        updatedBy: req.user?.id
      }).returning();
      result = {
        id: newSettings.id,
        provider: newSettings.provider,
        clientId: newSettings.clientId,
        clientSecret: newSettings.clientSecret,
        redirectUri: newSettings.redirectUri,
        enabled: newSettings.enabled,
        settings: newSettings.settings,
        updatedAt: newSettings.updatedAt,
        updatedBy: newSettings.updatedBy
      };
    }
    res.json({
      message: `Settings for ${settingsData.provider} ${existingSettings ? "updated" : "created"} successfully`,
      settings: result
    });
  } catch (error) {
    console.error("Error saving auth settings:", error);
    res.status(500).json({ message: "Failed to save auth settings" });
  }
});
router2.delete("/:provider", isAdmin, async (req, res) => {
  try {
    const provider = req.params.provider;
    const result = await db.delete(authSettings).where(eq2(authSettings.provider, provider)).returning();
    if (result.length === 0) {
      return res.status(404).json({ message: `Settings for provider ${provider} not found` });
    }
    res.json({
      message: `Settings for ${provider} deleted successfully`,
      settings: result[0]
    });
  } catch (error) {
    console.error(`Error deleting auth settings for provider ${req.params.provider}:`, error);
    res.status(500).json({ message: "Failed to delete provider settings" });
  }
});
var auth_settings_default = router2;

// server/api/admin-stats.ts
import express3 from "express";
init_db();
init_schema();
import { count, sql as sql2 } from "drizzle-orm";
import { and as and2, gt, lt } from "drizzle-orm/expressions";
import { sub } from "date-fns";
var router3 = express3.Router();
router3.get("/stats", isAdmin, async (req, res) => {
  try {
    const [
      usersCount,
      categoriesCount,
      templatesCount,
      certificatesCount,
      cardsCount
    ] = await Promise.all([
      db.select({ count: count() }).from(users).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(categories).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(templates).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(certificates).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(cards).then((result) => result[0]?.count || 0)
    ]);
    const now = /* @__PURE__ */ new Date();
    const oneWeekAgo = sub(now, { weeks: 1 });
    const twoWeeksAgo = sub(now, { weeks: 2 });
    const [
      newUsersThisWeek,
      newCardsThisWeek,
      newCertificatesThisWeek
    ] = await Promise.all([
      db.select({ count: count() }).from(users).where(gt(users.createdAt, oneWeekAgo)).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(cards).where(gt(cards.createdAt, oneWeekAgo)).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(certificates).where(gt(certificates.createdAt, oneWeekAgo)).then((result) => result[0]?.count || 0)
    ]);
    const [
      newUsersLastWeek,
      newCardsLastWeek,
      newCertificatesLastWeek
    ] = await Promise.all([
      db.select({ count: count() }).from(users).where(and2(
        gt(users.createdAt, twoWeeksAgo),
        lt(users.createdAt, oneWeekAgo)
      )).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(cards).where(and2(
        gt(cards.createdAt, twoWeeksAgo),
        lt(cards.createdAt, oneWeekAgo)
      )).then((result) => result[0]?.count || 0),
      db.select({ count: count() }).from(certificates).where(and2(
        gt(certificates.createdAt, twoWeeksAgo),
        lt(certificates.createdAt, oneWeekAgo)
      )).then((result) => result[0]?.count || 0)
    ]);
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round((current - previous) / previous * 100);
    };
    const userGrowth = calculateGrowth(newUsersThisWeek, newUsersLastWeek);
    const cardGrowth = calculateGrowth(newCardsThisWeek, newCardsLastWeek);
    const certificateGrowth = calculateGrowth(newCertificatesThisWeek, newCertificatesLastWeek);
    res.json({
      totalUsers: usersCount,
      totalCategories: categoriesCount,
      totalTemplates: templatesCount,
      totalCertificates: certificatesCount,
      totalCards: cardsCount,
      newUsersThisWeek,
      newCardsThisWeek,
      newCertificatesThisWeek,
      userGrowth,
      cardGrowth,
      certificateGrowth
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Error fetching admin statistics" });
  }
});
router3.get("/certificates/recent", isAdmin, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const recentCertificates = await db.select({
      id: certificates.id,
      title: certificates.title,
      createdAt: certificates.createdAt,
      status: certificates.status,
      userId: certificates.userId,
      imageUrl: certificates.imageUrl
    }).from(certificates).orderBy(sql2`${certificates.createdAt} DESC`).limit(limit);
    const result = await Promise.all(recentCertificates.map(async (cert) => {
      let user = null;
      if (cert.userId) {
        const [userResult] = await db.select({ id: users.id, username: users.username }).from(users).where(sql2`${users.id} = ${cert.userId}`);
        user = userResult;
      }
      return {
        ...cert,
        user: user || void 0
      };
    }));
    res.json(result);
  } catch (error) {
    console.error("Error fetching recent certificates:", error);
    res.status(500).json({ message: "Error fetching recent certificates" });
  }
});
router3.get("/cards/recent", isAdmin, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const recentCards = await db.select({
      id: cards.id,
      formData: cards.formData,
      createdAt: cards.createdAt,
      status: cards.status,
      userId: cards.userId,
      imageUrl: cards.imageUrl
    }).from(cards).orderBy(sql2`${cards.createdAt} DESC`).limit(limit);
    const result = await Promise.all(recentCards.map(async (card) => {
      let user = null;
      if (card.userId) {
        const [userResult] = await db.select({ id: users.id, username: users.username }).from(users).where(sql2`${users.id} = ${card.userId}`);
        user = userResult;
      }
      const formData = card.formData || {};
      const title = formData.title || formData.name || formData.eventName || "\u0628\u0637\u0627\u0642\u0629 \u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646";
      return {
        ...card,
        title,
        user: user || void 0
      };
    }));
    res.json(result);
  } catch (error) {
    console.error("Error fetching recent cards:", error);
    res.status(500).json({ message: "Error fetching recent cards" });
  }
});
router3.get("/users/recent", isAdmin, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const recentUsers = await db.select({
      id: users.id,
      title: sql2`COALESCE(${users.username}, ${users.email}, 'مستخدم')`,
      createdAt: users.createdAt
    }).from(users).orderBy(sql2`${users.createdAt} DESC`).limit(limit);
    res.json(recentUsers);
  } catch (error) {
    console.error("Error fetching recent users:", error);
    res.status(500).json({ message: "Error fetching recent users" });
  }
});
var admin_stats_default = router3;

// server/api/cards.ts
init_storage();
init_optimized_image_generator();
import express4 from "express";
import fs6 from "fs";
import path6 from "path";
var router4 = express4.Router();
router4.post("/:id/update-image", async (req, res) => {
  try {
    const { id } = req.params;
    const { imageData, quality = "preview" } = req.body;
    if (!imageData) {
      return res.status(400).json({ message: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0635\u0648\u0631\u0629 \u0645\u0631\u0633\u0644\u0629" });
    }
    const card = await storage.getCard(parseInt(id));
    if (!card) {
      return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    if (req.isAuthenticated() && card.userId && req.user.id !== card.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const uploadDir = path6.join(process.cwd(), "uploads");
    const generatedDir = path6.join(uploadDir, "generated");
    await fs6.promises.mkdir(uploadDir, { recursive: true });
    await fs6.promises.mkdir(generatedDir, { recursive: true });
    const timestamp2 = Date.now();
    const filename = `card_${id}_${timestamp2}_${quality}.png`;
    const uploadPath = path6.join(generatedDir, filename);
    try {
      const sharp2 = __require("sharp");
      let optimizedBuffer;
      if (quality === "preview" || quality === "low") {
        optimizedBuffer = await sharp2(buffer).resize({ width: 800, withoutEnlargement: true, fastShrinkOnLoad: true }).webp({ quality: quality === "preview" ? 65 : 75 }).toBuffer();
      } else if (quality === "medium") {
        optimizedBuffer = await sharp2(buffer).jpeg({ quality: 85 }).toBuffer();
      } else {
        optimizedBuffer = await sharp2(buffer).png({ compressionLevel: 6 }).toBuffer();
      }
      await fs6.promises.writeFile(uploadPath, optimizedBuffer);
    } catch (sharpError) {
      console.error("Error optimizing image with sharp:", sharpError);
      await fs6.promises.writeFile(uploadPath, buffer);
    }
    if (card.imageUrl) {
      const oldImagePath = path6.join(process.cwd(), card.imageUrl.replace(/^\//, ""));
      try {
        await fs6.promises.access(oldImagePath, fs6.constants.F_OK);
        await fs6.promises.unlink(oldImagePath);
      } catch (error) {
        console.warn(`Old image at ${oldImagePath} could not be deleted:`, error);
      }
    }
    const imageUrl = `/uploads/generated/${filename}`;
    await storage.updateCard(card.id, { imageUrl, quality });
    res.json({
      success: true,
      imageUrl,
      quality,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0635\u0648\u0631\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u062C\u0627\u062D"
    });
  } catch (error) {
    console.error("Error updating card image:", error);
    res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0635\u0648\u0631\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
  }
});
router4.patch("/:id/update-design", async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.body;
    if (!fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0642\u0648\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
    }
    const card = await storage.getCard(parseInt(id));
    if (!card) {
      return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    if (req.isAuthenticated() && card.userId && req.user.id !== card.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
    let updatedFormData = { ...card.formData };
    updatedFormData._designFields = fields;
    await storage.updateCard(card.id, { formData: updatedFormData });
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0628\u0646\u062C\u0627\u062D"
    });
  } catch (error) {
    console.error("Error updating card design:", error);
    res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
  }
});
router4.post("/:id/download", async (req, res) => {
  try {
    const { id } = req.params;
    const { quality = "high" } = req.body;
    const validQuality = ["preview", "low", "medium", "high", "download"].includes(quality) ? quality : "high";
    console.log(`Processing download request for card ID: ${id} with quality: ${validQuality}`);
    const card = await storage.getCard(parseInt(id));
    if (!card) {
      return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    const template = await storage.getTemplate(card.templateId);
    if (!template) {
      return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    const templateFields2 = template.fields || [];
    const formData = card.formData || {};
    const templateSettings = template.settings || {};
    const outputWidth = templateSettings.width ? parseInt(templateSettings.width) : 1200;
    const outputHeight = templateSettings.height ? parseInt(templateSettings.height) : 1600;
    console.log(`Generating download image with dimensions: ${outputWidth}x${outputHeight}`);
    const fieldsToUse = formData._designFields || templateFields2;
    const imagePath = await generateOptimizedCardImage({
      templatePath: template.imageUrl,
      fields: fieldsToUse,
      formData,
      quality: validQuality,
      outputWidth,
      outputHeight,
      outputFormat: validQuality === "download" ? "png" : "jpeg"
    });
    const imageUrl = `/uploads/generated/${path6.basename(imagePath)}`;
    if (validQuality === "high" || validQuality === "download") {
      await storage.updateCard(card.id, {
        imageUrl,
        lastDownloaded: /* @__PURE__ */ new Date()
      });
    }
    console.log(`Download image generated: ${imageUrl}`);
    res.json({
      success: true,
      imageUrl,
      quality: validQuality,
      message: "\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0646\u0632\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"
    });
  } catch (error) {
    console.error("Error generating download image:", error);
    res.status(500).json({
      message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0648\u0644\u064A\u062F \u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0646\u0632\u064A\u0644",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});
var cards_default = router4;

// server/api/layers.ts
init_storage();
import express5 from "express";
import { z as z2 } from "zod";
init_schema();
var router5 = express5.Router();
router5.get("/template/:templateId", async (req, res) => {
  try {
    const templateId = parseInt(req.params.templateId);
    if (isNaN(templateId)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const layers2 = await storage.getLayers(templateId);
    res.json(layers2);
  } catch (error) {
    console.error("Error fetching layers:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u0637\u0628\u0642\u0627\u062A" });
  }
});
router5.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const layer = await storage.getLayer(id);
    if (!layer) {
      return res.status(404).json({ error: "\u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    res.json(layer);
  } catch (error) {
    console.error("Error fetching layer:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u0637\u0628\u0642\u0629" });
  }
});
router5.post("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const layerData = insertLayerSchema.parse(req.body);
    const newLayer = await storage.createLayer(layerData);
    res.status(201).json(newLayer);
  } catch (error) {
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error creating layer:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0628\u0642\u0629" });
  }
});
router5.patch("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const layerData = insertLayerSchema.partial().parse(req.body);
    const updatedLayer = await storage.updateLayer(id, layerData);
    if (!updatedLayer) {
      return res.status(404).json({ error: "\u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    res.json(updatedLayer);
  } catch (error) {
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error updating layer:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0628\u0642\u0629" });
  }
});
router5.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const success = await storage.deleteLayer(id);
    if (!success) {
      return res.status(404).json({ error: "\u0627\u0644\u0637\u0628\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting layer:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0637\u0628\u0642\u0629" });
  }
});
router5.post("/reorder", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const schema = z2.object({
      templateId: z2.number(),
      layerIds: z2.array(z2.number())
    });
    const { templateId, layerIds } = schema.parse(req.body);
    const success = await storage.reorderLayers(templateId, layerIds);
    if (!success) {
      return res.status(500).json({ error: "\u0641\u0634\u0644 \u0641\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0637\u0628\u0642\u0627\u062A" });
    }
    res.json({ success: true });
  } catch (error) {
    if (error instanceof z2.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error reordering layers:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0637\u0628\u0642\u0627\u062A" });
  }
});
var layers_default = router5;

// server/api/logos.ts
init_storage();
import express6 from "express";
import { z as z3 } from "zod";
import multer from "multer";
import fs7 from "fs";
import path7 from "path";
init_schema();
import { randomUUID as randomUUID3 } from "crypto";
var router6 = express6.Router();
var uploadsDir = path7.join(process.cwd(), "uploads");
var tempDir = path7.join(process.cwd(), "temp");
var logosDir = path7.join(uploadsDir, "logos");
if (!fs7.existsSync(logosDir)) {
  fs7.mkdirSync(logosDir, { recursive: true });
}
var multerStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tempDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path7.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});
var fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0641 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u0641\u0642\u0637 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0635\u0648\u0631 \u0645\u062F\u0639\u0648\u0645\u0629."));
  }
};
var upload = multer({
  storage: multerStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB
  }
});
router6.get("/user", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const userId = req.user.id;
    const logos = await storage.getUserLogos(userId);
    res.json(logos);
  } catch (error) {
    console.error("Error fetching user logos:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" });
  }
});
router6.get("/user/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const logo = await storage.getUserLogo(id);
    if (!logo) {
      return res.status(404).json({ error: "\u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (logo.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
    res.json(logo);
  } catch (error) {
    console.error("Error fetching user logo:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u0634\u0639\u0627\u0631" });
  }
});
router6.post("/user", isAuthenticated, upload.single("logo"), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0641\u064A\u0631 \u0645\u0644\u0641 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
    const userId = req.user.id;
    const tempFilePath = req.file.path;
    const logoId = randomUUID3();
    const ext = path7.extname(req.file.originalname);
    const fileName = `user-logo-${userId}-${logoId}${ext}`;
    const logoPath = path7.join(logosDir, fileName);
    fs7.copyFileSync(tempFilePath, logoPath);
    fs7.unlinkSync(tempFilePath);
    const nameSchema = z3.object({
      name: z3.string().min(1).default("\u0634\u0639\u0627\u0631")
    });
    let name = "\u0634\u0639\u0627\u0631";
    try {
      const parsedBody = nameSchema.parse(req.body);
      name = parsedBody.name;
    } catch (e) {
    }
    const imageUrl = `/uploads/logos/${fileName}`;
    const logoData = insertUserLogoSchema.parse({
      userId,
      name,
      imageUrl,
      isActive: true
    });
    const newLogo = await storage.createUserLogo(logoData);
    res.status(201).json(newLogo);
  } catch (error) {
    if (error instanceof z3.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error uploading user logo:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631" });
  }
});
router6.patch("/user/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const existingLogo = await storage.getUserLogo(id);
    if (!existingLogo) {
      return res.status(404).json({ error: "\u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (existingLogo.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
    const logoData = insertUserLogoSchema.partial().parse(req.body);
    const updatedLogo = await storage.updateUserLogo(id, logoData);
    res.json(updatedLogo);
  } catch (error) {
    if (error instanceof z3.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error updating user logo:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0634\u0639\u0627\u0631" });
  }
});
router6.delete("/user/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const existingLogo = await storage.getUserLogo(id);
    if (!existingLogo) {
      return res.status(404).json({ error: "\u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (existingLogo.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
    try {
      const filePath = path7.join(process.cwd(), existingLogo.imageUrl.replace(/^\//, ""));
      if (fs7.existsSync(filePath)) {
        fs7.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Error deleting logo file:", err);
    }
    const success = await storage.deleteUserLogo(id);
    res.json({ success });
  } catch (error) {
    console.error("Error deleting user logo:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631" });
  }
});
router6.get("/template/:templateId", async (req, res) => {
  try {
    const templateId = parseInt(req.params.templateId);
    if (isNaN(templateId)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const logos = await storage.getTemplateLogos(templateId);
    res.json(logos);
  } catch (error) {
    console.error("Error fetching template logos:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628" });
  }
});
router6.get("/template/logo/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const logo = await storage.getTemplateLogo(id);
    if (!logo) {
      return res.status(404).json({ error: "\u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    res.json(logo);
  } catch (error) {
    console.error("Error fetching template logo:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u0634\u0639\u0627\u0631" });
  }
});
var logos_default = router6;

// server/api/signatures.ts
init_storage();
import express7 from "express";
import { z as z4 } from "zod";
import multer2 from "multer";
import fs8 from "fs";
import path8 from "path";
init_schema();
import { randomUUID as randomUUID4 } from "crypto";
var router7 = express7.Router();
var uploadsDir2 = path8.join(process.cwd(), "uploads");
var tempDir2 = path8.join(process.cwd(), "temp");
var signaturesDir = path8.join(uploadsDir2, "signatures");
if (!fs8.existsSync(signaturesDir)) {
  fs8.mkdirSync(signaturesDir, { recursive: true });
}
var multerStorage2 = multer2.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tempDir2);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path8.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});
var fileFilter2 = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0641 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645. \u0641\u0642\u0637 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0635\u0648\u0631 \u0645\u062F\u0639\u0648\u0645\u0629."));
  }
};
var upload2 = multer2({
  storage: multerStorage2,
  fileFilter: fileFilter2,
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB
  }
});
router7.get("/", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const userId = req.user.id;
    const type = req.query.type;
    const signatures = await storage.getUserSignatures(userId, type);
    res.json(signatures);
  } catch (error) {
    console.error("Error fetching user signatures:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A" });
  }
});
router7.get("/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const signature = await storage.getUserSignature(id);
    if (!signature) {
      return res.status(404).json({ error: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (signature.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
    res.json(signature);
  } catch (error) {
    console.error("Error fetching user signature:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
  }
});
router7.post("/", isAuthenticated, upload2.single("signature"), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0641\u064A\u0631 \u0645\u0644\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
    const userId = req.user.id;
    const tempFilePath = req.file.path;
    const signatureId = randomUUID4();
    const ext = path8.extname(req.file.originalname);
    const fileName = `user-signature-${userId}-${signatureId}${ext}`;
    const signaturePath = path8.join(signaturesDir, fileName);
    fs8.copyFileSync(tempFilePath, signaturePath);
    fs8.unlinkSync(tempFilePath);
    const dataSchema = z4.object({
      name: z4.string().min(1).default("\u062A\u0648\u0642\u064A\u0639\u064A"),
      type: z4.enum(["signature", "stamp"]).default("signature")
    });
    let name = "\u062A\u0648\u0642\u064A\u0639\u064A";
    let type = "signature";
    try {
      const parsedBody = dataSchema.parse(req.body);
      name = parsedBody.name;
      type = parsedBody.type;
    } catch (e) {
    }
    const imageUrl = `/uploads/signatures/${fileName}`;
    const signatureData = insertUserSignatureSchema.parse({
      userId,
      name,
      imageUrl,
      type,
      isActive: true
    });
    const newSignature = await storage.createUserSignature(signatureData);
    res.status(201).json(newSignature);
  } catch (error) {
    if (error instanceof z4.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error uploading user signature:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
  }
});
router7.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const existingSignature = await storage.getUserSignature(id);
    if (!existingSignature) {
      return res.status(404).json({ error: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (existingSignature.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062A\u0639\u062F\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
    const signatureData = insertUserSignatureSchema.partial().parse(req.body);
    const updatedSignature = await storage.updateUserSignature(id, signatureData);
    res.json(updatedSignature);
  } catch (error) {
    if (error instanceof z4.ZodError) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", details: error.errors });
    }
    console.error("Error updating user signature:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
  }
});
router7.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0647" });
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "\u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
    }
    const existingSignature = await storage.getUserSignature(id);
    if (!existingSignature) {
      return res.status(404).json({ error: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
    }
    if (existingSignature.userId !== req.user.id) {
      return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
    try {
      const filePath = path8.join(process.cwd(), existingSignature.imageUrl.replace(/^\//, ""));
      if (fs8.existsSync(filePath)) {
        fs8.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("Error deleting signature file:", err);
    }
    const success = await storage.deleteUserSignature(id);
    res.json({ success });
  } catch (error) {
    console.error("Error deleting user signature:", error);
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
  }
});
var signatures_default = router7;

// server/api/health-check.ts
import express8 from "express";

// server/lib/env-loader.ts
import fs9 from "fs";
import path9 from "path";
import dotenv2 from "dotenv";
function loadEnv() {
  try {
    const envPath = path9.join(process.cwd(), ".env");
    if (fs9.existsSync(envPath)) {
      const envConfig = dotenv2.parse(fs9.readFileSync(envPath));
      for (const key in envConfig) {
        if (!process.env[key]) {
          process.env[key] = envConfig[key];
        }
      }
    }
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 .env:", error);
  }
  try {
    const hostingerConfigPath = path9.join(process.cwd(), "hostinger.config.js");
    if (fs9.existsSync(hostingerConfigPath)) {
      const configContent = fs9.readFileSync(hostingerConfigPath, "utf8");
      const hostMatch = configContent.match(/host:[\s]*['"]([^'"]+)['"]/);
      const userMatch = configContent.match(/user:[\s]*['"]([^'"]+)['"]/);
      const passwordMatch = configContent.match(/password:[\s]*['"]([^'"]+)['"]/);
      const nameMatch = configContent.match(/name:[\s]*['"]([^'"]+)['"]/);
      const portMatch = configContent.match(/port:[\s]*['"]([^'"]+)['"]/);
      const host = hostMatch ? hostMatch[1] : "localhost";
      const user = userMatch ? userMatch[1] : "";
      const password = passwordMatch ? passwordMatch[1] : "";
      const name = nameMatch ? nameMatch[1] : "";
      const port = portMatch ? portMatch[1] : "5432";
      if (!process.env.DATABASE_URL && user && password && name) {
        process.env.DATABASE_URL = `postgres://${user}:${password}@${host}:${port}/${name}`;
      }
    }
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 hostinger.config.js:", error);
  }
  if (!process.env.DATABASE_URL && process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME) {
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || "5432";
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    process.env.DATABASE_URL = `postgres://${user}:${password}@${host}:${port}/${database}`;
  }
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development";
  }
}

// server/lib/db-adapter.ts
init_db();
loadEnv();
var isReplit = process.env.REPL_ID !== void 0;
var isProduction = process.env.NODE_ENV === "production";
var DB_TYPE = "postgres";
console.log(`
==== \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A ====`);
console.log(`\u{1F310} \u0627\u0644\u0628\u064A\u0626\u0629: ${isProduction ? "\u0625\u0646\u062A\u0627\u062C" : "\u062A\u0637\u0648\u064A\u0631"}${isReplit ? " (Replit)" : ""}`);
console.log(`\u{1F504} \u0646\u0648\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${DB_TYPE}`);
var adapter = db_exports;
var pool3 = adapter.pool;
var db2 = adapter.db;
var checkDatabaseConnection2 = adapter.checkDatabaseConnection;
var withDatabaseRetry2 = adapter.withDatabaseRetry;

// server/lib/database-health.ts
var MAX_AUTO_RECONNECT_ATTEMPTS = 3;
async function performDatabaseHealthCheck() {
  const startTime = Date.now();
  try {
    const client = await pool3.connect();
    try {
      const result = await client.query("SELECT 1 as connection_test");
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      if (result.rows[0]?.connection_test === 1) {
        return {
          status: "ok",
          message: "\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u062C\u064A\u062F",
          timestamp: /* @__PURE__ */ new Date(),
          connectionTime: responseTime,
          details: {
            poolSize: pool3.totalCount,
            idleConnections: pool3.idleCount,
            waitingCount: pool3.waitingCount
          }
        };
      } else {
        return {
          status: "error",
          message: "\u062A\u0645 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u0644\u0643\u0646 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0641\u0634\u0644",
          timestamp: /* @__PURE__ */ new Date(),
          connectionTime: responseTime
        };
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("\u2757 \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", error);
    return {
      status: "error",
      message: `\u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${error.message}`,
      timestamp: /* @__PURE__ */ new Date(),
      details: { error: error.message, stack: error.stack }
    };
  }
}
async function attemptDatabaseRecovery(maxAttempts = MAX_AUTO_RECONNECT_ATTEMPTS) {
  console.log(`\u{1F504} \u062C\u0627\u0631\u064A \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (\u0628\u062D\u062F \u0623\u0642\u0635\u0649 ${maxAttempts} \u0645\u062D\u0627\u0648\u0644\u0627\u062A)`);
  let recoveryStatus = {
    status: "recovering",
    message: "\u062C\u0627\u0631\u064A \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",
    timestamp: /* @__PURE__ */ new Date(),
    recoveryAttempts: 0
  };
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    recoveryStatus.recoveryAttempts = attempt;
    console.log(`\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 ${attempt}/${maxAttempts}...`);
    try {
      await new Promise((resolve2) => setTimeout(resolve2, 1e3 * attempt));
      const client = await pool3.connect();
      const result = await client.query("SELECT 1 as connection_test");
      client.release();
      if (result && result.rows && result.rows[0] && result.rows[0].connection_test === 1) {
        console.log(`\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D (\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 ${attempt})`);
        return {
          status: "ok",
          message: `\u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D \u0628\u0639\u062F ${attempt} \u0645\u062D\u0627\u0648\u0644\u0627\u062A`,
          timestamp: /* @__PURE__ */ new Date(),
          recoveryAttempts: attempt,
          details: {
            recoveryMethod: "connection_retry",
            attemptNumber: attempt
          }
        };
      }
    } catch (error) {
      console.error(`\u274C \u0641\u0634\u0644\u062A \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0625\u0635\u0644\u0627\u062D ${attempt}/${maxAttempts}:`, error);
    }
  }
  console.error(`\u274C \u0641\u0634\u0644\u062A \u062C\u0645\u064A\u0639 \u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (${maxAttempts} \u0645\u062D\u0627\u0648\u0644\u0627\u062A)`);
  return {
    status: "critical",
    message: `\u0641\u0634\u0644\u062A \u062C\u0645\u064A\u0639 \u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A (${maxAttempts} \u0645\u062D\u0627\u0648\u0644\u0627\u062A)`,
    timestamp: /* @__PURE__ */ new Date(),
    recoveryAttempts: maxAttempts
  };
}
function setupPeriodicDatabaseHealthCheck(intervalSeconds = 300) {
  console.log(`\u{1F550} \u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u062F\u0648\u0631\u064A \u0645\u0646 \u0635\u062D\u0629 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0644 ${intervalSeconds} \u062B\u0627\u0646\u064A\u0629`);
  return setInterval(async () => {
    console.log("\u{1F550} \u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u062F\u0648\u0631\u064A \u0645\u0646 \u0635\u062D\u0629 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
    const healthStatus = await performDatabaseHealthCheck();
    if (healthStatus.status !== "ok") {
      console.warn(`\u26A0\uFE0F \u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u062F\u0648\u0631\u064A \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${healthStatus.message}`);
      const recoveryStatus = await attemptDatabaseRecovery();
      if (recoveryStatus.status === "ok") {
        console.log("\u2705 \u062A\u0645 \u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627");
      } else {
        console.error("\u274C \u0641\u0634\u0644\u062A \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      }
    } else {
      console.log("\u2705 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u062C\u064A\u062F");
    }
  }, intervalSeconds * 1e3);
}
function scheduleHealthChecks() {
  console.log("\u{1F4C6} \u062C\u062F\u0648\u0644\u0629 \u0627\u0644\u062A\u062D\u0642\u0642\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u064A\u0629 \u0644\u0635\u062D\u0629 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
  setTimeout(async () => {
    try {
      const initialHealth = await performDatabaseHealthCheck();
      console.log(`\u2139\uFE0F \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u0628\u062F\u0626\u064A \u0644\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A: ${initialHealth.status}`);
      if (initialHealth.status !== "ok") {
        console.warn("\u26A0\uFE0F \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u064A\u0633\u062A \u0628\u062D\u0627\u0644\u0629 \u062C\u064A\u062F\u0629 \u0639\u0646\u062F \u0628\u062F\u0621 \u0627\u0644\u062A\u0637\u0628\u064A\u0642");
        const recoveryStatus = await attemptDatabaseRecovery();
        console.log(`\u2139\uFE0F \u0646\u062A\u064A\u062C\u0629 \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0625\u0635\u0644\u0627\u062D \u0627\u0644\u0641\u0648\u0631\u064A\u0629: ${recoveryStatus.status}`);
      }
    } catch (error) {
      console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0645\u0628\u062F\u0626\u064A \u0644\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", error);
    }
  }, 2e3);
  const timer = setupPeriodicDatabaseHealthCheck(300);
  return { timer };
}

// server/api/health-check.ts
init_db();
var router8 = express8.Router();
router8.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "\u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u062C\u064A\u062F",
    timestamp: /* @__PURE__ */ new Date(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});
router8.get("/database", async (req, res) => {
  try {
    const healthStatus = await performDatabaseHealthCheck();
    if (healthStatus.status === "ok") {
      res.json(healthStatus);
    } else {
      res.status(503).json(healthStatus);
      setTimeout(async () => {
        await attemptDatabaseRecovery();
      }, 1e3);
    }
  } catch (error) {
    console.error("Error checking database health:", error);
    res.status(500).json({
      status: "error",
      message: `Error performing health check: ${error.message}`,
      timestamp: /* @__PURE__ */ new Date()
    });
  }
});
router8.post("/database/restart", async (req, res) => {
  try {
    console.log("\u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
    const success = await attemptDatabaseRecovery();
    if (success) {
      const connected = await checkDatabaseConnection();
      if (connected) {
        res.json({
          status: "ok",
          message: "\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D",
          timestamp: /* @__PURE__ */ new Date()
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "\u0641\u0634\u0644\u062A \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",
          timestamp: /* @__PURE__ */ new Date()
        });
      }
    } else {
      res.status(500).json({
        status: "error",
        message: "\u0641\u0634\u0644\u062A \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",
        timestamp: /* @__PURE__ */ new Date()
      });
    }
  } catch (error) {
    console.error("Error restarting database connection:", error);
    res.status(500).json({
      status: "error",
      message: `Error restarting database connection: ${error.message}`,
      timestamp: /* @__PURE__ */ new Date()
    });
  }
});
var health_check_default = router8;

// server/api/admin-maintenance.ts
import express9 from "express";
import fs11 from "fs";
import path11 from "path";
import util2 from "util";
import { exec as exec2 } from "child_process";

// server/lib/system-info.ts
init_db();
import os from "os";
import fs10 from "fs";
import path10 from "path";
import { exec } from "child_process";
import util from "util";

// server/lib/cache-manager.ts
var memoryCache = {};
async function clearCachedData() {
  Object.keys(memoryCache).forEach((key) => {
    delete memoryCache[key];
  });
  if (global.gc) {
    try {
      global.gc();
    } catch (e) {
    }
  }
  return Promise.resolve();
}
function getCacheStats() {
  const now = Date.now();
  const keys = Object.keys(memoryCache);
  const stats = {
    keys: keys.length,
    activeKeys: 0,
    expiredKeys: 0
  };
  keys.forEach((key) => {
    if (memoryCache[key].expiry >= now) {
      stats.activeKeys++;
    } else {
      stats.expiredKeys++;
    }
  });
  return stats;
}

// server/lib/system-info.ts
var execPromise = util.promisify(exec);
async function getServerInfo() {
  try {
    const systemInfo = {
      os: {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        arch: os.arch(),
        uptime: os.uptime(),
        loadAvg: os.loadavg(),
        hostname: os.hostname()
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        usedPercent: (1 - os.freemem() / os.totalmem()) * 100
      },
      cpus: os.cpus(),
      network: getNetworkInterfaces(),
      process: {
        pid: process.pid,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        env: getEnvironmentInfo(),
        version: process.version,
        argv: process.argv
      },
      app: {
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV || "development"
      },
      diskSpace: await getDiskSpace(),
      cache: getCacheStats(),
      database: await getDatabaseInfo(),
      directories: getDirectoriesInfo()
    };
    return systemInfo;
  } catch (error) {
    console.error("Error gathering system information:", error);
    return { error: "Error gathering system information", details: error.message };
  }
}
function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces();
  const result = {};
  for (const [key, value] of Object.entries(interfaces)) {
    if (value) {
      result[key] = value.map((adapter2) => ({
        address: adapter2.address,
        netmask: adapter2.netmask,
        family: adapter2.family,
        mac: adapter2.mac,
        internal: adapter2.internal,
        cidr: adapter2.cidr
      }));
    }
  }
  return result;
}
function getEnvironmentInfo() {
  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    TZ: process.env.TZ,
    HOME: process.env.HOME,
    USER: process.env.USER,
    PATH: process.env.PATH?.split(":").slice(0, 5).join(":") + "..."
  };
}
async function getDiskSpace() {
  try {
    if (os.platform() === "win32") {
      const { stdout } = await execPromise("wmic logicaldisk get size,freespace,caption");
      return stdout;
    } else {
      const { stdout } = await execPromise("df -h / /tmp");
      return stdout;
    }
  } catch (error) {
    console.error("Error getting disk space info:", error);
    return "Error getting disk space info";
  }
}
async function getDatabaseInfo() {
  try {
    const client = await pool.connect();
    try {
      const dbSizeResult = await client.query(`SELECT pg_size_pretty(pg_database_size(current_database())) as size`);
      const pgVersion = await client.query("SELECT version() as version");
      const connInfo = await client.query(`SELECT COUNT(*) as connections FROM pg_stat_activity`);
      const tableCountResult = await client.query(
        `SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema = 'public'`
      );
      const stats = {
        version: pgVersion.rows[0]?.version,
        size: dbSizeResult.rows[0]?.size,
        connections: connInfo.rows[0]?.connections,
        tables: tableCountResult.rows[0]?.tables,
        url: maskConnectionString(process.env.DATABASE_URL || ""),
        status: "connected"
      };
      return stats;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error getting database info:", error);
    return { status: "disconnected", error: error.message };
  }
}
function maskConnectionString(connectionString) {
  if (!connectionString) return "";
  try {
    if (connectionString.includes("@")) {
      return connectionString.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:****@");
    }
    return connectionString.substring(0, 10) + "****";
  } catch (e) {
    return "[connection string hidden]";
  }
}
function getDirectoriesInfo() {
  const root = process.cwd();
  const directories = {
    root,
    uploads: {
      path: path10.join(root, "uploads"),
      exists: fs10.existsSync(path10.join(root, "uploads")),
      files: 0,
      size: 0
    },
    temp: {
      path: path10.join(root, "temp"),
      exists: fs10.existsSync(path10.join(root, "temp")),
      files: 0,
      size: 0
    },
    static: {
      path: path10.join(root, "client", "static"),
      exists: fs10.existsSync(path10.join(root, "client", "static")),
      files: 0,
      size: 0
    }
  };
  try {
    if (directories.uploads.exists) {
      const uploadFiles = fs10.readdirSync(directories.uploads.path);
      directories.uploads.files = uploadFiles.length;
      const maxFiles = 100;
      let size = 0;
      for (let i = 0; i < Math.min(uploadFiles.length, maxFiles); i++) {
        try {
          const filePath = path10.join(directories.uploads.path, uploadFiles[i]);
          const stats = fs10.statSync(filePath);
          if (stats.isFile()) {
            size += stats.size;
          }
        } catch (e) {
        }
      }
      directories.uploads.size = size;
    }
    if (directories.temp.exists) {
      const tempFiles = fs10.readdirSync(directories.temp.path);
      directories.temp.files = tempFiles.length;
    }
    if (directories.static.exists) {
      const staticFiles = fs10.readdirSync(directories.static.path);
      directories.static.files = staticFiles.length;
    }
  } catch (error) {
    console.error("Error counting directory files:", error);
  }
  return directories;
}

// server/api/admin-maintenance.ts
var router9 = express9.Router();
var execPromise2 = util2.promisify(exec2);
router9.post("/clear-cache", isAdmin, async (req, res) => {
  try {
    await clearCachedData();
    console.log("\u2705 \u062A\u0645 \u0645\u0633\u062D \u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A \u0628\u0646\u062C\u0627\u062D");
    res.json({ success: true, message: "\u062A\u0645 \u0645\u0633\u062D \u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A \u0628\u0646\u062C\u0627\u062D" });
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0633\u062D \u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A:", error);
    res.status(500).json({ success: false, message: "\u0641\u0634\u0644 \u0645\u0633\u062D \u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A", error: error.message });
  }
});
router9.post("/purge-uploads", isAdmin, async (req, res) => {
  try {
    const foldersToClean = [
      path11.join(process.cwd(), "uploads", "temp"),
      path11.join(process.cwd(), "temp")
    ];
    let deletedCount = 0;
    for (const folder of foldersToClean) {
      if (fs11.existsSync(folder)) {
        const files = fs11.readdirSync(folder);
        for (const file of files) {
          const filePath = path11.join(folder, file);
          const fileStat = fs11.statSync(filePath);
          if (fileStat.isDirectory()) continue;
          const fileAgeHours = (Date.now() - fileStat.mtimeMs) / (1e3 * 60 * 60);
          if (fileAgeHours > 2) {
            fs11.unlinkSync(filePath);
            deletedCount++;
          }
        }
      }
    }
    console.log(`\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 ${deletedCount} \u0645\u0644\u0641 \u0645\u0646 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u0645\u0624\u0642\u062A\u0629`);
    res.json({ success: true, message: `\u062A\u0645 \u062A\u0646\u0638\u064A\u0641 ${deletedCount} \u0645\u0644\u0641 \u0645\u0646 \u0627\u0644\u0645\u062C\u0644\u062F\u0627\u062A \u0627\u0644\u0645\u0624\u0642\u062A\u0629` });
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629:", error);
    res.status(500).json({ success: false, message: "\u0641\u0634\u0644 \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629", error: error.message });
  }
});
router9.post("/restart-server", isAdmin, async (req, res) => {
  try {
    res.json({ success: true, message: "\u062C\u0627\u0631\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u0642\u062F \u064A\u0633\u062A\u063A\u0631\u0642 \u0627\u0644\u0623\u0645\u0631 \u0628\u0636\u0639 \u062B\u0648\u0627\u0646\u064A..." });
    console.log("\u{1F504} \u062C\u0627\u0631\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062E\u0627\u062F\u0645...");
    setTimeout(() => {
      process.exit(0);
    }, 1e3);
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062E\u0627\u062F\u0645:", error);
    res.status(500).json({ success: false, message: "\u0641\u0634\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062E\u0627\u062F\u0645", error: error.message });
  }
});
router9.get("/system-info", isAdmin, async (req, res) => {
  try {
    const systemInfo = await getServerInfo();
    res.json({ success: true, data: systemInfo });
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645:", error);
    res.status(500).json({ success: false, message: "\u0641\u0634\u0644 \u062C\u0644\u0628 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645", error: error.message });
  }
});
var admin_maintenance_default = router9;

// server/api/seo-router.ts
import express10 from "express";

// server/api/seo.ts
init_db();
init_schema();
import { eq as eq3, and as and3 } from "drizzle-orm";
async function getGlobalSeoSettings(req, res) {
  try {
    const seoSettings = await db.query.seo.findFirst({
      where: and3(
        eq3(seo.entityType, "global"),
        eq3(seo.entityId, null)
      )
    });
    if (!seoSettings) {
      return res.status(200).json({
        title: "\u0645\u0646\u0635\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
        description: "\u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0634\u0647\u0627\u062F\u0627\u062A \u0648\u0628\u0637\u0627\u0642\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0628\u0643\u0644 \u0633\u0647\u0648\u0644\u0629",
        keywords: [],
        entityType: "global",
        noIndex: false,
        structuredData: {}
      });
    }
    return res.status(200).json(seoSettings);
  } catch (error) {
    console.error("Error fetching global SEO settings:", error);
    return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SEO" });
  }
}
async function saveGlobalSeoSettings(req, res) {
  try {
    const payload = {
      ...req.body,
      entityType: "global",
      entityId: null,
      updatedBy: req.user?.id || null
    };
    const existingSeo = await db.query.seo.findFirst({
      where: and3(
        eq3(seo.entityType, "global"),
        eq3(seo.entityId, null)
      )
    });
    let result;
    if (existingSeo) {
      result = await db.update(seo).set({
        title: payload.title,
        description: payload.description || null,
        keywords: payload.keywords || [],
        ogImage: payload.ogImage || null,
        canonicalUrl: payload.canonicalUrl || null,
        noIndex: payload.noIndex || false,
        structuredData: payload.structuredData || {},
        updatedAt: /* @__PURE__ */ new Date(),
        updatedBy: payload.updatedBy
      }).where(and3(
        eq3(seo.entityType, "global"),
        eq3(seo.entityId, null)
      )).returning();
    } else {
      result = await db.insert(seo).values({
        title: payload.title,
        description: payload.description || null,
        keywords: payload.keywords || [],
        ogImage: payload.ogImage || null,
        entityType: "global",
        entityId: null,
        canonicalUrl: payload.canonicalUrl || null,
        structuredData: payload.structuredData || {},
        noIndex: payload.noIndex || false,
        updatedBy: payload.updatedBy
      }).returning();
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error saving global SEO settings:", error);
    return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SEO" });
  }
}
async function getEntitySeoSettings(req, res) {
  try {
    const { entityType, entityId } = req.params;
    if (!entityType || !entityId || isNaN(Number(entityId))) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
    }
    const seoSettings = await db.query.seo.findFirst({
      where: and3(
        eq3(seo.entityType, entityType),
        eq3(seo.entityId, Number(entityId))
      )
    });
    if (!seoSettings) {
      return res.status(404).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SEO \u0644\u0647\u0630\u0627 \u0627\u0644\u0643\u064A\u0627\u0646" });
    }
    return res.status(200).json(seoSettings);
  } catch (error) {
    console.error("Error fetching entity SEO settings:", error);
    return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SEO" });
  }
}
async function saveEntitySeoSettings(req, res) {
  try {
    const { entityType, entityId } = req.params;
    if (!entityType || !entityId || isNaN(Number(entityId))) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
    }
    const payload = {
      ...req.body,
      entityType,
      entityId: Number(entityId),
      updatedBy: req.user?.id || null
    };
    const existingSeo = await db.query.seo.findFirst({
      where: and3(
        eq3(seo.entityType, entityType),
        eq3(seo.entityId, Number(entityId))
      )
    });
    let result;
    if (existingSeo) {
      result = await db.update(seo).set({
        title: payload.title,
        description: payload.description || null,
        keywords: payload.keywords || [],
        ogImage: payload.ogImage || null,
        canonicalUrl: payload.canonicalUrl || null,
        noIndex: payload.noIndex || false,
        structuredData: payload.structuredData || {},
        updatedAt: /* @__PURE__ */ new Date(),
        updatedBy: payload.updatedBy
      }).where(and3(
        eq3(seo.entityType, entityType),
        eq3(seo.entityId, Number(entityId))
      )).returning();
    } else {
      result = await db.insert(seo).values({
        title: payload.title,
        description: payload.description || null,
        keywords: payload.keywords || [],
        ogImage: payload.ogImage || null,
        entityType,
        entityId: Number(entityId),
        canonicalUrl: payload.canonicalUrl || null,
        structuredData: payload.structuredData || {},
        noIndex: payload.noIndex || false,
        updatedBy: payload.updatedBy
      }).returning();
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error saving entity SEO settings:", error);
    return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A SEO" });
  }
}

// server/api/seo-router.ts
var router10 = express10.Router();
router10.get("/global", getGlobalSeoSettings);
router10.post("/global", isAuthenticated, isAdmin, saveGlobalSeoSettings);
router10.get("/:entityType/:entityId", getEntitySeoSettings);
router10.post("/:entityType/:entityId", isAuthenticated, isAdmin, saveEntitySeoSettings);
var seo_router_default = router10;

// server/api/template-fields.ts
init_storage();
init_db();
init_schema();
init_db();
import { eq as eq4, and as and4 } from "drizzle-orm";
async function getTemplateFields(req, res) {
  try {
    const { templateId } = req.params;
    if (!templateId || isNaN(Number(templateId))) {
      return res.status(400).json({
        success: false,
        message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"
      });
    }
    console.log(`Fetching fields for template ID: ${templateId}`);
    const fields = await storage.getTemplateFields(Number(templateId));
    res.json({
      success: true,
      fields
    });
  } catch (error) {
    console.error("Error fetching template fields:", error);
    res.status(500).json({
      success: false,
      message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"
    });
  }
}
async function updateTemplateFields(req, res) {
  try {
    const { templateId } = req.params;
    const { fields } = req.body;
    if (!templateId || isNaN(Number(templateId))) {
      return res.status(400).json({
        success: false,
        message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"
      });
    }
    if (!Array.isArray(fields)) {
      return res.status(400).json({
        success: false,
        message: "\u064A\u062C\u0628 \u062A\u0642\u062F\u064A\u0645 \u0645\u0635\u0641\u0648\u0641\u0629 \u0645\u0646 \u0627\u0644\u062D\u0642\u0648\u0644"
      });
    }
    console.log(`Updating ${fields.length} fields for template ID: ${templateId}`);
    const updatedFields = [];
    for (const field of fields) {
      if (field.id && !isNaN(Number(field.id))) {
        const updatedField = await storage.updateTemplateField(Number(field.id), {
          name: field.name,
          type: field.type,
          label: field.label,
          labelAr: field.labelAr,
          required: field.required,
          defaultValue: field.defaultValue,
          placeholder: field.placeholder,
          placeholderAr: field.placeholderAr,
          options: field.options,
          position: field.position,
          style: field.style,
          displayOrder: field.displayOrder,
          // إضافة دعم للخصائص الجديدة
          zIndex: field.zIndex,
          visible: field.visible !== void 0 ? field.visible : true,
          rotation: field.rotation || 0
        });
        updatedFields.push(updatedField);
      } else if (!field.id) {
        const newField = await storage.createTemplateField({
          name: field.name,
          type: field.type || "text",
          label: field.label,
          labelAr: field.labelAr,
          required: Boolean(field.required),
          defaultValue: field.defaultValue,
          placeholder: field.placeholder,
          placeholderAr: field.placeholderAr,
          options: field.options || [],
          position: field.position || { x: 50, y: 50 },
          style: field.style || {
            fontFamily: "Cairo",
            fontSize: 24,
            fontWeight: "normal",
            color: "#000000",
            align: "center",
            verticalPosition: "middle"
          },
          displayOrder: field.displayOrder || 0,
          templateId: Number(templateId),
          // إضافة دعم للخصائص الجديدة
          zIndex: field.zIndex || 1,
          visible: field.visible !== void 0 ? field.visible : true,
          rotation: field.rotation || 0
        });
        updatedFields.push(newField);
      }
    }
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0642\u0648\u0644 \u0628\u0646\u062C\u0627\u062D",
      fields: updatedFields
    });
  } catch (error) {
    console.error("Error updating template fields:", error);
    res.status(500).json({
      success: false,
      message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"
    });
  }
}
async function deleteTemplateField(req, res) {
  try {
    const { templateId, fieldId } = req.params;
    if (!templateId || isNaN(Number(templateId)) || !fieldId || isNaN(Number(fieldId))) {
      return res.status(400).json({
        success: false,
        message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0623\u0648 \u0645\u0639\u0631\u0641 \u0627\u0644\u062D\u0642\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"
      });
    }
    console.log(`Deleting field ID: ${fieldId} from template ID: ${templateId}`);
    const field = await withDatabaseRetry(async () => {
      const result = await db.select().from(templateFields).where(
        and4(
          eq4(templateFields.id, Number(fieldId)),
          eq4(templateFields.templateId, Number(templateId))
        )
      );
      return result[0];
    });
    if (!field) {
      return res.status(404).json({
        success: false,
        message: "\u0627\u0644\u062D\u0642\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u0644\u0627 \u064A\u0646\u062A\u0645\u064A \u0644\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u062D\u062F\u062F"
      });
    }
    await storage.deleteTemplateField(Number(fieldId));
    res.json({
      success: true,
      message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u0642\u0644 \u0628\u0646\u062C\u0627\u062D"
    });
  } catch (error) {
    console.error("Error deleting template field:", error);
    res.status(500).json({
      success: false,
      message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628"
    });
  }
}

// server/routes/certificate-analytics.ts
init_db();
init_schema();
import { eq as eq5, desc as desc2, count as count2 } from "drizzle-orm";
function setupCertificateAnalyticsRoutes(app2, apiPrefix) {
  app2.post(`${apiPrefix}/certificates/:id/view`, async (req, res) => {
    try {
      const certificateId = parseInt(req.params.id);
      const certificateExists = await db.query.certificates.findFirst({
        where: eq5(certificates.id, certificateId)
      });
      if (!certificateExists) {
        return res.status(404).json({ error: "\u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      await db.insert(certificateViews).values({
        certificateId,
        ip: req.ip,
        userAgent: req.headers["user-agent"] || null
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0645\u0634\u0627\u0647\u062F\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629:", error);
      return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0647\u062F\u0629" });
    }
  });
  app2.post(`${apiPrefix}/certificates/:id/share`, async (req, res) => {
    try {
      const certificateId = parseInt(req.params.id);
      const { platform } = req.body;
      const certificateExists = await db.query.certificates.findFirst({
        where: eq5(certificates.id, certificateId)
      });
      if (!certificateExists) {
        return res.status(404).json({ error: "\u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      await db.insert(certificateShares).values({
        certificateId,
        platform: platform || null,
        ip: req.ip
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629:", error);
      return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629" });
    }
  });
  app2.get(`${apiPrefix}/certificates/:id/analytics`, isAuthenticated, async (req, res) => {
    try {
      const certificateId = parseInt(req.params.id);
      const certificate = await db.query.certificates.findFirst({
        where: eq5(certificates.id, certificateId)
      });
      if (!certificate) {
        return res.status(404).json({ error: "\u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      if (certificate.userId !== req.user?.id && !req.user?.isAdmin) {
        return res.status(403).json({ error: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" });
      }
      const viewsCount = await db.select({ count: count2() }).from(certificateViews).where(eq5(certificateViews.certificateId, certificateId));
      const sharesCount = await db.select({ count: count2() }).from(certificateShares).where(eq5(certificateShares.certificateId, certificateId));
      const recentViews = await db.select().from(certificateViews).where(eq5(certificateViews.certificateId, certificateId)).orderBy(desc2(certificateViews.viewedAt)).limit(10);
      const recentShares = await db.select().from(certificateShares).where(eq5(certificateShares.certificateId, certificateId)).orderBy(desc2(certificateShares.sharedAt)).limit(10);
      return res.status(200).json({
        views: {
          total: viewsCount[0]?.count || 0,
          recent: recentViews
        },
        shares: {
          total: sharesCount[0]?.count || 0,
          recent: recentShares
        }
      });
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0634\u0647\u0627\u062F\u0629:", error);
      return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A" });
    }
  });
  app2.get(`${apiPrefix}/analytics/dashboard`, isAdmin, async (req, res) => {
    try {
      const totalViews = await db.select({ count: count2() }).from(certificateViews);
      const totalShares = await db.select({ count: count2() }).from(certificateShares);
      const mostViewedCertificates = await db.select({
        certificateId: certificateViews.certificateId,
        views: count2()
      }).from(certificateViews).groupBy(certificateViews.certificateId).orderBy(desc2(count2())).limit(5);
      const mostSharedCertificates = await db.select({
        certificateId: certificateShares.certificateId,
        shares: count2()
      }).from(certificateShares).groupBy(certificateShares.certificateId).orderBy(desc2(count2())).limit(5);
      const mostViewedWithDetails = await Promise.all(
        mostViewedCertificates.map(async (item) => {
          const cert = await db.query.certificates.findFirst({
            where: eq5(certificates.id, item.certificateId)
          });
          return {
            ...item,
            title: cert?.title || "\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641\u0629",
            issuedTo: cert?.issuedTo || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"
          };
        })
      );
      const mostSharedWithDetails = await Promise.all(
        mostSharedCertificates.map(async (item) => {
          const cert = await db.query.certificates.findFirst({
            where: eq5(certificates.id, item.certificateId)
          });
          return {
            ...item,
            title: cert?.title || "\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641\u0629",
            issuedTo: cert?.issuedTo || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"
          };
        })
      );
      return res.status(200).json({
        totalViews: totalViews[0]?.count || 0,
        totalShares: totalShares[0]?.count || 0,
        mostViewed: mostViewedWithDetails,
        mostShared: mostSharedWithDetails
      });
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645:", error);
      return res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A" });
    }
  });
}

// server/lib/error-tracker.ts
import fs12 from "fs";
import path12 from "path";
var FileLogStorage = class {
  logDirectory;
  maxLogSize;
  constructor(logDirectory, maxLogSize) {
    this.logDirectory = logDirectory;
    this.maxLogSize = maxLogSize;
    if (!fs12.existsSync(this.logDirectory)) {
      fs12.mkdirSync(this.logDirectory, { recursive: true });
    }
  }
  async save(level, message, meta) {
    try {
      const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
      const logFileName = `${level}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.log`;
      const logFilePath = path12.join(this.logDirectory, logFileName);
      const metaString = JSON.stringify(meta, null, 2);
      const logEntry = `[${timestamp2}] ${level.toUpperCase()}: ${message}
META: ${metaString}

`;
      let stats;
      try {
        stats = fs12.statSync(logFilePath);
      } catch (error) {
      }
      if (stats && stats.size > this.maxLogSize) {
        const archiveLogFileName = `${level}-${(/* @__PURE__ */ new Date()).toISOString().replace(/:/g, "-")}.log`;
        const archiveLogFilePath = path12.join(this.logDirectory, archiveLogFileName);
        fs12.renameSync(logFilePath, archiveLogFilePath);
      }
      fs12.appendFileSync(logFilePath, logEntry);
    } catch (error) {
      console.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0644\u0641:", error);
    }
  }
};
var ConsoleLogStorage = class {
  async save(level, message, meta) {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    let logFn;
    switch (level) {
      case "debug":
        logFn = console.debug;
        break;
      case "info":
        logFn = console.info;
        break;
      case "warn":
        logFn = console.warn;
        break;
      case "error":
      case "critical":
        logFn = console.error;
        break;
      default:
        logFn = console.log;
    }
    logFn(`[${timestamp2}] ${level.toUpperCase()}: ${message}`, meta);
  }
};
var DatabaseLogStorage = class {
  async save(level, message, meta) {
    try {
      const { db: db3 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { errorLogs } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      let userId = meta?.request?.user?.id;
      let errorStack = "";
      let componentStack = "";
      let url = meta?.request?.url || "";
      let userAgent = meta?.request?.userAgent || "";
      let ip = meta?.request?.ip || "";
      if (meta?.stack) {
        errorStack = meta.stack;
      }
      if (meta?.componentStack) {
        componentStack = meta.componentStack;
      }
      await db3.insert(errorLogs).values({
        errorType: level,
        errorMessage: message,
        errorStack,
        componentStack,
        url,
        userAgent,
        userId,
        ip,
        timestamp: /* @__PURE__ */ new Date(),
        additionalData: meta,
        status: "new"
      });
      console.log(`[Database Logger] (${level.toUpperCase()}): ${message} - \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A`);
    } catch (error) {
      console.error("\u0641\u0634\u0644 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0633\u062C\u0644 \u0625\u0644\u0649 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", error);
      console.error(`[Fallback Logger] (${level.toUpperCase()}): ${message}`, meta);
    }
  }
};
var ExternalLogStorage = class {
  async save(level, message, meta) {
    console.log(`[External Logger] (${level.toUpperCase()}): ${message}`, meta);
  }
};
var ErrorTracker = class {
  config;
  storage;
  constructor(config2) {
    const defaultStorage = process.env.NODE_ENV === "production" ? "database" : "console";
    this.config = {
      logLevel: "info",
      // مستوى التسجيل الافتراضي
      storage: defaultStorage,
      // نوع التخزين الافتراضي
      logDirectory: path12.resolve(process.cwd(), "logs"),
      // مجلد السجلات الافتراضي
      maxLogSize: 10 * 1024 * 1024,
      // الحجم الأقصى للملف: 10 ميجابايت
      includeUserInfo: true,
      // تضمين معلومات المستخدم افتراضياً
      truncateStackTrace: true,
      // اقتصاص تتبع المكدس افتراضياً
      maxStackFrames: 20
      // عدد إطارات تتبع المكدس الأقصى
    };
    if (config2) {
      this.config = { ...this.config, ...config2 };
    }
    this.updateConfigFromEnvironment();
    this.storage = this.createLogStorage();
  }
  /**
   * تحديث التكوين من متغيرات البيئة
   */
  updateConfigFromEnvironment() {
    if (process.env.LOG_LEVEL) {
      this.config.logLevel = process.env.LOG_LEVEL;
    }
    if (process.env.ERROR_STORAGE_TYPE) {
      this.config.storage = process.env.ERROR_STORAGE_TYPE;
    }
    if (process.env.LOG_DIRECTORY) {
      this.config.logDirectory = process.env.LOG_DIRECTORY;
    }
    if (process.env.MAX_LOG_SIZE) {
      this.config.maxLogSize = parseInt(process.env.MAX_LOG_SIZE, 10);
    }
    if (process.env.INCLUDE_USER_INFO) {
      this.config.includeUserInfo = process.env.INCLUDE_USER_INFO === "true";
    }
    if (process.env.TRUNCATE_STACK_TRACE) {
      this.config.truncateStackTrace = process.env.TRUNCATE_STACK_TRACE === "true";
    }
    if (process.env.MAX_STACK_FRAMES) {
      this.config.maxStackFrames = parseInt(process.env.MAX_STACK_FRAMES, 10);
    }
  }
  /**
   * إنشاء وحدة تخزين السجلات المناسبة بناءً على التكوين
   */
  createLogStorage() {
    switch (this.config.storage) {
      case "file":
        return new FileLogStorage(this.config.logDirectory, this.config.maxLogSize);
      case "console":
        return new ConsoleLogStorage();
      case "database":
        return new DatabaseLogStorage();
      case "external":
        return new ExternalLogStorage();
      default:
        if (process.env.NODE_ENV === "production") {
          return new DatabaseLogStorage();
        } else {
          return new ConsoleLogStorage();
        }
    }
  }
  /**
   * معالجة كائن الخطأ وتحويله إلى بيانات وصفية
   */
  processError(error) {
    const meta = {
      name: error.name,
      message: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (error.stack) {
      if (this.config.truncateStackTrace) {
        const stackLines = error.stack.split("\n");
        meta.stack = stackLines.slice(0, this.config.maxStackFrames + 1).join("\n");
      } else {
        meta.stack = error.stack;
      }
    }
    return meta;
  }
  /**
   * استخراج معلومات المستخدم من الطلب
   */
  extractUserInfo(req) {
    if (!this.config.includeUserInfo) {
      return {};
    }
    const userInfo = {
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"]
    };
    if (req.user) {
      userInfo.user = {
        id: req.user.id,
        username: req.user.username
      };
    }
    return userInfo;
  }
  /**
   * تسجيل رسالة تصحيح
   */
  async debug(message, meta, req) {
    if (this.shouldLog("debug")) {
      await this.log("debug", message, meta, req);
    }
  }
  /**
   * تسجيل رسالة معلومات
   */
  async info(message, meta, req) {
    if (this.shouldLog("info")) {
      await this.log("info", message, meta, req);
    }
  }
  /**
   * تسجيل رسالة تحذير
   */
  async warn(message, meta, req) {
    if (this.shouldLog("warn")) {
      await this.log("warn", message, meta, req);
    }
  }
  /**
   * تسجيل رسالة خطأ
   */
  async error(error, meta, req) {
    if (this.shouldLog("error")) {
      if (error instanceof Error) {
        const errorMeta = this.processError(error);
        await this.log("error", error.message, { ...errorMeta, ...meta }, req);
      } else {
        await this.log("error", error, meta, req);
      }
    }
  }
  /**
   * تسجيل رسالة خطأ حرج
   */
  async critical(error, meta, req) {
    if (this.shouldLog("critical")) {
      if (error instanceof Error) {
        const errorMeta = this.processError(error);
        await this.log("critical", error.message, { ...errorMeta, ...meta }, req);
      } else {
        await this.log("critical", error, meta, req);
      }
    }
  }
  /**
   * تسجيل خطأ في العميل (من واجهة المستخدم)
   */
  async clientError(message, meta, req) {
    if (this.shouldLog("error")) {
      await this.log("error", `[CLIENT] ${message}`, meta, req);
    }
  }
  /**
   * التحقق مما إذا كان يجب تسجيل رسالة بمستوى معين
   */
  shouldLog(level) {
    const levels = ["debug", "info", "warn", "error", "critical"];
    const configLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= configLevelIndex;
  }
  /**
   * تسجيل رسالة عامة
   */
  async log(level, message, meta = {}, req) {
    try {
      if (req) {
        meta.request = {
          url: req.url,
          method: req.method,
          headers: req.headers,
          ...this.extractUserInfo(req)
        };
      }
      await this.storage.save(level, message, meta);
    } catch (error) {
      console.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629:", error);
    }
  }
};
var logger = new ErrorTracker();

// server/routes/client-error-logger.ts
function setupClientErrorLoggerRoutes(app2, prefix = "") {
  app2.post(`${prefix}/log-client-error`, async (req, res) => {
    try {
      const {
        message,
        name,
        stack,
        componentStack,
        userAgent,
        url,
        timestamp: timestamp2,
        details
      } = req.body;
      const errorMessage = `[CLIENT ERROR] ${name || "Error"}: ${message}`;
      await logger.clientError(errorMessage, {
        stack,
        componentStack,
        url,
        userAgent,
        timestamp: timestamp2,
        details
      }, req);
      res.status(200).json({
        success: true,
        message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0637\u0623 \u0628\u0646\u062C\u0627\u062D",
        errorId: (/* @__PURE__ */ new Date()).getTime().toString()
      });
    } catch (error) {
      console.error("\u0641\u0634\u0644 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628 \u062A\u0633\u062C\u064A\u0644 \u062E\u0637\u0623 \u0627\u0644\u0639\u0645\u064A\u0644:", error);
      res.status(200).json({
        success: false,
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0637\u0623",
        errorId: null
      });
    }
  });
  if (process.env.NODE_ENV === "development") {
    app2.get(`${prefix}/error-tracking-status`, (_req, res) => {
      try {
        res.status(200).json({
          isEnabled: true,
          logLevel: process.env.LOG_LEVEL || "info",
          storageType: process.env.ERROR_STORAGE_TYPE || "file",
          healthStatus: "operational"
        });
      } catch (error) {
        console.error("\u0641\u0634\u0644 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0627\u0644\u0629 \u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0623\u062E\u0637\u0627\u0621:", error);
        res.status(500).json({
          error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062D\u0627\u0644\u0629 \u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0623\u062E\u0637\u0627\u0621"
        });
      }
    });
    app2.get(`${prefix}/test-error-tracking`, (_req, res) => {
      try {
        throw new Error("\u0647\u0630\u0627 \u062E\u0637\u0623 \u0627\u062E\u062A\u0628\u0627\u0631\u064A \u0644\u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u0623\u062E\u0637\u0627\u0621");
      } catch (error) {
        logger.error(error instanceof Error ? error : new Error(String(error)));
        res.status(200).json({
          success: true,
          message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0637\u0623 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u064A \u0628\u0646\u062C\u0627\u062D"
        });
      }
    });
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  const uploadsDir3 = path13.join(process.cwd(), "uploads");
  const tempDir3 = path13.join(process.cwd(), "temp");
  if (!fs13.existsSync(uploadsDir3)) {
    fs13.mkdirSync(uploadsDir3, { recursive: true });
  }
  if (!fs13.existsSync(tempDir3)) {
    fs13.mkdirSync(tempDir3, { recursive: true });
  }
  const staticDir = path13.join(process.cwd(), "client/static");
  if (fs13.existsSync(staticDir)) {
    app2.use("/static", express11.static(staticDir, {
      setHeaders: (res, path17) => {
        if (path17.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (path17.endsWith(".mjs")) {
          res.setHeader("Content-Type", "application/javascript");
        } else if (path17.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        } else if (path17.endsWith(".svg")) {
          res.setHeader("Content-Type", "image/svg+xml");
        }
      }
    }));
    console.log("Serving static files from:", staticDir);
  }
  function parseJsonData(data, defaultValue) {
    try {
      if (typeof data === "string") {
        return JSON.parse(data);
      } else if (data && typeof data === "object") {
        return data;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`\u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A JSON: ${error}`);
      return defaultValue;
    }
  }
  const multerStorage3 = multer3.diskStorage({
    destination: function(req, file, cb) {
      cb(null, tempDir3);
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path13.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  });
  const fileFilter3 = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel" || file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("\u0646\u0648\u0639 \u0627\u0644\u0645\u0644\u0641 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645"));
    }
  };
  const upload3 = multer3({
    storage: multerStorage3,
    fileFilter: fileFilter3,
    limits: {
      fileSize: 10 * 1024 * 1024
      // 10MB
    }
  });
  setupAuth(app2);
  app2.get("/api/reset-admin-password", async (req, res) => {
    try {
      const admin = await storage.getUserByUsername("admin");
      if (!admin) {
        return res.status(404).json({ message: "\u0645\u0633\u062A\u062E\u062F\u0645 admin \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const hashedPassword = await hashPassword("700700");
      await storage.updateUser(admin.id, { password: hashedPassword });
      res.json({ success: true, message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 admin" });
    } catch (error) {
      console.error("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      console.log("Fetching categories with options:", {
        active: req.query.active
      });
      const active = req.query.active === "true" ? true : req.query.active === "false" ? false : void 0;
      console.log("Storage methods:", Object.keys(storage));
      try {
        const testQuery = await db.select().from(categories).limit(1);
        console.log("Test query result:", JSON.stringify(testQuery));
      } catch (dbError) {
        console.error("Database test query failed:", dbError);
        if (dbError instanceof Error) console.error(dbError.stack);
      }
      const categoriesData = await storage.getAllCategories({ active });
      res.json(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.error(error instanceof Error ? error.stack : String(error));
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A" });
    }
  });
  app2.get("/api/templates", async (req, res) => {
    try {
      console.log("Fetching templates with options:", {
        active: req.query.active,
        limit: req.query.limit,
        offset: req.query.offset,
        search: req.query.search
      });
      const active = req.query.active === "true" ? true : req.query.active === "false" ? false : void 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const search = req.query.search;
      console.log("Storage methods for templates:", typeof storage.getAllTemplates);
      const result = await storage.getAllTemplates({ active, limit, offset, search });
      res.json(result);
    } catch (error) {
      console.error("Error fetching templates:", error);
      console.error(error instanceof Error ? error.stack : String(error));
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0648\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/categories/:slug/templates", async (req, res) => {
    try {
      const { slug } = req.params;
      const active = req.query.active === "true" ? true : req.query.active === "false" ? false : void 0;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ message: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const templates2 = await storage.getTemplatesByCategory(category.id, { active });
      res.json(templates2);
    } catch (error) {
      console.error("Error fetching templates by category:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0648\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:category/:idOrSlug", async (req, res) => {
    try {
      const { category, idOrSlug } = req.params;
      console.log(`Looking for template: category=${category}, idOrSlug=${idOrSlug}`);
      let template;
      if (!isNaN(Number(idOrSlug))) {
        console.log(`Trying to get template by ID: ${idOrSlug}`);
        template = await storage.getTemplate(Number(idOrSlug));
      }
      if (!template) {
        console.log(`Trying to get template by slug: category=${category}, slug=${idOrSlug}`);
        template = await storage.getTemplateBySlug(category, idOrSlug);
      }
      if (!template) {
        console.log(`Template not found: category=${category}, idOrSlug=${idOrSlug}`);
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Template found: ${template.title}, ID: ${template.id}`);
      const fields = await storage.getTemplateFields(template.id);
      res.json({ ...template, templateFields: fields });
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Looking for template with ID: ${id}`);
      const template = await storage.getTemplate(Number(id));
      if (!template) {
        console.log(`Template not found with ID: ${id}`);
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Template found: ${template.title}, ID: ${template.id}`);
      const fields = await storage.getTemplateFields(template.id);
      res.json({ ...template, templateFields: fields });
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/fonts", async (req, res) => {
    try {
      const active = req.query.active === "true" ? true : req.query.active === "false" ? false : void 0;
      const fonts2 = await storage.getAllFonts({ active });
      res.json(fonts2);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062E\u0637\u0648\u0637" });
    }
  });
  app2.post("/api/cards", async (req, res) => {
    try {
      const { templateId, formData, quality } = req.body;
      console.log(`Creating card with templateId: ${templateId}`);
      const template = await storage.getTemplate(templateId);
      if (!template) {
        console.error(`Template with ID ${templateId} not found`);
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Found template: ${template.title}, image: ${template.imageUrl}`);
      const category = await storage.getCategoryById(template.categoryId);
      if (!category) {
        console.error(`Category with ID ${template.categoryId} not found`);
        return res.status(404).json({ message: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Found category: ${category.name}`);
      console.log(`Generating card image with formData:`, formData);
      let imagePath;
      try {
        console.log(`Using optimized card image generator`);
        const templateFields2 = await storage.getTemplateFields(template.id);
        console.log(`Fetched ${templateFields2.length} template fields for template ID ${template.id}`);
        imagePath = await Promise.resolve().then(() => (init_optimized_image_generator(), optimized_image_generator_exports)).then(({ generateOptimizedCardImage: generateOptimizedCardImage2 }) => {
          return generateOptimizedCardImage2({
            templatePath: template.imageUrl,
            fields: templateFields2,
            formData,
            quality: quality || "high"
          });
        });
        console.log(`Card image generated with optimized generator at: ${imagePath}`);
      } catch (optimizedGeneratorError) {
        console.error(`Error using optimized card generator:`, optimizedGeneratorError);
        console.log(`Falling back to legacy card generator`);
        imagePath = await generateCardImage(template, formData);
        console.log(`Card image generated with legacy generator at: ${imagePath}`);
      }
      console.log(`Card image generated at: ${imagePath}`);
      const card = await storage.createCard({
        templateId: template.id,
        userId: req.isAuthenticated() ? req.user.id : void 0,
        formData,
        imageUrl: `/uploads/${path13.basename(imagePath)}`,
        categoryId: template.categoryId,
        quality: quality || "medium",
        publicId: randomUUID5(),
        status: "active"
      });
      console.log(`Card created with ID: ${card.id}, publicId: ${card.publicId}`);
      res.json({
        cardId: card.id,
        publicId: card.publicId,
        imageUrl: card.imageUrl
      });
    } catch (error) {
      console.error("Error generating card:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
  });
  app2.post("/api/cards/generate", upload3.any(), async (req, res) => {
    try {
      console.log("Received card generation request:", req.body);
      const templateId = req.body.templateId;
      const category = req.body.category;
      let formData = req.body.formData;
      const quality = req.body.quality || "medium";
      if (!templateId) {
        console.error("Missing templateId in the request");
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0641\u0642\u0648\u062F" });
      }
      if (!formData && Object.keys(req.body).length > 0) {
        formData = {};
        for (const key in req.body) {
          if (key !== "templateId" && key !== "category" && key !== "quality" && key !== "isPreview") {
            formData[key] = req.body[key];
          }
        }
        if (req.files && Array.isArray(req.files)) {
          console.log("Processing uploaded files:", req.files);
          for (const file of req.files) {
            const fieldName = file.fieldname;
            const targetPath = path13.join(uploadsDir3, file.filename);
            try {
              if (!fs13.existsSync(file.path)) {
                console.error(`File not found at temp path: ${file.path}`);
                continue;
              }
              fs13.copyFileSync(file.path, targetPath);
              console.log(`File copied from ${file.path} to ${targetPath}`);
              formData[fieldName] = `/uploads/${file.filename}`;
              console.log(`File processed: ${fieldName}, path: /uploads/${file.filename}`);
            } catch (moveError) {
              console.error(`Error processing file ${fieldName}:`, moveError);
            }
          }
        }
      }
      if (!formData || typeof formData === "object" && Object.keys(formData).length === 0) {
        console.error("Missing formData in the request");
        return res.status(400).json({ message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u0641\u0642\u0648\u062F\u0629" });
      }
      console.log(`Generating card for template ID: ${templateId}, category: ${category}`);
      console.log(`Form data type: ${typeof formData} is array?`, Array.isArray(formData));
      try {
        const template = await storage.getTemplate(Number(templateId));
        if (!template) {
          console.error(`Template with ID ${templateId} not found`);
          return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
        }
        if (!template.imageUrl) {
          console.error(`Template with ID ${templateId} does not have an image URL`);
          return res.status(400).json({ message: "\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629" });
        }
        console.log(`Found template: ${template.title}, image URL: ${template.imageUrl}`);
        let parsedFormData = formData;
        if (typeof formData === "string") {
          try {
            parsedFormData = JSON.parse(formData);
          } catch (parseError) {
            console.error("Error parsing form data JSON:", parseError);
            return res.status(400).json({ message: "\u0635\u064A\u063A\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
          }
        }
        console.log(`Generating card with parsed formData:`, parsedFormData);
        try {
          console.log(`Attempting to generate card image for template ID: ${template.id}, Title: ${template.title}`);
          console.log(`Template image URL: ${template.imageUrl}`);
          let imagePath;
          try {
            const templateFields2 = await storage.getTemplateFields(template.id);
            console.log(`Fetched ${templateFields2.length} template fields from database for template ID ${template.id}`);
            console.log(`Applying custom field positions and styles for ${templateFields2.length} fields`);
            try {
              let templateSettings = template.settings || {};
              const outputWidth = templateSettings.width ? parseInt(templateSettings.width) : 1200;
              const outputHeight = templateSettings.height ? parseInt(templateSettings.height) : 1600;
              const paperSize = templateSettings.paperSize || "A4";
              const orientation = templateSettings.orientation || "portrait";
              console.log(`Applying template settings: width=${outputWidth}, height=${outputHeight}, paperSize=${paperSize}, orientation=${orientation}`);
              imagePath = await Promise.resolve().then(() => (init_optimized_image_generator(), optimized_image_generator_exports)).then(({ generateOptimizedCardImage: generateOptimizedCardImage2 }) => {
                return generateOptimizedCardImage2({
                  templatePath: template.imageUrl,
                  fields: templateFields2,
                  formData: parsedFormData,
                  quality,
                  outputWidth,
                  outputHeight,
                  outputFormat: "png"
                  // استخدام PNG للحفاظ على الشفافية وعدم ضغط الصورة
                });
              });
            } catch (optimizerError) {
              console.error("Error using optimized generator, falling back to standard:", optimizerError);
              imagePath = await generateCardImage(template, parsedFormData, quality);
            }
            console.log(`Card image successfully generated at: ${imagePath} with quality: ${quality}`);
          } catch (cardImageError) {
            console.error("Error in card image generation:", cardImageError);
            console.log("Creating fallback white image due to generation error");
            const { createCanvas: createCanvas4 } = await import("canvas");
            const fs16 = await import("fs");
            const path17 = await import("path");
            const crypto3 = await import("crypto");
            const canvas = createCanvas4(1200, 1680);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 1200, 1680);
            ctx.fillStyle = "#cccccc";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u0627\u0644\u0628", 600, 840);
            const filename = `fallback_${crypto3.randomBytes(8).toString("hex")}.png`;
            const outputPath = path17.join(process.cwd(), "uploads", filename);
            await fs16.promises.mkdir(path17.join(process.cwd(), "uploads"), { recursive: true });
            const buffer = canvas.toBuffer("image/png");
            await fs16.promises.writeFile(outputPath, buffer);
            imagePath = outputPath;
            console.log(`Created fallback image at: ${imagePath}`);
          }
          if (!imagePath) {
            throw new Error("Image generation did not return a valid file path");
          }
          const card = await storage.createCard({
            templateId: template.id,
            userId: req.isAuthenticated() ? req.user?.id : null,
            formData: parsedFormData,
            imageUrl: imagePath.includes("/generated/") ? `/uploads/generated/${path13.basename(imagePath)}` : `/uploads/${path13.basename(imagePath)}`,
            categoryId: template.categoryId,
            quality,
            publicId: randomUUID5(),
            status: "active"
          });
          console.log(`Card created with ID: ${card.id}, publicId: ${card.publicId}`);
          res.json({
            cardId: card.id,
            publicId: card.publicId,
            imageUrl: card.imageUrl
          });
        } catch (imageError) {
          console.error("Error in card creation process:", imageError);
          return res.status(500).json({
            message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
            details: typeof imageError === "object" && imageError !== null ? imageError.message : String(imageError)
          });
        }
      } catch (dbError) {
        console.error("Database error while generating card:", dbError);
        return res.status(500).json({
          message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
          details: dbError.message
        });
      }
    } catch (error) {
      console.error("Unexpected error generating card:", error);
      res.status(500).json({
        message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
        details: error.message
      });
    }
  });
  app2.get("/api/cards/public/:publicId", async (req, res) => {
    try {
      const { publicId } = req.params;
      const card = await storage.getCardByPublicId(publicId);
      if (!card) {
        return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      await storage.updateCard(card.id, {
        accessCount: (card.accessCount || 0) + 1,
        lastAccessed: /* @__PURE__ */ new Date()
      });
      const template = await storage.getTemplate(card.templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ ...card, template });
    } catch (error) {
      console.error("Error fetching card:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
  });
  app2.get("/api/cards/:cardId", async (req, res) => {
    try {
      res.setHeader("Content-Type", "application/json");
      const { cardId } = req.params;
      console.log(`Fetching card with ID: ${cardId}`);
      if (isNaN(parseInt(cardId))) {
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const card = await storage.getCard(parseInt(cardId));
      if (!card) {
        console.log(`Card with ID ${cardId} not found`);
        return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      const template = await storage.getTemplate(card.templateId);
      const category = template ? await storage.getCategoryById(template.categoryId) : null;
      console.log(`Card found: ${card.id}, templateId: ${card.templateId}`);
      res.json({
        ...card,
        template: template ? {
          ...template,
          category
        } : null
      });
    } catch (error) {
      console.error("Error fetching card by ID:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
  });
  app2.post("/api/cards/:cardId/download", async (req, res) => {
    try {
      const { cardId } = req.params;
      const { quality = "medium" } = req.body;
      console.log(`Generating download image for card ${cardId} with quality: ${quality}`);
      if (isNaN(parseInt(cardId))) {
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const card = await storage.getCard(parseInt(cardId));
      if (!card) {
        return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      const template = await storage.getTemplate(card.templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      let templateFields2 = [];
      try {
        templateFields2 = await storage.getTemplateFields(template.id);
      } catch (error) {
        console.error(`Error fetching template fields for template ${template.id}:`, error);
      }
      let templateSettings = template.settings || {};
      const outputWidth = templateSettings.width ? parseInt(templateSettings.width) : 1200;
      const outputHeight = templateSettings.height ? parseInt(templateSettings.height) : 1600;
      const paperSize = templateSettings.paperSize || "A4";
      const orientation = templateSettings.orientation || "portrait";
      console.log(`Applying template settings for download: width=${outputWidth}, height=${outputHeight}, paperSize=${paperSize}, orientation=${orientation}`);
      let generatedImagePath = "";
      try {
        generatedImagePath = await Promise.resolve().then(() => (init_optimized_image_generator(), optimized_image_generator_exports)).then(({ generateOptimizedCardImage: generateOptimizedCardImage2 }) => {
          return generateOptimizedCardImage2({
            templatePath: template.imageUrl,
            fields: templateFields2,
            formData: card.formData,
            quality,
            outputWidth,
            outputHeight,
            outputFormat: "png"
            // استخدام PNG للحفاظ على الشفافية وعدم ضغط الصورة
          });
        });
      } catch (optimizerError) {
        console.error("Error using optimized generator for download, falling back to standard:", optimizerError);
        generatedImagePath = await generateCardImage(
          { ...template, templateFields: templateFields2 },
          card.formData,
          quality
        );
      }
      if (!generatedImagePath) {
        throw new Error("Failed to generate image path");
      }
      let imageUrl = generatedImagePath.replace(process.cwd(), "").split(path13.sep).join("/");
      if (generatedImagePath.includes("/generated/") && !imageUrl.includes("/generated/")) {
        imageUrl = imageUrl.replace("/uploads/", "/uploads/generated/");
      }
      console.log(`Generated download image at: ${imageUrl} with quality: ${quality}`);
      res.json({ imageUrl });
    } catch (error) {
      console.error("Error generating card image for download:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0635\u0648\u0631\u0629" });
    }
  });
  app2.patch("/api/cards/:cardId", async (req, res) => {
    try {
      const { cardId } = req.params;
      const { status, isPreview, quality } = req.body;
      console.log(`Updating card ${cardId} with status: ${status}, isPreview: ${isPreview}, quality: ${quality}`);
      if (isNaN(parseInt(cardId))) {
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const card = await storage.getCard(parseInt(cardId));
      if (!card) {
        console.log(`Card with ID ${cardId} not found`);
        return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      const updateData = {};
      if (status) {
        updateData.status = status;
      }
      if (isPreview !== void 0) {
        if (isPreview === false && req.isAuthenticated()) {
          updateData.userId = req.user?.id;
        }
      }
      if (quality) {
        updateData.quality = quality;
      }
      const updatedCard = await storage.updateCard(parseInt(cardId), updateData);
      if (!updatedCard) {
        return res.status(500).json({ message: "\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
      }
      console.log(`Card ${cardId} updated successfully:`, updateData);
      res.json(updatedCard);
    } catch (error) {
      console.error("Error updating card:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u0637\u0627\u0642\u0629" });
    }
  });
  app2.post("/api/certificates/generate", async (req, res) => {
    try {
      const { templateId, formData } = req.body;
      console.log(`Generating certificate for template ID: ${templateId}`);
      const template = await storage.getTemplate(Number(templateId));
      if (!template) {
        console.error(`Template with ID ${templateId} not found`);
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Found template: ${template.title}`);
      console.log(`Generating certificate with formData:`, formData);
      let imagePath;
      try {
        imagePath = await generateOptimizedCertificateImage(template, formData);
        console.log(`Certificate image generated with optimized generator at: ${imagePath}`);
      } catch (optimizedGeneratorError) {
        console.error(`Error using optimized certificate generator:`, optimizedGeneratorError);
        console.log(`Falling back to legacy certificate generator`);
        imagePath = await generateCertificateImage(template, formData);
        console.log(`Certificate image generated with legacy generator at: ${imagePath}`);
      }
      console.log(`Final certificate image path: ${imagePath}`);
      const certificateType = formData.certificateType || template.certificateType || "appreciation";
      const issuedTo = formData.issuedTo;
      const issuedToGender = formData.issuedToGender || "male";
      const certificate = await storage.createCertificate({
        templateId: template.id,
        userId: req.isAuthenticated() ? req.user?.id : void 0,
        formData,
        imageUrl: imagePath.includes("/generated/") ? `/uploads/generated/${path13.basename(imagePath)}` : `/uploads/${path13.basename(imagePath)}`,
        certificateType,
        title: formData.title || template.title,
        titleAr: formData.titleAr || template.titleAr,
        issuedTo,
        issuedToGender,
        status: "active",
        verificationCode: generateVerificationCode(),
        publicId: randomUUID5()
      });
      console.log(`Certificate created with ID: ${certificate.id}`);
      res.json({
        certificateId: certificate.id,
        publicId: certificate.publicId,
        imageUrl: certificate.imageUrl
      });
    } catch (error) {
      console.error("Error generating certificate:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.post("/api/certificates", async (req, res) => {
    try {
      const { templateId, formData, certificateType, issuedTo, issuedToGender } = req.body;
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      let imagePath;
      try {
        imagePath = await generateOptimizedCertificateImage(template, formData);
        console.log(`Certificate image generated with optimized generator at: ${imagePath}`);
      } catch (optimizedGeneratorError) {
        console.error(`Error using optimized certificate generator:`, optimizedGeneratorError);
        console.log(`Falling back to legacy certificate generator`);
        imagePath = await generateCertificateImage(template, formData);
        console.log(`Certificate image generated with legacy generator at: ${imagePath}`);
      }
      const certificate = await storage.createCertificate({
        templateId: template.id,
        userId: req.isAuthenticated() ? req.user?.id : void 0,
        formData,
        imageUrl: imagePath.includes("/generated/") ? `/uploads/generated/${path13.basename(imagePath)}` : `/uploads/${path13.basename(imagePath)}`,
        certificateType: certificateType || "appreciation",
        title: formData.title || template.title,
        titleAr: formData.titleAr || template.titleAr,
        issuedTo,
        issuedToGender: issuedToGender || "male",
        status: "active",
        verificationCode: generateVerificationCode(),
        publicId: randomUUID5()
      });
      res.json({ certificateId: certificate.id, publicId: certificate.publicId });
    } catch (error) {
      console.error("Error generating certificate:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.get("/api/certificates/public/:publicId", async (req, res) => {
    try {
      const { publicId } = req.params;
      const certificate = await storage.getCertificateByPublicId(publicId);
      if (!certificate) {
        return res.status(404).json({ message: "\u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      const template = await storage.getTemplate(certificate.templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ ...certificate, template });
    } catch (error) {
      console.error("Error fetching certificate:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.get("/api/certificates/verify/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const certificate = await storage.getCertificateByVerificationCode(code);
      if (!certificate) {
        return res.status(404).json({
          valid: false,
          message: "\u0631\u0645\u0632 \u0627\u0644\u062A\u062D\u0642\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"
        });
      }
      if (certificate.expiryDate && new Date(certificate.expiryDate) < /* @__PURE__ */ new Date()) {
        return res.json({
          valid: false,
          message: "\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0629",
          certificate
        });
      }
      if (certificate.status === "revoked") {
        return res.json({
          valid: false,
          message: "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0634\u0647\u0627\u062F\u0629",
          certificate
        });
      }
      res.json({
        valid: true,
        certificate
      });
    } catch (error) {
      console.error("Error verifying certificate:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.get("/api/user/cards", isAuthenticated, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const result = await storage.getUserCards(req.user.id, { limit, offset });
      res.json(result);
    } catch (error) {
      console.error("Error fetching user cards:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A" });
    }
  });
  app2.get("/api/user/certificates", isAuthenticated, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const type = req.query.type;
      const result = await storage.getUserCertificates(req.user.id, { limit, offset, type });
      res.json(result);
    } catch (error) {
      console.error("Error fetching user certificates:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A" });
    }
  });
  app2.get("/api/user/certificate-batches", isAuthenticated, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const result = await storage.getUserCertificateBatches(req.user.id, { limit, offset });
      res.json(result);
    } catch (error) {
      console.error("Error fetching user certificate batches:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A" });
    }
  });
  app2.post("/api/certificate-batches", isAuthenticated, upload3.single("file"), async (req, res) => {
    try {
      const { templateId, title } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "\u064A\u0631\u062C\u0649 \u062A\u062D\u0645\u064A\u0644 \u0645\u0644\u0641 Excel \u0623\u0648 CSV" });
      }
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const batch = await storage.createCertificateBatch({
        userId: req.user.id,
        templateId: template.id,
        title: title || `\u0645\u062C\u0645\u0648\u0639\u0629 \u0634\u0647\u0627\u062F\u0627\u062A ${(/* @__PURE__ */ new Date()).toLocaleDateString("ar-SA")}`,
        status: "pending",
        totalItems: 0,
        processedItems: 0,
        sourceType: path13.extname(req.file.originalname).toLowerCase() === ".csv" ? "csv" : "excel",
        sourceData: req.file.path
      });
      processExcelBatch(batch.id, req.file.path, template);
      res.json({ batchId: batch.id });
    } catch (error) {
      console.error("Error creating certificate batch:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A" });
    }
  });
  app2.get("/api/certificate-batches/:id/items", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const status = req.query.status;
      const batch = await storage.getCertificateBatch(parseInt(id));
      if (!batch) {
        return res.status(404).json({ message: "\u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      if (batch.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629" });
      }
      const result = await storage.getBatchItems(batch.id, { limit, offset, status });
      res.json(result);
    } catch (error) {
      console.error("Error fetching batch items:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629" });
    }
  });
  app2.put("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const { name, email } = req.body;
      if (email && email !== req.user.email) {
        const existingUser = await storage.getUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({ message: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644" });
        }
      }
      const updatedUser = await storage.updateUser(req.user.id, { name, email });
      if (!updatedUser) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A" });
    }
  });
  app2.post("/api/user/change-password", isAuthenticated, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const isPasswordValid = await comparePasswords(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
      }
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(user.id, { password: hashedPassword });
      res.json({ message: "\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" });
    }
  });
  app2.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : void 0;
      const offset = req.query.offset ? parseInt(req.query.offset) : void 0;
      const search = req.query.search;
      const result = await storage.getAllUsers({ limit, offset, search });
      const usersWithoutPasswords = result.users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.json({ users: usersWithoutPasswords, total: result.total });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" });
    }
  });
  app2.post("/api/admin/categories", isAdmin, async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z5.ZodError) {
        return res.status(400).json({
          message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
          errors: error.errors
        });
      }
      console.error("Error creating category:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0635\u0646\u064A\u0641" });
    }
  });
  app2.put("/api/admin/categories/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const category = await storage.updateCategory(parseInt(id), req.body);
      if (!category) {
        return res.status(404).json({ message: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0635\u0646\u064A\u0641" });
    }
  });
  app2.delete("/api/admin/categories/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteCategory(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "\u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641" });
    }
  });
  app2.post("/api/admin/templates", isAdmin, upload3.single("image"), async (req, res) => {
    try {
      console.log("\u{1F504} \u0627\u0633\u062A\u0644\u0627\u0645 \u0637\u0644\u0628 \u0625\u0646\u0634\u0627\u0621 \u0642\u0627\u0644\u0628 \u062C\u062F\u064A\u062F");
      if (!req.body.templateData) {
        console.error("\u274C \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0641\u0642\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0637\u0644\u0628");
        return res.status(400).json({ message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0641\u0642\u0648\u062F\u0629" });
      }
      let templateData;
      try {
        templateData = JSON.parse(req.body.templateData);
        console.log("\u2705 \u062A\u0645 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D:", {
          title: templateData.title,
          categoryId: templateData.categoryId
          // لا نعرض كامل البيانات في السجل لتجنب الإطالة
        });
      } catch (error) {
        console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628:", error);
        console.error("\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062E\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u0644\u0645\u0629:", req.body.templateData);
        return res.status(400).json({ message: "\u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0633\u064A\u0642 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628" });
      }
      if (!templateData.title) {
        console.error("\u274C \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0641\u0642\u0648\u062F");
        return res.status(400).json({ message: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0637\u0644\u0648\u0628" });
      }
      if (!templateData.categoryId) {
        console.error("\u274C \u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0645\u0641\u0642\u0648\u062F");
        return res.status(400).json({ message: "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0637\u0644\u0648\u0628" });
      }
      if (typeof templateData.categoryId === "string") {
        templateData.categoryId = parseInt(templateData.categoryId, 10);
        console.log(`\u{1F504} \u062A\u0645 \u062A\u062D\u0648\u064A\u0644 \u0645\u0639\u0631\u0641 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u0645\u0646 \u0646\u0635 \u0625\u0644\u0649 \u0631\u0642\u0645: ${templateData.categoryId}`);
      }
      if (req.file) {
        console.log(`\u2705 \u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0645\u0644\u0641 \u0635\u0648\u0631\u0629: ${req.file.originalname} (${req.file.size} \u0628\u0627\u064A\u062A)`);
        const filename = path13.basename(req.file.path);
        const targetPath = path13.join(uploadsDir3, filename);
        try {
          fs13.copyFileSync(req.file.path, targetPath);
          fs13.unlinkSync(req.file.path);
          console.log(`\u2705 \u062A\u0645 \u0646\u0642\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0625\u0644\u0649: ${targetPath}`);
          templateData.imageUrl = `/uploads/${filename}`;
        } catch (fileError) {
          console.error(`\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u0644\u0641 \u0627\u0644\u0635\u0648\u0631\u0629:`, fileError);
          return res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u0644\u0641 \u0627\u0644\u0635\u0648\u0631\u0629" });
        }
      } else if (!templateData.imageUrl) {
        console.error("\u274C \u0644\u0645 \u064A\u062A\u0645 \u062A\u0648\u0641\u064A\u0631 \u0635\u0648\u0631\u0629 \u0644\u0644\u0642\u0627\u0644\u0628");
        return res.status(400).json({ message: "\u064A\u062C\u0628 \u062A\u0648\u0641\u064A\u0631 \u0635\u0648\u0631\u0629 \u0644\u0644\u0642\u0627\u0644\u0628" });
      }
      try {
        console.log("\u{1F504} \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628...");
        if (!templateData.slug || templateData.slug.trim() === "") {
          templateData.slug = "temp-" + Date.now();
          console.log("\u{1F504} \u062A\u0645 \u062A\u0639\u064A\u064A\u0646 slug \u0645\u0624\u0642\u062A:", templateData.slug);
        }
        if (!templateData.displayOrder || templateData.displayOrder <= 0) {
          templateData.displayOrder = 1;
          console.log("\u{1F504} \u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0642\u064A\u0645\u0629 \u0645\u0624\u0642\u062A\u0629 \u0644\u0640 displayOrder:", templateData.displayOrder);
        }
        templateData.fields = templateData.fields || [];
        templateData.defaultValues = templateData.defaultValues || {};
        templateData.settings = templateData.settings || {};
        templateData.active = templateData.active !== false;
        const validatedData = insertTemplateSchema.parse(templateData);
        console.log("\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D");
        console.log("\u{1F504} \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...");
        const template = await storage.createTemplate(validatedData);
        console.log(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D. \u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628: ${template.id}`);
        if (templateData.templateFields && Array.isArray(templateData.templateFields)) {
          console.log(`\u{1F504} \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 ${templateData.templateFields.length} \u062D\u0642\u0644 \u0644\u0644\u0642\u0627\u0644\u0628...`);
          for (const field of templateData.templateFields) {
            await storage.createTemplateField({
              ...field,
              templateId: template.id
            });
          }
          console.log("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062C\u0645\u064A\u0639 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D");
        }
        console.log(`\u2705 \u062A\u0645\u062A \u0639\u0645\u0644\u064A\u0629 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628 "${template.title}" \u0628\u0646\u062C\u0627\u062D`);
        res.status(201).json(template);
      } catch (validationError) {
        if (validationError instanceof z5.ZodError) {
          console.error("\u274C \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0635\u062D\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", validationError.errors);
          return res.status(400).json({
            message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
            errors: validationError.errors
          });
        }
        console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628:", validationError);
        res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628" });
      }
    } catch (error) {
      console.error("\u274C \u062E\u0637\u0623 \u0639\u0627\u0645 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0627\u0644\u0628:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0637\u0644\u0628" });
    }
  });
  app2.put("/api/admin/templates/:id", isAdmin, upload3.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.body.templateData) {
        console.error("Missing templateData in request");
        return res.status(400).json({ message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628 \u0645\u0641\u0642\u0648\u062F\u0629" });
      }
      let templateData;
      try {
        templateData = JSON.parse(req.body.templateData);
      } catch (error) {
        console.error("Error parsing templateData:", error, "Raw templateData:", req.body.templateData);
        return res.status(400).json({ message: "\u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0633\u064A\u0642 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0642\u0627\u0644\u0628" });
      }
      if (req.file) {
        const filename = path13.basename(req.file.path);
        const targetPath = path13.join(uploadsDir3, filename);
        fs13.copyFileSync(req.file.path, targetPath);
        fs13.unlinkSync(req.file.path);
        templateData.imageUrl = `/uploads/${filename}`;
      }
      try {
        insertTemplateSchema.parse(templateData);
      } catch (error) {
        if (error instanceof z5.ZodError) {
          console.error("Validation error:", error.errors);
          return res.status(400).json({
            message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
            errors: error.errors
          });
        }
        throw error;
      }
      const template = await storage.updateTemplate(parseInt(id), templateData);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      if (templateData.templateFields && Array.isArray(templateData.templateFields)) {
        for (const field of templateData.templateFields) {
          if (field.id) {
            await storage.updateTemplateField(field.id, field);
          } else {
            await storage.createTemplateField({
              ...field,
              templateId: template.id
            });
          }
        }
      }
      res.json(template);
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.delete("/api/admin/templates/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTemplate(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:templateId/public-fields", async (req, res) => {
    try {
      const { templateId } = req.params;
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(parseInt(templateId));
      console.log(`Retrieved ${fields.length} fields for template ID ${templateId} (public API)`);
      res.json(fields);
    } catch (error) {
      console.error("Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:templateId/fields", async (req, res) => {
    try {
      const { templateId } = req.params;
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(parseInt(templateId));
      console.log(`Retrieved ${fields.length} fields for template ID ${templateId} (public API)`);
      res.json(fields);
    } catch (error) {
      console.error("Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.post("/api/templates/:id/copy-fields", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const sourceTemplateId = parseInt(id);
      const { targetTemplateId } = req.body;
      if (!targetTemplateId) {
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0647\u062F\u0641 \u0645\u0637\u0644\u0648\u0628" });
      }
      const sourceTemplate = await storage.getTemplate(sourceTemplateId);
      if (!sourceTemplate) {
        return res.status(404).json({ message: "\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0635\u062F\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const targetTemplate = await storage.getTemplate(targetTemplateId);
      if (!targetTemplate) {
        return res.status(404).json({ message: "\u0642\u0627\u0644\u0628 \u0627\u0644\u0647\u062F\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const sourceFields = await storage.getTemplateFields(sourceTemplateId);
      if (!sourceFields.length) {
        return res.status(404).json({ message: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0642\u0648\u0644 \u0644\u0644\u0646\u0633\u062E \u0645\u0646 \u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0635\u062F\u0631" });
      }
      const copiedFields = [];
      for (const field of sourceFields) {
        const { id: fieldId, templateId, ...fieldData } = field;
        const safeFieldData = {
          name: fieldData.name,
          label: fieldData.label,
          labelAr: fieldData.labelAr,
          type: fieldData.type || "text",
          required: Boolean(fieldData.required),
          defaultValue: fieldData.defaultValue,
          placeholder: fieldData.placeholder,
          placeholderAr: fieldData.placeholderAr,
          options: parseJsonData(fieldData.options, []),
          position: parseJsonData(fieldData.position, { x: 50, y: 50 }),
          style: parseJsonData(fieldData.style, {
            fontFamily: "Cairo",
            fontSize: 24,
            fontWeight: "normal",
            color: "#000000",
            align: "center",
            verticalPosition: "middle"
          }),
          displayOrder: fieldData.displayOrder || 0,
          templateId: targetTemplateId
        };
        const newField = await storage.createTemplateField(safeFieldData);
        copiedFields.push(newField);
      }
      res.status(200).json({
        message: "\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u062D\u0642\u0648\u0644 \u0628\u0646\u062C\u0627\u062D",
        count: copiedFields.length,
        fields: copiedFields
      });
    } catch (error) {
      console.error("Error copying template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0646\u0633\u062E \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/admin/template-fields", isAdmin, async (req, res) => {
    try {
      const { templateId } = req.query;
      if (templateId) {
        const fields = await storage.getTemplateFields(parseInt(templateId));
        console.log(`Retrieved ${fields.length} fields for template ID ${templateId}`);
        return res.json(fields);
      }
      const allFields = await storage.getAllTemplateFields();
      console.log(`Retrieved ${allFields.length} fields in total`);
      res.json(allFields);
    } catch (error) {
      console.error("Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.post("/api/admin/template-fields", isAdmin, async (req, res) => {
    try {
      const validatedData = insertTemplateFieldSchema.parse(req.body);
      const field = await storage.createTemplateField(validatedData);
      res.status(201).json(field);
    } catch (error) {
      if (error instanceof z5.ZodError) {
        return res.status(400).json({
          message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
          errors: error.errors
        });
      }
      console.error("Error creating template field:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:id/fields", async (req, res) => {
    try {
      const { id } = req.params;
      const templateId = parseInt(id);
      if (isNaN(templateId)) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(templateId);
      res.json(fields);
    } catch (error) {
      console.error("Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Looking for template with ID: ${id}`);
      const templateId = parseInt(id);
      if (isNaN(templateId)) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      console.log(`Template found: ${template.title}, ID: ${template.id}`);
      const category = await storage.getCategoryById(template.categoryId);
      res.json({
        ...template,
        category
      });
    } catch (error) {
      console.error("Error fetching template details:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.post("/api/templates/:id/fields", async (req, res) => {
    try {
      const { id } = req.params;
      const templateId = parseInt(id);
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fieldData = {
        ...req.body,
        templateId
      };
      const validatedData = insertTemplateFieldSchema.parse(fieldData);
      const field = await storage.createTemplateField(validatedData);
      res.status(201).json(field);
    } catch (error) {
      console.error("Error creating template field:", error);
      if (error instanceof z5.ZodError) {
        return res.status(400).json({
          message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.put("/api/admin/template-fields/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const fieldData = {
        name: req.body.name,
        label: req.body.label,
        labelAr: req.body.labelAr || null,
        type: req.body.type || "text",
        required: Boolean(req.body.required),
        defaultValue: req.body.defaultValue || null,
        placeholder: req.body.placeholder || null,
        placeholderAr: req.body.placeholderAr || null,
        options: parseJsonData(req.body.options, []),
        position: parseJsonData(req.body.position, { x: 50, y: 50 }),
        style: parseJsonData(req.body.style, {
          fontFamily: "Cairo",
          fontSize: 24,
          fontWeight: "normal",
          color: "#000000",
          align: "center",
          verticalPosition: "middle"
        }),
        displayOrder: req.body.displayOrder || 0,
        templateId: req.body.templateId
      };
      const field = await storage.updateTemplateField(parseInt(id), fieldData);
      if (!field) {
        return res.status(404).json({ message: "\u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json(field);
    } catch (error) {
      console.error("Error updating template field:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.delete("/api/admin/template-fields/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteTemplateField(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "\u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting template field:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u062D\u0642\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/admin/template-fields/:templateId", isAdmin, async (req, res) => {
    try {
      const { templateId } = req.params;
      if (isNaN(parseInt(templateId))) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(parseInt(templateId));
      res.json(fields);
    } catch (error) {
      console.error("Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.put("/api/admin/template-fields/:templateId/order", isAdmin, async (req, res) => {
    try {
      const { templateId } = req.params;
      const { fields } = req.body;
      if (isNaN(parseInt(templateId))) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      if (!Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0633\u0644\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      for (const field of fields) {
        if (!field.id || isNaN(parseInt(field.id.toString()))) {
          continue;
        }
        await storage.updateTemplateField(parseInt(field.id.toString()), {
          displayOrder: field.displayOrder
        });
      }
      res.json({ message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0642\u0648\u0644 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error updating template field order:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0642\u0648\u0644" });
    }
  });
  app2.get("/api/templates/:templateId/fields", async (req, res) => {
    try {
      const { templateId } = req.params;
      if (isNaN(parseInt(templateId))) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(parseInt(templateId));
      console.log(`Retrieved ${fields.length} fields for template ID ${templateId} (public fields API)`);
      res.json(fields);
    } catch (error) {
      console.error("Error fetching template fields (public):", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/template-fields/:templateId([0-9]+)", async (req, res) => {
    try {
      const { templateId } = req.params;
      if (isNaN(parseInt(templateId))) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      console.log(`[DIRECT API] Fetching fields for template ID ${templateId}`);
      const template = await storage.getTemplate(parseInt(templateId));
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(parseInt(templateId));
      console.log(`[DIRECT API] Retrieved ${fields.length} fields for template ID ${templateId}`);
      res.json(fields);
    } catch (error) {
      console.error("[DIRECT API] Error fetching template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.post("/api/admin/fonts", isAdmin, async (req, res) => {
    try {
      const validatedData = insertFontSchema.parse(req.body);
      const font = await storage.createFont(validatedData);
      res.status(201).json(font);
    } catch (error) {
      if (error instanceof z5.ZodError) {
        return res.status(400).json({
          message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
          errors: error.errors
        });
      }
      console.error("Error creating font:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0637" });
    }
  });
  app2.put("/api/admin/fonts/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const font = await storage.updateFont(parseInt(id), req.body);
      if (!font) {
        return res.status(404).json({ message: "\u0627\u0644\u062E\u0637 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json(font);
    } catch (error) {
      console.error("Error updating font:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0637" });
    }
  });
  app2.delete("/api/admin/fonts/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteFont(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "\u0627\u0644\u062E\u0637 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062E\u0637 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting font:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062E\u0637" });
    }
  });
  app2.get("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      const category = req.query.category;
      if (category) {
        const settings2 = await storage.getSettingsByCategory(category);
        res.json(settings2);
      } else {
        const generalSettings = await storage.getSettingsByCategory("general");
        const emailSettings = await storage.getSettingsByCategory("email");
        const templateSettings = await storage.getSettingsByCategory("template");
        res.json([...generalSettings, ...emailSettings, ...templateSettings]);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A" });
    }
  });
  app2.post("/api/admin/settings", isAdmin, async (req, res) => {
    try {
      const validatedData = insertSettingSchema.parse({
        ...req.body,
        updatedBy: req.user.id
      });
      const setting = await storage.createOrUpdateSetting(validatedData);
      res.status(201).json(setting);
    } catch (error) {
      if (error instanceof z5.ZodError) {
        return res.status(400).json({
          message: "\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
          errors: error.errors
        });
      }
      console.error("Error creating/updating setting:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621/\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0625\u0639\u062F\u0627\u062F" });
    }
  });
  app2.delete("/api/admin/settings/:key", isAdmin, async (req, res) => {
    try {
      const { key } = req.params;
      const success = await storage.deleteSetting(key);
      if (!success) {
        return res.status(404).json({ message: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting setting:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0625\u0639\u062F\u0627\u062F" });
    }
  });
  app2.put("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { role, active, name, email } = req.body;
      const user = await storage.getUser(parseInt(id));
      if (!user) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const updatedUser = await storage.updateUser(parseInt(id), {
        role,
        active,
        name,
        email
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" });
    }
  });
  app2.delete("/api/admin/users/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const adminUsers = (await storage.getAllUsers()).users.filter((u) => u.role === "admin");
      if (adminUsers.length === 1 && adminUsers[0].id === parseInt(id)) {
        return res.status(400).json({ message: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0630\u0641 \u0622\u062E\u0631 \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0645\u062F\u064A\u0631" });
      }
      const success = await storage.deleteUser(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" });
    }
  });
  app2.get("/api/admin/stats", isAdmin, async (req, res) => {
    try {
      const totalUsers = (await storage.getAllUsers()).total;
      const categories2 = await storage.getAllCategories();
      const { templates: templates2, total: totalTemplates } = await storage.getAllTemplates();
      let totalCards = 0;
      let totalCertificates = 0;
      try {
        const userCardsResult = await storage.getAllCards({ limit: 1, offset: 0 });
        totalCards = userCardsResult.total;
      } catch (error) {
        console.error("Error counting cards:", error);
      }
      try {
        const userCertificatesResult = await storage.getAllCertificates({ limit: 1, offset: 0 });
        totalCertificates = userCertificatesResult.total;
      } catch (error) {
        console.error("Error counting certificates:", error);
      }
      res.json({
        totalUsers,
        totalCategories: categories2.length,
        totalTemplates,
        totalCards,
        totalCertificates,
        // Some recent activity
        recentUsers: (await storage.getAllUsers({ limit: 5 })).users.map((u) => {
          const { password, ...userWithoutPassword } = u;
          return userWithoutPassword;
        }),
        recentTemplates: templates2.slice(0, 5)
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A" });
    }
  });
  app2.get("/api/certificate-templates/:id", async (req, res) => {
    try {
      const { id } = req.params;
      let template;
      if (id === "new") {
        const certificateTemplates = await storage.getTemplatesByCategory(1, { active: true });
        template = certificateTemplates.length > 0 ? certificateTemplates[0] : null;
      } else {
        template = await storage.getTemplate(parseInt(id));
      }
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching certificate template:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0644\u0628 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.get("/api/certificate-templates/:id/fields", async (req, res) => {
    try {
      const { id } = req.params;
      let templateId;
      if (id === "new") {
        const certificateTemplates = await storage.getTemplatesByCategory(1, { active: true });
        templateId = certificateTemplates.length > 0 ? certificateTemplates[0].id : null;
      } else {
        templateId = parseInt(id);
      }
      if (!templateId) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const fields = await storage.getTemplateFields(templateId);
      console.log(`Retrieved ${fields.length} fields for certificate template ID ${templateId} (public API)`);
      res.json(fields);
    } catch (error) {
      console.error("Error fetching certificate template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062D\u0642\u0648\u0644 \u0642\u0627\u0644\u0628 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" });
    }
  });
  app2.get("/api/user/preferences", async (req, res) => {
    try {
      const preferences = {
        layout: "boxed",
        theme: "light"
      };
      if (req.user) {
        try {
          const userPreferences = await storage.getUserPreferences(req.user.id);
          if (userPreferences) {
            Object.assign(preferences, userPreferences);
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
        }
      }
      res.json(preferences);
    } catch (error) {
      console.error("Error in preferences API:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" });
    }
  });
  app2.post("/api/user/preferences", async (req, res) => {
    try {
      const { layout, theme } = req.body;
      if (layout && !["boxed", "fluid"].includes(layout)) {
        return res.status(400).json({ message: "\u0642\u064A\u0645\u0629 \u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      if (theme && !["light", "dark", "system"].includes(theme)) {
        return res.status(400).json({ message: "\u0642\u064A\u0645\u0629 \u0627\u0644\u0633\u0645\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      const preferences = {
        layout: layout || "boxed",
        theme: theme || "light"
      };
      if (req.user) {
        await storage.saveUserPreferences(req.user.id, preferences);
      }
      if (req.session) {
        req.session.userPreferences = preferences;
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error saving user preferences:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u062A\u0641\u0636\u064A\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" });
    }
  });
  app2.get("/api/user/logos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const logos = await storage.getUserLogos(userId);
      res.json(logos || []);
    } catch (error) {
      console.error("Error fetching user logos:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u0634\u0639\u0627\u0631\u0627\u062A" });
    }
  });
  app2.post("/api/user/logos", isAuthenticated, upload3.single("logo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0645\u0644\u0641 \u0644\u0644\u0634\u0639\u0627\u0631" });
      }
      const userId = req.user.id;
      const name = req.body.name || "\u0634\u0639\u0627\u0631";
      const fileUrl = `/uploads/${req.file.filename}`;
      const logo = await storage.createUserLogo({
        userId,
        name,
        imageUrl: fileUrl
      });
      res.json(logo);
    } catch (error) {
      console.error("Error uploading logo:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
  });
  app2.delete("/api/user/logos/:id", isAuthenticated, async (req, res) => {
    try {
      const logoId = parseInt(req.params.id);
      const userId = req.user.id;
      if (isNaN(logoId)) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const logo = await storage.getUserLogo(logoId);
      if (!logo || logo.userId !== userId) {
        return res.status(404).json({ message: "\u0627\u0644\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      await storage.deleteUserLogo(logoId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting logo:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u0634\u0639\u0627\u0631" });
    }
  });
  app2.get("/api/user/signatures", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const signatures = await storage.getUserSignatures(userId);
      res.json(signatures || []);
    } catch (error) {
      console.error("Error fetching user signatures:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A" });
    }
  });
  app2.post("/api/user/signatures", isAuthenticated, upload3.single("signature"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "\u0644\u0645 \u064A\u062A\u0645 \u062A\u0642\u062F\u064A\u0645 \u0645\u0644\u0641 \u0644\u0644\u062A\u0648\u0642\u064A\u0639" });
      }
      const userId = req.user.id;
      const name = req.body.name || "\u062A\u0648\u0642\u064A\u0639";
      const type = req.body.type === "stamp" ? "stamp" : "signature";
      const fileUrl = `/uploads/${req.file.filename}`;
      const signature = await storage.createUserSignature({
        userId,
        name,
        type,
        imageUrl: fileUrl
      });
      res.json(signature);
    } catch (error) {
      console.error("Error uploading signature:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
  });
  app2.delete("/api/user/signatures/:id", isAuthenticated, async (req, res) => {
    try {
      const signatureId = parseInt(req.params.id);
      const userId = req.user.id;
      if (isNaN(signatureId)) {
        return res.status(400).json({ message: "\u0631\u0642\u0645 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D" });
      }
      const signature = await storage.getUserSignature(signatureId);
      if (!signature || signature.userId !== userId) {
        return res.status(404).json({ message: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      await storage.deleteUserSignature(signatureId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting signature:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" });
    }
  });
  app2.get("/api/display-settings", async (req, res) => {
    try {
      let settings2 = {
        displayMode: "multi",
        templateViewMode: "multi-page",
        // 'multi-page' للطريقة التقليدية، 'single-page' للطريقة الجديدة
        enableSocialFormats: true,
        defaultSocialFormat: "instagram"
      };
      try {
        const storedSettings = await storage.getSettingsByCategory("display");
        if (storedSettings && storedSettings.length > 0) {
          storedSettings.forEach((setting) => {
            if (setting.key && setting.value) {
              try {
                const value = JSON.parse(String(setting.value));
                settings2[setting.key] = value;
              } catch (e) {
                settings2[setting.key] = setting.value;
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching display settings:", error);
      }
      res.json({ settings: settings2 });
    } catch (error) {
      console.error("Error in display settings API:", error);
      res.status(500).json({ message: "Error fetching display settings" });
    }
  });
  app2.post("/api/display-settings", isAdmin, async (req, res) => {
    try {
      const settings2 = req.body;
      if (!settings2) {
        return res.status(400).json({ message: "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0633\u0644\u0629 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629" });
      }
      console.log("Saving display settings:", settings2);
      for (const [key, value] of Object.entries(settings2)) {
        const settingValue = typeof value === "object" ? JSON.stringify(value) : String(value);
        await storage.createOrUpdateSetting({
          category: "display",
          key,
          value: settingValue,
          description: `Display setting - ${key}`
        });
      }
      res.json({ success: true, message: "\u062A\u0645 \u062D\u0641\u0638 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0631\u0636 \u0628\u0646\u062C\u0627\u062D" });
    } catch (error) {
      console.error("Error saving display settings:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A" });
    }
  });
  app2.get("/api/social-formats", async (req, res) => {
    try {
      const { DEFAULT_SOCIAL_FORMATS: DEFAULT_SOCIAL_FORMATS2 } = await Promise.resolve().then(() => (init_social_image_generator(), social_image_generator_exports));
      let formats = DEFAULT_SOCIAL_FORMATS2;
      try {
        const settingsArray = await storage.getSettingsByCategory("social-formats");
        if (settingsArray && settingsArray.length > 0) {
          formats = {};
          for (const setting of settingsArray) {
            try {
              if (setting.key && setting.value) {
                formats[setting.key] = JSON.parse(String(setting.value));
              }
            } catch (parseError) {
              console.error(`Error parsing format setting for ${setting.key}:`, parseError);
            }
          }
        }
      } catch (dbError) {
        console.error("Error fetching social formats from database:", dbError);
      }
      res.json({ formats });
    } catch (error) {
      console.error("Error fetching social formats:", error);
      res.status(500).json({ message: "Error fetching social formats" });
    }
  });
  app2.post("/api/admin/display-settings", isAuthenticated, isAdmin, async (req, res) => {
    console.log("Received POST to /api/admin/display-settings with body:", JSON.stringify(req.body));
    try {
      const { displayMode, templateViewMode, enableSocialFormats, defaultSocialFormat } = req.body;
      if (displayMode && !["single", "multi"].includes(displayMode)) {
        return res.status(400).json({ message: "\u0642\u064A\u0645\u0629 \u0648\u0636\u0639 \u0627\u0644\u0639\u0631\u0636 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      if (templateViewMode && !["single-page", "multi-page"].includes(templateViewMode)) {
        return res.status(400).json({ message: "\u0642\u064A\u0645\u0629 \u0648\u0636\u0639 \u0639\u0631\u0636 \u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      if (displayMode) {
        await storage.createOrUpdateSetting({
          key: "displayMode",
          value: displayMode,
          category: "display",
          description: "Display mode for the app (multi or single)"
        });
      }
      if (templateViewMode) {
        await storage.createOrUpdateSetting({
          key: "templateViewMode",
          value: templateViewMode,
          category: "display",
          description: "Template view mode (single-page or multi-page)"
        });
      }
      if (enableSocialFormats !== void 0) {
        await storage.createOrUpdateSetting({
          key: "enableSocialFormats",
          value: enableSocialFormats,
          category: "display",
          description: "Enable social media format options"
        });
      }
      if (defaultSocialFormat) {
        await storage.createOrUpdateSetting({
          key: "defaultSocialFormat",
          value: defaultSocialFormat,
          category: "display",
          description: "Default social media format"
        });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating display settings:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0631\u0636" });
    }
  });
  app2.use("/uploads", express11.static(uploadsDir3, {
    setHeaders: (res, path17) => {
      if (path17.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path17.endsWith(".mjs")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path17.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path17.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
      }
    }
  }));
  app2.use("/api/cards", cards_default);
  app2.post("/api/templates/copy-fields", isAuthenticated, async (req, res) => {
    try {
      const { sourceTemplateId, targetTemplateId, fieldIds } = req.body;
      if (!sourceTemplateId || !targetTemplateId) {
        return res.status(400).json({ message: "\u0645\u0639\u0631\u0641 \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0635\u062F\u0631 \u0648\u0627\u0644\u0647\u062F\u0641 \u0645\u0637\u0644\u0648\u0628\u0627\u0646" });
      }
      const sourceFields = await storage.getTemplateFields(parseInt(sourceTemplateId));
      if (!sourceFields || sourceFields.length === 0) {
        return res.status(404).json({ message: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0642\u0648\u0644 \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0645\u0635\u062F\u0631" });
      }
      const targetFields = await storage.getTemplateFields(parseInt(targetTemplateId));
      const targetFieldNames = targetFields.map((field) => field.name);
      let fieldsToCopy = [];
      if (fieldIds && fieldIds.length > 0) {
        fieldsToCopy = sourceFields.filter((field) => fieldIds.includes(field.id));
      } else {
        fieldsToCopy = sourceFields;
      }
      const uniqueFieldsToCopy = fieldsToCopy.filter((field) => !targetFieldNames.includes(field.name));
      const nextDisplayOrder = targetFields.length;
      const createdFields = [];
      const duplicateFields = [];
      for (let i = 0; i < fieldsToCopy.length; i++) {
        const field = fieldsToCopy[i];
        if (targetFieldNames.includes(field.name)) {
          duplicateFields.push(field.name);
          continue;
        }
        const { id, ...fieldData } = field;
        const createFieldData = {
          name: fieldData.name,
          label: fieldData.label,
          labelAr: fieldData.labelAr || null,
          type: fieldData.type || "text",
          required: Boolean(fieldData.required),
          defaultValue: fieldData.defaultValue || null,
          placeholder: fieldData.placeholder || null,
          placeholderAr: fieldData.placeholderAr || null,
          options: typeof fieldData.options === "object" ? JSON.parse(JSON.stringify(fieldData.options)) : [],
          position: typeof fieldData.position === "object" ? JSON.parse(JSON.stringify(fieldData.position)) : {},
          style: typeof fieldData.style === "object" ? JSON.parse(JSON.stringify(fieldData.style)) : {},
          displayOrder: nextDisplayOrder + createdFields.length,
          templateId: parseInt(targetTemplateId)
        };
        const newField = await storage.createTemplateField(createFieldData);
        createdFields.push(newField);
      }
      let message = "";
      if (createdFields.length > 0) {
        message = `\u062A\u0645 \u0646\u0633\u062E ${createdFields.length} \u062D\u0642\u0644 \u0628\u0646\u062C\u0627\u062D`;
        if (duplicateFields.length > 0) {
          message += `. \u062A\u0645 \u062A\u062C\u0627\u0648\u0632 ${duplicateFields.length} \u062D\u0642\u0644 \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B`;
        }
      } else if (duplicateFields.length > 0) {
        message = `\u0644\u0645 \u064A\u062A\u0645 \u0646\u0633\u062E \u0623\u064A \u062D\u0642\u0648\u0644. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0645\u0648\u062C\u0648\u062F\u0629 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0642\u0627\u0644\u0628 \u0627\u0644\u0647\u062F\u0641`;
      }
      res.status(201).json({
        message,
        copied: createdFields.length,
        skipped: duplicateFields.length,
        duplicateFields,
        fields: createdFields
      });
    } catch (error) {
      console.error("Error copying template fields:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0646\u0633\u062E \u062D\u0642\u0648\u0644 \u0627\u0644\u0642\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/admin/templates-list", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { templates: templates2 } = await storage.getAllTemplates();
      const templatesList = templates2.map((template) => ({
        id: template.id,
        title: template.title
      }));
      res.json(templatesList);
    } catch (error) {
      console.error("Error fetching templates list:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0642\u0648\u0627\u0644\u0628" });
    }
  });
  app2.get("/api/admin/templates/:templateId/layout", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const templateId = parseInt(req.params.templateId);
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const layoutData = template.settings?.layoutData || [];
      res.json(layoutData);
    } catch (error) {
      console.error("Error fetching template layout:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062E\u0637\u064A\u0637" });
    }
  });
  app2.put("/api/admin/templates/:templateId/layout", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const templateId = parseInt(req.params.templateId);
      const { layout } = req.body;
      if (!Array.isArray(layout)) {
        return res.status(400).json({ message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
      }
      const template = await storage.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({ message: "\u0627\u0644\u0642\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      const settings2 = {
        ...template.settings || {},
        layoutData: layout
      };
      await storage.updateTemplate(templateId, { settings: settings2 });
      res.json({ message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u062E\u0637\u064A\u0637 \u0628\u0646\u062C\u0627\u062D", layoutData: layout });
    } catch (error) {
      console.error("Error updating template layout:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062E\u0637\u064A\u0637" });
    }
  });
  app2.post("/api/cards/:cardId/social", async (req, res) => {
    try {
      const { cardId } = req.params;
      const { format: format2, options = {} } = req.body;
      if (!format2) {
        return res.status(400).json({ message: "\u0646\u0648\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0637\u0644\u0648\u0628" });
      }
      const card = await storage.getCardByPublicId(cardId) || await storage.getCard(Number(cardId));
      if (!card) {
        return res.status(404).json({ message: "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      const { generateSocialImage: generateSocialImage2 } = await Promise.resolve().then(() => (init_social_image_generator(), social_image_generator_exports));
      const imagePath = await generateSocialImage2(
        card.imageUrl,
        format2,
        {
          quality: options.quality || "medium",
          watermark: options.watermark,
          watermarkText: options.watermarkText,
          cropMode: options.cropMode || "fit"
        }
      );
      res.json({
        success: true,
        imageUrl: imagePath
      });
    } catch (error) {
      console.error("Error generating social media image:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u0635\u0648\u0631\u0629 \u0644\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A" });
    }
  });
  app2.get("/api/social-formats", async (req, res) => {
    try {
      const formats = {
        instagram: {
          width: 1080,
          height: 1080,
          ratio: "1:1",
          description: "Instagram (Square)"
        },
        "instagram-portrait": {
          width: 1080,
          height: 1350,
          ratio: "4:5",
          description: "Instagram (Portrait)"
        },
        "instagram-landscape": {
          width: 1080,
          height: 566,
          ratio: "1.91:1",
          description: "Instagram (Landscape)"
        },
        "instagram-story": {
          width: 1080,
          height: 1920,
          ratio: "9:16",
          description: "Instagram Story"
        },
        facebook: {
          width: 1200,
          height: 630,
          ratio: "1.91:1",
          description: "Facebook"
        },
        twitter: {
          width: 1200,
          height: 675,
          ratio: "16:9",
          description: "Twitter"
        },
        linkedin: {
          width: 1200,
          height: 627,
          ratio: "1.91:1",
          description: "LinkedIn"
        },
        whatsapp: {
          width: 800,
          height: 800,
          ratio: "1:1",
          description: "WhatsApp"
        }
      };
      res.json({ formats });
    } catch (error) {
      console.error("Error fetching social formats:", error);
      res.status(500).json({ message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062C\u0644\u0628 \u062A\u0646\u0633\u064A\u0642\u0627\u062A \u0627\u0644\u0648\u0633\u0627\u0626\u0637 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629" });
    }
  });
  app2.use("/api/admin/settings", admin_settings_default);
  app2.use("/api/auth-settings", auth_settings_default);
  app2.use("/api/admin", admin_stats_default);
  app2.use("/api/admin/maintenance", admin_maintenance_default);
  app2.use("/api/layers", layers_default);
  app2.use("/api/logos", logos_default);
  app2.use("/api/signatures", signatures_default);
  app2.use("/api/health", health_check_default);
  app2.use("/api/seo", seo_router_default);
  app2.get("/health", (req, res) => {
    res.json({
      status: "ok",
      message: "\u0627\u0644\u0646\u0638\u0627\u0645 \u064A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u062C\u064A\u062F",
      timestamp: /* @__PURE__ */ new Date(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development"
    });
  });
  app2.get("/api/admin/template-fields/:templateId", isAdmin, getTemplateFields);
  app2.put("/api/admin/template-fields/:templateId", isAdmin, updateTemplateFields);
  app2.delete("/api/admin/template-fields/:templateId/:fieldId", isAdmin, deleteTemplateField);
  setupCertificateAnalyticsRoutes(app2, "/api");
  setupClientErrorLoggerRoutes(app2, "/api");
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express12 from "express";
import fs14 from "fs";
import path15 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path14 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  optimizeDeps: {
    include: ["fabric"]
  },
  resolve: {
    alias: {
      "@": path14.resolve(import.meta.dirname, "client", "src"),
      "@shared": path14.resolve(import.meta.dirname, "shared"),
      "@assets": path14.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path14.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path14.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path15.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs14.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path15.resolve(import.meta.dirname, "public");
  if (!fs14.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express12.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path15.resolve(distPath, "index.html"));
  });
}

// server/init-db.ts
init_schema();
import { eq as eq6 } from "drizzle-orm";
var MAX_RETRIES = 3;
var RETRY_DELAY = 2e3;
async function ensureDefaultAdminExists() {
  console.log("\u{1F504} \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin \u0627\u0641\u062A\u0631\u0627\u0636\u064A...");
  const isDatabaseConnected = await checkDatabaseConnection2();
  if (!isDatabaseConnected) {
    console.warn("\u26A0\uFE0F \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0645\u062A\u0635\u0644\u0629. \u062A\u062E\u0637\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin.");
    return null;
  }
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const defaultPassword = "700700";
      const hashedPassword = await hashPassword(defaultPassword);
      const adminUser = await db2.select().from(users).where(eq6(users.username, "admin"));
      if (!adminUser || adminUser.length === 0) {
        console.log("\u2139\uFE0F \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0633\u062A\u062E\u062F\u0645 admin\u060C \u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0633\u062A\u062E\u062F\u0645 \u062C\u062F\u064A\u062F...");
        const newUser = await db2.insert(users).values({
          username: "admin",
          password: hashedPassword,
          fullName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",
          email: "admin@example.com",
          isAdmin: true,
          // التأكد من تعيين صلاحية المسؤول
          role: "admin",
          // التأكد من تعيين دور المسؤول
          createdAt: /* @__PURE__ */ new Date()
        }).returning();
        console.log("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0645\u0633\u062A\u062E\u062F\u0645 admin \u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0628\u0646\u062C\u0627\u062D");
        console.log("Username: admin");
        console.log("Password: 700700");
        return newUser[0];
      }
      await db2.update(users).set({
        password: hashedPassword,
        isAdmin: true,
        // التأكد من أن المسؤول دائمًا لديه صلاحيات المسؤول
        role: "admin"
        // التأكد من أن المسؤول دائمًا له دور "admin"
      }).where(eq6(users.username, "admin"));
      console.log("\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin \u0648\u062A\u062D\u062F\u064A\u062B \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");
      console.log("Username: admin");
      console.log("Password: 700700");
      return adminUser[0];
    } catch (error) {
      console.error(`\u274C \u0645\u062D\u0627\u0648\u0644\u0629 ${attempt + 1}/${MAX_RETRIES} \u0641\u0634\u0644\u062A:`, error);
      if (attempt < MAX_RETRIES - 1) {
        console.log(`\u23F3 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 ${RETRY_DELAY / 1e3} \u062B\u0648\u0627\u0646\u064D \u0642\u0628\u0644 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629...`);
        await new Promise((resolve2) => setTimeout(resolve2, RETRY_DELAY));
      }
    }
  }
  console.log("\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin");
  return null;
}

// server/lib/mime-middleware.ts
function mimeMiddleware(req, res, next) {
  const urlPath = req.path;
  if (urlPath.match(/\.(js|mjs|jsx|ts|tsx)(\?[^?]*)?$/)) {
    res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  } else if (urlPath.endsWith(".css") || urlPath.includes(".css?")) {
    res.setHeader("Content-Type", "text/css; charset=utf-8");
  } else if (urlPath.endsWith(".svg") || urlPath.includes(".svg?")) {
    res.setHeader("Content-Type", "image/svg+xml");
  } else if (urlPath.endsWith(".json") || urlPath.includes(".json?")) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  } else if (urlPath.endsWith(".html") || urlPath.includes(".html?")) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  } else if (urlPath.endsWith(".txt") || urlPath.includes(".txt?")) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
  } else if (urlPath.endsWith(".woff") || urlPath.includes(".woff?")) {
    res.setHeader("Content-Type", "font/woff");
  } else if (urlPath.endsWith(".woff2") || urlPath.includes(".woff2?")) {
    res.setHeader("Content-Type", "font/woff2");
  } else if (urlPath.endsWith(".ttf") || urlPath.includes(".ttf?")) {
    res.setHeader("Content-Type", "font/ttf");
  } else if (urlPath.match(/\.(jpg|jpeg)(\?[^?]*)?$/)) {
    res.setHeader("Content-Type", "image/jpeg");
  } else if (urlPath.endsWith(".png") || urlPath.includes(".png?")) {
    res.setHeader("Content-Type", "image/png");
  } else if (urlPath.endsWith(".gif") || urlPath.includes(".gif?")) {
    res.setHeader("Content-Type", "image/gif");
  } else if (urlPath.endsWith(".webp") || urlPath.includes(".webp?")) {
    res.setHeader("Content-Type", "image/webp");
  }
  if (urlPath.match(/\.(js|mjs|jsx|ts|tsx)(\?[^?]*)?$/)) {
    res.setHeader("X-Content-Type-Options", "nosniff");
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
}

// server/lib/api-redirect.ts
var apiUrl = process.env.API_URL || "http://localhost:5000";
function apiRedirectMiddleware(req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  if (apiUrl && apiUrl !== "" && req.path.startsWith("/api")) {
    const host = req.get("host");
    if (host && apiUrl.includes(host)) {
      console.log(`\u2139\uFE0F \u062A\u062C\u0627\u0647\u0644 \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 API \u0644\u0646\u0641\u0633 \u0627\u0644\u0645\u0636\u064A\u0641: ${host}`);
      return next();
    }
    const targetUrl = `${apiUrl}${req.path}`;
    console.log(`\u{1F504} \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 \u0637\u0644\u0628 API \u0645\u0646 ${req.path} \u0625\u0644\u0649 ${targetUrl}`);
    return res.redirect(targetUrl);
  }
  next();
}
function apiPathFixMiddleware(req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    return next();
  }
  if (apiUrl && apiUrl !== "" && req.url.includes(apiUrl)) {
    const originalUrl = req.url;
    req.url = req.url.replace(apiUrl, "");
    console.log(`\u{1F527} \u062A\u0635\u062D\u064A\u062D \u0645\u0633\u0627\u0631 API \u0645\u0646 ${originalUrl} \u0625\u0644\u0649 ${req.url}`);
  }
  next();
}

// server/index.ts
import fs15 from "fs";
import path16 from "path";
loadEnv();
var logsDir = path16.join(process.cwd(), "logs");
if (!fs15.existsSync(logsDir)) {
  try {
    fs15.mkdirSync(logsDir, { recursive: true });
    console.log(`\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0644\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${logsDir}`);
  } catch (error) {
    console.error(`\u274C \u0641\u0634\u0644 \u0625\u0646\u0634\u0627\u0621 \u0645\u062C\u0644\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A: ${error instanceof Error ? error.message : String(error)}`);
  }
}
var app = express13();
app.use(express13.json());
app.use(express13.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "production") {
  app.use(apiPathFixMiddleware);
  app.use(apiRedirectMiddleware);
  console.log("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0648\u0633\u0627\u0626\u0637 \u0625\u0639\u0627\u062F\u0629 \u062A\u0648\u062C\u064A\u0647 API \u0644\u0644\u0625\u0646\u062A\u0627\u062C");
}
app.use(mimeMiddleware);
process.on("uncaughtException", (error) => {
  console.error("\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0627\u0644\u062C:", error);
  logger.critical(error);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("\u0648\u0639\u062F \u0645\u0631\u0641\u0648\u0636 \u063A\u064A\u0631 \u0645\u0639\u0627\u0644\u062C:", reason);
  const error = reason instanceof Error ? reason : new Error(String(reason));
  logger.critical(error, {
    type: "unhandledRejection",
    promise: String(promise)
  });
});
app.use((req, res, next) => {
  const start = Date.now();
  const path17 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path17.startsWith("/api")) {
      let logLine = `${req.method} ${path17} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  try {
    const isDatabaseConnected = await checkDatabaseConnection2();
    if (isDatabaseConnected) {
      console.log("\u2705 \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D");
      if (app.get("env") === "production") {
        scheduleHealthChecks();
        console.log("\u2705 \u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0645\u0631\u0627\u0642\u0628\u0629 \u0635\u062D\u0629 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
      }
      await ensureDefaultAdminExists();
    } else {
      console.error("\u274C \u0641\u0634\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");
    }
  } catch (error) {
    console.error("\u274C \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:", error);
  }
  const server = await registerRoutes(app);
  app.use((err, req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errorToLog = err instanceof Error ? err : new Error(String(err));
    if (status >= 500) {
      logger.critical(errorToLog, {
        path: req.path,
        method: req.method,
        status,
        ip: req.ip
      }, req);
    } else if (status >= 400) {
      logger.warn(errorToLog.message, {
        path: req.path,
        method: req.method,
        status,
        ip: req.ip
      }, req);
    }
    res.status(status).json({
      message,
      errorId: (/* @__PURE__ */ new Date()).getTime().toString(),
      // إضافة تفاصيل إضافية في بيئة التطوير فقط
      ...process.env.NODE_ENV === "development" ? {
        stack: err.stack,
        details: err.details || null
      } : {}
    });
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const setupServices = () => {
    try {
      log("\u{1F504} \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin \u0627\u0641\u062A\u0631\u0627\u0636\u064A...");
      ensureDefaultAdminExists().then(() => {
        log("\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0648\u062C\u0648\u062F \u0645\u0633\u062A\u062E\u062F\u0645 admin");
      }).catch((err) => {
        log(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646/\u0625\u0646\u0634\u0627\u0621 \u0645\u0633\u062A\u062E\u062F\u0645 admin: ${err.message}`);
      });
    } catch (err) {
      log(`\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0647\u064A\u0626\u0629 \u0645\u0633\u062A\u062E\u062F\u0645 admin: ${err}`);
    }
    if (process.env.NODE_ENV === "production") {
      const stopHealthChecks = scheduleHealthChecks();
      process.on("SIGTERM", () => {
        if (stopHealthChecks && typeof stopHealthChecks === "object" && "timer" in stopHealthChecks) {
          clearInterval(stopHealthChecks.timer);
        }
      });
    }
  };
  try {
    server.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
      setupServices();
    });
  } catch (error) {
    console.error(`\u274C \u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u0639\u0644\u0649 0.0.0.0:${port}: ${error}`);
    try {
      server.listen(port, () => {
        log(`serving on port ${port} (\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u062F\u064A\u0644\u0629)`);
        setupServices();
      });
    } catch (fallbackError) {
      console.error(`\u274C \u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0641\u0630 ${port}: ${fallbackError}`);
      if (port < 1024) {
        console.log(`\u{1F504} \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0645\u0646\u0641\u0630 3000 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 ${port}...`);
        try {
          server.listen(3e3, "0.0.0.0", () => {
            log("serving on port 3000 (\u0645\u0646\u0641\u0630 \u0628\u062F\u064A\u0644)");
            setupServices();
          });
        } catch (emergencyError) {
          console.error(`\u274C \u0641\u0634\u0644\u062A \u062C\u0645\u064A\u0639 \u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639: ${emergencyError}`);
        }
      }
    }
  }
})();
