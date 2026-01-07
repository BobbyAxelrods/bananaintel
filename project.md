# **PROJECT.MD - Banana Intel Platform (Rev. 2)**

## **Project Overview**

A "Funnel-First" platform for Asian builders. The primary goal is to capture leads via high-value resources (Open Source/AI tools) and immediately upsell a low-ticket, high-value database (RM 300 Lifetime) before giving access to the free content hub.

---

## **Core User Flow (The Funnel)**

1.  **Landing Page (The Gate)**
    *   **Goal**: Get the email.
    *   **Value**: "I mine the data, you get the tools."
    *   **Action**: User enters email + selects desired resources (Open Source List / AI Tools List).
    *   **System**: Triggers n8n webhook -> emails resources immediately.

2.  **The Offer (The Bridge)**
    *   **Trigger**: Appears immediately after submission.
    *   **Content**: VSL (Video Sales Letter) + Database Demo.
    *   **The Deal**: "Get the complete Scout Database for RM 300 (Lifetime) or RM 20/mo."
    *   **Action**: "Upgrade Now" OR "Skip to Newsletter Hub".

3.  **Newsletter Hub (The Product)**
    *   **Access**: Free for everyone (after skipping or buying).
    *   **Content**: Weekly reports, tool lists, and guides.

---

## **Phase 1 Features**

### **1. Landing Page (The Gate)**
**Route**: `/`

*   **Design**: Minimalist, distraction-free. Text-heavy (Direct Response style) or Clean Modern.
*   **Elements**:
    *   **Headline**: "Stop Researching. Start Building."
    *   **Sub-headline**: "I spend 40 hours/week mining Asian market gaps. Select what you want me to send you:"
    *   **Selection Form**:
        *   [ ] The Open Source Tools List
        *   [ ] The AI Implementation Guide
        *   [ ] The Weekly Scout Brief
    *   **Input**: Email Address.
    *   **CTA**: "Send It To Me" (Triggers Webhook).

### **2. The Offer Page (Post-Submit)**
**Route**: `/offer` (or dynamic state on `/`)

*   **Headline**: "Check Your Inbox (It's on the way)... But Read This First."
*   **VSL Video**: "How I use this database to find $5k/mo opportunities in Asia."
*   **Product Showcase**: Quick screenshots/gif of the Database (HustleScout/RepoScout).
*   **Pricing**: 
    *   **RM 300 Lifetime** (One-time payment).
    *   **RM 20/Month**.
*   **Actions**:
    *   Primary: "Get Lifetime Access" (Stripe/Whop Link).
    *   Secondary: "No thanks, take me to the free hub" (Link to `/hub`).

### **3. Newsletter Hub**
**Route**: `/hub` (formerly `/newsletters`)

*   **Layout**: Grid of content.
*   **Content**:
    *   Past Issues.
    *   Tool Directory.
    *   University (Locked/Teaser).

---

## **Technical Implementation Updates**

### **Frontend Logic (React)**
*   **State Management**: `step` state ('gate' -> 'offer').
*   **Form Submission**:
    1.  `POST /api/subscribe`
    2.  On Success: `setStep('offer')`
    3.  User is **not** redirected to hub yet.
*   **Offer Logic**:
    *   "Skip" button -> `navigate('/hub')`.

### **Backend (FastAPI)**
*   **Endpoints**:
    *   `POST /api/subscribe`: (Unchanged) Saves to DB, triggers n8n.

---

## **Success Metrics**
1.  **Opt-in Rate**: Landing Page Views -> Email Submissions.
2.  **Upsell Rate**: Submissions -> Click "Get Lifetime Access".
3.  **Hub Engagement**: Time spent on `/hub`.
