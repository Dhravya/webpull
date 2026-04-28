---
title: "Delete document by ID or customId"
url: "https://supermemory.ai/docs/api-reference/ingest/delete-document-by-id-or-customid"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete document by ID or customId

> Delete a document by ID or customId



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi delete /v3/documents/{id}
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
  /v3/documents/{id}:
    delete:
      tags:
        - Ingest
      summary: Delete document by ID or customId
      description: Delete a document by ID or customId
      operationId: deleteV3DocumentsById
      parameters:
        - in: path
          name: id
          schema:
            type: string
          required: true
      responses:
        '204':
          description: Document deleted successfully
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