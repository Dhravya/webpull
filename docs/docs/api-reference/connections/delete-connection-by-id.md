---
title: "Delete connection by ID"
url: "https://supermemory.ai/docs/api-reference/connections/delete-connection-by-id"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete connection by ID

> Delete a specific connection by ID



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi delete /v3/connections/{connectionId}
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
    delete:
      tags:
        - Connections
      summary: Delete connection by ID
      description: Delete a specific connection by ID
      operationId: deleteV3ConnectionsByConnectionId
      parameters:
        - in: path
          name: connectionId
          schema:
            type: string
          required: true
        - in: query
          name: deleteDocuments
          schema:
            default: 'true'
            type: string
          description: >-
            Whether to also delete documents imported by this connection.
            Defaults to true.
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  provider:
                    type: string
                required:
                  - id
                  - provider
          description: Connection deleted successfully
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