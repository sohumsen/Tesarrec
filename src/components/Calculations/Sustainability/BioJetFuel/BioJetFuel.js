import React from "react";

//import ReadCathodeJSON from "../../Excel/Cathode/ReadCathodeJSON";
import BiojetfuelPic from "../../../../assets/Bio jet fuel.png";
import classes from "../Bioethanol/OverallReactionAnodeCathodeCHP.module.css";
import ColumnChart from "../../../UI/Canvas/ColumnChart";
import MultiLineChart from "../../../UI/Canvas/MultiLineChartBioJetFuel";

import { Paper } from "@material-ui/core";
import CustomizedTables from "../../../UI/Table/CustomTable";

const OverallReactionAnodeCathode = (props) => {
  let {
    BiooilThroughput,

    PhenolinBiooil,
    DextroseinBiooil,
    FurfuralinBiooil,
    AceticacidinBiooil,
    HydroxyacetoneinBiooil,
    FormicacidinBiooil,
    WaterinBiooil,

    BiomassCalorificvalue,

    PhenoltoTridecene1,
    PhenoltoTridecene2,

    InstallationFactor,
    ACC,

    BiomassCost,
    JetfuelPrice,
    CharPrice,
    SteamPrice,
  } = props.state;
  ///////////////////////////////////////////////
  let Total =
    PhenolinBiooil +
    DextroseinBiooil +
    FurfuralinBiooil +
    AceticacidinBiooil +
    HydroxyacetoneinBiooil +
    FormicacidinBiooil +
    WaterinBiooil;
  let Phenol = (PhenolinBiooil / Total) * BiooilThroughput;
  let Dextrose = (DextroseinBiooil / Total) * BiooilThroughput;
  let Furfural = (FurfuralinBiooil / Total) * BiooilThroughput;
  let Aceticacid = (AceticacidinBiooil / Total) * BiooilThroughput;
  let Hydroxyacetone = (HydroxyacetoneinBiooil / Total) * BiooilThroughput;
  let Formicacid = (FormicacidinBiooil / Total) * BiooilThroughput;
  let Water = (WaterinBiooil / Total) * BiooilThroughput;
  ///////////////////////////////////////////////
  let Tridecene =
    (((PhenoltoTridecene1 * 0.4615 +
      PhenoltoTridecene2 * 0.167 +
      0.0065 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.335) *
      Phenol) /
      94 +
      (0.02 * 0.335 * Dextrose) / 180) *
    182;
  let Diamantane =
    ((0.1766 *
      (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
      0.4286 *
      Phenol) /
      94 +
      (0.196 * 0.3345 * Dextrose) / 180) *
    188;
  let Diphenyl =
    ((0.139 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.5 * Phenol) /
      94) *
    154;
  let Triethylbenezene =
    ((0.0961 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.5 * Phenol) /
      94) *
    162;
  let Heptane =
    (((PhenoltoTridecene2 * 0.167 +
      0.0026 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.5) *
      Phenol) /
      94 +
      (0.384 * 0.1127 * Aceticacid) / 60 +
      (0.966 * 0.25 * Hydroxyacetone) / 74) *
    100;
  let Tmcyclohexane =
    ((0.0896 *
      (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
      0.6666 *
      Phenol) /
      94 +
      (0.094 * 0.6666 * Dextrose) / 180 +
      ((0.1987 *
        (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
        0.3333 *
        Phenol) /
        94) *
        2) *
    126;
  let Pcyclohexane =
    ((0.0896 *
      (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
      0.6666 *
      Phenol) /
      94 +
      (0.094 * 0.6666 * Dextrose) / 180) *
    126;
  let Pxylene =
    ((0.0532 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.75 * Phenol) /
      94) *
    106;
  let Bicyclohexyl =
    ((0.0052 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.5 * Phenol) /
      94 +
      (0.008 * 0.5 * Dextrose) / 180) *
    166;
  let Xylenol =
    ((0.0052 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.75 * Phenol) /
      94 +
      (0.376 * 0.75 * Dextrose) / 180) *
    122;
  let Tmbenzene =
    ((0.0026 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.67 * Phenol) /
      94 +
      (0.041 * 0.5 * Dextrose) / 180) *
    120;
  let Cisdecalin =
    ((0.036 * 0.5 * Dextrose) / 180 + (0.313 * 0.5 * Furfural) / 96) * 138;
  let Bcyclohexane =
    ((0.012 * 0.5 * Dextrose) / 180 + (0.005 * 0.49 * Furfural) / 96) * 140;
  let Tmheptane = ((0.232 * 0.5 * Furfural) / 96) * 142;
  let Dmebenzene = ((0.204 * 0.5 * Furfural) / 96) * 134;
  let Mcyclohexane =
    (((PhenoltoTridecene2 * 0.167 +
      0.1351 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * 0.3344) *
      Phenol *
      2) /
      94) *
    0.9 *
    98;
  let Thnaphthalene = Mcyclohexane * 0.07483;
  let JetFuel =
    Tridecene +
    Diamantane +
    Diphenyl +
    Triethylbenezene +
    Heptane +
    Tmcyclohexane +
    Pcyclohexane +
    Pxylene +
    Bicyclohexyl +
    Xylenol +
    Tmbenzene +
    Cisdecalin +
    Bcyclohexane +
    Tmheptane +
    Dmebenzene +
    Mcyclohexane +
    Thnaphthalene;
  let HydrogenNeeded =
    (((PhenoltoTridecene1 * 4 +
      PhenoltoTridecene2 * 2.83 +
      (0.1766 * 2.29 +
        0.139 * 0.5 +
        0.1351 * 1.33 +
        0.0961 * 2.5 +
        0.0896 * 4 * 2 +
        0.0532 * 1.75 +
        0.0065 * 3.33 +
        0.0052 * 3.5 +
        0.0052 +
        0.0026 * 2 +
        0.0026 * 5.5) *
        (1 - PhenoltoTridecene1 - PhenoltoTridecene2)) *
      Phenol) /
      94) *
      2 +
    (((3 * 0.376 +
      0.67 * 0.196 +
      0.33 * 0.124 +
      6 * 0.094 +
      6 * 0.094 +
      2 * 0.041 +
      4.5 * 0.036 +
      2.33 * 0.02 +
      5 * 0.012 +
      5.5 * 0.008) *
      Dextrose) /
      180) *
      2 +
    (((4.5 * 0.313 +
      5.5 * 0.232 +
      3.5 * 0.204 +
      3.5 * 0.139 +
      4 * 0.108 +
      4 * 0.005) *
      Furfural) /
      96) *
      2 +
    (((1.5 * 0.616 + 2.22 * 0.384) * Aceticacid) / 60) * 2 +
    (((2 * 0.966 + 5 * 0.034) * Hydroxyacetone) / 74) * 2 +
    (((1.75 * 0.954 + 0.046) * Formicacid) / 46) * 2 +
    (Mcyclohexane / 98) * 9 +
    ((0.1987 *
      (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
      0.3333 *
      Phenol) /
      94) *
      12 *
      2;
  let AlkanestoReforming =
    ((0.1351 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      58 +
    ((PhenoltoTridecene2 * 0.161 * Phenol) / 94) * 30 +
    ((0.0065 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      58 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      58 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      16 +
    (((0.124 * 4.04 + 0.041 * 0.5 + 0.036 * 0.5 + 0.02 * 0.33 + 0.012 * 0.5) *
      Dextrose) /
      180) *
      16 +
    (((4.19 * 0.139 + 0.108) * Furfural) / 96) * 16 +
    ((0.108 * Furfural) / 96) * 44 +
    (((0.5 * 30 + 0.5 * 16) * 0.616 + (58 + 44 + 30 + 16) * 0.11 * 0.384) *
      Aceticacid) /
      60 +
    (((44 + 16) * 0.25 * 0.966 + 3 * 16 * 0.034) * Hydroxyacetone) / 74 +
    (((30 + 16) * 0.25 * 0.954 + 16 * 0.5 * 0.046) * Formicacid) / 46 +
    ((Mcyclohexane / 98 / 0.9) * 0.1 * 58) / 2;
  let HydrogenfromReforming =
    ((0.1351 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      9 *
      2 +
    ((PhenoltoTridecene2 * 0.161 * Phenol) / 94) * 5 * 2 +
    ((0.0065 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      9 *
      2 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      9 *
      2 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      3 *
      2 +
    (((0.124 * 4.04 + 0.041 * 0.5 + 0.036 * 0.5 + 0.02 * 0.33 + 0.012 * 0.5) *
      Dextrose) /
      180) *
      3 *
      2 +
    (((4.19 * 0.139 + 0.108) * Furfural) / 96) * 3 * 2 +
    ((0.108 * Furfural) / 96) * 7 * 2 +
    (((0.5 * 5 * 2 + 0.5 * 3 * 2) * 0.616 +
      (9 + 7 + 5 + 3) * 2 * 0.11 * 0.384) *
      Aceticacid) /
      60 +
    (((7 + 3) * 2 * 0.25 * 0.966 + 3 * 3 * 2 * 0.034) * Hydroxyacetone) / 74 +
    (((5 + 3) * 2 * 0.25 * 0.954 + 3 * 2 * 0.5 * 0.046) * Formicacid) / 46 +
    (Mcyclohexane / 98 / 0.9) * 0.1 * 9;
  let SteamneededReforming =
    ((0.1351 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      4 *
      18 +
    ((PhenoltoTridecene2 * 0.161 * Phenol) / 94) * 2 * 18 +
    ((0.0065 * 0.33 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      4 *
      18 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      4 *
      18 +
    ((0.0026 * 0.5 * (1 - PhenoltoTridecene1 - PhenoltoTridecene2) * Phenol) /
      94) *
      18 +
    (((0.124 * 4.04 + 0.041 * 0.5 + 0.036 * 0.5 + 0.02 * 0.33 + 0.012 * 0.5) *
      Dextrose) /
      180) *
      18 +
    (((4.19 * 0.139 + 0.108) * Furfural) / 96) * 18 +
    ((0.108 * Furfural) / 96) * 3 * 18 +
    (((0.5 * 2 + 0.5) * 18 * 0.616 + (4 + 3 + 2 + 1) * 18 * 0.11 * 0.384) *
      Aceticacid) /
      60 +
    (((3 + 1) * 18 * 0.25 * 0.966 + 3 * 18 * 0.034) * Hydroxyacetone) / 74 +
    (((2 + 1) * 18 * 0.25 * 0.954 + 18 * 0.5 * 0.046) * Formicacid) / 46;
  let SteamProduced =
    (((PhenoltoTridecene1 +
      PhenoltoTridecene2 +
      (0.1987 +
        0.1766 +
        0.139 +
        0.1351 +
        0.0961 +
        0.0896 * 2 +
        0.0532 +
        0.0065 * 0.33 +
        0.0052 +
        0.0052 * 0.25 +
        0.0026 +
        0.0026) *
        (1 - PhenoltoTridecene1 - PhenoltoTridecene2)) *
      Phenol) /
      94) *
      18 +
    (((5.25 * 0.376 +
      3.33 * 0.196 +
      4 * 0.124 +
      6 * 0.094 +
      6 * 0.094 +
      4 * 0.041 +
      5 * 0.036 +
      3.33 * 0.02 +
      5 * 0.012 +
      6 * 0.008) *
      Dextrose) /
      180) *
      18 +
    (((2 * 0.313 + 2 * 0.232 + 2 * 0.204 + 2 * 0.139 + 2 * 0.005) * Furfural) /
      96) *
      18 +
    (((0.616 + 1.78 * 0.384) * Aceticacid) / 60) * 18 +
    (((1.5 * 0.966 + 2 * 0.034) * Hydroxyacetone) / 74) * 18 +
    (((1.5 * 0.954 + 0.046) * Formicacid) / 46) * 18;
  let HydrogenfromSteam = HydrogenNeeded - HydrogenfromReforming;
  let OxygenfromSteam = (HydrogenfromSteam / 2) * 16;
  let ExcessSteam =
    SteamProduced +
    Water -
    HydrogenfromSteam -
    OxygenfromSteam -
    SteamneededReforming;
  let FueltoCHP =
    AlkanestoReforming -
    HydrogenfromReforming +
    SteamneededReforming +
    (BiooilThroughput / 0.75) * 0.13;
  let CharfromBiomass = (BiooilThroughput / 0.75) * 0.12;
  let BiomassNeeded = BiooilThroughput / 0.75;
  ///////////////////////////////////////////////
  let MolesJetfuel =
    Tridecene / 182 +
    Diamantane / 188 +
    Diphenyl / 154 +
    Triethylbenezene / 162 +
    Heptane / 100 +
    Tmcyclohexane / 126 +
    Pcyclohexane / 126 +
    Pxylene / 106 +
    Bicyclohexyl / 166 +
    Xylenol / 122 +
    Tmbenzene / 120 +
    Cisdecalin / 138 +
    Bcyclohexane / 140 +
    Tmheptane / 142 +
    Dmebenzene / 134 +
    Mcyclohexane / 98 +
    Thnaphthalene / 132;
  let SpecificGravity =
    ((Tridecene / 182) * 753.7674 +
      (Diamantane / 188) * 1032.612 +
      (Diphenyl / 154) * 1028.609 +
      (Triethylbenezene / 162) * 872.9459 +
      (Heptane / 100) * 682.4355 +
      (Tmcyclohexane / 126) * 775.1268 +
      (Pcyclohexane / 126) * 789.9583 +
      (Pxylene / 106) * 861.3405 +
      (Bicyclohexyl / 166) * 882.9784 +
      (Xylenol / 122) * 1008.196 +
      (Tmbenzene / 120) * 893.88 +
      (Cisdecalin / 138) * 893.8702 +
      (Bcyclohexane / 140) * 795.4349 +
      (Tmheptane / 142) * 738.9979 +
      (Dmebenzene / 134) * 888.1359 +
      (Mcyclohexane / 98) * 765.8646 +
      (Thnaphthalene / 132) * 971.7769) /
    MolesJetfuel /
    1000;
  let AromaticsVol =
    ((Diamantane / 188 +
      Diphenyl / 154 +
      Triethylbenezene / 162 +
      Pxylene / 106 +
      Xylenol / 122 +
      Tmbenzene / 120 +
      Dmebenzene / 134) /
      MolesJetfuel) *
    100;
  let HydrogenWt =
    (((Tridecene / 182) * 26 +
      (Diamantane / 188) * 20 +
      (Diphenyl / 154) * 10 +
      (Triethylbenezene / 162) * 18 +
      (Heptane / 100) * 16 +
      (Tmcyclohexane / 126) * 18 +
      (Pcyclohexane / 126) * 18 +
      (Pxylene / 106) * 10 +
      (Bicyclohexyl / 166) * 22 +
      (Xylenol / 122) * 10 +
      (Tmbenzene / 120) * 12 +
      (Cisdecalin / 138) * 18 +
      (Bcyclohexane / 140) * 20 +
      (Tmheptane / 142) * 22 +
      (Dmebenzene / 134) * 14 +
      (Mcyclohexane / 98) * 14 +
      (Thnaphthalene / 132) * 12) /
      JetFuel) *
    100;
  let FlashPoint =
    ((Tridecene / 182) * 363.5319 +
      (Diamantane / 188) * 376.1987 +
      (Diphenyl / 154) * 375.7519 +
      (Triethylbenezene / 162) * 354.7383 +
      (Heptane / 100) * 268.0794 +
      (Tmcyclohexane / 126) * 301.4507 +
      (Pcyclohexane / 126) * 313.5449 +
      (Pxylene / 106) * 299.7812 +
      (Bicyclohexyl / 166) * 367.0615 +
      (Xylenol / 122) * 350.5357 +
      (Tmbenzene / 120) * 327.3854 +
      (Cisdecalin / 138) * 340.7032 +
      (Bcyclohexane / 140) * 330.7449 +
      (Tmheptane / 142) * 312.7624 +
      (Dmebenzene / 134) * 339.4826 +
      (Mcyclohexane / 98) * 270.1306 +
      (Thnaphthalene / 132) * 348.3022) /
      MolesJetfuel -
    273;
  let VABP =
    ((Tridecene / 182) * 505.99 +
      (Diamantane / 188) * 529 +
      (Diphenyl / 154) * 528.15 +
      (Triethylbenezene / 162) * 491.15 +
      (Heptane / 100) * 371.58 +
      (Tmcyclohexane / 126) * 413.7 +
      (Pcyclohexane / 126) * 429.897 +
      (Pxylene / 106) * 411.51 +
      (Bicyclohexyl / 166) * 512.19 +
      (Xylenol / 122) * 484.33 +
      (Tmbenzene / 120) * 449.27 +
      (Cisdecalin / 138) * 468.965 +
      (Bcyclohexane / 140) * 454.131 +
      (Tmheptane / 142) * 428.83 +
      (Dmebenzene / 134) * 467.11 +
      (Mcyclohexane / 98) * 374.084 +
      (Thnaphthalene / 132) * 480.77) /
      MolesJetfuel -
    273;
  let AnilinePoint =
    ((Tridecene / 182) * 358.5131 ** 1.011 +
      (Diamantane / 188) * 198.2034 ** 1.011 +
      (Diphenyl / 154) * 207.6731 ** 1.011 +
      (Triethylbenezene / 162) * 300.655 ** 1.011 +
      (Heptane / 100) * 342.8934 ** 1.011 +
      (Tmcyclohexane / 126) * 316.5495 ** 1.011 +
      (Pcyclohexane / 126) * 313.3844 ** 1.011 +
      (Pxylene / 106) * 248.4363 ** 1.011 +
      (Bicyclohexyl / 166) * 304.7583 ** 1.011 +
      (Xylenol / 122) * 195.3084 ** 1.011 +
      (Tmbenzene / 120) * 252.5864 ** 1.011 +
      (Cisdecalin / 138) * 265.4582 ** 1.011 +
      (Bcyclohexane / 140) * 324.2826 ** 1.011 +
      (Tmheptane / 142) * 341.0447 ** 1.011 +
      (Dmebenzene / 134) * 268.6415 ** 1.011 +
      (Mcyclohexane / 98) * 287.655 ** 1.011 +
      (Thnaphthalene / 132) * 220.251 ** 1.011) /
      MolesJetfuel -
    273;
  let CetaneNo =
    ((Tridecene / 182) * 76.09276 ** 1.04 +
      (Diamantane / 188) * 13.29736 ** 1.04 +
      (Diphenyl / 154) * 13.60498 ** 1.04 +
      (Triethylbenezene / 162) * 27.8899 ** 1.04 +
      (Heptane / 100) * 33.01841 ** 1.04 +
      (Tmcyclohexane / 126) * 30.96964 ** 1.04 +
      (Pcyclohexane / 126) * 31.27514 ** 1.04 +
      (Pxylene / 106) * 19.22092 ** 1.04 +
      (Bicyclohexyl / 166) * 28.24119 ** 1.04 +
      (Xylenol / 122) * 13.87511 ** 1.04 +
      (Tmbenzene / 120) * 19.60285 ** 1.04 +
      (Cisdecalin / 138) * 21.03198 ** 1.04 +
      (Bcyclohexane / 140) * 36.82673 ** 1.04 +
      (Tmheptane / 142) * 43.87269 ** 1.04 +
      (Dmebenzene / 134) * 21.60065 ** 1.04 +
      (Mcyclohexane / 98) * 22.19211 ** 1.04 +
      (Thnaphthalene / 132) * 15.39458 ** 1.04) /
    MolesJetfuel;
  ///////////////////////////////////////////////
  let DeliveryCostofEquipment =
    (5.063 * (BiomassNeeded * 0.000044) ** 0.7 +
      38.445 * (BiooilThroughput * 0.00000005) ** 0.65 +
      2.604 * (BiooilThroughput * 0.00000005) ** 0.65 +
      (42.607 *
        (HydrogenfromReforming / 2 +
          (AlkanestoReforming - HydrogenfromReforming + SteamneededReforming) /
            28)) /
        9600) **
      0.7 +
    32.868 * (HydrogenfromSteam / 17000) ** 0.8 +
    14.304 *
      (((0.1351 *
        0.33 *
        (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
        Phenol) /
        94 +
        (PhenoltoTridecene2 * 0.161 * Phenol) / 94 +
        (0.0065 *
          0.33 *
          (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
          Phenol) /
          94 +
        (0.0026 *
          0.5 *
          (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
          Phenol) /
          94 +
        (0.0026 *
          0.5 *
          (1 - PhenoltoTridecene1 - PhenoltoTridecene2) *
          Phenol) /
          94 +
        ((0.124 * 4.04 +
          0.041 * 0.5 +
          0.036 * 0.5 +
          0.02 * 0.33 +
          0.012 * 0.5) *
          Dextrose) /
          180 +
        ((4.19 * 0.139 + 0.108) * Furfural) / 96 +
        (0.108 * Furfural) / 96 +
        (((0.5 + 0.5) * 0.616 + 0.11 * 0.384) * Aceticacid) / 60 +
        ((0.25 * 0.966 + 3 * 16 * 0.034) * Hydroxyacetone) / 74 +
        ((0.25 * 0.954 + 0.5 * 0.046) * Formicacid) / 46 +
        ((Mcyclohexane / 98 / 0.9) * 0.1) / 2) /
        1390) **
        0.6 +
    7.761 *
      (((BiomassNeeded * 0.13 +
        AlkanestoReforming -
        HydrogenfromReforming +
        SteamneededReforming) *
        0.0018) /
        10.3) **
        0.7;
  let TotalCapitalInvestment = DeliveryCostofEquipment * InstallationFactor;
  let Capex = TotalCapitalInvestment * ACC;
  let Opex = 1.3 * (DeliveryCostofEquipment * ACC * 0.25 + 0.0001 * JetFuel);
  let FeedstockCost = BiomassCost * BiomassNeeded * 0.000008;
  let ProductValue =
    (((JetfuelPrice * JetFuel) / (SpecificGravity * 1000)) * 220 * 8000) /
    1000000;
  let ProductCost = ((Capex + Opex + FeedstockCost) * 125) / BiomassNeeded;
  let GWPSaving = 0.024 * JetFuel;
  let FossilSaving = 0.32 * JetFuel;

  let dataPoints = [
    {
      x: 0,
      ProductCost: ProductCost,
      ProcessingValue: (JetfuelPrice / (SpecificGravity * 1000)) * 220,
    },
    {
      x: JetFuel,
      ProductCost: ProductCost,

      ProcessingValue: (JetfuelPrice / (SpecificGravity * 1000)) * 220,
    },
    {
      x: JetFuel,
      ProductCost: ProductCost,

      ProcessingValue: CharPrice / 1000,
    },
    {
      x: JetFuel + CharfromBiomass,
      ProductCost: ProductCost,

      ProcessingValue: CharPrice / 1000,
    },
    {
      x: JetFuel + CharfromBiomass,
      ProductCost: ProductCost,

      ProcessingValue: SteamPrice / 1000,
    },
    {
      x: JetFuel + CharfromBiomass + ExcessSteam,
      ProductCost: ProductCost,

      ProcessingValue: SteamPrice / 1000,
    },
    {
      x: JetFuel + CharfromBiomass + ExcessSteam,
      ProductCost: ProductCost,

      ProcessingValue: 0,
    },
    {
      x: BiomassNeeded,
      ProductCost: ProductCost,
      ProcessingValue: 0,
    },
  ];

  return (
    <div className={classes.HeatMaps}>
      <Paper className={classes.HeatMapEnergyPerformance}>
        <img src={BiojetfuelPic} width="100%" alt="Biojetfuel Pic"></img>
      </Paper>

      <Paper className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Flowrate kg/h"}
          labelData1={[
            {
              label: "Hydrogen from PSA ",
              y: parseFloat(HydrogenfromReforming.toFixed(2)),
            },
            {
              label: "Hydrogen from MIEC ",
              y: parseFloat(HydrogenfromSteam.toFixed(2)),
            },
            {
              label: "Hydrogen consumed ",
              y: parseFloat(HydrogenNeeded.toFixed(2)),
            },
            {
              label: "Alkane steam reformed ",
              y: parseFloat(AlkanestoReforming.toFixed(2)),
            },

            {
              label: "Excess steam product ",
              y: parseFloat(ExcessSteam.toFixed(2)),
            },
            {
              label: "Char product",
              y: parseFloat(CharfromBiomass.toFixed(2)),
            },
            {
              label: "Oxygen from MIEC",
              y: parseFloat(OxygenfromSteam.toFixed(2)),
            },
            {
              label: "CHP fuel",
              y: parseFloat(FueltoCHP.toFixed(2)),
            },
            {
              label: "Jet Fuel product",
              y: parseFloat(JetFuel.toFixed(2)),
            },
            {
              label: "Biooil from pyrolysis",
              y: parseFloat(BiooilThroughput.toFixed(2)),
            },
            {
              label: "Biomass throughput",
              y: parseFloat(BiomassNeeded.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </Paper>

      <Paper className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Economic margin analysis million $/y"}
          labelData1={[
            {
              label: "Product (Jet Fuel) Value",
              y: parseFloat(ProductValue.toFixed(2)),
            },
            {
              label: "Feedstock Cost ",
              y: parseFloat(FeedstockCost.toFixed(2)),
            },
            {
              label: "Capex ",
              y: parseFloat(Capex.toFixed(2)),
            },
            {
              label: "Opex ",
              y: parseFloat(Opex.toFixed(2)),
            },
          ]}
          type={"pie"}
        />
      </Paper>

      <Paper className={classes.HeatMapEnergyPerformance}>
        <ColumnChart
          title={"Environmental impact saving per year"}
          labelData1={[
            {
              label: "Global warming potential kt CO2 eq",
              y: parseFloat(GWPSaving.toFixed(2)),
            },
            {
              label: "Fossil resource TJ",
              y: parseFloat(FossilSaving.toFixed(2)),
            },
          ]}
          type={"bar"}
        />
      </Paper>
      <Paper className={classes.HeatMapEnergyPerformance}>
        <CustomizedTables
          rows={[
            {
              name: "Specific gravity",
              value: parseFloat(SpecificGravity.toFixed(2)).toString(),
            },
            {
              name: "Aromatics volume %",
              value: parseFloat(AromaticsVol.toFixed(2)),
            },
            {
              name: "Hydrogen weight %",
              value: parseFloat(HydrogenWt.toFixed(2)),
            },
            {
              name: "Cetane number",
              value: parseFloat(CetaneNo.toFixed(2)),
            },
            {
              name: "Aniline point",
              value: parseFloat(AnilinePoint.toFixed(2)),
            },
            {
              name: "Flash point (Deg C)",
              value: parseFloat(FlashPoint.toFixed(2)),
            },
            {
              name: "Volumetric average boiling point (Deg C)",
              value: parseFloat(VABP.toFixed(2)),
            },
          ]}
          title={"Jet Fuel Property"}
        />
      </Paper>

      <Paper
        style={{
          height: "400px",
          float: "left",
          width: "46%",
          margin: "2%",
        }}
      >
        <MultiLineChart
          dataPoints={dataPoints.map((el) => {
            let newObj = {
              x: el.x.toFixed(2),
              ProductCost: el.ProductCost.toFixed(2),
              ProcessingValue: el.ProcessingValue.toFixed(2),
            };
            return newObj;
          })}
        />
      </Paper>
    </div>
  );
};

export default OverallReactionAnodeCathode;
