# Contributing to JanSeva AI Government Portal

Thank you for your interest in contributing to the JanSeva AI platform! We welcome contributions from developers, designers, data analysts, and open-source enthusiasts.

---

## Code of Conduct
By participating in this project, you agree to abide by our Code of Conduct: maintain a respectful, inclusive, and professional environment for all contributors.

---

## How to Contribute

### 1. Reporting Bugs
- Search existing issues to ensure the bug hasn't already been reported.
- Create a new issue describing:
  - Expected behavior vs actual behavior.
  - Steps to reproduce.
  - System environment (Browser, OS, Node.js version).

### 2. Suggesting Enhancements
- Open a feature request issue explaining the motivation and proposed implementation details.

### 3. Pull Request Process
1. Fork the repository and create a feature branch: `git checkout -b feature/your-feature-name`.
2. Follow standard coding guidelines (ESLint, clean comments, standard naming conventions).
3. Ensure both frontend (`npm test` in `client`) and backend (`npm test` in `server`) pass.
4. Commit changes with clean, concise commit messages.
5. Push to your branch and open a Pull Request against the `main` branch.

---

## Development Setup

```bash
# Clone project
git clone https://github.com/satyendrakachhawah3-gif/JanSeva-Government_Portal.git
cd JanSeva-Government_Portal

# Install dependencies
cd server && npm install
cd ../client && npm install

# Start backend & frontend concurrently
npm run dev
```
