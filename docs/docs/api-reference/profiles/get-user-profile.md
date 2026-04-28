---
title: "Get user profile"
url: "https://supermemory.ai/docs/api-reference/profiles/get-user-profile"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user profile

> Get user profile with optional search results



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v4/profile
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
  /v4/profile:
    post:
      tags:
        - Profiles
      summary: Get user profile
      description: Get user profile with optional search results
      operationId: postV4Profile
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                q:
                  description: >-
                    Optional search query to include search results in the
                    response
                  type: string
                containerTag:
                  type: string
                  description: >-
                    Tag to filter the profile by. This can be an ID for your
                    user, a project ID, or any other identifier you wish to use
                    to filter memories.
                threshold:
                  description: >-
                    Threshold for search results. Only results with a score
                    above this threshold will be included.
                  type: number
                  minimum: 0
                  maximum: 1
                filters:
                  description: >-
                    Optional metadata filters to apply to profile results and
                    search results. Supports complex AND/OR queries with
                    multiple conditions.
                  anyOf:
                    - type: object
                      properties:
                        OR:
                          type: array
                          items:
                            anyOf:
                              - type: object
                                properties:
                                  filterType:
                                    default: metadata
                                    type: string
                                    enum:
                                      - metadata
                                      - numeric
                                      - array_contains
                                      - string_contains
                                  key:
                                    type: string
                                  negate:
                                    anyOf:
                                      - type: boolean
                                      - type: string
                                        enum:
                                          - 'true'
                                          - 'false'
                                  ignoreCase:
                                    anyOf:
                                      - type: boolean
                                      - type: string
                                        enum:
                                          - 'true'
                                          - 'false'
                                  numericOperator:
                                    default: '='
                                    type: string
                                    enum:
                                      - '>'
                                      - <
                                      - '>='
                                      - <=
                                      - '='
                                  value:
                                    type: string
                                required:
                                  - key
                                  - value
                                description: >-
                                  A single filter condition based on metadata,
                                  numeric values, array contents, or string
                                  matching
                              - type: object
                                properties:
                                  OR:
                                    type: array
                                    items:
                                      anyOf:
                                        - type: object
                                          properties:
                                            filterType:
                                              default: metadata
                                              type: string
                                              enum:
                                                - metadata
                                                - numeric
                                                - array_contains
                                                - string_contains
                                            key:
                                              type: string
                                            negate:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            ignoreCase:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            numericOperator:
                                              default: '='
                                              type: string
                                              enum:
                                                - '>'
                                                - <
                                                - '>='
                                                - <=
                                                - '='
                                            value:
                                              type: string
                                          required:
                                            - key
                                            - value
                                          description: >-
                                            A single filter condition based on
                                            metadata, numeric values, array
                                            contents, or string matching
                                        - type: object
                                          properties:
                                            OR:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                OR: Array of conditions or nested
                                                expressions
                                          required:
                                            - OR
                                        - type: object
                                          properties:
                                            AND:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                AND: Array of conditions or nested
                                                expressions
                                          required:
                                            - AND
                                    description: >-
                                      OR: Array of conditions or nested
                                      expressions
                                required:
                                  - OR
                              - type: object
                                properties:
                                  AND:
                                    type: array
                                    items:
                                      anyOf:
                                        - type: object
                                          properties:
                                            filterType:
                                              default: metadata
                                              type: string
                                              enum:
                                                - metadata
                                                - numeric
                                                - array_contains
                                                - string_contains
                                            key:
                                              type: string
                                            negate:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            ignoreCase:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            numericOperator:
                                              default: '='
                                              type: string
                                              enum:
                                                - '>'
                                                - <
                                                - '>='
                                                - <=
                                                - '='
                                            value:
                                              type: string
                                          required:
                                            - key
                                            - value
                                          description: >-
                                            A single filter condition based on
                                            metadata, numeric values, array
                                            contents, or string matching
                                        - type: object
                                          properties:
                                            OR:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                OR: Array of conditions or nested
                                                expressions
                                          required:
                                            - OR
                                        - type: object
                                          properties:
                                            AND:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                AND: Array of conditions or nested
                                                expressions
                                          required:
                                            - AND
                                    description: >-
                                      AND: Array of conditions or nested
                                      expressions
                                required:
                                  - AND
                            description: >-
                              A logical filter expression that can combine
                              conditions using AND/OR operations. Supports up to
                              5 levels of nesting.
                          description: Array of OR filter expressions
                      required:
                        - OR
                    - type: object
                      properties:
                        AND:
                          type: array
                          items:
                            anyOf:
                              - type: object
                                properties:
                                  filterType:
                                    default: metadata
                                    type: string
                                    enum:
                                      - metadata
                                      - numeric
                                      - array_contains
                                      - string_contains
                                  key:
                                    type: string
                                  negate:
                                    anyOf:
                                      - type: boolean
                                      - type: string
                                        enum:
                                          - 'true'
                                          - 'false'
                                  ignoreCase:
                                    anyOf:
                                      - type: boolean
                                      - type: string
                                        enum:
                                          - 'true'
                                          - 'false'
                                  numericOperator:
                                    default: '='
                                    type: string
                                    enum:
                                      - '>'
                                      - <
                                      - '>='
                                      - <=
                                      - '='
                                  value:
                                    type: string
                                required:
                                  - key
                                  - value
                                description: >-
                                  A single filter condition based on metadata,
                                  numeric values, array contents, or string
                                  matching
                              - type: object
                                properties:
                                  OR:
                                    type: array
                                    items:
                                      anyOf:
                                        - type: object
                                          properties:
                                            filterType:
                                              default: metadata
                                              type: string
                                              enum:
                                                - metadata
                                                - numeric
                                                - array_contains
                                                - string_contains
                                            key:
                                              type: string
                                            negate:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            ignoreCase:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            numericOperator:
                                              default: '='
                                              type: string
                                              enum:
                                                - '>'
                                                - <
                                                - '>='
                                                - <=
                                                - '='
                                            value:
                                              type: string
                                          required:
                                            - key
                                            - value
                                          description: >-
                                            A single filter condition based on
                                            metadata, numeric values, array
                                            contents, or string matching
                                        - type: object
                                          properties:
                                            OR:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                OR: Array of conditions or nested
                                                expressions
                                          required:
                                            - OR
                                        - type: object
                                          properties:
                                            AND:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                AND: Array of conditions or nested
                                                expressions
                                          required:
                                            - AND
                                    description: >-
                                      OR: Array of conditions or nested
                                      expressions
                                required:
                                  - OR
                              - type: object
                                properties:
                                  AND:
                                    type: array
                                    items:
                                      anyOf:
                                        - type: object
                                          properties:
                                            filterType:
                                              default: metadata
                                              type: string
                                              enum:
                                                - metadata
                                                - numeric
                                                - array_contains
                                                - string_contains
                                            key:
                                              type: string
                                            negate:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            ignoreCase:
                                              anyOf:
                                                - type: boolean
                                                - type: string
                                                  enum:
                                                    - 'true'
                                                    - 'false'
                                            numericOperator:
                                              default: '='
                                              type: string
                                              enum:
                                                - '>'
                                                - <
                                                - '>='
                                                - <=
                                                - '='
                                            value:
                                              type: string
                                          required:
                                            - key
                                            - value
                                          description: >-
                                            A single filter condition based on
                                            metadata, numeric values, array
                                            contents, or string matching
                                        - type: object
                                          properties:
                                            OR:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                OR: Array of conditions or nested
                                                expressions
                                          required:
                                            - OR
                                        - type: object
                                          properties:
                                            AND:
                                              type: array
                                              items:
                                                anyOf:
                                                  - type: object
                                                    properties:
                                                      filterType:
                                                        default: metadata
                                                        type: string
                                                        enum:
                                                          - metadata
                                                          - numeric
                                                          - array_contains
                                                          - string_contains
                                                      key:
                                                        type: string
                                                      negate:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      ignoreCase:
                                                        anyOf:
                                                          - type: boolean
                                                          - type: string
                                                            enum:
                                                              - 'true'
                                                              - 'false'
                                                      numericOperator:
                                                        default: '='
                                                        type: string
                                                        enum:
                                                          - '>'
                                                          - <
                                                          - '>='
                                                          - <=
                                                          - '='
                                                      value:
                                                        type: string
                                                    required:
                                                      - key
                                                      - value
                                                    description: >-
                                                      A single filter condition based on
                                                      metadata, numeric values, array
                                                      contents, or string matching
                                                  - type: object
                                                    properties:
                                                      OR:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          OR: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - OR
                                                  - type: object
                                                    properties:
                                                      AND:
                                                        type: array
                                                        items:
                                                          anyOf:
                                                            - type: object
                                                              properties:
                                                                filterType:
                                                                  default: metadata
                                                                  type: string
                                                                  enum:
                                                                    - metadata
                                                                    - numeric
                                                                    - array_contains
                                                                    - string_contains
                                                                key:
                                                                  type: string
                                                                negate:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                ignoreCase:
                                                                  anyOf:
                                                                    - type: {}
                                                                    - type: {}
                                                                      enum: {}
                                                                numericOperator:
                                                                  default: '='
                                                                  type: string
                                                                  enum:
                                                                    - '>'
                                                                    - <
                                                                    - '>='
                                                                    - <=
                                                                    - '='
                                                                value:
                                                                  type: string
                                                              required:
                                                                - key
                                                                - value
                                                              description: >-
                                                                A single filter condition based on
                                                                metadata, numeric values, array
                                                                contents, or string matching
                                                            - type: object
                                                              properties:
                                                                OR:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    OR: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - OR
                                                            - type: object
                                                              properties:
                                                                AND:
                                                                  type: array
                                                                  items:
                                                                    anyOf:
                                                                      - {}
                                                                      - {}
                                                                      - {}
                                                                  description: >-
                                                                    AND: Array of conditions or nested
                                                                    expressions
                                                              required:
                                                                - AND
                                                        description: >-
                                                          AND: Array of conditions or nested
                                                          expressions
                                                    required:
                                                      - AND
                                              description: >-
                                                AND: Array of conditions or nested
                                                expressions
                                          required:
                                            - AND
                                    description: >-
                                      AND: Array of conditions or nested
                                      expressions
                                required:
                                  - AND
                            description: >-
                              A logical filter expression that can combine
                              conditions using AND/OR operations. Supports up to
                              5 levels of nesting.
                          description: Array of AND filter expressions
                      required:
                        - AND
              required:
                - containerTag
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  profile:
                    type: object
                    properties:
                      static:
                        type: array
                        items:
                          type: string
                        description: >-
                          Static profile information that remains relevant
                          long-term
                      dynamic:
                        type: array
                        items:
                          type: string
                        description: Dynamic profile information (recent memories)
                    required:
                      - static
                      - dynamic
                  searchResults:
                    description: Search results if a search query was provided
                    type: object
                    properties:
                      results:
                        type: array
                        items: {}
                        description: Search results for the provided query
                      total:
                        type: number
                        description: Total number of search results
                      timing:
                        type: number
                        description: Search timing in milliseconds
                    required:
                      - results
                      - total
                      - timing
                required:
                  - profile
          description: User profile with optional search results
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
          description: Invalid request parameters
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
        '402':
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
          description: Search query limit reached (when search query is provided)
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
          description: Server error
components:
  securitySchemes:
    bearerAuth:
      scheme: bearer
      type: http

````