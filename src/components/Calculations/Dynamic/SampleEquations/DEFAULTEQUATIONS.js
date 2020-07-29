const defaultEquations = [
    {
      id: "qwert",
      line: "a",
      DByDLatex: "\\frac{da}{dt}=",
      LatexEqn: "-\\frac{{K_1}ab}{{K_2}+a}-\\frac{{K_3}}ac{{K_4}+a}",
      TextEqn: "-(K_1*a*b)/(K_2+a)-(K_3)/(a)*c*K_4+a",
      errorMessage: null,
    },
    {
      id: "yuiop",
      line: "b",

      DByDLatex: "\\frac{db}{dt}=",
      LatexEqn: "\\frac{{K_1}ab}{{K_3}+a}-{K_4}b",
      TextEqn: "(K_1*a*b)/(K_3+a)-K_4*b",
      errorMessage: null,
    },
    {
      id: "asdfg",
      line: "c",

      DByDLatex: "\\frac{dc}{dt}=",
      LatexEqn: "\\frac{{K_2}}ac{{K_1}+a}-{K_4}c",
      TextEqn: "(K_2*a*c)/(K_1+a)-K_4*c",
      errorMessage: null,
    },
    {
      id: "hjklz",
      line: "d",

      DByDLatex: "\\frac{dd}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
    {
      id: "dfsf",
      line: "f",

      DByDLatex: "\\frac{df}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
    {
      id: "klsdf",
      line: "g",

      DByDLatex: "\\frac{dg}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
    {
      id: "sdgfdg",
      line: "h",

      DByDLatex: "\\frac{dh}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
    {
      id: "ewrtew",
      line: "j",

      DByDLatex: "\\frac{dj}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
    {
      id: "sjmew",
      line: "k",

      DByDLatex: "\\frac{dk}{dt}=",
      LatexEqn: "-\\frac{{K_1}}ab{{K_4}+a}-\\frac{{K_3}ac}{{K_2}+a}",
      TextEqn: "-(K_1*a*b)/(K_4+a)-(K_3*a*c)/(K_2+a)",
      errorMessage: null,
    },
  ];

  export default defaultEquations