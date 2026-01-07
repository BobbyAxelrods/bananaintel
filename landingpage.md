# **LANDING PAGE & FUNNEL DESIGN**

## **Design Philosophy: "The Terminal"**
**Style**: Brutalist / Minimalist / Notion-esque.
**Focus**: Speed, Clarity, Data. Less "marketing fluff", more "developer utility".
**Colors**: Black, White, Grayscale, with **Electric Orange (#FF4500)** for accents/CTAs.

---

## **PAGE 1: THE GATE (Landing)**

**Layout**: Split Screen (Desktop) / Stacked (Mobile).

### **Left Column (The Hook)**
*   **Top**: Small Monospace Tag: `> EST. 2025 // BANANA INTEL`
*   **Headline**: (Large, Bold, Serif or Heavy Sans)
    > **Don't Build in the Dark.**
*   **Sub-headline**:
    > The Asian market is hungry for tools. I spend 40 hours a week finding exactly what they need so you can just build.
*   **Social Proof**:
    > "Used by 1,000+ builders from Reddit, IndieHackers, and Twitter."

### **Right Column (The Input)**
*   **Container**: A clean "Terminal" or "Card" look.
*   **Header**: `SELECT_RESOURCES.exe`
*   **The Form**:
    1.  **Label**: "What do you need right now?" (Checkboxes, Pre-checked)
        *   `[x]` **The Open Source Scout List** (100+ Repos)
        *   `[x]` **The AI Implementation Guide** (RAG/Agents)
        *   `[x]` **Weekly Market Gaps Report** (Asian Focus)
    2.  **Input**:
        *   `Email Address_` (Blinking cursor effect)
    3.  **CTA Button**:
        *   **[ SEND TO MY INBOX ]** (Full width, Orange background, Black text, Hard edges)
    4.  **Micro-copy**:
        *   "We'll fire this to your inbox via webhook immediately."

---

## **PAGE 2: THE OFFER (Post-Submit Overlay)**

**Behavior**:
Once the user clicks "Send", the Right Column (or the whole page) transitions to **The Offer**.

### **Header**
> **"It's on the way. While you wait..."**

### **The VSL (Video)**
*   **Format**: 16:9 Video Player.
*   **Thumbnail**: "How I found a $5k/mo opportunity in Malaysia using this database."
*   **Caption**: Watch how the Banana Intel Database works (2 mins).

### **The "No-Brainer" Deal**
*   **Headline**: **Get The Full Database.**
*   **Copy**:
    > You subscribed to the weekly report. But the **Database** has 500+ validated ideas, search volume data, and revenue estimates available *right now*.
*   **Pricing Box**:
    *   **Lifetime Access**: **RM 300** (One-time)
    *   *Monthly: RM 20/mo*
*   **Primary CTA**:
    *   **[ UNLOCK LIFETIME ACCESS ]** (Pulsing Effect)
*   **Secondary Action (The Skip)**:
    *   Link (Small, Underlined): *"No thanks, I'll stick to the free weekly emails. Take me to the Hub."*

---

## **PAGE 3: THE HUB (Destination)**

**Layout**: Grid / Dashboard style.

### **Nav**
*   Logo: `Banana Intel [HUB]`
*   Right: `Upgrade to Premium` (Button)

### **Content Area**
*   **Section 1: Latest Intel** (The Free Content)
    *   Card: "Week 42: Healthcare AI in Indonesia"
    *   Card: "Week 41: FinTech Wrappers for SG"
*   **Section 2: Tools Directory**
    *   Searchable table of tools.
*   **Section 3: Premium Locked** (Blurred Cards)
    *   "The NicheScout Database" (Locked 🔒)
    *   "The RepoScout Database" (Locked 🔒)

---

## **COMPONENT BREAKDOWN**

### **1. `GateForm.jsx`**
*   Handles state: `email`, `selected_resources`.
*   Submits to API.
*   Triggers transition to Offer.

### **2. `OfferModal.jsx`**
*   Auto-plays VSL (muted).
*   Displays Pricing.
*   Handles `Skip` navigation.

### **3. `HubLayout.jsx`**
*   Displays content after skipping.

---

## **ASSETS NEEDED**
1.  **VSL Video**: Placeholder for now.
2.  **Database Screenshots**: For the Offer section.
3.  **Font**: `Space Mono` (for code/accents) + `Inter` (for body) or `Playfair Display` (for headlines - elegant/brutalist mix).
