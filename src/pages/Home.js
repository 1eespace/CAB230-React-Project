import React from "react"

function Home() {
    return (
      <main>
        <Hero />
      </main>
    )
  }
  
  const Hero = () => (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title" style={{color: 'Red'}}>Movie_</h1>
        <h6 className="hero-title">Fabulous Movie Searching Website</h6>
        <p className="hero-subtitle">
            This CAB230 assignment2 requires to develop a React-based 
            web application to allow users to view and analyze data 
            about movies which have exposed via a REST API!
        </p>
      </div>
    </section>
  )
  
  export default Home
  