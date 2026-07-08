import { Link } from 'react-router-dom';
import { Film, Star, Ticket, Users, ChevronRight, Play } from 'lucide-react';

const features = [
  {
    icon: <Film size={28} />,
    title: 'Discover Movies',
    desc: 'Browse thousands of movies with rich details, ratings, and reviews.',
  },
  {
    icon: <Ticket size={28} />,
    title: 'Book Instantly',
    desc: 'Reserve your seats in seconds with our seamless booking experience.',
  },
  {
    icon: <Star size={28} />,
    title: 'Rate & Review',
    desc: 'Share your thoughts and see what the community thinks about any film.',
  },
  {
    icon: <Users size={28} />,
    title: 'Social Profiles',
    desc: 'Connect with friends, share watchlists, and follow film enthusiasts.',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Now streaming the best picks
          </div>
          <h1 className="hero-title">
            Your Ultimate<br />
            <span className="gradient-text">Movie Experience</span>
          </h1>
          <p className="hero-subtitle">
            Discover, book, and review movies all in one place. Join thousands of
            film lovers on CineBook.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started <ChevronRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              <Play size={18} /> Watch Demo
            </Link>
          </div>
        </div>

        {/* Floating cards */}
        <div className="hero-cards">
          {['Inception', 'Dune', 'Interstellar'].map((movie, i) => (
            <div key={movie} className="movie-card-float" style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}>
              <div className="movie-card-img" />
              <div className="movie-card-info">
                <span className="movie-title">{movie}</span>
                <span className="movie-rating">
                  <Star size={12} fill="currentColor" /> {(4.5 + i * 0.2).toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Everything you need</h2>
        <p className="section-subtitle">
          CineBook brings the full cinema experience to your fingertips.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to start your journey?</h2>
          <p>Join CineBook today and never miss a great movie.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Free Account <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
