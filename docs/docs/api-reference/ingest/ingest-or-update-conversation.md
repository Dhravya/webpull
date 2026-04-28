---
title: "Ingest or update conversation"
url: "https://supermemory.ai/docs/api-reference/ingest/ingest-or-update-conversation"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ingest or update conversation

> Ingest or update a conversation



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v4/conversations
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
  /v4/conversations:
    post:
      tags:
        - Ingest
      summary: Ingest or update conversation
      description: Ingest or update a conversation
      operationId: postV4Conversations
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                conversationId:
                  type: string
                  minLength: 1
                  maxLength: 255
                messages:
                  minItems: 1
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                        enum:
                          - user
                          - assistant
                          - system
                          - tool
                      content:
                        anyOf:
                          - type: string
                          - type: array
                            items:
                              anyOf:
                                - type: object
                                  properties:
                                    type:
                                      type: string
                                      const: text
                                    text:
                                      type: string
                                  required:
                                    - type
                                    - text
                                - type: object
                                  properties:
                                    type:
                                      type: string
                                      const: image_url
                                    imageUrl:
                                      type: object
                                      properties:
                                        url:
                                          type: string
                                          format: uri
                                      required:
                                        - url
                                  required:
                                    - type
                                    - imageUrl
                      name:
                        type: string
                      tool_calls:
                        type: array
                        items: {}
                      tool_call_id:
                        type: string
                    required:
                      - role
                      - content
                containerTags:
                  type: array
                  items:
                    type: string
                metadata:
                  type: object
                  propertyNames:
                    type: string
                  additionalProperties:
                    anyOf:
                      - type: string
                      - type: number
                      - type: boolean
              required:
                - conversationId
                - messages
      responses:
        '200':
          description: Conversation ingested/updated successfully
        '400':
          description: Invalid request parameters
        '401':
          description: Unauthorized
        '429':
          description: Quota exceeded
        '500':
          description: Internal server error
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````