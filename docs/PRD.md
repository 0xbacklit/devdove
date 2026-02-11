# DevDove — Developer Knowledge System

## 1. Product Overview

### 1.1 Problem Statement

Modern engineering teams struggle to understand their own systems as they scale.  
Knowledge is fragmented across:

- Source code
- Documentation
- APIs
- Version control history
- Web-based docs

As systems evolve, teams lose clarity around:

- Where functionality lives
- Why decisions were made
- Who owns what
- How APIs are meant to be used

Existing tools optimize for **code generation** or **search**, but not for **system understanding**.

---

### 1.2 Product Vision

DevDove is a **developer-first, read-only AI knowledge system** that helps engineers explore, understand, and reason about their codebase and its surrounding knowledge using natural language — with **verifiable evidence and transparent sourcing**.

---

### 1.3 Target Users (MVP)

- Software Engineers
- Tech Leads
- Startup Engineering Teams (5–50 engineers)

---

### 1.4 Non-Goals (Explicit)

- Code generation or refactoring
- Executing production actions
- Replacing IDEs or observability platforms
- Predictive debugging guarantees
- Internet-scale search

DevDove is a **knowledge and reasoning layer**, not an execution engine.

---

## 2. Core User Jobs (JTBD)

1. Explore a codebase quickly
2. Understand how a feature works
3. Trace when and why changes were made
4. Learn APIs with real usage context
5. Cross-reference code with documentation
6. Trust answers through evidence

---

## 3. MVP Scope

### 3.1 Included in MVP

- Code repository ingestion
- Engineering documentation ingestion
- Web-based documentation ingestion (controlled crawling)
- API specification ingestion
- Natural-language exploration and Q&A
- Evidence-backed answers
- Source inspection and transparency UI

### 3.2 Excluded from MVP

- Runtime logs and metrics
- Slack / Email ingestion
- IDE plugins
- Write or execution actions
- Voice or real-time conversational agents
- Advanced RBAC / multi-org tenancy

---

## 4. Data Ingestion (MVP)

### 4.1 Source Categories

#### A. Code Repositories (Core)

**Supported**

- GitHub repositories (public and private via access token)

**Ingested Content**

- Source code files
- README files
- `/docs` directories
- Configuration files (`yaml`, `json`, `env.example`)
- Test files

**Metadata Captured**

- Repository name
- File path
- Programming language
- Commit hash
- Author
- Timestamp

---

#### B. Version Control History

**Ingested**

- Commit messages
- Pull request titles and descriptions
- Release notes and tags

**Notes**

- Full diffs are not embedded
- Diffs are summarized before indexing

---

#### C. Engineering Documentation

**Supported**

- Markdown documents
- Architecture Decision Records (ADRs)
- RFCs
- Design documents (Markdown, PDF)

---

#### D. Web-Based Knowledge (Controlled Crawling)

**Supported**

- Public or internal documentation websites
- Product documentation portals
- Wiki-style knowledge bases

**Ingestion Rules**

- User provides base URL(s)
- Domain allowlist enforced
- Maximum crawl depth configurable
- Only content pages ingested (navigation, ads, boilerplate removed)

**Examples**

- `docs.company.com`
- `support.company.com`
- `readme.io` documentation

---

#### E. API Specifications

**Supported**

- OpenAPI / Swagger (JSON, YAML)

**Extracted Knowledge**

- Endpoints
- Parameters
- Request and response examples
- Error responses

---

### 4.2 Unified Ingestion Pipeline

All sources follow a unified ingestion flow:

SOURCE  
→ CONNECTOR  
→ NORMALIZATION (text + metadata)  
→ CLEANING  
→ DOMAIN-AWARE CHUNKING  
→ EMBEDDING  
→ INDEXING

All ingested content is stored in a unified internal document format.

---

## 5. Core Product Features (MVP)

> DevDove internally uses Retrieval-Augmented Generation (RAG) to produce accurate,
> source-grounded answers.  
> RAG is an **internal system capability**, not a user-facing concept.

---

### 5.1 Explore Mode (Primary Experience)

**Description**  
Natural-language exploration of codebases, documentation, APIs, and web knowledge.

**User Examples**

- “Where is rate limiting implemented?”
- “Which service owns authentication?”
- “Show me code related to user balance”

**Expected Behavior**

- Retrieve relevant code, docs, and specs
- Produce concise, grounded answers
- Attach verifiable sources to each response

---

### 5.2 History Mode

**Description**  
Time-aware exploration of how the system evolved.

**User Examples**

- “When was feature X introduced?”
- “Who changed the retry logic?”
- “Why was Redis added?”

**Data Used**

- Commit history
- Pull request summaries
- Release notes

---

### 5.3 Review Mode

**Description**  
Explain and reason about existing code behavior.

**User Examples**

- “What does this function do?”
- “What are the edge cases here?”
- “Is this logic safe?”

**Constraints**

- Explanation and reasoning only
- No modification or execution suggestions

---

### 5.4 API Assist Mode

**Description**  
Understand APIs with real usage context.

**User Examples**

- “How do I call the billing API?”
- “Give me a curl example”
- “What errors can this endpoint throw?”

**Output Includes**

- Endpoint details
- Parameters
- Example requests
- Error cases
- Source references

---

### 5.5 Trust and Transparency

Every response must provide:

- Source files or documents used
- Commit references (when applicable)
- Confidence indicator
- Ability to inspect retrieved evidence

---

## 6. Backend Requirements

### 6.1 Responsibilities

- Source ingestion and synchronization
- Unified document normalization
- Hybrid retrieval (semantic + keyword)
- Answer generation with strict grounding
- Confidence scoring and refusal logic
- Query tracing and internal observability

---

### 6.2 Non-Functional Requirements

- Read-only system
- Deterministic outputs (low temperature)
- P95 query latency < 2 seconds
- Secure token-based access
- Scalable ingestion and indexing

---

## 7. Frontend Requirements (UX-Driven)

### 7.1 UX Principles

- Evidence over verbosity
- Transparency by default
- Developer-native language
- Minimal cognitive load

---

### 7.2 Core Screens (MVP)

#### A. Workspace Dashboard

- Connected repositories
- Documentation sources
- Web sources
- Ingestion status and last sync

---

#### B. Main Explore Interface

- Query input
- Answer panel
- Confidence indicator
- Inline citations

---

#### C. Source Inspector Panel

- File path or URL
- Text snippet
- Commit metadata
- Relevance indicator

---

#### D. API Explorer

- Endpoint list
- Parameter details
- Example calls
- Linked documentation

---

## 8. MVP Acceptance Criteria

The MVP is successful if:

- Engineers find answers faster than manual search
- All answers are traceable to real sources
- The system refuses when evidence is insufficient
- Users trust the system enough for daily reference

---

## 9. Future Enhancements (Out of Scope for MVP)

### 9.1 Voice / Conversational Agent Mode

- Voice-based interaction with DevDove
- Hands-free exploration of system knowledge
- Conversational follow-ups with memory
- Optional real-time speech-to-text and text-to-speech

### 9.2 Additional Enhancements

- Runtime logs and metrics ingestion
- CI/CD and test failure analysis
- Database schema ingestion
- IDE integrations
- Slack / Chat integrations
- Knowledge ownership mapping
- Advanced RBAC and multi-tenancy

---

End of PRD — DevDove
