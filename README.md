# 🎥 Movie Explorer App
This is a React application that lets you search for movies and mark your favorites using the OMDb API. You can browse movie details, add favorites, and load more results with pagination.

## 🚀 Getting Started
I began this project by setting up the development environment using Vite for a fast and modern React setup. I then installed Material UI to incorporate a few icons used throughout the app.
After initializing the project, I created a GitHub repository to manage version control and track changes.
To fetch movie data, I registered for a free API key from the OMDb website, which was sent to my email. 

After that was the process of creating the different react components. I created a header, search, card and card list components. The search component lets you search OMDb by movie title. 
Every movie card gets the title, poster, release date, genre and the plot data from OMDb. The movie card also has a favorite icon that lets you add these movies to the favorite section. 
The favorite movies are saved locally in the browser localStorage. 

I have also added pagination as you can load more movies by clicking on the load more button. As for styling I have used CSS modules. 
In the end I deployed this project to github pages. 

## 🧩 Features
- Search Movies: Search for movies by title using the OMDb API.
- Movie Details: Each movie card displays the title, poster, release year, genre, and a short plot summary.
- Favorites: Mark movies as favorites using a heart icon. Favorites are saved in the browser’s localStorage for persistence.
- Pagination: Load more results by clicking the Load More button.
- Styling: Styled using CSS Modules for scoped and maintainable styles.
- Deployment: The app is deployed on GitHub Pages.

## 📦 Components
- Header: Displays the app title and navigation.
- SearchBar: Allows users to input search queries.
- MovieCard: Shows individual movie details and favorite toggle.
- MovieList: Renders a list of movie cards.
