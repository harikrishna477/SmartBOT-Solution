const e = require('express');
const Fsm = require('fsm.js');

/**
 * Our `Elevator` implementation implements
 * 3 states :
 *  - `open`: the elevator doors are opened
 *  - `closed`: the elevator doors are closed
 *  - `moving`: the elevator is moving towards a level
 *
 * It exposes an external `goToLevel` method used to
 * post a user request for the elevator to go to the
 * given level.
 */
// const Elevator = function () {
//   const self = this;
//   const TIME_PER_LEVEL = 1 * 1000;
//   this.level = 0;
//   this.stack = [];
//   this.fsm = new Fsm();

//   /**
//    * The elevator is in a stationary state
//    * and its doors are opened.
//    */
//   const open = new Fsm.State({
//     fsm: self.fsm,
//     name: 'open',
//     onEntry: function () {
//       const state = this;
      
//       console.log('Door opened at level', self.level);
//       setTimeout(function () {
//         state.transitionTo(closed);
//       }, 2000);
//     },

//     /**
//      * As the elevator's doors are currently opened
//      * we push any user request to go to
//      * a level on the level stack.
//      */
//     onEvent: function (event) {
//       if (event.name === 'goToLevel'
//         && event.level !== self.level) {
//         self.pushLevel(event.level);
//        }
//     }
//   });

//   /**
//    * The elevator is in a stationary state
//    * and its doors are closed.
//    */
//   const closed = new Fsm.State({
//     fsm: self.fsm,
//     name: 'closed',
//     onEntry: function () {
//       console.log('Door closed');
//       // If there is a channel in the stack,
//       // we move to that channel.
//       if (self.stack[0]) {
//         this.transitionTo(moving);
//       }
//     },

//     /**
//      * When the elevator's doors are closed,
//      * we wait for a request to move to another
//      * level.
//      */
//     onEvent: function (event) {
//       if (event.name === 'goToLevel') {
//         if (event.level === self.level) {
//           this.transitionTo(open);
//         } else {
//           self.pushLevel(event.level);
//           this.transitionTo(moving);
//         }
//       }
//     }
//   });

//   /**
//    * The elevator is currently moving from a
//    * level to another.
//    */
//   const moving = new Fsm.State({
//     fsm: self.fsm,
//     name: 'moving',

//     onEntry: function () {
//       const state = this;
//       const next  = self.stack.shift();

//       console.log('Moving to level', next);
//       setTimeout(function () {
//         console.log('Reached level', next);
//         self.level = next;
//         state.transitionTo(open);
//       }, TIME_PER_LEVEL * Math.abs(next - self.level));
//     },

//     /**
//      * As the elevator is currently moving and
//      * cannot change direction nor open the
//      * doors, we push any user request to go to
//      * a level on the level stack.
//      */
//     onEvent: function (event) {
//       if (event.name === 'goToLevel') {
//         self.pushLevel(event.level);
//       }
//     }
//   });

//   // Starting the elevator in the `closed` state.
//   this.fsm.start(closed);
// };

// /**
//  * States whether the elevator is already scheduled
//  * to go to the given level.
//  */
// Elevator.prototype.isduplicate = function (level) {
//   for (let i = 0; i < this.stack.length; ++i) {
//     if (this.stack[i] === level) {
//       return (true);
//     }
//   }
//   return (false);
// };

// /**
//  * Schedules the elevator to go to the given level,
//  * if it is not already.
//  */
// Elevator.prototype.pushLevel = function (level) {
//   if (!this.isduplicate(level)) {
//       this.stack.push(level);
//   }
// };

// /**
//  * Requests the elevator to go to the
//  * given level.
//  */
// Elevator.prototype.goToLevel = function (level) {
//    this.fsm.postEvent({ name: 'goToLevel', level: level });
// };

// // Creating a new `Elevator` instance.
// const elevator = new Elevator();

// // Sending level inputs to the `Elevator`.
// //elevator.goToLevel(1);
// elevator.goToLevel(1);
// elevator.goToLevel(8);
// setTimeout(function () {
//         console.log('test level'); 
//         elevator.goToLevel(3);
//         elevator.goToLevel(4);
//       }, 1000 * 2);


const testFSM = function () {
  
   const self = this;


/**
 * The `initialization` state of the system.
 */
 this.fsm = new Fsm(); 

const initialization = new Fsm.State({
  fsm: self.fsm,
  name: 'initialization',
  onEntry: ()=> {
    console.log('Initialization ...')
  },
  onExit:  () => {
    console.log('Initialization completed.')
  },
  onEvent: (event) => {
    if (event === 'init.done') {
      this.fsm.transitionTo(initialized);
    }
  }
});

/**
 * The `initialized` state.
 */
const initialized = new Fsm.State({
  fsm: self.fsm,
  name: 'initialized',
  onEntry: () => {
    console.log('System initialized !')
  },
  onEvent: (event) => {
    if (event === 'init.completed') {
      this.fsm.transitionTo(initialized);
  }
  
}
});

// Starting the fsm.
this.fsm.start(initialization);

}
 testFSM.prototype.EventEmit = function (event) {
    this.fsm.postEvent(event);      
 };


const tFsm = new testFSM();
// Simulating an asynchronous event.
setTimeout(() =>{
   tFsm.EventEmit('init.done')
  }, 1000);   
  
  setTimeout(() =>{
   tFsm.EventEmit('init.completed')
  }, 10000);  
