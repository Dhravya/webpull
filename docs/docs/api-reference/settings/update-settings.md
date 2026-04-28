---
title: "Update settings"
url: "https://supermemory.ai/docs/api-reference/settings/update-settings"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update settings

> Update settings for an organization



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi patch /v3/settings
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
  /v3/settings:
    patch:
      tags:
        - Settings
      summary: Update settings
      description: Update settings for an organization
      operationId: patchV3Settings
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                excludeItems:
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
                    - type: 'null'
                filterPrompt:
                  anyOf:
                    - type: string
                    - type: 'null'
                googleDriveClientId:
                  anyOf:
                    - type: string
                    - type: 'null'
                googleDriveClientSecret:
                  anyOf:
                    - type: string
                    - type: 'null'
                googleDriveCustomKeyEnabled:
                  anyOf:
                    - type: boolean
                    - type: 'null'
                includeItems:
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
                    - type: 'null'
                notionClientId:
                  anyOf:
                    - type: string
                    - type: 'null'
                notionClientSecret:
                  anyOf:
                    - type: string
                    - type: 'null'
                notionCustomKeyEnabled:
                  anyOf:
                    - type: boolean
                    - type: 'null'
                onedriveClientId:
                  anyOf:
                    - type: string
                    - type: 'null'
                onedriveClientSecret:
                  anyOf:
                    - type: string
                    - type: 'null'
                onedriveCustomKeyEnabled:
                  anyOf:
                    - type: boolean
                    - type: 'null'
                githubClientId:
                  anyOf:
                    - type: string
                    - type: 'null'
                githubClientSecret:
                  anyOf:
                    - type: string
                    - type: 'null'
                githubCustomKeyEnabled:
                  anyOf:
                    - type: boolean
                    - type: 'null'
                shouldLLMFilter:
                  anyOf:
                    - type: boolean
                    - type: 'null'
                chunkSize:
                  anyOf:
                    - type: integer
                      minimum: -2147483648
                      maximum: 2147483647
                    - type: 'null'
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  orgId:
                    type: string
                  orgSlug:
                    type: string
                  updated:
                    type: object
                    properties:
                      excludeItems:
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
                          - type: 'null'
                      filterPrompt:
                        anyOf:
                          - type: string
                          - type: 'null'
                      googleDriveClientId:
                        anyOf:
                          - type: string
                          - type: 'null'
                      googleDriveClientSecret:
                        anyOf:
                          - type: string
                          - type: 'null'
                      googleDriveCustomKeyEnabled:
                        anyOf:
                          - type: boolean
                          - type: 'null'
                      includeItems:
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
                          - type: 'null'
                      notionClientId:
                        anyOf:
                          - type: string
                          - type: 'null'
                      notionClientSecret:
                        anyOf:
                          - type: string
                          - type: 'null'
                      notionCustomKeyEnabled:
                        anyOf:
                          - type: boolean
                          - type: 'null'
                      onedriveClientId:
                        anyOf:
                          - type: string
                          - type: 'null'
                      onedriveClientSecret:
                        anyOf:
                          - type: string
                          - type: 'null'
                      onedriveCustomKeyEnabled:
                        anyOf:
                          - type: boolean
                          - type: 'null'
                      githubClientId:
                        anyOf:
                          - type: string
                          - type: 'null'
                      githubClientSecret:
                        anyOf:
                          - type: string
                          - type: 'null'
                      githubCustomKeyEnabled:
                        anyOf:
                          - type: boolean
                          - type: 'null'
                      shouldLLMFilter:
                        anyOf:
                          - type: boolean
                          - type: 'null'
                      chunkSize:
                        anyOf:
                          - type: integer
                            minimum: -2147483648
                            maximum: 2147483647
                          - type: 'null'
                required:
                  - orgId
                  - orgSlug
                  - updated
          description: Settings updated successfully
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