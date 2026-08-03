# Git Branch Strategy

This document defines the Git workflow and branching strategy used in the Temaxing Scan project.

---

# 1. Branch Overview

The project follows a simplified Git Flow workflow suitable for small development teams.

```
main
│
├── develop
│     ├── dev-a
│     └── dev-b
```

---

# Git Branch Strategy

This document defines the Git workflow and branching strategy used in the Temaxing Scan project.

---

# 1. Branch Overview

The project follows a simplified Git Flow workflow suitable for small development teams.

```
main
│
├── develop
│     ├── dev-a
│     └── dev-b
```

---

# 2. Branch Purpose

## main

Purpose

- Production-ready code.
- Stable release branch.
- Never commit directly.

Protected

✅ Yes

Merge Source

- develop

---

## develop

Purpose

- Integration branch.
- Contains completed features from all developers.
- Used for sprint testing.

Protected

✅ Yes

Merge Source

- dev-a
- dev-b

---

## dev-a

Purpose

Developer A working branch.

Responsibilities

- Frontend
- URL Analysis Module
- Dashboard
- Landing Page
- History UI

---

## dev-b

Purpose

Developer B working branch.

Responsibilities

- Backend
- Authentication
- Database
- AI Integration
- REST API

---

# 3. Workflow

The standard workflow is shown below.

```
main
   ▲
   │
develop
 ▲     ▲
 │     │
dev-a dev-b
```

Development always starts from:

develop

Each developer works only on their own branch.

Completed work is merged into:

develop

After sprint validation:

develop → main

---

# 4. Daily Development Workflow

Step 1

Switch to develop.

```bash
git checkout develop
```

Update develop.

```bash
git pull origin develop
```

---

Step 2

Switch to personal branch.

Developer A

```bash
git checkout dev-a
```

Developer B

```bash
git checkout dev-b
```

---

Step 3

Synchronize with develop.

Developer A

```bash
git merge develop
```

Developer B

```bash
git merge develop
```

Resolve conflicts if necessary.

---

Step 4

Develop new features.

Example

```
Create URL Analysis Form

Create Login API

Implement Dashboard

Fix Authentication Bug
```

---

Step 5

Commit changes.

```bash
git add .

git commit -m "feat(url): add URL analysis form"
```

---

Step 6

Push changes.

Developer A

```bash
git push origin dev-a
```

Developer B

```bash
git push origin dev-b
```

---

Step 7

Create Pull Request.

```
dev-a → develop

or

dev-b → develop
```

---

Step 8

Code Review.

Checklist

- Code quality
- Naming convention
- No debugging code
- No merge conflict
- Feature works correctly

---

Step 9

Merge into develop.

After approval:

```
dev-a

↓

develop
```

or

```
dev-b

↓

develop
```

---

Step 10

Sprint Review.

Both developers test together.

If stable:

```
develop

↓

main
```

---

# 5. Branch Protection Rules

## main

Rules

- No direct commit
- No direct push
- Pull Request required
- Approval required

---

## develop

Rules

- No direct commit
- Pull Request required
- Feature testing before merge

---

## dev-a

Rules

- Developer A only

---

## dev-b

Rules

- Developer B only

---

# 6. Merge Strategy

Always use:

```
Squash and Merge
```

Reasons

- Cleaner history.
- Easier rollback.
- Smaller commit log.

---

# 7. Commit Convention

The project follows Conventional Commits.

Examples

Feature

```
feat(auth): implement login API
```

Bug Fix

```
fix(history): resolve pagination issue
```

Refactor

```
refactor(api): simplify response formatter
```

Documentation

```
docs(srs): update functional requirements
```

Style

```
style(button): adjust spacing
```

Test

```
test(auth): add login endpoint tests
```

Chore

```
chore(deps): update composer dependencies
```

---

# 8. Pull Request Naming

Feature

```
feat: URL Analysis Module
```

Bug

```
fix: Login Authentication
```

Refactor

```
refactor: Dashboard Component
```

Documentation

```
docs: Sprint 2 Update
```

---

# 9. Pull Request Checklist

Before creating a Pull Request:

- [ ] Latest develop has been merged.
- [ ] Project builds successfully.
- [ ] No linting errors.
- [ ] No console errors.
- [ ] Feature works correctly.
- [ ] Documentation updated if necessary.
- [ ] Commit messages follow Conventional Commits.

---

# 10. Merge Conflict Resolution

If a conflict occurs:

1. Pull the latest `develop`.
2. Merge `develop` into your branch.
3. Resolve all conflicts locally.
4. Test the application.
5. Commit the resolved changes.
6. Push the updated branch.
7. Reopen or update the Pull Request.

Never resolve merge conflicts directly on `main`.

---

# 11. Release Process

At the end of each sprint:

```
dev-a
    │
    ▼
develop
    ▲
    │
dev-b
    │
    ▼

↓

Sprint Testing

↓

develop

↓

main
```

Only stable code may be merged into `main`.

---

# 12. Branch Naming Rules

Permanent branches

```
main

develop

dev-a

dev-b
```

