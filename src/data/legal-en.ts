// ============================================================
//  LEGAL AND COOKIE TEXTS (English)
//  The Spanish version is the legally binding one.
// ============================================================
import type { LegalContent } from "./legal-es";

export const legalEn: LegalContent = {
  links: {
    aviso: "Legal notice",
    privacidad: "Privacy",
    cookies: "Cookies",
    settings: "Cookie settings",
  },
  close: "Close",
  updated: "Last updated",
  form: {
    accept: "I have read and accept the",
    policy: "privacy policy",
    required: "To continue, please accept the privacy policy.",
    info: "Controller: {name}. Purpose: to answer your enquiry and send you a quote. We store your enquiry in our database (Google Firebase) only for that. You can exercise your rights by writing to {email}.",
  },
  banner: {
    title: "Your privacy matters 🍪",
    text: "We use our own necessary cookies to make the site work and, only if you allow it, analytics or advertising cookies.",
    accept: "Accept all",
    reject: "Reject",
    configure: "Settings",
  },
  settings: {
    title: "Cookie settings",
    intro:
      "Here you can see what this website stores in your browser and choose which optional cookies you allow. You can change this anytime from the footer.",
    technical: "Technical & security",
    technicalDesc: "Needed for the website to work. They can't be turned off and don't require your consent.",
    alwaysOn: "Always on",
    storage: {
      lang: "Remembers the language you chose.",
      antispam: "Anti-spam protection for the form (cleared after 10 minutes).",
      consent: "Stores your cookie choice.",
    },
    categories: {
      analytics: { title: "Analytics", desc: "Help us understand how many people visit the site and which sections they like." },
      marketing: { title: "Advertising", desc: "Let us measure campaigns and show you relevant ads on other websites." },
    },
    none: "This website currently uses no analytics or advertising cookies. ✅",
    save: "Save selection",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
  },
  pages: {
    aviso: {
      title: "Legal notice",
      sections: [
        {
          h: "1. Website owner",
          p: [
            "In accordance with article 10 of Spanish Law 34/2002 on Information Society Services and E-commerce (LSSI-CE), the owner of this website is:",
            "• Owner: {name}",
            "• Tax ID: {nif}",
            "• Address: {address}",
            "• Email: {email}",
            "• Website: {domain}",
          ],
        },
        {
          h: "2. Purpose",
          p: [
            "This website presents AC Marketing's services: NFC tags for reviews and table menus, creator collabs, social media management and web and app development. Browsing it makes you a user and implies acceptance of this legal notice.",
          ],
        },
        {
          h: "3. Intellectual property",
          p: [
            "The texts, designs, logos, images and code of this website belong to {name} or are used with permission. Reproduction, distribution or modification without express permission is prohibited. Third-party trademarks mentioned (Instagram, TikTok, WhatsApp, Google) belong to their respective owners.",
          ],
        },
        {
          h: "4. Liability",
          p: [
            "We work to keep the information accurate and up to date, but we can't guarantee it is error-free. Prices shown are indicative and are not a binding offer until a written quote is confirmed.",
            "This website links to third-party sites (Instagram, TikTok, WhatsApp). We are not responsible for their content or privacy policies.",
          ],
        },
        {
          h: "5. Governing law",
          p: [
            "This legal notice is governed by Spanish law. Any dispute will be submitted to the competent courts under current regulations, including consumer protection law where applicable.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacy policy",
      sections: [
        {
          h: "1. Data controller",
          p: ["• {name}", "• Tax ID: {nif}", "• Address: {address}", "• Email: {email}"],
        },
        {
          h: "2. What data we process",
          p: [
            "When you submit the form we store your enquiry (name, business, sector, services you're interested in, WhatsApp or email and message) in our Google Firebase database, which only our team can access. If you choose to send it via WhatsApp or email, the form only prepares the message and you decide whether to send it.",
            "If you contact us (by WhatsApp, email or social media) we will process the data you give us: name, business, sector, phone number or email and the content of your message.",
          ],
        },
        {
          h: "3. Why we use it",
          p: [
            "• To answer your enquiries and send you quotes.",
            "• To manage our business relationship if you hire our services (invoicing and legal obligations).",
            "We don't make automated decisions or build profiles with your data.",
          ],
        },
        {
          h: "4. Legal basis",
          p: [
            "• Pre-contractual steps at your request and, where applicable, performance of a contract (art. 6.1.b GDPR).",
            "• Your consent when contacting us (art. 6.1.a GDPR).",
            "• Compliance with legal obligations, such as tax law (art. 6.1.c GDPR).",
          ],
        },
        {
          h: "5. How long we keep it",
          p: [
            "As long as needed to handle your enquiry. If we don't end up working together, we delete it within 12 months at most. If you become a client, we keep it for the duration of the relationship and the legal retention periods (e.g. 6 years for accounting records).",
          ],
        },
        {
          h: "6. Who we share it with",
          p: [
            "We don't sell or share your data. We use providers that process it on our behalf: WhatsApp / Meta Platforms Ireland (messaging), Google Ireland (email and Firebase database) and the website hosting provider. Some may transfer data to the US under the EU-US Data Privacy Framework or standard contractual clauses approved by the European Commission.",
          ],
        },
        {
          h: "7. Your rights",
          p: [
            "You can request access, rectification, erasure, objection, restriction of processing and portability of your data, and withdraw your consent, by writing to {email}.",
            "If you believe we haven't handled your data properly, you can file a complaint with the Spanish Data Protection Agency (www.aepd.es).",
          ],
        },
        {
          h: "8. Security",
          p: [
            "The website is always served over HTTPS, loads no third-party content and applies security headers to protect your browsing.",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie policy",
      sections: [
        {
          h: "1. What cookies are",
          p: [
            "Small files or pieces of data a website stores in your browser to remember information such as your language or preferences.",
          ],
        },
        {
          h: "2. What this website uses",
          p: [
            "This website uses no analytics, advertising or third-party cookies. It only stores essential technical data in your browser (local storage), exempt from consent under article 22.2 of the Spanish LSSI:",
            "• ac-lang: remembers the language you chose. Kept until you delete it.",
            "• ac-contact-sends: anti-spam protection for the form. Expires after 10 minutes.",
            "• ac-cookie-consent: stores your cookie choice. Kept for 12 months.",
            "Fonts are hosted on our own server, so your IP is not sent to Google or other services when you visit.",
            "Only if you submit the form, Google's Firebase service (which we use to receive your enquiry) may store a technical item in your browser (firebase-heartbeat-database) for it to work.",
          ],
        },
        {
          h: "3. Links to other websites",
          p: [
            "If you follow the links to Instagram, TikTok or WhatsApp, those services may set their own cookies under their policies, which we recommend you read.",
          ],
        },
        {
          h: "4. How to manage them",
          p: [
            "You can change your choice at any time from \"Cookie settings\" in the footer. You can also delete this website's data from your browser settings (Chrome, Safari, Firefox or Edge).",
            "If we ever add analytics or advertising cookies, we'll ask you first with a notice, and you'll be able to accept or reject them just as easily.",
          ],
        },
      ],
    },
  },
};
