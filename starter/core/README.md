# Core Directories: Skeletons & Skeletons

This directory contains the central orchestrator and communication interfaces of the application. 

The core modules represent the system infrastructure. They coordinate execution lifecycles, manage global decoupled state, and resolve dynamic configuration loading, but contain **zero feature-specific domain logic**.

---

## Skeletons & Skeletons

To implement the core in your chosen programming language, follow the pseudo-code templates provided:

1. **[core/registry.template](registry.template)**: The dynamic event registrar. Translate this to your language to manage feature lifecycle callbacks (`register`, `trigger`).
2. **[core/state.template](state.template)**: The observable state store. Translate this to a class or module to broadcast global states without coupling separate features.
3. **Core Launcher (`core/app.js` or `core/main`)**:
   * Reads `config.json` at startup.
   * Loads enabled features dynamically.
   * Runs the main event loop, executing the registered feature hooks during corresponding lifecycle phases.
