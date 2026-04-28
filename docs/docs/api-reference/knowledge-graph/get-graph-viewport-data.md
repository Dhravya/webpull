---
title: "Get graph viewport data"
url: "https://supermemory.ai/docs/api-reference/knowledge-graph/get-graph-viewport-data"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get graph viewport data

> Fetch documents (with memories) and memory edges within a viewport



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/graph/viewport
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
  /v3/graph/viewport:
    post:
      tags:
        - Knowledge Graph
      summary: Get graph viewport data
      description: Fetch documents (with memories) and memory edges within a viewport
      operationId: postV3GraphViewport
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                viewport:
                  type: object
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
                containerTags:
                  maxItems: 100
                  type: array
                  items:
                    type: string
                documentIds:
                  maxItems: 50
                  type: array
                  items:
                    type: string
                limit:
                  type: number
                  minimum: 1
                  maximum: 500
              required:
                - viewport
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  documents:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                        title:
                          anyOf:
                            - type: string
                            - type: 'null'
                        summary:
                          anyOf:
                            - type: string
                            - type: 'null'
                        documentType:
                          type: string
                        createdAt:
                          type: string
                        updatedAt:
                          type: string
                        x:
                          type: number
                        'y':
                          type: number
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
                              spaceId:
                                type: string
                              isLatest:
                                type: boolean
                              isForgotten:
                                type: boolean
                              isInference:
                                type: boolean
                              forgetAfter:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              forgetReason:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              version:
                                type: number
                              parentMemoryId:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              rootMemoryId:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              sourceCount:
                                type: number
                              memoryRelations:
                                type: object
                                propertyNames:
                                  type: string
                                additionalProperties:
                                  type: string
                                  enum:
                                    - updates
                                    - extends
                                    - derives
                              changeType:
                                type: string
                                enum:
                                  - created
                                  - updated
                                  - extended
                                  - derived
                                  - forgotten
                              createdAt:
                                type: string
                              updatedAt:
                                type: string
                            required:
                              - id
                              - memory
                              - isStatic
                              - spaceId
                              - isLatest
                              - isForgotten
                              - isInference
                              - forgetAfter
                              - forgetReason
                              - version
                              - parentMemoryId
                              - rootMemoryId
                              - sourceCount
                              - memoryRelations
                              - changeType
                              - createdAt
                              - updatedAt
                      required:
                        - id
                        - title
                        - summary
                        - documentType
                        - createdAt
                        - updatedAt
                        - x
                        - 'y'
                        - memories
                  edges:
                    type: array
                    items:
                      type: object
                      properties:
                        source:
                          type: string
                        target:
                          type: string
                        similarity:
                          type: number
                          minimum: 0
                          maximum: 1
                      required:
                        - source
                        - target
                        - similarity
                  viewport:
                    type: object
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
                  totalCount:
                    type: number
                required:
                  - documents
                  - edges
                  - viewport
                  - totalCount
          description: Documents with memories and edges within the viewport
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
          description: Invalid request parameters
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