---
title: "Get document"
url: "https://supermemory.ai/docs/api-reference/documents/get-document"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get document

> Get a document by ID



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi get /v3/documents/{id}
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
    get:
      tags:
        - Documents
      summary: Get document
      description: Get a document by ID
      operationId: getV3DocumentsById
      parameters:
        - in: path
          name: id
          schema:
            type: string
          required: true
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  connectionId:
                    anyOf:
                      - anyOf:
                          - type: string
                            minLength: 22
                            maxLength: 22
                          - type: 'null'
                        description: >-
                          Optional ID of connection the document was created
                          from. This is useful for identifying the source of the
                          document.
                        example: conn_123
                      - type: 'null'
                  content:
                    anyOf:
                      - type: string
                        description: >-
                          The content to extract and process into a document.
                          This can be a URL to a website, a PDF, an image, or a
                          video. 


                          Plaintext: Any plaintext format


                          URL: A URL to a website, PDF, image, or video


                          We automatically detect the content type from the
                          url's response format.
                        examples:
                          - >-
                            This is a detailed article about machine learning
                            concepts...
                          - https://example.com/article
                          - https://youtube.com/watch?v=abc123
                          - https://example.com/audio.mp3
                          - https://aws-s3.com/bucket/file.pdf
                          - https://example.com/image.jpg
                      - type: 'null'
                  containerTags:
                    readOnly: true
                    description: >-
                      Optional tags this document should be containerized by.
                      This can be an ID for your user, a project ID, or any
                      other identifier you wish to use to group documents.
                    example:
                      - user_123
                      - project_123
                    deprecated: true
                    hidden: true
                    type: array
                    items:
                      type: string
                  createdAt:
                    type: string
                    description: Creation timestamp
                    example: '1970-01-01T00:00:00.000Z'
                    format: datetime
                  customId:
                    anyOf:
                      - type: string
                        maxLength: 255
                        description: >-
                          Optional custom ID of the document. This could be an
                          ID from your database that will uniquely identify this
                          document.
                        example: mem_abc123
                      - type: 'null'
                  id:
                    type: string
                    minLength: 22
                    maxLength: 22
                    description: Unique identifier of the document.
                    example: acxV5LHMEsG2hMSNb4umbn
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
                          Optional metadata for the document. This is used to
                          store additional information about the document. You
                          can use this to store any additional information you
                          need about the document. Metadata can be filtered
                          through. Keys must be strings and are case sensitive.
                          Values can be strings, numbers, or booleans. You
                          cannot nest objects.
                        example:
                          category: technology
                          isPublic: true
                          readingTime: 5
                          source: web
                          tag_1: ai
                          tag_2: machine-learning
                      - type: 'null'
                  ogImage:
                    anyOf:
                      - type: string
                      - type: 'null'
                  raw:
                    anyOf:
                      - description: Raw content of the document
                        example: >-
                          This is a detailed article about machine learning
                          concepts...
                      - type: 'null'
                  source:
                    anyOf:
                      - type: string
                        maxLength: 255
                        description: Source of the document
                        example: web
                      - type: 'null'
                  taskType:
                    description: >-
                      Task type: "memory" (default) for full context layer with
                      SuperRAG built in, "superrag" for managed RAG as a
                      service.
                    example: memory
                    type: string
                    enum:
                      - memory
                      - superrag
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
                  summary:
                    anyOf:
                      - type: string
                        description: Summary of the document content
                        example: >-
                          A comprehensive guide to understanding the basics of
                          machine learning and its applications.
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
                  updatedAt:
                    type: string
                    description: Last update timestamp
                    example: '1970-01-01T00:00:00.000Z'
                    format: datetime
                  url:
                    anyOf:
                      - anyOf:
                          - type: string
                          - type: 'null'
                        description: URL of the document
                        example: https://example.com/article
                      - type: 'null'
                  filepath:
                    anyOf:
                      - type: string
                      - type: 'null'
                  spatialPoint:
                    anyOf:
                      - {}
                      - type: 'null'
                required:
                  - connectionId
                  - content
                  - createdAt
                  - customId
                  - id
                  - metadata
                  - ogImage
                  - raw
                  - source
                  - taskType
                  - status
                  - summary
                  - title
                  - type
                  - updatedAt
                  - filepath
                  - spatialPoint
                description: Document object
                example:
                  connectionId: conn_123
                  containerTags:
                    - user_123
                  content: >-
                    This is a detailed article about machine learning
                    concepts...
                  createdAt: '1970-01-01T00:00:00.000Z'
                  customId: mem_abc123
                  id: acxV5LHMEsG2hMSNb4umbn
                  metadata:
                    category: technology
                    isPublic: true
                    readingTime: 5
                    source: web
                    tag_1: ai
                    tag_2: machine-learning
                  ogImage: https://example.com/image.jpg
                  raw: >-
                    This is a detailed article about machine learning
                    concepts...
                  source: web
                  status: done
                  summary: >-
                    A comprehensive guide to understanding the basics of machine
                    learning and its applications.
                  title: Introduction to Machine Learning
                  tokenCount: 1000
                  type: text
                  updatedAt: '1970-01-01T00:00:00.000Z'
                  url: https://example.com/article
          description: Successfully retrieved document
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