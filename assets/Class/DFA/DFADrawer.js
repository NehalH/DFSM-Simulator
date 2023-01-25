/**
 * @class - DFADrawer
 * makes a DFA Diagram using the
 * DFA Class combining its tuples with @class StateArc and @class StateCircle.
 * @constructor - Takes one param
 * @param {DFA} dfa Must be of the @class DFA
 * @member this.dfa - The DFA
 * @member this.states - Array of StateCircle
 * @member this.links - Arrat of StateArcs
 * @member this.children - childrens
 * @author Subesh Bhandari
 * @version 0.1
 */
class DFADrawer {

  /**
   * constructor - Takes one param
   *
   * @param {DFA} dfa Must be of the @class DFA
   *
   */
  constructor(dfa) {
    this.dfa = dfa;
    this.states = [];
    this.links = [];
    this.children = [];
    //cathes error if dfa not defined
    try {
      this.createDiagram();
    } catch (e) {
      //console.log("Unexpected error\n Dfa not defined " + e);
    }
  }


  /**
   * createDiagram - make a diagramatic view of the DFA tuples
   * @param {none} NONE no param
   * @return {null} no return
   */
  createDiagram() {
    this.states = [];
    this.links = [];
    this.children = [];
    //Check if dfa defined or not
    if (this.dfa) {

      //First - Make StateCircle
      this.createStateCircle();

      //Second identify start and final state
      this.createStart();
      this.createFinal();

      //Third - createLink (transitions)
      this.createLink();
    } else {
      throw ("Subesh");
    }
  }

  /**
   * createStateCircle - Make StateCircles of the Dfa states.
   *
   * @return {null}  No return
   */
  createStateCircle() {
    //state points to dfa.state (for convinence)
    let states = this.dfa.state;

    //Initial state position
    let posX = 100;
    let posY = 300;

    //looping through each state
    states.forEach((state) => {
      //A new State Circle
      let stateCircle = new StateCircle(state, posX, posY);

      //Appending to states
      this.states.push(stateCircle);

      //Appending children so that they can be drawn
      this.children.push(stateCircle);

      //Incrementing the posX  by 300 so that they are 300 pixel away
      posX += 300;
    });
  }

  /**
   * createStart - Set the initial state with and arrow
   *
   * @return {undefined}
   */
  createStart() {
    //initial state (initial array length only 1)
    let initial = this.dfa.initial[0];

    //list of StateCircles
    let states = this.states;

    /**finding the initial State and applying isStart = true (done by @function StateCircle.setStart())
     * can only be one
     */
    states.find((state) => {
      return state.stateName === initial;
    }).setStart();

  }


  /**
   * createFinal - Creates the final States (double circle)
   *
   * @return {undefined}
   */
  createFinal() {
    //list of Final
    let final = this.dfa.final;

    //list of StateCircle
    let states = this.states;

    //Making final States

    //Looping through States
    states.forEach((state) => {
      //checking if the state is final or not
      final.every((final) => {

        if (final == state.stateName) {
          state.setFinal();
          return false;
        }
        return true;
      });
    });

  }


  /**
   * createLink - Creates a link among the StateCircle with the help of DFA.transition (this.dfa.transition)
   *
   * @return {undefined}
   */
  createLink() {
    try {
      let states = this.states;

      let transition = this.dfa.transition;

      for (let stateName in transition) {
        for (let input in transition[stateName]) {

          let to = states.find((state) => {
            return state.stateName === transition[stateName][input];
          });

          let from = states.find((state) => {
            return state.stateName === stateName;
          });

          let reflect = undefined;
          let link;
          let linkFrom = from.hasLinkFrom(to);
          let linkTo = from.hasLinkTo(to);
          if (linkFrom) {
            reflect = 1;
            //console.log(linkFrom);
          }

          if (linkTo) {
            //console.log("It has");
            linkTo.input.push(input);
            linkTo.link.text.push(input);
          } else {
            link = new StateArc(from, to, input, reflect);
            from.addLinkTo({
              state: to,
              link: link,
              input : [input]
            });
            to.addLinkFrom({
              state: from,
              link: link,
              input : [input]
            });
            this.children.unshift(link);
          }

          //console.log(`${from.stateName} -- ${input} -- > ${to.stateName}`);
        }
      }
    } catch (e) {
      alert('There seems to be an Error in the input.\n Please fill in the inputs properly!');
      this.states = [];
      this.links = [];
      this.children = [];
    }
  }
  draw() {

  }


}
