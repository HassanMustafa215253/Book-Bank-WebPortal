# ANS 1
## How to run

### Requirements
- Node.js
- Tailwind

### Steps on a fresh machine
1. Install Node.js from node.js website https://nodejs.org/en/download
2. Clone the repo.
3. Move to FrontEnd folder
    ```
    cd FrontEnd
    ```
4. Install frontend dependancies:
	```bash
	npm install
    npm install tailwindcss @tailwindcss/postcss postcss
	```
5. Update tailwind config
    NOTE: Update based on Tailwind version and installation method.
    Given below is for version 3 using postcss:

    In tailwind.config.js:
    ```
    /** @type {import('tailwindcss').Config} */
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }
    ```
6. Start the dev server:
	```bash
	npm run dev
	```
7. Open the app in your browser:
	- http://localhost:5173

# ANS 2
## Stack & design choices

### Why this frontend stack
- React + Vite: fast dev server and simple SPA routing for multiple admin pages.
- React Router: clear page separation (Dashboard, Inventory, Receivers, etc.) without a backend router.
- Tailwind CSS: rapid layout + spacing control for a dashboard-heavy UI with consistent tokens.

### Two specific visual/interaction decisions
1. Dashboard “System health / Needs action / Today” is a tabbed panel so high-level status fits in one card without scrolling. This keeps the admin's focus on the highest-priority insights while preserving context. 

2. Inventory uses an inline, collapsible form above the table so admins can add or edit books without losing the list context. It reduces navigation and keeps the most recent changes visible right after submit.

# ANS 3
## Responsive & accessibility

### 360px phone vs 1440px laptop
- On 360px, content stacks into a single column and tables become horizontally scrollable but the sapce is very tight. The sidebars remain of the same size htough the sidebar can be collapsed with the toggle to free width; in the top bar the space in center contracts. 

- On 1440px, the layout caps the page width so content doesn’t stretch too wide, and the Dashboard splits into multi-column grids for stats and panels. It is the standard display size for current website.

### Accessibility handled
- I have purposely kept the screen as minimalistic as possible while keeping all functionality required so that a professional enviroment is kept and screen is not filled with decorations. 

### Accessibility skipped
- I haven't made the website to adjust for the screen size as the project is supposed to be a webportal for a professional enviroment

# ANS 4
## AI Usage

- I asked copilot to make me a template of Inventory website page (with clear instructions for the intented need) so that I can skip writing basic template code and that same template could be used for other pages too. It gave me a WebApp instead of a webpage, that is it didnt follow a website's UI format that includes a header, side panel, a structured data representation; Rather is gave me three divs in center on a grid, one header, other for input and one showing table .I then edited the template myself for my intented usage by adding header, adding a side panel, changing the grid structure to flex as grid didnt made any sense for my usage.

- I asked codex to create fake data for me and align it with the Input/display functionality like use password/ITS states in login page to compare with data dictionary if user is present or not and if present then move next. It correctly gave me what I asked for creating wokring functions and data dictionary.

- I asked chatgpt to correct the color and text theme to match a Book donation theme.

# ANS 5
## Honest Gap

- There actually are several things I would like to edit in later days amoung which are the dashboard as it looks jumbled now. I do like the bookmark side panel but my intent may not be obvious to the user so that needs to be changed, some small bugs such as ass button takes a seperate row instead of sharing row with table header.

- But most of all I generally would like to edit my theme as though it has the book page look  right now looks very rigit mostly because of font and it dosent seem to have a professional working enviroment usage.