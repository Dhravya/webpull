---
title: "Toggle overage"
url: "https://supermemory.ai/docs/api-reference/settings/toggle-overage"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Toggle overage

> Toggle overage billing for the organization



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi patch /v3/settings/overage
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
  /v3/settings/overage:
    patch:
      tags:
        - Settings
      summary: Toggle overage
      description: Toggle overage billing for the organization
      operationId: patchV3SettingsOverage
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                enabled:
                  type: boolean
              required:
                - enabled
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  overageEnabled:
                    type: boolean
                required:
                  - overageEnabled
          description: Overage setting updated
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
          description: Bad request - not on a paid plan
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