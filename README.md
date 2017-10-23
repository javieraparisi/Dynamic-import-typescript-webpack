# dynamic import typescript webpack

motivation: dynamically import typescript by namespaces

Solution:
Each ts file generates a namespace with its folder path, we call always to same namespace and gulp choose the correct ts file, the entry points are named 'bootstraper.ts'

## Setup

    > npm i
    > gulp
    > webpack
