# DevDove — Low-Level Design

## 1. Purpose of This Document

This Low-Level Design (LLD) defines the **detailed internal design** of DevDove, including:

- Data models and schemas
- API contracts
- Internal service responsibilities
- Ingestion connector interfaces
- Retrieval and reasoning workflows
- Error handling and refusal logic

This document is derived from the PRD and HLD and is intended to:

- Guide implementation
- Enable AI-assisted coding
- Serve as the technical source of truth

---

## 2. System Modules

DevDove is composed of the following internal modules:

- Authentication Module
- Ingestion Module
- Knowledge Store
- Retrieval Module
- Reasoning Module
- API Layer
- Frontend Interaction Layer

Each module is described in detail below.

---

## 3. Data Models

### 3.1 Core Entities

#### Workspace

Represents a logical container for all ingested knowledge.

Fields:

- id (UUID)
- name
- created_at
- updated_at

---

#### Source

Represents an external data source.

Fields:

- id (UUID)
- workspace_id
- type (repo, doc, web, api)
- config (JSON)
- status
- last_synced_at

---

#### Document

Represents a normalized unit of knowledge.

Fields:

- id (UUID)
- workspace_id
- source_id
- content (TEXT)
- metadata (JSON)
- created_at

---

#### Chunk

Represents a retrievable unit of text.

Fields:

- id (UUID)
- document_id
- content (TEXT)
- embedding_id
- metadata (JSON)

---

#### Embedding

Represents a vector embedding.

Fields:

- id (UUID)
- vector (FLOAT[])
- model
- created_at

---

#### Query

Represents a user query for observability.

Fields:

- id (UUID)
- workspace_id
- query_text
- created_at
- latency_ms
- confidence_score

---

## 4. Ingestion Module

### 4.1 Connector Interface

All ingestion connectors must implement the following interface:

- fetch()
- parse()
- normalize()
- emit_documents()

Each connector outputs normalized Document objects.

---

### 4.2 Supported Connectors (MVP)

- GitHubRepositoryConnector
- DocumentationFileConnector
- WebCrawlerConnector
- OpenAPISpecConnector

---

### 4.3 Ingestion Workflow

SOURCE  
→ CONNECTOR.fetch()  
→ CONNECTOR.parse()  
→ NORMALIZE (text + metadata)  
→ CLEAN  
→ DOMAIN-AWARE CHUNKING  
→ EMBEDDING GENERATION  
→ STORAGE (Document + Chunk + Embedding)

Ingestion is:

- Idempotent
- Incremental
- Source-aware

---

## 5. Chunking Strategy

Chunking varies by source type:

- Code: function / class level
- Docs: section / heading level
- Web: content block level
- API specs: endpoint level

Each chunk includes metadata such as:

- file_path
- symbol_name
- section_title
- commit_hash (if applicable)

---

## 6. Retrieval Module

### 6.1 Retrieval Strategy

DevDove uses **hybrid retrieval**:

- Keyword search (BM25)
- Semantic search (vector similarity)

Results are merged and re-ranked.

---

### 6.2 Re-ranking

Re-ranking factors:

- Semantic similarity
- Source type relevance
- Recency
- Metadata filters

---

### 6.3 Retrieval Output

The retrieval module outputs:

- Top-N chunks
- Source metadata
- Similarity scores

---

## 7. Reasoning Module

### 7.1 Prompt Assembly

The reasoning module constructs prompts with:

- User query
- Retrieved chunks
- Explicit citation instructions
- Refusal constraints

---

### 7.2 Answer Generation

Rules:

- Answers must be grounded in retrieved chunks
- Each factual claim must map to a source
- No hallucinated content allowed

---

### 7.3 Confidence Scoring

Confidence score is calculated using:

- Coverage of retrieved evidence
- Consistency across sources
- Retrieval similarity scores

---

### 7.4 Refusal Logic

The system must refuse when:

- Evidence coverage is below threshold
- Retrieved chunks are contradictory
- No relevant sources are found

Refusal response includes:

- Explanation
- Suggested next steps

---

## 8. API Layer

### 8.1 Query API

Endpoint:
POST /api/query

Request:

- workspace_id
- query_text

Response:

- answer
- sources
- confidence_score
- latency_ms

---

### 8.2 Ingestion API

Endpoints:

- POST /api/sources
- POST /api/sources/sync

Used to:

- Register sources
- Trigger ingestion

---

### 8.3 Source Inspection API

Endpoint:
GET /api/sources/{id}/documents

Returns:

- Documents
- Chunks
- Metadata

---

## 9. Frontend Interaction Flow

### 9.1 Query Flow

User submits query  
→ API /query  
→ Streaming response  
→ Display answer  
→ Display sources  
→ Display confidence

---

### 9.2 Source Inspection Flow

User clicks source  
→ Fetch chunk metadata  
→ Display file path, snippet, commit info

---

## 10. Error Handling

- Graceful degradation on partial failures
- Clear error messages for ingestion failures
- Explicit refusal responses for low confidence cases

---

## 11. Performance Considerations

- Async ingestion workers
- Cached frequent queries
- Batched embedding generation
- Pagination for large source sets

---

## 12. Security Considerations

- Read-only access
- Secure token storage
- No execution permissions
- Source access isolation (future)

---

## 13. Out of Scope (LLD)

- Voice agent mode
- IDE plugins
- Runtime log ingestion
- Multi-tenant RBAC

---

## 14. Next Steps

- Implement database schemas
- Implement connectors
- Implement retrieval pipeline
- Integrate LLM providers
- Build frontend UI
- Begin end-to-end testing

---

End of Low-Level Design — DevDove
