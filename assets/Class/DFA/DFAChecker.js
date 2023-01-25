/**
 * DFAChecker - A class for checking Whether the Given input is accepted or not With the help of Diagram.
 * @summary - This class takes in a parameter(constructor) of @class DFADrawer and with the help of its states[] and their link finds out the transition for each input.
 * @param {DFADrawer} drawer - DFADrawer obj
 *
 *
 * @author Suebsh Bhandari
 * @version 0.1
 */
class DFAChecker {

  /**
   * constructor
   *
   * @param {DFADrawer} drawer DFADrawer obj
   *
   * @return {null}
   */
  constructor(drawer) {
    this.drawer = drawer;
    this.string = '';
    this.current = {};
    this.interval = undefined;
    this.list = [];
    this.time = 200;
    this.counter = 0;
  }

  /**
   * check - This function is used to check whether a given input is accepted or not
   * @summary - FIrst it checks the transition and stores in this.list. If it doesn;t throw any exception then it fires start() which triggers the annimationwith setInterval().
   *
   * @param {String} string The string to check whether it is accepted or not
   * @callback this.start();
   * @return {String} Accepted/Regected
   */
  check(string) {
    //stirng length
    let len = string.length;
    this.list = [];
    //Initial State
    let state = this.drawer.states.find((state) => {
      return state.isStart;
    });

    //append to list;
    this.list.push(state);
    //throws an error if there are no symbols in the given alphabet sets
    try {
      //Finding the transition for each input
      for (let i = 0; i < len; i++) {

       /**
        * state - Return state after transition from a input
        *
        * @param {type} link Description
        *
        * @return {type} Description
        */
        let linkTo = state.link.to.find((link) => {
          return link.input.find((item) => item === string[i]);
        });
        let link = linkTo.link;
        this.list.push(link);
        state = linkTo.state;
        this.list.push(state);

      }

      //this start helps to trigger the annimation according to the interval
        this.start();
    } catch (e) {
      console.log('No such Symbol');
      alert("The input string consists of symbols not in the alphabet set");
      return "REJECED";
    }

    //return state.isFinal?"Accepted":"Rejected";
  }



  /**
   * start - Sets the interval
   *
   * @return {type} Description
   */
  start() {
    this.counter = 0;

    this.interval = setInterval(() => this.transit(this),this.time);

  }


  /**
   * transit - Loops throuch list one by one in each call
   *
   * @param {DFAChecker} that Requred because setInterval is a window function;
   *
   * @return {none}
   */
  transit(that) {

    if(that.counter < that.list.length) {


      that.list[that.counter].color = {r:227,g:212,b:162};
      that.list[that.counter].fill = {r:255,g:243,b:205};
      if(that.counter!=0) {
      that.list[that.counter-1].color = {r:0,g:0,b:0};
      that.list[that.counter-1].fill = {r:255,g:255,b:255};
    }
      that.counter++;
      redraw();
    }
    else {
      if(that.list[that.counter-1].isFinal)   {
        that.list[that.counter-1].color = {r:150,g:211,b:165};
        that.list[that.counter-1].fill =  {r:212,g:237,b:218};
        $('#accept').trigger('click');

      } else  {
        that.list[that.counter-1].color = {r:231,g:173,b:178};
        that.list[that.counter-1].fill  = {r:248,g:215,b:218};
        $('#reject').show(200);
      }
      redraw();
      clearInterval(that.interval);


    }
  }

  resetColor() {
    if(this.list.length) {
      this.list.forEach((item) => {
        item.color = {r:0,g:0,b:0};
        item.fill = {r:255,g:255,b:255};
      })
    }
  }

}
