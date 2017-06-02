# Install
```
git clone https://github.com/mbinet/searchJobs.git
cd searchJobs
npm install
```

## elasticSearch
```
npm install elasticsearch -g
```
run it with
``` elasticsearch ```

Now `node index.js` will index the data from dev_positions.json to elasticsearch


Finally, `node app.js` to launch the app.

You can now navigate to `http://localhost:3000/api/search/KEYWORD` to search trought all the job titles
