# UI Design and Component Structure

## Overall Layout
The application will have a responsive layout with two main sections:

1. **Main Form Area** (left/top on mobile)
   - Business information input
   - Personality selection
   - Knowledge base input
   - Launch button

2. **Preview Panel** (right/bottom on mobile)
   - Simulated chat interface
   - Live updates based on form inputs
   - Mobile device frame for realistic preview

## Component Hierarchy
```
App
├── Header
├── MainContainer
│   ├── FormPanel
│   │   ├── BusinessInfoForm
│   │   │   ├── BusinessNameInput
│   │   │   ├── IndustrySelect
│   │   │   └── DescriptionTextarea
│   │   ├── PersonalitySelector
│   │   │   └── PersonalityOption (multiple)
│   │   ├── KnowledgeBaseInput
│   │   │   ├── InputMethodTabs
│   │   │   ├── TextInput
│   │   │   ├── UrlInput
│   │   │   └── JsonInput
│   │   └── LaunchButton
│   └── PreviewPanel
│       ├── DeviceFrame
│       │   └── ChatInterface
│       │       ├── ChatHeader
│       │       ├── MessageList
│       │       │   ├── UserMessage (multiple)
│       │       │   └── BotMessage (multiple)
│       │       └── ChatInput
│       └── EmbedCodeDisplay
└── Footer
```

## Color Scheme
- Primary: #FFFFFF (White background)
- Secondary: #F8F9FA (Light gray for panels)
- Accent: #FFD700 (Gold for buttons and highlights)
- Text: #212529 (Dark gray/black for text)
- Success: #28A745 (Green for success indicators)
- Info: #17A2B8 (Blue for information)

## Typography
- Primary Font: 'Inter', sans-serif (clean, modern)
- Headings: 'Inter', sans-serif (bold weight)
- Body: 'Inter', sans-serif (regular weight)
- Monospace: 'Roboto Mono', monospace (for code snippets)

## Responsive Breakpoints
- Mobile: < 768px (stacked layout)
- Tablet: 768px - 1024px (side-by-side with adjusted proportions)
- Desktop: > 1024px (optimal side-by-side layout)

## Key UI Elements

### Business Information Form
- Clean, minimal input fields
- Subtle validation indicators
- Autosave functionality

### Personality Selector
- Visual selector with icons representing each personality
- Brief description of each personality type
- Real-time preview update on selection

### Knowledge Base Input
- Tabbed interface for different input methods
- Drag-and-drop file upload option
- Code editor style for JSON input
- URL validation for web sources

### Chat Preview
- Realistic chat bubble styling
- Typing indicators
- Timestamp displays
- Avatar placeholders

### Launch Button
- Prominent gold button (#FFD700)
- Black text for contrast
- Hover and click animations
- Success state transition

### Embed Code Display
- Syntax-highlighted code box
- Copy button
- Preview of how it will look embedded
