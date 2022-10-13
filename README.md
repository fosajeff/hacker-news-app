## Hacker News Full stack app

The goal is to make a web app to make it easier to navigate the Hacker News

This project consists of two internal projects:

- _*hackernews*_: the Django project main directory, then _api_ containing the REST API along with all the backend code;
- _*frontend*_: the React project with all the dependencies in a package.json, settings and things related to the frontend.

## Testing the live project

Live demo:

- Frontend: [https://hackanews.netlify.app](https://hackanews.netlify.app)
- Backend: [https://hackanews.herokuapp.com/api](https://hackanews.herokuapp.com/api)
- Github code: [https://github.com/fosajeff/hacker-news-app](https://github.com/fosajeff/hacker-news-app)

## Running the project locally

In order to run the projects locally you need to have Node, npm and `python3` installed on your machine.

First, create a Python virtual environment to isolate the projects:

```bash
python3 -m venv logrocket_env
```

Then, activate it:

```bash
source logrocket_env/bin/activate
```

`cd` into the _*venv*_ and clone the project from GitHub:

```bash
git clone https://github.com/fosajeff/hacker-news-app.git
```

`cd` into the _*hacker-news-app*_ folder and install all dependencies for the backend:

```bash
pip install -r requirements.txt
```

`cd` into the _*hacker-news-app/frontend*_ folder and install all dependencies for the frontend:

```bash
npm install
```

`cd` back the _*hacker-news-app*_ folder and start the python server:

```bash
python manage.py runserver
```

Finally, inside the _*hacker-news-app/frontend*_ folder, start the app:

```bash
npm start
```

That's it!

Access the api at http://localhost:8000/api
Access the site at http://localhost:3000
