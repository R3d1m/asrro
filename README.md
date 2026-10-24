# asrro

Official web portal and research showcase of the **Andromeda Space & Robotics Research Organization (ASRRO)** at Chittagong University of Engineering & Technology (CUET).

> **World Champion — NASA Global Space Challenge 2025 (Score: 499.8 / 500)**  
> Creators of **STARLAP** (CUET's first student-built sounding rocket) and pioneers of indigenous aerospace, autonomous robotics, and deep-space observation systems in Bangladesh.

---

## 🚀 Key Features & Highlights

- **Sounding Rocketry (STARLAP Genesis-I)**: Custom-built solid propellant sounding rocket, avionics telemetry bay, and dual-deployment recovery systems.
- **Autonomous Fleet**:
  - **Project ASRROSCOPE**: High-contrast astrometric observatory with deep-sky tracking.
  - **CUAS-UAV**: Anti-drone radar/RF surveillance platform with real-time countermeasure tracking.
  - **Canal Drone**: Multi-spectral geospatial photogrammetry and water-body inspection drone.
  - **CUET Transit Bus Tracker**: Real-time campus transit telemetry network.
- **Executive Committee 2026–2027**: Interactive spotlight carousel featuring student researchers and division leads.
- **Distinguished Alumni Network**: Dedicated directory showcasing 19 alumni advancing science and engineering across leading global labs (UIUC, UT Austin, UTS, Texas A&M, Hawaii, London) and industries.
- **Press & Accolades**: National and international media coverage and championship awards.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **CI/CD**: GitHub Actions

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/R3d1m/asrro.git
cd asrro

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
asrro/
├── .github/workflows/    # CI build & verification workflows
├── public/
│   ├── images/           # High-resolution project, committee, alumni, and press imagery
│   └── videos/           # Interactive Andromeda galaxy background videos
├── src/
│   ├── app/
│   │   ├── alumni/       # Distinguished Alumni directory route
│   │   ├── projects/     # Deep-dive project pages ([slug])
│   │   ├── layout.tsx    # Root layout with typography and metadata
│   │   └── page.tsx      # Main portal landing page
│   ├── components/       # Modular UI components (Hero, Fleet, Committee, Navbar, Footer)
│   └── data/             # Typed datasets (projects, committee, alumni)
└── next.config.ts        # Next.js build configuration
```

---

## 📄 License

All rights reserved © Andromeda Space & Robotics Research Organization (ASRRO), CUET.
