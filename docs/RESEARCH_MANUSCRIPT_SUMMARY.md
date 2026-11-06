# RESEARCH MANUSCRIPT SUMMARY

## Title
**TUGON: An Intelligent Municipal Emergency Response, Real-Time Dispatch, and Spatial Decision-Support Framework for the Municipality of Liliw, Laguna**

**Degree:** Bachelor of Science in Computer Science (Major in Intelligent Systems)  
**Institution:** College of Computer Studies, Laguna State Polytechnic University, Santa Cruz Main Campus  
**Authors:**
- Geoff P. Sandoval (Researcher - Systems Architecture & Core Engineering)
- Mazel Catherine P. Joya (Researcher - Full-Stack & Documentation)
- Justine V. Grindulo (Researcher - Chapters 1-5 Research Documentation & Frontend)

**Thesis Adviser:**
- Edward S. Flores, MSIT (Thesis adviser, College of Computer Studies)

---

## 1. Abstract
Municipal emergency response in provincial local government units is frequently hindered by fragmented communication channels, manual dispatch latency, and absence of real-time responder telemetry. This study presents **TUGON**, a distributed emergency response and decision-support framework engineered for the Mayor's Action Team (MAT) and MDRRMO of Liliw, Laguna. The architecture encompasses a native Flutter cross-platform mobile application, a Next.js 15 administrative command portal, a high-concurrency FastAPI telemetry backend, and a cognitive AI triage microservice leveraging Tagalog natural language heuristics and Google Gemini 3.1 Flash-Lite.

Evaluation using the ISO/IEC 25010 software quality model across 12 IT and systems engineering experts demonstrated an overall quality rating of **4.62 / 5.00 (Excellent)**. User Acceptance Testing with 10 MAT dispatchers yielded a mean of **4.54 / 5.00 (Strongly Agree)**. Field deployment benchmarks revealed an average emergency response latency reduction from **18.4 minutes to 4.2 minutes (77.1% improvement)**, with an AI emergency triage concordance rate of **93.8%**.

---

## 2. Research Questions & Objectives
1. **Latency Analysis**: What operational bottlenecks impede traditional municipal emergency response in Liliw?
2. **Authenticated Ingestion**: How can authenticated mobile reporting attach automatic GPS metadata and eliminate prank calls?
3. **Cognitive Triage**: How accurately can Tagalog NLP extract emergency features and prioritize severity?
4. **Telemetry & Navigation**: How effectively can WebSocket pipelines synchronize real-time vehicle positions and calculate ETAs?
5. **Quality Evaluation**: How does the system perform under ISO/IEC 25010 software quality metrics?
6. **Governance Reports**: How can spatial telemetry automatically generate municipal accomplishment reports for disaster risk reduction?

---

## 3. Results Summary Table

| Metric / Dimension | Evaluation Standard | Sample Size | Result / Score |
| :--- | :--- | :--- | :--- |
| **Functional Suitability** | ISO/IEC 25010 Standard | 12 IT Experts | **4.68 / 5.00** |
| **Performance Efficiency** | WebSocket & REST Latency | 12 IT Experts | **4.60 / 5.00** |
| **Usability & UX** | System Usability Scale (SUS) | 12 IT Experts | **4.65 / 5.00** |
| **Security & Privacy** | DPA 2012 & JWT RBAC | 12 IT Experts | **4.70 / 5.00** |
| **Dispatcher Acceptance** | User Acceptance Testing (UAT) | 10 MAT Officers | **4.54 / 5.00** |
| **Citizen Perception** | Usability Survey | 35 Residents | **4.48 / 5.00** |
| **Response Latency** | Call-to-Dispatch Benchmark | 120 Dispatches | **4.2 mins (77.1% faster)** |
| **AI Triage Concordance** | Category & Urgency Concordance | 500 Test Records | **93.8% Agreement** |

