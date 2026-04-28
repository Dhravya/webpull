---
title: "Merge container tags"
url: "https://supermemory.ai/docs/api-reference/container-tags/merge-container-tags"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Merge container tags

> Merge multiple container tags into a target tag. All documents from the source tags will be updated to reference the target tag, and the source tags will be deleted after successful merge.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/container-tags/merge
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
  /v3/container-tags/merge:
    post:
      tags:
        - Container Tags
      summary: Merge container tags
      description: >-
        Merge multiple container tags into a target tag. All documents from the
        source tags will be updated to reference the target tag, and the source
        tags will be deleted after successful merge.
      operationId: postV3ContainerTagsMerge
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - containerTags
                - targetContainerTag
              properties:
                containerTags:
                  type: array
                  items:
                    type: string
                  description: >-
                    List of container tags to merge (min: 2, max: 2). All
                    documents from these tags will be merged into the target.
                targetContainerTag:
                  type: string
              additionalProperties: false
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                required:
                  - success
                  - mergedCount
                  - targetTag
                  - deletedTags
                properties:
                  success:
                    type: boolean
                    description: Whether the merge operation completed successfully.
                  mergedCount:
                    type: number
                    description: Number of documents that were merged.
                  targetTag:
                    type: string
                    description: The target container tag that documents were merged into.
                  deletedTags:
                    type: array
                    items:
                      type: string
                    description: >-
                      List of container tags that were deleted after successful
                      merge.
                additionalProperties: false
          description: Merge completed successfully
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
          description: Bad request (e.g., invalid parameters)
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
          description: >-
            Forbidden - Only organization admins and owners can merge container
            tags
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
          description: One or more container tags not found
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