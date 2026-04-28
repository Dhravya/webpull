---
title: "Create memories directly"
url: "https://supermemory.ai/docs/api-reference/content-management/create-memories-directly"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create memories directly

> Create memories directly, bypassing the document ingestion workflow. Generates embeddings and makes them immediately searchable.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v4/memories
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
  /v4/memories:
    post:
      tags:
        - Content Management
      summary: Create memories directly
      description: >-
        Create memories directly, bypassing the document ingestion workflow.
        Generates embeddings and makes them immediately searchable.
      operationId: postV4Memories
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                memories:
                  minItems: 1
                  maxItems: 100
                  type: array
                  items:
                    type: object
                    properties:
                      content:
                        type: string
                        minLength: 1
                        maxLength: 10000
                        description: >-
                          The memory text. Should be entity-centric, e.g. 'John
                          prefers dark mode'.
                        example: John prefers dark mode
                      isStatic:
                        description: >-
                          Mark as true for permanent traits (name, profession,
                          hometown). Defaults to false.
                        example: false
                        type: boolean
                      metadata:
                        description: Arbitrary key-value metadata to attach.
                        type: object
                        propertyNames:
                          type: string
                        additionalProperties:
                          anyOf:
                            - type: string
                            - type: number
                            - type: boolean
                            - type: array
                              items:
                                type: string
                      forgetAfter:
                        description: >-
                          ISO 8601 datetime string. The memory will be
                          auto-forgotten after this time. Pass null or omit for
                          no expiry.
                        format: datetime
                        example: '2026-06-01T00:00:00Z'
                        anyOf:
                          - type: string
                          - type: 'null'
                      forgetReason:
                        description: >-
                          Optional reason for the scheduled forgetting. Only
                          meaningful when forgetAfter is set.
                        example: temporary project deadline
                        anyOf:
                          - type: string
                          - type: 'null'
                      temporalContext:
                        description: >-
                          Structured temporal metadata. Merged into the metadata
                          JSON column.
                        type: object
                        properties:
                          documentDate:
                            description: Date the document was authored
                            format: datetime
                            anyOf:
                              - type: string
                              - type: 'null'
                          eventDate:
                            description: Dates of events referenced in the memory
                            anyOf:
                              - type: array
                                items:
                                  type: string
                              - type: 'null'
                    required:
                      - content
                  description: Array of memories to create
                containerTag:
                  type: string
                  maxLength: 100
                  pattern: ^[a-zA-Z0-9_:-]+$
                  description: The space / container tag these memories belong to.
                  example: user_123
              required:
                - memories
                - containerTag
      responses:
        '201':
          content:
            application/json:
              schema:
                type: object
                properties:
                  documentId:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: ID of the source document created
                  memories:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                        memory:
                          type: string
                        isStatic:
                          type: boolean
                        createdAt:
                          type: string
                        forgetAfter:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: ISO datetime when this memory expires
                        forgetReason:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: Reason for scheduled forgetting
                      required:
                        - id
                        - memory
                        - isStatic
                        - createdAt
                        - forgetAfter
                        - forgetReason
                required:
                  - documentId
                  - memories
                description: Response after creating memories
          description: Memories created successfully
        '400':
          content:
            application/json:
              schema:
                type: object
                properties:
                  details:
                    description: Additional error details
                    example: Query must be at least 1 character long
                    type: string
                  error:
                    type: string
                    description: Error message
                    example: Invalid request parameters
                required:
                  - error
          description: Invalid request
        '401':
          content:
            application/json:
              schema:
                type: object
                properties:
                  details:
                    description: Additional error details
                    example: Query must be at least 1 character long
                    type: string
                  error:
                    type: string
                    description: Error message
                    example: Invalid request parameters
                required:
                  - error
          description: Unauthorized
        '404':
          content:
            application/json:
              schema:
                type: object
                properties:
                  details:
                    description: Additional error details
                    example: Query must be at least 1 character long
                    type: string
                  error:
                    type: string
                    description: Error message
                    example: Invalid request parameters
                required:
                  - error
          description: Space not found for the given containerTag
        '500':
          content:
            application/json:
              schema:
                type: object
                properties:
                  details:
                    description: Additional error details
                    example: Query must be at least 1 character long
                    type: string
                  error:
                    type: string
                    description: Error message
                    example: Invalid request parameters
                required:
                  - error
          description: Server error
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````