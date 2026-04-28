---
title: "Search documents"
url: "https://supermemory.ai/docs/api-reference/documents/search-documents"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search documents

> Search memories with advanced filtering



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/search
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
  /v3/search:
    post:
      tags:
        - Documents
      summary: Search documents
      description: Search memories with advanced filtering
      operationId: postV3Search
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                chunkThreshold:
                  description: >-
                    Threshold / sensitivity for chunk selection. 0 is least
                    sensitive (returns most chunks, more results), 1 is most
                    sensitive (returns lesser chunks, accurate results)
                  example: 0.5
                  maximum: 1
                  minimum: 0
                  default: 0
                  type: number
                containerTag:
                  description: Optional single container tag. Use this or containerTags.
                  example: user_123
                  type: string
                  maxLength: 100
                  pattern: ^[a-zA-Z0-9_:-]+$
                containerTags:
                  description: >-
                    Optional tags this search should be containerized by. This
                    can be an ID for your user, a project ID, or any other
                    identifier you wish to use to filter documents.
                  example:
                    - user_123
                  type: array
                  items:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                docId:
                  description: >-
                    Optional document ID to search within. You can use this to
                    find chunks in a very large document.
                  type: string
                  maxLength: 255
                documentThreshold:
                  description: >-
                    DEPRECATED: This field is no longer used in v3 search. The
                    search now uses chunkThreshold only. This parameter will be
                    ignored.
                  maximum: 1
                  minimum: 0
                  deprecated: true
                  default: 0
                  type: number
                filters:
                  description: >-
                    Optional filters to apply to the search. Can be a JSON
                    string or Query object.
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
                includeFullDocs:
                  default: false
                  description: >-
                    If true, include full document in the response. This is
                    helpful if you want a chatbot to know the full context of
                    the document. 
                  example: false
                  type: boolean
                includeSummary:
                  default: false
                  description: >-
                    If true, include document summary in the response. This is
                    helpful if you want a chatbot to know the full context of
                    the document. 
                  type: boolean
                limit:
                  default: 10
                  description: Maximum number of results to return
                  example: 10
                  maximum: 100
                  minimum: 1
                  type: integer
                  exclusiveMinimum: 0
                onlyMatchingChunks:
                  default: true
                  description: >-
                    If true, only return matching chunks without context.
                    Normally, we send the previous and next chunk to provide
                    more context for LLMs. If you only want the matching chunk,
                    set this to true.
                  type: boolean
                q:
                  type: string
                  minLength: 1
                  description: Search query string
                  example: machine learning concepts
                rerank:
                  default: false
                  description: >-
                    If true, rerank the results based on the query. This is
                    helpful if you want to ensure the most relevant results are
                    returned.
                  example: false
                  type: boolean
                rewriteQuery:
                  default: false
                  description: >-
                    If true, rewrites the query to make it easier to find
                    documents. This increases the latency by about 400ms
                  example: false
                  type: boolean
                categoriesFilter:
                  description: 'DEPRECATED: Optional category filters'
                  deprecated: true
                  type: array
                  items:
                    type: string
                filepath:
                  description: >-
                    Filter search results by filepath. Exact match for full
                    paths, prefix match if ending with /
                  example: /docs/
                  hidden: true
                  type: string
              required:
                - q
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      properties:
                        chunks:
                          type: array
                          items:
                            type: object
                            properties:
                              content:
                                type: string
                                description: Content of the matching chunk
                                example: >-
                                  Machine learning is a subset of artificial
                                  intelligence...
                              isRelevant:
                                type: boolean
                                description: Whether this chunk is relevant to the query
                                example: true
                              score:
                                type: number
                                description: Similarity score for this chunk
                                example: 0.85
                                maximum: 1
                                minimum: 0
                            required:
                              - content
                              - isRelevant
                              - score
                            description: Matching content chunk
                            example:
                              content: >-
                                Machine learning is a subset of artificial
                                intelligence...
                              isRelevant: true
                              score: 0.85
                          description: Matching content chunks from the document
                          example:
                            - content: >-
                                Machine learning is a subset of artificial
                                intelligence...
                              isRelevant: true
                              score: 0.85
                        createdAt:
                          type: string
                          description: Document creation date
                          example: '1970-01-01T00:00:00.000Z'
                          format: datetime
                        documentId:
                          type: string
                          description: ID of the matching document
                          example: doc_xyz789
                        metadata:
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties: {}
                            - type: 'null'
                          description: Document metadata
                          example:
                            category: technology
                            isPublic: true
                            readingTime: 5
                            source: web
                            tag_1: ai
                            tag_2: machine-learning
                        score:
                          type: number
                          description: Relevance score of the match
                          example: 0.95
                          maximum: 1
                          minimum: 0
                        summary:
                          description: Document summary
                          example: >-
                            A comprehensive guide to understanding the basics of
                            machine learning and its applications.
                          anyOf:
                            - type: string
                            - type: 'null'
                        content:
                          description: >-
                            Full document content (only included when
                            includeFullDocs=true)
                          example: >-
                            This is the complete content of the document about
                            machine learning concepts...
                          anyOf:
                            - type: string
                            - type: 'null'
                        title:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: Document title
                          example: Introduction to Machine Learning
                        updatedAt:
                          type: string
                          description: Document last update date
                          example: '1970-01-01T00:00:00.000Z'
                          format: datetime
                        type:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: Document type
                          example: web
                      required:
                        - chunks
                        - createdAt
                        - documentId
                        - metadata
                        - score
                        - title
                        - updatedAt
                        - type
                  timing:
                    type: number
                  total:
                    type: number
                required:
                  - results
                  - timing
                  - total
          description: Search results
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
          description: Document not found
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