No additional long-lived branches are created during this project.

---

# 13. Best Practices

- Pull from `develop` before starting work.
- Commit small and focused changes.
- Push frequently to avoid losing work.
- Never force push to shared branches.
- Keep commits atomic (one logical change per commit).
- Review code before opening a Pull Request.
- Resolve conflicts immediately.
- Ensure the project builds before pushing.

---

# 14. Summary

| Branch | Owner | Purpose |
|----------|--------|----------|
| main | Team | Production-ready code |
| develop | Team | Integration branch |
| dev-a | Developer A | Frontend development |
| dev-b | Developer B | Backend development |

# 3. Workflow

The standard workflow is shown below.

```
main
   ▲
   │
develop
 ▲     ▲
 │     │
dev-a dev-b
```

Development always starts from:

develop

Each developer works only on their own branch.

Completed work is merged into:

develop

After sprint validation:

develop → main

---

# 4. Daily Development Workflow

Step 1

Switch to develop.

```bash
git checkout develop
```

Update develop.

```bash
git pull origin develop
```

---

Step 2

Switch to personal branch.

Developer A

```bash
git checkout dev-a
```

Developer B

```bash
git checkout dev-b
```

---

Step 3

Synchronize with develop.

Developer A

```bash
git merge develop
```

Developer B

```bash
git merge develop
```

Resolve conflicts if necessary.

---

Step 4

Develop new features.

Example

```
Create URL Analysis Form

Create Login API

Implement Dashboard

Fix Authentication Bug
```

---

Step 5

Commit changes.

```bash
git add .

git commit -m "feat(url): add URL analysis form"
```

---

Step 6

Push changes.

Developer A

```bash
git push origin dev-a
```

Developer B

```bash
git push origin dev-b
```

---

Step 7

Create Pull Request.

```
dev-a → develop

or

dev-b → develop
```

---

Step 8

Code Review.

Checklist

- Code quality
- Naming convention
- No debugging code
- No merge conflict
- Feature works correctly

---

Step 9

Merge into develop.

After approval:

```
dev-a

↓

develop
```

or

```
dev-b

↓

develop
```

---

Step 10

Sprint Review.

Both developers test together.

If stable:

```
develop

↓

main
```

---

# 5. Branch Protection Rules

## main

Rules

- No direct commit
- No direct push
- Pull Request required
- Approval required

---

## develop

Rules

- No direct commit
- Pull Request required
- Feature testing before merge

---

## dev-a

Rules

- Developer A only

---

## dev-b

Rules

- Developer B only

---

# 6. Merge Strategy

Always use:

```
Squash and Merge
```

Reasons

- Cleaner history.
- Easier rollback.
- Smaller commit log.

---

# 7. Commit Convention

The project follows Conventional Commits.

Examples

Feature

```
feat(auth): implement login API
```

Bug Fix

```
fix(history): resolve pagination issue
```

Refactor

```
refactor(api): simplify response formatter
```

Documentation

```
docs(srs): update functional requirements
```

Style

```
style(button): adjust spacing
```

Test

```
test(auth): add login endpoint tests
```

Chore

```
chore(deps): update composer dependencies
```

---

# 8. Pull Request Naming

Feature

```
feat: URL Analysis Module
```

Bug

```
fix: Login Authentication
```

Refactor

```
refactor: Dashboard Component
```

Documentation

```
docs: Sprint 2 Update
```

---

# 9. Pull Request Checklist

Before creating a Pull Request:

- [ ] Latest develop has been merged.
- [ ] Project builds successfully.
- [ ] No linting errors.
- [ ] No console errors.
- [ ] Feature works correctly.
- [ ] Documentation updated if necessary.
- [ ] Commit messages follow Conventional Commits.

---

# 10. Merge Conflict Resolution

If a conflict occurs:

1. Pull the latest `develop`.
2. Merge `develop` into your branch.
3. Resolve all conflicts locally.
4. Test the application.
5. Commit the resolved changes.
6. Push the updated branch.
7. Reopen or update the Pull Request.

Never resolve merge conflicts directly on `main`.

---

# 11. Release Process

At the end of each sprint:

```
dev-a
    │
    ▼
develop
    ▲
    │
dev-b
    │
    ▼

↓

Sprint Testing

↓

develop

↓

main
```

Only stable code may be merged into `main`.

---

# 12. Branch Naming Rules

Permanent branches

```
main

develop

dev-a

dev-b
```

No additional long-lived branches are created during this project.

---

# 13. Best Practices

- Pull from `develop` before starting work.
- Commit small and focused changes.
- Push frequently to avoid losing work.
- Never force push to shared branches.
- Keep commits atomic (one logical change per commit).
- Review code before opening a Pull Request.
- Resolve conflicts immediately.
- Ensure the project builds before pushing.

---

# 14. Summary

| Branch | Owner | Purpose |
|----------|--------|----------|
| main | Team | Production-ready production branch |
| develop | Team | Integration and sprint testing branch |
| dev-a | Developer A | Development branch for assigned features |
| dev-b | Developer B | Development branch for assigned features |