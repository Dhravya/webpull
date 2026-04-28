---
title: "List documents"
url: "https://supermemory.ai/docs/api-reference/documents/list-documents"
---

> ## Documentation Index
> Fetch the complete documentation index at: https://supermemory.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List documents

> Retrieves a paginated list of documents with their metadata and workflow status



## OpenAPI

````yaml https://api.supermemory.ai/v3/openapi post /v3/documents/list
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
  /v3/documents/list:
    post:
      tags:
        - Documents
      summary: List documents
      description: >-
        Retrieves a paginated list of documents with their metadata and workflow
        status
      operationId: postV3DocumentsList
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                containerTags:
                  description: >-
                    Optional tags this document should be containerized by. This
                    can be an ID for your user, a project ID, or any other
                    identifier you wish to use to group documents.
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
                includeContent:
                  default: false
                  description: >-
                    Whether to include the content field in the response.
                    Warning: This can make responses significantly larger.
                  example: false
                  type: boolean
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
                filepath:
                  description: >-
                    Filter documents by filepath. Exact match for full paths,
                    prefix match if ending with /
                  example: /docs/
                  hidden: true
                  type: string
              description: Query parameters for listing documents
              example:
                filters:
                  AND:
                    - filterType: metadata
                      key: group
                      negate: false
                      value: jira_users
                    - filterType: numeric
                      key: timestamp
                      negate: false
                      numericOperator: '>'
                      value: '1742745777'
                limit: 10
                order: desc
                page: 1
                sort: createdAt
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  memories:
                    type: array
                    items:
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
                                Optional ID of connection the document was
                                created from. This is useful for identifying the
                                source of the document.
                              example: conn_123
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
                                Optional custom ID of the document. This could
                                be an ID from your database that will uniquely
                                identify this document.
                              example: mem_abc123
                            - type: 'null'
                        filepath:
                          anyOf:
                            - type: string
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
                                A comprehensive guide to understanding the
                                basics of machine learning and its applications.
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
                        content:
                          description: >-
                            Content of the document (only included when
                            includeContent=true)
                          example: This is the content of the document...
                          type: string
                      required:
                        - connectionId
                        - createdAt
                        - customId
                        - filepath
                        - id
                        - metadata
                        - status
                        - summary
                        - title
                        - type
                        - updatedAt
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
                  - memories
                  - pagination
                description: List of documents
                example:
                  memories:
                    - connectionId: conn_123
                      containerTags:
                        - user_123
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
                      status: done
                      summary: >-
                        A comprehensive guide to understanding the basics of
                        machine learning and its applications.
                      title: Introduction to Machine Learning
                      type: text
                      updatedAt: '1970-01-01T00:00:00.000Z'
                  pagination:
                    currentPage: 1
                    limit: 10
                    totalItems: 100
                    totalPages: 10
          description: Successfully retrieved documents
        '400':
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
          description: Invalid request
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