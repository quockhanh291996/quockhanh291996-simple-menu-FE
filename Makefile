# Setup project
setup_project:
	npm install
	cat .env.example > .env

# Start project
start_project:
	npm start

# Start to check tslint
run_tslint:
	npm run tslint

# Build static file for production
build:
	npm build

# Run the demo for simple menu
run_demo:
	make setup_project
	make start_project

