# Features Sandboxes Directory

All application capabilities must reside inside isolated subdirectories under this folder. 

---

## Sandbox Rules

1. **Self-Containment**: Every feature must contain all of its assets, styles, logic, specs, and tests in its folder.
2. **Import Lock**: Features must never import from other features.
3. **No Direct Core Integration**: Features must register themselves with the core hook registry. The core loop must not import feature files directly.
4. **Clean Deletability**: Deleting a feature folder and toggling its flag to `false` in `config.json` must be sufficient to remove it with zero remnants.
