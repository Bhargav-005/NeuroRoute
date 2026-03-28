# 🧠 NeuroRoute (RouteAI)

**The Enterprise Intelligent AI Routing & Optimization Layer.**

NeuroRoute is a premium, zero-setup AI routing platform that automatically selects the optimal global cluster for every request. By dynamically analyzing prompt complexity, privacy requirements, and provider health, NeuroRoute ensures your AI infrastructure is fast, cost-effective, and always available.

---

## ✨ Core Value Proposition

*   **Zero-Setup Architecture**: No API keys or manual provider configurations required. NeuroRoute is a managed, plug-and-play intelligent layer.
*   **Autonomous Optimization**: Real-time balancing between **Cost**, **Latency**, and **Quality**.
*   **Intelligent Failover**: Zero-downtime operations through automated provider rerouting.
*   **Privacy-First Design**: Selective routing of sensitive data (PII) to secure/local clusters.
*   **Reward Economy**: Earn **Efficiency Credits** for every optimized request, turning AI usage into a value-generating asset.

---

## 🎨 Design System: "Calm Intelligence"

The platform utilizes a sophisticated, organic AI aesthetic designed for high-performance enterprise users.

*   **Primary Palette**: `#41431B` (Deep Moss), `#AEB784` (Soft Sage), `#E3DBBB` (Sandstone), `#F8F3E1` (Parchment).
*   **Aesthetic**: Transparent, minimal, and premium. Focus on smooth micro-animations (Framer Motion) and clear, high-fidelity metrics.

---

## 🗺️ Platform Architecture & Pages

### 1. 🚀 Landing Page
The digital front-door of NeuroRoute, clearly communicating the transition from static provider usage to an intelligent routing mesh.
- **Hero Section**: Strong product pitch with "Start Routing" (Signup) and "Login" CTAs.
- **Value Props**: Focused on Cost, Speed, and Intelligence.

### 2. 🔐 Authentication & Onboarding
- **Secure Access**: Dedicated Login and Signup flows with persistent session management.
- **Strategy Onboarding**: A 2-step process where users choose their initial optimization preference:
  - **💰 Cost Optimized**: Prioritize the most economical models (e.g., Llama 3, Gemini Flash).
  - **⚖️ Balanced**: The recommended engine default for production tasks.
  - **⚡ Performance First**: Prioritize the lowest latency and highest reasoning (e.g., GPT-4o, Claude 3.5 Sonnet).

### 3. 📊 Control Center (Dashboard)
A real-time command center providing a 360-degree view of your AI operations.
- **KPI Metrics**: Real-time tracking of *Optimal Routing (%)*, *Active Models*, *Total Savings ($)*, and *Average Network Latency*.
- **`LiveRequestStream`**: A dynamic feed showing the system's active decisions. Features complexity-based model selection and real-time efficiency badging.
- **`ProviderHealthPanel`**: Live monitoring of the Global Provider Mesh (OpenAI, Anthropic, Google, etc.) with pulsing health indicators and latency trackers.
- **`PrivacyShieldPanel`**: Visualizes autonomous PII protection. Automatically flags sensitive tokens (Emails, Phone, IDs) and reroutes them to **Local Secure Routes**.
- **`CreditWalletPanel`**: The heart of the reward system. Shows *Total Credits Earned* and *Cumulative Savings*, with a recent reward history.
- **Failover Simulator**: A demo-ready button to "Simulate Provider Failure," showing how the system instantly reroutes traffic with zero data loss.

### 4. 🌐 Real-time Router Visualizer (`/router`)
Deep-dive into the "Brain" of NeuroRoute.
- **`RoutingPipeline`**: A high-fidelity visual flow showing the 5-step analysis: *Prompt → Classifier → Privacy Scan → Scorer → Selection*.
- **`RoutingDecisionPanel`**: Explains the "Winner" of every routing event with reasoning text and a weighted **Scoring Matrix**.
- **Global Provider Matrix**: A sidebar comparison showing how various models (Claude, GPT, Llama) measured up for the specific task.

### 5. 📉 Efficiency Insights (`/analytics`)
Data-driven transparency into the impact of automated routing.
- **Savings vs Baseline**: Line charts comparing NeuroRoute performance against standard, un-optimized GPT-4o usage.
- **Latency Gains**: Visualizes the reduction in access times through strategic cluster pinning.
- **Self-Healing Index**: A historical view of system stability and routing accuracy improvements.

### 6. 🧪 Provider Playground (`/playground`)
Experimental sandbox to test complex prompts against the routing engine.
- **Context Area**: Large-scale input for high-token tasks with strategy toggles.
- **`RoutingExplanation`**: A post-response breakdown showing which model was used, the latency improvement achieved, and the specific reasoning for the decision.

---

## 🛠️ Technology Stack

*   **Frontend**: Next.js 16 (App Router), React 19.
*   **Styling**: Tailwind CSS (Native utilities), Lucide React (Icons).
*   **Animations**: Framer Motion (Real-time streams, transitions, pulses).
*   **State Management**: React Context (Syncing Simulation & Auth states).
*   **Infrastructure Layout**: Responsive, 3-column architecture (Desktop optimized).

---

## 🚀 Getting Started

1.  **Clone the Repo**: `git clone <repo-url>`
2.  **Install Dependencies**: `pnpm install`
3.  **Run Development Server**: `pnpm dev`
4.  **Access App**: Open `http://localhost:3000`

---

## 🧬 Future Roadmap

1.  **Actual Backend Orchestration**: Replacing simulations with real model-agnostic routing via a unified API.
2.  **Advanced Strategy Config**: Giving Enterprise users granular control over specific cluster regions.
3.  **Real PII Masking**: Integrating high-performance local tokens filtering.

---

**NeuroRoute: Zero Setup. Intelligent Routing. Premium AI Infrastructure.**