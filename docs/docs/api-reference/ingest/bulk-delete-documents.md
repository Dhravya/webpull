---
title: "Bulk delete documents"
url: "https://supermemory.ai/docs/api-reference/ingest/bulk-delete-documents"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Bulk delete documents

> Bulk delete documents by IDs or container tags



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi delete /v3/documents/bulk
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
  /v3/documents/bulk:
    delete:
      tags:
        - Ingest
      summary: Bulk delete documents
      description: Bulk delete documents by IDs or container tags
      operationId: deleteV3DocumentsBulk
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                ids:
                  description: Array of document IDs to delete (max 100 at once)
                  example:
                    - acxV5LHMEsG2hMSNb4umbn
                    - bxcV5LHMEsG2hMSNb4umbn
                  minItems: 1
                  maxItems: 100
                  type: array
                  items:
                    type: string
                containerTags:
                  description: >-
                    Array of container tags - all documents in these containers
                    will be deleted
                  example:
                    - user_123
                    - project_123
                  deprecated: true
                  hidden: true
                  minItems: 1
                  type: array
                  items:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                filepath:
                  description: >-
                    Delete documents matching this filepath. Exact match for
                    full paths, prefix match if ending with /
                  example: /docs/old/
                  hidden: true
                  type: string
              description: >-
                Request body for bulk deleting documents by IDs or container
                tags
              example:
                ids:
                  - acxV5LHMEsG2hMSNb4umbn
                  - bxcV5LHMEsG2hMSNb4umbn
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Whether the bulk deletion was successful
                    example: true
                  deletedCount:
                    type: number
                    description: Number of documents successfully deleted
                    example: 2
                  errors:
                    description: >-
                      Array of errors for documents that couldn't be deleted
                      (only applicable when deleting by IDs)
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                        error:
                          type: string
                      required:
                        - id
                        - error
                  containerTags:
                    description: >-
                      Container tags that were processed (only applicable when
                      deleting by container tags)
                    example:
                      - user_123
                      - project_123
                    deprecated: true
                    hidden: true
                    type: array
                    items:
                      type: string
                required:
                  - success
                  - deletedCount
                description: Response for bulk document deletion
          description: Bulk deletion completed successfully
        '400':
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
          description: Bad request - either 'ids' or 'containerTags' must be provided
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