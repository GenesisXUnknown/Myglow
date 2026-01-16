# CLAUDE.md - AI Assistant Guide for Myglow

**Last Updated:** 2026-01-16
**Repository Status:** Newly initialized (no commits yet)

This document serves as a comprehensive guide for AI assistants (like Claude) working on the Myglow project. It contains critical information about codebase structure, development workflows, and conventions to follow.

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflow](#development-workflow)
4. [Git Conventions](#git-conventions)
5. [Code Conventions](#code-conventions)
6. [Testing Strategy](#testing-strategy)
7. [AI Assistant Guidelines](#ai-assistant-guidelines)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## Repository Overview

### Current State

**Status:** Empty repository - No project files have been committed yet.

This repository is in its initial state. As the project develops, update this section with:
- Project description and purpose
- Technology stack
- Target platform(s)
- Key features and capabilities

### Repository Information

- **Remote:** `http://local_proxy@127.0.0.1:37328/git/GenesisXUnknown/Myglow`
- **Working Directory:** `/home/user/Myglow`
- **Platform:** Linux 4.4.0

---

## Codebase Structure

### Directory Organization

_To be documented as project structure is established._

Expected structure template:
```
Myglow/
├── src/                    # Source code
├── tests/                  # Test files
├── docs/                   # Documentation
├── config/                 # Configuration files
├── scripts/                # Build and utility scripts
└── [other directories]
```

### Key Files and Their Purposes

_Document important files as they are created:_

| File | Purpose | Notes |
|------|---------|-------|
| _TBD_ | | |

### Entry Points

_Document main entry points when established:_
- Main application entry: _TBD_
- Test entry: _TBD_
- Build entry: _TBD_

---

## Development Workflow

### Branch Strategy

**Important:** This repository uses a specific branch naming convention for Claude-assisted development:

- **Feature branches:** `claude/claude-md-<session-id>`
- **Current branch:** `claude/claude-md-mkha8ic4y4tq6h0s-raPb6`

#### Branch Naming Rules

1. All Claude development branches MUST start with `claude/`
2. Branch names MUST end with the matching session ID
3. Pushing to branches that don't follow this pattern will fail with HTTP 403

### Development Process

1. **Start Work:**
   - Ensure you're on the correct Claude branch
   - Create the branch locally if it doesn't exist
   - Fetch latest changes: `git fetch origin <branch-name>`

2. **Make Changes:**
   - Follow code conventions (see below)
   - Write tests for new functionality
   - Update documentation

3. **Commit Work:**
   - Use clear, descriptive commit messages
   - Follow commit message conventions (see below)
   - NEVER skip hooks unless explicitly requested

4. **Push Changes:**
   - Always use: `git push -u origin <branch-name>`
   - CRITICAL: Branch must follow naming pattern or push fails
   - Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s) if network errors occur

### Environment Setup

_To be documented as build requirements are established._

---

## Git Conventions

### Commit Messages

Follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**
```
feat(auth): add user authentication system

Implement JWT-based authentication with refresh tokens.
Includes login, logout, and token validation endpoints.

Closes #123
```

```
fix(api): resolve null pointer exception in user handler

Added null check before accessing user properties.
```

### Git Safety Protocol

**NEVER:**
- Update git config without explicit user request
- Run destructive commands (force push, hard reset) without confirmation
- Skip hooks (--no-verify, --no-gpg-sign) unless explicitly requested
- Force push to main/master branches
- Commit files with secrets (.env, credentials.json, etc.)

**Amending Commits:**
Only use `git commit --amend` when ALL conditions are met:
1. User explicitly requested amend, OR commit succeeded but pre-commit hook auto-modified files
2. HEAD commit was created by you in this conversation
3. Commit has NOT been pushed to remote

**CRITICAL:** If commit failed or was rejected by hook, NEVER amend - fix the issue and create a NEW commit.

### Pull Request Process

When creating PRs:

1. **Analyze Changes:**
   - Run `git status` to see untracked files
   - Run `git diff` to see changes
   - Run `git log` and `git diff [base-branch]...HEAD` to understand full commit history

2. **Draft PR Summary:**
   - Look at ALL commits being included, not just the latest
   - Write clear summary of changes (1-3 bullet points)
   - Include test plan with checklist

3. **Create PR:**
   ```bash
   gh pr create --title "PR title" --body "$(cat <<'EOF'
   ## Summary
   - Change 1
   - Change 2

   ## Test plan
   - [ ] Test case 1
   - [ ] Test case 2
   EOF
   )"
   ```

---

## Code Conventions

### General Principles

1. **Avoid Over-Engineering:**
   - Only make changes that are directly requested or clearly necessary
   - Keep solutions simple and focused
   - Don't add features beyond what was asked
   - Don't add comments where logic is self-evident

2. **No Premature Abstraction:**
   - Don't create helpers/utilities for one-time operations
   - Three similar lines of code is better than a premature abstraction
   - Don't design for hypothetical future requirements

3. **Security:**
   - Avoid OWASP Top 10 vulnerabilities:
     - Command injection
     - XSS (Cross-Site Scripting)
     - SQL injection
     - Insecure deserialization
     - etc.
   - Only validate at system boundaries (user input, external APIs)

4. **Error Handling:**
   - Don't add error handling for scenarios that can't happen
   - Trust internal code and framework guarantees
   - Only handle errors at appropriate boundaries

### Language-Specific Conventions

_To be documented as the project's primary language(s) are established._

### File Organization

_Document file organization patterns:_
- Naming conventions
- Module structure
- Import/export patterns
- File size guidelines

### Documentation Standards

- **Code Comments:** Only where logic isn't self-evident
- **Function Documentation:** _TBD based on language_
- **Inline Documentation:** Explain "why" not "what"

---

## Testing Strategy

### Test Organization

_To be documented when testing framework is chosen._

### Running Tests

_Document test commands:_
```bash
# Run all tests
# TBD

# Run specific test
# TBD

# Run with coverage
# TBD
```

### Test Conventions

- Write tests for new functionality
- Update tests when modifying existing features
- Ensure tests pass before committing
- Aim for meaningful test coverage, not arbitrary percentages

---

## AI Assistant Guidelines

### Before Making Changes

1. **ALWAYS read files before modifying them**
   - NEVER propose changes to code you haven't read
   - Understand existing code before suggesting modifications

2. **Use appropriate tools:**
   - Use `Read` for reading files (not `cat`)
   - Use `Edit` for editing files (not `sed/awk`)
   - Use `Write` for creating new files (not `echo` or heredocs)
   - Use `Grep` for searching (not `grep` or `rg` commands)
   - Use `Glob` for finding files (not `find`)

3. **Explore systematically:**
   - Use Task tool with `Explore` agent for understanding codebase structure
   - Use Task tool for multi-step research that requires multiple searches

### Task Management

1. **Use TodoWrite for planning:**
   - Create todos for complex multi-step tasks
   - Break down large tasks into smaller steps
   - Mark tasks as in_progress BEFORE starting work
   - Mark tasks as completed IMMEDIATELY after finishing

2. **One task at a time:**
   - Only ONE task should be in_progress at any time
   - Complete current task before starting new ones
   - Don't batch up multiple completions

### Code Changes

1. **Avoid unnecessary changes:**
   - Don't add docstrings/comments to unchanged code
   - Don't refactor surrounding code during bug fixes
   - Don't add extra configurability to simple features
   - No backwards-compatibility hacks (delete unused code completely)

2. **Security first:**
   - Review code for security vulnerabilities
   - If you write insecure code, immediately fix it
   - Validate user input at boundaries

3. **Commit discipline:**
   - Only commit when explicitly requested
   - Use git heredoc format for commit messages
   - Don't commit secret files
   - Follow the git safety protocol above

### Communication

1. **Be concise:**
   - Output is displayed in CLI
   - Keep responses short and focused
   - Use Github-flavored markdown
   - Don't use emojis unless requested

2. **Code references:**
   - Use format: `file_path:line_number`
   - Example: "Error handling occurs in `src/app.js:142`"

3. **Ask when unclear:**
   - Use AskUserQuestion tool for clarification
   - Don't guess or make assumptions
   - Validate understanding before major changes

### Parallel Operations

When possible, run independent operations in parallel:
- Multiple file reads
- Independent git commands
- Parallel searches

Example:
```
# Run these in parallel (single message, multiple tool calls):
- git status
- git diff
- git log

# Run these sequentially (dependencies):
git add . && git commit -m "message" && git push
```

---

## Common Tasks

### Starting a New Feature

1. Ensure you're on the correct Claude branch
2. Understand requirements (ask questions if needed)
3. Create todo list for multi-step features
4. Read relevant existing code
5. Implement changes following conventions
6. Test thoroughly
7. Commit with clear message
8. Push to branch

### Fixing a Bug

1. Read the file containing the bug
2. Understand the root cause
3. Implement the minimal fix
4. Don't refactor surrounding code
5. Test the fix
6. Commit and push

### Adding Documentation

1. Only create documentation files if explicitly requested
2. NEVER proactively create README.md or other docs
3. Keep documentation accurate and up-to-date
4. Focus on "why" and "how", not just "what"

### Creating a Pull Request

1. Run git status, diff, and log in parallel
2. Analyze ALL commits in the PR
3. Draft comprehensive summary
4. Include test plan
5. Use `gh pr create` with heredoc format
6. Return PR URL to user

---

## Troubleshooting

### Git Push Failures

**Problem:** Push fails with HTTP 403

**Solution:** Ensure branch name:
- Starts with `claude/`
- Ends with matching session ID
- Current valid pattern: `claude/claude-md-mkha8ic4y4tq6h0s-raPb6`

**Problem:** Network errors during push

**Solution:** Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Build Issues

_To be documented as build system is established._

### Test Failures

_To be documented as test framework is established._

---

## Project Evolution

As this project develops, remember to update this document with:

1. **Technology Stack:** Languages, frameworks, libraries
2. **Architecture Decisions:** Key design choices and rationale
3. **API Documentation:** Endpoints, contracts, examples
4. **Deployment Process:** How to deploy to various environments
5. **Dependencies:** External services, APIs, databases
6. **Configuration:** Environment variables, config files
7. **Performance Considerations:** Optimization guidelines
8. **Security Practices:** Auth, authorization, data protection

---

## Quick Reference

### Essential Commands

```bash
# Check git status
git status

# See changes
git diff

# Commit changes
git commit -m "$(cat <<'EOF'
type(scope): subject

body
EOF
)"

# Push to branch
git push -u origin claude/claude-md-mkha8ic4y4tq6h0s-raPb6

# Create PR
gh pr create --title "Title" --body "Body"
```

### File Paths

- **Working Directory:** `/home/user/Myglow`
- **This File:** `/home/user/Myglow/CLAUDE.md`

### Contact & Resources

- **Issues:** Report problems via project issue tracker
- **Documentation:** Keep all docs in version control
- **Questions:** Ask user before making assumptions

---

**Note to AI Assistants:** This document is your primary reference for working on this project. Always consult it before making significant changes. Keep it updated as the project evolves. When in doubt, ask the user for clarification rather than making assumptions.
