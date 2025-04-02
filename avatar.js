import express from 'express';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';

const app = express();
const port = process.env.PORT||3000;

app.get('/avatar/:seed', (req, res) => {
    const { seed } = req.params;
    const {facialHair,face,head,backgroundColor ,accessories, clothingColor,skinColor,accessoriesProbability,facialHairProbability,mask,maskProbability } = req.query;
    
    // defining some deafult values if no Query is Provided.
    const defaultColors = [ "c0aede" ];
    // ["b6e3f4"=blue, "c0aede"violet", "d1d4f9=sky", "a3e635=green", "f39c12=orange", "ff9aa2=light red", "e63946=red"];
    const defaultAccessories=["glasses"];
    const defaultClothColor=["fdea6b"];
    const defaultskinColor=["d08b5b"];
    const defaultFace=["eatingHappy"];
    const defaultHead=["dreads2"];
    const defaultfacialHair=["moustache8"];
    const defaultmask=["medicalMask"];

    const deafultaccessoriesProbability=0;
    const defaultfacialHairProbability=0;
    const defaultmaskProbability=0;

   
// taking input from Query
    const bgColor = backgroundColor ? [backgroundColor] : defaultColors;
    const avaAccessories= accessories? [accessories]: defaultAccessories;
    const ctColor= clothingColor?[clothingColor]:defaultClothColor;
    const skColor= skinColor?[skinColor]:defaultskinColor;
    const faceExp=face? [face] : defaultFace;
    const headType= head?[head]: defaultHead;
    const faceHair=facialHair?[facialHair]:defaultfacialHair;
    const inpmask=mask?[mask]:defaultmask;
    

    const accprob=accessoriesProbability?[accessoriesProbability]:deafultaccessoriesProbability
    const faceHairprob=facialHairProbability?[facialHairProbability]:defaultfacialHairProbability
    const maskprob=maskProbability?[maskProbability]:defaultmaskProbability

    const svg = createAvatar(openPeeps, {
        seed,
        backgroundColor: bgColor,
        accessories:avaAccessories,
        clothingColor:ctColor,
        skinColor:skColor,
        face:faceExp,
        head: headType,
        facialHair:faceHair,
        accessoriesProbability:accprob,
        facialHairProbability:faceHairprob,
        mask:inpmask,
        maskProbability:maskprob


    }).toString();

    res.set('Content-Type', 'image/svg+xml');
    res.send(svg);
});

app.listen(port, () => {
    console.log(`🎨 Avatar API listening at http://localhost:${port}`);
});

