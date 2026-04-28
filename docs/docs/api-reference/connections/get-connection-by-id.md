---
title: "Get connection (by id)"
url: "https://supermemory.ai/docs/api-reference/connections/get-connection-by-id"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get connection (by id)

> Get connection details with id



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/connections/{connectionId}
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
  /v3/connections/{connectionId}:
    get:
      tags:
        - Connections
      summary: Get connection (by id)
      description: Get connection details with id
      operationId: getV3ConnectionsByConnectionId
      parameters:
        - in: path
          name: connectionId
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
                  createdAt:
                    type: string
                    format: datetime
                  documentLimit:
                    type: number
                  email:
                    type: string
                  expiresAt:
                    type: string
                    format: datetime
                  id:
                    type: string
                  metadata:
                    type: object
                    propertyNames:
                      type: string
                    additionalProperties: {}
                  provider:
                    type: string
                  containerTags:
                    type: array
                    items:
                      type: string
                    deprecated: true
                    hidden: true
                required:
                  - createdAt
                  - id
                  - provider
          description: Connection details
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
          description: Connection not found
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