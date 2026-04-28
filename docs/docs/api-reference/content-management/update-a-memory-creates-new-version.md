---
title: "Update a memory (creates new version)"
url: "https://supermemory.ai/docs/api-reference/content-management/update-a-memory-creates-new-version"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update a memory (creates new version)

> Update a memory by creating a new version. The original memory is preserved with isLatest=false.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi patch /v4/memories
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
    patch:
      tags:
        - Content Management
      summary: Update a memory (creates new version)
      description: >-
        Update a memory by creating a new version. The original memory is
        preserved with isLatest=false.
      operationId: patchV4Memories
      requestBody:
        required: true
        content:
          application/json:
            schema:
              allOf:
                - type: object
                  properties:
                    id:
                      description: ID of the memory entry to operate on
                      example: mem_abc123
                      type: string
                    content:
                      description: >-
                        Exact content match of the memory entry to operate on.
                        Use this when you don't have the ID.
                      example: John prefers dark mode
                      type: string
                    containerTag:
                      type: string
                      maxLength: 100
                      pattern: ^[a-zA-Z0-9_:-]+$
                      description: >-
                        Container tag / space identifier. Required to scope the
                        operation.
                      example: user_123
                  required:
                    - containerTag
                - type: object
                  properties:
                    newContent:
                      type: string
                      minLength: 1
                      description: The new content that will replace the existing memory
                      example: John now prefers light mode
                    metadata:
                      description: >-
                        Optional metadata. If not provided, inherits from the
                        previous version.
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
                        auto-forgotten after this time. Pass null to clear an
                        existing expiry. Omit to inherit from the previous
                        version.
                      format: datetime
                      example: '2026-06-01T00:00:00Z'
                      anyOf:
                        - type: string
                        - type: 'null'
                    forgetReason:
                      description: >-
                        Optional reason for the scheduled forgetting. Cleared
                        automatically when forgetAfter is set to null.
                      example: temporary project deadline
                      anyOf:
                        - type: string
                        - type: 'null'
                    temporalContext:
                      description: >-
                        Structured temporal metadata. Merged into the metadata
                        JSON column. If omitted, existing temporalContext is
                        preserved.
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
                    - newContent
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    description: ID of the newly created memory version
                    example: mem_xyz789
                  memory:
                    type: string
                    description: The content of the new memory version
                    example: John now prefers light mode
                  version:
                    type: number
                    description: Version number of this memory entry
                    example: 2
                  parentMemoryId:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: ID of the memory this version updates
                    example: mem_abc123
                  rootMemoryId:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: ID of the first memory in this version chain
                    example: mem_abc123
                  createdAt:
                    type: string
                    description: When this memory version was created
                    format: datetime
                  forgetAfter:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: >-
                      When this memory will be auto-forgotten, or null if no
                      expiry
                    format: datetime
                  forgetReason:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: Reason for the scheduled forgetting, or null
                required:
                  - id
                  - memory
                  - version
                  - parentMemoryId
                  - rootMemoryId
                  - createdAt
                  - forgetAfter
                  - forgetReason
                description: Response after updating a memory
          description: Memory updated successfully
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
          description: Invalid request - missing required fields
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
          description: Memory not found
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