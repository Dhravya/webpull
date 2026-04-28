---
title: "Upload a file"
url: "https://supermemory.ai/docs/api-reference/ingest/upload-a-file"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload a file

> Upload a file to be processed



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/documents/file
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
  /v3/documents/file:
    post:
      tags:
        - Ingest
      summary: Upload a file
      description: Upload a file to be processed
      operationId: postV3DocumentsFile
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  description: File to upload and process
                  format: binary
                  type: string
                containerTag:
                  description: >-
                    Optional container tag (e.g., 'user_123'). Use this for a
                    single tag.
                  example: user_123
                  type: string
                containerTags:
                  description: >-
                    Optional container tags. Can be either a JSON string of an
                    array (e.g., '["user_123", "project_123"]') or a single
                    string (e.g., 'user_123'). Single strings will be
                    automatically converted to an array.
                  example: '["user_123", "project_123"]'
                  deprecated: true
                  hidden: true
                  type: string
                fileType:
                  description: >-
                    Optional file type override to force specific processing
                    behavior. Valid values: text, pdf, tweet, google_doc,
                    google_slide, google_sheet, image, video, notion_doc,
                    webpage, onedrive
                  example: image
                  hidden: true
                  type: string
                mimeType:
                  description: >-
                    Required when fileType is 'image' or 'video'. Specifies the
                    exact MIME type to use (e.g., 'image/png', 'image/jpeg',
                    'video/mp4', 'video/webm')
                  hidden: true
                  type: string
                metadata:
                  description: >-
                    Optional metadata for the document as a JSON string. This is
                    used to store additional information about the document.
                    Keys must be strings and values can be strings, numbers, or
                    booleans.
                  example: >-
                    {"category": "technology", "isPublic": true, "readingTime":
                    5}
                  type: string
                filepath:
                  description: >-
                    Optional file path for the uploaded file (e.g.,
                    '/documents/reports/file.pdf'). Used by supermemoryfs to map
                    documents to filesystem paths.
                  example: /documents/reports/file.pdf
                  hidden: true
                  type: string
                useAdvancedProcessing:
                  description: >-
                    DEPRECATED: This field is no longer used. Advanced PDF
                    processing is now automatic with our hybrid Mistral OCR +
                    Gemini pipeline. This parameter will be accepted but ignored
                    for backwards compatibility.
                  example: 'true'
                  deprecated: true
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
              required:
                - file
              description: File upload form data schema
              example:
                file: {}
                containerTag: user
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                required:
                  - id
                  - status
                properties:
                  id:
                    type: string
                    description: Unique identifier of the document
                  status:
                    type: string
                    description: Status of the document
                additionalProperties: false
          description: Successfully uploaded file
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