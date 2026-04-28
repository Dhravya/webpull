---
title: "Forget a memory"
url: "https://supermemory.ai/docs/api-reference/content-management/forget-a-memory"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Forget a memory

> Forget (soft delete) a memory entry. The memory is marked as forgotten but not permanently deleted.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi delete /v4/memories
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
    delete:
      tags:
        - Content Management
      summary: Forget a memory
      description: >-
        Forget (soft delete) a memory entry. The memory is marked as forgotten
        but not permanently deleted.
      operationId: deleteV4Memories
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
                    reason:
                      description: Optional reason for forgetting this memory
                      example: outdated information
                      type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                    description: ID of the memory that was forgotten
                    example: mem_abc123
                  forgotten:
                    type: boolean
                    description: Indicates the memory was successfully forgotten
                    example: true
                required:
                  - id
                  - forgotten
                description: Response after forgetting a memory
          description: Memory forgotten successfully
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
          description: Invalid request - missing id or content
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
        '409':
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
          description: Memory already forgotten
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