

Sass - .sccs
-----------
  - need to install node-sass, sass-loader
       npm install sass-loader node-sass --save-dev
  - need to add to package.json: scripts
       "sass": "sass --watch src:src/styles/scss:src/styles/css"

  - need to run in a separate terminal
      # sass --watch src/styles/scss:src/styles/css

      sass --watch src/styles/css


json-server
-----------

  https://medium.com/codingthesmartway-com-blog/create-a-rest-api-with-json-server-36da8680136d

  https://github.com/typicode/json-server

  - db.json has to be in the top-level (along with package.json) directory

  - need to run in a separate terminal
      json-server --port 4000 --watch db.json

redux
-----
tutorial: https://www.valentinog.com/blog/redux/

