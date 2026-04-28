---
title: "Get document chunks"
url: "https://supermemory.ai/docs/api-reference/documents/get-document-chunks"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get document chunks

> Get all chunks for a document, ordered by position



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/documents/{id}/chunks
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
  /v3/documents/{id}/chunks:
    get:
      tags:
        - Documents
      summary: Get document chunks
      description: Get all chunks for a document, ordered by position
      operationId: getV3DocumentsByIdChunks
      parameters:
        - in: path
          name: id
          schema:
            type: string
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  documentId:
                    type: string
                    description: The document ID
                  chunks:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                          description: Unique identifier of the chunk
                        position:
                          type: number
                          description: Sequential position within the document
                        content:
                          type: string
                          description: Chunk text content
                        type:
                          type: string
                          description: Chunk type (text or image)
                        metadata:
                          description: Optional metadata attached to the chunk
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties: {}
                            - type: 'null'
                        createdAt:
                          type: string
                          description: Creation timestamp
                          format: datetime
                      required:
                        - id
                        - position
                        - content
                        - type
                        - createdAt
                      description: A single chunk of a document
                    description: Ordered list of chunks
                  total:
                    type: number
                    description: Total number of chunks
                required:
                  - documentId
                  - chunks
                  - total
                description: Response for document chunks endpoint
          description: Document chunks retrieved successfully
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
        '404':
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
          description: Document not found
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