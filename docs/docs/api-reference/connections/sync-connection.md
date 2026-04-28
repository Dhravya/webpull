---
title: "Sync connection"
url: "https://supermemory.ai/docs/api-reference/connections/sync-connection"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync connection

> Initiate a manual sync of connections



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/connections/{provider}/import
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
  /v3/connections/{provider}/import:
    post:
      tags:
        - Connections
      summary: Sync connection
      description: Initiate a manual sync of connections
      operationId: postV3ConnectionsByProviderImport
      parameters:
        - in: path
          name: provider
          schema:
            type: string
            enum:
              - notion
              - google-drive
              - onedrive
              - gmail
              - github
              - web-crawler
              - s3
          required: true
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                containerTags:
                  type: array
                  items:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                  description: >-
                    Optional comma-separated list of container tags to filter
                    connections by
                  example:
                    - user_123
                    - project_123
      responses:
        '202':
          content:
            text/plain:
              schema:
                type: string
          description: Importing connections...
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