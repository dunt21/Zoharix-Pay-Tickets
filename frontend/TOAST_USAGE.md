# Toast Notification Component

## Usage

The Toast component is available globally through the `useToast` hook.

### Basic Usage

```tsx
import { useToast } from '../context/ToastContext';

function MyComponent() {
    const toast = useToast();

    const handleClick = () => {
        // Show different types of toasts
        toast.success('Operation completed successfully!');
        toast.error('Something went wrong!');
        toast.warning('Please review your input.');
        toast.info('New update available.');
    };

    return <button onClick={handleClick}>Show Toast</button>;
}
```

### Available Methods

```tsx
const toast = useToast();

// Success toast (green)
toast.success('User created successfully!');

// Error toast (red)
toast.error('Failed to save changes.');

// Warning toast (orange)
toast.warning('Your session will expire soon.');

// Info toast (blue)
toast.info('Check out our new features!');

// Custom duration (default is 3000ms)
toast.success('Quick message!', 1500);
toast.error('Longer message...', 5000);
```

### Example in a Form

```tsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const SignUpForm: React.FC = () => {
    const toast = useToast();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success('Account created successfully!');
            // Redirect or reset form
        } catch (error) {
            toast.error('Failed to create account. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};
```

### Features

- ✅ **4 Toast Types**: Success, Error, Warning, Info
- ✅ **Auto-dismiss**: Automatically closes after duration
- ✅ **Manual Close**: Click X button to dismiss
- ✅ **Smooth Animations**: Slide-in from right with fade
- ✅ **Stacking**: Multiple toasts stack vertically
- ✅ **Responsive**: Works on mobile and desktop
- ✅ **Theme-aware**: Adapts to dark/light mode
- ✅ **Icons**: Each type has a distinct icon
- ✅ **Color-coded**: Border color matches toast type

### Customization

You can customize the default duration when calling the toast:

```tsx
// Short duration (1.5 seconds)
toast.success('Quick notification!', 1500);

// Long duration (10 seconds)
toast.error('Important error message', 10000);

// Default duration (3 seconds)
toast.info('Standard notification');
```

### Toast Types & Colors

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| `success` | Green | ✓ | Successful operations |
| `error` | Red | ⚠ | Errors and failures |
| `warning` | Orange | ⚠ | Warnings and cautions |
| `info` | Blue | ℹ | General information |
