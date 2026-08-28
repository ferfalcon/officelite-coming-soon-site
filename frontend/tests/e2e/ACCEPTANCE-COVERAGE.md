# P04-T02 Acceptance-Criteria Coverage

This file maps the approved Officelite acceptance criteria to the regression evidence owned by the frontend test suite. It is implementation-owned validation documentation, not a new product specification.

Browser engines used by Playwright are engineering regression evidence only; this map does not establish a formal product browser-support matrix.

## Evidence sources

- `foundation.spec.ts`: local foundations, font/assets, baseline focus and overflow.
- `navigation.spec.ts`: Home hierarchy, conversion actions, plan handoff, countdown runtime behavior, keyboard focus, and Home responsive behavior.
- `signup.spec.ts`: plan state, native select behavior, validation, IndexedDB success/failure, network safety, keyboard/focus, status semantics, and Sign Up responsive behavior.
- `responsive.spec.ts`: cross-route reflow, content-fit transitions, Figma shell geometry, long-content behavior, and viewport containment.
- Manual supplemental evidence is limited to visual/native-platform/assistive-semantic checks that browser assertions cannot fully represent. These items do not introduce unsupported product policy.

## Coverage map

| Acceptance criteria | Validation path | Evidence |
|---|---|---|
| `AC-001–AC-004` | Automated + manual Figma continuity | Home/Sign Up hierarchy and responsive availability; compact/medium/large reference compositions |
| `AC-005–AC-011` | Automated | Direct activation of hero, all pricing, and countdown CTAs; plan handoff/defaults; native select pointer + keyboard behavior |
| `AC-012–AC-018` | Automated | Five-value IndexedDB record inspection; invalid submissions prove zero IndexedDB opens; corrected valid submit opens storage; no sign-up network request |
| `AC-019–AC-023` | Automated + semantic inspection | Success/failure status visibility, polite atomic status semantics, retained values, unchanged focus, ordinary retry |
| `AC-024–AC-025` | Automated | Countdown values change while active; Home and Sign Up expose the same target instant and label |
| `AC-026–AC-033` | Automated + semantic inspection | Sign Up logo keyboard/pointer return; full keyboard order; visible focus; success/failure status semantics; labels and error relationships |
| `AC-034–AC-036` | Automated + manual Figma continuity | Cross-route 320–1800px sweep, content-fit transition boundaries, no application-created horizontal overflow |
| `AC-037–AC-043` | Automated + manual | DOM hierarchy/order, responsive action availability, Sign Up logical order; Pro visual emphasis verified against runtime styling and approved visual evidence |
| `AC-044–AC-048` | Automated | Basic/Pro/Ultimate pricing activation plus generic/direct entry produce deterministic selected plan |
| `AC-049–AC-052` | Automated | One-second runtime tick, shared target, no fetch/XHR launch service, values demonstrably not frozen to the static design example |
| `AC-053–AC-054` | Automated | Long marketing, billing, feature, validation, and status copy reflows without clipping; cards/forms grow as needed |
| `AC-055–AC-065` | Automated + manual Figma continuity | Compact/medium/large geometry, 703/704 and 1189/1190 transition brackets, narrow/wide smoke, supplied reference compositions |
| `AC-066–AC-070` | Automated | Home conversion actions activate to Sign Up; plan/default context preserved; Sign Up logo activates by keyboard and pointer with visible focus |
| `AC-071–AC-073` | Automated + manual native-platform inspection | Native `<select>` exposes all plans; pointer and keyboard selection update current value; popup presentation remains browser/platform-owned |
| `AC-074–AC-077` | Automated | Empty/invalid-email submissions prove zero IndexedDB opens; valid submission opens IndexedDB; no remote sign-up request |
| `AC-078–AC-082` | Automated | Success/failure outcomes, programmatic status, retained values, focus retention, and normal retry |
| `AC-083–AC-090` | Automated + semantic inspection | Full keyboard-only sequence, native select keyboard change, visible focus on every required control, invalid + focus distinction, programmatic labels and error association |
| `AC-091–AC-095` | Automated + manual | Status live-region semantics/no forced focus; countdown ticks in a non-live subtree; cross-route reflow and required-element viewport containment; decorative composition continuity |
| `AC-096–AC-101` | Automated | Stored record contains exactly the five current-release values; plan remains in approved domain; IndexedDB is browser-local; network remains inert |
| `AC-102–AC-107` | Automated | Required-field and HTML single-address email blocking, field-specific feedback, and correction recovery |
| `AC-108–AC-110` | Automated | Forced IndexedDB failure shows failure only, preserves values, and permits ordinary retry that later succeeds |

## Manual supplemental checks

The manual portion is deliberately narrow:

- Pro plan visual emphasis remains distinct while Basic and Ultimate stay visible/actionable.
- The native plan popup is accepted as browser/platform presentation rather than replaced with a custom menu.
- All five Sign Up controls retain programmatic labels and stable error relationships.
- Persistence feedback remains a polite atomic status region and does not force focus movement.
- Countdown values update in a non-live subtree, preventing each visual tick from becoming a live-region announcement.
- Supplied Figma compositions remain the visual reference for compact, medium, and large layouts.
- Decorative artwork may clip at narrow widths only when required content remains readable, reachable, and unobstructed.

Every approved criterion from `AC-001` through `AC-110` is covered above; no criterion is silently omitted.
