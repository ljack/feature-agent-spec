# Feature Spec: Example Feature

This is a template specification for a feature module inside the Feature-Agent-Spec repository. Human artisans and AI agents write and read this spec to implement the module inside its sandbox.

---

## 1. Goal & Requirements
A simple, isolated feature that registers to the application startup hook and displays a welcoming card in the user interface.

* **Trigger**: Automatically mounts when `onStartup` is executed by the core.
* **UI Presentation**: Inserts a glassmorphic card inside the main viewport.
* **Decoupling**: Consumes the global observer state to display the current application session count.

---

## 2. Interface Contract

* **Binds to Hook**: `onStartup`
* **Exposed Event Subscriptions**: Subscribes to `session:count` key in the global State Store.

---

## 3. UI Specifications
* **Structure**: A card containing a header and a dynamic session counter.
* **Styles**: Styles must live inside `styles.css` in this folder. Uses CSS variables from the core design system.
