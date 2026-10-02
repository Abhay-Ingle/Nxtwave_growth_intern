import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose, { Schema, type Document, type Model } from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(serverDirectory, '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config();

type RegistrationRecord = { name: string; email: string; phone: string; college: string; year: string; source: string; referralCode: string; referredBy: string; utm: Record<string, string>; createdAt: Date };
type RegistrationDocument = RegistrationRecord & Document;
const registrationSchema = new Schema<RegistrationDocument>({ name: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true }, phone: { type: String, required: true }, college: { type: String, required: true }, year: { type: String, required: true }, source: { type: String, required: true }, referralCode: { type: String, required: true, unique: true }, referredBy: { type: String, default: '' }, utm: { type: Schema.Types.Mixed, default: {} }, createdAt: { type: Date, default: Date.now } });
const Registration: Model<RegistrationDocument> = mongoose.model<RegistrationDocument>('Registration', registrationSchema);
const app = express(); app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || true })); app.use(express.json());
const demoRecords: RegistrationRecord[] = [
  { name: 'Aarav Kumar', email: 'aarav@example.com', phone: '+919876500001', college: 'Demo Institute', year: 'Final year - CSE / IT', source: 'college-club', referralCode: 'AARAV120', referredBy: '', utm: { utm_source: 'club' }, createdAt: new Date() },
  { name: 'Meera Shah', email: 'meera@example.com', phone: '+919876500002', college: 'City Engineering College', year: 'Final year - ECE / EEE', source: 'whatsapp', referralCode: 'MEERA204', referredBy: 'AARAV120', utm: { utm_source: 'whatsapp' }, createdAt: new Date(Date.now() - 86400000) },
];
let mongoReady = false;
const sourceLabel = (value: string) => ({ 'college-club': 'College club', whatsapp: 'WhatsApp', referral: 'Referral', email: 'Email', paid: 'Paid' }[value] || value || 'Direct');
const makeCode = (name: string) => `${name.replace(/[^a-z]/gi, '').slice(0, 5).toUpperCase() || 'BUILD'}${Math.floor(100 + Math.random() * 900)}`;

app.get('/api/health', (_req, res) => res.json({ ok: true, database: mongoReady ? 'mongodb' : 'demo-memory' }));
app.post('/api/registrations', async (req, res) => {
  const { name, email, phone, college, year, source = 'direct', referralCode = '', utm = {} } = req.body || {};
  if (!name || !email || !phone || !college || !year) return res.status(400).json({ message: 'Name, email, phone, college and year are required.' });
  try {
    if (mongoReady) {
      const existing = await Registration.findOne({ email: String(email).toLowerCase() });
      if (existing) return res.status(409).json({ message: 'This email is already registered.' });
      const created = await Registration.create({ name, email, phone, college, year, source: sourceLabel(source), referralCode: makeCode(name), referredBy: referralCode, utm });
      return res.status(201).json({ referralCode: created.referralCode });
    }
    if (demoRecords.some((record) => record.email === String(email).toLowerCase())) return res.status(409).json({ message: 'This email is already registered.' });
    const record = { name, email: String(email).toLowerCase(), phone, college, year, source: sourceLabel(source), referralCode: makeCode(name), referredBy: referralCode, utm, createdAt: new Date() }; demoRecords.push(record); return res.status(201).json({ referralCode: record.referralCode });
  } catch (error) { console.error(error); return res.status(500).json({ message: 'Unable to save registration.' }); }
});

app.get('/api/analytics', async (_req, res) => {
  try {
    const records = mongoReady ? await Registration.find().sort({ createdAt: -1 }).lean() : [...demoRecords].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const sources = new Map<string, number>(); const days = new Map<string, number>();
    records.forEach((record) => { sources.set(record.source, (sources.get(record.source) || 0) + 1); const date = new Date(record.createdAt).toISOString().slice(0, 10); days.set(date, (days.get(date) || 0) + 1); });
    const sourceBreakdown = [...sources.entries()].map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count);
    return res.json({ total: records.length, referralCount: records.filter((record) => record.referredBy).length, sourceBreakdown, daily: [...days.entries()].map(([date, count]) => ({ date, count })).reverse(), recent: records.slice(0, 8).map((record) => ({ name: record.name, phone: record.phone, college: record.college, source: record.source, referralCode: record.referralCode, createdAt: record.createdAt })) });
  } catch (error) { console.error(error); return res.status(500).json({ message: 'Unable to load analytics.' }); }
});

const port = Number(process.env.PORT || 4000);
async function start() { if (process.env.MONGODB_URI) { try { await mongoose.connect(process.env.MONGODB_URI); mongoReady = true; console.log('MongoDB connected'); } catch (error) { console.error('MongoDB connection failed; using demo memory mode.', error); } } else console.log('MONGODB_URI missing; using demo memory mode.'); app.listen(port, () => console.log(`API listening on ${port}`)); }
start();