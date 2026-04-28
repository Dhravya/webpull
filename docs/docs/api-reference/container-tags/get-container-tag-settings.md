---
title: "Get container tag settings"
url: "https://supermemory.ai/docs/api-reference/container-tags/get-container-tag-settings"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get container tag settings

> Get settings for a container tag



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/container-tags/{containerTag}
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
  /v3/container-tags/{containerTag}:
    get:
      tags:
        - Container Tags
      summary: Get container tag settings
      description: Get settings for a container tag
      operationId: getV3ContainerTagsByContainerTag
      parameters:
        - schema:
            type: string
          in: path
          name: containerTag
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  containerTag:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                    description: The container tag identifier
                    example: sm_project_default
                  entityContext:
                    anyOf:
                      - type: string
                      - type: 'null'
                    description: >-
                      Custom context prompt for this container tag. Used to
                      provide additional context when processing documents in
                      this container.
                    example: >-
                      This project contains research papers about machine
                      learning.
                  memoryFilesystemPaths:
                    anyOf:
                      - type: array
                        items:
                          type: string
                      - type: 'null'
                    description: >-
                      Per-tag allowlist of filesystem paths that trigger memory
                      generation for mount-ingested documents. Docs whose
                      filepath does not match are ingested as 'superrag'
                      (chunked and searchable, no memory extraction).
                    example:
                      - /memory/
                      - /user.md
                    hidden: true
                  createdAt:
                    type: string
                    description: Creation timestamp
                    format: datetime
                  updatedAt:
                    type: string
                    description: Last update timestamp
                    format: datetime
                required:
                  - containerTag
                  - entityContext
                  - memoryFilesystemPaths
                  - createdAt
                  - updatedAt
                description: Container tag settings including entity context
          description: Container tag settings retrieved successfully
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
          description: Container tag not found
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
          description: Internal server error
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````