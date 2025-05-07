<!-- filepath: /workspaces/demo-space/my-proto/workplans/1-overview.md -->
# Kanban Board Application Plan

This document outlines the features to be implemented for the Kanban board application, broken down into phases.

## Phased Workplan

### Phase 1: Basic Board Structure & Display ✅
- **Objective:** Display a static Kanban board with predefined columns and cards.
- **Tasks:**
    - ✅ Define data structures for cards and columns.
    - ✅ Render columns and their respective cards based on initial data.
    - ✅ Basic styling for readability.

### Phase 2: Card CRUD Operations ✅
- **Objective:** Allow users to create, read, update, and delete cards.
- **Tasks:**
    - ✅ **Add Cards:** Implement functionality to add new cards to a specific column. This will involve a form for card title and description.
    - ✅ **Edit Cards:** Allow users to modify the title and description of existing cards **directly in place within the card component**.
    - ✅ **Delete Cards:** Enable users to remove cards from the board.

### Phase 3: Column CRUD Operations
- **Objective:** Allow users to create, read, update, and delete columns.
- **Tasks:**
    - **Create Columns:** Implement functionality to add new columns to the board, including specifying a column title.
    - **Edit Columns:** Allow users to change the title of existing columns.
    - **Delete Columns:** Enable users to remove columns. Consideration needed for handling cards within a deleted column (e.g., move to a default column or delete them).

### Phase 4: Card Movement (Drag and Drop)
- **Objective:** Enable users to change the status of cards by moving them between columns.
- **Tasks:**
    - Implement drag-and-drop functionality for cards.
    - Update the underlying data when a card is moved to a new column.

### Phase 5: Card Labeling
- **Objective:** Allow users to categorize and filter cards using labels.
- **Tasks:**
    - **Add Labels to Cards:** Users should be able to assign one or more predefined labels (e.g., "bug", "feature", "urgent") to cards.
    - **Display Labels:** Show labels on cards.
    - **(Optional Sub-phase) Manage Labels:** Implement a system for users to create, edit, and delete the available labels.

## Future Considerations (Out of Scope for Initial Phased Build)
- User authentication and authorization
- Real-time collaboration
- Due dates and reminders
- Advanced filtering and search (beyond basic label filtering if implemented in Phase 5)
- Activity log / history
- Attachments to cards
