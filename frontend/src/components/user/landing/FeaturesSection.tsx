import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    { title: 'Ticket Booking', description: 'Find and book private  buses in seconds.' },
    { title: 'Trip Planner', description: 'Get the best routes and fare estimates tailored for you.' },
    { title: 'Travel Community', description: 'Connect with bus owners and Travelers like never before.' },
  ];

  return (
    <section style={styles.features}>
      <h2 style={styles.heading}>Features</h2>
      <div style={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} style={styles.featureItem}>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  features: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    textAlign: 'center' as 'center',
    marginBottom: '2rem',
  },
  featureList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  featureItem: {
    textAlign: 'center' as 'center',
    width: '30%',
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
};

export default FeaturesSection;
