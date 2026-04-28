---
title: "Reset organization data"
url: "https://supermemory.ai/docs/api-reference/settings/reset-organization-data"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Reset organization data

> Reset organization content: removes documents, memories, spaces (except default project), connections, and org settings. Preserves the org, members, and billing.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/settings/reset
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
  /v3/settings/reset:
    post:
      tags:
        - Settings
      summary: Reset organization data
      description: >-
        Reset organization content: removes documents, memories, spaces (except
        default project), connections, and org settings. Preserves the org,
        members, and billing.
      operationId: postV3SettingsReset
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                confirmation:
                  type: string
                  minLength: 1
              required:
                - confirmation
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    const: true
                  deletedConnections:
                    type: number
                  deletedDocumentBatches:
                    type: number
                  deletedDocumentsApprox:
                    type: number
                  deletedMemoryRows:
                    type: number
                  deletedExtraSpaces:
                    type: number
                  clearedDefaultSpaceContext:
                    type: boolean
                  settingsReset:
                    type: boolean
                required:
                  - success
                  - deletedConnections
                  - deletedDocumentBatches
                  - deletedDocumentsApprox
                  - deletedMemoryRows
                  - deletedExtraSpaces
                  - clearedDefaultSpaceContext
                  - settingsReset
          description: Organization reset completed
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
          description: Bad request
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
        '403':
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
          description: Forbidden
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