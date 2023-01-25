
class DFA {
  constructor(obj) {
    this.state  = [];
    this.alphabet = [];
    this.final = [];
    this.initial = [];
    this.transition = [];
    this.map(obj);
  }

  map(obj) {
    for(let a in obj) {
      this[a] = obj[a];
    }
  }

  ETF(string) {
    let state = this.initial;

    string.split('').forEach( (input) =>{
      let nextState = this.transition[state][input];
      console.log(`${state} -- ${input} --> ${nextState}`);
      state = nextState;

    });
    console.log(state);
    return state;
  }

  check(string)  {
    let lastState = this.ETF(string);
    if(this.final.find((state) => state === lastState))
      console.log("Accepted");
  }


}

let DFATuples = {
  state: ["q0","q1","q2",'q3'],
  alphabet : ['0','1'],
  final : ['q3'],
  initial : ['q0'],
  transition : {
    q0 : {
      0 : 'q1',
      1 : 'q0'
    },
    q1 : {
      0 : 'q2',
      1 : 'q0'
    },
    q2 : {
      0 : 'q3',
      1 : 'q0'
    },
    q3 : {
      0 : 'q3',
      1 : 'q3'
    }
  }
}


let subesh = new DFA(DFATuples);


console.log(subesh);
