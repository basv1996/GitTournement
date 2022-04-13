const express = require('express')
const {
  graphql
} = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: {
    authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN
  },
})

module.exports = express
.Router()
  .get('/', function (req, res) {
    graphqlAuth(
        `query {
        repositoryOwner(login: "cmda-minor-web") {
          repository(name: "browser-technologies-2122") {
            forks(first: 100) {
              edges {
                node {
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        id
                        history {
                          totalCount
                        }
                      }
                    }
                  }
                  owner {
                    ... on User {
                      id
                      avatarUrl
                      login
                      name
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }`
      )
      .then((data) => {
        res.render('commits', {
          data: data.repositoryOwner.repository.forks.edges
        })
      })
  });
