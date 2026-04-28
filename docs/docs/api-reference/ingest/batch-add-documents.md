---
title: "Batch add documents"
url: "https://supermemory.ai/docs/api-reference/ingest/batch-add-documents"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch add documents

> Add multiple documents in a single request. Each document can have any content type (text, url, file, etc.) and metadata



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/documents/batch
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
  /v3/documents/batch:
    post:
      tags:
        - Ingest
      summary: Batch add documents
      description: >-
        Add multiple documents in a single request. Each document can have any
        content type (text, url, file, etc.) and metadata
      operationId: postV3DocumentsBatch
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                containerTag:
                  description: >-
                    Optional tag this document should be containerized by. This
                    can be an ID for your user, a project ID, or any other
                    identifier you wish to use to group documents.
                  example: user_123
                  type: string
                  maxLength: 100
                  pattern: ^[a-zA-Z0-9_:-]+$
                containerTags:
                  description: >-
                    (DEPRECATED: Use containerTag instead) Optional tags this
                    document should be containerized by. This can be an ID for
                    your user, a project ID, or any other identifier you wish to
                    use to group documents.
                  example:
                    - user_123
                    - project_123
                  deprecated: true
                  hidden: true
                  type: array
                  items:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                metadata:
                  description: >-
                    Optional metadata for the document. This is used to store
                    additional information about the document. You can use this
                    to store any additional information you need about the
                    document. Metadata can be filtered through. Keys must be
                    strings and are case sensitive. Values can be strings,
                    numbers, or booleans. You cannot nest objects.
                  example:
                    category: technology
                    isPublic: true
                    readingTime: 5
                    source: web
                    tag_1: ai
                    tag_2: machine-learning
                  type: object
                  propertyNames:
                    type: string
                  additionalProperties:
                    anyOf:
                      - type: string
                      - type: number
                      - type: boolean
                      - type: array
                        items:
                          type: string
                taskType:
                  description: >-
                    Task type: "memory" (default) for full context layer with
                    SuperRAG built in, "superrag" for managed RAG as a service.
                  example: memory
                  type: string
                  enum:
                    - memory
                    - superrag
                filepath:
                  description: >-
                    Optional file path for the document (e.g.,
                    '/documents/reports/file.pdf'). Used by supermemoryfs to map
                    documents to filesystem paths.
                  example: /documents/reports/file.pdf
                  hidden: true
                  type: string
                documents:
                  anyOf:
                    - minItems: 1
                      maxItems: 600
                      type: array
                      items:
                        type: object
                        properties:
                          containerTag:
                            description: >-
                              Optional tag this document should be containerized
                              by. This can be an ID for your user, a project ID,
                              or any other identifier you wish to use to group
                              documents.
                            example: user_123
                            type: string
                            maxLength: 100
                            pattern: ^[a-zA-Z0-9_:-]+$
                          containerTags:
                            description: >-
                              (DEPRECATED: Use containerTag instead) Optional
                              tags this document should be containerized by.
                              This can be an ID for your user, a project ID, or
                              any other identifier you wish to use to group
                              documents.
                            example:
                              - user_123
                              - project_123
                            deprecated: true
                            hidden: true
                            type: array
                            items:
                              type: string
                              maxLength: 100
                              pattern: ^[a-zA-Z0-9_:-]+$
                          content:
                            type: string
                            description: >-
                              The content to extract and process into a
                              document. This can be a URL to a website, a PDF,
                              an image, or a video. 


                              Plaintext: Any plaintext format


                              URL: A URL to a website, PDF, image, or video


                              We automatically detect the content type from the
                              url's response format.
                            example: >-
                              This is a detailed article about machine learning
                              concepts...
                          customId:
                            description: >-
                              Optional custom ID of the document. This could be
                              an ID from your database that will uniquely
                              identify this document.
                            example: mem_abc123
                            type: string
                          metadata:
                            description: >-
                              Optional metadata for the document. This is used
                              to store additional information about the
                              document. You can use this to store any additional
                              information you need about the document. Metadata
                              can be filtered through. Keys must be strings and
                              are case sensitive. Values can be strings,
                              numbers, or booleans. You cannot nest objects.
                            example:
                              category: technology
                              isPublic: true
                              readingTime: 5
                              source: web
                              tag_1: ai
                              tag_2: machine-learning
                            type: object
                            propertyNames:
                              type: string
                            additionalProperties:
                              anyOf:
                                - type: string
                                - type: number
                                - type: boolean
                                - type: array
                                  items:
                                    type: string
                          taskType:
                            description: >-
                              Task type: "memory" (default) for full context
                              layer with SuperRAG built in, "superrag" for
                              managed RAG as a service.
                            example: memory
                            type: string
                            enum:
                              - memory
                              - superrag
                          filepath:
                            description: >-
                              Optional file path for the document (e.g.,
                              '/documents/reports/file.pdf'). Used by
                              supermemoryfs to map documents to filesystem
                              paths.
                            example: /documents/reports/file.pdf
                            hidden: true
                            type: string
                        required:
                          - content
                    - minItems: 1
                      maxItems: 600
                      type: array
                      items:
                        type: string
                        description: >-
                          The content to extract and process into a document.
                          This can be a URL to a website, a PDF, an image, or a
                          video. 


                          Plaintext: Any plaintext format


                          URL: A URL to a website, PDF, image, or video


                          We automatically detect the content type from the
                          url's response format.
                        example: >-
                          This is a detailed article about machine learning
                          concepts...
                content:
                  type: 'null'
              required:
                - documents
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                required:
                  - results
                  - failed
                  - success
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      required:
                        - id
                        - status
                      properties:
                        id:
                          type: string
                          description: >-
                            Unique identifier of the document (empty string for
                            failed items)
                        status:
                          type: string
                          description: >-
                            Status of the document (e.g. 'done', 'queued',
                            'error')
                        error:
                          type: string
                          description: Error message when status is 'error'
                        details:
                          type: string
                          description: Additional error details when status is 'error'
                      additionalProperties: false
                    description: Array of results for each document in the batch
                  failed:
                    type: number
                    description: Count of documents that failed to add
                  success:
                    type: number
                    description: Count of documents successfully added
                additionalProperties: false
          description: Documents added successfully
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
        '402':
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
          description: Document token limit reached
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