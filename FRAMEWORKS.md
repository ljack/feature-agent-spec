# Cross-Language Framework Directory (FEATURE_AGENT_SPEC-1.3.0)

This directory evaluates the top 5 web, mobile, and backend frameworks for each of the 10 most popular programming languages against the principles of **Feature-Agent-Spec (FAS)**:
1. **Feature Isolation**: Can features be sandboxed inside a folder without leaking dependencies?
2. **Flagging & Removability (Zero Remnants)**: Can a feature be deleted and flagged off with zero remnants?
3. **Decoupled Bootstrapping**: Can features register their routers, middlewares, and services via callbacks or hook registries?

---

## 1. Summary Matrix

| Language | Framework | FAS Score | Key Alignment | Scoping Boundary |
| :--- | :--- | :--- | :--- | :--- |
| **JS / TS** | Next.js | **9.0 / 10** | App Router Folders | `/app/features/` folder-based route scoping |
| | React | **8.5 / 10** | Component Sandboxes | Lazy component dynamic imports |
| | Angular | **9.0 / 10** | Lazy Loaded NgModules | Modular dynamic routes |
| | Vue.js | **8.5 / 10** | Single File Components | Component-level sandbox folders |
| | React Native | **8.0 / 10** | Module Assemblies | Packaged features, static Metro compilation |
| **Rust** | Axum | **8.5 / 10** | Dynamic Route Merging | Merged sub-routers in launcher config |
| | Actix-web | **8.5 / 10** | Service Config Closures | Dynamic scopes in registration block |
| | Tauri | **8.0 / 10** | Feature Gated IPC Commands | Crates or feature-gated command modules |
| | Yew | **8.0 / 10** | Component Scopes | Functional component properties |
| | Leptos | **8.0 / 10** | Asynchronous SSR Nodes | Sub-page island folders |
| **Go** | Gin-gonic | **8.0 / 10** | Router Groups registration | Package-level router registration functions |
| | Fiber | **8.0 / 10** | Express-like routing | Sub-app router mounting |
| | Echo | **8.0 / 10** | Handler Interface bindings | Interface-driven handler registers |
| | Beego | **7.5 / 10** | Automated Routing loops | MVC structure requires manual separation |
| | Buffalo | **7.5 / 10** | Monolithic app pipeline | Coupled config arrays |
| **Python** | Django | **8.5 / 10** | Isolated App Directories | `INSTALLED_APPS` dynamic registration |
| | FastAPI | **8.0 / 10** | APIRouter Mounting | Dynamic Router loop configuration |
| | Flask | **8.0 / 10** | Blueprint Modules | Dynamic registration of Blueprint models |
| | PySide/PyQt | **7.5 / 10** | Signal & Slot decoupling | Widget folder separation |
| | Kivy | **7.0 / 10** | Dynamic layout bindings | UI files require manual flagging |
| **C#** | ASP.NET Core | **8.0 / 10** | Razor Class Libraries (RCL)| DLL dynamic assembly scanning |
| | Blazor | **8.0 / 10** | Composable Components | Folder-based page routing imports |
| | .NET MAUI | **7.5 / 10** | Service registrations | Service registry containers |
| | Unity UI | **6.5 / 10** | Script Components | Coupled Scene graphs; prone to dead assets |
| | Uno Platform | **7.5 / 10** | XAML sub-modules | Module project separations |
| **Java** | Spring Boot | **8.0 / 10** | Conditional Property Gating| `@ConditionalOnProperty` configurations |
| | Quarkus | **8.0 / 10** | Build-time extensions | Modular build profiles |
| | Micronaut | **8.0 / 10** | Static DI compilation | Bean-definition profile matching |
| | Play Framework | **7.0 / 10** | Static routes file compilation | Hardcoded global routes config |
| | Android SDK (Java)| **7.5 / 10** | Gradle submodules | Hardcoded manifest declarations |
| **C++** | Qt | **5.5 / 10** | QPluginLoader + Dynamic QML| Dynamic library loads (`.so`/`.dll`) |
| | Drogon | **5.0 / 10** | Dynamic controller mapping | Dynamic runtime handlers |
| | Crow | **4.5 / 10** | Static route declarations | Header-coupled route definitions |
| | JUCE | **4.5 / 10** | Component modules | Statically linked C++ modules |
| | Wt | **4.5 / 10** | Widget-based layouts | Class-based template linking |
| **Swift** | SwiftUI | **8.5 / 10** | Composable View Builders | Dynamic View factory matrices |
| | UIKit | **7.5 / 10** | View Controllers | Coupled Storyboard interfaces |
| | Vapor | **8.0 / 10** | Dynamic Router collections | RouteCollection registrations |
| | Hummingbird | **8.0 / 10** | Modular middlewares | Middleware routing closures |
| | SPM Targets | **8.5 / 10** | Build Target Sandboxing | Package-level targets mapping |
| **Kotlin** | Jetpack Compose | **8.5 / 10** | Composable Views | Dynamic View factory matrices |
| | Compose Multi. | **8.0 / 10** | Platform sub-views | Target subfolder architectures |
| | Ktor | **8.0 / 10** | Dynamic Routing extension | Module extension routers |
| | Spring Kotlin | **8.0 / 10** | Gated bean profiles | Kotlin-specific conditional bindings |
| | Android SDK (Kotlin)| **7.5 / 10** | Dynamic Feature Modules | Play Feature Delivery configurations |
| **PHP** | Laravel | **8.5 / 10** | Service Provider Packages | Configuration-driven Provider arrays |
| | Symfony | **8.0 / 10** | Bundle Scoping | Bundle directory integration |
| | WordPress | **7.5 / 10** | Plugin Hook Frameworks | Active plugins DB flags |
| | Yii | **7.0 / 10** | MVC module directories | Module config bindings |
| | CodeIgniter | **6.5 / 10** | Monolithic MVC setups | Linked controller structures |

