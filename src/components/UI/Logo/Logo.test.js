


configure({ adapter: new Adapter() });

describe("<Logo />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Logo onInitIngredients={()=>{}}/>);
  });


  it("should render Logo ", () => {

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

});
