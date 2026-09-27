# Marker

Club operations with a clear record. Member tabs, charge confirmation, and staff workflows built around an accountable ledger.

Status: Product in development · 2026
Access: Private project
Technologies: Next.js, TypeScript, PostgreSQL, Passkeys, PWA

## The context

Club transactions cross many touchpoints: a restaurant, a pro shop, a booking, a member’s tab. When identification and recordkeeping are fragmented, even a simple charge becomes hard to explain.

## The approach

- Created member, staff, and administration experiences around a shared charge ledger, with configurable modules for different club operations.
- Made member confirmation part of the transaction flow, with passkeys and alternative verification methods for practical service situations.
- Kept original charges intact: corrections are recorded as new entries, preserving the story of what happened instead of overwriting it.

Conceptual flow: Staff service → Member confirmation → Attributed ledger

## A key decision

Make accountability a property of the transaction model, not an extra report. Each charge keeps its attribution and verification context.

## The result

A modular product connecting service delivery, member visibility, disputes, and reporting around one ledger.

## Scope and limitations

An actively developed private product. Payment-provider integration remains future work; no commercial rollout or adoption figures are claimed here.

[Portfolio case study](https://solvin-it.github.io/projects/marker/)
