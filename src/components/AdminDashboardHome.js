import React from 'react'
import Card from './Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';



export default function AdminDashboardHome() {


  return (
    <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent = "center" >
      {[{titre : "Résumé", img : "resume.png", link : "resume",description : "Obtenez un aperçu détaillé du nombre d'absences enregistrées pour la journée en cours, ainsi que pour les jours précédents."},
      {titre : "Analyse", img : "graph.png", link : "analyse", description : "Accedez à différents graphiques qui permettent de suivre l'évolution des absences au sein de l'université cote d'azur."},
       {titre : "Recherche", img : "search.png", link : "search", description : "Recherchez un étudiant, un enseignant ou une autre personne par son nom ou son numéro d'identification."}
       ].map((el,index) => (
        
        <Grid item xs={3} sm={3} md={3} key={index}>
            <Link style={{ textDecoration: 'none' }} to = {el.link}>
                <Card  title = {el.titre} img = {el.img} description = {el.description} />
            </Link>
        </Grid>
      ))}
    </Grid>
  )
}
