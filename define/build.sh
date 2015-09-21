# watchify ./src/js/*.js -o ./public/js/main.js -v

watchify -t reactify ./src/js/components/routes.jsx -o ./public/js/main.js -v