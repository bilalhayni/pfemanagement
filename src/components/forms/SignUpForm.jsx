import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MultiStepForm from './MultiStepForm';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Informations personnelles',
      description: 'Commençons par vos informations de base',
      fields: [
        { name: 'firstName', label: 'Prénom', placeholder: 'Entrez votre prénom', required: true },
        { name: 'lastName', label: 'Nom', placeholder: 'Entrez votre nom', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'exemple@email.com', required: true, fullWidth: true },
        { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: '+212 6XX XXX XXX' }
      ]
    },
    {
      title: 'Informations académiques',
      description: 'Parlez-nous de votre parcours',
      fields: [
        {
          name: 'role',
          label: 'Vous êtes',
          type: 'select',
          required: true,
          options: [
            { value: 'student', label: 'Étudiant' },
            { value: 'professor', label: 'Professeur' },
            { value: 'admin', label: 'Administrateur' }
          ]
        },
        {
          name: 'department',
          label: 'Département',
          type: 'select',
          required: true,
          options: [
            { value: 'informatique', label: 'Informatique' },
            { value: 'mathematiques', label: 'Mathématiques' },
            { value: 'physique', label: 'Physique' },
            { value: 'chimie', label: 'Chimie' },
            { value: 'biologie', label: 'Biologie' }
          ]
        },
        { name: 'cne', label: 'CNE (pour étudiants)', placeholder: 'Votre CNE', hint: 'Laissez vide si vous êtes professeur' },
        { name: 'cin', label: 'CIN', placeholder: 'Votre CIN', required: true }
      ]
    },
    {
      title: 'Sécurité du compte',
      description: 'Créez un mot de passe sécurisé',
      fields: [
        { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••', required: true, hint: 'Minimum 8 caractères' },
        { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••', required: true },
        { name: 'acceptTerms', type: 'checkbox', checkboxLabel: "J'accepte les conditions d'utilisation", fullWidth: true, required: true },
        { name: 'newsletter', type: 'checkbox', checkboxLabel: 'Recevoir les notifications par email', fullWidth: true }
      ]
    }
  ];

  const handleSubmit = (formData) => {
    console.log('Sign up data:', formData);
    // Handle signup logic here
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-logo">
          <img src="/logo-fpn.svg" alt="Faculté Pluridisciplinaire de Nador" />
        </div>

        <MultiStepForm
          steps={steps}
          onSubmit={handleSubmit}
          title="Créer un compte"
          subtitle="Rejoignez la plateforme PFE Manager"
          submitLabel="S'inscrire"
        />

        <div className="signup-footer">
          <span>Déjà inscrit?</span>
          <Link to="/login" className="login-link">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
