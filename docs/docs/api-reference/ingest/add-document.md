---
title: "Add document"
url: "https://supermemory.ai/docs/api-reference/ingest/add-document"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add document

> Add a document with any content type (text, url, file, etc.) and metadata



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/documents
openapi: 3.1.0
info:
  title: supermemory API
  description: The Memory API for the AI era
  version: 3.0.0
servers:
  - description: Production Server
    url: https://api.supermemory.ai
security:
  - bearerAuth: []
tags:
  - name: Ingest
    description: Ingest documents, files, URLs, conversations, and other content
  - name: Recall (Search)
    description: >-
      Semantic recall across your content — supports memories, hybrid, and
      documents modes
  - name: Profiles
    description: >-
      Entity profiles for users, participants, or any entity — includes profile
      search
  - name: Content Management
    description: List, get, update, and delete content and memories
  - name: Spaces
    description: Organize content into spaces (container tags)
  - name: Knowledge Graph
    description: Knowledge graph and entity relationships
  - name: Connections
    description: External service integrations
  - name: Settings
    description: Organization settings
  - name: Analytics
    description: Usage analytics and insights
  - name: Documents
    description: List, get, and search documents
paths:
  /v3/documents:
    post:
      tags:
        - Ingest
      summary: Add document
      description: >-
        Add a document with any content type (text, url, file, etc.) and
        metadata
      operationId: postV3Documents
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - content
              properties:
                content:
                  type: string
                  description: >-
                    The content to extract and process into a document. This can
                    be a URL to a website, a PDF, an image, or a video.
                containerTag:
                  type: string
                  description: >-
                    Optional tag this document should be containerized by. Max
                    100 characters, alphanumeric with hyphens, underscores, and
                    dots only.
                containerTags:
                  type: array
                  items:
                    type: string
                  deprecated: true
                  hidden: true
                entityContext:
                  type: string
                  description: >-
                    Optional entity context for this container tag. Max 1500
                    characters. Used during document processing to guide memory
                    extraction.
                  title: maxLength(1500)
                  maxLength: 1500
                customId:
                  type: string
                  description: >-
                    Optional custom ID of the document. Max 100 characters,
                    alphanumeric with hyphens, underscores, and dots only.
                metadata:
                  type: object
                  required: []
                  properties: {}
                  additionalProperties:
                    anyOf:
                      - type: string
                      - type: number
                      - type: boolean
                      - type: array
                        items:
                          type: string
                  description: Optional metadata for the document.
                taskType:
                  type: string
                  enum:
                    - memory
                    - superrag
                  description: >-
                    Task type: "memory" (default) for full context layer with
                    SuperRAG built in, "superrag" for managed RAG as a service.
                filepath:
                  type: string
                  description: >-
                    Optional file path for the document. Used by supermemoryfs
                    to store the full path of the file.
              additionalProperties: false
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                required:
                  - id
                  - status
                properties:
                  id:
                    type: string
                    description: Unique identifier of the document
                  status:
                    type: string
                    description: Status of the document
                additionalProperties: false
          description: Document added successfully
        '401':
          content:
            application/json:
              schema:
                type: object
                required:
                  - error
                properties:
                  error:
                    type: string
                    description: Error message
                  details:
                    type: string
                    description: Additional error details
                additionalProperties: false
          description: Unauthorized
        '500':
          content:
            application/json:
              schema:
                type: object
                required:
                  - error
                properties:
                  error:
                    type: string
                    description: Error message
                  details:
                    type: string
                    description: Additional error details
                additionalProperties: false
          description: Internal server error
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````