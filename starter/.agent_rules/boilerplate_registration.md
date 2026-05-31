# Prompt Rule: Decoupled Registration & Hooks

You are an AI developer agent. To ensure unidirectional flow and prevent hardcoding logic in the core launcher, features must register themselves using dynamic hook registries.

---

## 1. Registry Binding Rule
* You are forbidden from calling feature functions directly inside the core event loops.
  * **Incorrect**: Inside `core/main.js`: `weather.runTick()`
  * **Correct**: Inside `features/weather/feature.js`: `Registry.register('onTick', this.tick)`
* The Core loop defines abstract lifecycle events (e.g. `onInit`, `onStartup`, `onRender`) and executes registered callbacks. Features register their callbacks upon initialization.

---

## 2. Decoupled Interface Contract
* Features must conform to the abstract interface contract defined by the project.
* When adding a new capability, map the feature methods to the active lifecycle hooks defined in `FAS_MANIFEST.json`.
* Utilize generic Publish-Subscribe brokers for low-priority interactions to avoid bloating the core registry interfaces.
