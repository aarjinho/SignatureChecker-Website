import React, { useState } from 'react';
import AbsenceChart from './AbsenceChart';
import Analytics from './Analytics';

const Promo = () => {

  const promotions = [
    { "promo": "Master 1 Miage", "TDS": [1, 2, 3],"globalAbsence":{"lundi":20,"mardi":10,"mercredi":2,"jeudi":12,"vendredi":14}},
    { "promo": "Master 2 MBDS", "TDS": [1, 2, 3],"globalAbsence":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}},
    { "promo": "Licence 3 Miage", "TDS": [1, 2, 3],"globalAbsence":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}},
    { "promo": "Master 2 Siris", "TDS": [1, 2, 3],"globalAbsence":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}} 
  ];

  const [chosenPromo, setChosenPromo] = useState();
  const [chosenTd, setChosenTd] = useState();

  const handlePromoChange = (e) => {
    const selectedPromo = promotions.find(promo => promo.promo === e.target.value);
    setChosenPromo(selectedPromo);
    setChosenTd(undefined);
  }

  return (
    <div>
      <label htmlFor="promotion-select">Choississez une Promotion:</label>
      <select id="promotion-select" value={chosenPromo?.promo} onChange={handlePromoChange}>
        <option value="">--Select a Promotion--</option>
        {promotions.map(promo => (
          <option key={promo.promo} value={promo.promo}>{promo.promo}</option>
        ))}
      </select>
      {chosenPromo ? (
        <div>
        <label htmlFor="promotion-select">Choississez une Promotion:</label>
        <select id="td-select" value={chosenTd} onChange={(e) => setChosenTd(e.target.value)}>
          <option value="">--Choississez le groupe de TD--</option>
          {chosenPromo.TDS.map(td => (
            <option key={td} value={td}>TD {td}</option>
          ))}
        </select>
        <h1>Absence Chart</h1>
        <AbsenceChart data={chosenPromo} />
        </div>
      ) : null}
    </div>
  );
}

export default Promo;
