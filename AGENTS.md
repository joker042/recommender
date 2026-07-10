# Recommender Project — Agent Standing Orders

## Subagent Routing

This project has two optimized subagents for fast, cheap operations. Use them aggressively.

### flash-edit (deepseek-v4-flash)
Use for ANY of the following:
- Typo fixes, spelling, grammar
- Adding/removing single imports
- Single-function changes or additions
- Formatting, linting fixes
- Renaming a variable/function in one file
- Adding a comment or docstring
- Any change touching only ONE file

### flash-explore (deepseek-v4-flash)
Use for ANY of the following:
- Finding where something is defined
- Searching the codebase for patterns
- Listing files matching a glob
- Answering questions about existing code
- Reading and summarizing files
- Any read-only codebase exploration

### Build Agent (deepseek-v4-pro)
Reserve the main build agent for:
- Multi-file architectural changes
- New features spanning multiple files
- Complex logic requiring careful reasoning
- Database migrations
- Test suite additions

## Project Stack
- Backend: Express.js
- Frontend: React
- Database: PostgreSQL (shared, recommender_db)
- Port: 40000
- Working directory: /workspace/recommender

## Conventions
- Always commit changes with descriptive messages
- Push after committing
- Write tests for new functionality

### flash-docs (deepseek-v4-flash)
Use for ANY documentation or research task:
- Looking up API docs, library usage, or package details
- Finding official documentation for a tool/tech
- Researching how to implement something
- Reading spec pages or RFCs
- Any read-only research that requires web access
