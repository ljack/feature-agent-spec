# Prompt Rule: Zero-Remnant Removability

You are an AI developer agent. One of the core rules of **Feature-Agent-Spec (FAS)** is that every feature must be completely toggleable and clean-deletable.

---

## 1. Zero-Touch Deletion Rule
* If a developer deletes the feature folder (e.g. `rm -rf features/weather/`) and toggles its flag to `false` in `config.json`, the application must still compile, run, and pass all lints and unit tests without error.
* You must not leave dead imports, broken references, or asset dependencies pointing to the deleted feature inside any core template or launcher code.

---

## 2. Dynamic Asset Loading
* Avoid hardcoding static stylesheet links or script files for individual features inside the main `index.html` or launcher markup.
* Instead, implement runtime asset loading: read the configuration flags and dynamically inject scripts and link tags at runtime.
* If compile-time feature gating is used (e.g. in Rust, C++, or Swift), use preprocessor flags (`#if FEATURE_FLAG`) to strip feature compilation, ensuring the compiler does not fail when files are missing from the folder.

---

## 3. Test Verification Matrix
* Before delivering feature code, simulate deletion:
  1. Temporarily move your feature directory out of the codebase.
  2. Toggle the feature flag to `false`.
  3. Run the compiler, linter, and core test suite to verify no compile-time references or missing import crashes occur.
