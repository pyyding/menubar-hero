import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";

export const MenuAppTemplate = ({ description, tags, title }) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

MenuAppTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array
};

const MenuApp = ({ data }) => {
  const { markdownRemark: app } = data;

  return (
    <Layout>
      <MenuAppTemplate
        description={app.frontmatter.description}
        tags={app.frontmatter.tags}
        title={app.frontmatter.title}
      />
    </Layout>
  );
};

MenuApp.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default MenuApp;

export const pageQuery = graphql`
  query MenuAppByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
