# NxtWave Growth Intern Challenge

## 1. Growth plan (5-slide / 2-page version)

### Slide 1: The student and the opportunity

**Target:** final-year engineering students in CSE/IT/ECE/EEE, especially students who are placement-focused but have not built an AI project yet.

**Student truth (assumption):** They have seen a lot of AI content, but the category feels broad and intimidating. A certificate is easy to ignore; a working project they can show in an interview is valuable.

**Positioning:** “In 60 minutes, go from an empty screen to one working AI project you can put on GitHub.”

### Slide 2: The campaign

Use three coordinated distribution loops, plus one small paid test:

1. **College clubs and class representatives:** Give 12 reps a ready-to-forward message and a tracked registration link. This is the primary channel because students already trust the group admin.
2. **WhatsApp referral loop:** After registering, each student gets a simple referral code and a one-tap share message. The ask is specific: invite one teammate, not “share everywhere.”
3. **Email and alumni communities:** Send one useful project preview and one deadline reminder through placement cells, coding clubs and alumni groups.
4. **Paid message test:** Spend only after organic signals appear. Test the best-performing hook for final-year engineering interests.

### Slide 3: Transparent path to 500

| Source | Calculation | Registration target |
|---|---:|---:|
| Clubs / class reps | 12 reps x 100 students x 20% conversion | 240 |
| WhatsApp referrals | Peer sharing after the first 160 registrations | 160 |
| Email / alumni lists | 2 lists x 1,750 reachable students x 2% conversion | 70 |
| Paid test | ₹1,200 / ₹40 target cost per registration | 30 |
| **Total** |  | **500** |

**Budget:** ₹1,200 paid test; ₹500 club rewards (₹50 for each club crossing 25 verified registrations); ₹300 contingency. The organic target is 470, so the campaign does not depend on paid media to work.

These are planning assumptions, not claimed historical benchmarks. On Day 2, I would replace them with actual source-level conversion data and move time and budget to the best channel.

### Slide 4: Seven-day operating plan

| Day | Action | Decision / metric |
|---|---|---|
| 1 | Recruit 12 reps; publish asset; prepare one message and one build preview | Reps confirmed; links tested |
| 2 | Launch clubs and class WhatsApp groups | Registrations by source; response rate |
| 3 | Add 30-second project preview and referral ask | Referral share rate |
| 4 | Send email to partner lists; personally remind registrants | Email click-to-registration |
| 5 | Put ₹400 behind the best hook; continue organic | Cost per registration |
| 6 | Last-24-hours agenda and reminder | Daily registration pace |
| 7 | Close, deduplicate, send joining link | 500 verified registrations |

### Slide 5: Measurement and ownership

Every link carries a source label: `club`, `whatsapp`, `email`, `referral`, or `paid`. The daily sheet has: registrations, unique emails, source, referral code, cost, and cost per registration.

**North-star metric:** verified registrations, not clicks. **Quality check:** email uniqueness and attendance intent. **Go/no-go rule:** if a channel has no registrations after 24 hours, change the message or stop spending; do not protect a weak idea.

## 2. Working asset

Run the full-stack app with `npm install` followed by `npm run dev`. Open `http://localhost:5173` for registration and `http://localhost:5173/dashboard` for the analytics view. It is a working demo of the registration and referral engine:

- Student-first workshop promise and a short form.
- Source selection for attribution.
- Express registration API backed by MongoDB through Mongoose.
- Generated referral code and WhatsApp share link.
- UTM parameter capture (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`).
- React/Recharts dashboard for total registrations, referrals, daily trend, source mix and recent registrations.
- The campaign funnel and seven-day operating plan are visible on the same page.

The server uses two clearly labeled demo records in memory when `MONGODB_URI` is not configured, which keeps the reviewable prototype runnable. With MongoDB configured, registrations are stored persistently and duplicate emails are rejected. The dashboard is intentionally an admin demo without authentication; production deployment should add an admin identity provider before making it public.

## 3. AI + learning notes

### Note 1: Choosing the asset

- **Asked:** “What is the most impressive thing to build for this growth challenge?”
- **AI suggested:** A complex automation stack with a chatbot, CRM and multi-step email workflow.
- **I changed:** I chose a registration + referral asset that can be understood and tested in under a minute. The constraint is ₹2,000 and seven days, so the asset must reduce registration friction first.

### Note 2: The student message

- **Asked:** “Write five workshop headlines for engineering students.”
- **AI suggested:** Generic lines about the future of AI and career success.
- **I changed:** I kept the concrete outcome: “one working AI project you can show.” It is closer to the student's placement context and gives the campaign a believable reason to act now.

### Note 3: The funnel math

- **Asked:** “Create a plan to reach 500 registrations.”
- **AI suggested:** Many channels and optimistic viral multipliers.
- **I changed:** I limited the plan to clubs, WhatsApp, email and one paid test. Every source has a visible calculation, a cost ceiling or a validation step. The numbers are clearly marked as assumptions rather than presented as facts.

## 4. What changed, what I would improve

**First idea to final solution:** I started with a landing page as the obvious deliverable. I narrowed it into a measurable registration asset: source attribution, referral code, share action and a visible funnel. That connects the asset to the growth plan instead of making a page that only looks polished.

**Another 24 hours:** I would test two messages with a small student sample, connect submissions to a real sheet, add duplicate-email protection, and run a five-person usability check. I would also replace the planning assumptions with observed conversion rates.

**AI suggestion deliberately rejected:** I rejected a large automation build because it would add technical surface area without proving that students want the workshop. Human judgment set the order: validate the offer and distribution first, automate after signal.

## 5. Three-minute video outline

1. **0:00-0:35:** Target student, problem and the “one working project” promise.
2. **0:35-1:20:** Show the page, register, display the referral code and WhatsApp share action.
3. **1:20-2:20:** Explain the four channels and the 240 + 160 + 70 + 30 calculation.
4. **2:20-2:50:** Explain the seven-day operating rhythm and budget decisions.
5. **2:50-3:00:** Share what AI suggested, what I rejected, and what I would validate next.