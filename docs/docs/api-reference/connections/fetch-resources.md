---
title: "Fetch resources"
url: "https://supermemory.ai/docs/api-reference/connections/fetch-resources"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch resources

> Fetch resources for a connection (supported providers: GitHub for now)



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/connections/{connectionId}/resources
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
  /v3/connections/{connectionId}/resources:
    get:
      tags:
        - Connections
      summary: Fetch resources
      description: 'Fetch resources for a connection (supported providers: GitHub for now)'
      operationId: getV3ConnectionsByConnectionIdResources
      parameters:
        - in: path
          name: connectionId
          schema:
            type: string
          required: true
        - in: query
          name: page
          schema:
            default: 1
            type: number
        - in: query
          name: parent_id
          schema:
            type: string
        - in: query
          name: per_page
          schema:
            default: 30
            type: number
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  resources:
                    type: array
                    items:
                      type: object
                      propertyNames:
                        type: string
                      additionalProperties: {}
                  total_count:
                    type: number
                required:
                  - resources
          description: List of accessible resources
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
          description: Connection missing refresh token
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
        '501':
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
          description: Provider does not support resource fetching
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````