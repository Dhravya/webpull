---
title: "Search memory entries"
url: "https://supermemory.ai/docs/api-reference/recall-search/search-memory-entries"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search memory entries

> Search memory entries - Low latency for conversational



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v4/search
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
  /v4/search:
    post:
      tags:
        - Recall (Search)
      summary: Search memory entries
      description: Search memory entries - Low latency for conversational
      operationId: postV4Search
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                containerTag:
                  description: >-
                    Optional tag this search should be containerized by. This
                    can be an ID for your user, a project ID, or any other
                    identifier you wish to use to filter memories.
                  example: user_123
                  type: string
                  maxLength: 100
                  pattern: ^[a-zA-Z0-9_:-]+$
                threshold:
                  description: >-
                    Threshold / sensitivity for memories selection. 0 is least
                    sensitive (returns most memories, more results), 1 is most
                    sensitive (returns lesser memories, accurate results)
                  example: 0.5
                  maximum: 1
                  minimum: 0
                  default: 0.6
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
                include:
                  default:
                    documents: false
                    summaries: false
                    relatedMemories: false
                    forgottenMemories: false
                    chunks: false
                  type: object
                  properties:
                    documents:
                      default: false
                      type: boolean
                    summaries:
                      default: false
                      type: boolean
                    relatedMemories:
                      default: false
                      type: boolean
                    forgottenMemories:
                      default: false
                      description: >-
                        If true, include forgotten memories in search results.
                        Forgotten memories are memories that have been
                        explicitly forgotten or have passed their expiration
                        date.
                      example: false
                      type: boolean
                    chunks:
                      default: false
                      description: >-
                        DEPRECATED: Use searchMode='hybrid' instead. If true,
                        automatically switches to hybrid mode. This field is
                        kept for backward compatibility only.
                      example: false
                      deprecated: true
                      type: boolean
                limit:
                  default: 10
                  description: Maximum number of results to return
                  example: 10
                  maximum: 100
                  minimum: 1
                  type: integer
                  exclusiveMinimum: 0
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
                aggregate:
                  default: false
                  description: >-
                    If true, aggregates information from multiple memories to
                    create new synthesized memories. The result will be a mix of
                    aggregated and non-aggregated memories, reranked by
                    relevance to the query. Works in conjunction with reranking.
                  example: false
                  type: boolean
                rewriteQuery:
                  default: false
                  description: >-
                    If true, rewrites the query to make it easier to find
                    documents. This increases the latency by about 400ms
                  example: false
                  type: boolean
                searchMode:
                  default: memories
                  description: >-
                    Search mode. 'memories' searches only memory entries
                    (default). 'hybrid' searches both memories and document
                    chunks. 'documents' searches only document chunks.
                  example: memories
                  type: string
                  enum:
                    - memories
                    - hybrid
                    - documents
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
                        id:
                          type: string
                          description: Memory entry ID or chunk ID
                          example: mem_abc123
                        memory:
                          description: The memory content (only present for memory results)
                          example: >-
                            John prefers machine learning over traditional
                            programming
                          type: string
                        chunk:
                          description: >-
                            The chunk content (only present for chunk results
                            from hybrid search)
                          example: This is a chunk of content from a document...
                          type: string
                        metadata:
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties: {}
                            - type: 'null'
                          description: Memory metadata
                          example:
                            source: conversation
                            confidence: 0.9
                        updatedAt:
                          type: string
                          description: Memory last update date
                          format: datetime
                        similarity:
                          type: number
                          description: Similarity score between the query and memory entry
                          example: 0.89
                          maximum: 1
                          minimum: 0
                        filepath:
                          description: >-
                            Filepath of the source document this memory or chunk
                            came from
                          example: /docs/architecture.md
                          hidden: true
                          anyOf:
                            - type: string
                            - type: 'null'
                        version:
                          description: Version number of this memory entry
                          example: 3
                          anyOf:
                            - type: number
                            - type: 'null'
                        context:
                          description: >-
                            Object containing version history (parents/children
                            via updates) and related memories (extends/derives)
                          type: object
                          properties:
                            parents:
                              type: array
                              items:
                                type: object
                                properties:
                                  relation:
                                    type: string
                                    enum:
                                      - updates
                                      - extends
                                      - derives
                                    description: >-
                                      Relation type between this memory and its
                                      parent/child
                                    example: updates
                                  version:
                                    description: >-
                                      Relative version distance from the primary
                                      memory (-1 for direct parent, -2 for
                                      grand-parent, etc.)
                                    example: -1
                                    anyOf:
                                      - type: number
                                      - type: 'null'
                                  memory:
                                    type: string
                                    description: The contextual memory content
                                    example: >-
                                      Earlier version: Dhravya is working on a
                                      patent at Cloudflare.
                                  metadata:
                                    description: Contextual memory metadata
                                    anyOf:
                                      - type: object
                                        propertyNames:
                                          type: string
                                        additionalProperties: {}
                                      - type: 'null'
                                  updatedAt:
                                    type: string
                                    description: Contextual memory last update date
                                    format: datetime
                                required:
                                  - relation
                                  - memory
                                  - updatedAt
                            children:
                              type: array
                              items:
                                type: object
                                properties:
                                  relation:
                                    type: string
                                    enum:
                                      - updates
                                      - extends
                                      - derives
                                    description: >-
                                      Relation type between this memory and its
                                      parent/child
                                    example: extends
                                  version:
                                    description: >-
                                      Relative version distance from the primary
                                      memory (+1 for direct child, +2 for
                                      grand-child, etc.)
                                    example: 1
                                    anyOf:
                                      - type: number
                                      - type: 'null'
                                  memory:
                                    type: string
                                    description: The contextual memory content
                                    example: >-
                                      Later version: Dhravya has filed the
                                      patent successfully.
                                  metadata:
                                    description: Contextual memory metadata
                                    anyOf:
                                      - type: object
                                        propertyNames:
                                          type: string
                                        additionalProperties: {}
                                      - type: 'null'
                                  updatedAt:
                                    type: string
                                    description: Contextual memory last update date
                                    format: datetime
                                required:
                                  - relation
                                  - memory
                                  - updatedAt
                            related:
                              type: array
                              items:
                                type: object
                                properties:
                                  relation:
                                    type: string
                                    enum:
                                      - extends
                                      - derives
                                    description: Relation type
                                  memory:
                                    type: string
                                    description: The related memory content
                                  metadata:
                                    description: Related memory metadata
                                    anyOf:
                                      - type: object
                                        propertyNames:
                                          type: string
                                        additionalProperties: {}
                                      - type: 'null'
                                  updatedAt:
                                    type: string
                                    description: Related memory last update date
                                required:
                                  - relation
                                  - memory
                                  - updatedAt
                        documents:
                          description: Associated documents for this memory entry
                          type: array
                          items:
                            type: object
                            properties:
                              id:
                                type: string
                                description: Document ID
                                example: doc_xyz789
                              title:
                                description: >-
                                  Document title (only included when
                                  documents=true)
                                example: Introduction to Machine Learning
                                type: string
                              type:
                                description: >-
                                  Document type (only included when
                                  documents=true)
                                example: web
                                type: string
                              metadata:
                                description: >-
                                  Document metadata (only included when
                                  documents=true)
                                example:
                                  category: technology
                                  isPublic: true
                                  readingTime: 5
                                  source: web
                                  tag_1: ai
                                  tag_2: machine-learning
                                anyOf:
                                  - type: object
                                    propertyNames:
                                      type: string
                                    additionalProperties: {}
                                  - type: 'null'
                              summary:
                                description: >-
                                  Document summary (only included when
                                  summaries=true)
                                example: >-
                                  A comprehensive guide to understanding the
                                  basics of machine learning and its
                                  applications.
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              createdAt:
                                type: string
                                description: Document creation date
                                format: datetime
                              updatedAt:
                                type: string
                                description: Document last update date
                                format: datetime
                            required:
                              - id
                              - createdAt
                              - updatedAt
                        chunks:
                          description: >-
                            Relevant chunks from associated documents (only
                            included when chunks=true)
                          type: array
                          items:
                            type: object
                            properties:
                              content:
                                type: string
                                description: Content of the chunk
                                example: >-
                                  This is a chunk of content from the
                                  document...
                              score:
                                type: number
                                description: Similarity score between the query and chunk
                                example: 0.85
                                maximum: 1
                                minimum: 0
                              position:
                                type: number
                                description: Position of chunk in the document (0-indexed)
                                example: 0
                              documentId:
                                type: string
                                description: ID of the document this chunk belongs to
                                example: doc_xyz789
                            required:
                              - content
                              - score
                              - position
                              - documentId
                        isAggregated:
                          description: >-
                            Indicates if this memory was created by aggregating
                            multiple source memories
                          example: false
                          type: boolean
                      required:
                        - id
                        - metadata
                        - updatedAt
                        - similarity
                    description: >-
                      Array of matching memory entries and chunks with
                      similarity scores. Contains memory results when
                      searchMode='memories', both memory and chunk results when
                      searchMode='hybrid', or only chunk results when
                      searchMode='documents'. Memory results have 'memory'
                      field, chunk results have 'chunk' field. BACKWARD
                      COMPATIBILITY: When using deprecated include.chunks=true,
                      only memory results are returned with chunks embedded in
                      them (old format).
                  timing:
                    type: number
                    description: Search execution time in milliseconds
                    example: 245
                  total:
                    type: number
                    description: Total number of results returned
                    example: 5
                required:
                  - results
                  - timing
                  - total
          description: Memory search results
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
          description: Search query limit reached
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