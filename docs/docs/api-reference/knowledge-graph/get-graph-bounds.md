---
title: "Get graph bounds"
url: "https://supermemory.ai/docs/api-reference/knowledge-graph/get-graph-bounds"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get graph bounds

> Get the bounding box of all documents with spatial coordinates



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/graph/bounds
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
  /v3/graph/bounds:
    get:
      tags:
        - Knowledge Graph
      summary: Get graph bounds
      description: Get the bounding box of all documents with spatial coordinates
      operationId: getV3GraphBounds
      parameters:
        - in: query
          name: containerTags
          schema:
            type: string
            maxLength: 10000
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  bounds:
                    anyOf:
                      - type: object
                        properties:
                          minX:
                            type: number
                            minimum: 0
                            maximum: 1000000
                          maxX:
                            type: number
                            minimum: 0
                            maximum: 1000000
                          minY:
                            type: number
                            minimum: 0
                            maximum: 1000000
                          maxY:
                            type: number
                            minimum: 0
                            maximum: 1000000
                        required:
                          - minX
                          - maxX
                          - minY
                          - maxY
                      - type: 'null'
                required:
                  - bounds
          description: Bounding box of all documents
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
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````