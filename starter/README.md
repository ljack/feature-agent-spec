# Feature-Agent-Spec (FAS) Universal Project Starter Scaffold

Welcome to the universal starter scaffold for applications utilizing the **Feature-Agent-Spec (FAS)** design philosophy. 

This scaffold is **language-agnostic** and provides the directory guidelines, metadata manifests, and system prompts required to guide both **AI coding agents** and **human artisan developers** along the "Golden FASpath."

---

## 1. Directory Structure

```
starter/
├── FAS_MANIFEST.json        <-- Project boundaries & active hooks metadata
├── README.md                <-- Bootstrap guidelines
├── config.json              <-- Feature flags flags
├── core/                    <-- Core engine & orchestrator templates
│   ├── README.md            
│   ├── registry.template    <-- Abstract hook registry layout
│   └── state.template       <-- Abstract observable state layout
├── features/                <-- Sandboxed feature modules
│   ├── README.md
│   └── example_feature/     <-- Demo feature module
│       ├── README.md        <-- Feature requirements spec
│       ├── feature.template <-- Abstract feature entry point
│       └── styles.css       
└── .agent_rules/            <-- Instructions for AI coding agents
    ├── feature_isolation.md
    ├── zero_remnants.md
    └── boilerplate_registration.md
```

---

## 2. Bootstrapping Your Project in Any Language

Follow these steps to instantiate the scaffold in your chosen language/framework (e.g. TypeScript, Rust, Go, Python):

1. **Copy the directory structure**: Clone or copy this directory to your workspace.
2. **Translate Core Skeletons**:
   * Open [core/registry.template](core/registry.template) and implement the hook registrar in your target language.
   * Open [core/state.template](core/state.template) and implement the publisher/subscriber state system.
   * Construct a thin core launcher that reads `config.json` and imports the enabled features dynamically.
3. **Configure Boundary Rules**:
   * Map the rules inside [FAS_MANIFEST.json](FAS_MANIFEST.json) to your linter configuration.
   * In JavaScript/TypeScript, configure `eslint-plugin-import` restriction rules.
   * In Go or Rust, structure code into separate package sub-modules.
4. **Feed Rules to AI Agents**:
   * Copy the markdown documents inside [.agent_rules/](.agent_rules/) into your project's AI context instructions (e.g. `.cursorrules`, `.github/copilot-instructions.md`, or your agent's system prompt).

---

## 3. The Golden FASpath (Feature Lifecycle)

To add or modify code, always adhere to the following sequence:

1. **Specification First**: Write a `README.md` inside a new folder `/features/my_new_feature/` describing the inputs, outputs, UI segments, and lifecycle hooks of the feature.
2. **Sandbox Implementation**: Assign the AI agent to implement the feature logic entirely inside its folder.
3. **Configuration Registry**: Update `config.json` to register the new feature flag.
4. **Dynamic Loading**: Implement the core routing/loading loop to scan `config.json` and dynamically load the feature code.
5. **Matrix Verification**: Verify that the application compiles, runs, and passes tests with the feature set to `true`, and set to `false` (with the folder temporarily deleted).
