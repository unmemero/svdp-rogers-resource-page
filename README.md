# Society of Saint Vincent de Paul - Mother Theresa Conference - Rogers, AR

## Description
This page will serve to provide neighbors with a simple interface for neighbors to search additional local community resources for multiple tupes ofassistance. The focus is on simplicity and ease of use, since some of our neighbors may not be comfortable with computers or online search tools.The page will primarily have a focus for mobile view, since this is the type of device most neighbors will be using to access the page, with the minimum viable support for desktop and tablet. Must also include spanish toggle, since a large portion of our community are spanish speakers.

## Features and ownership

### What this project is intendet to support
- Provide list of local organizations that can help with things like food, housing, and other needs.
- Classify these organizations by category in order for simpler search
- Provide a way for users to search by keyword, that being org name, zip code (if available), or category within a single top search bar
- Have a full spanish translation
- Have an accessible way for members to update the resource list by placing each category in its own file, and each language in its own directory
- Provide uptime as per what GitHUb pages permits
- Maintain minimum viable support for desktop and tablet devices
- Provide a feedback button with the email of the conference (maybe mine, since I'll maintain it)
- Adjust based on what neighbors think on visits
- Categories array in case organization falls into multiple categories

### What we will not own
- Hosting outside of Github pages
- Resources outside of the Northwest Arkansas major area
- Guarantee uptime beyond what GitHub pages provides
- We do not guarantee that any resources listed will be available or will meet your specific needs. Advise the neighbors that they should use their own judgment when contacting and working with these organizations.
- We do not guarantee the accuracy of the information listed on this site. We will try to maintain and update the information, but we cannot guarantee that it will always be up to date. Advise the neighbors to call ahead when possible.

### Future features (not guaranteed)
- Tags for the organizations
- Additional organization details
- Support for more languages

## Tech stack
This app will be created using React with Vite and Typescript, and TailwindCSS for styling. The site will be hosted on Github pages.

## Design considerations
- The app will be mobile first
- The app must contain a single search bar where the application will search within the data in the categories, zip code, or org name fields of the resources data
- The data will be split into 2 directories: english and spanish, with a json file per category. Each JSON file will be an array of objects.
- The items will be loaded into a paginated view with 10, 20, 50 items per page.
- No filter buttons, no sort buttons, only a search bar, pagination, feedback button (just a button that opens ther email to send me an email, if we can put a subject when clicking that button it would be neat), and language toggle.
- The items will be displayed in a card format with the following fields:
    - Org name
    - Categories
    - Phone number (link style)
    - Address (if available)
    - Website (if available, use link style)
    - Email (if available, use link style)

### Directory structure
```
svdp_rogers_resource_page/
│
├── public/  # Static assets (logo, favicon, etc.)
│   ├── logo.png
│   └── favicon.ico
│
├── src/
│   ├── assets/  # Images, fonts, etc.
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── FeedbackButton.tsx
│   │   ├── Layout.tsx
│   │   └── Header.tsx
│   │
│   ├── data/
│   │   ├── categories.ts
│   │   ├── english/  # English JSON data files
│   │   │   ├── emergency-shelters.json
│   │   │   ├── food-pantries.json
│   │   │   ├── government-assistance.json
│   │   │   ├── mental-health.json
│   │   │   ├── medical-clinics.json
│   │   │   └── transportation.json
│   │   └── spanish/  # Spanish JSON data files
│   │       ├── refugios-emergencia.json
│   │       ├── despensas-alimentos.json
│   │       ├── asistencia-gobierno.json
│   │       ├── salud-mental.json
│   │       ├── clinicas-medicas.json
│   │       └── transporte.json
│   │
│   ├── hooks/
│   │   └── useSearch.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
├── package.json
└── README.md
```

### JSON data files
```js
[
    {
        "name": "Organization Name",
        "categories": ["Category 1", "Category 2"],
        "phone": "Phone Number",
        "address": "Address", # can be empty
        "website": "Website" # can be empty
        "email": "Email" # can be empty
    },
    {
        # New entry
    }
]
```

## Running
To run locally, you must have node installed. Before running the application, run
```bash
npm install
```
Then, to test the application locally, run
```bash
npm run dev
```

## Deploying
To deploy the application to GitHub Pages, run:
```bash
npm run deploy
```
This will automatically build the project (`npm run build`) and publish the `dist/` directory to the `gh-pages` branch.
