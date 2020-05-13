
import React from 'react'

import ReadAnodeJSON from '../Excel/Anode/ReadAndodeJSON'
import ReadCathodeJSON from '../Excel/Cathode/ReadCathodeJSON'

import Graph from '../Graph/Graph'

const OverallReactionAnodeCathode=(props)=>{

    //console.log(props.anodeSubstrate)
    //console.log(props.cathodeProduct)

    let AnodeData=ReadAnodeJSON(props.anodeSubstrate)
    //console.log(AnodeData)
    let x = AnodeData.value.x
    let y = AnodeData.value.y
    let z = AnodeData.value.z
    let GibbsSubstrateInitial=AnodeData.value["∆Gf°(s) (kJ/mol)"]

    let CathodeData=ReadCathodeJSON(props.cathodeProduct)
    //console.log(CathodeData)
    let c = CathodeData.value.c
    let h = CathodeData.value.h
    let o = CathodeData.value.o
    let GibbsProductInitial=CathodeData.value["∆Gf°(p) (kJ/mol)"]
    
    let xDash=c/x
    let m= o-((c*z)/x)
    let mDash=(0.5)*(-h+((c*y)/x)+(2*o)-((2*c*z)/x))

     let StandardGibbsEnergyOfReactionProductkJMol= GibbsProductInitial-xDash *GibbsSubstrateInitial-m*(-237.13)
     let StandardGibbsEnergyOfFormationOfWater = -237.13
     let StandardGibbsEnergyOfReactionSubstratekJMol=(1/xDash)*(StandardGibbsEnergyOfReactionProductkJMol)
     let MolarMassOfProduct= (12*c)+(h)+(16*o)
     let MolarMassOfSubstrate=(12*x)+(y)+(16*z)
     let StandardGibbsEnergyOfReactionProductkJg=(1/MolarMassOfProduct)*StandardGibbsEnergyOfReactionProductkJMol
     let StandardGibbsEnergyOfReactionSubstratekJg=(1/(MolarMassOfProduct))*(StandardGibbsEnergyOfReactionSubstratekJMol)

     let StandardGibbsEnergyOfReactionkJ=((props.volume*props.efficiency)/(xDash*MolarMassOfSubstrate))*StandardGibbsEnergyOfReactionProductkJMol
     let ProductionRateg=((props.volume*props.efficiency*MolarMassOfProduct)/MolarMassOfSubstrate)
     

     //console.log(ProductionRateg)
     //console.log(StandardGibbsEnergyOfReactionkJ)
    let concentrationArrValues=[props.concentration*0.75,parseFloat(props.concentration),props.concentration*1.25]
    let StandardGibbsEnergyOfReactionkJArr=[]
    concentrationArrValues.forEach(element => { StandardGibbsEnergyOfReactionkJArr.push((element*StandardGibbsEnergyOfReactionkJ).toFixed(2))    
    });

    let ProductionRateArr=[]
    concentrationArrValues.forEach(element => { ProductionRateArr.push((element*ProductionRateg).toFixed(2))    
    });
  

    //console.log(StandardGibbsEnergyOfReactionkJArr)
    //console.log(concentrationArrValues)

    let XYEnergyArr=[[concentrationArrValues[0],StandardGibbsEnergyOfReactionkJArr[0]],[concentrationArrValues[1],StandardGibbsEnergyOfReactionkJArr[1]],[concentrationArrValues[2],StandardGibbsEnergyOfReactionkJArr[2]]]
    let XYProductionRateArr=[[concentrationArrValues[0],ProductionRateArr[0]],[concentrationArrValues[1],ProductionRateArr[1]],[concentrationArrValues[2],ProductionRateArr[2]]]
    //let energyObj=null
    //energyObj=Object.assign({},XYEnergyArr)
    //console.log(energyObj)

    

    let energyObj=[
        {
        "id":"Gibbs Energy",
        "data":[
            {
                "x": XYEnergyArr[0][0],
                "y": XYEnergyArr[0][1]
            },
            {
                "x": XYEnergyArr[1][0],
                "y": XYEnergyArr[1][1]
            },
            {
                "x": XYEnergyArr[2][0],
                "y": XYEnergyArr[2][1]
            },
        ]
    }
    ]

    let ProductionyObj=[
        {
        "id":"Production Rate",
        "data":[
            {
                "x": XYProductionRateArr[0][0],
                "y": XYProductionRateArr[0][1]
            },
            {
                "x": XYProductionRateArr[1][0],
                "y": XYProductionRateArr[1][1]
            },
            {
                "x": XYProductionRateArr[2][0],
                "y": XYProductionRateArr[2][1]
            },
        ]
    }
    ]
    //console.log(energyObj)
    return (
        <div>
    <Graph data={energyObj} YAxis={"Energy (kJ)"}/>
    <Graph data={ProductionyObj} YAxis={"Production rate (g)"}/>
    </div>
    
    )

}

export default OverallReactionAnodeCathode