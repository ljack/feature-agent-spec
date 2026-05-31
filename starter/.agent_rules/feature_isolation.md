# Prompt Rule: Strict Feature Isolation

You are an AI developer agent tasked with implementing or modifying code in this codebase. You must adhere to the following **Feature-Agent-Spec (FAS)** isolation rules without exception:

---

## 1. Directory Boundaries
* **Feature Sandbox**: Every feature lives inside its own self-contained directory (e.g. `features/my_feature/`). All files, components, helpers, assets, styles, and unit tests must remain inside that folder.
* **No Direct Core Modifications**: You are forbidden from modifying files in the `core/` directory to support feature-specific logic. The core must remain generic and unaware of individual features.
* **No Cross-Talk**: Files in `features/feature_a/` are strictly forbidden from importing or referencing files in `features/feature_b/`.

---

## 2. Decoupled Communication
* If Feature A needs to communicate with Feature B, they must use the unidirectional global Event Bus/State Store exposed by the Core:
  * **Incorrect**: `import { updateElevation } from '../elevation/feature.js'`
  * **Correct**: `StateStore.publish('route:updated', newCoords)`
* If Feature A needs to query shared stateless helper logic:
  * Use helpers inside `core/utils/` if they are pure, stateless, and standard.
  * If a helper is small (< 15 lines of code) and specific to your task, replicate it locally inside your sandbox folder rather than coupling with other features.

---

## 3. Compliance Verification
* Before completing your task, verify that no imports or static dependencies bridge separate feature directories.
