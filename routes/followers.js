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
                  owner {
                    ... on User {
                      avatarUrl
                      login
                      name
                      url
                      followers {
                        totalCount
                      }
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
        res.render('followers', {
          data: data.repositoryOwner.repository.forks.edges
        })
      })
  });
