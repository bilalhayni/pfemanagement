import React from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/common/StatCard';
import ProgressChart from '../components/common/ProgressChart';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - replace with actual data from your API
  const userName = 'Chef';
  const userInitials = 'CH';

  const stats = [
    {
      title: 'Professeurs',
      value: 1,
      subtitle: 'Membres actifs',
      icon: 'professors',
      iconBgColor: '#4f6bed'
    },
    {
      title: 'Étudiants',
      value: 1,
      subtitle: 'Inscrits en PFE',
      icon: 'students',
      iconBgColor: '#f59e0b'
    },
    {
      title: 'Projets PFE',
      value: 2,
      subtitle: 'Actifs & terminés',
      icon: 'projects',
      iconBgColor: '#10b981'
    },
    {
      title: 'Domaines',
      value: 5,
      subtitle: 'Spécialités PFE',
      icon: 'domains',
      iconBgColor: '#4f6bed'
    }
  ];

  const myPfeData = [
    { label: 'En cours', value: 1, color: '#10b981' },
    { label: 'Terminés', value: 1, color: '#4f6bed' }
  ];

  const allPfeData = [
    { label: 'En cours', value: 1, color: '#10b981' },
    { label: 'Terminés', value: 1, color: '#4f6bed' }
  ];

  return (
    <Layout pageTitle="Dashboard" userName={userName} userInitials={userInitials}>
      <div className="dashboard">
        {/* Welcome Section */}
        <div className="dashboard__welcome">
          <h2 className="dashboard__greeting">
            Bienvenue, <span className="dashboard__name">{userName}</span>!
          </h2>
          <p className="dashboard__subtitle">
            Voici un aperçu de votre département aujourd'hui.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="dashboard__stats">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="dashboard__charts">
          <ProgressChart
            title="Mes PFE's - Avancement"
            linkText="Voir tous"
            linkHref="/mes-pfes"
            data={myPfeData}
          />
          <ProgressChart
            title="Tous les PFE's - Avancement"
            linkText="Voir tous"
            linkHref="/tous-les-pfes"
            data={allPfeData}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
