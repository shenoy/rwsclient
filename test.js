var _ = require("lodash");

const initState = {
  java: [
    { from: "cybill", msg: "ho ho" },
    { from: "bruce", msg: "haha that's life?" }
  ],

  python: [
    { from: "gill", msg: "I am tired" },
    { from: "david", msg: "lets have a beer" }
  ]
};

var other = {
  java: [{msg:"fuck", from: "bruce" }]
};

let x = _.merge(initState, other);

console.log(x);
