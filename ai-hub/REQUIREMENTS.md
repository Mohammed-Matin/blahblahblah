# Real-Time API Requirements

To make the AIHub.cs application fully real-time, the frontend expects the following REST API endpoints to be implemented on a backend server (e.g., at `http://localhost:8080/api/` or similar).

The frontend uses standard `fetch` calls to retrieve this data. If the endpoints are unreachable, it will fall back to static dummy data.

## 1. News Updates
**Endpoint:** `GET /api/news`
**Description:** Returns the latest AI news, updates, and research papers.
**Response Format:**
```json
[
  {
    "id": "unique-string-or-number",
    "title": "News Title",
    "summary": "Brief description of the news.",
    "date": "e.g., '2 hours ago' or ISO timestamp",
    "tags": ["Tag1", "Tag2"],
    "link": "https://example.com/news",
    "type": "e.g., 'Model Release', 'Research'"
  }
]
```

## 2. Models & APIs
**Endpoint:** `GET /api/models`
**Description:** Returns available free APIs and model providers.
**Response Format:**
```json
[
  {
    "id": "unique-id",
    "name": "Provider Name",
    "description": "Provider description",
    "tier": "e.g., 'Generous Free Tier'",
    "limits": "e.g., '500k tokens/day'",
    "models": ["Model 1", "Model 2"]
  }
]
```

## 3. Developer Frameworks
**Endpoint:** `GET /api/frameworks`
**Description:** Returns popular AI developer frameworks.
**Response Format:**
```json
[
  {
    "id": "unique-id",
    "name": "Framework Name",
    "desc": "Description of the framework",
    "language": "e.g., 'Python / JS'",
    "tags": ["Agents", "RAG"]
  }
]
```

## 4. Prompt Guide
**Endpoint:** `GET /api/prompts`
**Description:** Returns prompt engineering guides, techniques, and templates.
**Response Format:**
```json
[
  {
    "id": "unique-id",
    "title": "Technique Name (e.g., Chain of Thought)",
    "description": "Explanation of the technique",
    "example": "An example prompt demonstrating the technique",
    "category": "e.g., 'Reasoning', 'Coding'"
  }
]
```

## 5. Coding Tools
**Endpoint:** `GET /api/tools`
**Description:** Returns a list of AI-powered coding tools, IDEs, and extensions.
**Response Format:**
```json
[
  {
    "id": "unique-id",
    "name": "Tool Name (e.g., Cursor, GitHub Copilot)",
    "description": "What the tool does",
    "pricing": "e.g., 'Free Tier Available', '$10/mo'",
    "url": "https://tool-website.com",
    "tags": ["IDE", "Extension"]
  }
]
```