---

## 2. Key Framework Case Studies & Code Patterns

### 2.1. Next.js (TypeScript) — Score: 9.0 / 10
Next.js supports excellent folder-level routing boundaries via the App Router.
* **FAS Scoping**: Place all feature-specific sub-routes inside `/app/features/[feature_name]/`.
* **Zero Remnants**: Use dynamic path routing or configuration checking in layout files. 

*Example (Dynamic Next.js Sidebar Loader):*
```tsx
// app/features/config.ts
export const featureFlags = {
  weather: true,
  slideshow: false,
};

// app/layout.tsx
import { featureFlags } from './features/config';
import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(() => import('./features/weather/widget'), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>{children}</main>
        <aside>
          {featureFlags.weather && <WeatherWidget />}
        </aside>
      </body>
    </html>
  );
}
```

---

### 2.2. Django (Python) — Score: 8.5 / 10
Django is natively designed around **Apps** which establish strict folder boundaries.
* **FAS Scoping**: Every feature is a Django App (`/features/weather/`). It contains its own models, views, and urls.
* **Zero Remnants**: Register the app conditionally in `settings.INSTALLED_APPS` and include its routes in the main `urls.py` by scanning the configuration array.

*Example (Dynamic Django App Loader):*
```python
# config/features.py
ENABLED_FEATURES = [
    'features.weather',
]

# config/settings.py
from config.features import ENABLED_FEATURES

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ... Core Apps ...
] + ENABLED_FEATURES

# config/urls.py
from django.urls import path, include
from config.features import ENABLED_FEATURES
import importlib

urlpatterns = [
    path('admin/', admin.site.urls),
]

# Dynamically link feature sub-routes
for feature in ENABLED_FEATURES:
    try:
        # Verify urls.py exists inside feature before mounting
        importlib.import_module(f"{feature}.urls")
        feature_route_name = feature.split('.')[-1]
        urlpatterns.append(path(f"{feature_route_name}/", include(f"{feature}.urls")))
    except ImportError:
        pass
```

---

### 2.3. Spring Boot (Java) — Score: 8.0 / 10
Java Spring Boot uses Dependency Injection to conditionally load classes based on environment configuration.
* **FAS Scoping**: Feature code resides in isolated packages (`com.example.app.features.weather`).
* **Zero Remnants**: Enforced via `@ConditionalOnProperty`. If the configuration flag is set to `false`, Spring blocks instantiation of the classes, preventing memory bloat and API runtime routing exposure.

*Example (Conditional Spring Controller):*
```java
package com.example.app.features.weather;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ConditionalOnProperty(
    name = "features.weather.enabled",
    havingValue = "true",
    matchIfMissing = false
)
public class WeatherController {
    
    @GetMapping("/api/weather")
    public String getWeather() {
        return "{\"status\": \"sunny\"}";
    }
}
```

---

### 2.4. Laravel (PHP) — Score: 8.5 / 10
Laravel features are packaged as **Service Providers** that handle bootstrapping.
* **FAS Scoping**: The feature resides under `app/Features/Weather/` containing `WeatherServiceProvider.php`.
* **Zero Remnants**: The Service Provider is registered inside the config array or dynamically loaded in `app/Providers/AppServiceProvider.php` based on feature flag values.

*Example (Dynamic Laravel Provider Boot):*
```php
// app/Providers/AppServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $features = config('features.active');

        foreach ($features as $featureName => $isEnabled) {
            if ($isEnabled) {
                $providerClass = "\\App\\Features\\{$featureName}\\{$featureName}ServiceProvider";
                if (class_exists($providerClass)) {
                    $this->app->register($providerClass);
                }
            }
        }
    }
}
```

---

### 2.5. SwiftUI (Swift) — Score: 8.5 / 10
SwiftUI provides excellent declarative View composability.
* **FAS Scoping**: Swift package target or folder containing SwiftUI View and logic (`/Features/WeatherView.swift`).
* **Zero Remnants**: Composed inside the main container via conditional View generation using Type-Erased structures (`AnyView`).

*Example (SwiftUI Dynamic Feature Dashboard):*
```swift
import SwiftUI

// Core Registry Definition
struct Feature {
    let id: String
    let viewBuilder: () -> AnyView
}

class DashboardRegistry: ObservableObject {
    @Published var activeFeatures: [Feature] = []
    
    func register(id: String, builder: @escaping () -> AnyView) {
        activeFeatures.append(Feature(id: id, viewBuilder: builder))
    }
}

// Main UI Dashboard View
struct DashboardView: View {
    @ObservedObject var registry: DashboardRegistry

    var body: some View {
        ScrollView {
            VStack {
                ForEach(registry.activeFeatures, id: \.id) { feature in
                    feature.viewBuilder()
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(10)
                }
            }
        }
    }
}
```
