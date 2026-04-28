---
title: "List memory entries with history"
url: "https://supermemory.ai/docs/api-reference/content-management/list-memory-entries-with-history"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List memory entries with history

> List all latest memory entries from specified container tags with their update history and source documents



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v4/memories/list
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
  /v4/memories/list:
    post:
      tags:
        - Content Management
      summary: List memory entries with history
      description: >-
        List all latest memory entries from specified container tags with their
        update history and source documents
      operationId: postV4MemoriesList
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                containerTags:
                  minItems: 1
                  type: array
                  items:
                    type: string
                    maxLength: 100
                    pattern: ^[a-zA-Z0-9_:-]+$
                  description: >-
                    Container tags to filter memory entries. At least one tag is
                    required.
                  example:
                    - user_123
                    - project_abc
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
                limit:
                  description: Number of items per page
                  example: '10'
                  anyOf:
                    - type: string
                      pattern: ^\d+$
                    - type: number
                order:
                  default: desc
                  description: Sort order
                  example: desc
                  type: string
                  enum:
                    - asc
                    - desc
                page:
                  description: Page number to fetch
                  example: '1'
                  anyOf:
                    - type: string
                      pattern: ^\d+$
                    - type: number
                sort:
                  default: createdAt
                  description: Field to sort by
                  example: createdAt
                  type: string
                  enum:
                    - createdAt
                    - updatedAt
              required:
                - containerTags
              description: Query parameters for listing memory entries with history
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  memoryEntries:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                          description: Unique identifier for the memory entry
                        memory:
                          type: string
                          description: The memory content/text
                        version:
                          type: number
                          description: Version number of this memory
                        isLatest:
                          type: boolean
                          description: Whether this is the latest version
                        isForgotten:
                          type: boolean
                          description: Whether this memory has been forgotten
                        isStatic:
                          type: boolean
                          description: Whether this is a static profile memory
                        isInference:
                          anyOf:
                            - type: boolean
                            - type: 'null'
                          description: Whether this is an inferred memory
                        createdAt:
                          type: string
                          description: ISO timestamp of creation
                        updatedAt:
                          type: string
                          description: ISO timestamp of last update
                        spaceId:
                          type: string
                          description: ID of the space this memory belongs to
                        orgId:
                          type: string
                          description: Organization ID
                        sourceCount:
                          type: number
                          description: Number of source documents for this memory
                        parentMemoryId:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: ID of the parent memory (previous version)
                        rootMemoryId:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: ID of the root memory (first version)
                        forgetAfter:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: ISO timestamp when memory should be forgotten
                        forgetReason:
                          anyOf:
                            - type: string
                            - type: 'null'
                          description: Reason for forgetting
                        metadata:
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties: {}
                            - type: 'null'
                          description: >-
                            Metadata including temporal context and other
                            information
                        memoryRelations:
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties:
                                type: string
                                enum:
                                  - updates
                                  - extends
                                  - derives
                            - type: 'null'
                          description: Relations to other memories
                        temporalContext:
                          anyOf:
                            - type: object
                              propertyNames:
                                type: string
                              additionalProperties: {}
                            - type: 'null'
                          description: Temporal context metadata (alias for metadata field)
                        history:
                          type: array
                          items:
                            type: object
                            properties:
                              id:
                                type: string
                              memory:
                                type: string
                              version:
                                type: number
                              createdAt:
                                type: string
                              updatedAt:
                                type: string
                              parentMemoryId:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              rootMemoryId:
                                anyOf:
                                  - type: string
                                  - type: 'null'
                              isLatest:
                                type: boolean
                              isForgotten:
                                type: boolean
                            required:
                              - id
                              - memory
                              - version
                              - createdAt
                              - updatedAt
                              - parentMemoryId
                              - rootMemoryId
                              - isLatest
                              - isForgotten
                            description: Historical version of a memory entry
                          description: Previous versions of this memory
                        documentIds:
                          type: array
                          items:
                            type: string
                          description: IDs of source documents for this memory
                      required:
                        - id
                        - memory
                        - version
                        - isLatest
                        - isForgotten
                        - isStatic
                        - isInference
                        - createdAt
                        - updatedAt
                        - spaceId
                        - orgId
                        - sourceCount
                        - parentMemoryId
                        - rootMemoryId
                        - forgetAfter
                        - forgetReason
                        - metadata
                        - memoryRelations
                        - temporalContext
                        - history
                        - documentIds
                      description: Memory entry with history and document references
                  pagination:
                    type: object
                    properties:
                      currentPage:
                        type: number
                      limit:
                        default: 10
                        type: number
                        maximum: 1100
                      totalItems:
                        type: number
                      totalPages:
                        type: number
                    required:
                      - currentPage
                      - totalItems
                      - totalPages
                    description: Pagination metadata
                    example:
                      currentPage: 1
                      limit: 10
                      totalItems: 100
                      totalPages: 10
                required:
                  - memoryEntries
                  - pagination
                description: List of memory entries with their history and source documents
          description: Successfully retrieved memory entries
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
          description: Bad request - containerTags are required
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