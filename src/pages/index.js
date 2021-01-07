import React, { useState, useEffect } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "../components/image";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              facebook
              github
              image
              intro
              linkedin
              location
              name
              slug
              title
              twitter
              website
              availableForProjects
            }
            id
          }
        }
      }
    }
  `);

  const allPeople = data.allMdx.edges;

  // https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial

  const emptyQuery = "";
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  });

  const handleInputChange = (event) => {
    const query = event.target.value;
    console.log(query);
    const people = allPeople || [];
    const filteredData = people.filter(
      ({ node }) => node.frontmatter.availableForProjects !== null
    );
    console.log(filteredData);
    setState({
      query,
      filteredData,
    });
  };

  // https://www.erichowey.dev/writing/load-more-button-and-infinite-scroll-in-gatsby/

  const [list, setList] = useState([...allPeople.slice(0, 10)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allPeople.length > 10);
  const handleLoadMore = () => {
    setLoadMore(true);
  };
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < allPeople.length;
      const nextResults = isMore
        ? allPeople.slice(currentLength, currentLength + 10)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]); //eslint-disable-line
  useEffect(() => {
    const isMore = list.length < allPeople.length;
    setHasMore(isMore);
  }, [list]); //eslint-disable-line

  return (
    <Layout>
      <Header />
      <div>
        <h1 style={{ borderBottom: 0 }}>Google Workspace Developers</h1>
        <input type="checkbox" onChange={handleInputChange} />
        <div class="cards">
          {list.map(({ node }) => (
            <div class="card" key={node.id}>
              <div style={{ textAlign: "right" }}>
                <Link to={node.frontmatter.slug}>
                  <img
                    src={node.frontmatter.image}
                    alt={node.frontmatter.name}
                    class="avatar"
                  />
                </Link>
                <div class="name">
                  <Link to={node.frontmatter.slug}>
                    {node.frontmatter.name}
                  </Link>
                </div>
                <div class="location">{node.frontmatter.location}</div>
                <div class="intro">{node.frontmatter.intro}</div>
              </div>
              <br />
              <div>
                {node.frontmatter.linkedin && (
                  <div class="box">
                    <a href={node.frontmatter.linkedin}>
                      <Image src="linkedin.png" alt="linkedin" />
                    </a>
                  </div>
                )}
                {node.frontmatter.github && (
                  <div class="box">
                    <a href={node.frontmatter.github}>
                      <Image src="github.png" alt="github" />
                    </a>
                  </div>
                )}
                {node.frontmatter.twitter && (
                  <div class="box">
                    <a href={node.frontmatter.twitter}>
                      <Image src="twitter.png" alt="twitter" />
                    </a>
                  </div>
                )}
                {node.frontmatter.website && (
                  <div class="box">
                    <a href={node.frontmatter.website}>
                      <Image src="website.png" alt="website" />
                    </a>
                  </div>
                )}
                {node.frontmatter.facebook && (
                  <div class="box">
                    <a href={node.frontmatter.facebook}>
                      <Image src="facebook.png" alt="facebook" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          {hasMore ? (
            <button onClick={handleLoadMore} style={{ marginTop: `1.5rem` }}>
              Load More
            </button>
          ) : (
            <p style={{ marginTop: `1.5rem` }}>Those are all!</p>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Layout>
  );
};

export default IndexPage;
