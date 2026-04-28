---
title: "Get processing documents"
url: "https://supermemory.ai/docs/api-reference/documents/get-processing-documents"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get processing documents

> Get documents that are currently being processed



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/documents/processing
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
  /v3/documents/processing:
    get:
      tags:
        - Documents
      summary: Get processing documents
      description: Get documents that are currently being processed
      operationId: getV3DocumentsProcessing
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  documents:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                          minLength: 22
                          maxLength: 22
                          description: Unique identifier of the document.
                          example: acxV5LHMEsG2hMSNb4umbn
                        customId:
                          anyOf:
                            - type: string
                              maxLength: 255
                              description: >-
                                Optional custom ID of the document. This could
                                be an ID from your database that will uniquely
                                identify this document.
                              example: mem_abc123
                            - type: 'null'
                        title:
                          anyOf:
                            - type: string
                              description: Title of the document
                              example: Introduction to Machine Learning
                            - type: 'null'
                        type:
                          type: string
                          enum:
                            - text
                            - pdf
                            - tweet
                            - google_doc
                            - google_slide
                            - google_sheet
                            - image
                            - video
                            - audio
                            - notion_doc
                            - webpage
                            - onedrive
                            - github_markdown
                          description: Type of the document
                          example: text
                        status:
                          type: string
                          enum:
                            - unknown
                            - queued
                            - extracting
                            - chunking
                            - embedding
                            - indexing
                            - done
                            - failed
                          description: Status of the document
                          example: done
                        createdAt:
                          type: string
                          description: Creation timestamp
                          example: '1970-01-01T00:00:00.000Z'
                          format: datetime
                        updatedAt:
                          type: string
                          description: Last update timestamp
                          example: '1970-01-01T00:00:00.000Z'
                          format: datetime
                        metadata:
                          anyOf:
                            - anyOf:
                                - anyOf:
                                    - type: string
                                    - type: number
                                    - type: boolean
                                    - type: 'null'
                                - type: object
                                  propertyNames:
                                    type: string
                                  additionalProperties: {}
                                - type: array
                                  items: {}
                              description: >-
                                Optional metadata for the document. This is used
                                to store additional information about the
                                document. You can use this to store any
                                additional information you need about the
                                document. Metadata can be filtered through. Keys
                                must be strings and are case sensitive. Values
                                can be strings, numbers, or booleans. You cannot
                                nest objects.
                              example:
                                category: technology
                                isPublic: true
                                readingTime: 5
                                source: web
                                tag_1: ai
                                tag_2: machine-learning
                            - type: 'null'
                        containerTags:
                          readOnly: true
                          description: >-
                            Optional tags this document should be containerized
                            by. This can be an ID for your user, a project ID,
                            or any other identifier you wish to use to group
                            documents.
                          example:
                            - user_123
                            - project_123
                          deprecated: true
                          hidden: true
                          type: array
                          items:
                            type: string
                      required:
                        - id
                        - customId
                        - title
                        - type
                        - status
                        - createdAt
                        - updatedAt
                        - metadata
                  totalCount:
                    type: number
                    description: Total number of processing documents
                    example: 5
                required:
                  - documents
                  - totalCount
                description: List of documents currently being processed
                example:
                  documents:
                    - id: doc_123
                      customId: custom_123
                      title: My Document
                      type: text
                      status: extracting
                      createdAt: '2024-12-27T12:00:00Z'
                      updatedAt: '2024-12-27T12:01:00Z'
                      metadata: {}
                      containerTags:
                        - sm_project_default
                  totalCount: 5
          description: Successfully retrieved processing documents
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