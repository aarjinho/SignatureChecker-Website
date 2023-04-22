import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];



export default function HorizontalLinearStepper() {
    const promotions = [
        { "promo": "Master 1 Miage", "TDS": [1, 2, 3]},
        { "promo": "Master 2 MBDS", "TDS": [1, 2, 3]},
        { "promo": "Licence 3 Miage", "TDS": [1, 2, 3]},
        { "promo": "Master 2 Siris", "TDS": [1, 2, 3]} 
      ];
    
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [nom,setNom]=React.useState("")
  const [prenom,setPrenom]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [chosenPromo, setChosenPromo] = React.useState();
  const [chosenTd, setChosenTd] = React.useState();

  const handlePromoChange = (e) => {
    const selectedPromo = promotions.find(promo => promo.promo === e.target.value);
    setChosenPromo(selectedPromo);
    setChosenTd(undefined);
  }

  function addStudent(){
    const student = {
      nom: nom,
      prenom: prenom,
      email: email,
      promo: chosenPromo.promo,
      td: chosenTd
    }
    fetch("http://localhost:8080/api/etudiants", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(() => {
      console.log("new student added");
    })
  }


     const step1 = (
      <Box sx={{ margin:'5rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <TextField id="nom" value={nom} label="Nom" onChange={(e) => setNom(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
      <TextField id="prenom" value={prenom} label="Prenom" onChange={(e) => setPrenom(e.target.value)} variant="outlined" />
    </Box>
    
  )
    const step2 = ( 
    <Box sx={{ margin:'5rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <TextField id="email" value={email} label="Email" onChange={e=>setEmail(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
      </Box>)

    const step3 = (
    <div style={{margin : "0 auto",width:"50%",textAlign:"center",padding:"4rem"}} className='searchBar'>
      <FormControl sx={{ m: 1, minWidth: 160 }}>
         <InputLabel id="demo-simple-select-autowidth-label">Promotion</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={chosenPromo?.promo}
              label="Promotion"
              onChange={handlePromoChange}
            >
              {promotions.map(promo => (
                  <MenuItem key={promo.promo} value={promo.promo}>{promo.promo}</MenuItem>
                ))}
            </Select>
        </FormControl>
{chosenPromo ? ( 
<FormControl sx={{ m: 1, minWidth: 80 }}>
  <InputLabel id="demo-simple-select-label">TD</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={chosenTd}
      label="TD"
      onChange={(e) => setChosenTd(e.target.value)}
    >
     {chosenPromo.TDS.map(td => (
          <MenuItem key={td} value={td}>TD {td}</MenuItem>
        ))}
    </Select>
</FormControl>) : null}
   
  </div>)
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if(activeStep === 2){
      addStudent()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        {activeStep===0 ? step1 : (activeStep===1 ? step2 : step3)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}