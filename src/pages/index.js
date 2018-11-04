import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: apps } = data.allMarkdownRemark;

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Apps</h1>
            </div>
            {apps.map(({ node: app }) => (
              <div
                className="content"
                style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
                key={app.id}
              >
                <p>
                  <Link className="has-text-primary" to={app.fields.slug}>
                    {app.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <small>{app.frontmatter.date}</small>
                </p>
                <p>
                  {app.excerpt}
                  <br />
                  <br />
                  <Link className="button is-small" to={app.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "menu-app" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
