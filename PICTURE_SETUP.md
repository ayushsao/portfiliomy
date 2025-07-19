# How to Add Your Pictures to the Portfolio

## Steps to customize your portfolio with your own images:

### 1. Profile Picture (Hero Section)
- **Current file**: `public/placeholder-user.jpg`
- **What to do**: Replace this file with your own profile picture
- **Recommended size**: 400x400 pixels (square)
- **Format**: JPG, PNG, or WebP
- **Name suggestion**: Keep as `placeholder-user.jpg` or rename to `aks-profile.jpg`

If you rename it, update the code in `app/page.tsx` line ~151:
```tsx
src="/your-new-filename.jpg"
```

### 2. About Section Image
- **Current file**: `public/placeholder.jpg`
- **What to do**: Replace with a picture of your workspace, you coding, or any professional photo
- **Recommended size**: 800x600 pixels (landscape)
- **Format**: JPG, PNG, or WebP

### 3. Adding Your Pictures:
1. Copy your photos to the `public` folder
2. Make sure they have good quality and appropriate dimensions
3. Update the file paths in the code if you use different names

### 4. Logo "AKS":
- Already updated in the navigation
- Currently shows as "AKS" in the top-left corner
- Main heading also shows "AKS" instead of "John Doe"

### 5. Contact Information:
- Email: Currently set to `aks@example.com` (update with your real email)
- Location: Currently set to "Your Location" (update with your city/country)

## What's Been Updated:
✅ Logo changed from "Portfolio" to "AKS"
✅ Name changed from "John Doe" to "AKS"
✅ Profile picture setup with hover effects
✅ Contact info updated to use AKS
✅ Image components optimized with Next.js Image
✅ Improved styling for profile picture section

## Next Steps:
1. Add your actual photos to the `public` folder
2. Update contact information with real details
3. Customize the bio text in the About section
4. Add your real social media links
