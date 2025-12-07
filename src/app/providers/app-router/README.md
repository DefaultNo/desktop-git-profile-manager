# Application Routing System

Centralized routing system with typed routes, role-based protection, and nested layouts.

## Documentation

For complete routing system documentation, see:

**[Features - Routing System](../../../../docs/features/features-routing-system.md)**

## Quick Reference

### Basic Route
```typescript
{
  path: AppRouterKeys.HOME,
  element: <HomePage />,
  layout: MainLayout
}
```

### Protected Route
```typescript
{
  path: AppRouterKeys.PROFILE,
  element: <ProfilePage />,
  authOnly: true,
  roles: [UserRole.ADMIN]
}
```

### Navigation
```typescript
import { AppRouterKeys } from '@/app/providers/app-router'

// In components
<Link to={AppRouterKeys.PROFILE}>Profile</Link>

// Programmatic
navigate(AppRouterKeys.PROFILE)
```