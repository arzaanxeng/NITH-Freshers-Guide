# Contributing to NITH Fresher's Guide

Thank you for helping keep the **NITH Fresher's Guide** accurate, high-quality, and up-to-date for future generations of NIT Hamirpur students!

---

## 🎯 Core Rule: Quality Over Quantity

> **1 excellent, verified resource > 10 mediocre or unverified resources.**

Before submitting a resource, verify that it meets the following strict criteria:

1. **Verified Real URL**: Every URL must be an active, clickable HTTP/HTTPS link. Never submit shortened URLs, fake links, or unverified video IDs.
2. **Authoritative Creator**: Prefer well-known educators and official documentation (e.g. CampusX, Striver, CodeWithHarry, TechWorld with Nana, Andreas Spiess, Ben Eater, MDN, PyTorch Docs, ESP-IDF Docs).
3. **Appropriate Level**: Accurately categorize difficulty as `beginner`, `intermediate`, or `advanced`.
4. **No Self-Promotion or Spam**: Submissions must provide genuine, non-commercial educational value to NITH freshers.

---

## 🛠️ How to Add or Edit Resources

1. **Fork the repository** on GitHub.
2. Navigate to `src/data/resources/` and locate the appropriate domain file (e.g. `webDevResources.ts`, `aiMlResources.ts`, `electronicsResources.ts`).
3. Add your resource entry adhering to the TypeScript `Resource` schema:

```typescript
{
  id: 'unique-resource-id',
  title: 'Resource Title',
  creator: 'Author or Channel Name',
  domain: 'target-domain-id',
  topic: 'Specific Topic Name',
  type: 'youtube' | 'playlist' | 'course' | 'blog' | 'documentation' | 'github' | 'practice',
  linkType: 'video' | 'playlist' | 'channel' | 'documentation' | 'repository' | 'course' | 'article' | 'practice',
  level: 'beginner' | 'intermediate' | 'advanced',
  description: 'Concise, practical explanation of why this resource is valuable.',
  url: 'https://verified-resource-url',
  fallbackUrl: 'https://verified-fallback-url', // Optional
  free: true,
  verified: true,
  lastVerified: 'Aug 2026',
  official: false, // Set to true for official documentation
  tags: ['Tag1', 'Tag2'],
  officialDocUrl: 'https://official-doc-url', // Optional
  isPrimary: false,
}
```

---

## 🧪 Testing & Verification Pipeline

Before opening a Pull Request, run the automated verification suite and build check:

```bash
# 1. Run automated link verification suite
npm run verify-links

# 2. Verify TypeScript build
npm run build
```

Every resource must pass `npm run verify-links` with HTTP 200 OK status.

---

## 📤 Submitting a Pull Request

1. Create a feature branch (`git checkout -b add-resource-name`).
2. Commit your changes (`git commit -m "Add verified resource for Web Dev"`).
3. Push to your fork (`git push origin add-resource-name`).
4. Open a Pull Request on GitHub with a clear summary of your changes.
