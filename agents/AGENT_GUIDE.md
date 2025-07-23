# AGENT_GUIDE.md

This document provides a comprehensive guide to the AI agent, its architecture, and how to use it effectively.

## 1. Overview

This agent is designed to automate software development tasks by analyzing the codebase, suggesting changes, and executing them upon approval. It is built with a modular architecture to allow for easy extension and customization.

## 2. Architecture

The agent is composed of several core components:

-   **`agent_core`**: The brain of the agent, responsible for analysis, planning, execution, and decision-making.
-   **`cli`**: The command-line interface for interacting with the agent.
-   **`integrations`**: Components for integrating with external tools and services, such as AST parsers and plugins.
-   **`guards`**: Safety mechanisms to prevent unintended consequences.
-   **`project_tasks`**: A system for managing and automating tasks defined in a `project_tasks.yaml` file.
-   **`sandbox`**: An environment to run the agent in isolation.

## 3. CLI Usage

The agent can be controlled through the `autodev` command-line tool:

-   `autodev agent run`: Analyzes the project and proposes a development plan.
-   `autodev assistant`: Provides an interactive assistant to help with specific tasks.

### Examples

-   `autodev assistant "propose improvements"`
-   `autodev assistant "analyze the main file"`

## 4. Plugin System

The agent supports a plugin system to extend its capabilities. To create a new plugin, you need to implement the `Plugin` interface defined in `integrations/plugins/interface.ts`.

## 5. Agent's Limitations

The agent's current capabilities are limited to:

-   Analyzing TypeScript projects.
-   Performing basic refactoring.
-   Understanding and updating `project_tasks.yaml`.

The agent does not yet understand natural language in depth and may require clear instructions to perform complex tasks.
