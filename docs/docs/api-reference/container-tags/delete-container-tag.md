---
title: "Delete container tag"
url: "https://supermemory.ai/docs/api-reference/container-tags/delete-container-tag"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete container tag

> Delete a container tag and all its documents and memories. Only organization owners and admins can perform this action.



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi delete /v3/container-tags/{containerTag}
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
  /v3/container-tags/{containerTag}:
    delete:
      tags:
        - Container Tags
      summary: Delete container tag
      description: >-
        Delete a container tag and all its documents and memories. Only
        organization owners and admins can perform this action.
      operationId: deleteV3ContainerTagsByContainerTag
      parameters:
        - schema:
            type: string
          in: path
          name: containerTag
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    description: Whether the deletion was successful
                  containerTag:
                    type: string
                    description: The deleted container tag
                  deletedDocumentsCount:
                    type: number
                    description: Number of documents deleted
                  deletedMemoriesCount:
                    type: number
                    description: Number of memories marked as forgotten
                required:
                  - success
                  - containerTag
                  - deletedDocumentsCount
                  - deletedMemoriesCount
                description: >-
                  Response after successfully deleting a container tag and all
                  its associated data
          description: Container tag deleted successfully
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
          description: Forbidden - only owners and admins can delete container tags
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
          description: Container tag not found
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