import React from "react";
import MathField from "react-mathquill";

describe('text', function() {
    var mostRecentlyReportedLatex;
    
    function fromLatex(latex) {
      var block = latexMathParser.parse(latex);
      block.jQize();
  
      return block;
    }
  
    function assertSplit(jQ, prev, next) {
      var dom = jQ[0];
  
      if (prev) {
        assert.ok(dom.previousSibling instanceof Text);
        assert.equal(prev, dom.previousSibling.data);
      }
      else {
        assert.ok(!dom.previousSibling);
      }
  
      if (next) {
        assert.ok(dom.nextSibling instanceof Text);
        assert.equal(next, dom.nextSibling.data);
      }
      else {
        assert.ok(!dom.nextSibling);
      }
    }
  
    
      test('typing $ in a textblock splits it', function() {
        mostRecentlyReportedLatex = NaN; // != to everything
        let mq = <MathField/>
      

        //\frac{d\cdot a}{d\cdot t}
        //(d*a)/(d*t)

        //\frac{da}{dt}
        //(d*a)/(d*t)

        mq.typedText = "a"
        //mq.latex('\\text{asdf}');
        //assertLatex('\\text{asdf}');
  
     
      });
    });
