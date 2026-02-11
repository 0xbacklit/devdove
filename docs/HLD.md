# DevDove — High-Level Design

## 1. Purpose of This Document

This High-Level Design (HLD) describes the overall system architecture of DevDove, including:

- Major system components
- Technology stack choices
- Data flow between components
- Responsibilities of each subsystem

This document is intended to:

- Guide Low-Level Design (LLD)
- Enable AI-assisted implementation
- Serve as a shared mental model of the system

---

## 2. System Overview

DevDove is a read-only, developer-focused knowledge system that enables engineers to
explore and understand codebases, documentation, APIs, and change history using
natural language.

At a high level, the system consists of:

- A Web-based frontend for interaction and inspection
- A Backend API layer for orchestration
- An Ingestion system for building the knowledge base
- A Retrieval and Reasoning layer (RAG)
- Storage systems for documents, metadata, and vectors

---

## 3. Technology Stack (Chosen)

### 3.1 Frontend

- Framework: Next.js (React)
- Styling: Tailwind CSS
- State Management: React Query / TanStack Query
- API Communication: REST (JSON)
- Rendering: Server-side rendering + client components

Reasoning:

- Fast iteration
- Excellent developer experience
- SEO-friendly
- Easy streaming UI support

---

### 3.2 Backend API

- Language: Python
- Framework: FastAPI
- Async Runtime: Uvicorn
- Background Tasks: Celery + Redis

Reasoning:

- Strong ecosystem for AI and data processing
- Async support for ingestion and querying
- Easy OpenAPI documentation

---

### 3.3 AI / Reasoning Layer

- LLM Provider: Pluggable (OpenAI / Anthropic / Local)
- Embeddings: Sentence-transformer or provider embeddings
- Prompting: Template-driven, citation-enforced prompts

Reasoning:

- Model-agnostic design
- Future-proof against provider changes

---

### 3.4 Storage

- Relational DB: PostgreSQL
- Vector DB: Qdrant
- Cache: Redis
- Object Storage (optional): S3-compatible

Reasoning:

- PostgreSQL for metadata consistency
- Vector DB optimized for semantic search
- Redis for low-latency caching

---

## 4. High-Level Architecture

The system is divided into the following layers:

- Presentation Layer (Frontend)
- Application Layer (Backend API)
- Ingestion Layer
- Retrieval & Reasoning Layer
- Storage Layer

---

## 5. Component Breakdown

### 5.1 Frontend (Web App)

Responsibilities:

- User authentication
- Query input and streaming response display
- Confidence and citation display
- Source inspection UI
- API exploration views

Does NOT:

- Perform retrieval
- Perform reasoning
- Store knowledge

---

### 5.2 Backend API Layer

Responsibilities:

- Request validation
- Query orchestration
- Ingestion management
- Retrieval coordination
- Answer assembly
- Confidence calculation

Acts as:

- The central brain of DevDove

---

### 5.3 Ingestion Layer

Responsibilities:

- Fetch data from external sources
- Normalize content into internal format
- Clean and deduplicate content
- Perform domain-aware chunking
- Generate embeddings
- Index data into storage systems

Ingestion is:

- Idempotent
- Incremental
- Source-aware

---

### 5.4 Retrieval & Reasoning Layer

Responsibilities:

- Hybrid retrieval (keyword + semantic)
- Metadata-based filtering
- Re-ranking retrieved chunks
- Prompt construction with citations
- Answer generation
- Refusal when evidence is insufficient

This layer ensures:

- Accuracy
- Transparency
- Trustworthiness

---

### 5.5 Storage Layer

Components:

- PostgreSQL for metadata and relationships
- Vector DB for embeddings
- Redis for caching and task queues

Responsibilities:

- Durable storage
- Fast retrieval
- Consistency guarantees

---

## 6. Data Flow

### 6.1 Ingestion Flow

SOURCE  
→ CONNECTOR  
→ NORMALIZATION (text + metadata)  
→ CLEANING  
→ DOMAIN-AWARE CHUNKING  
→ EMBEDDING  
→ INDEXING

---

### 6.2 Query Flow

USER QUERY  
→ API  
→ QUERY PARSER  
→ HYBRID RETRIEVAL  
→ RE-RANKING  
→ PROMPT ASSEMBLY  
→ LLM GENERATION  
→ CONFIDENCE SCORING  
→ RESPONSE WITH SOURCES

---

## 7. Scalability & Reliability

- Horizontal scaling of API layer
- Async ingestion workers
- Cached frequent queries
- Stateless backend services
- Vector DB optimized for ANN search

---

## 8. Security Considerations

- Read-only access to all data
- Token-based authentication
- Encrypted credentials
- No execution permissions
- Source-level access isolation (future)

---

## 9. Observability

- Query tracing (internal)
- Latency metrics per stage
- Retrieval coverage metrics
- Failure and refusal logging

---

## 10. Out of Scope (For HLD)

- IDE plugins
- Voice agent mode (future)
- Runtime log ingestion
- Multi-tenant RBAC

---

End of High-Level Design — DevDove
